import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <img
        src="/404_not_found.svg"
        alt="404 Not Found"
        className="w-110 h-auto mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 text-lg mb-6">404 Not Found</p>
      <Link
        to="/"
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
