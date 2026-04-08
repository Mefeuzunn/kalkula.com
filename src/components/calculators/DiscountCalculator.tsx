import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function DiscountCalculator() {
  const [faceValue, setFaceValue] = useState("50000");
  const [rate, setRate] = useState("36");
  const [days, setDays] = useState("90");
  const [result, setResult] = useState<{ dsDiscount: number; isDiscount: number; dsNet: number; isNet: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);
    if (fv > 0 && r > 0 && d > 0) {
      const t = d / 365;
      const dsDiscount = fv * r * t;
      const dsNet = fv - dsDiscount;
      const isDiscount = (fv * r * t) / (1 + (r * t));
      const isNet = fv - isDiscount;
      setResult({ dsDiscount, isDiscount, dsNet, isNet });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setFaceValue("50000"); setRate("36"); setDays("90"); setResult(null); };

  useEffect(() => { calculate(); }, [faceValue, rate, days]);

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="İSKONTO (KIRDIRMA) ANALİZİ"
      icon="📉"
      infoText="İç İskonto matematiksel olarak en adil yöntemdir, peşin değeri baz alır. Dış İskonto ise bankaların kullandığı ticari yöntemdir ve nominal değer üzerinden hesaplandığı için banka lehine kesinti daha yüksektir."
      results={result && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <V2ResultCard
              color="blue"
              label="İç İskonto (Net Kazanılan)"
              value={fmt(result.isNet)}
              subLabel={`Kesinti: ${fmt(result.isDiscount)}`}
              icon="🏦"
            />
            <V2ResultCard
              color="red"
              label="Dış İskonto (Net Kazanılan)"
              value={fmt(result.dsNet)}
              subLabel={`Kesinti: ${fmt(result.dsDiscount)}`}
              icon="📉"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#3b82f6]">
                <span>İç İskonto Verimliliği</span>
                <span>Daha Adil</span>
             </div>
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#ef4444]">
                <span>Dış İskonto Kesintisi</span>
                <span>Daha Yüksek</span>
             </div>
          </div>
        </div>
      )}
    >
      <V2Input
        label="SENETİN NOMİNAL DEĞERİ"
        value={faceValue}
        onChange={setFaceValue}
        unit="₺"
      />

      <div className="grid grid-cols-2 gap-4">
        <V2Input
          label="İSKONTO ORANI (%)"
          value={rate}
          onChange={setRate}
          unit="%"
          step="0.1"
        />
        <V2Input
          label="VADEYE KALAN GÜN"
          value={days}
          onChange={setDays}
          unit="GÜN"
        />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="📉 Kesintileri Analiz Et"
      />
    </V2CalculatorWrapper>
  );
}
