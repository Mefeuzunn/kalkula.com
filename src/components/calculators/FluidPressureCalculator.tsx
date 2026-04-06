"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Fluid {
  name: string;
  density: number; // kg/m3
}

const FLUIDS: Fluid[] = [
  { name: "Su (Taze)", density: 1000 },
  { name: "Deniz Suyu", density: 1025 },
  { name: "Zeytinyağı", density: 920 },
  { name: "Cıva", density: 13600 },
  { name: "Alkol", density: 789 },
];

export function FluidPressureCalculator() {
  const [fluid, setFluid] = useState(FLUIDS[0]);
  const [depth, setDepth] = useState("10");
  const [gravity, setGravity] = useState("9.81");
  const [atmPressure, setAtmPressure] = useState("101325"); // 1 atm in Pa

  const [results, setResults] = useState<{
    hydrostatic: number;
    total: number;
    atmUnits: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(depth) || 0;
    const g = parseFloat(gravity) || 0;
    const rho = fluid.density;
    const pAtm = parseFloat(atmPressure) || 0;

    if (h < 0) {
      setResults(null);
      return;
    }

    const pHydro = h * rho * g;
    const pTotal = pHydro + pAtm;

    setResults({
      hydrostatic: pHydro,
      total: pTotal,
      atmUnits: pTotal / 101325,
    });

    if (h > 0) {
       confetti({
         particleCount: 15,
         spread: 40,
         origin: { y: 0.8 },
         colors: ["#3b82f6", "#60a5fa", "#ffffff"]
       });
    }
  };

  useEffect(() => {
    calculate();
  }, [fluid, depth, gravity, atmPressure]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kontrol Paneli */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
             <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono mb-1">Mevcut Akışkan</label>
                <div className="grid grid-cols-2 gap-2">
                   {FLUIDS.map(f => (
                      <button 
                        key={f.name}
                        onClick={() => setFluid(f)}
                        className={`py-3 px-1 rounded-2xl text-[9px] font-black uppercase transition-all border-2 ${fluid.name === f.name ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-surface border-border text-muted hover:border-blue-500/30'}`}
                      >
                         {f.name}
                      </button>
                   ))}
                </div>
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono">Derinlik (h: metre)</label>
                <div className="relative">
                   <input 
                      type="number" 
                      value={depth} 
                      onChange={e => setDepth(e.target.value)} 
                      className="input-field !py-4 font-black text-center text-xl"
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-blue-500 italic">m</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Yerçekimi (g)</label>
                   <input type="number" step="0.01" value={gravity} onChange={e => setGravity(e.target.value)} className="input-field !py-4 font-black text-center border-b-4 border-blue-500/10"/>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Yüzey Basıncı (Pa)</label>
                   <input type="number" value={atmPressure} onChange={e => setAtmPressure(e.target.value)} className="input-field !py-4 font-black text-center border-b-4 border-blue-500/10 text-[10px]"/>
                </div>
             </div>

             <div className="mt-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
              <span className="text-2xl">🌊</span>
              <p className="text-[10px] text-blue-900/70 dark:text-blue-400 leading-relaxed font-bold italic">
                 Hidrostatik basınç formülü: P = h · ρ · g. Toplam basınç, yüzeydeki atmosfer basıncını da kapsar.
              </p>
            </div>
          </div>
        </div>

        {/* Görselleştirme ve Sonuçlar */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="panel p-6 bg-surface border-4 border-blue-500/10 rounded-[3rem] shadow-2xl relative overflow-hidden h-full flex flex-col items-center">
              <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.5em] uppercase rotate-12">Fluid Analytics v2.0</div>
              
              {/* Tank Visualization */}
              <div className="relative w-full max-w-[280px] h-[240px] border-x-4 border-b-4 border-blue-600/30 rounded-b-3xl bg-secondary/10 mt-10 overflow-hidden mb-12">
                 {/* Fluid Surface Animation */}
                 <div className="absolute bottom-0 w-full bg-blue-500/40 border-t-2 border-blue-400 transition-all duration-700 ease-in-out flex flex-col justify-end" style={{ height: `${Math.min(100, Math.max(10, parseFloat(depth) * 5))}%` }}>
                    <div className="w-full h-full animate-pulse bg-blue-400/10"></div>
                 </div>
                 
                 {/* Depth Indicator Line */}
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-400/40 border-dashed border-t flex items-center justify-center">
                    <span className="bg-surface text-[8px] font-black italic text-red-500 px-2 rounded-full border border-red-500/20 translate-y-[-50%]">Basınç Noktası</span>
                 </div>
              </div>

              {results ? (
                 <div className="grid grid-cols-1 gap-6 w-full fade-in">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="flex flex-col items-center justify-center p-6 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/10">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 italic">Hidrostatik (Pa)</span>
                          <span className="text-3xl font-black italic tracking-tighter text-primary">
                             {results.hydrostatic.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                          </span>
                       </div>
                       <div className="flex flex-col items-center justify-center p-6 bg-secondary/10 rounded-[2.5rem] border border-border">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-3 italic">Birim Karşılığı (Atm)</span>
                          <span className="text-3xl font-black italic tracking-tighter text-primary">
                             {results.atmUnits.toLocaleString('tr-TR', { maximumFractionDigits: 3 })}
                          </span>
                       </div>
                    </div>

                    <div className="w-full p-8 bg-blue-600 shadow-xl shadow-blue-500/20 rounded-[3rem] text-center text-white relative group overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block opacity-80">Toplam Basınç (Absolute)</span>
                       <div className="text-5xl font-black italic tracking-tighter mb-1">
                          {(results.total / 1000).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} kPa
                       </div>
                       <p className="text-[10px] font-bold opacity-60 uppercase italic tracking-widest">
                          {fluid.name} @ {depth}m Derinlik
                       </p>
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-30 grayscale border-dashed border-2 border-border rounded-[3rem] w-full h-[300px]">
                    <span className="text-5xl mb-4">⚓</span>
                    <p className="text-[10px] font-black uppercase italic tracking-widest">Derinlik bilgisini mil cinsinden giriniz.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
