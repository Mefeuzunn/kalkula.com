"use client";

import React from "react";

interface V2InputProps {
  label: string;
  value: string | number;
  onChange?: (value: string) => void;
  unit?: string;
  subLabel?: string;
  placeholder?: string;
  type?: "text" | "number" | "date" | "time";
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  step?: string;
  min?: string;
  max?: string;
  className?: string;
  fieldClassName?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

export const V2Input: React.FC<V2InputProps> = ({
  label,
  value,
  onChange,
  unit,
  subLabel,
  placeholder,
  type = "number",
  inputMode,
  step,
  min,
  max,
  className = "",
  fieldClassName = "",
  readOnly = false,
  disabled = false,
}) => {
  // Determine best inputMode for mobile keyboard
  const derivedInputMode = inputMode || (type === "number" ? "decimal" : undefined);

  return (
    <div className={`space-y-3 ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <label className="calc-input-label flex items-center gap-2 cursor-pointer">
        {label}
      </label>
      <div className="calc-input-key transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/20">
        <input
          type={type}
          inputMode={derivedInputMode}
          value={value}
          onChange={(e) => !readOnly && !disabled && onChange?.(e.target.value)}
          className={`calc-input-field ${fieldClassName}`}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          readOnly={readOnly}
          disabled={disabled}
        />
        {unit && <span className="calc-unit-v2">{unit}</span>}
      </div>
      {subLabel && (
        <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-50 px-2 italic">
          {subLabel}
        </div>
      )}
    </div>
  );
};
