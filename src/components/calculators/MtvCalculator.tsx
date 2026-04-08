"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Car, Calendar, Calculator, Star, TrendingUp, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function MtvCalculator() {
  const [engineVolume, setEngineVolume] = useState("1301-1600");
  const [age, setAge] = useState("1-3");
  const [registrationDate, setRegistrationDate] = useState("after_2018");
  const [value, setValue] = useState("medium");
  
  const [results, setResults] = useState<{
    mtv2025: number;
    mtv2026: number;
    firstInstallment: number;
    secondInstallment: number;
    increaseAmount: number;
  } | null>(null);

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
    const rate2026 = 1.1895;

    const mtv2025 = base2024 * rate2025;
    const mtv2026 = mtv2025 * rate2026;

    setResults({
      mtv2025: mtv2025,
      mtv2026: mtv2026,
      firstInstallment: mtv2026 / 2,
      secondInstallment: mtv2026 / 2,
      increaseAmount: mtv2026 - mtv2025
    });

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setEngineVolume("1301-1600");
    setAge("1-3");
    setRegistrationDate("after_2018");
    setValue("medium");
    setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="MTV HESAPLA"
      icon="🚗"
      infoText="Aracınızın tescil tarihi, motor hacmi ve yaşına göre 2026 yılı Motorlu Taşıtlar Vergisi tutarını ve taksit dönemlerini anında öğrenin."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            label="2026 TOPLAM YILLIK MTV"
            value={`${results.mtv2026.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`}
            subLabel="YDO Bazlı 2026 Tahmini"
            icon="📅"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">1. TAKSİT (OCAK)</div>
                <div className="text-xl font-black italic text-primary">{results.firstInstallment.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">2. TAKSİT (TEMMUZ)</div>
                <div className="text-xl font-black italic text-primary">{results.secondInstallment.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
             <div className="flex justify-between items-center text-[11px] font-black italic">
                <span className="text-muted uppercase tracking-widest">KARŞILAŞTIRMA</span>
                <span className="text-red-500 uppercase tracking-widest">Zam Oranı: %18.95</span>
             </div>
             <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs italic">
                   <span className="text-muted">2025 Yılı Toplam:</span>
                   <span className="text-primary font-bold">{results.mtv2025.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
                <div className="flex justify-between text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">Yıllık Artış Tutarı:</span>
                   <span className="text-red-500 font-bold">+{results.increaseAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama 2026 yılı için beklenen %18.95 (YDO) MTV artış oranı baz alınarak yapılmıştır. Resmi tutarlar Ocak ayında kesinleşir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Select 
             label="TESCİL TARİHİ" 
             value={registrationDate} 
             onChange={setRegistrationDate} 
             options={[
               { value: "after_2018", label: "01.01.2018 ve Sonrası" },
               { value: "before_2018", label: "01.01.2018 Öncesi" }
             ]}
           />
           <V2Select 
             label="MOTOR SİLİNDİR HACMİ" 
             value={engineVolume} 
             onChange={setEngineVolume} 
             options={[
               { value: "0-1300", label: "1300 cm³ ve altı" },
               { value: "1301-1600", label: "1301 - 1600 cm³" },
               { value: "1601-1800", label: "1601 - 1800 cm³" },
               { value: "1801-2000", label: "1801 - 2000 cm³" },
               { value: "2000+", label: "2001 cm³ ve üzeri" }
             ]}
           />
           <V2Select 
             label="TAŞIT YAŞI" 
             value={age} 
             onChange={setAge} 
             options={[
               { value: "1-3", label: "1 - 3 Yaş" },
               { value: "4-6", label: "4 - 6 Yaş" },
               { value: "7-11", label: "7 - 11 Yaş" },
               { value: "12-15", label: "12 - 15 Yaş" },
               { value: "16+", label: "16 ve üzeri" }
             ]}
           />
           <V2Select 
             label="TAŞIT DEĞERİ (MATRAH)" 
             value={value} 
             onChange={setValue} 
             options={[
               { value: "low", label: "Ekonomik (Alt Segment)" },
               { value: "medium", label: "Standart (Orta Segment)" },
               { value: "high", label: "Premium (Üst Segment)" }
             ]}
           />
        </div>

        <V2ActionRow 
          onCalculate={calculateResult} 
          onReset={reset} 
          calculateLabel="📊 MTV Sorgula"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
