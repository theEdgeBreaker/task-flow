import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold">
          Start Managing Your Tasks Today
        </h2>
        <p className="mt-4 text-xl">
          Join thousands of users improving their productivity with TaskFlow.
        </p>
        <div className="mt-6">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-medium shadow-md hover:bg-gray-100"
          >
            Sign Up for Free
          </Link>
        </div>
      </div>
    </section>
  );
}
