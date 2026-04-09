"use client";

import React, { useState, useEffect } from "react";

import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { TrendingUp, Calculator, Landmark, PiggyBank, DollarSign } from "lucide-react";

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("48.5");
  const [days, setDays] = useState("32");
  const [result, setResult] = useState<{ grossInterest: number; netInterest: number; totalAmount: number; taxAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);
    if (!p || !r || !d || p <= 0 || r <= 0 || d <= 0) { setResult(null); return; }
    const grossInterest = p * (r / 365) * d;
    const taxRate = 0.05;
    const taxAmount = grossInterest * taxRate;
    const netInterest = grossInterest * (1 - taxRate);
    const totalAmount = p + netInterest;
    setResult({ grossInterest, netInterest, totalAmount, taxAmount });
  };

  const reset = () => { setPrincipal("100000"); setRate("48.5"); setDays("32"); setResult(null); };

  useEffect(() => { calculate(); }, [principal, rate, days]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 });

  return (
    <V2CalculatorWrapper
      title="MEVDUAT GETİRİ HESAPLAYICI"
      icon="💰"
      results={result && (
        <V2Premium3DResult
          title="VADELİ MEVDUAT GETİRİSİ"
          mainLabel="VADE SONU NET GETİRİ"
          mainValue={`+${fmt(result.netInterest)}`}
          subLabel="%5 stopaj kesintisi uygulandı"
          subValue=""
          color="blue"
          variant="precise"
          accentIcon={<PiggyBank size={32} />}
          items={[
            {
              label: "BRÜT FAİZ GETİRİSİ",
              value: fmt(result.grossInterest),
              icon: <TrendingUp size={16} />,
              color: "bg-blue-500/10 text-blue-400"
            },
            {
              label: "STOPAJ VERGİSİ (%5)",
              value: `-${fmt(result.taxAmount)}`,
              icon: <Calculator size={16} />,
              color: "bg-red-500/10 text-red-500"
            },
            {
              label: "VADE SONU TOPLAM TUTAR",
              value: fmt(result.totalAmount),
              icon: <Landmark size={16} />,
              color: "bg-blue-500/10 text-blue-500 font-black"
            }
          ]}
        />
      )}
    >
      <V2Input label="Yatırılacak Anapara" value={principal} onChange={setPrincipal} unit="₺" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <V2Input label="Faiz Oranı" value={rate} onChange={setRate} unit="%" />
        <V2Input label="Vade (Gün)" value={days} onChange={setDays} unit="GÜN" />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🏦 Mevduat Getirisini Hesapla"
      />
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">ℹ️</span>
        <span className="calc-info-box-text">Stopaj oranı banka ve vadeye göre %5–%15 arasında değişebilir. Bu hesaplama %5 stopaj esas alınmıştır.</span>
      </div>
    </div>
  );
}
