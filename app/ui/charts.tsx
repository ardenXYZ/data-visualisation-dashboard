import {
  fetchProductCount,
  fetchProductsWithTransactions,
} from "@/app/lib/data";
import SingleChart from "./single-chart";

export default async function ChartWrapper() {
  const productCount = await fetchProductCount();

  if (productCount < 1) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No products found.
      </div>
    );
  }

  const products = await fetchProductsWithTransactions();

  return (
    <div className="flex flex-col gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4">
          <SingleChart key={product.id} product={product}></SingleChart>
        </div>
      ))}
    </div>
  );
}
