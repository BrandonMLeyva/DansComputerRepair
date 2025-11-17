"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const handleNavigation = (path) => router.push(path);
  const MotionButton = motion.button;

  // Small interaction animations
  const hover = { scale: 1.05 };
  const tap = { scale: 0.95 };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/Danlogo.jpg"
            alt="Dan's Computer Repair Logo"
            width="64"
            height="64"
            className="h-16 w-16 rounded-md object-contain"
          />
          <div className="leading-tight">
            <h1 className="text-xl font-semibold tracking-tight">
              Dan&apos;s Computer Repair
            </h1>
            <p className="text-sm text-gray-600">IT Services and Computer Repair</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            <li>
              <MotionButton
                type="button"
                onClick={() => handleNavigation("/")}
                whileHover={hover}
                whileTap={tap}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Home
              </MotionButton>
            </li>

            <li>
              <MotionButton
                type="button"
                onClick={() => handleNavigation("/about")}
                whileHover={hover}
                whileTap={tap}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline hover:bg-purple-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Products
              </MotionButton>
            </li>

            {/* Computer Building */}
            <li>
              <MotionButton
                type="button"
                onClick={() =>
                  handleNavigation("/create-computer-configuration-form")
                }
                whileHover={hover}
                whileTap={tap}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Computer Building
              </MotionButton>
            </li>

            {/* Service Request */}
            <li>
              <MotionButton
                type="button"
                onClick={() => handleNavigation("/service-request")}
                whileHover={hover}
                whileTap={tap}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Service Request
              </MotionButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
