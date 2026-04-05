import React, { useState } from "react";
import confetti from "canvas-confetti";

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

  const [result, setResult] = useState<{ average: number; totalCredits: number; status: string; color: string } | null>(null);

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
      let status = "Başarılı";
      let color = "#3b82f6";

      if (average >= 85) { status = "YÜKSEK ONUR"; color = "#10b981"; }
      else if (average >= 70) { status = "ONUR DERECESİ"; color = "#8b5cf6"; }
      else if (average < 50) { status = "BAŞARISIZ"; color = "#ef4444"; }

      setResult({ average, totalCredits, status, color });
      
      if (average >= 70) {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 }, colors: [color, "#ffffff"] });
      }
    } else {
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="panel p-6 bg-secondary/5 border-border rounded-3xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
           <h4 className="text-xs font-black text-muted uppercase tracking-widest italic">Ders ve Not Listesi</h4>
           <button onClick={addCourse} className="text-xs font-bold text-accent-primary hover:opacity-80 transition-opacity uppercase">+ Yeni Ders</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 pb-3 border-b border-border/50 last:border-0 animate-fadeIn">
              <div className="md:col-span-6">
                <input 
                  type="text" 
                  value={course.name} 
                  onChange={e => updateCourse(course.id, "name", e.target.value)} 
                  className="input-field !text-sm !py-2.5 font-bold" 
                  placeholder="Ders Adı (Örn: Matematik)" 
                />
              </div>
              <div className="md:col-span-3">
                <input 
                  type="number" 
                  value={course.grade} 
                  onChange={e => updateCourse(course.id, "grade", e.target.value)} 
                  className="input-field !text-sm !py-2.5 !text-center font-bold !bg-accent-glow/5" 
                  placeholder="Not (0-100)" 
                />
              </div>
              <div className="md:col-span-2">
                <input 
                  type="number" 
                  value={course.credit} 
                  onChange={e => updateCourse(course.id, "credit", e.target.value)} 
                  className="input-field !text-sm !py-2.5 !text-center font-bold" 
                  placeholder="Kredi" 
                />
              </div>
              <button 
                onClick={() => removeCourse(course.id)} 
                className="md:col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                title="Dersi Sil"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-black shadow-2xl uppercase tracking-widest italic" onClick={calculate}>
        Genel Ortalamayı Hesapla
      </button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 shadow-[0_0_50px_rgba(59,130,246,0.1)]" style={{ borderColor: result.average >= 50 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }}>
              <div className="result-badge" style={{ backgroundColor: result.color + "11", color: result.color, borderColor: result.color + "33" }}>
                 Genel Başarı Özeti
              </div>
              
              <div className="text-7xl font-black italic tracking-tighter mb-1" style={{ color: result.color }}>
                {result.average.toFixed(2)}
              </div>
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-10">AĞIRLIKLI NOT ORTALAMASI</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-border">
                 <div className="text-center p-6 bg-secondary/10 rounded-3xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Toplam Kredi</div>
                    <div className="text-3xl font-black text-primary">{result.totalCredits}</div>
                 </div>
                 <div className="text-center p-6 bg-secondary/10 rounded-3xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Başarı Derecesi</div>
                    <div className="text-xl font-black mt-2" style={{ color: result.color }}>{result.status}</div>
                 </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl text-[10px] font-medium leading-relaxed italic text-center" style={{ backgroundColor: result.color + "08", color: result.color, border: `1px solid ${result.color}15` }}>
                 {result.average >= 85 ? "👑 Muazzam bir başarı! Bu ortalama ile en üst kademe akademik takdir alabilirsiniz." : 
                  result.average >= 70 ? "👏 Tebrikler! Başarılı bir dönem geçirdiniz ve onur derecesine yaklaştınız." :
                  result.average >= 50 ? "👍 Disiplinli çalışmaya devam ederek ortalamanızı daha da yükseltebilirsiniz." :
                  "⚠️ Dikkat! Ortalamanız barajın altında kalıyor. Gelecek dönem notlarınızı yükseltmelisiniz."}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
