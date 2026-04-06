"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function KineticEnergyCalculator() {
  const [mass, setMass] = useState("5");
  const [velocity, setVelocity] = useState("10");
  const [height, setHeight] = useState("10");
  const [gravity, setGravity] = useState("9.81");

  const [results, setResults] = useState<{
    kinetic: number;
    potential: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    const m = parseFloat(mass) || 0;
    const v = parseFloat(velocity) || 0;
    const h = parseFloat(height) || 0;
    const g = parseFloat(gravity) || 0;

    if (m <= 0) {
      setResults(null);
      return;
    }

    const ke = 0.5 * m * v * v;
    const pe = m * g * h;

    setResults({
      kinetic: ke,
      potential: pe,
      total: ke + pe,
    });

    if (m > 0 && (v > 0 || h > 0)) {
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#f59e0b", "#3b82f6", "#ffffff"]
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [mass, velocity, height, gravity]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kontrol Paneli */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-amber-500/20 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono">Kütle (kg)</label>
              <input 
                type="number" 
                value={mass} 
                onChange={e => setMass(e.target.value)} 
                className="input-field !py-4 font-black text-center text-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Hız (m/s)</label>
                <input 
                  type="number" 
                  value={velocity} 
                  onChange={e => setVelocity(e.target.value)} 
                  className="input-field !py-4 font-black text-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Yükseklik (m)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={e => setHeight(e.target.value)} 
                  className="input-field !py-4 font-black text-center"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Yerçekimi İvmesi (g: m/s²)</label>
              <select 
                value={gravity} 
                onChange={e => setGravity(e.target.value)} 
                className="input-field !py-4 font-black cursor-pointer bg-white text-center"
              >
                <option value="9.81">Dünya (9.81)</option>
                <option value="1.62">Ay (1.62)</option>
                <option value="3.71">Mars (3.71)</option>
                <option value="24.79">Jüpiter (24.79)</option>
                <option value="274">Güneş (274)</option>
              </select>
            </div>

            <div className="mt-4 p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 flex items-start gap-4">
              <span className="text-2xl">⚡</span>
              <p className="text-[10px] text-amber-900/70 dark:text-amber-400 leading-relaxed font-bold italic">
                Formüller: Eₖ = ½mv² (Kinetik), Eₚ = mgh (Potansiyel). Toplam enerji mekanik korunumu temsil eder.
              </p>
            </div>
          </div>
        </div>

        {/* Gösterge Paneli */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {results ? (
            <div className="result-container-premium !animate-none h-full">
              <div className="result-card-premium !p-10 h-full bg-surface border-4 border-blue-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.5em] uppercase rotate-12">Energy Analytics v1.0</div>
                
                {/* Visual Energy Gauge (SVG) */}
                <div className="relative w-48 h-48 mb-10">
                   <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary/20" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={283}
                        strokeDashoffset={283 - (Math.min(100, (results.kinetic / (results.total || 1)) * 100) / 100) * 283}
                        strokeLinecap="round"
                        className="text-blue-500 transition-all duration-1000 ease-out" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="35" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={220}
                        strokeDashoffset={220 - (Math.min(100, (results.potential / (results.total || 1)) * 100) / 100) * 220}
                        strokeLinecap="round"
                        className="text-amber-500 transition-all duration-1000 ease-out" 
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Toplam Joules</span>
                      <span className="text-3xl font-black italic tracking-tighter text-primary">
                        {results.total > 1000000 ? `${(results.total / 1000000).toFixed(2)} MJ` : results.total.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                      </span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="flex flex-col items-center justify-center p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/10">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 italic">Kinetik (Eₖ)</span>
                    <span className="text-3xl font-black italic tracking-tighter text-primary">
                      {results.kinetic.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} J
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-amber-500/5 rounded-[2rem] border border-amber-500/10">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 italic">Potansiyel (Eₚ)</span>
                    <span className="text-3xl font-black italic tracking-tighter text-primary">
                      {results.potential.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} J
                    </span>
                  </div>
                </div>

                <div className="mt-8 w-full text-center">
                   <div className="p-4 bg-secondary/5 rounded-3xl border border-border">
                      <span className="text-[9px] font-black text-muted uppercase tracking-[0.3em] block mb-2 italic">Kalori Karşılığı</span>
                      <span className="text-xl font-bold text-primary">
                        {(results.total * 0.000239006).toLocaleString('tr-TR', { maximumFractionDigits: 3 })} kcal
                      </span>
                   </div>
                </div>

                <div className="mt-10 flex items-center gap-4 opacity-40">
                   <div className="h-px bg-border flex-1"></div>
                   <span className="text-[9px] font-black text-muted uppercase tracking-[0.4em] italic leading-none">PhysTech Engine v1.2</span>
                   <div className="h-px bg-border flex-1"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
              <span className="text-6xl mb-6">⚛️</span>
              <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">KÜTLE PARAMETRELERİNİ GİRİNİZ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
