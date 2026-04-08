"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Plus, Trash2, Info, GraduationCap, Award, BookOpen, Star } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

type UniCourse = { id: number; name: string; credit: string; grade: string };

export function UniversityGPACalculator() {
  const [courses, setCourses] = useState<UniCourse[]>([
    { id: 1, name: "Matematik 101", credit: "4", grade: "AA" },
    { id: 2, name: "Fizik 101", credit: "3", grade: "BA" },
  ]);
  const [result, setResult] = useState<{ gpa: number; totalCredit: number } | null>(null);

  const gradePoints: Record<string, number> = {
    "AA": 4.0, "BA": 3.5, "BB": 3.0, "CB": 2.5, "CC": 2.0, "DC": 1.5, "DD": 1.0, "FD": 0.5, "FF": 0.0
  };

  const calculate = () => {
    let totalScore = 0;
    let totalCredit = 0;

    courses.forEach(c => {
      const cr = parseFloat(c.credit);
      const gp = gradePoints[c.grade];

      if (!isNaN(cr) && gp !== undefined && cr > 0) {
        totalScore += (cr * gp);
        totalCredit += cr;
      }
    });

    if (totalCredit > 0) {
      const gpa = totalScore / totalCredit;
      setResult({ gpa, totalCredit });
      if (gpa >= 3.0) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "Matematik 101", credit: "4", grade: "AA" },
      { id: 2, name: "Fizik 101", credit: "3", grade: "BA" },
    ]);
    setResult(null);
  };

  const updateField = (id: number, field: "name" | "credit" | "grade", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addRow = () => setCourses([...courses, { id: Date.now(), name: "", credit: "", grade: "AA" }]);
  const removeRow = (id: number) => setCourses(courses.filter(c => c.id !== id));

  return (
    <V2CalculatorWrapper
      title="GANO / YANO HESAPLAMA"
      icon="🎓"
      infoText="Üniversite derslerinizin AKTS/kredi ağırlıklarına ve harf notlarına göre güncel Ağırlıklı GANO/YANO ortalamanızı hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.gpa >= 3.0 ? "emerald" : result.gpa >= 2.0 ? "blue" : "red"}
            label="GENEL ORTALAMA (GANO)"
            value={result.gpa.toFixed(2)}
            subLabel="/ 4.00 Üzerinden"
            icon="🏆"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">TOPLAM KREDİ</div>
                <div className="text-xl font-black italic text-primary">{result.totalCredit}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">DURUM</div>
                <div className="text-xl font-black italic text-emerald-500">
                  {result.gpa >= 3.5 ? "Y. ONUR" : result.gpa >= 3.0 ? "ONUR" : "BAŞARILI"}
                </div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Info className="w-5 h-5" />
             </div>
             <p className="text-[11px] text-muted italic leading-tight">
               4.00'lük sisteme göre hesaplanmıştır. Bazı üniversiteler farklı katsayılar (Örn: 100'lük dönüşüm) kullanabilir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">Ders ve Not Girişi</h4>
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
               <div className="md:col-span-4">
                 <V2Input 
                   label="" 
                   placeholder="Ders Adı (Örn: MAT101)" 
                   value={course.name} 
                   onChange={val => updateField(course.id, "name", val)} 
                   fieldClassName="!py-2.5 font-bold italic"
                   type="text"
                 />
               </div>
               <div className="md:col-span-3">
                 <V2Input 
                   label="" 
                   placeholder="Kredi/AKTS" 
                   value={course.credit} 
                   onChange={val => updateField(course.id, "credit", val)} 
                   fieldClassName="!py-2.5 text-center font-black !bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10 placeholder:text-emerald-500/30"
                   min="0"
                 />
               </div>
               <div className="md:col-span-4">
                 <V2Select 
                   label="" 
                   value={course.grade} 
                   onChange={val => updateField(course.id, "grade", val)} 
                   options={Object.keys(gradePoints).map(k => ({ value: k, label: `${k} (x${gradePoints[k]})` }))}
                   fieldClassName="!py-2.5 font-black !bg-blue-500/5 !text-blue-500 !border-blue-500/10"
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
          calculateLabel="📊 GANO Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
