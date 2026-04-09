"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { Home, Building2, TrendingUp, Landmark, Calculator, ReceiptText } from "lucide-react";

type PropertyType = "konut" | "isyeri";

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState("15000");
  const [propertyType, setPropertyType] = useState<PropertyType>("konut");
  const [inflationRate, setInflationRate] = useState("65.93");
  
  const [results, setResults] = useState<{ increaseAmount: number; newRent: number; increaseRate: number; legalStatus: string; } | null>(null);

  const calculate = () => {
    const rent = parseFloat(currentRent) || 0;
    const rate = parseFloat(inflationRate) || 0;

    if (rent <= 0) { setResults(null); return; }

    const increaseRate = rate;
    const increaseAmount = rent * (increaseRate / 100);
    const newRent = rent + increaseAmount;

    setResults({
      increaseAmount, newRent, increaseRate,
      legalStatus: "12 Aylık TÜFE Ortalaması (Yasal Sınır)"
    });
  };

  const reset = () => { setCurrentRent("15000"); setPropertyType("konut"); setInflationRate("65.93"); setResults(null); };

  useEffect(() => { calculate(); }, [currentRent, propertyType, inflationRate]);

  return (
    <V2CalculatorWrapper
      title="KİRA ARTIŞ HESAPLAYICI"
      icon="⚖️"
      infoText="Temmuz 2024 itibarıyla konutlarda %25 sınırı kalkmıştır. Hem konut hem işyerinde yasal tavan artış oranı, son 12 ayın TÜFE ortalamasıdır."
    >
      <div className="flex gap-2 mb-8 bg-secondary/10 p-1.5 rounded-2xl border border-border/50">
        <button 
          onClick={() => setPropertyType("konut")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 ${propertyType === "konut" ? "bg-blue-500 text-white shadow-lg" : "text-muted hover:bg-secondary/20"}`}
        >
          <Home size={14} />
          KONUT
        </button>
        <button 
          onClick={() => setPropertyType("isyeri")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 ${propertyType === "isyeri" ? "bg-blue-500 text-white shadow-lg" : "text-muted hover:bg-secondary/20"}`}
        >
          <Building2 size={14} />
          İŞYERİ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Mevcut Kira Bedeli" 
          value={currentRent} 
          onChange={setCurrentRent} 
          unit="₺" 
          placeholder="15000"
        />
        <V2Input 
          label="TÜFE (12 Aylık Ort.)" 
          value={inflationRate} 
          onChange={setInflationRate} 
          unit="%" 
          step="0.01"
          placeholder="65.93"
        />
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📈 Yeni Kirayı Hesapla"
      />

      {results && (
        <V2Premium3DResult
          title="KİRA ARTIŞ ANALİZİ"
          mainLabel="RESMİ MAKSİMUM KİRA"
          mainValue={`${results.newRent.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`}
          subLabel="Yasal sınır (12 Aylık TÜFE) uygulandı."
          subValue=""
          color="blue"
          variant="precise"
          accentIcon={<ReceiptText size={32} />}
          items={[
            {
              label: "NET ARTIŞ MİKTARI",
              value: `+${results.increaseAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`,
              icon: <TrendingUp size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              label: "ARTIŞ ORANI",
              value: `%${results.increaseRate.toFixed(2)}`,
              icon: <Calculator size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "RESMİ STATÜ",
              value: "YASAL SINIR",
              icon: <Landmark size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Temmuz 2024 itibarıyla konutlarda %25 sınırı kalkmıştır. Hem konut hem işyerinde yasal tavan artış oranı, son 12 ayın TÜFE ortalamasıdır. Kiracıdan bu oranın üzerinde artış talep edilemez.</span>
      </div>
    </div>
  );
}
