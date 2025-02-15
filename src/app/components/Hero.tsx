import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-extrabold">
          Manage Your Tasks Efficiently
        </h1>
        <p className="mt-4 text-lg">
          A personal task management system to organize your daily tasks and
          projects.
        </p>
        <div className="mt-6">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-medium shadow-md hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
