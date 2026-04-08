"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Award, BookMarked, Calculator, Star, Trash2, Plus, AlertCircle, CheckCircle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

type CourseRow = { id: number; name: string; grade: string; hours: string };

export function CertificateCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, name: "Matematik", grade: "", hours: "6" },
    { id: 2, name: "Edebiyat", grade: "", hours: "5" },
    { id: 3, name: "Fizik", grade: "", hours: "4" }
  ]);
  const [unexcusedAbsent, setUnexcusedAbsent] = useState("0");
  const [result, setResult] = useState<{ gpa: number; cert: string; message: string; color: "emerald" | "blue" | "red" | "amber"; icon: React.ReactNode } | null>(null);

  const calculate = () => {
    let totalScore = 0;
    let totalHours = 0;
    let hasFailedCourse = false;

    courses.forEach(c => {
      const g = parseFloat(c.grade);
      const h = parseFloat(c.hours);

      if (!isNaN(g) && !isNaN(h) && h > 0) {
        totalScore += g * h;
        totalHours += h;
        if (g < 50) hasFailedCourse = true;
      }
    });

    const absent = parseFloat(unexcusedAbsent) || 0;

    if (totalHours > 0) {
      const gpa = totalScore / totalHours;
      
      let cert = "Belge Alınamadı";
      let message = "Ortalamanız belge almak için gereken sınırın altındadır.";
      let color: "emerald" | "blue" | "red" | "amber" = "red";
      let icon = <AlertCircle className="w-6 h-6 text-red-500" />;

      if (hasFailedCourse) {
         message = `Ortalamanız ${gpa.toFixed(2)} ancak başarısız (50 altı) dersiniz olduğu için belge alamazsınız.`;
      } else if (absent > 5) {
         message = `Ortalamanız ${gpa.toFixed(2)} ancak özürsüz devamsızlığınız 5 günü aştığı için belge alamazsınız.`;
      } else {
         if (gpa >= 85) {
            cert = "Takdir Belgesi";
            message = "Tebrikler! Hem ortalamanız hem de devamsızlık durumunuz Takdir Belgesi için yeterlidir.";
            color = "emerald";
            icon = <Award className="w-6 h-6 text-emerald-500" />;
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
         } else if (gpa >= 70) {
            cert = "Teşekkür Belgesi";
            message = "Tebrikler! Belge alma koşullarını sağlıyorsunuz.";
            color = "blue";
            icon = <CheckCircle className="w-6 h-6 text-blue-500" />;
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
         }
      }

      setResult({ gpa, cert, message, color, icon });
    }
  };

  const updateField = (id: number, field: "name" | "grade" | "hours", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addRow = () => setCourses([...courses, { id: Date.now(), name: "", grade: "", hours: "" }]);
  const removeRow = (id: number) => setCourses(courses.filter(c => c.id !== id));
  const reset = () => {
    setCourses([
      { id: 1, name: "Matematik", grade: "", hours: "6" },
      { id: 2, name: "Edebiyat", grade: "", hours: "5" },
      { id: 3, name: "Fizik", grade: "", hours: "4" }
    ]);
    setUnexcusedAbsent("0");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="TAKDİR TEŞEKKÜR HESAPLA"
      icon="📜"
      infoText="MEB yönetmeliğine göre 50 altı dersiniz ve 5 günü aşan özürsüz devamsızlığınız yoksa belge durumunuzu analiz edin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="KARNE SONUCU"
            value={result.cert.toUpperCase()}
            subLabel={`Ağırlıklı Ortalama: ${result.gpa.toFixed(2)}`}
            icon={result.color === 'emerald' ? '🏆' : '🎖️'}
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex items-start gap-3">
                <div className="mt-1">{result.icon}</div>
                <div>
                   <div className={`text-xs font-black uppercase italic mb-1 text-${result.color}-500`}>Ayrıntılı Rapor</div>
                   <p className="text-[11px] text-muted italic leading-relaxed">{result.message}</p>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Belge alabilmek için hiçbir dersin <span className="text-white font-bold">50</span> puanın altında olmaması gerekmektedir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="max-w-xs mx-auto">
           <V2Input 
             label="ÖZÜRSÜZ DEVAMSIZLIK (GÜN)" 
             value={unexcusedAbsent} 
             onChange={setUnexcusedAbsent} 
             unit="GÜN" 
             placeholder="0" 
             fieldClassName="!bg-red-500/5 !text-red-500 !border-red-500/10 !text-center !text-3xl font-black italic"
           />
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="grid grid-cols-[2fr_1fr_1fr_40px] gap-4 mb-2 text-[10px] font-black text-muted uppercase tracking-widest px-2">
              <div>Ders Adı</div>
              <div className="text-center">Not (0-100)</div>
              <div className="text-center">Saat</div>
              <div></div>
           </div>

           <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {courses.map(c => (
                <div key={c.id} className="grid grid-cols-[2fr_1fr_1fr_40px] gap-4 items-center animate-in slide-in-from-left duration-200">
                   <V2Input label="" value={c.name} onChange={v => updateField(c.id, "name", v)} placeholder="Ders..." fieldClassName="!py-3" />
                   <V2Input label="" value={c.grade} onChange={v => updateField(c.id, "grade", v)} placeholder="Not" fieldClassName="!py-3 !text-center" />
                   <V2Input label="" value={c.hours} onChange={v => updateField(c.id, "hours", v)} placeholder="Saat" fieldClassName="!py-3 !text-center" />
                   <button 
                     onClick={() => removeRow(c.id)} 
                     className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors flex items-center justify-center border border-red-500/10"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              ))}
           </div>

           <button 
             onClick={addRow} 
             className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 text-muted hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 text-xs font-black uppercase italic"
           >
             <Plus className="w-4 h-4" /> Yeni Ders Ekle
           </button>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🏆 Belge Sorgula"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
