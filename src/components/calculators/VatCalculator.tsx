"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type VatMode = "hariç" | "dahil";

export function VatCalculator() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("20");
  const [mode, setMode] = useState<VatMode>("hariç");
  const [hasWithholding, setHasWithholding] = useState(false);
  const [withholdingRate, setWithholdingRate] = useState("5/10");
  
  const [results, setResults] = useState<{
    base: number;
    vat: number;
    total: number;
    withheldVat: number;
    finalVat: number;
    grandTotal: number;
  } | null>(null);

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    const rate = parseFloat(vatRate) / 100;
    
    let base = 0;
    let vat = 0;
    let total = 0;

    if (mode === "hariç") {
      base = val;
      vat = base * rate;
      total = base + vat;
    } else {
      total = val;
      base = total / (1 + rate);
      vat = total - base;
    }

    let withheldVat = 0;
    if (hasWithholding) {
      const [num, den] = withholdingRate.split("/").map(Number);
      withheldVat = vat * (num / den);
    }

    const finalVat = vat - withheldVat;
    const grandTotal = base + finalVat;

    setResults({ 
      base, 
      vat, 
      total, 
      withheldVat, 
      finalVat, 
      grandTotal 
    });

    if (val > 0) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#10b981"]
      });
    }
  };

  // Auto-calculate on change for better UX
  useEffect(() => {
    calculate();
  }, [amount, vatRate, mode, hasWithholding, withholdingRate]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-7 flex flex-col gap-5">
           <div className="panel p-6 bg-secondary/5 border-border rounded-[2rem] border-b-4 border-accent-primary/20">
              <div className="flex flex-col gap-6">
                 {/* Mode Toggle */}
                 <div className="flex bg-secondary/10 p-1.5 rounded-2xl gap-1">
                    <button 
                       onClick={() => setMode("hariç")}
                       className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "hariç" ? 'bg-surface text-accent-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                    >
                       KDV HARİÇ
                    </button>
                    <button 
                       onClick={() => setMode("dahil")}
                       className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "dahil" ? 'bg-surface text-accent-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                    >
                       KDV DAHİL
                    </button>
                 </div>

                 {/* Amount Input */}
                 <div className="relative group">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 px-2 block italic">Tutar (TL)</label>
                    <input 
                       type="number" 
                       value={amount} 
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="0,00"
                       className="input-field !py-5 !text-4xl font-black border-4 border-border focus:border-accent-primary transition-all pr-12"
                    />
                    <span className="absolute right-6 top-[55%] font-black text-muted text-xl opacity-30 italic">₺</span>
                 </div>

                 {/* VAT Rates */}
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">KDV Oranı (%)</label>
                    <div className="flex gap-2">
                       {["1", "10", "20"].map((r) => (
                          <button 
                             key={r}
                             onClick={() => setVatRate(r)}
                             className={`flex-1 py-3 rounded-xl text-sm font-black transition-all border-2 ${vatRate === r ? 'bg-accent-primary text-white border-accent-primary shadow-lg' : 'bg-surface border-border text-muted hover:border-accent-primary/30'}`}
                          >
                             %{r}
                          </button>
                       ))}
                       <div className="relative w-24">
                          <input 
                             type="number" 
                             value={!["1", "10", "20"].includes(vatRate) ? vatRate : ""} 
                             onChange={(e) => setVatRate(e.target.value)}
                             placeholder="Özel"
                             className="input-field !py-3 !text-center font-bold text-sm border-2 border-border"
                          />
                       </div>
                    </div>
                 </div>

                 {/* Withholding Toggle */}
                 <div className={`p-4 rounded-3xl border-2 transition-all ${hasWithholding ? 'bg-orange-500/5 border-orange-500/20' : 'bg-secondary/5 border-border'}`}>
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">KDV Tevkifatı</span>
                          <span className="text-[9px] text-muted font-bold">5/10, 9/10 vb. kesinti uygula</span>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={hasWithholding} onChange={(e) => setHasWithholding(e.target.checked)} className="sr-only peer" />
                          <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                       </label>
                    </div>
                    {hasWithholding && (
                       <select 
                          value={withholdingRate} 
                          onChange={(e) => setWithholdingRate(e.target.value)}
                          className="input-field !py-3 !text-sm font-bold bg-white dark:bg-zinc-800"
                       >
                          {["1/10", "2/10", "3/10", "4/10", "5/10", "7/10", "9/10", "10/10"].map(r => (
                             <option key={r} value={r}>{r} Tevkifat Oranı</option>
                          ))}
                       </select>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none">
                 <div className="result-card-premium !p-8 bg-surface border-4 border-border shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 font-black italic text-xs text-muted opacity-10 tracking-widest rotate-12">Tax Engine v2.0</div>
                    
                    <div className="flex flex-col items-center text-center mb-8">
                       <span className="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] mb-4 bg-accent-primary/10 px-4 py-1 rounded-full border border-accent-primary/20 italic">Genel Toplam</span>
                       <div className="text-5xl font-black italic tracking-tighter text-primary">
                          {results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                       <div className="flex justify-between items-center p-3 rounded-2xl bg-secondary/5 border border-border/50 group-hover:bg-accent-primary/5 transition-all">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">KDV Matrahı (Net)</span>
                          <span className="text-sm font-bold text-primary">{results.base.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                       </div>
                       
                       <div className="flex justify-between items-center p-3 rounded-2xl bg-secondary/5 border border-border/50 group-hover:bg-accent-primary/5 transition-all">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Hesaplanan KDV (%{vatRate})</span>
                          <span className="text-sm font-bold text-primary">{results.vat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                       </div>

                       {hasWithholding && (
                          <>
                             <div className="flex justify-between items-center p-3 rounded-2xl bg-orange-500/5 border border-orange-500/20 group-hover:bg-orange-500/10 transition-all">
                                <div className="flex flex-col">
                                   <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest italic">Tevkif Edilen KDV</span>
                                   <span className="text-[8px] text-orange-500 font-bold uppercase">({withholdingRate})</span>
                                </div>
                                <span className="text-sm font-bold text-orange-600">-{results.withheldVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                             </div>
                             <div className="flex justify-between items-center p-3 rounded-2xl bg-green-500/5 border border-green-500/20 group-hover:bg-green-500/10 transition-all">
                                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic">Ödenecek KDV</span>
                                <span className="text-sm font-bold text-green-600">{results.finalVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                             </div>
                          </>
                       )}

                       <div className="mt-4 pt-4 border-t-4 border-double border-border flex justify-between items-center px-2">
                          <span className="text-xs font-black text-primary uppercase tracking-widest italic">Toplam Tahsilat</span>
                          <span className="text-xl font-black text-primary">{results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                       </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[9px] text-blue-600 dark:text-blue-300 italic text-center leading-relaxed">
                       💡 Bu hesaplama güncel vergi mevzuatına uygundur. Tevkifatlı işlemlerde satıcının beyan edeceği KDV tutarı "Ödenecek KDV" kısmıdır.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel flex flex-col items-center justify-center h-full p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 text-center">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6 grayscale opacity-20 transform -rotate-12">🧾</div>
                 <h4 className="text-xs font-black text-muted uppercase tracking-[0.2em] italic">FATURA ANALİZİ İÇİN<br/> TUTAR GİRİNİZ</h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
