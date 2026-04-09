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
  gaugePercentage,
  gaugeLabel = "DAĞILIM",
  footerText,
  accentIcon = <TrendingUp size={32} />,
}) => {
  const colorSchemes = {
    emerald: {
      bg: "bg-emerald-600",
      border: "border-emerald-800/30",
      accentBg: "bg-white/10",
      accentText: "text-emerald-200",
      shadow: "shadow-[0_20px_50px_rgba(16,185,129,0.3)]",
    },
    blue: {
      bg: "bg-blue-600",
      border: "border-blue-800/30",
      accentBg: "bg-white/10",
      accentText: "text-blue-200",
      shadow: "shadow-[0_20px_50px_rgba(37,99,235,0.3)]",
    },
    red: {
      bg: "bg-red-600",
      border: "border-red-800/30",
      accentBg: "bg-white/10",
      accentText: "text-red-200",
      shadow: "shadow-[0_20px_50px_rgba(239,68,68,0.3)]",
    },
    purple: {
      bg: "bg-purple-600",
      border: "border-purple-800/30",
      accentBg: "bg-white/10",
      accentText: "text-purple-200",
      shadow: "shadow-[0_20px_50px_rgba(139,92,246,0.3)]",
    },
    zinc: {
      bg: "bg-zinc-800",
      border: "border-black/30",
      accentBg: "bg-white/5",
      accentText: "text-zinc-400",
      shadow: "shadow-[0_20px_50px_rgba(39,39,42,0.3)]",
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 3D MAIN CARD */}
      <div className={`${scheme.bg} p-8 md:p-12 rounded-[3.5rem] ${scheme.shadow} text-white relative overflow-hidden group border-b-[10px] ${scheme.border} transition-transform hover:-translate-y-1`}>
        {/* LIGHT EFFECTS */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div>
                <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-2">{title}</p>
                <div className="flex flex-col">
                  <span className="text-xs font-black opacity-80 uppercase tracking-[0.2em] mb-1">{mainLabel}</span>
                  <h3 className="text-5xl md:text-6xl font-black leading-tight italic tracking-tighter drop-shadow-xl">
                    {mainValue}
                  </h3>
                </div>
            </div>
            <div className={`w-16 h-16 ${scheme.accentBg} backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner group-hover:rotate-6 transition-transform`}>
                <div className={scheme.accentText}>{accentIcon}</div>
            </div>
          </div>

          {(subValue || subLabel) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/20 pt-10">
              {subValue && (
                <div>
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                       <DollarSign size={12} /> {subLabel || "TOPLAM GERİ ÖDEME"}
                    </p>
                    <p className="text-2xl md:text-3xl font-black tracking-tight">{subValue}</p>
                </div>
              )}
              
              {gaugePercentage !== undefined && (
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="opacity-10"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={176}
                        strokeDashoffset={176 - (176 * gaugePercentage) / 100}
                        className={scheme.accentText}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-black">%{Math.round(gaugePercentage)}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-1">{gaugeLabel}</p>
                    <p className="text-sm font-black text-white/90">Maliyet Oranı</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ITEMS GRID (3D TILES) */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-2xl space-y-4 hover:-translate-y-1 transition-transform border-b-8 border-secondary/10">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color || "bg-blue-500/10 text-blue-500"}`}>
                  {item.icon || <Info size={16} />}
                </div>
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{item.label}</span>
              </div>
              <p className="text-2xl font-black text-primary tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER / INFO SECTION */}
      {footerText && (
        <div className="bg-surface p-6 rounded-[2.5rem] border border-border flex items-start gap-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-muted shrink-0">
            <Info size={20} />
          </div>
          <p className="text-[10px] text-muted leading-relaxed font-bold italic" dangerouslySetInnerHTML={{ __html: footerText }} />
        </div>
      )}
    </div>
  );
};
