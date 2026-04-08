"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, Ruler, Square, RectangleHorizontal, Circle, Triangle, Box, Cylinder, Globe, Cone, ChevronRight } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
        res.steps = [`A = a² = ${a}² = ${a * a}`, `C = 4a = 4 * ${a} = ${4 * a}`];
        break;
      case "dikdortgen":
        res.label1 = "Alan (A)"; res.val1 = a * b;
        res.label2 = "Çevre (C)"; res.val2 = 2 * (a + b);
        res.steps = [`A = a * b = ${a} * ${b} = ${a * b}`, `C = 2 * (a + b) = 2 * (${a} + ${b}) = ${2 * (a + b)}`];
        break;
      case "daire":
        res.label1 = "Alan (A)"; res.val1 = PI * r * r;
        res.label2 = "Çevre (C)"; res.val2 = 2 * PI * r;
        res.steps = [`A = π * r² = 3.14 * ${r}² = ${(PI * r * r).toFixed(2)}`, `C = 2 * π * r = 2 * 3.14 * ${r} = ${(2 * PI * r).toFixed(2)}`];
        break;
      case "ucgen":
        res.label1 = "Alan (A)"; res.val1 = (b * h) / 2;
        res.label2 = "Hipotenüs (c)"; res.val2 = Math.sqrt(b * b + h * h);
        res.steps = [`A = (b * h) / 2 = (${b} * ${h}) / 2 = ${(b * h) / 2}`, `c = √(b² + h²) = √(${b}² + ${h}²) = ${Math.sqrt(b * b + h * h).toFixed(2)}`];
        break;
      case "kure":
        res.label1 = "Hacim (V)"; res.val1 = (4 / 3) * PI * Math.pow(r, 3);
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 4 * PI * r * r;
        res.steps = [`V = (4/3)πr³ = 4.18 * ${r}³ = ${((4 / 3) * PI * Math.pow(r, 3)).toFixed(2)}`, `S = 4πr² = 12.56 * ${r}² = ${(4 * PI * r * r).toFixed(2)}`];
        break;
      case "silindir":
        res.label1 = "Hacim (V)"; res.val1 = PI * r * r * h;
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 2 * PI * r * (r + h);
        res.steps = [`V = πr²h = 3.14 * ${r}² * ${h} = ${(PI * r * r * h).toFixed(2)}`, `S = 2πr(r + h) = 6.28 * ${r} * (${r} + ${h}) = ${(2 * PI * r * (r + h)).toFixed(2)}`];
        break;
      case "koni":
        res.label1 = "Hacim (V)"; res.val1 = (1 / 3) * PI * r * r * h;
        res.label2 = "Yanal Alan (S)"; res.val2 = PI * r * Math.sqrt(r * r + h * h);
        res.steps = [`V = (1/3)πr²h = 1.04 * ${r}² * ${h} = ${((1 / 3) * PI * r * r * h).toFixed(2)}`, `S = πrl = 3.14 * ${r} * ${Math.sqrt(r * r + h * h).toFixed(2)} = ${(PI * r * Math.sqrt(r * r + h * h)).toFixed(2)}`];
        break;
      case "kup":
        res.label1 = "Hacim (V)"; res.val1 = Math.pow(a, 3);
        res.label2 = "Yüzey Alanı (S)"; res.val2 = 6 * a * a;
        res.steps = [`V = a³ = ${a}³ = ${Math.pow(a, 3)}`, `S = 6a² = 6 * ${a}² = ${6 * a * a}`];
        break;
    }

    setResults(res);
  };

  useEffect(() => {
    calculate();
  }, [activeShape, params]);

  const SHAPES: { id: Shape; name: string; icon: any }[] = [
    { id: "kare", name: "Kare", icon: Square },
    { id: "dikdortgen", name: "Dikdörtgen", icon: RectangleHorizontal },
    { id: "daire", name: "Daire", icon: Circle },
    { id: "ucgen", name: "Üçgen", icon: Triangle },
    { id: "kup", name: "Küp", icon: Box },
    { id: "silindir", name: "Silindir", icon: Cylinder },
    { id: "kure", name: "Küre", icon: Globe },
    { id: "koni", name: "Koni", icon: Cone }
  ];

  const reset = () => {
    setParams({ a: "10", b: "5", r: "5", h: "10" });
  };

  return (
    <V2CalculatorWrapper
      title="GEOMETRİ HESAPLAYICI"
      icon="📐"
      infoText="2D ve 3D geometrik şekillerin alan, çevre ve hacim değerlerini anında hesaplayın. Formüller ve çözüm adımları ile öğrenmeyi destekler."
      results={results && (
        <div className="space-y-8 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard color="emerald" label={results.label1} value={results.val1.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} icon="📏" />
              <V2ResultCard color="blue" label={results.label2} value={results.val2.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} icon="📐" />
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2 px-2">
                 <Ruler className="w-4 h-4 text-emerald-500" /> ÇÖZÜM ADIMLARI
              </div>
              <div className="space-y-4">
                 {results.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all flex items-center gap-4">
                       <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                       <div className="text-xs font-mono font-bold text-primary italic leading-relaxed">{step}</div>
                    </div>
                 ))}
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-center gap-3">
                 <Info className="w-4 h-4 text-blue-500 shrink-0" />
                 <p className="text-[10px] text-muted italic">Formüllerde π (pi) sayısı yaklaşık 3.14 olarak baz alınmıştır.</p>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="flex bg-white/5 p-2 rounded-[2rem] gap-2 overflow-x-auto no-scrollbar border border-white/5 shadow-inner">
           {SHAPES.map((s) => {
              const Icon = s.icon;
              return (
                <button 
                  key={s.id}
                  onClick={() => setActiveShape(s.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all gap-3 flex items-center ${activeShape === s.id ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-muted hover:text-white hover:bg-white/5'}`}
                >
                   <Icon className={`w-5 h-5 ${activeShape === s.id ? 'text-white' : 'text-emerald-500'}`} />
                   {s.name}
                </button>
              )
           })}
        </div>

        <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
           <div className="absolute top-0 left-0 p-8 opacity-[0.03] text-8xl font-black italic pointer-events-none uppercase group-hover:opacity-[0.05] transition-opacity">{activeShape}</div>
           
           <div className="w-full max-w-[280px] aspect-square flex items-center justify-center bg-black/20 rounded-full border-4 border-dashed border-white/10 shadow-inner transition-all hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] drop-shadow-2xl">
                 {activeShape === "kare" && <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />}
                 {activeShape === "dikdortgen" && <rect x="10" y="30" width="80" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />}
                 {activeShape === "daire" && <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />}
                 {activeShape === "ucgen" && <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />}
                 {activeShape === "kup" && <><rect x="10" y="30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /><rect x="30" y="10" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 opacity-40" /><path d="M10 30 L30 10 M70 30 L90 10 M10 90 L30 70 M70 90 L90 70" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /></>}
                 {activeShape === "silindir" && <><ellipse cx="50" cy="20" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /><ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /><path d="M20 20 L20 80 M80 20 L80 80" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /></>}
                 {activeShape === "kure" && <><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /><ellipse cx="50" cy="50" rx="40" ry="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-500 opacity-40" /></>}
                 {activeShape === "koni" && <><ellipse cx="50" cy="80" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /><path d="M20 80 L50 10 L80 80" stroke="currentColor" strokeWidth="2" className="text-emerald-500" /></>}
              </svg>
           </div>

           <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {["kare", "kup"].includes(activeShape) && (
                    <V2Input label="KENAR (a)" value={params.a} onChange={v => updateParam("a", v)} type="number" fieldClassName="!text-xl font-bold italic" className="col-span-2" />
                 )}
                 {activeShape === "dikdortgen" && (
                    <>
                       <V2Input label="KISA KENAR (a)" value={params.a} onChange={v => updateParam("a", v)} type="number" fieldClassName="!text-xl font-bold italic" />
                       <V2Input label="UZUN KENAR (b)" value={params.b} onChange={v => updateParam("b", v)} type="number" fieldClassName="!text-xl font-bold italic" />
                    </>
                 )}
                 {["daire", "kure", "silindir", "koni"].includes(activeShape) && (
                    <V2Input label="YARIÇAP (r)" value={params.r} onChange={v => updateParam("r", v)} type="number" fieldClassName="!text-xl font-bold italic" className={["daire", "kure"].includes(activeShape) ? 'col-span-2' : ''} />
                 )}
                 {["ucgen", "silindir", "koni"].includes(activeShape) && (
                    <>
                       <V2Input label={activeShape === "ucgen" ? "TABAN (b)" : "YÜKSEKLİK (h)"} value={activeShape === "ucgen" ? params.b : params.h} onChange={v => updateParam(activeShape === "ucgen" ? "b" : "h", v)} type="number" fieldClassName="!text-xl font-bold italic" />
                       {activeShape === "ucgen" && <V2Input label="YÜKSEKLİK (h)" value={params.h} onChange={v => updateParam("h", v)} type="number" fieldClassName="!text-xl font-bold italic" />}
                    </>
                 )}
              </div>
              <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Analiz Ediliyor" isCalculateDisabled={true} />
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
