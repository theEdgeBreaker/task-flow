"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-900 text-white  p-4 transition-all duration-300 ${
        collapsed ? "w-16 min-h-screen " : "w-1/6"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 p-2 bg-gray-700 rounded-full"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar Links */}
      <nav className="space-y-4">
        <Link href="/" className="flex items-center gap-2 hover:text-gray-300">
          🏠 {collapsed ? "" : "Home"}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          📊 {collapsed ? "" : "Dashboard"}
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          ✅ {collapsed ? "" : "Tasks"}
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          📂 {collapsed ? "" : "Projects"}
        </Link>
        <Link
          href="/calendar"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          📅 {collapsed ? "" : "Calendar"}
        </Link>
      </nav>
    </aside>
  );
}
