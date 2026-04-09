"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { FileText, TrendingUp, HandCoins, Info, ArrowUpRight } from "lucide-react";

export function BillCalculator() {
  const [nominal, setNominal] = useState("100000");
  const [price, setPrice] = useState("92000");
  const [days, setDays] = useState("90");
  const [result, setResult] = useState<{ annualYield: number; profit: number; dayReturn: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(nominal);
    const p = parseFloat(price);
    const d = parseFloat(days);
    if (n > 0 && p > 0 && d > 0 && n > p) {
      const profit = n - p;
      const annualYield = ((n / p) - 1) * (365 / d) * 100;
      const dayReturn = (profit / p) * 100;
      setResult({ annualYield, profit, dayReturn });
    } else setResult(null);
  };

  const reset = () => { setNominal("100000"); setPrice("92000"); setDays("90"); setResult(null); };

  useEffect(() => { calculate(); }, [nominal, price, days]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="BONO GETİRİ HESAPLAYICI"
      icon="📄"
      infoText="Hazine Bonosu, Finansman Bonosu gibi iskontolu (kuponsuz) menkul kıymetler için yıllık getiri oranı hesaplanır. Vergi kesilmeden önceki brüt verim gösterilmektedir."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Vade Sonu Nominal Değer" 
          value={nominal} 
          onChange={setNominal} 
          unit="₺" 
          placeholder="100000"
        />
        <V2Input 
          label="Bugünkü İşlem Fiyatı" 
          value={price} 
          onChange={setPrice} 
          unit="₺" 
          placeholder="92000"
        />
        <div className="md:col-span-2">
          <V2Input 
            label="Vadeye Kalan Gün" 
            value={days} 
            onChange={setDays} 
            unit="GÜN" 
            placeholder="90"
          />
        </div>
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📄 Bono Verimini Hesapla"
      />

      {result && (
        <V2Premium3DResult
          title="BONO VERİM ANALİZİ"
          mainLabel="YILLIKLANDIRILMIŞ BASİT GETİRİ"
          mainValue={`%${result.annualYield.toFixed(2)}`}
          subLabel={`${days} günlük vade projeksiyonu`}
          subValue=""
          color="emerald"
          variant="precise"
          accentIcon={<FileText size={32} />}
          items={[
            {
              label: "VADE SONU NET KÂR",
              value: `+${fmt(result.profit)}`,
              icon: <HandCoins size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              label: "DÖNEMSEL GETİRİ",
              value: `%${result.dayReturn.toFixed(2)}`,
              icon: <ArrowUpRight size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "VADE SÜRESİ",
              value: `${days} Gün`,
              icon: <Info size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}
