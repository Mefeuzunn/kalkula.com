"use client";

import React from "react";
import { TrendingUp, PieChart, Info, DollarSign } from "lucide-react";

interface V2Premium3DResultProps {
  title: string;
  mainValue: string;
  mainLabel: string;
  subValue?: string;
  subLabel?: string;
  color?: "emerald" | "blue" | "red" | "purple" | "zinc";
  items?: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
    color?: string;
  }>;
  variant?: "grid" | "list" | "precise";
  gaugePercentage?: number;
  gaugeLabel?: string;
  footerText?: string;
  accentIcon?: React.ReactNode;
}

export const V2Premium3DResult: React.FC<V2Premium3DResultProps> = ({
  title,
  mainValue,
  mainLabel,
  subValue,
  subLabel,
  color = "emerald",
  items = [],
  variant = "grid",
  gaugePercentage,
  gaugeLabel = "DAĞILIM",
  footerText,
  accentIcon = <TrendingUp size={32} />,
}) => {
  if (variant === "precise") {
    return (
      <div className="bg-[#111827] p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10 animate-fade-in">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-3 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/5 pb-6">
           {accentIcon && <div className="text-white/20">{accentIcon}</div>}
           {title}
        </div>

        {/* MAIN RESULT CARD (SCREENSHOT STYLE) */}
        <div className="bg-[#0f172a] rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden border border-white/10 shadow-inner group">
           {/* THE BLUE GLOW BAR */}
           <div className="absolute top-0 left-8 right-8 h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] rounded-full group-hover:left-4 group-hover:right-4 transition-all duration-700" />
           
           <p className="text-blue-400 font-black text-[11px] uppercase tracking-[0.4em] mb-6 animate-pulse">
              {mainLabel}
           </p>
           
           <h2 className="text-[#22c55e] text-5xl md:text-7xl font-black tracking-tighter mb-4 drop-shadow-[0_4px_12px_rgba(34,197,94,0.2)]">
              {mainValue}
           </h2>
           
           {(subLabel || subValue) && (
              <p className="text-white/30 text-[11px] font-bold tracking-wide italic">
                 {subValue && `${subValue} `}
                 {subLabel}
              </p>
           )}
        </div>

        {/* DETAILED LIST SECTION */}
        {items.length > 0 && (
           <div className="space-y-0 px-2">
              {items.map((item, idx) => (
                 <div 
                   key={idx} 
                   className={`flex justify-between items-center py-6 ${idx !== items.length - 1 ? "border-b border-white/5" : ""}`}
                 >
                    <div className="flex items-center gap-3">
                       {item.icon && <div className="opacity-30">{item.icon}</div>}
                       <span className="text-white/80 font-bold text-sm">{item.label}</span>
                    </div>
                    <span className={`text-xl font-black tracking-tight ${item.color || "text-white"}`}>
                       {item.value}
                    </span>
                 </div>
              ))}
           </div>
        )}

        {/* INFO FOOTER */}
        {footerText && (
          <div className="pt-6 border-t border-white/5 flex items-start gap-4 opacity-50">
             <Info size={16} className="text-white/40 shrink-0 mt-1" />
             <p className="text-[10px] text-white/60 leading-relaxed font-bold italic" dangerouslySetInnerHTML={{ __html: footerText }} />
          </div>
        )}
      </div>
    );
  }

  // LEGAY GRIDS/LISTS (To keep backward compatibility for now)
  const colorSchemes = {
    emerald: { bg: "bg-emerald-600", border: "border-emerald-800/30", accentBg: "bg-white/10", accentText: "text-emerald-200", shadow: "shadow-[0_20px_50px_rgba(16,185,129,0.3)]" },
    blue: { bg: "bg-blue-600", border: "border-blue-800/30", accentBg: "bg-white/10", accentText: "text-blue-200", shadow: "shadow-[0_20px_50px_rgba(37,99,235,0.3)]" },
    red: { bg: "bg-red-600", border: "border-red-800/30", accentBg: "bg-white/10", accentText: "text-red-200", shadow: "shadow-[0_20px_50px_rgba(239,68,68,0.3)]" },
    purple: { bg: "bg-purple-600", border: "border-purple-800/30", accentBg: "bg-white/10", accentText: "text-purple-200", shadow: "shadow-[0_20px_50px_rgba(139,92,246,0.3)]" },
    zinc: { bg: "bg-zinc-800", border: "border-black/30", accentBg: "bg-white/5", accentText: "text-zinc-400", shadow: "shadow-[0_20px_50px_rgba(39,39,42,0.3)]" },
  };

  const scheme = colorSchemes[color];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 3D MAIN CARD */}
      <div className={`${scheme.bg} p-8 md:p-12 rounded-[3.5rem] ${scheme.shadow} text-white relative overflow-hidden group border-b-[10px] ${scheme.border} transition-transform hover:-translate-y-1`}>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div>
                <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-2">{title}</p>
                <div className="flex flex-col">
                  <span className="text-xs font-black opacity-80 uppercase tracking-[0.2em] mb-1">{mainLabel}</span>
                  <h3 className="text-5xl md:text-6xl font-black leading-tight italic tracking-tighter drop-shadow-xl">{mainValue}</h3>
                </div>
            </div>
            <div className={`w-16 h-16 ${scheme.accentBg} backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner group-hover:rotate-6 transition-transform`}>
                <div className={scheme.accentText}>{accentIcon}</div>
            </div>
          </div>
          {((subValue && subValue !== "") || (subLabel && subLabel !== "")) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/20 pt-10">
              {subValue && (
                <div>
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                       <DollarSign size={12} /> {subLabel || "TOPLAM GERİ ÖDEME"}
                    </p>
                    <p className="text-2xl md:text-3xl font-black tracking-tight">{subValue}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {items.length > 0 && (
        variant === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-2xl space-y-4 hover:-translate-y-1 transition-transform border-b-8 border-secondary/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color || "bg-blue-500/10 text-blue-500"}`}>{item.icon || <Info size={16} />}</div>
                  <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{item.label}</span>
                </div>
                <p className="text-2xl font-black text-primary tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-[2.5rem] border border-border shadow-2xl overflow-hidden divide-y divide-border/50">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-7 hover:bg-secondary/5 transition-colors">
                <div className="flex items-center gap-4">
                  {item.icon && <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color || "bg-secondary/10 text-muted"}`}>{item.icon}</div>}
                  <span className="text-[11px] font-black text-muted/70 uppercase tracking-widest">{item.label}</span>
                </div>
                <span className={`text-lg font-black tracking-tight ${item.color?.includes('text-') ? item.color.split(' ').find(c => c.startsWith('text-')) : 'text-primary'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
