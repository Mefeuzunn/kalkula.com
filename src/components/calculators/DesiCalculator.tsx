"use client";

import React, { useState, useEffect } from "react";
import { Package, Ruler, Box, Truck, Zap, Info, Calculator, Trash2, ArrowRight, Boxes } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function DesiCalculator() {
  const [width, setWidth] = useState("30");
  const [length, setLength] = useState("40");
  const [height, setHeight] = useState("20");
  const [divisor, setDivisor] = useState("3000");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(width) || 0;
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(divisor) || 3000;

    if (w > 0 && l > 0 && h > 0) {
      setResult((w * l * h) / d);
    } else {
      setResult(null);
    }
  };

  useEffect(() => { calculate(); }, [width, length, height, divisor]);

  const reset = () => {
    setWidth("30");
    setLength("40");
    setHeight("20");
    setDivisor("3000");
    setResult(null);
  };

  const volumeLiters = (parseFloat(width) * parseFloat(length) * parseFloat(height)) / 1000 || 0;

  return (
    <V2CalculatorWrapper
      title="KARGO DESİ HESAPLAMA"
      icon="📦"
      infoText="Gönderilerinizin hacimsel ağırlığını (desi) anında hesaplayın. Yurtiçi ve yurtdışı kargo standartlarına göre kargo maliyetlerinizi öngörün."
      results={result !== null && (
        <div className="space-y-6">
           <V2ResultCard 
             color="blue" 
             label="HESAPLANAN DESİ" 
             value={result.toFixed(2)} 
             icon="📐"
             subLabel={`Hassasiyet: 1/${divisor}`}
             className="!text-5xl font-black italic"
           />
           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">GERÇEK HACİM</div>
                 <div className="text-2xl font-black text-primary italic tracking-tighter">{volumeLiters.toFixed(1)} L</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">FORMÜL</div>
                 <div className="text-xs font-black text-blue-500 italic uppercase">VxLxH / {divisor}</div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <V2Input label="GENİŞLİK" value={width} onChange={setWidth} unit="cm" placeholder="30" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="UZUNLUK" value={length} onChange={setLength} unit="cm" placeholder="40" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="YÜKSEKLİK" value={height} onChange={setHeight} unit="cm" placeholder="20" fieldClassName="!text-2xl font-black italic" />
           </div>

           <div className="space-y-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                 <Truck className="w-4 h-4 text-blue-500" /> HESAPLAMA STANDARDI
              </div>
              <V2Select 
                label="HESAPLAMA STANDARDI"
                value={divisor} 
                onChange={setDivisor} 
                options={[
                  { value: "3000", label: "Yurtiçi Kargo Standardı (3000)" },
                  { value: "5000", label: "Yurtdışı Kargo Standardı (5000)" },
                ]}
              />
           </div>

           <V2ActionRow 
             onCalculate={calculate} 
             onReset={reset} 
             calculateLabel="DESİ HESAPLA"
             className="!mt-2"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Boxes className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">LOJİSTİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Hacimsel Ağırlık Analitiği</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Box className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">3D ÖLÇÜM</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Milimetrik Hacim Hesabı</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Desi, kargo gönderilerinde hacimsel ağırlığı ifade eder. Kargo şirketleri faturayı gerçek ağırlık ile desi değerinden hangisi büyükse onun üzerinden hesaplar.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
