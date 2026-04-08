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
  step,
  min,
  max,
  className = "",
  fieldClassName = "",
  readOnly = false,
  disabled = false,
}) => {
  return (
    <div className={`space-y-2 ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <label className="calc-input-label">{label}</label>
      <div className="calc-input-key">
        <input
          type={type}
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
        <div className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 px-1">
          {subLabel}
        </div>
      )}
    </div>
  );
};
