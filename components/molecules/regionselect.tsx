"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export type Region = string | "All";

type Props = {
  value: Region;
  onChange: (r: Region) => void;
  options: string[];
};

export default function RegionSelect({ value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center justify-between w-full sm:w-56 h-12 px-4 rounded-md
          bg-surface
          shadow-card
          border border-transparent
          text-sm font-medium
          text-foreground
          hover:shadow-lg transition-shadow
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value === "All" ? "Filter by Region" : value}</span>
        <ChevronDownIcon
          className={`h-5 w-5 opacity-70 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`
            absolute mt-2 w-full rounded-md
            bg-surface
            shadow-card
            py-2 text-sm z-10
            border border-transparent
            animate-in fade-in-0 zoom-in-95 origin-top
          `}
          onMouseLeave={() => setOpen(false)}
        >
          {options.map((r) => (
            <li key={r}>
              <button
                className={`
                  w-full text-left px-4 py-2
                  text-foreground
                  hover:bg-black/5 dark:hover:bg-white/10
                  transition-colors
                  ${value === r ? "font-semibold" : ""}
                `}
                onClick={() => {
                  onChange(r);
                  setOpen(false);
                }}
                role="option"
                aria-selected={value === r}
              >
                {r}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`
                w-full text-left px-4 py-2
                text-foreground
                hover:bg-black/5 dark:hover:bg-white/10
                transition-colors
                border-t border-muted/20
                ${value === "All" ? "font-semibold" : ""}
              `}
              onClick={() => {
                onChange("All");
                setOpen(false);
              }}
              role="option"
              aria-selected={value === "All"}
            >
              Clear filter
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
