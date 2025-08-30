"use client";

import { uploadExcel } from "@/lib/actions";
import SubmitButton from "@/ui/submit-button";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function UploadPage() {
  const [fileSelected, setFileSelected] = useState(false);
  const { pending } = useFormStatus();

  return (
    <div className="flex min-h-screen items-center justify-center from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-lg md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Upload Excel File
          </h1>
          <p className="text-sm text-gray-600">
            Please select an Excel file (.xlsx or .xls) that contains your
            product data.
          </p>
        </div>

        <form
          action={uploadExcel}
          className="flex flex-col gap-1 sm:flex-row sm:items-center"
        >
          <div className="w-full sm:w-[70%]">
            <input
              type="file"
              accept=".xlsx,.xls"
              name="selectedFile"
              onChange={(e) => setFileSelected(!!e.target.files?.length)}
              disabled={pending}
            />
          </div>
          <SubmitButton fileSelected={fileSelected}></SubmitButton>
        </form>
      </div>
    </div>
  );
}
