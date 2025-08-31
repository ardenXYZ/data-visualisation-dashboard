"use client";

import { ProductWithTransactions } from "@/app/lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSelector({
  products,
}: {
  products: ProductWithTransactions[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedIds = searchParams.get("products")?.split(",") || [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);

    const params = new URLSearchParams(searchParams);
    if (selected.length > 0) {
      params.set("products", selected.join(","));
    } else {
      params.delete("products");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label className="block font-medium mb-2">Select Products: </label>
      <select
        multiple
        value={selectedIds}
        onChange={handleChange}
        className="border rounded p-2 w-80 h-40"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.productName}
          </option>
        ))}
      </select>
    </div>
  );
}
