"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function MotorPowerCalculator() {
  const [voltage, setVoltage] = useState(380); // 3-Phase Standard
  const [rpm, setRpm] = useState(1450);
  const [powerKw, setPowerKw] = useState("5.5"); // Nominal Power
  const [cosPhi, setCosPhi] = useState(0.85);
  const [efficiency, setEfficiency] = useState(0.88);

  const [results, setResults] = useState<{
    torque: number;
    current: number;
    hp: number;
    watts: number;
  } | null>(null);

  const calculate = () => {
    const pKw = parseFloat(powerKw) || 0;
    const r = parseFloat(rpm.toString()) || 0;
    const v = parseFloat(voltage.toString()) || 380;
    const cp = parseFloat(cosPhi.toString()) || 0.85;
    const eff = parseFloat(efficiency.toString()) || 0.88;

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

    if (pKw > 0) {
       confetti({
         particleCount: 20,
         spread: 30,
         origin: { y: 0.7 },
         colors: ["#f59e0b", "#fcd34d", "#ffffff"]
       });
    }
  };

  useEffect(() => {
    calculate();
  }, [voltage, rpm, powerKw, cosPhi, efficiency]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kontrol Paneli */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-amber-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center mb-4">
                 <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] italic mb-1">Nominal Güç (kW)</span>
                 <input 
                    type="number" 
                    step="0.1" 
                    value={powerKw} 
                    onChange={e => setPowerKw(e.target.value)} 
                    className="text-5xl font-black italic tracking-tighter text-primary bg-transparent text-center outline-none border-b-4 border-amber-500/10 focus:border-amber-500/30 transition-all pb-2"
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Gerilim (Volt - 3Φ)</label>
                    <select value={voltage} onChange={e => setVoltage(parseInt(e.target.value))} className="input-field !py-4 font-black cursor-pointer bg-white">
                       <option value="380">380 V (Standart)</option>
                       <option value="400">400 V</option>
                       <option value="415">415 V</option>
                       <option value="440">440 V</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Milisel Hız (RPM)</label>
                    <input type="number" step="10" value={rpm} onChange={e => setRpm(parseInt(e.target.value))} className="input-field !py-4 font-black text-center"/>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Güç Katsayısı (Cosφ)</label>
                    <input type="number" step="0.01" value={cosPhi} onChange={e => setCosPhi(parseFloat(e.target.value))} className="input-field !py-4 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Verim (η)</label>
                    <input type="number" step="0.01" value={efficiency} onChange={e => setEfficiency(parseFloat(e.target.value))} className="input-field !py-4 font-black text-center"/>
                 </div>
              </div>

              <div className="mt-4 p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 flex items-start gap-4">
                 <span className="text-2xl">⚡</span>
                 <p className="text-[10px] text-amber-900/70 dark:text-amber-400 leading-relaxed font-bold italic">
                    IEC standartlarına göre hesaplanmıştır. Cosφ ve η değerleri motor etiketinden alınmalıdır.
                 </p>
              </div>
           </div>
        </div>

        {/* Dashboard Sonuç */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-surface border-4 border-amber-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-amber-600 tracking-[0.5em] uppercase rotate-12">Motor Dynamics v2.0</div>
                    
                    <div className="grid grid-cols-2 gap-10 w-full">
                       <div className="flex flex-col items-center justify-center p-8 bg-secondary/5 rounded-[2.5rem] border border-border">
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Mil Torku (Nm)</span>
                          <span className="text-5xl font-black italic tracking-tighter text-primary">
                             {results.torque.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
                          </span>
                       </div>

                       <div className="flex flex-col items-center justify-center p-8 bg-secondary/5 rounded-[2.5rem] border border-border">
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Nominal Akım (A)</span>
                          <span className="text-5xl font-black italic tracking-tighter text-primary text-blue-600">
                             {results.current.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                          </span>
                       </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6 w-full">
                       <div className="flex flex-col items-center p-6 bg-secondary/5 rounded-3xl border border-border text-center">
                          <span className="text-[9px] font-black text-muted uppercase italic mb-1">Güç (Buhar Beygiri - HP)</span>
                          <span className="text-2xl font-black text-primary">{results.hp.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} HP</span>
                       </div>
                       <div className="flex flex-col items-center p-6 bg-secondary/5 rounded-3xl border border-border text-center">
                          <span className="text-[9px] font-black text-muted uppercase italic mb-1">Elektriksel Yük (Watts)</span>
                          <span className="text-2xl font-black text-primary">{results.watts.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} W</span>
                       </div>
                    </div>

                    <div className="mt-8 w-full h-2 bg-secondary/15 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-full animate-pulse opacity-20"></div>
                    </div>
                    <span className="text-[9px] font-black text-muted uppercase mt-4 tracking-widest italic opacity-50">Industrial 3-Phase AC Motor Specification Hub</span>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">⚙️</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">MOTOR ETİKET VERİLERİNİ GİRİNİZ</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
