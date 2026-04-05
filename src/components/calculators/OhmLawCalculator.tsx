"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function OhmLawCalculator() {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [p, setP] = useState("");
  
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  const [results, setResults] = useState<{ v: number; i: number; r: number; p: number; formula: string } | null>(null);

  const handleInput = (name: string, val: string) => {
    if (val === "") {
      setActiveInputs(prev => prev.filter(item => item !== name));
    } else if (!activeInputs.includes(name)) {
      if (activeInputs.length >= 2) {
        // En eski girişi çıkar yeniyi ekle (LIFO tarzı veya basitçe kaydır)
        setActiveInputs(prev => [...prev.slice(1), name]);
      } else {
        setActiveInputs(prev => [...prev, name]);
      }
    }

    if (name === "v") setV(val);
    if (name === "i") setI(val);
    if (name === "r") setR(val);
    if (name === "p") setP(val);
  };

  const calculate = () => {
    if (activeInputs.length < 2) {
      setResults(null);
      return;
    }

    let valV = parseFloat(v);
    let valI = parseFloat(i);
    let valR = parseFloat(r);
    let valP = parseFloat(p);
    
    let resV = 0, resI = 0, resR = 0, resP = 0, formula = "";

    // Case selection based on provided 2 values
    if (activeInputs.includes("v") && activeInputs.includes("i")) {
      resV = valV; resI = valI;
      resR = valV / valI;
      resP = valV * valI;
      formula = `R = V / I = ${valV} / ${valI}, P = V * I = ${valV} * ${valI}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("r")) {
      resV = valV; resR = valR;
      resI = valV / valR;
      resP = (valV * valV) / valR;
      formula = `I = V / R = ${valV} / ${valR}, P = V² / R = ${valV}² / ${valR}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("r")) {
      resI = valI; resR = valR;
      resV = valI * valR;
      resP = (valI * valI) * valR;
      formula = `V = I * R = ${valI} * ${valR}, P = I² * R = ${valI}² * ${valR}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("p")) {
      resV = valV; resP = valP;
      resI = valP / valV;
      resR = (valV * valV) / valP;
      formula = `I = P / V = ${valP} / ${valV}, R = V² / P = ${valV}² / ${valP}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("p")) {
      resI = valI; resP = valP;
      resV = valP / valI;
      resR = valP / (valI * valI);
      formula = `V = P / I = ${valP} / ${valI}, R = P / I² = ${valP} / ${valI}²`;
    } else if (activeInputs.includes("r") && activeInputs.includes("p")) {
      resR = valR; resP = valP;
      resV = Math.sqrt(valP * valR);
      resI = Math.sqrt(valP / valR);
      formula = `V = √(P * R) = √(${valP} * ${valR}), I = √(P / R) = √(${valP} / ${valR})`;
    }

    setResults({ v: resV, i: resI, r: resR, p: resP, formula });
    
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7"]
    });
  };

  useEffect(() => {
    calculate();
  }, [v, i, r, p, activeInputs]);

  const clear = () => {
    setV(""); setI(""); setR(""); setP("");
    setActiveInputs([]);
    setResults(null);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Master Panel */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-indigo-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 font-black italic text-xs text-muted opacity-10 tracking-[0.3em] uppercase rotate-12">Circuits Engine 2.1</div>
              
              <div className="flex flex-col gap-1 mb-8">
                 <h3 className="text-sm font-black text-primary uppercase tracking-widest italic px-2">Parametre Girişi</h3>
                 <p className="text-[10px] text-muted font-bold uppercase transition-all px-2">
                    {activeInputs.length < 2 
                      ? `Lütfen hesaplama için ${2 - activeInputs.length} parametre daha girin.` 
                      : "Hesaplama 2 parametre üzerinden otomatik olarak yapılıyor."}
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { n: "v", l: "GERİLİM (VOLTAJ)", u: "V", c: "indigo" },
                   { n: "i", l: "AKIM (AMPER)", u: "A", c: "purple" },
                   { n: "r", l: "DİRENÇ (OHM)", u: "Ω", c: "pink" },
                   { n: "p", l: "GÜÇ (WATT)", u: "W", c: "orange" }
                 ].map((item) => (
                    <div key={item.n} className={`flex flex-col gap-2 relative transition-all duration-500 ${activeInputs.includes(item.n) ? 'scale-[1.02]' : 'opacity-80 grayscale-[30%]'}`}>
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">{item.l}</label>
                       <div className="relative group">
                          <input 
                             type="number" 
                             value={item.n === "v" ? v : item.n === "i" ? i : item.n === "r" ? r : p}
                             onChange={(e) => handleInput(item.n, e.target.value)}
                             className={`input-field !text-3xl !py-4 font-black border-4 border-border transition-all pr-12 focus:border-${item.c}-500`}
                             placeholder="0"
                          />
                          <span className="absolute right-6 top-[35%] font-black text-muted text-xl opacity-30 italic">{item.u}</span>
                          {activeInputs.includes(item.n) && (
                             <div className={`absolute -right-2 -top-2 w-5 h-5 bg-${item.c}-500 rounded-full border-2 border-surface flex items-center justify-center text-white text-[8px] font-bold shadow-lg`}>
                                {activeInputs.indexOf(item.n) + 1}
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>

              <button 
                 onClick={clear}
                 className="mt-8 text-[10px] font-black text-muted/60 uppercase tracking-[0.3em] hover:text-red-500 transition-all text-center italic cursor-pointer py-4 border-t border-border/50 w-full"
              >
                 DİĞER HESAPLAMA İÇİN TÜMÜNÜ TEMİZLE [x]
              </button>
           </div>
        </div>

        {/* Dynamic Analysis Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-surface border-4 border-border group overflow-hidden flex flex-col">
                    <div className="flex flex-col items-center text-center mb-8">
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 bg-indigo-500/10 px-4 py-1 rounded-full border border-indigo-500/20 italic">Analiz Özeti</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                       {[
                         { v: results.v, l: "Voltaj", u: "V", c: "text-indigo-600", s: activeInputs.includes("v") },
                         { v: results.i, l: "Akım", u: "A", c: "text-purple-600", s: activeInputs.includes("i") },
                         { v: results.r, l: "Direnç", u: "Ω", c: "text-pink-600", s: activeInputs.includes("r") },
                         { v: results.p, l: "Güç", u: "W", c: "text-orange-600", s: activeInputs.includes("p") }
                       ].map((r, idx) => (
                          <div key={idx} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center ${r.s ? 'bg-secondary/5 border-border' : 'bg-surface border-indigo-500/20 shadow-lg scale-[1.05]'}`}>
                             <span className="text-[9px] font-black text-muted uppercase mb-2 italic">{r.l}</span>
                             <div className={`text-xl font-black italic tracking-tighter ${r.c}`}>
                                {r.v.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} {r.u}
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-auto p-6 bg-secondary/5 rounded-3xl border border-border group-hover:border-indigo-500/30 transition-all">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">✓</div>
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Adım Adım Çözüm</span>
                       </div>
                       <div className="text-[11px] font-medium text-muted/80 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                          {results.formula}
                       </div>
                    </div>

                    <div className="mt-6 text-[8px] text-muted/50 font-bold uppercase text-center tracking-widest">
                       Mühendislik Standartlarına Uygun Hesaplama
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 text-center relative overflow-hidden grayscale group hover:grayscale-0 transition-all">
                 <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap gap-10 items-center justify-center overflow-hidden italic font-black text-4xl leading-tight text-indigo-500">
                    V=I*R V=I*R V=I*R V=I*R
                 </div>
                 <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">⚡</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic leading-relaxed">
                    OHM KANUNU ANALİZİ İÇİN<br/>EN AZ 2 VERİ GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>

      {/* Engineering Note */}
      <div className="panel p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
         <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-3xl">📘</div>
         <div className="flex flex-col gap-2">
            <h4 className="text-sm font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-widest italic">Devre Analiz Notu</h4>
            <p className="text-[11px] leading-relaxed text-indigo-800/80 dark:text-indigo-400 font-medium italic">
               Ohm Kanunu (V=IR), Alman fizikçi Georg Simon Ohm tarafından keşfedilen elektrik devrelerinin temel prensibidir. 
               <b> Girdi Önceliği:</b> Bu araç, girdiğiniz son iki veriyi baz alarak en güncel hesaplamayı anlık olarak yapar. 
               DC devreler için tasarlanmış olsa da, güç faktörünün (cos φ) 1 kabul edildiği AC projelerinde de yaklaşık analiz için kullanılabilir.
            </p>
         </div>
      </div>
    </div>
  );
}
