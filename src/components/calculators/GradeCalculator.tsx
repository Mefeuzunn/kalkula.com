"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Plus, Trash2, Info, GraduationCap, Award, BookOpen } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

type Course = {
  id: number;
  name: string;
  grade: string;
  credit: string;
};

export function GradeCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Matematik", grade: "", credit: "" },
    { id: 2, name: "Fizik", grade: "", credit: "" },
    { id: 3, name: "Kimya", grade: "", credit: "" },
  ]);

  const [result, setResult] = useState<{ average: number; totalCredits: number; status: string; color: "emerald" | "purple" | "blue" | "red" } | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", grade: "", credit: "" }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const g = parseFloat(c.grade); 
      const cr = parseFloat(c.credit); 

      if (!isNaN(g) && !isNaN(cr) && cr > 0) {
        totalGradePoints += (g * cr);
        totalCredits += cr;
      }
    });

    if (totalCredits > 0) {
      const average = totalGradePoints / totalCredits;
      let status = "BAŞARILI";
      let color: "emerald" | "purple" | "blue" | "red" = "blue";

      if (average >= 85) { status = "YÜKSEK ONUR"; color = "emerald"; }
      else if (average >= 70) { status = "ONUR DERECESİ"; color = "purple"; }
      else if (average < 50) { status = "BAŞARISIZ"; color = "red"; }

      setResult({ average, totalCredits, status, color });
      
      if (average >= 70) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "Matematik", grade: "", credit: "" },
      { id: 2, name: "Fizik", grade: "", credit: "" },
      { id: 3, name: "Kimya", grade: "", credit: "" },
    ]);
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="NOT ORTALAMASI HESAPLA"
      icon="🎓"
      infoText="Derslerinizin notlarını ve kredi ağırlıklarını girerek dönem sonu ağırlıklı not ortalamanızı (GNO) anında hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="DÖNEM ORTALAMASI"
            value={result.average.toFixed(2)}
            subLabel={`DURUM: ${result.status}`}
            icon="🏆"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">TOPLAM KREDİ</div>
                <div className="text-xl font-black italic text-primary">{result.totalCredits}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">DERS SAYISI</div>
                <div className="text-xl font-black italic text-emerald-500">{courses.length}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center">
             <Info className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[11px] text-muted italic leading-relaxed">
               {result.average >= 85 ? "Mükemmel bir başarı! Teşekkür ve Takdir belgeleri için en güçlü adaysınız." : 
                result.average >= 70 ? "Gayet iyi! Başarılı bir dönem geçiriyorsunuz, onur derecesine çok yakınsınız." :
                result.average >= 50 ? "Standart başarı seviyesindesiniz. Notlarınızı biraz daha yükselterek fark yaratabilirsiniz." :
                "🚨 Dikkat! Ortalamanız barajın altında kalıyor. Gelecek dönem daha disiplinli bir çalışma gerekebilir."}
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">Ders ve Kredi Listesi</h4>
           <button 
             onClick={addCourse}
             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
           >
             <Plus className="w-3.5 h-3.5" /> Ders Ekle
           </button>
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-4 rounded-2xl bg-white/5 border border-white/5 animate-fade-in group">
               <div className="md:col-span-1 text-[10px] font-black text-muted/30 italic">#{idx + 1}</div>
               <div className="md:col-span-5">
                 <V2Input 
                   label="" 
                   placeholder="Ders Adı" 
                   value={course.name} 
                   onChange={val => updateCourse(course.id, "name", val)} 
                   fieldClassName="!py-2.5 font-bold italic"
                 />
               </div>
               <div className="md:col-span-3">
                 <V2Input 
                   label="" 
                   placeholder="Not (0-100)" 
                   value={course.grade} 
                   onChange={val => updateCourse(course.id, "grade", val)} 
                   fieldClassName="!py-2.5 text-center font-black !bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10 placeholder:text-emerald-500/30"
                   min="0"
                   max="100"
                 />
               </div>
               <div className="md:col-span-2">
                 <V2Input 
                   label="" 
                   placeholder="Kredi" 
                   value={course.credit} 
                   onChange={val => updateCourse(course.id, "credit", val)} 
                   fieldClassName="!py-2.5 text-center font-black !bg-blue-500/5 !text-blue-500 !border-blue-500/10 placeholder:text-blue-500/30"
                 />
               </div>
               <div className="md:col-span-1 flex justify-center">
                 <button 
                   onClick={() => removeCourse(course.id)}
                   className="p-2 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
            </div>
          ))}
        </div>
        
        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Ortalamayı Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
