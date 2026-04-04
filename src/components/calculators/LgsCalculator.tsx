"use client";

import React, { useState } from "react";

export function LgsCalculator() {
  const [scores, setScores] = useState({
    turkce: { c: "", w: "" },
    mat: { c: "", w: "" },
    fen: { c: "", w: "" },
    inkilap: { c: "", w: "" },
    din: { c: "", w: "" },
    dil: { c: "", w: "" },
  });
  const [result, setResult] = useState<{ point: number; totalNet: number } | null>(null);

  const calculate = () => {
    // 3 yanlış 1 doğruyu götürür.
    const calcNet = (cStr: string, wStr: string, maxC: number) => {
      const c = parseFloat(cStr) || 0;
      const w = parseFloat(wStr) || 0;
      return Math.max(0, c - (w / 3));
    };

    const turkceNet = calcNet(scores.turkce.c, scores.turkce.w, 20);
    const matNet = calcNet(scores.mat.c, scores.mat.w, 20);
    const fenNet = calcNet(scores.fen.c, scores.fen.w, 20);
    const inkNet = calcNet(scores.inkilap.c, scores.inkilap.w, 10);
    const dinNet = calcNet(scores.din.c, scores.din.w, 10);
    const dilNet = calcNet(scores.dil.c, scores.dil.w, 10);

    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;

    // Tahmini katsayılar (Yıla göre değişir, ortalama alınmıştır)
    const point = 194.7 + (turkceNet * 4.2) + (matNet * 5.5) + (fenNet * 4.0) + (inkNet * 1.5) + (dinNet * 1.5) + (dilNet * 1.5);

    setResult({ point: Math.min(500, Math.max(0, point)), totalNet });
  };

  const updateScore = (subject: keyof typeof scores, field: "c" | "w", val: string) => {
    setScores(prev => ({ ...prev, [subject]: { ...prev[subject], [field]: val } }));
  };

  const InputRow = ({ label, maxQ, name }: { label: string, maxQ: number, name: keyof typeof scores }) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)", marginBottom: "0.5rem" }}>
      <div style={{ flex: 1, fontWeight: 500 }}>{label} <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>({maxQ}S)</span></div>
      <input type="number" value={scores[name].c} onChange={e => updateScore(name, "c", e.target.value)} className="input-field" placeholder="Doğru" style={{ width: "80px", padding: "0.5rem" }} />
      <input type="number" value={scores[name].w} onChange={e => updateScore(name, "w", e.target.value)} className="input-field" placeholder="Yanlış" style={{ width: "80px", padding: "0.5rem" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>LGS netlerinizi hesaplamak için doğru ve yanlış sayılarınızı giriniz (3 yanlış 1 doğruyu götürür).</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <InputRow label="Türkçe" maxQ={20} name="turkce" />
        <InputRow label="Matematik" maxQ={20} name="mat" />
        <InputRow label="Fen Bilimleri" maxQ={20} name="fen" />
        <InputRow label="T.C. İnkılap Tarihi" maxQ={10} name="inkilap" />
        <InputRow label="Din Kültürü" maxQ={10} name="din" />
        <InputRow label="Yabancı Dil" maxQ={10} name="dil" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>LGS Puanını Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Tahmini LGS Puanınız (500 Üzerinden)</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>{result.point.toFixed(2)}</div>
          <p style={{ marginTop: "0.5rem" }}>Toplam Net: <span style={{ fontWeight: "bold" }}>{result.totalNet.toFixed(2)}</span></p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>* Formül önceki yılların tahmini standart sapmalarına göre hesaplanmıştır.</p>
        </div>
      )}
    </div>
  );
}
