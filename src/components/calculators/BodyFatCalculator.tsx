"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("180");
  const [neck, setNeck] = useState("40");
  const [waist, setWaist] = useState("90");
  const [hip, setHip] = useState("100"); // Only for female

  const [results, setResults] = useState<{
    bodyFat: number;
    category: string;
    description: string;
    color: string;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) || 0;
    const n = parseFloat(neck) || 0;
    const w = parseFloat(waist) || 0;
    const hp = parseFloat(hip) || 0;

    if (h <= 0 || n <= 0 || w <= 0 || (gender === "female" && hp <= 0)) {
      setResults(null);
      return;
    }

    let bf = 0;
    if (gender === "male") {
      // US Navy Male Formula
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      // US Navy Female Formula
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    if (bf < 0) bf = 0;

    let category = "Normal";
    let desc = "";
    let color = "#3b82f6"; // Blue

    if (gender === "male") {
      if (bf < 2) { category = "Hayati Derecede Az Yağ"; color = "#f87171"; }
      else if (bf < 6) { category = "Esansiyel / Atletik"; color = "#34d399"; }
      else if (bf < 14) { category = "Profesyonel Sporcu"; color = "#10b981"; }
      else if (bf < 18) { category = "Fit"; color = "#60a5fa"; }
      else if (bf < 25) { category = "Ortalama / Sağlıklı"; color = "#fbbf24"; }
      else { category = "Aşırı Yağlanma (Obese)"; color = "#ef4444"; }
    } else {
      if (bf < 10) { category = "Hayati Derecede Az Yağ"; color = "#f87171"; }
      else if (bf < 14) { category = "Esansiyel / Atletik"; color = "#34d399"; }
      else if (bf < 21) { category = "Profesyonel Sporcu"; color = "#10b981"; }
      else if (bf < 25) { category = "Fit"; color = "#60a5fa"; }
      else if (bf < 32) { category = "Ortalama / Sağlıklı"; color = "#fbbf24"; }
      else { category = "Aşırı Yağlanma (Obese)"; color = "#ef4444"; }
    }

    setResults({ bodyFat: bf, category, description: desc, color });

    if (bf > 5 && bf < 25) {
       confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 }, colors: [color, "#ffffff"] });
    }
  };

  useEffect(() => {
    calculate();
  }, [gender, weight, height, neck, waist, hip]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-cyan-500/20 flex flex-col gap-6">
              <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
                 <button 
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-surface text-cyan-600 shadow-sm' : 'text-muted'}`}
                 >
                    ♂ ERKEK
                 </button>
                 <button 
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-surface text-cyan-600 shadow-sm' : 'text-muted'}`}
                 >
                    ♀ KADIN
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Boy (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field !py-4 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Boyun (cm)</label>
                    <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className="input-field !py-4 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Bel (cm)</label>
                    <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="input-field !py-4 font-black text-center"/>
                 </div>
                 {gender === "female" && (
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kalça (cm)</label>
                       <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="input-field !py-4 font-black text-center"/>
                    </div>
                 )}
              </div>

              <div className="mt-4 p-5 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 flex items-start gap-4">
                 <span className="text-2xl">📏</span>
                 <p className="text-[10px] text-cyan-900/70 dark:text-cyan-400 leading-relaxed font-bold italic">
                    US Navy metodunda ölçümleri doğru almak sonucu %99 etkiler. Bel ölçümünü göbek deliği hizasından yapınız.
                 </p>
              </div>
           </div>
        </div>

        {/* Display Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-surface border-4 border-cyan-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-cyan-600 tracking-[0.5em] uppercase rotate-12">Bio Matrix v3.0</div>
                    
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center text-5xl mb-8">🧑‍🔬</div>
                    
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em] mb-4 italic">Vücut Yağ Oranı (BF%)</span>
                    
                    <div className="text-7xl font-black italic tracking-tighter mb-4" style={{ color: results.color }}>
                       %{results.bodyFat.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                    </div>

                    <div className="mt-4 px-8 py-2 rounded-full border-2 font-black text-[12px] uppercase tracking-widest mb-10" style={{ borderColor: results.color + "33", color: results.color, background: results.color + "08" }}>
                       {results.category}
                    </div>

                    <div className="w-full grid grid-cols-5 gap-1 px-10">
                       {/* Visual scale */}
                       {[1,2,3,4,5].map(i => (
                          <div key={i} className={`h-2 rounded-full transition-all duration-1000 ${i <= (results.bodyFat / 8) + 1 ? 'scale-y-125 opacity-100' : 'opacity-20'}`} style={{ background: results.color }}></div>
                       ))}
                    </div>
                    <span className="text-[9px] font-black text-muted uppercase mt-4 tracking-widest italic leading-relaxed">US Navy Body Fat Standard Analysis</span>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">⚙️</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">VÜCUT ÖLÇÜLERİNİZİ GİRİNİZ</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
