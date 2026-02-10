"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a country..."
        className={`
          w-full sm:w-[420px] pl-12 pr-4 h-12 rounded-md
          bg-surface
          shadow-card
          border border-transparent
          text-sm
          text-foreground
          placeholder:text-muted
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-background
          transition-colors
        `}
        aria-label="Search countries"
      />
    </div>
  );
}