// components/shared/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* TaskFlow Text (No Logo) */}
        <span className="font-bold text-xl text-white">TaskFlow</span>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
