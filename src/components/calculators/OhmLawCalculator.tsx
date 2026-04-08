"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Zap, Info, RotateCcw, Activity, Cpu, Gauge, ZapOff } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function OhmLawCalculator() {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [p, setP] = useState("");
  
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  const [results, setResults] = useState<{ v: number; i: number; r: number; p: number; formula: string } | null>(null);

  const handleInput = (name: string, val: string) => {
    if (val === "") {
      setActiveInputs(prev => prev.filter(item => item !== name));
    } else if (!activeInputs.includes(name)) {
      if (activeInputs.length >= 2) {
        // Remove the oldest input if we already have 2, then add the new one
        setActiveInputs(prev => [...prev.slice(1), name]);
      } else {
        setActiveInputs(prev => [...prev, name]);
      }
    }

    if (name === "v") setV(val);
    if (name === "i") setI(val);
    if (name === "r") setR(val);
    if (name === "p") setP(val);
  };

  const calculate = () => {
    if (activeInputs.length < 2) {
      setResults(null);
      return;
    }

    let valV = parseFloat(v);
    let valI = parseFloat(i);
    let valR = parseFloat(r);
    let valP = parseFloat(p);
    
    let resV = 0, resI = 0, resR = 0, resP = 0, formula = "";

    // Case selection based on provided 2 values
    if (activeInputs.includes("v") && activeInputs.includes("i")) {
      resV = valV; resI = valI;
      resR = valV / valI;
      resP = valV * valI;
      formula = `R = V / I = ${valV} / ${valI}, P = V * I = ${valV} * ${valI}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("r")) {
      resV = valV; resR = valR;
      resI = valV / valR;
      resP = (valV * valV) / valR;
      formula = `I = V / R = ${valV} / ${valR}, P = V² / R = ${valV}² / ${valR}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("r")) {
      resI = valI; resR = valR;
      resV = valI * valR;
      resP = (valI * valI) * valR;
      formula = `V = I * R = ${valI} * ${valR}, P = I² * R = ${valI}² * ${valR}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("p")) {
      resV = valV; resP = valP;
      resI = valP / valV;
      resR = (valV * valV) / valP;
      formula = `I = P / V = ${valP} / ${valV}, R = V² / P = ${valV}² / ${valP}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("p")) {
      resI = valI; resP = valP;
      resV = valP / valI;
      resR = valP / (valI * valI);
      formula = `V = P / I = ${valP} / ${valI}, R = P / I² = ${valP} / ${valI}²`;
    } else if (activeInputs.includes("r") && activeInputs.includes("p")) {
      resR = valR; resP = valP;
      resV = Math.sqrt(valP * valR);
      resI = Math.sqrt(valP / valR);
      formula = `V = √(P * R) = √(${valP} * ${valR}), I = √(P / R) = √(${valP} / ${valR})`;
    }

    setResults({ v: resV, i: resI, r: resR, p: resP, formula });
  };

  useEffect(() => {
    calculate();
  }, [v, i, r, p, activeInputs]);

  const reset = () => {
    setV(""); setI(""); setR(""); setP("");
    setActiveInputs([]);
    setResults(null);
  };

  const handleReset = () => {
    reset();
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#6366f1"] });
  }

  return (
    <V2CalculatorWrapper
      title="OHM KANUNU HESAPLAYICI"
      icon="⚡"
      infoText="Elektriksel parametreler (Voltaj, Akım, Direnç, Güç) arasındaki ilişkiyi hesaplayın. İki değer girdiğinizde diğerleri anlık olarak hesaplanır."
      results={results && (
        <div className="space-y-6 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard 
                color="blue" 
                label="VOLTAJ (GERİLİM)" 
                value={results.v.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} 
                unit="Volt"
                icon="⚡"
                subLabel={activeInputs.includes("v") ? "Sizin Değeriniz" : "Hesaplanan Değer"}
                className={!activeInputs.includes("v") ? "border-blue-500/30" : "opacity-70"}
              />
              <V2ResultCard 
                color="emerald" 
                label="AKIM (AMPER)" 
                value={results.i.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} 
                unit="Amper"
                icon="🔌"
                subLabel={activeInputs.includes("i") ? "Sizin Değeriniz" : "Hesaplanan Değer"}
                className={!activeInputs.includes("i") ? "border-emerald-500/30" : "opacity-70"}
              />
              <V2ResultCard 
                color="amber" 
                label="DİRENÇ (OHM)" 
                value={results.r.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} 
                unit="Ω"
                icon="🚧"
                subLabel={activeInputs.includes("r") ? "Sizin Değeriniz" : "Hesaplanan Değer"}
                className={!activeInputs.includes("r") ? "border-amber-500/30" : "opacity-70"}
              />
              <V2ResultCard 
                color="purple" 
                label="GÜÇ (WATT)" 
                value={results.p.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} 
                unit="Watt"
                icon="🔥"
                subLabel={activeInputs.includes("p") ? "Sizin Değeriniz" : "Hesaplanan Değer"}
                className={!activeInputs.includes("p") ? "border-purple-500/30" : "opacity-70"}
              />
           </div>

           <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 space-y-3">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic px-2">ÇÖZÜM ANALİZİ</div>
              <div className="font-mono text-xs text-primary/80 bg-black/20 p-4 rounded-2xl border border-white/5 italic">
                 {results.formula}
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">DEVRE PARAMETRELERİ</span>
              </div>
              <p className="text-[10px] text-muted italic opacity-60">En az iki değer girdiğinizde sistem otomatik olarak devreyi tamamlar.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="GERİLİM (V)" 
                value={v} 
                onChange={(val) => handleInput("v", val)} 
                type="number" 
                unit="Volt" 
                placeholder="220" 
                fieldClassName="!text-2xl font-black italic"
                className={activeInputs.includes("v") ? "!border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : ""}
              />
              <V2Input 
                label="AKIM (I)" 
                value={i} 
                onChange={(val) => handleInput("i", val)} 
                type="number" 
                unit="Amper" 
                placeholder="10" 
                fieldClassName="!text-2xl font-black italic"
                className={activeInputs.includes("i") ? "!border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : ""}
              />
              <V2Input 
                label="DİRENÇ (R)" 
                value={r} 
                onChange={(val) => handleInput("r", val)} 
                type="number" 
                unit="Ω" 
                placeholder="22" 
                fieldClassName="!text-2xl font-black italic"
                className={activeInputs.includes("r") ? "!border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]" : ""}
              />
              <V2Input 
                label="GÜÇ (P)" 
                value={p} 
                onChange={(val) => handleInput("p", val)} 
                type="number" 
                unit="Watt" 
                placeholder="2200" 
                fieldClassName="!text-2xl font-black italic"
                className={activeInputs.includes("p") ? "!border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" : ""}
              />
           </div>

           <V2ActionRow 
              onCalculate={() => {}} 
              onReset={handleReset} 
              calculateLabel="Otomatik Analiz" 
              isCalculateDisabled={true} 
              className="!mt-4" 
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Gauge className="w-5 h-5 text-blue-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">HASSAS ÖLÇÜM</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Cpu className="w-5 h-5 text-emerald-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">NATIVE MOTOR</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <ZapOff className="w-5 h-5 text-amber-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">KAYIP ANALİZİ</div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Kullanım Notu:</b> Ohm Kanunu (V=IR), elektrik devrelerinde gerilim, akım ve direnç arasındaki temel bağıntıdır. Bu araç, girdiğiniz son 2 değeri baz alarak tüm devreyi anlık olarak çözümler.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
