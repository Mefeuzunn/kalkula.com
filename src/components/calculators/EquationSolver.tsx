"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function EquationSolver() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");
  
  const [results, setResults] = useState<{
    delta: number;
    roots: string[];
    steps: { title: string; content: string }[];
  } | null>(null);

  const calculate = () => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;
    const numC = parseFloat(c) || 0;

    if (numA === 0) {
      setResults({
        delta: 0,
        roots: [(-numC / numB).toFixed(2)],
        steps: [{ title: "Derece Analizi", content: "Bu bir 1. derece denklemdir. x = -c / b" }]
      });
      return;
    }

    const delta = (numB * numB) - (4 * numA * numC);
    const steps = [];

    steps.push({ 
      title: "1. Diskriminant (Δ) Hesaplama", 
      content: `Δ = b² - 4ac = (${numB})² - 4(${numA})(${numC}) = ${delta}` 
    });

    let roots: string[] = [];
    if (delta > 0) {
      const x1 = (-numB + Math.sqrt(delta)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(delta)) / (2 * numA);
      roots = [x1.toFixed(2), x2.toFixed(2)];
      steps.push({
        title: "2. Köklerin Bulunması (Δ > 0)",
        content: `x₁,₂ = (-b ± √Δ) / 2a \nx₁ = ${roots[0]}, x₂ = ${roots[1]}`
      });
      confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 }, colors: ["#22c55e", "#10b981"] });
    } else if (delta === 0) {
      const x = -numB / (2 * numA);
      roots = [x.toFixed(2)];
      steps.push({
        title: "2. Çakışık Kök (Δ = 0)",
        content: `x = -b / 2a = ${roots[0]}`
      });
    } else {
      roots = ["Reel Kök Yok"];
      steps.push({
        title: "Sonuç (Δ < 0)",
        content: "Delta sıfırdan küçük olduğu için reel kök yoktur. Karmaşık sayılar kullanılmalıdır."
      });
    }

    setResults({ delta, roots, steps });
  };

  useEffect(() => {
    calculate();
  }, [a, b, c]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Equation Input */}
        <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-green-500/20 flex flex-col gap-6">
           <div className="flex flex-col items-center mb-4">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em] italic mb-2">Genel Formül</span>
              <div className="text-xl font-black italic tracking-tighter text-primary">ax² + bx + c = 0</div>
           </div>

           <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">a</label>
                 <input type="number" value={a} onChange={e => setA(e.target.value)} className="input-field !text-center !py-4 font-black border-2 border-green-500/20 focus:border-green-500"/>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">b</label>
                 <input type="number" value={b} onChange={e => setB(e.target.value)} className="input-field !text-center !py-4 font-black border-2 border-green-500/20 focus:border-green-500"/>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">c</label>
                 <input type="number" value={c} onChange={e => setC(e.target.value)} className="input-field !text-center !py-4 font-black border-2 border-green-500/20 focus:border-green-500"/>
              </div>
           </div>

           <div className="mt-4 p-5 bg-green-500/5 rounded-2xl border border-green-500/10 flex items-start gap-4">
              <span className="text-2xl">🎓</span>
              <p className="text-[10px] text-green-900/70 dark:text-green-400 leading-relaxed font-bold italic">
                 Katsayıları girdikten sonra sistem otomatik olarak diskriminantı hesaplar ve çözüm adımlarını listeler.
              </p>
           </div>
        </div>

        {/* Solver Steps */}
        <div className="flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-surface border-4 border-green-500/10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-green-600 tracking-[0.3em] uppercase rotate-12">Solve Engine v4.0</div>
                    
                    <div className="mb-8 px-4">
                       <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-4 italic block">Denklem Kökleri</span>
                       <div className="flex flex-wrap gap-4">
                          {results.roots.map((root, i) => (
                             <div key={i} className="flex-1 p-4 bg-green-500/5 border-2 border-green-500/20 rounded-2xl flex flex-col items-center">
                                <span className="text-2xl font-black italic tracking-tighter text-primary">x{i+1}: {root}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="w-full h-px bg-border/40 my-2 mb-6"></div>

                    <div className="flex flex-col gap-4">
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest px-4 italic mb-2">Çözüm Adımları</span>
                       {results.steps.map((step, i) => (
                          <div key={i} className="p-4 bg-secondary/5 rounded-2xl border border-border/50 text-left">
                             <h4 className="text-[9px] font-black text-primary uppercase italic mb-1">{step.title}</h4>
                             <p className="text-xs font-mono font-bold text-muted leading-relaxed">{step.content}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <span className="text-4xl mb-4">🧮</span>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted italic">Denklem Giriniz</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
