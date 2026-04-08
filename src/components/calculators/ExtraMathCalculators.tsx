"use client";

import React, { useState } from "react";
import { Calculator, RotateCcw, Info, Hash, Divide, PieChart } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Select } from "./ui-v2/V2Select";

// Kesir Hesaplama
export function FractionsCalculator() {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [islem, setIslem] = useState<"+" | "-" | "*" | "/">("+");
  const [result, setResult] = useState<null | { n: number; d: number; def: string }>(null);

  const ebob = (a: number, b: number): number => {
    return b === 0 ? a : ebob(b, a % b);
  };

  const hesapla = () => {
    const num1 = parseInt(n1); const den1 = parseInt(d1);
    const num2 = parseInt(n2); const den2 = parseInt(d2);
    
    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) return;

    let resN = 0, resD = 1;
    if (islem === "+") {
      resN = (num1 * den2) + (num2 * den1);
      resD = den1 * den2;
    } else if (islem === "-") {
      resN = (num1 * den2) - (num2 * den1);
      resD = den1 * den2;
    } else if (islem === "*") {
      resN = num1 * num2;
      resD = den1 * den2;
    } else if (islem === "/") {
      if (num2 === 0) return;
      resN = num1 * den2;
      resD = den1 * num2;
    }

    const gcd = Math.abs(ebob(resN, resD));
    const finalN = resN / gcd;
    const finalD = resD / gcd;
    
    setResult({ 
      n: finalD < 0 ? -finalN : finalN, 
      d: Math.abs(finalD),
      def: (finalN / finalD).toPrecision(5)
    });
  };

  const reset = () => {
    setN1(""); setD1(""); setN2(""); setD2(""); setResult(null);
  };

  const FractionInput = ({ n, setN, d, setD, label }: any) => (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">{label}</div>
      <div className="flex flex-col gap-2 w-24">
        <input 
          type="number" 
          value={n} 
          onChange={e => setN(e.target.value)} 
          className="bg-white/5 border border-white/10 rounded-xl p-3 font-black text-center text-xl focus:border-blue-500/50 outline-none transition-all" 
          placeholder="Pay"
        />
        <div className="h-1 bg-white/20 rounded-full w-full"></div>
        <input 
          type="number" 
          value={d} 
          onChange={e => setD(e.target.value)} 
          className="bg-white/5 border border-white/10 rounded-xl p-3 font-black text-center text-xl focus:border-blue-500/50 outline-none transition-all" 
          placeholder="Payda"
        />
      </div>
    </div>
  );

  return (
    <V2CalculatorWrapper
      title="RASYONEL SAYI (KESİR) HESABI"
      icon="🍕"
      infoText="Kesirli sayıları toplama, çıkarma, çarpma ve bölme işlemlerine tabi tutun. Sonuçlar otomatik olarak en sade haliyle gösterilir."
      results={result && (
        <div className="space-y-6 animate-result">
           <div className="p-10 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                 <span className="text-4xl font-black text-primary italic drop-shadow-lg">{result.n}</span>
                 <div className="h-1.5 bg-indigo-500 rounded-full w-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                 <span className="text-4xl font-black text-primary italic drop-shadow-lg">{result.d}</span>
              </div>
              <div className="hidden md:block w-px h-20 bg-white/10"></div>
              <div className="flex flex-col items-center md:items-start">
                 <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 italic opacity-60">ONDALIK KARŞILIĞI</span>
                 <div className="text-3xl font-black text-indigo-400 italic tracking-tighter">≈ {result.def}</div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8 flex flex-col items-center">
           <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <FractionInput n={n1} setN={setN1} d={d1} setD={setD1} label="1. KESİR" />
              
              <div className="flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">İŞLEM</div>
                 <select 
                   value={islem} 
                   onChange={e => setIslem(e.target.value as any)} 
                   className="bg-slate-900 border-2 border-white/10 rounded-2xl w-16 h-16 flex items-center justify-center font-black text-2xl text-blue-500 appearance-none text-center cursor-pointer hover:border-blue-500/30 transition-all outline-none"
                 >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                 </select>
              </div>

              <FractionInput n={n2} setN={setN2} d={d2} setD={setD2} label="2. KESİR" />
           </div>

           <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="Sonucu Sadeleştir ve Çöz" className="!w-full max-w-sm" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}

// Logaritma Hesaplama
export function LogarithmCalculator() {
  const [base, setBase] = useState("10");
  const [val, setVal] = useState("");
  const [result, setResult] = useState<null | string>(null);

  const hesapla = () => {
    const b = parseFloat(base);
    const x = parseFloat(val);
    if (isNaN(b) || isNaN(x) || b <= 0 || b === 1 || x <= 0) return;
    
    // log_b(x) = ln(x) / ln(b)
    const res = Math.log(x) / Math.log(b);
    setResult(res.toPrecision(8));
  };

  const reset = () => {
    setBase("10"); setVal(""); setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="LOGARİTMA HESAPLAYICI"
      icon="🪵"
      infoText="İstediğiniz tabanda logaritma hesaplaması yapın. Onluk (log), doğal (ln) ve özel tabanlı tüm logaritma işlemleri için uygundur."
      results={result && (
        <div className="animate-result space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-xl font-black italic text-muted">log</span>
                <span className="text-xs font-black text-amber-500 mt-3">{base}</span>
                <span className="text-xl font-black italic text-primary">({val})</span>
              </div>
              <div className="text-5xl font-black text-amber-500 italic tracking-tighter drop-shadow-lg">
                 {result}
              </div>
              <div className="mt-8 text-[9px] font-bold text-muted uppercase tracking-[0.3em] italic opacity-60">Logarithmic Precision Engine</div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">TABAN (b)</label>
                 <div className="relative group">
                    <input 
                      type="text" 
                      value={base} 
                      onChange={e => setBase(e.target.value)} 
                      placeholder="e, 10, 2..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-black text-xl italic focus:border-amber-500/50 outline-none transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                       <button onClick={() => setBase("10")} className="text-[9px] font-black px-2 py-1 bg-white/5 rounded border border-white/5 hover:bg-white/10">10</button>
                       <button onClick={() => setBase(Math.E.toFixed(6))} className="text-[9px] font-black px-2 py-1 bg-white/5 rounded border border-white/5 hover:bg-white/10">e</button>
                    </div>
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">DEĞER (x)</label>
                 <input 
                   type="number" 
                   value={val} 
                   onChange={e => setVal(e.target.value)} 
                   placeholder="100" 
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-black text-xl italic focus:border-amber-500/50 outline-none transition-all text-center"
                 />
              </div>
           </div>

           <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="Logaritmayı Çöz" className="!mt-4" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
