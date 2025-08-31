import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo/Icon placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Data Visualization Dashboard
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md mx-auto">
          Transform your data into actionable insights with our powerful
          visualization tools.
        </p>

        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Explore Dashboard
        </Link>

        {/* Additional info */}
        <p className="mt-10 text-gray-500 text-sm">
          Get started with your data analysis in minutes
        </p>
      </div>
    </div>
  );
}
