import { useFormStatus } from "react-dom";
import clsx from "clsx";

export default function SubmitButton({
  fileSelected,
}: {
  fileSelected: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={!fileSelected || pending}
      className={clsx(
        "ml-4 rounded px-4 py-2 text-white transition",
        pending
          ? "bg-gray-500 cursor-wait"
          : fileSelected
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-400 cursor-not-allowed"
      )}
    >
      {pending ? "Processing..." : "Upload"}
    </button>
  );
}
