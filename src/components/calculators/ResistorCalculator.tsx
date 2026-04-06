"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface ColorCode {
  color: string;
  value: number;
  multiplier: number;
  tolerance?: number;
  tempCoeff?: number;
  hex: string;
  textColor?: string;
  group?: string;
}

const COLORS: Record<string, ColorCode> = {
  black: { color: "Siyah", value: 0, multiplier: 1, hex: "#1A1A1A", textColor: "white", group: "std" },
  brown: { color: "Kahve", value: 1, multiplier: 10, tolerance: 1, tempCoeff: 100, hex: "#5D4037", textColor: "white", group: "std" },
  red: { color: "Kırmızı", value: 2, multiplier: 100, tolerance: 2, tempCoeff: 50, hex: "#D32F2F", textColor: "white", group: "std" },
  orange: { color: "Turuncu", value: 3, multiplier: 1000, tempCoeff: 15, hex: "#F57C00", textColor: "black", group: "std" },
  yellow: { color: "Sarı", value: 4, multiplier: 10000, tempCoeff: 25, hex: "#FBC02D", textColor: "black", group: "std" },
  green: { color: "Yeşil", value: 5, multiplier: 100000, tolerance: 0.5, tempCoeff: 20, hex: "#388E3C", textColor: "white", group: "std" },
  blue: { color: "Mavi", value: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10, hex: "#1976D2", textColor: "white", group: "std" },
  violet: { color: "Mor", value: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5, hex: "#7B1FA2", textColor: "white", group: "std" },
  grey: { color: "Gri", value: 8, multiplier: 100000000, tolerance: 0.05, tempCoeff: 1, hex: "#616161", textColor: "white", group: "std" },
  white: { color: "Beyaz", value: 9, multiplier: 1000000000, hex: "#F5F5F5", textColor: "black", group: "std" },
  gold: { color: "Altın", value: -1, multiplier: 0.1, tolerance: 5, hex: "#FFD700", textColor: "black", group: "special" },
  silver: { color: "Gümüş", value: -1, multiplier: 0.01, tolerance: 10, hex: "#C0C0C0", textColor: "black", group: "special" },
};

