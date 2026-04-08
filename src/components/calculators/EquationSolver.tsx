"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Calculator, RotateCcw, Info, Hash, Braces, Sparkles, TrendingUp } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
      if (numB === 0) {
        setResults(null);
        return;
      }
      setResults({
        delta: 0,
        roots: [(-numC / numB).toFixed(4)],
        steps: [{ title: "DERECE ANALİZİ", content: "Bu bir 1. derece denklemdir. Formül: x = -c / b" }]
      });
      return;
    }

    const delta = (numB * numB) - (4 * numA * numC);
    const steps = [];

    steps.push({ 
      title: "1. DİSKRİMİNANT (Δ) HESAPLAMA", 
      content: `Δ = b² - 4ac = (${numB})² - 4(${numA})(${numC}) = ${delta}` 
    });

    let roots: string[] = [];
    if (delta > 0) {
      const x1 = (-numB + Math.sqrt(delta)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(delta)) / (2 * numA);
      roots = [x1.toFixed(4), x2.toFixed(4)];
      steps.push({
        title: "2. KÖKLERİN BULUNMASI (Δ > 0)",
        content: `x₁,₂ = (-b ± √Δ) / 2a \nx₁ = ${roots[0]}, x₂ = ${roots[1]}`
      });
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#10b981", "#3b82f6"] });
    } else if (delta === 0) {
      const x = -numB / (2 * numA);
      roots = [x.toFixed(4)];
      steps.push({
        title: "2. ÇAKIŞIK KÖKÜN BULUNMASI (Δ = 0)",
        content: `x = -b / 2a = ${roots[0]}`
      });
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 }, colors: ["#fbbf24"] });
    } else {
      roots = ["Reel Kök Yok"];
      steps.push({
        title: "SONUÇ (Δ < 0)",
        content: "Delta sıfırdan küçük olduğu için gerçel sayılarda çözüm yoktur. Karmaşık kök mevcuttur."
      });
    }

    setResults({ delta, roots, steps });
  };

  useEffect(() => {
    calculate();
  }, [a, b, c]);

  const reset = () => {
    setA("1"); setB("-5"); setC("6"); setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="DENKLEM ÇÖZÜCÜ"
      icon="🧮"
      infoText="Birinci ve ikinci dereceden denklemlerin köklerini anında bulun. Katsayıları girin, diskriminant analizi ve çözüm adımları otomatik oluşturulsun."
      results={results && (
        <div className="space-y-8 animate-result">
           <div className="flex flex-col gap-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2 px-2">
                 <Sparkles className="w-4 h-4 text-emerald-500" /> HESAPLANAN KÖKLER
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {results.roots.map((root, i) => (
                    <V2ResultCard 
                      key={i} 
                      color={root === "Reel Kök Yok" ? "red" : i === 0 ? "emerald" : "blue"} 
                      label={`KÖK x${i+1}`} 
                      value={root} 
                      icon="X" 
                    />
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2 px-2">
                 <TrendingUp className="w-4 h-4 text-amber-500" /> ÇÖZÜM ADIMLARI
              </div>
              <div className="space-y-4">
                 {results.steps.map((step, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                       <h4 className="text-[9px] font-black text-emerald-500 uppercase italic mb-2 tracking-widest">{step.title}</h4>
                       <p className="text-xs font-mono font-bold text-primary leading-relaxed">{step.content}</p>
                    </div>
                 ))}
                 <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-amber-500/80 uppercase italic tracking-widest">Diskriminant (Δ)</span>
                    <span className="text-lg font-black text-amber-500 italic">{results.delta.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 font-black italic text-xs tracking-widest uppercase pointer-events-none group-hover:opacity-10 transition-opacity">POLYNOMIAL ENGINE</div>
           
           <div className="flex flex-col items-center gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] italic flex items-center gap-2">
                 <Braces className="w-4 h-4 text-blue-500" /> GENEL DENKLEM FORMU
              </label>
              <div className="text-2xl font-black italic tracking-tighter text-primary bg-white/5 px-8 py-3 rounded-2xl border border-white/5 shadow-inner">
                 <span className="text-blue-500">a</span>x² + <span className="text-blue-500">b</span>x + <span className="text-blue-500">c</span> = 0
              </div>
           </div>

           <div className="grid grid-cols-3 gap-6">
              <V2Input label="KATSAYI a" value={a} onChange={setA} type="number" placeholder="1" fieldClassName="!text-2xl font-black italic text-center" />
              <V2Input label="KATSAYI b" value={b} onChange={setB} type="number" placeholder="-5" fieldClassName="!text-2xl font-black italic text-center" />
              <V2Input label="KATSAYI c" value={c} onChange={setC} type="number" placeholder="6" fieldClassName="!text-2xl font-black italic text-center" />
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Çözülüyor" isCalculateDisabled={true} className="!mt-4" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
