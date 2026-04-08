"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, UserCheck, BookOpen, Calculator, Star, Wallet, ReceiptText, School } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function MebEkDersCalculator() {
  const [daytimeHours, setDaytimeHours] = useState("15");
  const [nightHours, setNightHours] = useState("0");
  const [dykDayHours, setDykDayHours] = useState("0");
  const [dykNightHours, setDykNightHours] = useState("0");
  const [specialEducation, setSpecialEducation] = useState(false);
  const [educationLevel, setEducationLevel] = useState<"none" | "master" | "phd">("none");
  const [taxBracket, setTaxBracket] = useState<"15" | "20" | "27">("15");

  const [results, setResults] = useState<{
    grossTotal: number;
    netTotal: number;
    incomeTax: number;
    stampTax: number;
    details: { label: string; gross: number; net: number }[];
  } | null>(null);

  const RATES_2026 = {
    DAY: 185.45,
    NIGHT: 198.70,
    DYK_DAY: 370.90,
    DYK_NIGHT: 397.40,
    STAMP_TAX_RATE: 0.00759,
  };

  const calculate = () => {
    const d = parseFloat(daytimeHours) || 0;
    const n = parseFloat(nightHours) || 0;
    const dykD = parseFloat(dykDayHours) || 0;
    const dykN = parseFloat(dykNightHours) || 0;

    const multiplier = specialEducation ? 1.25 : 1;
    const eduBonus = educationLevel === "master" ? 0.07 : educationLevel === "phd" ? 0.20 : 0;
    const taxRate = parseFloat(taxBracket) / 100;

    const calcNet = (gross: number) => {
      const incomeTax = gross * taxRate;
      const stampTax = gross * RATES_2026.STAMP_TAX_RATE;
      return gross - incomeTax - stampTax;
    };

    const items = [
      { label: "Gündüz", gross: d * RATES_2026.DAY * multiplier * (1 + eduBonus) },
      { label: "Gece / Hafta Sonu", gross: n * RATES_2026.NIGHT * multiplier * (1 + eduBonus) },
      { label: "DYK Gündüz", gross: dykD * RATES_2026.DYK_DAY * (specialEducation ? 1.25 : 1) * (1 + eduBonus) },
      { label: "DYK Gece", gross: dykN * RATES_2026.DYK_NIGHT * (specialEducation ? 1.25 : 1) * (1 + eduBonus) },
    ];

    const grossTotal = items.reduce((acc, curr) => acc + curr.gross, 0);
    const incomeTaxTotal = grossTotal * taxRate;
    const stampTaxTotal = grossTotal * RATES_2026.STAMP_TAX_RATE;
    const netTotal = grossTotal - incomeTaxTotal - stampTaxTotal;

    setResults({
      grossTotal,
      netTotal,
      incomeTax: incomeTaxTotal,
      stampTax: stampTaxTotal,
      details: items.filter(i => i.gross > 0).map(i => ({ ...i, net: calcNet(i.gross) }))
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setDaytimeHours("15");
    setNightHours("0");
    setDykDayHours("0");
    setDykNightHours("0");
    setSpecialEducation(false);
    setEducationLevel("none");
    setTaxBracket("15");
    setResults(null);
  };

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="MEB EK DERS HESAPLA"
      icon="👨‍🏫"
      infoText="2026 Ocak memur maaş katsayıları baz alınarak öğretmenlerin aylık tahmini ek ders ücretini anında hesaplayın."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="TOPLAM NET (4 HAFTA)"
            value={fmt(results.netTotal * 4)}
            subLabel={`Brüt Toplam: ${fmt(results.grossTotal * 4)}`}
            icon="💰"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-center">
                <div className="text-[10px] font-black text-red-500/60 uppercase mb-1">GELİR VERGİSİ (%{taxBracket})</div>
                <div className="text-xl font-black italic text-red-500">-{fmt(results.incomeTax * 4)}</div>
             </div>
             <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-center">
                <div className="text-[10px] font-black text-red-500/60 uppercase mb-1">DAMGA VERGİSİ (0.00759)</div>
                <div className="text-xl font-black italic text-red-500">-{fmt(results.stampTax * 4)}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic flex items-center gap-2 mb-2">
                <ReceiptText className="w-3.5 h-3.5" /> Haftalık Detaylar
             </div>
             {results.details.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs font-bold text-muted italic">{item.label}</span>
                  <span className="text-xs font-black text-primary italic">{fmt(item.net)} <span className="text-[9px] text-muted/50">(Net)</span></span>
               </div>
             ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Hesaplamalar 4 haftalık (1 ay) üzerinden tahmin edilmektedir. Bordro işlemleri sırasında vergi matrahınıza göre küçük farklar oluşabilir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input label="GÜNDÜZ (HAFTALIK)" value={daytimeHours} onChange={setDaytimeHours} unit="DERS" placeholder="15" min="0" />
              <V2Input label="GECE / HAFTA SONU" value={nightHours} onChange={setNightHours} unit="DERS" placeholder="0" min="0" />
              <V2Input label="DYK GÜNDÜZ" value={dykDayHours} onChange={setDykDayHours} unit="DERS" placeholder="0" min="0" />
              <V2Input label="DYK GECE" value={dykNightHours} onChange={setDykNightHours} unit="DERS" placeholder="0" min="0" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Select 
             label="EĞİTİM SEVİYESİ" 
             value={educationLevel} 
             onChange={val => setEducationLevel(val as any)} 
             options={[
               { value: "none", label: "Lisans" },
               { value: "master", label: "Yüksek Lisans (+%7)" },
               { value: "phd", label: "Doktora (+%20)" }
             ]}
           />
           <V2Select 
             label="VERGİ DİLİMİ" 
             value={taxBracket} 
             onChange={val => setTaxBracket(val as any)} 
             options={[
               { value: "15", label: "%15 (Yıl Başlangıcı)" },
               { value: "20", label: "%20" },
               { value: "27", label: "%27" }
             ]}
           />
        </div>

        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => setSpecialEducation(!specialEducation)}>
           <input 
             type="checkbox" 
             checked={specialEducation} 
             onChange={() => {}} 
             className="w-5 h-5 rounded-md border-primary/20 bg-white/5 text-primary focus:ring-primary/20 mt-1"
           />
           <div>
              <div className="text-xs font-black text-primary uppercase italic mb-1">Özel Eğitim / Cezaevi (+%25)</div>
              <p className="text-[10px] text-muted italic leading-tight">Özel eğitim öğretmenleri veya cezaevinde görevli olanlar için arttırımlı ücret katsayısı uygulanır.</p>
           </div>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="👨‍🏫 Ek Ders Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