export function ResistorCalculator() {
  const [bands, setBands] = useState<number>(4);
  const [selectedBands, setSelectedBands] = useState<string[]>(["brown", "black", "red", "gold"]);
  const [result, setResult] = useState<{ value: number; tolerance: number; label: string; ppm?: number } | null>(null);

  useEffect(() => {
    if (bands === 4) {
      setSelectedBands(["brown", "black", "red", "gold"]);
    } else if (bands === 5) {
      setSelectedBands(["brown", "black", "black", "red", "gold"]);
    } else {
      setSelectedBands(["brown", "black", "black", "orange", "brown", "red"]);
    }
  }, [bands]);

  const updateBand = (index: number, color: string) => {
    const newBands = [...selectedBands];
    newBands[index] = color;
    setSelectedBands(newBands);
  };

  const calculate = () => {
    let value = 0;
    let tolerance = 0;
    let ppm = undefined;

    if (bands === 4) {
      const b1 = COLORS[selectedBands[0]].value;
      const b2 = COLORS[selectedBands[1]].value;
      const mult = COLORS[selectedBands[2]].multiplier;
      tolerance = COLORS[selectedBands[3]].tolerance || 5;
      value = (b1 * 10 + b2) * mult;
    } else if (bands === 5) {
      const b1 = COLORS[selectedBands[0]].value;
      const b2 = COLORS[selectedBands[1]].value;
      const b3 = COLORS[selectedBands[2]].value;
      const mult = COLORS[selectedBands[3]].multiplier;
      tolerance = COLORS[selectedBands[4]].tolerance || 5;
      value = (b1 * 100 + b2 * 10 + b3) * mult;
    } else {
      const b1 = COLORS[selectedBands[0]].value;
      const b2 = COLORS[selectedBands[1]].value;
      const b3 = COLORS[selectedBands[2]].value;
      const mult = COLORS[selectedBands[3]].multiplier;
      tolerance = COLORS[selectedBands[4]].tolerance || 5;
      ppm = COLORS[selectedBands[5]].tempCoeff || 0;
      value = (b1 * 100 + b2 * 10 + b3) * mult;
    }

    let label = value >= 1000000 ? (value / 1000000).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + " MΩ" : (value >= 1000 ? (value / 1000).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + " kΩ" : value.toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + " Ω");
    
    setResult({ value, tolerance, label, ppm });
  };

  useEffect(() => {
    calculate();
  }, [selectedBands, bands]);

  const getBandLabel = (idx: number) => {
    if (bands === 4) {
      return idx === 0 ? "1. Değer" : idx === 1 ? "2. Değer" : idx === 2 ? "Çarpan" : "Tolerans";
    } else if (bands === 5) {
      return idx < 3 ? `${idx+1}. Değer` : idx === 3 ? "Çarpan" : "Tolerans";
    } else {
      return idx < 3 ? `${idx+1}. Değer` : idx === 3 ? "Çarpan" : idx === 4 ? "Tolerans" : "Isı Katsayısı (PPM)";
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto">
      {/* Industrial Simulation Area */}
      <div className="panel p-12 bg-secondary/5 border-border rounded-[3.5rem] border-b-[12px] border-blue-500/10 flex flex-col items-center gap-12 overflow-hidden relative shadow-2xl">
         <div className="absolute top-6 left-10 flex flex-col gap-1">
            <h3 className="text-xl font-black italic tracking-tighter text-blue-600 uppercase">Resistor Dynamics Pro</h3>
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Precision Component Hub v5.0</p>
         </div>
         
         {/* Mode Switcher */}
         <div className="flex bg-surface p-1.5 rounded-[2rem] gap-1 z-10 border-2 border-border shadow-lg">
            {[4, 5, 6].map((b) => (
              <button 
                 key={b}
                 onClick={() => setBands(b)}
                 className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase transition-all tracking-widest ${bands === b ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-muted hover:text-primary hover:bg-secondary/20'}`}
              >
                 {b} BANTLI
              </button>
            ))}
         </div>

         {/* Detailed SVG Resistor */}
         <div className="w-full max-w-2xl relative mt-4">
           <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <defs>
                 <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4BD9F" />
                    <stop offset="50%" stopColor="#F5E6CC" />
                    <stop offset="100%" stopColor="#C4AD8F" />
                 </linearGradient>
                 <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A1A1A1" />
                    <stop offset="50%" stopColor="#E2E2E2" />
                    <stop offset="100%" stopColor="#A1A1A1" />
                 </linearGradient>
                 <filter id="bandShadow" x="-2" y="-2" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                    <feOffset dx="1" dy="1" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                 </filter>
              </defs>
              
              {/* Wires */}
              <rect x="0" y="70" width="600" height="10" rx="5" fill="url(#wireGrad)" />
              
              {/* Body Nodes */}
              <rect x="150" y="40" width="300" height="70" rx="35" fill="url(#bodyGrad)" stroke="#B49D7F" strokeWidth="2" />
              <rect x="120" y="45" width="80" height="60" rx="30" fill="url(#bodyGrad)" stroke="#B49D7F" strokeWidth="2" />
              <rect x="400" y="45" width="80" height="60" rx="30" fill="url(#bodyGrad)" stroke="#B49D7F" strokeWidth="2" />
              
              {/* Dynamic Bands */}
              {selectedBands.map((color, i) => {
                 let xPos = 0;
                 if (bands === 4) {
                    xPos = [145, 195, 245, 415][i];
                 } else if (bands === 5) {
                    xPos = [145, 185, 225, 265, 415][i];
                 } else {
                    xPos = [145, 180, 215, 250, 285, 415][i];
                 }
                 
                 return (
                    <rect 
                       key={i} 
                       x={xPos} 
                       y={i === 0 || i === selectedBands.length-1 ? 40 : 45} 
                       width="15" 
                       height={i === 0 || i === selectedBands.length-1 ? 70 : 60} 
                       fill={COLORS[color].hex} 
                       className="transition-all duration-700 ease-in-out"
                       filter="url(#bandShadow)"
                       rx="2"
                    />
                 );
              })}
           </svg>
         </div>

         {/* Result Dashboard */}
         {result && (
           <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full px-10 animate-fadeIn">
              <div className="flex flex-col items-center">
                 <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 italic">Hesaplanan Direnç</div>
                 <div className="text-7xl font-black italic tracking-tighter text-primary drop-shadow-sm">{result.label}</div>
              </div>
              <div className="h-16 w-px bg-border/50 hidden md:block"></div>
              <div className="grid grid-cols-2 gap-8 min-w-[240px]">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Tolerans</span>
                    <span className="text-2xl font-black text-amber-500 italic">±%{result.tolerance}</span>
                 </div>
                 {result.ppm !== undefined && (
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Isı Katsayısı</span>
                       <span className="text-2xl font-black text-purple-600 italic">{result.ppm} PPM</span>
                    </div>
                 )}
              </div>
           </div>
         )}
      </div>

      {/* Controller Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {selectedBands.map((band, bandIndex) => {
            const label = getBandLabel(bandIndex);
            const isTolerance = (bands === 4 && bandIndex === 3) || (bands === 5 && bandIndex === 4) || (bands === 6 && bandIndex === 4);
            const isMultiplier = (bands === 4 && bandIndex === 2) || (bands === 5 && bandIndex === 3) || (bands === 6 && bandIndex === 3);
            const isPPM = bands === 6 && bandIndex === 5;
            
            return (
              <div key={bandIndex} className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem] group hover:border-blue-500/20 transition-all flex flex-col gap-4 shadow-sm">
                 <div className="flex justify-between items-center px-2">
                    <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em] italic">
                       {label}
                    </span>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-primary uppercase">{COLORS[band].color}</span>
                       <div className="w-4 h-4 rounded-full border-2 border-surface shadow-md" style={{ backgroundColor: COLORS[band].hex }}></div>
                    </div>
                 </div>
                 <div className="grid grid-cols-4 gap-2">
                    {Object.entries(COLORS).map(([key, info]) => {
                       // Custom filtering for professional accuracy
                       if (isTolerance && info.tolerance === undefined) return null;
                       if (isPPM && info.tempCoeff === undefined) return null;
                       if (!isTolerance && !isMultiplier && !isPPM && info.value === -1) return null;
                       
                       return (
                          <button 
                             key={key}
                             onClick={() => updateBand(bandIndex, key)}
                             className={`h-10 rounded-xl border-2 transition-all hover:scale-110 active:scale-90 flex items-center justify-center group/btn relative ${selectedBands[bandIndex] === key ? 'border-blue-500 shadow-lg scale-105 z-10' : 'border-border/50 opacity-60'}`}
                             style={{ backgroundColor: info.hex }}
                          >
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 bg-black/10 rounded-xl transition-opacity">
                                <span className="text-[8px] font-black text-white px-2 text-center uppercase leading-tight drop-shadow-md">
                                   {isTolerance ? '±%' + info.tolerance : (isMultiplier ? 'x' : (isPPM ? info.tempCoeff : info.value))}
                                </span>
                             </div>
                          </button>
                       );
                    })}
                 </div>
              </div>
            );
         })}
      </div>

      <div className="panel p-8 bg-blue-600/5 border border-blue-600/10 rounded-[3rem] flex items-start gap-6 relative overflow-hidden group">
         <div className="absolute -right-4 -bottom-4 text-9xl opacity-[0.03] rotate-12 select-none group-hover:rotate-0 transition-transform">⚙️</div>
         <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-blue-500/20">📘</div>
         <div className="flex flex-col gap-2">
            <h4 className="text-base font-black text-primary uppercase tracking-widest italic">İleri Seviye Mühendislik Kılavuzu</h4>
            <p className="text-xs leading-relaxed text-muted font-medium max-w-4xl">
               <b>6 Bantlı Dirençler:</b> Askeri ve endüstriyel standartlarda kullanılır. 5 bantlı hassas dirençlere ek olarak "Isı Katsayısı" (PPM/K) bandı ekler. Bu band ısı değişimlerinde direncin ne kadar sapacağını (Milyonda parça bazında) ifade eder.
               <br />
               <b>Hassasiyet:</b> 10KΩ (Kahve-Siyah-Orange) standart bir değer iken, 10.0KΩ (Kahve-Siyah-Siyah-Kırmızı) %1 hata payı ile daha hassas devreler için uygundur. Projelerinizde mutlaka tolerans değerini (+/-) göz önünde bulundurunuz.
            </p>
         </div>
      </div>
    </div>
  );
}
