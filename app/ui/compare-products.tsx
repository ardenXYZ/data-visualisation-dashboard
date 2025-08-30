import { fetchProductCount, fetchProductsWithTransactions } from "@/lib/data";
import ProductSelector from "./product-selector";
import CompareChart from "./compare-chart";

export default async function CompareProducts() {
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
    <section>
      <ProductSelector products={products} />
      <CompareChart products={products} />
    </section>
  );
}
