"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, GraduationCap, BookOpen, Calculator, Star, Award, Wallet, ReceiptText } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function AkademisyenEkDersCalculator() {
  const [title, setTitle] = useState<"prof" | "assoc" | "asst" | "lect">("prof");
  const [daytimeHours, setDaytimeHours] = useState("10");
  const [nightHours, setNightHours] = useState("0");
  const [taxBracket, setTaxBracket] = useState<"15" | "20" | "27">("15");

  const [results, setResults] = useState<{
    hourlyGrossDay: number;
    hourlyGrossNight: number;
    monthlyNet: number;
    totalGross: number;
    totalTax: number;
  } | null>(null);

  const KATSAYI_2026 = 1.487871;
  const POINTS = {
    prof: 300,
    assoc: 250,
    asst: 200,
    lect: 160,
  };
  const STAMP_TAX_RATE = 0.00759;

  const calculate = () => {
    const point = POINTS[title];
    const d = parseFloat(daytimeHours) || 0;
    const n = parseFloat(nightHours) || 0;
    const taxRate = parseFloat(taxBracket) / 100;

    const hourlyGrossDay = point * KATSAYI_2026;
    const hourlyGrossNight = hourlyGrossDay * 1.5;

    const weeklyGross = (d * hourlyGrossDay) + (n * hourlyGrossNight);
    const monthlyGross = weeklyGross * 4;

    const incomeTax = monthlyGross * taxRate;
    const stampTax = monthlyGross * STAMP_TAX_RATE;
    const monthlyNet = monthlyGross - incomeTax - stampTax;

    setResults({
      hourlyGrossDay,
      hourlyGrossNight,
      monthlyNet,
      totalGross: monthlyGross,
      totalTax: incomeTax + stampTax
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setTitle("prof");
    setDaytimeHours("10");
    setNightHours("0");
    setTaxBracket("15");
    setResults(null);
  };

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  const getTitleName = (t: string) => {
    switch(t) {
      case "prof": return "PROFESÖR";
      case "assoc": return "DOÇENT";
      case "asst": return "DR. ÖĞRETİM ÜYESİ";
      case "lect": return "ÖĞRETİM GÖREVLİSİ";
      default: return "";
    }
  };

  return (
    <V2CalculatorWrapper
      title="AKADEMİK EK DERS HESAPLA"
      icon="🎓"
      infoText="Üniversitelerde görevli akademik unvanlara göre 2026 memur katsayıları baz alınarak aylık ek ders ücretinizi hesaplayın."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="purple"
            label={`${getTitleName(title)} - TOPLAM NET`}
            value={fmt(results.monthlyNet)}
            subLabel={`Brüt Toplam: ${fmt(results.totalGross)}`}
            icon="💰"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">GÜNDÜZ SAATLİK (BRÜT)</div>
                <div className="text-xl font-black italic text-primary">{fmt(results.hourlyGrossDay)}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">GECE SAATLİK (BRÜT)</div>
                <div className="text-xl font-black italic text-emerald-500">{fmt(results.hourlyGrossNight)}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex justify-between items-center">
             <div>
                <div className="text-[10px] font-black text-red-500/60 uppercase italic">TOPLAM VERGİ KESİNTİSİ</div>
                <p className="text-[10px] text-muted italic leading-tight">Gelir Vergisi + Damga Vergisi</p>
             </div>
             <div className="text-xl font-black italic text-red-500">-{fmt(results.totalTax)}</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               2026 yılı akademik puan katsayıları üzerinden 4 haftalık (1 ay) tahmini hesaplamadır. Bordronuzdaki diğer kesintiler farklılık yaratabilir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <V2Select 
          label="AKADEMİK UNVAN" 
          value={title} 
          onChange={val => setTitle(val as any)} 
          options={[
            { value: "prof", label: "Profesör (300 Puan)" },
            { value: "assoc", label: "Doçent (250 Puan)" },
            { value: "asst", label: "Dr. Öğretim Üyesi (200 Puan)" },
            { value: "lect", label: "Öğretim Görevlisi (160 Puan)" }
          ]}
          fieldClassName="font-bold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="FİİLİ GÜNDÜZ SAATİ" 
             value={daytimeHours} 
             onChange={setDaytimeHours} 
             unit="SA" 
             placeholder="10" 
             min="0" 
           />
           <V2Input 
             label="GECE / HAFTA SONU SAATİ" 
             value={nightHours} 
             onChange={setNightHours} 
             unit="SA" 
             placeholder="0" 
             min="0" 
             fieldClassName="!bg-purple-500/5 !text-purple-500 !border-purple-500/10"
           />
        </div>

        <V2Select 
          label="SİZE UYGULANAN VERGİ DİLİMİ" 
          value={taxBracket} 
          onChange={val => setTaxBracket(val as any)} 
          options={[
            { value: "15", label: "%15 (Yıl Başlangıcı)" },
            { value: "20", label: "%20" },
            { value: "27", label: "%27" }
          ]}
        />

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🎓 Ek Ders Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
