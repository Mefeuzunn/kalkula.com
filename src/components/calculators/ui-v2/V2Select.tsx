"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface V2SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  fieldClassName?: string;
}

export const V2Select: React.FC<V2SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = "",
  fieldClassName = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="calc-input-label">{label}</label>}
      <div className="calc-input-key relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`calc-input-field appearance-none pr-10 cursor-pointer ${fieldClassName}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#1e293b] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
