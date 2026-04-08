"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, GraduationCap, AlertTriangle, CheckCircle, XCircle, Calculator, BookOpen } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function HighSchoolPassCalculator() {
  const [literatureGrade, setLiteratureGrade] = useState("48");
  const [generalGPA, setGeneralGPA] = useState("52.5");
  const [failedCoursesCount, setFailedCoursesCount] = useState("2");
  const [result, setResult] = useState<{ status: string; color: "emerald" | "amber" | "red"; message: string; subLabel: string; icon: any } | null>(null);

  const calculate = () => {
    const lg = parseFloat(literatureGrade);
    const gpa = parseFloat(generalGPA);
    const failedCount = parseInt(failedCoursesCount);

    if (!isNaN(lg) && !isNaN(gpa) && !isNaN(failedCount)) {
      if (gpa >= 50) {
        if (lg < 50) {
          setResult({ 
            status: "SORUMLU GEÇTİNİZ", 
            color: "amber", 
            icon: AlertTriangle,
            subLabel: "Edebiyat Barajına Takıldınız",
            message: "Genel ortalamanız 50 ve üzeri olduğu için sınıfı geçtiniz. Ancak baraj ders olan Edebiyat ortalamanız 50'nin altında olduğu için sorumlu geçiyorsunuz. (Sorumluluk sınavına girmeniz gerekecek)." 
          });
          confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
        } else {
          setResult({ 
            status: "DOĞRUDAN GEÇTİNİZ", 
            color: "emerald", 
            icon: CheckCircle,
            subLabel: "Tüm Şartları Sağladınız",
            message: "Hem genel ortalamanız 50 ve üzeri, hem de baraj ders (Edebiyat) ortalamanız 50 veya üzeri olduğu için doğrudan geçtiniz." 
          });
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
      } else {
        if (failedCount <= 3) {
          setResult({ 
            status: "SORUMLU GEÇTİNİZ", 
            color: "amber", 
            icon: AlertTriangle,
            subLabel: "Yetersiz Ortalama (Geçer)",
            message: "Genel ortalamanız 50'nin altında olmasına rağmen en fazla 3 zayıfınız olduğu için sınıfı bu derslerden sorumlu olarak geçtiniz." 
          });
          confetti({ particleCount: 40, spread: 30, origin: { y: 0.6 } });
        } else {
          setResult({ 
            status: "SINIF TEKRARI", 
            color: "red", 
            icon: XCircle,
            subLabel: "Kaldınız",
            message: "Genel ortalamanız 50'nin altında ve 3'ten fazla başarısız dersiniz olduğu için maalesef sınıf tekrarına kaldınız." 
          });
        }
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setLiteratureGrade("48");
    setGeneralGPA("52.5");
    setFailedCoursesCount("2");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="SINIF GEÇME DURUMU"
      icon="🎓"
      infoText="MEB Ortaöğretim yönetmeliğine göre baraj ders (Edebiyat) ve ortalama kurallarını filtreleyerek kesin sınıf geçme durumunuzu öğrenin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="MÜJDE / BİLGİ"
            value={result.status}
            subLabel={result.subLabel}
            icon="🏆"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className={`p-3 rounded-2xl bg-${result.color}-500/10 text-${result.color}-500`}>
                <result.icon className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[12px] text-primary font-bold italic leading-tight">
                  {result.message}
                </p>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[11px] text-muted italic leading-relaxed">
               2025-2026 MEB yönetmeliği baz alınmıştır. Türk Dili ve Edebiyatı her lise türünde zorunlu baraj derstir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="space-y-6">
           <V2Input 
             label="GENEL NOT ORTALAMASI" 
             value={generalGPA} 
             onChange={setGeneralGPA} 
             unit="P" 
             placeholder="50.0" 
             max="100" 
             fieldClassName="!py-4 text-center text-3xl font-black italic text-primary"
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="EDEBİYAT NOTU" 
                value={literatureGrade} 
                onChange={setLiteratureGrade} 
                unit="P" 
                placeholder="48" 
                max="100" 
                fieldClassName="!bg-amber-500/5 !text-amber-500 !border-amber-500/10"
              />
              <V2Input 
                label="ZAYIF DERS SAYISI" 
                value={failedCoursesCount} 
                onChange={setFailedCoursesCount} 
                unit="AD" 
                placeholder="2" 
                max="20" 
                fieldClassName="!bg-red-500/5 !text-red-500 !border-red-500/10"
              />
           </div>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🎓 Durumu Sorgula"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
