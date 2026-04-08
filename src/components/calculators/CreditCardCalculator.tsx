import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function CreditCardCalculator() {
  const [debt, setDebt] = useState("15000");
  const [limit, setLimit] = useState("50000");
  const [interestRate, setInterestRate] = useState("5.00");
  const [result, setResult] = useState<{ 
    minPayment: number; 
    ratio: number; 
    remaining: number;
    dailyInterest: number;
    monthlyInterest: number;
  } | null>(null);

  const calculate = () => {
    const d = parseFloat(debt);
    const l = parseFloat(limit);
    const r = parseFloat(interestRate);
    if (!d || !l || d <= 0 || l <= 0) { setResult(null); return; }
    
    const ratio = l > 25000 ? 0.40 : 0.20;
    const minPayment = d * ratio;
    const remaining = d - minPayment;
    
    const dailyInterest = remaining > 0 ? remaining * (r / 100 / 30) : 0;
    const monthlyInterest = dailyInterest * 30;

    setResult({ minPayment, ratio, remaining, dailyInterest, monthlyInterest });
  };

  const reset = () => { 
    setDebt("15000"); 
    setLimit("50000"); 
    setInterestRate("5.00");
    setResult(null); 
  };

  useEffect(() => { calculate(); }, [debt, limit, interestRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="ASGARİ ÖDEME VE FAİZ ANALİZİ"
      icon="💳"
      infoText="Sadece asgari ödeme yapılması durumunda kalan borca akdi faiz uygulanır. Faiz maliyeti borca eklenerek bir sonraki dönem borcunuzu oluşturur. BDDK kuralları gereği 25.000 TL altı limitlerde %20, üstü limitlerde %40 asgari ödeme oranı uygulanır."
      results={result && (
        <div className="space-y-8">
          <V2ResultCard
            color="red"
            icon="⚠️"
            label="ÖDENMESİ GEREKEN ASGARİ TUTAR"
            value={fmt(result.minPayment)}
            subLabel={`Uygulanan Oran: %${(result.ratio * 100).toFixed(0)} (BDDK Kuralı)`}
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">GÜNLÜK FAİZ YÜKÜ</div>
                <div className="text-xl font-black text-[#ef4444]">{fmt(result.dailyInterest)}</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">30 GÜNLÜK MALİYET</div>
                <div className="text-xl font-black text-[#ef4444]">{fmt(result.monthlyInterest)}</div>
             </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs font-black text-muted uppercase tracking-widest">ASGARİ SONRASI KALAN BORÇ</span>
             <span className="text-2xl font-black text-[#ef4444]">{fmt(result.remaining)}</span>
          </div>
        </div>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input
          label="KREDİ KARTI LİMİTİ"
          value={limit}
          onChange={setLimit}
          unit="₺"
        />
        <V2Input
          label="DÖNEM BORCU"
          value={debt}
          onChange={setDebt}
          unit="₺"
        />
      </div>

      <V2Input
        label="AYLIK AKDİ FAİZ (%)"
        value={interestRate}
        onChange={setInterestRate}
        unit="%"
        step="0.01"
      />

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="💳 Faiz Dahil Analiz Et"
      />
    </V2CalculatorWrapper>
  );
}
