"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Material {
  name: string;
  density: number; // g/cm3
}

const MATERIALS: Material[] = [
  { name: "Çelik (St 37/52)", density: 7.85 },
  { name: "Paslanmaz Çelik", density: 8.00 },
  { name: "Alüminyum", density: 2.70 },
  { name: "Bakır", density: 8.96 },
  { name: "Demir", density: 7.87 },
  { name: "Pirinç", density: 8.50 }
];

type Shape = "plate" | "round" | "pipe";

export function SteelWeightCalculator() {
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [shape, setShape] = useState<Shape>("plate");
  const [coating, setCoating] = useState("1.0"); // 1.0 = None, 1.05 = Galvanized

  // Dimensions (mm)
  const [dim1, setDim1] = useState("1000"); // Length / Height
  const [dim2, setDim2] = useState("1000"); // Width / Diameter
  const [dim3, setDim3] = useState("5");    // Thickness / Wall Thickness

  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const l = parseFloat(dim1) || 0;
    const wD = parseFloat(dim2) || 0;
    const t = parseFloat(dim3) || 0;
    const rho = material.density;
    const coatFactor = parseFloat(coating);

    let weightKg = 0;

    if (shape === "plate") {
      // Plate: L(mm) * W(mm) * T(mm) * Rho / 1,000,000
      weightKg = (l * wD * t * rho) / 1000000;
    } else if (shape === "round") {
      // Round Bar: PI * (D/2)^2 * L * Rho / 1,000,000
      const radius = wD / 2;
      weightKg = (Math.PI * Math.pow(radius, 2) * l * rho) / 1000000;
    } else if (shape === "pipe") {
      // Pipe: PI * (R_out^2 - R_in^2) * L * Rho / 1,000,000
      const rOut = wD / 2;
      const rIn = rOut - t;
      if (rIn < 0) { weightKg = 0; }
      else {
        weightKg = (Math.PI * (Math.pow(rOut, 2) - Math.pow(rIn, 2)) * l * rho) / 1000000;
      }
    }

    weightKg *= coatFactor;
    setResult(weightKg);

    if (weightKg > 0) {
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#64748b", "#94a3b8", "#cbd5e1"]
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [material, shape, dim1, dim2, dim3, coating]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-12">
           <div className="flex bg-secondary/15 p-1 rounded-3xl gap-1 mb-6 max-w-xl mx-auto">
              <button 
                 onClick={() => setShape("plate")}
                 className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${shape === "plate" ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}
              >
                 📐 Plaka / Levha
              </button>
              <button 
                 onClick={() => setShape("round")}
                 className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${shape === "round" ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}
              >
                 ⭕ Dolu Mil
              </button>
              <button 
                 onClick={() => setShape("pipe")}
                 className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${shape === "pipe" ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}
              >
                 🚇 Boru / Profil
              </button>
           </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-slate-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Malzeme Seçimi</label>
                 <select 
                    onChange={(e) => setMaterial(MATERIALS[parseInt(e.target.value)])}
                    className="input-field !py-4 font-black cursor-pointer bg-white"
                 >
                    {MATERIALS.map((m, i) => (
                       <option key={m.name} value={i}>{m.name} (ρ: {m.density})</option>
                    ))}
                 </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Boy / Uzunluk (mm)</label>
                    <input type="number" value={dim1} onChange={e => setDim1(e.target.value)} className="input-field !py-4 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">
                       {shape === "plate" ? "En / Genişlik (mm)" : "Dış Çap (mm)"}
                    </label>
                    <input type="number" value={dim2} onChange={e => setDim2(e.target.value)} className="input-field !py-4 font-black text-center"/>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">
                       {shape === "plate" ? "Et Kalınlığı (mm)" : shape === "round" ? "-" : "Et Kalınlığı (mm)"}
                    </label>
                    <input 
                       className="input-field !py-4 font-black text-center"
                       disabled={shape === "round"}
                       type="number" 
                       value={dim3} 
                       onChange={e => setDim3(e.target.value)} 
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Kaplama</label>
                    <select value={coating} onChange={e => setCoating(e.target.value)} className="input-field !py-4 font-black cursor-pointer bg-white">
                       <option value="1.0">Yok / Yalın</option>
                       <option value="1.05">Galvaniz (+%5)</option>
                       <option value="1.02">Sıcak Boya (+%2)</option>
                    </select>
                 </div>
              </div>

              <div className="mt-4 p-5 bg-slate-500/5 rounded-2xl border border-slate-500/10 flex items-start gap-4">
                 <span className="text-2xl">🔧</span>
                 <p className="text-[10px] text-slate-900/70 dark:text-slate-400 leading-relaxed font-bold italic">
                    CAD standartlarında yoğunluk (ρ) değerleri baz alınmıştır. Tolerans payı ±%2'dir.
                 </p>
              </div>
           </div>
        </div>

        {/* Display Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {result !== null ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-slate-900 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-10 font-black italic text-[10px] text-white tracking-[0.5em] uppercase rotate-12">Industrial Calc v1.0</div>
                    
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-5xl mb-8">🏗️</div>
                    
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic">Toplam Ağırlık (kg)</span>
                    
                    <div className="text-7xl font-black italic tracking-tighter text-white mb-4">
                       {result.toLocaleString('tr-TR', { maximumFractionDigits: 3 })}
                    </div>

                    <div className="mt-8 px-6 py-2 rounded-full border border-slate-700 bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">
                       {material.name} - {shape.toUpperCase()} PROFiL
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 px-10">
                       <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Hacim</span>
                          <span className="text-xs font-bold text-slate-300">{(result / material.density).toFixed(2)} cm³</span>
                       </div>
                       <div className="flex flex-col items-center border-l border-slate-700">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Maliyet Tahmini</span>
                          <span className="text-xs font-bold text-slate-300">Lojistik Uygun</span>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">🔩</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">TEKNİK ÖLÇÜLERİ GİRİNİZ</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
