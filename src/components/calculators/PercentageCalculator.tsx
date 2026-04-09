"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function PercentageCalculator() {
  const [val1, setVal1] = useState("500");
  const [val2, setVal2] = useState("20");
  const [val3, setVal3] = useState("50");
  const [val4, setVal4] = useState("200");
  const [val5, setVal5] = useState("100");
  const [val6, setVal6] = useState("150");

  const [res1, setRes1] = useState<string | null>(null);
  const [res2, setRes2] = useState<string | null>(null);
  const [res3, setRes3] = useState<string | null>(null);

  useEffect(() => {
    const x = parseFloat(val1), y = parseFloat(val2);
    if (!isNaN(x) && !isNaN(y)) setRes1(((x * y) / 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }));
    else setRes1(null);
  }, [val1, val2]);

  useEffect(() => {
    const x = parseFloat(val3), y = parseFloat(val4);
    if (!isNaN(x) && !isNaN(y) && y !== 0) setRes2(((x / y) * 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }) + "%");
    else setRes2(null);
  }, [val3, val4]);

  useEffect(() => {
    const start = parseFloat(val5), end = parseFloat(val6);
    if (!isNaN(start) && !isNaN(end) && start !== 0) {
      const change = ((end - start) / Math.abs(start)) * 100;
      setRes3((change >= 0 ? "+" : "") + change.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + "%");
    } else setRes3(null);
  }, [val5, val6]);

  const reset = () => {
    setVal1("500"); setVal2("20"); setVal3("50"); setVal4("200"); setVal5("100"); setVal6("150");
  };

  return (
    <V2CalculatorWrapper
      title="YÜZDE HESAPLAMA ANALİZİ"
      icon="📊"
      infoText="Yüzde hesaplamaları günlük hayatta indirim, KDV, kâr payı ve büyüme analizlerinde en sık kullanılan matematiksel formüllerdir."
      results={(res1 || res2 || res3) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {res1 && (
            <V2ResultCard
              color="blue"
              label={`${val1} sayısının %${val2}'si`}
              value={res1}
              icon="🔢"
            />
          )}
          {res2 && (
            <V2ResultCard
              color="amber"
              label={`${val3}, ${val4} sayısının kaçıdır?`}
              value={res2}
              icon="📈"
            />
          )}
          {res3 && (
            <V2ResultCard
              color={parseFloat(res3) >= 0 ? "emerald" : "red"}
              label="Değişim Oranı"
              value={res3}
              icon="🔄"
            />
          )}
        </div>
      )}
    >
      <div className="space-y-12">
        {/* Bölüm 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-[10px] font-black text-muted uppercase tracking-widest italic">1. Yüzde Tutarı Bulma</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <V2Input label="SAYI (A)" value={val1} onChange={setVal1} />
            <V2Input label="YÜZDE (B)" value={val2} onChange={setVal2} unit="%" />
          </div>
        </div>

        {/* Bölüm 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-[10px] font-black text-muted uppercase tracking-widest italic">2. Sayıların Birbirine Oranı</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <V2Input label="SAYI (A)" value={val3} onChange={setVal3} />
            <V2Input label="TÜMÜ (B)" value={val4} onChange={setVal4} />
          </div>
        </div>

        {/* Bölüm 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-[10px] font-black text-muted uppercase tracking-widest italic">3. Değişim (Kâr/Zarar) Oranı</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <V2Input label="İLK DEĞER" value={val5} onChange={setVal5} />
            <V2Input label="SON DEĞER" value={val6} onChange={setVal6} />
          </div>
        </div>
      </div>

      <V2ActionRow
        onCalculate={() => {}}
        onReset={reset}
        calculateLabel="Matematiksel Analizi Tamamla"
      />
    </V2CalculatorWrapper>
  );
}
