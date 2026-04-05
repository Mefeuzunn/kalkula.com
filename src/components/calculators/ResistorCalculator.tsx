"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface ColorCode {
  color: string;
  value: number;
  multiplier: number;
  tolerance?: number;
  hex: string;
  textColor?: string;
}

const COLORS: Record<string, ColorCode> = {
  black: { color: "Siyah", value: 0, multiplier: 1, hex: "#000000", textColor: "white" },
  brown: { color: "Kahve", value: 1, multiplier: 10, tolerance: 1, hex: "#8B4513", textColor: "white" },
  red: { color: "Kırmızı", value: 2, multiplier: 100, tolerance: 2, hex: "#FF0000", textColor: "white" },
  orange: { color: "Turuncu", value: 3, multiplier: 1000, hex: "#FFA500", textColor: "black" },
  yellow: { color: "Sarı", value: 4, multiplier: 10000, hex: "#FFFF00", textColor: "black" },
  green: { color: "Yeşil", value: 5, multiplier: 100000, tolerance: 0.5, hex: "#008000", textColor: "white" },
  blue: { color: "Mavi", value: 6, multiplier: 1000000, tolerance: 0.25, hex: "#0000FF", textColor: "white" },
  violet: { color: "Mor", value: 7, multiplier: 10000000, tolerance: 0.1, hex: "#EE82EE", textColor: "black" },
  grey: { color: "Gri", value: 8, multiplier: 100000000, tolerance: 0.05, hex: "#808080", textColor: "white" },
  white: { color: "Beyaz", value: 9, multiplier: 1000000000, hex: "#FFFFFF", textColor: "black" },
  gold: { color: "Altın", value: -1, multiplier: 0.1, tolerance: 5, hex: "#D4AF37", textColor: "black" },
  silver: { color: "Gümüş", value: -1, multiplier: 0.01, tolerance: 10, hex: "#C0C0C0", textColor: "black" },
};

