"use client";

import React from "react";

interface V2CalculatorWrapperProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  infoText?: string;
  results?: React.ReactNode;
  className?: string;
}

export const V2CalculatorWrapper: React.FC<V2CalculatorWrapperProps> = ({
  children,
  title,
  icon,
  infoText,
  results,
  className = "",
}) => {
  return (
    <div className={`calc-wrapper max-w-2xl mx-auto ${className}`}>
      {/* INPUTS SECTION */}
      <div className="space-y-6">
        {children}
      </div>

      {/* RESULTS SECTION */}
      {results && (
        <div className="mt-12 calc-result-panel-v2 border border-white/5 rounded-[2.5rem] bg-[#0f172a] shadow-inner overflow-hidden">
          {title && (
            <div className="calc-result-header-v2 bg-white/5">
               {icon && <span className="text-xl">{icon}</span>}
               <span>{title}</span>
            </div>
          )}
          
          <div className="p-8">
            {results}
          </div>
        </div>
      )}

      {/* INFO BOX */}
      {infoText && (
        <div className="mt-10 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
           <span className="text-2xl">📌</span>
           <p className="text-xs font-medium text-muted leading-relaxed opacity-80 italic">
              {infoText}
           </p>
        </div>
      )}
    </div>
  );
};
