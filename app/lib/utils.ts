import { ProductWithTransactions } from "./data";

export type ProductChartData = {
    day: number;
    inventory: number;
    procurement: number;
    sales: number;
};


export function buildProductChartData(product: ProductWithTransactions): ProductChartData[] {
    const { openingInventory, dailyTransactions } = product;

    const dataArr: ProductChartData[] = [];
    let inventory = openingInventory;

    for (let i = 1; i <= 3; i++) {
        const dailyData: ProductChartData = {
            day: i,
            inventory,
            procurement: 0,
            sales: 0,
        };

        const procurementTransaction = dailyTransactions.find(
            (t) => t.day === i && t.type === "procurement"
        );
        if (procurementTransaction) {
            dailyData.procurement =
                procurementTransaction.quantity * procurementTransaction.price;
            inventory += procurementTransaction.quantity;
        }

        const salesTransaction = dailyTransactions.find(
            (t) => t.day === i && t.type === "sales"
        );
        if (salesTransaction) {
            dailyData.sales = salesTransaction.quantity * salesTransaction.price;
            inventory -= salesTransaction.quantity;
        }

        dailyData.inventory = inventory; // final inventory after this day
        dataArr.push(dailyData);
    }

    return dataArr;
}