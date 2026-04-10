"use client";

import React, { useState, useEffect } from "react";
import { Landmark, TrendingUp, Percent, Calculator, PiggyBank, DollarSign } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";

export function DepositInterestCalculator() {
  const [capital, setCapital] = useState("100000");
  const [interestRate, setInterestRate] = useState("45");
  const [term, setTerm] = useState("32");
  const [taxRate, setTaxRate] = useState("7.5");

  const [result, setResult] = useState<{
    gross: number;
    net: number;
    taxAmount: number;
    totalEnd: number;
    dailyNet: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(capital) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(term) || 0;
    const tax = parseFloat(taxRate) || 0;

    // Formula: (P * R * T) / 36500 (standard for TRY deposits in Turkey)
    const gross = (p * r * t) / 36500;
    const taxAmount = (gross * tax) / 100;
    const net = gross - taxAmount;
    const totalEnd = p + net;
    const dailyNet = net / t;

    setResult({
      gross,
      net,
      taxAmount,
      totalEnd,
      dailyNet
    });
  };

  useEffect(() => {
    calculate();
  }, [capital, interestRate, term, taxRate]);

  const reset = () => {
    setCapital("100000");
    setInterestRate("45");
    setTerm("32");
    setTaxRate("7.5");
    setResult(null);
  };

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(v);

  return (
    <V2CalculatorWrapper
      title="MEVDUAT GETİRİSİ"
      icon="🏦"
      infoText="Anaparanızın vade sonundaki net getirisini ve stopaj kesintisini anında hesaplayın. TCMB ve banka oranlarıyla uyumlu algoritma."
      results={result && (
        <V2Premium3DResult
          title="MEVDUAT ANALİZİ"
          mainLabel="NET VADE SONU GETİRİSİ"
          mainValue={fmt(result.net)}
          subLabel="TOPLAM VADE SONU TUTAR"
          subValue={fmt(result.totalEnd)}
          color="emerald"
          variant="precise"
          accentIcon={<Landmark size={32} />}
          items={[
            {
              label: "BRÜT KAZANÇ",
              value: fmt(result.gross),
              icon: <TrendingUp size={16} />,
              color: "text-emerald-500",
            },
            {
              label: "STOPAJ KESİNTİSİ",
              value: `- ${fmt(result.taxAmount)}`,
              icon: <Percent size={16} />,
              color: "text-red-500",
            },
            {
              label: "GÜNLÜK NET GETİRİ",
              value: fmt(result.dailyNet),
              icon: <DollarSign size={16} />,
              color: "text-blue-500",
            }
          ]}
          footerText={`* ${term} günlük vade sonunda elde edilecek tahmini verilerdir.`}
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
          <V2Input label="ANAPARA" value={capital} onChange={setCapital} unit="₺" placeholder="100.000" />
          <div className="grid grid-cols-2 gap-4">
            <V2Input label="YILLIK FAİZ (%)" value={interestRate} onChange={setInterestRate} unit="%" placeholder="45" />
            <V2Input label="VADE (GÜN)" value={term} onChange={setTerm} unit="Gün" placeholder="32" />
          </div>
          <V2Input label="STOPAJ ORANI (%)" value={taxRate} onChange={setTaxRate} unit="%" placeholder="7.5" />
          <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="🏦 Mevduat Getirisini Hesapla" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
