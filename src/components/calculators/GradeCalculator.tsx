"use client";

import React, { useState } from "react";

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

  const [result, setResult] = useState<{ average: number; totalCredits: number } | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: `Ders ${courses.length + 1}`, grade: "", credit: "" }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const g = parseFloat(c.grade); // Ders notu (0-100)
      const cr = parseFloat(c.credit); // Kredi veya Saat

      if (!isNaN(g) && !isNaN(cr) && cr > 0) {
        totalGradePoints += (g * cr);
        totalCredits += cr;
      }
    });

    if (totalCredits > 0) {
      setResult({
        average: totalGradePoints / totalCredits,
        totalCredits: totalCredits
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
        Her dersin dönem sonu notunu (100 üzerinden) ve kredisini (veya haftalık ders saatini) girerek "Ağırlıklı Not Ortalaması" hesaplayın. Lise, Ortaokul ve Üniversiteler için geçerlidir.
      </p>

      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Ders Bilgileri</h4>
        
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr 2fr 40px", gap: "1rem", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <div>Ders Adı</div>
          <div>Ders Notu (0-100)</div>
          <div>Kredi / Saat</div>
          <div></div>
        </div>

        {courses.map((course) => (
          <div key={course.id} style={{ display: "grid", gridTemplateColumns: "3fr 2fr 2fr 40px", gap: "1rem", marginBottom: "0.75rem", alignItems: "center" }}>
            <input 
              type="text" 
              value={course.name} 
              onChange={e => updateCourse(course.id, "name", e.target.value)} 
              className="input-field" 
              placeholder="Ders Adı" 
            />
            <input 
              type="number" 
              value={course.grade} 
              onChange={e => updateCourse(course.id, "grade", e.target.value)} 
              className="input-field" 
              placeholder="Örn: 85" 
              min="0"
              max="100"
            />
            <input 
              type="number" 
              value={course.credit} 
              onChange={e => updateCourse(course.id, "credit", e.target.value)} 
              className="input-field" 
              placeholder="Örn: 3" 
            />
            <button 
              onClick={() => removeCourse(course.id)} 
              style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Sil"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ))}

        <button 
          onClick={addCourse} 
          style={{ background: "transparent", color: "var(--accent-primary)", border: "none", cursor: "pointer", fontWeight: "bold", padding: "0.5rem 0" }}
        >
          + Yeni Ders Ekle
        </button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Ortalamayı Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Ağırlıklı Not Ortalamanız</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>
            {result.average.toFixed(2)}
          </div>
          <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
            Toplam Kredi: <span style={{ fontWeight: "bold", color: "var(--foreground)" }}>{result.totalCredits}</span>
          </p>
          
          <div style={{ marginTop: "1.5rem" }}>
            {result.average >= 85 ? (
              <span style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>🎉 Takdir Belgesi veya Onur Derecesi Aldınız!</span>
            ) : result.average >= 70 ? (
              <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>👏 Teşekkür Belgesi Alabilirsiniz!</span>
            ) : result.average >= 50 ? (
              <span style={{ background: "rgba(234, 179, 8, 0.15)", color: "#eab308", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>👍 Sınıfı/Dönemi Başarıyla Geçtiniz</span>
            ) : (
              <span style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>⚠️ Ortalama Altında Kaldınız</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
