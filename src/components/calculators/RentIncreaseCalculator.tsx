"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type PropertyType = "konut" | "isyeri";

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState("15000");
  const [propertyType, setPropertyType] = useState<PropertyType>("konut");
  const [inflationRate, setInflationRate] = useState("65.93"); // Example 12-month average for 2024
  
  const [results, setResults] = useState<{
    increaseAmount: number;
    newRent: number;
    increaseRate: number;
    legalStatus: string;
  } | null>(null);

  const calculate = () => {
    const rent = parseFloat(currentRent) || 0;
    const rate = parseFloat(inflationRate) || 0;

    if (rent <= 0) {
      setResults(null);
      return;
    }

    // Post-July 2024: Housing also uses 12-month TÜFE average (Same as Commercial)
    // The 25% cap is NO LONGER valid.
    const increaseRate = rate;
    const increaseAmount = rent * (increaseRate / 100);
    const newRent = rent + increaseAmount;

    setResults({
      increaseAmount,
      newRent,
      increaseRate,
      legalStatus: propertyType === "konut" ? "12 Aylık TÜFE Ortalaması (Yeni Mevzuat)" : "12 Aylık TÜFE Ortalaması (Yasal Sınır)"
    });

    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#d97706"]
    });
  };

  useEffect(() => {
    calculate();
  }, [currentRent, propertyType, inflationRate]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Settings Panel */}
        <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-amber-500/20 flex flex-col gap-6">
           {/* Property Toggle */}
           <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
              <button 
                 onClick={() => setPropertyType("konut")}
                 className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${propertyType === "konut" ? 'bg-surface text-amber-600 shadow-sm' : 'text-muted'}`}
              >
                 🏘️ KONUT
              </button>
              <button 
                 onClick={() => setPropertyType("isyeri")}
                 className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${propertyType === "isyeri" ? 'bg-surface text-amber-600 shadow-sm' : 'text-muted'}`}
              >
                 🏢 İŞYERİ
              </button>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Mevcut Kira Bedeli (TL)</label>
              <input 
                 type="number" 
                 value={currentRent} 
                 onChange={e => setCurrentRent(e.target.value)}
                 className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all"
                 placeholder="15.000"
              />
           </div>

           <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest italic">12 Aylık TÜFE Ortalaması (%)</label>
                 <span className="text-[8px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-bold">Resmi Veri</span>
              </div>
              <input 
                 type="number" 
                 value={inflationRate} 
                 onChange={e => setInflationRate(e.target.value)}
                 className="input-field font-black !text-xl !py-3 border-4 border-border"
              />
           </div>

           <div className="mt-4 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-[9px] text-amber-700 dark:text-amber-400 font-medium italic text-center">
              💡 Temmuz 2024 itibarıyla konutlarda da %25 sınır kalkmış olup, artışlar TÜFE ortalaması üzerinden yapılmaktadır.
           </div>
        </div>

        {/* Status Display Area */}
        <div className="flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-white dark:bg-zinc-900 border-4 border-amber-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[9px] text-amber-600 tracking-[0.3em] uppercase rotate-12">Rent Guard v2.0</div>
                    
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-4xl mb-6">💰</div>
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 italic">Yeni Aylık Kira</span>
                    
                    <div className="text-6xl font-black italic tracking-tighter text-amber-600 mb-2 drop-shadow-sm">
                       {results.newRent.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} <span className="text-2xl not-italic ml-1">₺</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent my-8"></div>

                    <div className="grid grid-cols-2 gap-8 w-full px-4">
                       <div className="flex flex-col items-center">
                          <span className="text-xl font-black text-primary">+{results.increaseAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic">Artış Tutarı</span>
                       </div>
                       <div className="flex flex-col items-center border-l border-amber-500/10">
                          <span className="text-xl font-black text-primary">%{results.increaseRate}</span>
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic">Yasal Sınır (%)</span>
                       </div>
                    </div>

                    <div className="mt-10 p-4 bg-secondary/5 rounded-2xl border border-border text-[9px] text-muted font-bold tracking-widest uppercase italic max-w-xs">
                       {results.legalStatus}
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 text-center opacity-60">
                 <div className="text-6xl mb-6">🔑</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    KİRA ARTIŞ ANALİZİ İÇİN<br/>MEVCUT BEDEL VE TÜFE<br/>VERİSİ GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>

      <div className="panel p-6 bg-amber-500/5 rounded-[2rem] border border-amber-500/10 flex flex-col md:flex-row items-center gap-8">
         <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-4xl transform rotate-12">🏠</div>
         <div className="flex flex-col gap-2">
            <h4 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest italic">Kira Hukuk Rehberi</h4>
            <p className="text-[11px] leading-relaxed text-amber-800/80 dark:text-amber-400 font-medium italic">
               Yeni düzenlemeyle birlikte konutlarda uygulanan %25 artış tavanı 1 Temmuz 2024 itibarıyla sona ermiştir. 
               Artık konut kiralarında da artış üst sınırı, son 12 ayın TÜFE ortalamasıdır. 
               <b> Önemli:</b> Taraflar bu oran üzerinde anlaşabilirler ancak yasal olarak kiracıdan TÜFE ortalamasının üzerinde bir artış talep edilemez.
            </p>
         </div>
      </div>
    </div>
  );
}
