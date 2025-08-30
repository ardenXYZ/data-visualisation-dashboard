"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  day: number;
  inventory: number;
  procurement: number;
  sales: number;
};

export default function SingleChart({
  product,
}: {
  product: {
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
  };
}) {
  // range data for chart
  const { openingInventory, dailyTransactions } = product;

  const dataArr = [];
  let inventory = openingInventory;
  for (let i = 1; i <= 3; i++) {
    const dailyData: ChartData = {
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

    dataArr.push(dailyData);
  }

  // Chart.js
  const data = {
    labels: dataArr.map((d: ChartData) => `Day ${d.day}`),
    datasets: [
      {
        label: "Inventory",
        data: dataArr.map((d: ChartData) => d.inventory),
        borderColor: "rgb(75, 192, 192)",
        fill: true,
      },
      {
        label: "Procurement Amount",
        data: dataArr.map((d: ChartData) => d.procurement),
        borderColor: "rgb(54, 162, 235)",
        fill: false,
      },
      {
        label: "Sales Amount",
        data: dataArr.map((d: ChartData) => d.sales),
        borderColor: "rgb(255, 99, 132)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: product.productName },
    },
  };

  return <Line data={data} options={options} />;
}
