import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Landmark, ArrowRight, Wallet, Percent, Calendar } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
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
          <V2Premium3DResult
            title="BANKA KREDİ ÖZETİ"
            mainLabel="AYLIK TAKSİT TUTARI"
            mainValue={fmt(result.monthly)}
            subLabel="TOPLAM GERİ ÖDEME"
            subValue={fmt(result.total)}
            color="emerald"
            variant="precise"
            gaugePercentage={interestRatio}
            gaugeLabel="FAİZ YÜKÜ"
            accentIcon={<Landmark size={32} />}
            items={[
              {
                label: "TOPLAM FAİZ",
                value: fmt(result.interest),
                icon: <Percent size={16} />,
                color: "bg-emerald-500/10 text-emerald-500"
              },
              {
                label: "VADE SÜRESİ",
                value: `${months} Ay / ${Math.round(parseInt(months)/12 * 10) / 10} Yıl`,
                icon: <Calendar size={16} />,
                color: "bg-blue-500/10 text-blue-500"
              }
            ]}
          />

          <Link 
            href={`/hesapla/kredi-odeme-plani?amount=${amount}&rate=${rate}&months=${months}`}
            className="calc-btn-calculate-v2 !bg-slate-900 !border-slate-800 hover:!bg-black !text-sm w-full py-6 flex items-center justify-center gap-3 rounded-[2rem] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:-translate-y-1"
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
