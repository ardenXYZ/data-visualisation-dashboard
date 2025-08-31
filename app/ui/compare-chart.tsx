"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Line } from "react-chartjs-2";
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
import { ProductWithTransactions } from "@/app/lib/data";
import { buildProductChartData } from "@/app/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CompareChart({
  products,
}: {
  products: ProductWithTransactions[];
}) {
  const searchParams = useSearchParams();
  const selectedIds = searchParams.get("products")?.split(",") || [];

  // Metric state
  const [metric, setMetric] = useState<"inventory" | "sales" | "procurement">(
    "inventory"
  );

  // Filter products
  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));

  if (selectedProducts.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-500">
        Please select at least one product
      </div>
    );
  }

  const colors = ["#ff6384", "#36a2eb", "#4bc0c0", "#ff9f40", "#9966ff"];
  const datasets = selectedProducts.map((p, idx) => {
    const dataArr = buildProductChartData(p);

    return {
      label: p.productName,
      data: dataArr.map((d) => d[metric]),
      borderColor: colors[idx % colors.length],
      fill: false,
    };
  });

  const labels = [1, 2, 3].map((d) => `Day ${d}`);

  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: `Product ${metric} comparison` },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Metric Selector */}
      <div>
        <label className="font-medium mr-2">Compare by:</label>
        <select
          value={metric}
          onChange={(e) =>
            setMetric(e.target.value as "inventory" | "sales" | "procurement")
          }
          className="border rounded px-2 py-1"
        >
          <option value="inventory">Inventory</option>
          <option value="sales">Sales</option>
          <option value="procurement">Procurement</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
