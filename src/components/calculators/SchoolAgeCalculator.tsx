"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Baby, School, Calculator, Star, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function SchoolAgeCalculator() {
  const [birthYear, setBirthYear] = useState("2018");
  const [birthMonth, setBirthMonth] = useState("1");
  const [result, setResult] = useState<{ months: number; message: string; color: "emerald" | "amber" | "blue" | "purple" | "red" } | null>(null);

  const monthsList = [
    { value: "1", label: "Ocak" }, { value: "2", label: "Şubat" }, { value: "3", label: "Mart" },
    { value: "4", label: "Nisan" }, { value: "5", label: "Mayıs" }, { value: "6", label: "Haziran" },
    { value: "7", label: "Temmuz" }, { value: "8", label: "Ağustos" }, { value: "9", label: "Eylül" },
    { value: "10", label: "Ekim" }, { value: "11", label: "Kasım" }, { value: "12", label: "Aralık" }
  ];

  const calculate = () => {
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);

    if (y > 2000 && m >= 1 && m <= 12) {
      const currentYear = new Date().getFullYear();
      const refYear = currentYear;
      const refMonth = 9; // Eylül referans

      let totalMonths = ((refYear - y) * 12) + (refMonth - m);
      if (totalMonths < 0) totalMonths = 0;

      let msg = "";
      let color: "emerald" | "amber" | "blue" | "purple" | "red" = "blue";

      if (totalMonths < 69) {
          msg = "Çocuğunuz ilkokul birinci sınıfa başlamak için yeterli ayda değil. Anaokulu kayıtları önerilir.";
          color = "amber";
      } else if (totalMonths >= 69 && totalMonths <= 71) {
          msg = "Çocuğunuz ilkokul 1. sınıfa başlayabilir ancak veli dilekçesi ile anasınıfına da yönlendirilebilir.";
          color = "blue";
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else if (totalMonths >= 72) {
          msg = "Çocuğunuzun ilkokul 1. sınıfa zorunlu kayıt yaşı gelmiştir. İlkokula başlaması uygundur.";
          color = "emerald";
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      setResult({ months: totalMonths, message: msg, color });
    }
  };

  const reset = () => {
    setBirthYear("2018");
    setBirthMonth("1");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="OKUL YAŞI HESAPLA"
      icon="👶"
      infoText="Milli Eğitim Bakanlığı (MEB) mevzuatına göre çocuğunuzun Eylül ayı itibariyle kaç aylık olduğunu ve kayıt durumunu öğrenin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="TOPLAM AY (EYLÜL İTİBARİYLE)"
            value={`${result.months} AYLIK`}
            subLabel="MEB Kayıt Hesaplaması"
            icon="📅"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
             <div className="flex items-start gap-4">
                {result.color === 'emerald' ? <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /> : <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />}
                <p className="text-sm font-bold italic leading-relaxed text-primary">
                  {result.message}
                </p>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama her yılın Eylül ayı başı referans alınarak yapılmaktadır. Kayıt dönemlerinde MEB tarafından yapılan güncellemeleri takip ediniz.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="DOĞUM YILI" 
             value={birthYear} 
             onChange={setBirthYear} 
             unit="YIL" 
             placeholder="2018" 
             min="2000" 
             max="2026"
           />
           <V2Select 
             label="DOĞUM AYI" 
             value={birthMonth} 
             onChange={setBirthMonth} 
             options={monthsList}
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🔍 Kayıt Durumu Sorgula"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
