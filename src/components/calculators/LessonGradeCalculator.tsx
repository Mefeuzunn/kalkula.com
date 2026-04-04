"use client";

import React, { useState } from "react";

export function LessonGradeCalculator() {
  const [grades, setGrades] = useState<string[]>(["", ""]);
  const [result, setResult] = useState<{ average: number } | null>(null);

  const calculate = () => {
    const validGrades = grades.map(g => parseFloat(g)).filter(g => !isNaN(g));
    if (validGrades.length > 0) {
      const avg = validGrades.reduce((a, b) => a + b, 0) / validGrades.length;
      setResult({ average: avg });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Herhangi bir dersin çeşitli notlarını girerek salt matematiksel ortalamasını anında hesaplayın.</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        {grades.map((g, idx) => (
          <div key={idx} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: 500, width: "60px", color: "var(--text-muted)" }}>Not {idx + 1}:</span>
            <input 
              type="number" 
              value={g} 
              onChange={e => {
                const newG = [...grades];
                newG[idx] = e.target.value;
                setGrades(newG);
              }} 
              className="input-field" 
              placeholder="Örn: 80" 
            />
          </div>
        ))}
        <button onClick={() => setGrades([...grades, ""])} style={{ background: "transparent", color: "var(--accent-primary)", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          + Yeni Not Alanı
        </button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Ders Ortalamasını Bul</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Aritmetik Ortalama</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text-primary)" }}>
              {result.average.toFixed(2)}
           </div>
        </div>
      )}
    </div>
  );
}
