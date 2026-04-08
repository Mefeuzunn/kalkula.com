"use client";

import React from "react";

interface V2ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  subLabel?: string;
  color?: "red" | "amber" | "emerald" | "blue" | "purple" | "indigo" | "pink" | "slate";
  className?: string;
  onClick?: () => void;
}

export const V2ResultCard: React.FC<V2ResultCardProps> = ({
  label,
  value,
  unit,
  icon,
  subLabel,
  color = "blue",
  className = "",
  onClick,
}) => {
  const colorClass = `calc-result-card-v2-${color}`;
  const valueColor = {
    red: "text-[#ef4444]",
    amber: "text-[#f59e0b]",
    emerald: "text-[#10b981]",
    blue: "text-[#3b82f6]",
    purple: "text-[#8b5cf6]",
    indigo: "text-[#6366f1]",
    pink: "text-[#ec4899]",
    slate: "text-[#64748b]",
  }[color];

  return (
    <div 
      className={`calc-result-card-v2 ${colorClass} ${className} ${onClick ? 'cursor-pointer active:scale-95 transition-all' : ''}`}
      onClick={onClick}
    >
      {icon && <span className="text-xl mb-2">{icon}</span>}
      <span className="calc-input-label !m-0">{label}</span>
      <div className={`calc-result-card-v2-value ${valueColor}`}>
        {value}
        {unit && <span className="text-lg ml-2 opacity-60 font-medium">{unit}</span>}
      </div>
      {subLabel && (
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
          {subLabel}
        </span>
      )}
    </div>
  );
};
