import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Landmark, ArrowRight } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("24");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const n = parseInt(months);

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) {
      setResult(null);
      return;
    }

    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthlyPayment,
      total: totalPayment,
      interest: totalInterest,
    });
  };

  const reset = () => { setAmount("100000"); setRate("3.5"); setMonths("24"); setResult(null); };

  useEffect(() => { calculate(); }, [amount, rate, months]);

  const fmt = (val: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(val);

  const interestRatio = result ? (result.interest / result.total) * 100 : 0;

  return (
    <V2CalculatorWrapper
      title="KREDİ MALİYET ÖZETİ"
      icon="🏦"
      infoText="Bu hesaplama bankaların kullandığı standart kredi formülünü temel alır. Bankanızın uyguladığı KKDF ve BSMV vergileri, sigorta bedelleri ve dosya masrafları toplam maliyeti değiştirebilir."
      results={result && (
        <div className="space-y-8">
          <V2ResultCard
            color="emerald"
            icon="💸"
            label="AYLIK TAKSİT TUTARI"
            value={fmt(result.monthly)}
            subLabel={`${months} Ay Vade Boyunca`}
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">TOPLAM GERİ ÖDEME</div>
                <div className="text-xl font-black text-primary">{fmt(result.total)}</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">TOPLAM FAİZ</div>
                <div className="text-xl font-black text-[#10b981]">{fmt(result.interest)}</div>
             </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black text-muted uppercase tracking-widest">MALİYET DAĞILIMI</span>
               <span className="text-xs font-black text-[#10b981]">FAİZ YÜKÜ: %{interestRatio.toFixed(1)}</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
               <div className="h-full bg-[#10b981]" style={{ width: `${100 - interestRatio}%` }} />
               <div className="h-full bg-red-500" style={{ width: `${interestRatio}%` }} />
            </div>
            <div className="flex gap-4 text-[9px] font-bold text-muted justify-center tracking-widest">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]" /> ANAPARA</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> FAİZ</div>
            </div>
          </div>

          <Link 
            href={`/hesapla/kredi-odeme-plani?amount=${amount}&rate=${rate}&months=${months}`}
            className="calc-btn-calculate-v2 !bg-slate-900 !border-slate-800 hover:!bg-black !text-sm"
          >
            <span>Detaylı Ödeme Planını Gör</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    >
      <V2Input
        label="KREDİ TUTARI"
        value={amount}
        onChange={setAmount}
        unit="₺"
      />

      <div className="grid grid-cols-2 gap-4">
        <V2Input
          label="FAİZ ORANI (%)"
          value={rate}
          onChange={setRate}
          unit="%"
          step="0.01"
        />
        <V2Input
          label="VADE (AY)"
          value={months}
          onChange={setMonths}
          unit="AY"
        />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🏦 Kredi Detaylarını Hesapla"
      />
    </V2CalculatorWrapper>
  );
}
