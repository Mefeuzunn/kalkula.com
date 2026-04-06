"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function MtvCalculator() {
  const [engineVolume, setEngineVolume] = useState("1301-1600");
  const [age, setAge] = useState("1-3");
  const [registrationDate, setRegistrationDate] = useState("after_2018");
  const [value, setValue] = useState("medium"); // Range of vehicle value (TR specific)
  
  const [results, setResults] = useState<{
    mtv2025: number;
    mtv2026: number;
    firstInstallment: number;
    secondInstallment: number;
    increaseAmount: number;
  } | null>(null);

  // Simplified MTV Data Logic (2026)
  const calculateResult = () => {
    let base2024 = 0;
    
    if (engineVolume === "0-1300") {
      if (age === "1-3") base2024 = 3359;
      else if (age === "4-6") base2024 = 2343;
      else if (age === "7-11") base2024 = 1308;
      else base2024 = 495;
    } else if (engineVolume === "1301-1600") {
      if (age === "1-3") base2024 = 5851;
      else if (age === "4-6") base2024 = 4387;
      else if (age === "7-11") base2024 = 2544;
      else base2024 = 981;
    } else if (engineVolume === "1601-1800") {
      if (age === "1-3") base2024 = 10345;
      else if (age === "4-6") base2024 = 8088;
      else if (age === "7-11") base2024 = 4758;
      else base2024 = 1941;
    } else {
      if (age === "1-3") base2024 = 15762;
      else base2024 = 10000;
    }

    if (value === "high") base2024 *= 1.1;
    if (value === "low") base2024 *= 0.9;

    const rate2025 = 1.4393; 
    const rate2026 = 1.1895; // Official 2026 increase

    const mtv2025 = base2024 * rate2025;
    const mtv2026 = mtv2025 * rate2026;

    setResults({
      mtv2025: mtv2025,
      mtv2026: mtv2026,
      firstInstallment: mtv2026 / 2,
      secondInstallment: mtv2026 / 2,
      increaseAmount: mtv2026 - mtv2025
    });

    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 }, colors: ["#3b82f6", "#10b981"] });
  };

  useEffect(() => {
    calculateResult();
  }, [engineVolume, age, registrationDate, value]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Tescil Tarihi</label>
                 <select value={registrationDate} onChange={e => setRegistrationDate(e.target.value)} className="input-field font-bold">
                    <option value="after_2018">01.01.2018 ve Sonrası</option>
                    <option value="before_2018">01.01.2018 Öncesi</option>
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Motor Silindir Hacmi</label>
                 <select value={engineVolume} onChange={e => setEngineVolume(e.target.value)} className="input-field font-black !text-lg">
                    <option value="0-1300">1300 cm³ ve altı</option>
                    <option value="1301-1600">1301 - 1600 cm³</option>
                    <option value="1601-1800">1601 - 1800 cm³</option>
                    <option value="1801-2000">1801 - 2000 cm³</option>
                    <option value="2000+">2001 cm³ ve üzeri</option>
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Taşıt Yaşı</label>
                 <select value={age} onChange={e => setAge(e.target.value)} className="input-field font-bold">
                    <option value="1-3">1 - 3 Yaş</option>
                    <option value="4-6">4 - 6 Yaş</option>
                    <option value="7-11">7 - 11 Yaş</option>
                    <option value="12-15">12 - 15 Yaş</option>
                    <option value="16+">16 ve üzeri</option>
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Taşıt Değeri (Matrah)</label>
                 <select value={value} onChange={e => setValue(e.target.value)} className="input-field font-bold">
                    <option value="low">Ekonomik (Alt Segment)</option>
                    <option value="medium">Standart (Orta Segment)</option>
                    <option value="high">Premium (Üst Segment)</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Comparison Result Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-white dark:bg-zinc-900 border-4 border-blue-500/10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.3em] uppercase rotate-12">Auto Tax Engine v3.0</div>
                    
                    <div className="flex flex-col items-center text-center mb-10">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 bg-blue-500/10 px-4 py-1 rounded-full border border-blue-500/20 italic">2026 Toplam Yıllık MTV</span>
                       <div className="text-6xl font-black italic tracking-tighter text-primary">
                          {results.mtv2026.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span className="text-2xl not-italic ml-1">₺</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="p-6 bg-secondary/5 rounded-3xl border border-border flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2 text-center leading-tight">1. Taksit<br/>(Ocak)</span>
                          <span className="text-xl font-black text-blue-600">{results.firstInstallment.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                       </div>
                       <div className="p-6 bg-secondary/5 rounded-3xl border border-border flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2 text-center leading-tight">2. Taksit<br/>(Temmuz)</span>
                          <span className="text-xl font-black text-blue-600">{results.secondInstallment.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                       </div>
                    </div>

                    <div className="mt-auto p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black text-primary uppercase italic">Karşılaştırmalı Analiz</span>
                          <span className="text-[10px] font-black text-red-500 uppercase italic">2026 Zam Oranı: %18.95</span>
                       </div>
                       <div className="flex flex-col gap-3">
                          <div className="flex justify-between text-[11px] font-medium italic">
                             <span className="text-muted">2025 Yılı Toplam:</span>
                             <span className="text-primary font-black">{results.mtv2025.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium italic">
                             <span className="text-muted">Yıllık Artış Tutarı:</span>
                             <span className="text-red-500 font-black">+{results.increaseAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                          </div>
                       </div>
                    </div>

                    <p className="mt-6 text-[8px] text-muted/50 font-bold uppercase text-center tracking-[0.2em] leading-relaxed">
                       * Bu hesaplama 2026 yılı için Cumhurbaşkanı kararıyla belirlenen %18.95 MTV artış oranı baz alınarak yapılmıştır. Resmi rakamlar Ocak ayı itibarıyla yürürlüktedir.
                    </p>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex items-center justify-center bg-secondary/5 rounded-[3rem] grayscale opacity-40">
                 <span className="text-xl font-black italic text-muted">Verileri Doldurun 🚗</span>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
