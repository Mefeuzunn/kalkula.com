"use client";

import React, { useState, useCallback } from "react";

type LgsSubjectKey = "turkce" | "mat" | "fen" | "inkilap" | "din" | "dil";
type LgsScores = Record<LgsSubjectKey, { c: string; w: string }>;

// InputRow DIŞARIDA tanımlı — içeride olsaydı her render'da yeniden oluşturulur,
// React bileşeni farklı sanıp input'u unmount/remount eder ve focus kaybolurdu.
interface LgsInputRowProps {
  label: string;
  maxQ: number;
  name: LgsSubjectKey;
  scores: LgsScores;
  onUpdate: (subject: LgsSubjectKey, field: "c" | "w", val: string) => void;
}

function LgsInputRow({ label, maxQ, name, scores, onUpdate }: LgsInputRowProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)", marginBottom: "0.5rem" }}>
      <div style={{ flex: 1, fontWeight: 500 }}>{label} <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>({maxQ}S)</span></div>
      <input type="number" min="0" max={maxQ} value={scores[name].c} onChange={e => onUpdate(name, "c", e.target.value)} className="input-field" placeholder="Doğru" style={{ width: "80px", padding: "0.5rem" }} />
      <input type="number" min="0" max={maxQ} value={scores[name].w} onChange={e => onUpdate(name, "w", e.target.value)} className="input-field" placeholder="Yanlış" style={{ width: "80px", padding: "0.5rem" }} />
    </div>
  );
}

export function LgsCalculator() {
  const [scores, setScores] = useState<LgsScores>({
    turkce: { c: "", w: "" },
    mat: { c: "", w: "" },
    fen: { c: "", w: "" },
    inkilap: { c: "", w: "" },
    din: { c: "", w: "" },
    dil: { c: "", w: "" },
  });
  const [result, setResult] = useState<{ point: number; totalNet: number } | null>(null);

  const calculate = () => {
    const calcNet = (cStr: string, wStr: string) => {
      const c = parseFloat(cStr) || 0;
      const w = parseFloat(wStr) || 0;
      return Math.max(0, c - (w / 3));
    };

    const turkceNet = calcNet(scores.turkce.c, scores.turkce.w);
    const matNet = calcNet(scores.mat.c, scores.mat.w);
    const fenNet = calcNet(scores.fen.c, scores.fen.w);
    const inkNet = calcNet(scores.inkilap.c, scores.inkilap.w);
    const dinNet = calcNet(scores.din.c, scores.din.w);
    const dilNet = calcNet(scores.dil.c, scores.dil.w);

    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;
    const point = 194.7 + (turkceNet * 4.2) + (matNet * 5.5) + (fenNet * 4.0) + (inkNet * 1.5) + (dinNet * 1.5) + (dilNet * 1.5);

    setResult({ point: Math.min(500, Math.max(0, point)), totalNet });
  };

  const updateScore = useCallback((subject: LgsSubjectKey, field: "c" | "w", val: string) => {
    setScores(prev => ({ ...prev, [subject]: { ...prev[subject], [field]: val } }));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>LGS netlerinizi hesaplamak için doğru ve yanlış sayılarınızı giriniz (3 yanlış 1 doğruyu götürür).</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <LgsInputRow label="Türkçe" maxQ={20} name="turkce" scores={scores} onUpdate={updateScore} />
        <LgsInputRow label="Matematik" maxQ={20} name="mat" scores={scores} onUpdate={updateScore} />
        <LgsInputRow label="Fen Bilimleri" maxQ={20} name="fen" scores={scores} onUpdate={updateScore} />
        <LgsInputRow label="T.C. İnkılap Tarihi" maxQ={10} name="inkilap" scores={scores} onUpdate={updateScore} />
        <LgsInputRow label="Din Kültürü" maxQ={10} name="din" scores={scores} onUpdate={updateScore} />
        <LgsInputRow label="Yabancı Dil" maxQ={10} name="dil" scores={scores} onUpdate={updateScore} />
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
