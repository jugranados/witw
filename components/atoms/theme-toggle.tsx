"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 text-foreground hover:opacity-75"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <SunIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
}

