"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, RotateCcw, Anchor, Droplets, Waves, Gauge, Activity, Cpu, Thermometer, Shield } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

interface Fluid {
  name: string;
  density: number; // kg/m3
}

const FLUIDS: Fluid[] = [
  { name: "Su (Taze)", density: 1000 },
  { name: "Deniz Suyu", density: 1025 },
  { name: "Zeytinyağı", density: 920 },
  { name: "Cıva", density: 13600 },
  { name: "Alkol", density: 789 },
];

export function FluidPressureCalculator() {
  const [fluidIdx, setFluidIdx] = useState("0");
  const [depth, setDepth] = useState("10");
  const [gravity, setGravity] = useState("9.81");
  const [atmPressure, setAtmPressure] = useState("101325"); // 1 atm in Pa

  const [results, setResults] = useState<{
    hydrostatic: number;
    total: number;
    atmUnits: number;
  } | null>(null);

  const fluid = FLUIDS[parseInt(fluidIdx)];

  const calculate = () => {
    const h = parseFloat(depth) || 0;
    const g = parseFloat(gravity) || 0;
    const rho = fluid.density;
    const pAtm = parseFloat(atmPressure) || 0;

    if (h < 0) {
      setResults(null);
      return;
    }

    const pHydro = h * rho * g;
    const pTotal = pHydro + pAtm;

    setResults({
      hydrostatic: pHydro,
      total: pTotal,
      atmUnits: pTotal / 101325,
    });
  };

  useEffect(() => {
    calculate();
  }, [fluidIdx, depth, gravity, atmPressure]);

  const reset = () => {
    setFluidIdx("0");
    setDepth("10");
    setGravity("9.81");
    setAtmPressure("101325");
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  return (
    <V2CalculatorWrapper
      title="SIVI BASINCI HESAPLAYICI"
      icon="🌊"
      infoText="Akışkanın türü, derinliği ve yerçekimi ivmesine bağlı olarak hidrostatik ve toplam (mutlak) basıncı analiz edin."
      results={results && (
        <div className="space-y-6 animate-result">
           <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-black/40 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-4 left-6 flex flex-col gap-0 z-10">
                 <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">HD ANALİZ</div>
                 <div className="text-[8px] text-muted uppercase font-bold tracking-widest opacity-50">{fluid.name} @ {depth}m</div>
              </div>
              
              {/* Tank Visualization */}
              <div className="relative w-full max-w-[300px] h-[180px] border-x-4 border-b-4 border-blue-600/30 rounded-b-3xl bg-secondary/10 mt-10 overflow-hidden mb-4">
                 <div 
                   className="absolute bottom-0 w-full bg-blue-500/30 border-t-2 border-blue-400 transition-all duration-700 ease-in-out" 
                   style={{ height: `${Math.min(100, Math.max(10, parseFloat(depth) * 5))}%` }}
                 >
                    <div className="w-full h-full animate-pulse bg-blue-400/5"></div>
                    <div className="absolute top-0 w-full h-px bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.5)]"></div>
                 </div>
                 
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-400/20 border-dashed border-t flex items-center justify-center">
                    <span className="bg-black/50 text-[7px] font-black italic text-red-500 px-2 rounded-full border border-red-500/10 uppercase">HESAP NOKTASI</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard 
                color="blue" 
                label="HİDROSTATİK BASINÇ" 
                value={results.hydrostatic.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} 
                unit="Pascal (Pa)"
                icon="💧"
                subLabel="Sadece Sıvı Ağırlığı"
              />
              <V2ResultCard 
                color="emerald" 
                label="BİRİM KARŞILIĞI" 
                value={results.atmUnits.toLocaleString('tr-TR', { maximumFractionDigits: 3 })} 
                unit="Atm"
                icon="⚖️"
                subLabel="Atmosfer Cinsinden"
              />
           </div>

           <V2ResultCard 
             color="indigo" 
             label="TOPLAM (MUTLAK) BASINÇ" 
             value={(results.total / 1000).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
             unit="kPa"
             icon="🆙"
             subLabel="Açık Hava + Sıvı Basıncı"
             className="!py-6"
           />
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Select 
                label="AKIŞKAN TÜRÜ"
                value={fluidIdx}
                onChange={setFluidIdx}
                options={FLUIDS.map((f, i) => ({ value: i.toString(), label: `${f.name} (ρ: ${f.density})` }))}
              />
              <V2Input 
                label="DERİNLİK (M)" 
                value={depth} 
                onChange={setDepth} 
                unit="m" 
                placeholder="10" 
                fieldClassName="!text-2xl font-black italic"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="YERÇEKİMİ İVMESİ" 
                value={gravity} 
                onChange={setGravity} 
                unit="m/s²" 
                placeholder="9.81" 
                fieldClassName="!text-2xl font-black italic"
              />
              <V2Input 
                label="YÜZEY BASINCI (P₀)" 
                value={atmPressure} 
                onChange={setAtmPressure} 
                unit="Pa" 
                placeholder="101325" 
                fieldClassName="!text-sm font-black italic"
                subLabel="Standart: 101325 Pa (1 Atm)"
              />
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Akışkan Analizi" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Waves className="w-5 h-5 text-blue-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">HİDROSTATİK</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Gauge className="w-5 h-5 text-emerald-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">BAROMETRİK</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">GÜVENLİ LİMİT</div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Teknik Not:</b> P = h · ρ · g formülü kullanılmıştır. Sıvının sıkıştırılamaz olduğu ve sıcaklığın sabit kaldığı varsayılmıştır. Cıva gibi yoğun sıvılarda basınç artışı çok daha dramatiktir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
