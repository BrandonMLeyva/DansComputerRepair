"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const button = dropdownRef.current.previousSibling;
        if (button && button.contains(event.target)) return;
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    "Data recovery",
    "Telecom or Network services",
    "Mobile phone body repair",
    "Printer support",
    "Device support or repair",
    "VOIP services",
    "Mobile phone support",
    "Video game console support",
  ];

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    router.push(path);
  };

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
            <p className="text-sm text-gray-600">
              IT Services and Computer Repair
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/")}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/about")}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Products
              </button>
            </li>

            {/* Computer Bulding button */}
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/create-computer-configuration-form")}
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Computer Building
              </button>
            </li>

            {/* Service Request dropdown */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                className="rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Service Request
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  role="menu"
                  className="absolute left-1/2 z-50 mt-2 w-[340px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
                >
                  <p className="mb-3 text-center text-base font-medium text-gray-900">
                    Select a service
                  </p>
                  <ul className="space-y-2">
                    {services.map((service, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => handleNavigation("/service-request")}
                          className="block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                        >
                          {service}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/admin-log-in")}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                Admin Login
              </button>
            </li>
          </ul>
        </nav>

        {/* (Optional) Mobile trigger placeholder */}
        <div className="md:hidden" />
      </div>
    </header>
  );
}
