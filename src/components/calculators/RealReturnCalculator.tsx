"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { TrendingDown, TrendingUp, Info, ShieldAlert, ShieldCheck } from "lucide-react";

export function RealReturnCalculator() {
  const [nominalRate, setNominalRate] = useState("45");
  const [inflationRate, setInflationRate] = useState("60");
  const [result, setResult] = useState<{ realRate: number; isPositive: boolean } | null>(null);

  const calculate = () => {
    const nr = parseFloat(nominalRate) / 100;
    const infl = parseFloat(inflationRate) / 100;

    if (!isNaN(nr) && !isNaN(infl)) {
      const realRate = ((1 + nr) / (1 + infl) - 1) * 100;
      setResult({ realRate, isPositive: realRate >= 0 });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setNominalRate("45"); setInflationRate("60"); setResult(null); };

  useEffect(() => { calculate(); }, [nominalRate, inflationRate]);

  return (
    <V2CalculatorWrapper
      title="REEL GETİRİ ANALİZİ"
      icon="📉"
      infoText="Reel getiri hesaplamasında Fisher Denklemi kullanılır. Yüksek enflasyonlu ortamlarda basit çıkarma işlemi hatalı sonuçlar verir."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Yıllık Nominal Getiri" 
          value={nominalRate} 
          onChange={setNominalRate} 
          unit="%" 
          step="0.1"
          placeholder="45"
        />
        <V2Input 
          label="Tahmini Yıllık Enflasyon" 
          value={inflationRate} 
          onChange={setInflationRate} 
          unit="%" 
          step="0.1"
          placeholder="60"
        />
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📈 Getiriyi Analiz Et"
      />

      {result && (
        <V2Premium3DResult
          title="NET ALIM GÜCÜ ANALİZİ"
          mainLabel={result.isPositive ? "ENFLASYON ÜSTÜ REEL KAZANÇ" : "ENFLASYON ALTI REEL KAYIP"}
          mainValue={`%${result.realRate.toFixed(2)}`}
          subLabel={result.isPositive ? "✨ Yatırımınız alım gücünüzü korumuş ve artırmıştır." : "⚠️ Alım gücünüz maalesef enflasyon karşısında eriyor."}
          subValue=""
          color={result.isPositive ? "emerald" : "red"}
          variant="precise"
          accentIcon={result.isPositive ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
          items={[
            {
              label: "NOMİNAL GETİRİ",
              value: `%${parseFloat(nominalRate).toFixed(1)}`,
              icon: <TrendingUp size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "ENFLASYON ORANI",
              value: `%${parseFloat(inflationRate).toFixed(1)}`,
              icon: <TrendingDown size={16} />,
              color: "bg-red-500/10 text-red-500"
            },
            {
              label: "DURUM ANALİZİ",
              value: result.isPositive ? "BAŞARILI" : "KAYIP",
              icon: <Info size={16} />,
              color: result.isPositive ? "bg-emerald-500/10 text-emerald-500 font-black" : "bg-red-500/10 text-red-500 font-black"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Reel getiri hesaplamasında Fisher Denklemi [(1+Nominal)/(1+Enflasyon)-1] kullanılır. Yüksek enflasyonlu ortamlarda basit çıkarma işlemi (Nominal - Enflasyon) hatalı sonuçlar verir.</span>
      </div>
    </div>
  );
}
