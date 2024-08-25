"use client";

import { useState, useEffect } from "react";
import { MoonIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-[0px_2px_4px_0px_#0000000E] dark:bg-[#2B3844] z-20 flex justify-between items-center p-4 px-20 dark:text-white">
      <h1 className="text-xl font-bold dark:text-white cursor-pointer">
        Where in the World?
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center p-2 rounded-md"
      >
        <MoonIcon
          className={`w-6 h-6 ${
            darkMode ? "text-white" : "text-gray-800"
          } dark:text-white`}
          style={{ fill: darkMode ? "#fff" : "none" }}
        />
        <span className="ml-2 dark:text-white">Dark Mode</span>
      </button>
    </header>
  );
}
