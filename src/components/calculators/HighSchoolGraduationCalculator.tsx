"use client";

import React, { useState } from "react";

export function HighSchoolGraduationCalculator() {
  const [ybpList, setYbpList] = useState<string[]>(["", "", "", ""]);
  const [result, setResult] = useState<{ graduationScore: number; obp: number } | null>(null);

  const calculate = () => {
    const validScores = ybpList.map(s => parseFloat(s)).filter(s => !isNaN(s) && s > 0);
    if (validScores.length > 0) {
      const graduationScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
      // OBP = Mezuniyet Puani * 5
      const obp = graduationScore * 5;
      
      setResult({ graduationScore, obp });
    }
  };

  const updateVal = (idx: number, val: string) => {
    const n = [...ybpList];
    n[idx] = val;
    setYbpList(n);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Lise öğrenimi boyunca aldığınız tüm yıl sonu başarı puanlarının (YBP) size üniversite sınavında (YKS) getireceği OBP (Ortaöğretim Başarı Puanı) değerini hesaplayın.</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        {ybpList.map((ybp, idx) => (
          <div key={idx} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: 500, width: "120px", color: "var(--text-muted)" }}>{idx + 9}. Sınıf YBP:</span>
            <input 
              type="number" 
              value={ybp} 
              onChange={e => updateVal(idx, e.target.value)} 
              className="input-field" 
              placeholder="Örn: 85.50" 
            />
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Diploma ve OBP Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
          <div className="panel" style={{ padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Lise Mezuniyet Puanınız</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>
               {result.graduationScore.toFixed(2)}
            </div>
          </div>
          <div className="panel" style={{ padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>OBP (YKS Katkısı)</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
               {result.obp.toFixed(2)}
            </div>
            <p style={{ fontSize: "0.80rem", color: "var(--text-muted)", marginTop: "0.5rem"}}>* Bu değerin 0.12 ile çarpımı ham puanınıza eklenecektir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
