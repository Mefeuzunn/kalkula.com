"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Zap, Info, RotateCcw, Activity, Cpu, Gauge, Ruler, Thermometer, Shield, Target, Weight, Activity as Pulse, Cable, PlayCircle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function MotorPowerCalculator() {
  const [voltage, setVoltage] = useState("380"); // 3-Phase Standard
  const [rpm, setRpm] = useState("1450");
  const [powerKw, setPowerKw] = useState("5.5"); // Nominal Power
  const [cosPhi, setCosPhi] = useState("0.85");
  const [efficiency, setEfficiency] = useState("0.88");

  const [results, setResults] = useState<{
    torque: number;
    current: number;
    hp: number;
    watts: number;
  } | null>(null);

  const calculate = () => {
    const pKw = parseFloat(powerKw) || 0;
    const r = parseFloat(rpm) || 0;
    const v = parseFloat(voltage) || 380;
    const cp = parseFloat(cosPhi) || 0.85;
    const eff = parseFloat(efficiency) || 0.88;

    if (pKw <= 0 || r <= 0) {
      setResults(null);
      return;
    }

    // Torque (Nm) = 9550 * P(kW) / RPM
    const torque = (9550 * pKw) / r;
    
    // Current (I) = P(W) / (sqrt(3) * V * cosPhi * eff)
    const current = (pKw * 1000) / (Math.sqrt(3) * v * cp * eff);
    
    // Horsepower (HP) = kW / 0.7457
    const hp = pKw / 0.7457;

    setResults({
      torque,
      current,
      hp,
      watts: pKw * 1000
    });
  };

  useEffect(() => {
    calculate();
  }, [voltage, rpm, powerKw, cosPhi, efficiency]);

  const reset = () => {
    setVoltage("380");
    setRpm("1450");
    setPowerKw("5.5");
    setCosPhi("0.85");
    setEfficiency("0.88");
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#f59e0b"] });
  };

  return (
    <V2CalculatorWrapper
      title="ENDÜSTRİYEL MOTOR ANALİZÖRÜ"
      icon="⚙️"
      infoText="AC motorların nominal güç, devir ve verim değerlerini kullanarak mil torku, çekilen akım ve beygir gücü gibi teknik verileri analiz edin."
      results={results && (
        <div className="space-y-6 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard 
                color="blue" 
                label="MİL TORKU" 
                value={results.torque.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} 
                unit="Nm"
                icon="🔄"
                subLabel="Döndürme Momenti"
              />
              <V2ResultCard 
                color="emerald" 
                label="NOMİNAL AKIM" 
                value={results.current.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
                unit="Amper (A)"
                icon="🔌"
                subLabel="3-Faz Çekilen Akım"
              />
              <V2ResultCard 
                color="amber" 
                label="GÜÇ (HP)" 
                value={results.hp.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} 
                unit="Buhar Beygiri"
                icon="🐎"
                subLabel="Horsepower Karşılığı"
              />
              <V2ResultCard 
                color="indigo" 
                label="ELEKTRİKSEL YÜK" 
                value={results.watts.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} 
                unit="Watt"
                icon="💡"
                subLabel="Watt Cinsinden Güç"
              />
           </div>

           <div className="p-6 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center gap-2">
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic opacity-60">MOTOR ÇALIŞMA DURUMU</div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <div className="text-xl font-black text-primary italic tracking-tight uppercase">Nominal Rejimde</div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="flex flex-col gap-2 text-center mb-2">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] italic opacity-60">NOMİNAL MOTOR GÜCÜ (KW)</span>
              <input 
                type="number" 
                step="0.1" 
                value={powerKw} 
                onChange={e => setPowerKw(e.target.value)} 
                className="text-6xl font-black italic tracking-tighter text-primary bg-transparent text-center outline-none border-b-2 border-white/5 focus:border-amber-500/30 transition-all pb-2"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Select 
                label="GERİLİM (VOLT - 3-FAZ)"
                value={voltage}
                onChange={setVoltage}
                options={[
                  { value: "380", label: "380 V (Standart)" },
                  { value: "400", label: "400 V" },
                  { value: "415", label: "415 V" },
                  { value: "440", label: "440 V" },
                ]}
              />
              <V2Input 
                label="MİL DEVRİ (RPM)" 
                value={rpm} 
                onChange={setRpm} 
                unit="dev/dk" 
                placeholder="1450" 
                fieldClassName="!text-2xl font-black italic"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="GÜÇ KATSAYISI (COSφ)" 
                value={cosPhi} 
                onChange={setCosPhi} 
                type="number"
                placeholder="0.85" 
                fieldClassName="!text-2xl font-black italic"
                subLabel="Standart: 0.70 - 0.90"
              />
              <V2Input 
                label="MOTOR VERİMİ (η)" 
                value={efficiency} 
                onChange={setEfficiency} 
                type="number"
                placeholder="0.88" 
                fieldClassName="!text-2xl font-black italic"
                subLabel="IE1, IE2, IE3 Standartları"
              />
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Motoru Analiz Et" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Cable className="w-5 h-5 text-amber-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">3-PHASE LOAD</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <PlayCircle className="w-5 h-5 text-blue-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">RPM SYNC</div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <div className="text-[9px] font-black text-muted uppercase tracking-widest text-center">IEC UYUMLU</div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Mühendislik Notu:</b> Hesaplamalar 3 fazlı asenkron motorlar için IEC standartlarına göre yapılmaktadır. Tork hesaplamasında 9550 sabit katsayısı kullanılmış olup, akım hesaplamasında √3 çarpanı baz alınmıştır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
