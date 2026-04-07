"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Landmark, Download, RefreshCw, Share2 } from "lucide-react";

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

  useEffect(() => {
    calculate();
  }, [amount, vatRate, mode, hasWithholding, withholdingRate]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-12 flex flex-col gap-5">
           <div className="panel p-6 bg-secondary/5 border-border rounded-[2rem] border-b-4 border-accent-primary/20">
              <div className="flex flex-col lg:flex-row gap-6">
                 {/* Mode Toggle */}
                 <div className="flex bg-secondary/10 p-1.5 rounded-2xl gap-1 lg:w-1/3">
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
                 <div className="relative group flex-1">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 px-2 block italic">Tutar (TL)</label>
                    <input 
                       type="number" 
                       value={amount} 
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="0,00"
                       className="input-field !py-4 !text-3xl font-black border-4 border-border focus:border-accent-primary transition-all pr-12"
                    />
                    <span className="absolute right-6 top-[55%] font-black text-muted text-xl opacity-30 italic">₺</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                          <span className="text-[9px] text-muted font-bold">Kesinti Uygulayılsın Mı?</span>
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
                          className="input-field !py-2 !text-sm font-bold bg-white dark:bg-zinc-800"
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
        <div className="lg:col-span-12 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium animate-result">
                 <div className="result-card-premium">
                    <div className="result-badge">
                       <Landmark size={14} className="mr-2" /> VERGİ ANALİZİ TAMAMLANDI
                    </div>
                    
                    <div className="result-label-premium text-center">Genel Toplam (Tahsilat Tutarınız)</div>
                    <div className="result-value-premium tracking-tighter">
                       {results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                    </div>

                    <div className="max-w-2xl mx-auto">
                       <table className="result-table-premium">
                          <tbody>
                             <tr>
                                <td>MATRAH (KDV HARİÇ TUTAR)</td>
                                <td>{results.base.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                             </tr>
                             <tr className="row-accent">
                                <td>KDV TUTARI (%{vatRate})</td>
                                <td>{results.vat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                             </tr>
                             {hasWithholding && (
                                <>
                                   <tr className="row-danger">
                                      <td>TEVKİF EDİLEN KDV ({withholdingRate})</td>
                                      <td>-{results.withheldVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                   </tr>
                                   <tr className="row-success">
                                      <td>BEYAN EDİLECEK (ÖDENECEK) KDV</td>
                                      <td>{results.finalVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                   </tr>
                                </>
                             )}
                             <tr className="row-total">
                                <td>ÖDENECEK TOPLAM TUTAR</td>
                                <td>{results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>

                    <div className="result-footer-premium">
                       <button className="btn-secondary !py-2 !px-4 text-[10px]"><Download size={14} /> PDF</button>
                       <button className="btn-secondary !py-2 !px-4 text-[10px]" onClick={() => setAmount("")}><RefreshCw size={14} /> SIFIRLA</button>
                       <button className="btn-primary !py-2 !px-4 text-[10px]"><Share2 size={14} /> PAYLAŞ</button>
                    </div>

                    <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[10px] text-blue-600 dark:text-blue-300 italic text-center leading-relaxed">
                       💡 Bu hesaplama güncel vergi mevzuatına uygundur. Tevkifatlı işlemlerde satıcının beyan edeceği KDV tutarı "Ödenecek KDV" kısmıdır.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] border-dashed border-4 border-border/40 text-center grayscale opacity-40">
                 <div className="text-6xl mb-6">🧾</div>
                 <h4 className="text-xs font-black text-muted uppercase tracking-[0.2em] italic">FATURA ANALİZİ İÇİN<br/> TUTAR GİRİNİZ</h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
