"use client";

import React, { useState, useEffect } from "react";

import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { Landmark, TrendingUp, Percent, Calculator, PiggyBank, DollarSign } from "lucide-react";

export function DepositInterestCalculator() {
  const [principal, setPrincipal] = useState("250000");
  const [days, setDays] = useState("32");
  const [interestRate, setInterestRate] = useState("48");
  const [taxRate, setTaxRate] = useState("7.5");
  const [result, setResult] = useState<{ gross: number; net: number; taxAmount: number; totalEnd: number; dailyNet: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const d = parseFloat(days);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(taxRate) / 100;
    if (p > 0 && d > 0 && r > 0) {
      const gross = p * r * (d / 365);
      const taxAmount = gross * t;
      const net = gross - taxAmount;
      const totalEnd = p + net;
      const dailyNet = net / d;
      setResult({ gross, net, taxAmount, totalEnd, dailyNet });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setPrincipal("250000"); setDays("32"); setInterestRate("48"); setTaxRate("7.5"); setResult(null); };

  useEffect(() => { calculate(); }, [principal, days, interestRate, taxRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 });

  return (
    <V2CalculatorWrapper
      title="MEVDUAT GETİRİ ANALİZİ"
      icon="💰"
      results={result && (
        <V2Premium3DResult
          title="VADELİ MEVDUAT GETİRİSİ"
          mainLabel="VADE SONU NET GETİRİ"
          mainValue={`+${fmt(result.net)}`}
          subLabel={`%${taxRate} stopaj kesintisi uygulandı`}
          subValue=""
          color="blue"
          variant="precise"
          accentIcon={<PiggyBank size={32} />}
          items={[
            {
              label: "BRÜT FAİZ GETİRİSİ",
              value: fmt(result.gross),
              icon: <TrendingUp size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: `STOPAJ VERGİSİ (%${taxRate})`,
              value: `-${fmt(result.taxAmount)}`,
              icon: <Calculator size={16} />,
              color: "bg-red-500/10 text-red-500"
            },
            {
              label: "VADE SONU TOPLAM TUTAR",
              value: fmt(result.totalEnd),
              icon: <Landmark size={16} />,
              color: "bg-blue-500/10 text-blue-600 font-black"
            }
          ]}
        />
      )}
    >
      <V2Input label="Yatırılacak Anapara" value={principal} onChange={setPrincipal} unit="₺" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <V2Input label="Faiz Oranı" value={interestRate} onChange={setInterestRate} unit="%" />
        <V2Input label="Vade (Gün)" value={days} onChange={setDays} unit="GÜN" />
        <V2Input label="Stopaj" value={taxRate} onChange={setTaxRate} unit="%" />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🏦 Mevduat Getirisini Hesapla"
      />
    </V2CalculatorWrapper>
  );
}
