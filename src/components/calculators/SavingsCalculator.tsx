"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { PiggyBank, Landmark, TrendingUp, Calendar, Percent } from "lucide-react";

export function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [years, setYears] = useState("5");
  const [annualRate, setAnnualRate] = useState("40");
  const [results, setResults] = useState<{ totalValue: number; totalPrincipal: number; totalInterest: number; growthRate: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(initialAmount) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const y = parseFloat(years) || 0;
    const r = parseFloat(annualRate) / 100 || 0;
    if (y <= 0) { setResults(null); return; }
    const monthlyRate = r / 12;
    const totalMonths = y * 12;
    const fvPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
    const fvContributions = monthlyRate > 0
      ? pmt * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : pmt * totalMonths;
    const totalValue = fvPrincipal + fvContributions;
    const totalPrincipal = p + (pmt * totalMonths);
    const totalInterest = totalValue - totalPrincipal;
    const growthRate = totalPrincipal > 0 ? (totalInterest / totalPrincipal) * 100 : 0;
    setResults({ totalValue, totalPrincipal, totalInterest, growthRate });
  };

  const reset = () => { setInitialAmount("10000"); setMonthlyContribution("1000"); setYears("5"); setAnnualRate("40"); setResults(null); };

  useEffect(() => { calculate(); }, [initialAmount, monthlyContribution, years, annualRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="BİRİKİM PROJEKSİYONU"
      icon="💰"
      infoText="Bileşik faiz hesaplaması yapılmaktadır. Aylık faiz aylık anaparaya eklenerek büyüme sağlanır. Gerçek getiri enflasyona göre farklılık gösterebilir."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Başlangıç Birikimi" 
          value={initialAmount} 
          onChange={setInitialAmount} 
          unit="₺" 
          placeholder="10000"
        />
        <V2Input 
          label="Aylık Katkı Payı" 
          value={monthlyContribution} 
          onChange={setMonthlyContribution} 
          unit="₺" 
          placeholder="1000"
        />
        <V2Input 
          label="Yatırım Süresi" 
          value={years} 
          onChange={setYears} 
          unit="YIL" 
          placeholder="5"
        />
        <V2Input 
          label="Yıllık Faiz Oranı" 
          value={annualRate} 
          onChange={setAnnualRate} 
          unit="%" 
          placeholder="40"
        />
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📈 Birikimi Hesapla"
      />

      {results && (
        <V2Premium3DResult
          title="BİRİKİM ANALİZİ"
          mainLabel={`${years} YIL SONRAKİ TOPLAM DEĞER`}
          mainValue={fmt(results.totalValue)}
          subLabel={`Toplam büyüme oranı: %${results.growthRate.toFixed(0)}`}
          subValue=""
          color="emerald"
          variant="precise"
          accentIcon={<PiggyBank size={32} />}
          items={[
            {
              label: "KÜMÜLATİF ANAPARA",
              value: fmt(results.totalPrincipal),
              icon: <Landmark size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            },
            {
              label: "TOPLAM FAİZ GETİRİSİ",
              value: `+${fmt(results.totalInterest)}`,
              icon: <TrendingUp size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              label: "VADE SÜRESİ",
              value: `${years} Yıl`,
              icon: <Calendar size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📊</span>
        <span className="calc-info-box-text">Bileşik faiz hesaplaması yapılmaktadır. Aylık faiz aylık anaparaya eklenerek büyüme sağlanır. Gerçek getiri enflasyona göre farklılık gösterebilir.</span>
      </div>
    </div>
  );
}
