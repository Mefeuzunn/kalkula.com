"use client";

import React from "react";

interface V2ActionRowProps {
  onCalculate: () => void;
  onReset: () => void;
  calculateLabel?: string;
  resetLabel?: string;
  isCalculateDisabled?: boolean;
  showCalculate?: boolean;
  className?: string;
}

export const V2ActionRow: React.FC<V2ActionRowProps> = ({
  onCalculate,
  onReset,
  calculateLabel = "Hesapla",
  resetLabel = "Sıfırla",
  isCalculateDisabled = false,
  showCalculate = true,
  className = "",
}) => {
  return (
    <div className={`grid ${showCalculate ? 'grid-cols-[1fr_auto]' : 'grid-cols-1'} gap-4 mt-6 mb-6 ${className}`}>
      {showCalculate && (
        <button 
          className={`calc-btn-calculate-v2 ${isCalculateDisabled ? 'opacity-50 cursor-not-allowed scale-95 shadow-none' : ''}`} 
          onClick={onCalculate}
          disabled={isCalculateDisabled}
        >
          {calculateLabel}
        </button>
      )}
      <button className="calc-btn-reset-v2" onClick={onReset}>
         ↻ {resetLabel}
      </button>
    </div>
  );
};
