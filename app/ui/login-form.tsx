"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Please log in to continue
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                minLength={3}
                disabled={isPending}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Log in"}
        </button>
        <div
          className="flex h-8 items-end space-x-1 mt-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
