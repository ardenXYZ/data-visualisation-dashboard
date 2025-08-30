import prisma from "@/lib/prisma";

export type ProductWithTransactions = {
    dailyTransactions: {
        id: number;
        day: number;
        productId: string;
        type: string;
        quantity: number;
        price: number;
    }[];
} & {
    id: string;
    productName: string;
    openingInventory: number;
}

export async function fetchProductCount() {
    const productCount = await prisma.product.count();
    return productCount;
}

export async function fetchProductsWithTransactions() {
    const products = await prisma.product.findMany({
        include: {
            dailyTransactions: {
                orderBy: { day: "asc" },
            },
        },
        orderBy: { productName: "asc" },
    });
    return products;
}

