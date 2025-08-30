import { Suspense } from "react";
import ChartWrapper from "./ui/charts";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Data Visualisation Dashboard
      </h1>

      <div className="flex-1">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-gray-400">
              Rendering chart...
            </div>
          }
        >
          <ChartWrapper />
        </Suspense>
      </div>
    </div>
  );
}
