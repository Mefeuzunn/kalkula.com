"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const vke = w / (h * h);
      setResult(vke);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#eab308", "#ef4444"]
      });
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  let status = "";
  let color = "";
  let description = "";
  let themeColor: "blue" | "emerald" | "amber" | "red" = "emerald";

  if (result !== null) {
    if (result < 18.5) { 
        status = "Zayıf"; 
        color = "#3b82f6"; 
        themeColor = "blue";
        description = "Kilonuz boyunuza göre az. Dengeli beslenmeye odaklanmalısınız.";
    }
    else if (result < 24.9) { 
        status = "Normal"; 
        color = "#22c55e"; 
        themeColor = "emerald";
        description = "Tebrikler! İdeal kilo aralığındasınız. Formunuzu koruyun.";
    }
    else if (result < 29.9) { 
        status = "Fazla Kilolu"; 
        color = "#eab308"; 
        themeColor = "amber";
        description = "İdeal kilonun biraz üzerindesiniz. Hareket miktarını artırın.";
    }
    else { 
        status = "Obez"; 
        color = "#ef4444"; 
        themeColor = "red";
        description = "Kilonuz sağlığınızı tehdit edebilir. Bir uzmana danışmanızı öneririz.";
    }
  }

  return (
    <V2CalculatorWrapper
      title="VÜCUT KİTLE ENDEKSİ (VKE)"
      icon="⚖️"
      infoText="Vücut kitle endeksi (VKE), vücut ağırlığının boy uzunluğunun karesine bölünmesiyle hesaplanır. Sağlıklı bir yaşam için ideal aralık 18.5 ile 24.9 arasıdır."
      results={result !== null && (
        <div className="space-y-8">
          <V2ResultCard
            color={themeColor}
            icon="📊"
            label={status.toUpperCase()}
            value={result.toFixed(1)}
            subLabel="Vücut Kitle Endeksiniz"
          />

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-6">
             <p className="text-center text-sm font-medium italic text-muted leading-relaxed">
                {description}
             </p>

             <div className="space-y-2">
                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden flex">
                    <div style={{ flex: 18.5, background: '#3b82f6', opacity: result < 18.5 ? 1 : 0.3 }}></div>
                    <div style={{ flex: 6.4, background: '#22c55e', opacity: (result >= 18.5 && result < 24.9) ? 1 : 0.3 }}></div>
                    <div style={{ flex: 5, background: '#eab308', opacity: (result >= 24.9 && result < 29.9) ? 1 : 0.3 }}></div>
                    <div style={{ flex: 10.1, background: '#ef4444', opacity: result >= 29.9 ? 1 : 0.3 }}></div>
                    
                    <div 
                        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-all duration-1000 ease-out"
                        style={{ left: `${Math.min(98, Math.max(2, (result / 40) * 100))}%` }}
                    />
                </div>
                <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest px-1">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                </div>
             </div>
          </div>
        </div>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input
          label="BOY (CM)"
          value={height}
          onChange={setHeight}
          unit="CM"
          placeholder="175"
        />
        <V2Input
          label="KİLO (KG)"
          value={weight}
          onChange={setWeight}
          unit="KG"
          placeholder="70"
        />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="⚖️ Endeks Hesapla"
      />
    </V2CalculatorWrapper>
  );
}
