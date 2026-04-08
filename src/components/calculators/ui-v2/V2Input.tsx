"use client";

import React from "react";

interface V2InputProps {
  label: string;
  value: string | number;
  onChange?: (value: string) => void;
  unit?: string;
  placeholder?: string;
  type?: "text" | "number" | "date" | "time";
  step?: string;
  min?: string;
  max?: string;
  className?: string;
  fieldClassName?: string;
  readOnly?: boolean;
}

export const V2Input: React.FC<V2InputProps> = ({
  label,
  value,
  onChange,
  unit,
  placeholder,
  type = "number",
  step,
  min,
  max,
  className = "",
  fieldClassName = "",
  readOnly = false,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="calc-input-label">{label}</label>
      <div className="calc-input-key">
        <input
          type={type}
          value={value}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          className={`calc-input-field ${fieldClassName}`}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          readOnly={readOnly}
        />
        {unit && <span className="calc-unit-v2">{unit}</span>}
      </div>
    </div>
  );
};