export function ResistorCalculator() {
  const [bands, setBands] = useState<number>(4);
  const [selectedBands, setSelectedBands] = useState<string[]>(["brown", "black", "red", "gold"]);
  const [result, setResult] = useState<{ value: number; tolerance: number; label: string } | null>(null);

  // Update selected bands when band count changes
  useEffect(() => {
    if (bands === 4) {
      setSelectedBands(["brown", "black", "red", "gold"]);
    } else {
      setSelectedBands(["brown", "black", "black", "red", "gold"]);
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

    if (bands === 4) {
      const b1 = COLORS[selectedBands[0]].value;
      const b2 = COLORS[selectedBands[1]].value;
      const mult = COLORS[selectedBands[2]].multiplier;
      tolerance = COLORS[selectedBands[3]].tolerance || 5;
      value = (b1 * 10 + b2) * mult;
    } else {
      const b1 = COLORS[selectedBands[0]].value;
      const b2 = COLORS[selectedBands[1]].value;
      const b3 = COLORS[selectedBands[2]].value;
      const mult = COLORS[selectedBands[3]].multiplier;
      tolerance = COLORS[selectedBands[4]].tolerance || 5;
      value = (b1 * 100 + b2 * 10 + b3) * mult;
    }

    let label = value >= 1000000 ? (value / 1000000).toFixed(2) + " MΩ" : (value >= 1000 ? (value / 1000).toFixed(2) + " kΩ" : value.toFixed(1) + " Ω");
    
    setResult({ value, tolerance, label });
  };

  useEffect(() => {
    calculate();
  }, [selectedBands, bands]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Simulation Area */}
      <div className="panel p-10 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-accent-primary/20 flex flex-col items-center gap-10 overflow-hidden relative">
         <div className="absolute top-0 right-0 p-6 opacity-10 font-bold italic text-xs tracking-widest uppercase rotate-45 select-none">Engineering Suite</div>
         
         {/* Mode Toggle */}
         <div className="flex bg-secondary/20 p-1.5 rounded-2xl gap-2 z-10 border border-border/50">
            {[4, 5].map((b) => (
              <button 
                 key={b}
                 onClick={() => setBands(b)}
                 className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${bands === b ? 'bg-accent-primary text-white shadow-xl' : 'text-muted hover:text-primary hover:bg-white/5'}`}
              >
                 {b} BANTLI
              </button>
            ))}
         </div>

         {/* Resistor SVG */}
         <div className="w-full max-w-lg relative group active:scale-[0.98] transition-transform">
           <svg viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
              {/* Resistor Body */}
              <rect x="100" y="30" width="300" height="60" rx="30" fill="#E8D5B5" stroke="#D1B894" strokeWidth="2" />
              <path d="M0 60 H100 M400 60 H500" stroke="#A1A1A1" strokeWidth="6" strokeLinecap="round" />
              
              {/* Bands */}
              {selectedBands.map((color, i) => {
                 const xPos = bands === 4 
                   ? [130, 170, 210, 320][i] 
                   : [130, 165, 200, 235, 320][i];
                 return (
                   <rect key={i} x={xPos} y="30" width="12" height="60" fill={COLORS[color].hex} className="transition-all duration-500" />
                 );
              })}
           </svg>
         </div>

         {/* Quick Result Label */}
         {result && (
           <div className="flex flex-col items-center text-center animate-fadeIn">
              <div className="text-6xl font-black italic tracking-tighter text-primary animate-glow">{result.label}</div>
              <div className="text-xs font-black text-muted uppercase tracking-[0.4em] mt-2 italic">TOLERANS: ±%{result.tolerance}</div>
           </div>
         )}
      </div>

      {/* Control Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {selectedBands.map((band, bandIndex) => {
            const isTolerance = bandIndex === (bands - 1);
            const isMultiplier = bandIndex === (bands - 2);
            
            return (
              <div key={bandIndex} className="panel p-5 bg-secondary/5 border-border rounded-3xl group hover:border-accent-primary/20 transition-all flex flex-col gap-3">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">
                       {bandIndex + 1}. BANT {isTolerance ? "(Tolerans)" : (isMultiplier ? "(Çarpan)" : "(Değer)")}
                    </span>
                    <div className="w-3 h-3 rounded-full border border-border shadow-sm" style={{ backgroundColor: COLORS[band].hex }}></div>
                 </div>
                 <div className="grid grid-cols-4 gap-1.5">
                    {Object.entries(COLORS).map(([key, info]) => {
                       // Filter based on band rules
                       if (isTolerance && info.tolerance === undefined) return null;
                       if (!isTolerance && !isMultiplier && info.value === -1) return null;
                       
                       return (
                          <button 
                             key={key}
                             title={`${info.color}: ${isTolerance ? '±%' + info.tolerance : (isMultiplier ? 'x' + info.multiplier : info.value)}`}
                             onClick={() => updateBand(bandIndex, key)}
                             className={`h-8 rounded-lg border-2 transition-all hover:scale-110 active:scale-90 ${selectedBands[bandIndex] === key ? 'border-accent-primary shadow-inner scale-105' : 'border-border'}`}
                             style={{ backgroundColor: info.hex }}
                          />
                       );
                    })}
                 </div>
              </div>
            );
         })}
      </div>

      {/* Info Card */}
      <div className="panel p-6 bg-accent-primary/5 border border-accent-primary/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
         <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-2xl">💡</div>
         <div className="flex flex-col gap-1">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest italic">Direnç Renk Kodları Nasıl Okunur?</h4>
            <p className="text-[11px] leading-relaxed text-muted font-medium">
               4 Bantlı dirençlerde ilk iki bant sayısal değeri, üçüncü bant çarpanı (10'un kuvveti), dördüncü bant ise toleransı (hata payını) temsil eder. 
               5 Bantlı (Hassas) dirençlerde ise ilk üç bant sayı, dördüncü çarpan, beşinci ise toleranstır. 
               <b> Sokakta Sayan:</b> <u>S</u>iyah, <u>K</u>ahve, <u>K</u>ırmızı, <u>T</u>uruncu, <u>S</u>arı, <u>Y</u>eşil, <u>M</u>avi, <u>M</u>or, <u>G</u>ri, <u>B</u>eyaz (0-9) kodlamasıyla kolayca hatırlanabilir.
            </p>
         </div>
      </div>
    </div>
  );
}
