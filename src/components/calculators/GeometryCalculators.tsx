"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type Shape = "kare" | "dikdortgen" | "daire" | "ucgen" | "kure" | "silindir" | "koni" | "kup";

export function GeometryCalculators() {
  const [activeShape, setActiveShape] = useState<Shape>("kare");
  const [params, setParams] = useState<Record<string, string>>({ a: "10", b: "5", r: "5", h: "10" });
  const [results, setResults] = useState<{ label1: string; val1: number; label2: string; val2: number; steps: string[] } | null>(null);

  const updateParam = (key: string, val: string) => {
    setParams(prev => ({ ...prev, [key]: val }));
  };

  const calculate = () => {
    const a = parseFloat(params.a) || 0;
    const b = parseFloat(params.b) || 0;
    const r = parseFloat(params.r) || 0;
    const h = parseFloat(params.h) || 0;
    const PI = Math.PI;

    let res: any = { label1: "", val1: 0, label2: "", val2: 0, steps: [] };

    switch (activeShape) {
      case "kare":
        res.label1 = "Alan (A)"; res.val1 = a * a;
        res.label2 = "Çevre (C)"; res.val2 = 4 * a;
        res.steps = [
          `Alan Formülü: a² = ${a}² = ${a * a}`,
          `Çevre Formülü: 4a = 4 * ${a} = ${4 * a}`
        ];
        break;
      case "dikdortgen":
        res.label1 = "Alan (A)"; res.val1 = a * b;
        res.label2 = "Çevre (C)"; res.val2 = 2 * (a + b);
        res.steps = [
          `Alan Formülü: a * b = ${a} * ${b} = ${a * b}`,
          `Çevre Formülü: 2 * (a + b) = 2 * (${a} + ${b}) = ${2 * (a + b)}`
        ];
        break;
      case "daire":
        res.label1 = "Alan (A)"; res.val1 = PI * r * r;
        res.label2 = "Çevre (C)"; res.val2 = 2 * PI * r;
        res.steps = [
          `Alan Formülü: π * r² = 3.14 * ${r}² = ${(PI * r * r).toFixed(2)}`,
          `Çevre Formülü: 2 * π * r = 2 * 3.14 * ${r} = ${(2 * PI * r).toFixed(2)}`
        ];
        break;
      case "ucgen":
        res.label1 = "Alan (A)"; res.val1 = (b * h) / 2;
        res.label2 = "Hipotenüs (c)"; res.val2 = Math.sqrt(b * b + h * h);
        res.steps = [
          `Alan Formülü: (Taban * Yükseklik) / 2 = (${b} * ${h}) / 2 = ${(b * h) / 2}`,
          `Pisagor (Dik Üçgen ise): √(b² + h²) = √(${b}² + ${h}²) = ${Math.sqrt(b * b + h * h).toFixed(2)}`
        ];
        break;
      case "kure":
        res.label1 = "Hacim (V)"; res.val1 = (4 / 3) * PI * Math.pow(r, 3);
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 4 * PI * r * r;
        res.steps = [
          `Hacim: (4/3) * π * r³ = (4/3) * 3.14 * ${r}³ = ${((4 / 3) * PI * Math.pow(r, 3)).toFixed(2)}`,
          `Yüzey Alanı: 4 * π * r² = 4 * 3.14 * ${r}² = ${(4 * PI * r * r).toFixed(2)}`
        ];
        break;
      case "silindir":
        res.label1 = "Hacim (V)"; res.val1 = PI * r * r * h;
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 2 * PI * r * (r + h);
        res.steps = [
          `Hacim: π * r² * h = 3.14 * ${r}² * ${h} = ${(PI * r * r * h).toFixed(2)}`,
          `Yüzey Alanı: 2πr(r + h) = 2 * 3.14 * ${r} * (${r} + ${h}) = ${(2 * PI * r * (r + h)).toFixed(2)}`
        ];
        break;
      case "koni":
        res.label1 = "Hacim (V)"; res.val1 = (1 / 3) * PI * r * r * h;
        res.label2 = "Yanal Alan (S)"; res.val2 = PI * r * Math.sqrt(r * r + h * h);
        res.steps = [
          `Hacim: (1/3) * π * r² * h = (1/3) * 3.14 * ${r}² * ${h} = ${((1 / 3) * PI * r * r * h).toFixed(2)}`,
          `Yanal Alan: π * r * l (l=√(r²+h²)) = 3.14 * ${r} * ${Math.sqrt(r * r + h * h).toFixed(2)} = ${(PI * r * Math.sqrt(r * r + h * h)).toFixed(2)}`
        ];
        break;
      case "kup":
        res.label1 = "Hacim (V)"; res.val1 = Math.pow(a, 3);
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 6 * a * a;
        res.steps = [
          `Hacim Formülü: a³ = ${a}³ = ${Math.pow(a, 3)}`,
          `Yüzey Alanı: 6 * a² = 6 * ${a}² = ${6 * a * a}`
        ];
        break;
    }

    setResults(res);
  };

  useEffect(() => {
    calculate();
  }, [activeShape, params]);

  const SHAPES: { id: Shape; name: string; icon: string }[] = [
    { id: "kare", name: "Kare", icon: "▢" },
    { id: "dikdortgen", name: "Dikdörtgen", icon: "▭" },
    { id: "daire", name: "Daire", icon: "◯" },
    { id: "ucgen", name: "Üçgen", icon: "△" },
    { id: "kup", name: "Küp", icon: "🧊" },
    { id: "silindir", name: "Silindir", icon: "⌗" },
    { id: "kure", name: "Küre", icon: "⚪" },
    { id: "koni", name: "Koni", icon: "▽" }
  ];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Shape Selector Tabs */}
      <div className="flex bg-secondary/10 p-2 rounded-[2rem] gap-2 overflow-x-auto no-scrollbar border border-border shadow-inner">
         {SHAPES.map((s) => (
            <button 
               key={s.id}
               onClick={() => setActiveShape(s.id)}
               className={`flex-shrink-0 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all gap-2 flex items-center ${activeShape === s.id ? 'bg-accent-primary text-white shadow-xl' : 'text-muted hover:text-primary hover:bg-white/5'}`}
            >
               <span className="text-xl">{s.icon}</span>
               {s.name}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Visual & Step Section */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="panel p-10 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-accent-primary/20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 p-8 opacity-[0.03] text-8xl font-black italic pointer-events-none uppercase">{activeShape}</div>
               
               {/* Shape SVG Simulation */}
               <div className="w-full max-w-[280px] aspect-square flex items-center justify-center bg-white/50 dark:bg-white/10 rounded-full border-4 border-dashed border-border shadow-inner group transition-all hover:scale-105">
                  <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] drop-shadow-2xl">
                     {activeShape === "kare" && <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" />}
                     {activeShape === "dikdortgen" && <rect x="10" y="30" width="80" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" />}
                     {activeShape === "daire" && <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" />}
                     {activeShape === "ucgen" && <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" />}
                     {activeShape === "kup" && <><rect x="10" y="30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /><rect x="30" y="10" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary opacity-40" /><path d="M10 30 L30 10 M70 30 L90 10 M10 90 L30 70 M70 90 L90 70" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /></>}
                     {activeShape === "silindir" && <><ellipse cx="50" cy="20" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /><ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /><path d="M20 20 L20 80 M80 20 L80 80" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /></>}
                     {activeShape === "kure" && <><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /><ellipse cx="50" cy="50" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-primary opacity-40" /></>}
                     {activeShape === "koni" && <><ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /><path d="M20 80 L50 10 L80 80" stroke="currentColor" strokeWidth="2" className="text-accent-primary" /></>}
                  </svg>
               </div>

               {/* Step by Step Section */}
               <div className="flex-1 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xs font-black italic">!</span>
                     <h4 className="text-[10px] font-black text-primary uppercase tracking-widest italic animate-pulse">Adım Adım Çözüm Analizi</h4>
                  </div>
                  <div className="flex flex-col gap-3">
                     {results?.steps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border-l-4 border-accent-primary shadow-sm group hover:bg-white hover:scale-[1.02] transition-all">
                           <div className="text-[11px] font-medium text-primary italic leading-relaxed">{step}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Inputs Panel */}
            <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] grid grid-cols-2 sm:grid-cols-4 gap-4">
               {["kare", "kup"].includes(activeShape) && (
                  <div className="flex flex-col gap-2 col-span-2 sm:col-span-4">
                     <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kenar Uzunluğu (a)</label>
                     <input type="number" value={params.a} onChange={e => updateParam("a", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                  </div>
               )}
               {activeShape === "dikdortgen" && (
                  <>
                    <div className="flex flex-col gap-2 col-span-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kısa Kenar (a)</label>
                       <input type="number" value={params.a} onChange={e => updateParam("a", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Uzun Kenar (b)</label>
                       <input type="number" value={params.b} onChange={e => updateParam("b", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                    </div>
                  </>
               )}
               {["daire", "kure", "silindir", "koni"].includes(activeShape) && (
                  <div className={`flex flex-col gap-2 ${["silindir", "koni"].includes(activeShape) ? 'col-span-2' : 'col-span-4'}`}>
                     <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yarıçap (r)</label>
                     <input type="number" value={params.r} onChange={e => updateParam("r", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                  </div>
               )}
               {["ucgen", "silindir", "koni"].includes(activeShape) && (
                  <>
                    {activeShape === "ucgen" && (
                       <div className="flex flex-col gap-2 col-span-2">
                          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Taban (b)</label>
                          <input type="number" value={params.b} onChange={e => updateParam("b", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                       </div>
                    )}
                    <div className="flex flex-col gap-2 col-span-2">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">{activeShape === "ucgen" ? "Yükseklik (h)" : "Boy (h)"}</label>
                       <input type="number" value={params.h} onChange={e => updateParam("h", e.target.value)} className="input-field font-black !text-2xl" placeholder="0" />
                    </div>
                  </>
               )}
            </div>
         </div>

         {/* Result Summary (Side) */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            {results && (
               <div className="result-container-premium !animate-none h-full">
                  <div className="result-card-premium !p-8 h-full bg-accent-primary border-4 border-indigo-500 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 font-black italic text-[8px] text-white/20 tracking-widest rotate-6">Kalkula Geo-Analysis</div>
                     <div className="flex flex-col gap-8 text-white">
                        <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm group-hover:scale-[1.03] transition-transform">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 block opacity-80">{results.label1}</span>
                           <div className="text-4xl font-black italic tracking-tighter">
                              {results.val1.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
                              <span className="text-xs not-italic ml-2 opacity-60 font-bold">{["kup", "silindir", "kure", "koni"].includes(activeShape) ? 'birim³' : 'birim²'}</span>
                           </div>
                        </div>

                        <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm group-hover:scale-[1.03] transition-transform">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 block opacity-80">{results.label2}</span>
                           <div className="text-4xl font-black italic tracking-tighter">
                              {results.val2.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
                              <span className="text-xs not-italic ml-2 opacity-60 font-bold">{["kup", "silindir", "kure", "koni"].includes(activeShape) ? 'birim²' : 'birim'}</span>
                           </div>
                        </div>

                        <div className="mt-4 p-4 bg-black/10 rounded-2xl text-[9px] font-medium leading-relaxed italic opacity-80">
                           ℹ️ Formüllerde π (pi) sayısı 3.1415... olarak baz alınmıştır. Sonuçlar virgülden sonra en fazla 2 basamak olarak yuvarlanmıştır.
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
