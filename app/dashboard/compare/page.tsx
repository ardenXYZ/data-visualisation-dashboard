import CompareProducts from "@/app/ui/compare-products";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Compare Products</h1>
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center text-gray-400">
            fetching data...
          </div>
        }
      >
        <CompareProducts />
      </Suspense>
    </div>
  );
}
