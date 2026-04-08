import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

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

    setResults({ base, vat, total, withheldVat, finalVat, grandTotal });

    if (val > 0) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ["#3b82f6", "#10b981"] });
    }
  };

  useEffect(() => { calculate(); }, [amount, vatRate, mode, hasWithholding, withholdingRate]);

  return (
    <V2CalculatorWrapper
      title="FATURA VERGİ ANALİZİ"
      icon="🧾"
      infoText="Bu hesaplama güncel vergi mevzuatına uygundur. Tevkifatlı işlemlerde satıcının beyan edeceği KDV tutarı 'Ödenecek KDV' kısmıdır."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            icon="🏦"
            label="GENEL TOPLAM (TAHSİLAT)"
            value={`${results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`}
            subLabel="Beyan Edilecek Toplam Tutar"
          />

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4">
                <span className="text-muted">Matrah (KDV Hariç)</span>
                <span className="text-primary">{results.base.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
             </div>
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4">
                <span className="text-muted">KDV Tutarı (%{vatRate})</span>
                <span className="text-[#3b82f6]">{results.vat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
             </div>
             {hasWithholding && (
               <>
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-[#ef4444]">
                    <span>Tevkif Edilen KDV ({withholdingRate})</span>
                    <span>-{results.withheldVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-[#10b981]">
                    <span>Ödenecek KDV</span>
                    <span>{results.finalVat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                 </div>
               </>
             )}
             <div className="flex justify-between items-center text-sm font-black uppercase tracking-[0.2em] pt-2">
                <span className="text-muted">Genel Toplam</span>
                <span className="text-primary">{results.grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
             </div>
          </div>
        </div>
      )}
    >
      <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1">
        <button 
          onClick={() => setMode("hariç")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "hariç" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
        >
          KDV HARİÇTEN HESAPLA
        </button>
        <button 
          onClick={() => setMode("dahil")}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "dahil" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
        >
          KDV DAHİLDEN HESAPLA
        </button>
      </div>

      <V2Input
        label={mode === "hariç" ? "KDV HARİÇ TUTAR" : "KDV DAHİL TUTAR"}
        value={amount}
        onChange={setAmount}
        unit="₺"
        placeholder="0,00"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="calc-input-label">KDV ORANI (%)</label>
          <div className="flex gap-2">
             {["1", "10", "20"].map((r) => (
                <button 
                   key={r}
                   onClick={() => setVatRate(r)}
                   className={`flex-1 py-4 rounded-xl text-lg font-black transition-all border-b-4 ${vatRate === r ? 'bg-[#3b82f6] text-white border-blue-800' : 'bg-white/5 border-white/5 text-muted'}`}
                >
                   %{r}
                </button>
             ))}
             <input 
                type="number" 
                value={!["1", "10", "20"].includes(vatRate) ? vatRate : ""} 
                onChange={(e) => setVatRate(e.target.value)}
                placeholder="Özel"
                className="w-20 bg-white/5 rounded-xl border border-white/10 text-center font-bold"
             />
          </div>
        </div>

        <div className={`p-5 rounded-3xl border-2 transition-all ${hasWithholding ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/5 border-white/5'}`}>
          <div className="flex items-center justify-between mb-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">KDV Tevkifatı</span>
                <span className="text-[9px] text-muted font-bold">Uygulansın Mı?</span>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={hasWithholding} onChange={(e) => setHasWithholding(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
             </label>
          </div>
          {hasWithholding && (
             <V2Select
                label=""
                value={withholdingRate}
                onChange={setWithholdingRate}
             >
                {["1/10", "2/10", "3/10", "4/10", "5/10", "7/10", "9/10", "10/10"].map(r => (
                   <option key={r} value={r} className="bg-slate-900">{r} Oranında Tevkifat</option>
                ))}
             </V2Select>
          )}
        </div>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={() => { setAmount(""); setVatRate("20"); setHasWithholding(false); }}
        calculateLabel="🧾 KDV Analizini Başlat"
      />
    </V2CalculatorWrapper>
  );
}
