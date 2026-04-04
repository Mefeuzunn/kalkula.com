"use client";

import React, { useState } from "react";

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
      setResult({ gpa: totalScore / totalHours, totalHours });
    } else {
      setResult(null);
    }
  };

  const updateField = (id: number, field: "name" | "grade" | "hours", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addRow = () => {
    setCourses([...courses, { id: Date.now(), name: `Ders ${courses.length + 1}`, grade: "", hours: "" }]);
  };

  const removeRow = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Lisedeki tüm derslerinizin haftalık saatleriyle ortalamasını bularak dönem sonu karne notunuzu net olarak görüntüleyin.</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <div>Ders Adı</div>
          <div>Not (0-100)</div>
          <div>Ders Saati</div>
          <div></div>
        </div>

        {courses.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.75rem", alignItems: "center" }}>
             <input type="text" value={c.name} onChange={e => updateField(c.id, "name", e.target.value)} className="input-field" placeholder="Ders Adı" />
             <input type="number" value={c.grade} onChange={e => updateField(c.id, "grade", e.target.value)} className="input-field" placeholder="Not" />
             <input type="number" value={c.hours} onChange={e => updateField(c.id, "hours", e.target.value)} className="input-field" placeholder="Saat" />
             <button onClick={() => removeRow(c.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}

        <button onClick={addRow} style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginTop: "1rem" }}>+ Yeni Ders Ekle</button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Lise Ortalamasını Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Ağırlıklı Lise (Dönem) Ortalaması</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text-primary)" }}>
              {result.gpa.toFixed(4)}
           </div>
           <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
              Toplam Ders Saati: <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{result.totalHours}</span> Saattir.
           </p>
        </div>
      )}
    </div>
  );
}
