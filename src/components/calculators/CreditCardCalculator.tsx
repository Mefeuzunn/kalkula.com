"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, TrendingUp, Info, AlertCircle, RefreshCw, DollarSign } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";

export function CreditCardCalculator() {
  const [balance, setBalance] = useState("20000");
  const [interestRate, setInterestRate] = useState("5.00");
  const [minPaymentRate, setMinPaymentRate] = useState("20");
  const [results, setResults] = useState<{
    minPayment: number;
    remainingBalance: number;
    estimatedInterest: number;
  } | null>(null);

  const calculate = () => {
    const b = parseFloat(balance) || 0;
    const i = parseFloat(interestRate) || 0;
    const m = parseFloat(minPaymentRate) || 0;

    const minPayment = (b * m) / 100;
    const remaining = b - minPayment;
    const monthlyInterest = (remaining * i) / 100;

    setResults({
      minPayment,
      remainingBalance: remaining,
      estimatedInterest: monthlyInterest,
    });
  };

  useEffect(() => {
    calculate();
  }, [balance, interestRate, minPaymentRate]);

  const reset = () => {
    setBalance("20000");
    setInterestRate("5.00");
    setMinPaymentRate("20");
    setResults(null);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(val);

  return (
    <V2CalculatorWrapper
      title="KREDİ KARTI HESAPLAMA"
      icon="💳"
      infoText="Kredi kartı dönem borcunuz üzerinden asgari ödeme tutarını ve gelecek aya devreden borcun faiz maliyetini hesaplayın."
      results={results && (
        <V2Premium3DResult
          title="KART ANALİZİ"
          mainLabel="ASGARİ ÖDEME"
          mainValue={formatCurrency(results.minPayment || 0)}
          subLabel="GELECEK AYA DEVREDEN BORÇ"
          subValue={formatCurrency(results.remainingBalance || 0)}
          color="blue"
          variant="precise"
          accentIcon={<CreditCard size={32} />}
          items={[
            {
              label: "AYLIK FAİZ MALİYETİ",
              value: `+${formatCurrency(results.estimatedInterest || 0)}`,
              icon: <TrendingUp size={16} />,
              color: "text-red-500",
            },
            {
              label: "ASGARİ ORAN",
              value: `%${minPaymentRate}`,
              icon: <AlertCircle size={16} />,
              color: "text-blue-500",
            }
          ]}
          footerText="* Hesaplamalar BSMV ve KKDF vergileri hariç akdi faiz üzerinden yapılmıştır."
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
          <V2Input 
            label="TOPLAM DÖNEM BORCU" 
            value={balance} 
            onChange={setBalance} 
            unit="₺" 
            placeholder="20.000"
          />
          <div className="grid grid-cols-2 gap-4">
            <V2Input 
              label="ASGARİ ÖDEME ORANI" 
              value={minPaymentRate} 
              onChange={setMinPaymentRate} 
              unit="%" 
              placeholder="20"
            />
            <V2Input 
              label="AYLIK AKDİ FAİZ" 
              value={interestRate} 
              onChange={setInterestRate} 
              unit="%" 
              placeholder="5.00"
            />
          </div>
          <V2ActionRow 
            onCalculate={calculate} 
            onReset={reset} 
            calculateLabel="💳 Faiz Dahil Analiz Et"
          />
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-amber-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> 25.000 TL altı limitli kartlarda asgari ödeme oranı %20, 25.000 TL ve üzeri limitlerde %40 olarak uygulanır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
