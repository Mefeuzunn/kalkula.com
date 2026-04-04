"use client";

import React, { useState } from "react";

type UniCourse = { id: number; name: string; credit: string; grade: string };

export function UniversityGPACalculator() {
  const [courses, setCourses] = useState<UniCourse[]>([
    { id: 1, name: "Matematik 101", credit: "4", grade: "AA" },
    { id: 2, name: "Fizik 101", credit: "3", grade: "BA" },
  ]);
  const [result, setResult] = useState<{ gpa: number; totalCredit: number } | null>(null);

  // Standart YÖK Not Sistemi Katsayilari (Bazi okullarda degisebilir ancak geneli 4'luk sistemdir)
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
      setResult({ gpa: totalScore / totalCredit, totalCredit });
    } else {
      setResult(null);
    }
  };

  const updateField = (id: number, field: "name" | "credit" | "grade", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addRow = () => setCourses([...courses, { id: Date.now(), name: "", credit: "", grade: "AA" }]);
  const removeRow = (id: number) => setCourses(courses.filter(c => c.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Üniversite veya yüksekokul derslerinizin AKTS/kredi ağırlıklarına ve harf notlarına göre güncel Ağırlıklı GANO/YANO ortalamanızı hesaplayın.</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <div>Ders Adı</div>
          <div>KREDİ / AKTS</div>
          <div>Harf Notu</div>
          <div></div>
        </div>

        {courses.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.75rem", alignItems: "center" }}>
             <input type="text" value={c.name} onChange={e => updateField(c.id, "name", e.target.value)} className="input-field" placeholder="Ders Adı" />
             <input type="number" value={c.credit} onChange={e => updateField(c.id, "credit", e.target.value)} className="input-field" placeholder="Örn: 4" />
             <select value={c.grade} onChange={e => updateField(c.id, "grade", e.target.value)} className="input-field">
                {Object.keys(gradePoints).map(k => <option key={k} value={k}>{k}</option>)}
             </select>
             <button onClick={() => removeRow(c.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}

        <button onClick={addRow} style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginTop: "1rem" }}>+ Yeni Ders Ekle</button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>GPA Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>GNO (Genel / Yarıyıl Not Ortalaması)</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
              {result.gpa.toFixed(2)} <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/ 4.00</span>
           </div>
           <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
              Dönemdeki Toplam Krediniz: <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{result.totalCredit}</span>
           </p>
        </div>
      )}
    </div>
  );
}
