"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Plus, Trash2, Info, BookOpen, Clock, Calculator, Star } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

type CourseRow = { id: number; name: string; grade: string; hours: string };

export function HighSchoolGPA() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, name: "Türk Dili ve Edebiyatı", grade: "", hours: "5" },
    { id: 2, name: "Matematik", grade: "", hours: "6" },
  ]);
  const [result, setResult] = useState<{ gpa: number; totalHours: number } | null>(null);

  const calculate = () => {
    let totalScore = 0;
    let totalHours = 0;

    courses.forEach(c => {
      const g = parseFloat(c.grade);
      const h = parseFloat(c.hours);

      if (!isNaN(g) && !isNaN(h) && h > 0) {
        totalScore += g * h;
        totalHours += h;
      }
    });

    if (totalHours > 0) {
      const gpa = totalScore / totalHours;
      setResult({ gpa, totalHours });
      if (gpa >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "Türk Dili ve Edebiyatı", grade: "", hours: "5" },
      { id: 2, name: "Matematik", grade: "", hours: "6" },
    ]);
    setResult(null);
  };

  const updateField = (id: number, field: "name" | "grade" | "hours", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addRow = () => {
    setCourses([...courses, { id: Date.now(), name: "", grade: "", hours: "" }]);
  };

  const removeRow = (id: number) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <V2CalculatorWrapper
      title="LİSE KARNE NOTU HESAPLA"
      icon="🏫"
      infoText="Lisedeki tüm derslerinizin haftalık saatleriyle ortalamasını bularak dönem sonu ağırlıklı karne notunuzu net olarak görüntüleyin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.gpa >= 85 ? "emerald" : result.gpa >= 70 ? "purple" : result.gpa >= 50 ? "blue" : "red"}
            label="DÖNEM ORTALAMASI"
            value={result.gpa.toFixed(4)}
            subLabel={result.gpa >= 85 ? "TAKDIR BELGESI ALABILIR" : result.gpa >= 70 ? "TESEKKUR BELGESI ALABILIR" : "BASARILI"}
            icon="📊"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">TOPLAM SAAT</div>
                <div className="text-xl font-black italic text-primary">{result.totalHours}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">DERS SAYISI</div>
                <div className="text-xl font-black italic text-emerald-500">{courses.length}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Star className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">BAŞARI DURUMU</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  {result.gpa >= 85 ? "Mükemmel! Bu ortalama ile Takdir belgesi almaya hak kazanırsınız (Zayıf dersiniz yoksa)." : 
                   result.gpa >= 70 ? "Tebrikler! Teşekkür belgesi sınırları içerisindesiniz." :
                   result.gpa >= 50 ? "Geçer not. Belge almak için ortalamanızı 70'in üzerine çıkarmalısınız." :
                   "Maalesef ortalamanız barajın altında kalıyor."}
                </p>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Ders ve Kredi Listesi
           </h4>
           <button 
             onClick={addRow}
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
                   placeholder="Ders Adı (Örn: Edebiyat)" 
                   value={course.name} 
                   onChange={val => updateField(course.id, "name", val)} 
                   fieldClassName="!py-2.5 font-bold italic"
                   type="text"
                 />
               </div>
               <div className="md:col-span-3">
                 <V2Input 
                   label="" 
                   placeholder="Not (0-100)" 
                   value={course.grade} 
                   onChange={val => updateField(course.id, "grade", val)} 
                   fieldClassName="!py-2.5 text-center font-black !bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10 placeholder:text-emerald-500/30"
                   min="0"
                   max="100"
                 />
               </div>
               <div className="md:col-span-2">
                 <V2Input 
                   label="" 
                   placeholder="Saat" 
                   value={course.hours} 
                   onChange={val => updateField(course.id, "hours", val)} 
                   fieldClassName="!py-2.5 text-center font-black !bg-blue-500/5 !text-blue-500 !border-blue-500/10 placeholder:text-blue-500/30"
                   min="1"
                 />
               </div>
               <div className="md:col-span-1 flex justify-center">
                 <button 
                   onClick={() => removeRow(course.id)}
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
