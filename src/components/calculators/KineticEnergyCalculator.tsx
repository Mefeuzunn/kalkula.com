"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Zap, Info, RotateCcw, Activity, Cpu, Gauge, Ruler, Thermometer, Shield, Target, Weight, Activity as Pulse } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function KineticEnergyCalculator() {
  const [mass, setMass] = useState("5");
  const [velocity, setVelocity] = useState("10");
  const [height, setHeight] = useState("10");
  const [gravity, setGravity] = useState("9.81");

  const [results, setResults] = useState<{
    kinetic: number;
    potential: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    const m = parseFloat(mass) || 0;
    const v = parseFloat(velocity) || 0;
    const h = parseFloat(height) || 0;
    const g = parseFloat(gravity) || 0;

    if (m <= 0) {
      setResults(null);
      return;
    }

    const ke = 0.5 * m * v * v;
    const pe = m * g * h;

    setResults({
      kinetic: ke,
      potential: pe,
      total: ke + pe,
    });
  };

  useEffect(() => {
    calculate();
  }, [mass, velocity, height, gravity]);

  const reset = () => {
    setMass("5");
    setVelocity("10");
    setHeight("10");
    setGravity("9.81");
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#f59e0b"] });
  };

  return (
    <V2CalculatorWrapper
      title="ENERJİ ANALİZ MOTORU"
      icon="⚛️"
      infoText="Cisimlerin kütle, hız ve yükseklik verilerine göre kinetik ve potansiyel enerjilerini analiz edin. Farklı gezegenlerin yerçekimi ortamlarında simülasyon yapın."
      results={results && (
        <div className="space-y-6 animate-result">
           <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-black/40 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-4 left-6 flex flex-col gap-0 z-10">
                 <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] italic">TOPLAM MEKANİK ENERJİ</div>
                 <div className="text-[8px] text-muted uppercase font-bold tracking-widest opacity-50">Conservational Physics v2.0</div>
              </div>
              
              <div className="relative w-48 h-48 my-6">
                 <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      stroke="currentColor" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={283}
                      strokeDashoffset={283 - (Math.min(100, (results.kinetic / (results.total || 1)) * 100) / 100) * 283}
                      strokeLinecap="round"
                      className="text-blue-500 transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="36" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray={226}
                      strokeDashoffset={226 - (Math.min(100, (results.potential / (results.total || 1)) * 100) / 100) * 226}
                      strokeLinecap="round"
                      className="text-amber-500 transition-all duration-1000 ease-out opacity-80" 
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-60">TOPLAM</span>
                    <span className="text-3xl font-black italic tracking-tighter text-primary drop-shadow-sm">
                      {results.total > 1000000 ? `${(results.total / 1000000).toFixed(2)} MJ` : results.total.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} J
                    </span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard 
                color="blue" 
                label="KİNETİK ENERJİ (Eₖ)" 
                value={results.kinetic.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
                unit="Joule"
                icon="⚡"
                subLabel="Harekete Bağlı Enerji"
              />
              <V2ResultCard 
                color="amber" 
                label="POTANSİYEL ENERJİ (Eₚ)" 
                value={results.potential.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
                unit="Joule"
                icon="🆙"
                subLabel="Konuma Bağlı Enerji"
              />
           </div>

           <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                    <Pulse className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                    <div className="text-[10px] font-black text-amber-500 uppercase italic">ISI EŞDEĞERİ</div>
                    <div className="text-xl font-black text-primary italic">{(results.total * 0.000239006).toLocaleString('tr-TR', { maximumFractionDigits: 3 })} kcal</div>
                 </div>
              </div>
              <div className="text-[9px] font-black text-muted uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">THERMAL DATA</div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="KÜTLE (M)" 
                value={mass} 
                onChange={setMass} 
                unit="kg" 
                placeholder="5" 
                fieldClassName="!text-2xl font-black italic"
              />
              <V2Select 
                label="YERÇEKİMİ ORTAMI"
                value={gravity}
                onChange={setGravity}
                options={[
                  { value: "9.81", label: "Dünya (9.81 m/s²)" },
                  { value: "1.62", label: "Ay (1.62 m/s²)" },
                  { value: "3.71", label: "Mars (3.71 m/s²)" },
                  { value: "24.79", label: "Jüpiter (24.79 m/s²)" },
                  { value: "274", label: "Güneş (274 m/s²)" },
                ]}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="HIZ (V)" 
                value={velocity} 
                onChange={setVelocity} 
                unit="m/s" 
                placeholder="10" 
                fieldClassName="!text-2xl font-black italic"
              />
              <V2Input 
                label="YÜKSEKLİK (H)" 
                value={height} 
                onChange={setHeight} 
                unit="m" 
                placeholder="10" 
                fieldClassName="!text-2xl font-black italic"
              />
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Enerji Çözümle" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Weight className="w-5 h-5 text-amber-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">MASS FLOW</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Gauge className="w-5 h-5 text-blue-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">VELOCITY LOG</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">ENTROPY CONTROL</div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Fizik Yasası:</b> Mekanik enerji korunumu, sürtünmesiz ortamlarda Eₖ + Eₚ toplamının sabit kalmasını ifade eder. Bu araç, hem dinamik hareketi hem de duran bir cismin potansiyel enerjisini hesaplar.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
