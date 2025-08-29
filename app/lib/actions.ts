'use server';

import xlsx from 'node-xlsx';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const COLUMN_MAPPING: { [key: string]: string } = {
    'ID': 'productId',
    'Product Name': 'productName',
    'Opening Inventory': 'openingInventory',
    'Procurement Qty (Day 1)': 'procurementQtyDay1',
    'Procurement Price (Day 1)': 'procurementPriceDay1',
    'Procurement Qty (Day 2)': 'procurementQtyDay2',
    'Procurement Price (Day 2)': 'procurementPriceDay2',
    'Procurement Qty (Day 3)': 'procurementQtyDay3',
    'Procurement Price (Day 3)': 'procurementPriceDay3',
    'Sales Qty (Day 1)': 'salesQtyDay1',
    'Sales Price (Day 1)': 'salesPriceDay1',
    'Sales Qty (Day 2)': 'salesQtyDay2',
    'Sales Price (Day 2)': 'salesPriceDay2',
    'Sales Qty (Day 3)': 'salesQtyDay3',
    'Sales Price (Day 3)': 'salesPriceDay3'
};


export async function uploadExcel(formData: FormData) {
    const file = formData.get("selectedFile") as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const workSheets = xlsx.parse(buffer);
    const firstSheet = workSheets[0].data as string[][];

    const headers = firstSheet[0] as string[];
    const rows = firstSheet.slice(1);
    const dataRows = rows.filter(row => row.length > 0)
        .map(row => {
            const rowData: { [key: string]: string } = {};
            headers.forEach((header, index) => {
                if (index < row.length) {
                    rowData[COLUMN_MAPPING[header] || header] = row[index];
                }
            });
            return rowData;
        });

    try {
        for (const rowData of dataRows) {
            await processProductData(rowData);
        }
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/');
    redirect('/');
}

async function processProductData(rowData: { [key: string]: string }) {
    const {
        productId,
        productName,
        openingInventory,
        procurementQtyDay1, procurementPriceDay1,
        procurementQtyDay2, procurementPriceDay2,
        procurementQtyDay3, procurementPriceDay3,
        salesQtyDay1, salesPriceDay1,
        salesQtyDay2, salesPriceDay2,
        salesQtyDay3, salesPriceDay3
    } = rowData;

    // update/create product
    const product = await prisma.product.upsert({
        where: { id: productId },
        update: {
            productName: productName,
            openingInventory: parseFloat(openingInventory) || 0,
        },
        create: {
            id: productId,
            productName,
            openingInventory: parseFloat(openingInventory) || 0,
        },
    });

    // delete all transactions of the product
    await prisma.dailyTransaction.deleteMany({
        where: { productId: product.id }
    });

    await processDayData(product.id, 1, 'procurement', procurementQtyDay1, procurementPriceDay1);
    await processDayData(product.id, 1, 'sales', salesQtyDay1, salesPriceDay1);

    await processDayData(product.id, 2, 'procurement', procurementQtyDay2, procurementPriceDay2);
    await processDayData(product.id, 2, 'sales', salesQtyDay2, salesPriceDay2);

    await processDayData(product.id, 3, 'procurement', procurementQtyDay3, procurementPriceDay3);
    await processDayData(product.id, 3, 'sales', salesQtyDay3, salesPriceDay3);
}

async function processDayData(
    productId: string,
    day: number,
    type: 'procurement' | 'sales',
    quantity: string,
    price: string
) {
    const qty = parseFloat(quantity);
    const prc = parseFloat(price);

    if (!isNaN(qty) && !isNaN(prc) && qty > 0) {
        await prisma.dailyTransaction.create({
            data: {
                productId,
                day,
                type,
                quantity: qty,
                price: prc,
            },
        });
    }
}