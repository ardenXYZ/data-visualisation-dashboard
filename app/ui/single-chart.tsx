"use client";

import { ProductWithTransactions } from "@/lib/data";
import { buildProductChartData } from "@/lib/utils";
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

export default function SingleChart({
  product,
}: {
  product: ProductWithTransactions;
}) {
  // range data for chart
  const dataArr = buildProductChartData(product);

  // Chart.js
  const data = {
    labels: dataArr.map((d) => `Day ${d.day}`),
    datasets: [
      {
        label: "Inventory",
        data: dataArr.map((d) => d.inventory),
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
      {
        label: "Procurement Amount",
        data: dataArr.map((d) => d.procurement),
        borderColor: "rgb(54, 162, 235)",
        fill: false,
      },
      {
        label: "Sales Amount",
        data: dataArr.map((d) => d.sales),
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
