"use client";

import React, { useState } from "react";

export function HighSchoolYBPCalculator() {
  const [grade9, setGrade9] = useState("");
  const [grade10, setGrade10] = useState("");
  const [grade11, setGrade11] = useState("");
  const [grade12, setGrade12] = useState("");
  const [result, setResult] = useState<{ ybp: number } | null>(null);

  const calculate = () => {
    const arr = [grade9, grade10, grade11, grade12]
      .map(x => parseFloat(x))
      .filter(x => !isNaN(x) && x > 0);
    
    if (arr.length > 0) {
      // YBP (Yil Sonu Basari Puanlarinin Aritmetik Ortalamasi mezuniyet puaanini olusturur)
      const sum = arr.reduce((a, b) => a + b, 0);
      setResult({ ybp: sum / arr.length });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Lise öğreniminiz boyunca aldığınız yıl sonu başarı puanlarının (YBP) genel lise diploma notunuzu nasıl şekillendirdiğini bulun.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>9. Sınıf Yıl Sonu Puanı</label>
          <input type="number" value={grade9} onChange={e => setGrade9(e.target.value)} className="input-field" placeholder="Örn: 82.5" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>10. Sınıf Yıl Sonu Puanı</label>
          <input type="number" value={grade10} onChange={e => setGrade10(e.target.value)} className="input-field" placeholder="Örn: 80.2" />
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>11. Sınıf Yıl Sonu Puanı</label>
          <input type="number" value={grade11} onChange={e => setGrade11(e.target.value)} className="input-field" placeholder="Örn: 88.0" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>12. Sınıf Yıl Sonu Puanı</label>
          <input type="number" value={grade12} onChange={e => setGrade12(e.target.value)} className="input-field" placeholder="Örn: 90.0" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Puanları Ortalama Getir</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Lise Genel YBP (Diploma Notu)</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text-primary)" }}>
              {result.ybp.toFixed(2)}
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Bu puan üniversite sınavında (YKS), yerleştirme puanınıza eklenecek olan Ortaöğretim Başarı Puanının (OBP) temelini oluşturur.
           </p>
        </div>
      )}
    </div>
  );
}
