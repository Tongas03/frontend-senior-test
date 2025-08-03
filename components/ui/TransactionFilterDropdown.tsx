"use client";

import { useState, useRef, useEffect } from "react";
import { FiltersDates } from "@/types";

interface Props {
  selected: FiltersDates;
  onChange: (value: FiltersDates) => void;
}

const options: FiltersDates[] = ["All", "Today", "Yesterday", "Last 5 Days"];

export default function TransactionFilterDropdown({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
      >
        <img src="/calendar.svg" alt="Filter by date" className="w-5 h-5" />
        <span>{selected}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selected === option ? "font-semibold text-black" : ""
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
