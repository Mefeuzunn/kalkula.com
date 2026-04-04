"use client";

import React, { useState } from "react";

export function HighSchoolSubjectCalculator() {
  const [courseName, setCourseName] = useState("");
  const [hours, setHours] = useState("");
  const [grade, setGrade] = useState("");

  const [result, setResult] = useState<{ weightedScore: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(hours);
    const g = parseFloat(grade);

    if (h > 0 && g >= 0) {
      // MEB Lise Mevzuatina Gore Ders Puani = Ders Notu * Haftalik Ders Saati
      setResult({ weightedScore: h * g });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Lise müfredatında bir dersin haftalık ağırlığı ile o dersin ağırlıklı yıl sonu puanını (Karne Puanına Etkisi) bulun.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Dersin Adı</label>
        <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} className="input-field" placeholder="Örn: Matematik" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Haftalık Ders Saati</label>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} className="input-field" placeholder="Örn: 6" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>O Derse Ait Karne Notu</label>
          <input type="number" value={grade} onChange={e => setGrade(e.target.value)} className="input-field" placeholder="Örn: 75" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Ders Ağırlık Puanını Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Ağırlıklı Ders Puanı Etkisi</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
              {result.weightedScore.toFixed(2)} Puan
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Bu değer Genel Ağırlıklı Ortalamaya (Yıl Sonu Başarı Puanınıza) toplanarak eklenecektir.
           </p>
        </div>
      )}
    </div>
  );
}
