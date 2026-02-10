"use client";

import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-surface shadow-md">
      <div className="mx-auto max-w-screen1440 px-4 sm:px-8 h-16 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          Where in the world?
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}