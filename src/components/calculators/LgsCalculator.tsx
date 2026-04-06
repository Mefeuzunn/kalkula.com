"use client";

import React, { useState, useEffect, useCallback } from "react";

type LgsSubjectKey = "turkce" | "mat" | "fen" | "inkilap" | "din" | "dil";
type LgsScores = Record<LgsSubjectKey, { c: string; w: string }>;

interface LgsInputRowProps {
  label: string;
  maxQ: number;
  name: LgsSubjectKey;
  scores: LgsScores;
  onUpdate: (subject: LgsSubjectKey, field: "c" | "w", val: string) => void;
}

function LgsInputRow({ label, maxQ, name, scores, onUpdate }: LgsInputRowProps) {
  const c = parseFloat(scores[name].c) || 0;
  const w = parseFloat(scores[name].w) || 0;
  const net = Math.max(0, c - (w / 3));

  return (
    <div className="calc-input-group" style={{ marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
        <label className="calc-label" style={{ marginBottom: 0 }}>{label} ({maxQ} Soru)</label>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-primary)" }}>{net.toFixed(2)} Net</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <input 
          type="number" 
          value={scores[name].c} 
          onChange={e => onUpdate(name, "c", e.target.value)} 
          className="calc-input" 
          style={{ borderColor: "#22c55e", color: "#22c55e", textAlign: "center" }}
          placeholder="Doğru" 
          min="0" max={maxQ} 
        />
        <input 
          type="number" 
          value={scores[name].w} 
          onChange={e => onUpdate(name, "w", e.target.value)} 
          className="calc-input" 
          style={{ borderColor: "#ef4444", color: "#ef4444", textAlign: "center" }}
          placeholder="Yanlış" 
          min="0" max={maxQ} 
        />
      </div>
    </div>
  );
}

export function LgsCalculator() {
  const [scores, setScores] = useState<LgsScores>({
    turkce: { c: "20", w: "0" },
    mat: { c: "15", w: "2" },
    fen: { c: "18", w: "1" },
    inkilap: { c: "10", w: "0" },
    din: { c: "10", w: "0" },
    dil: { c: "10", w: "0" },
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

    const BASE_POINT = 194.7674;
    const coefficients = { turkce: 3.6718, mat: 3.9519, fen: 3.5358, inkilap: 1.6390, din: 1.5831, dil: 1.6313 };
    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;
    const calculatedPoint = BASE_POINT + (turkceNet * coefficients.turkce) + (matNet * coefficients.mat) + (fenNet * coefficients.fen) + (inkNet * coefficients.inkilap) + (dinNet * coefficients.din) + (dilNet * coefficients.dil);
    
    // Check if empty
    if (Object.values(scores).every(s => s.c === "" && s.w === "")) { setResult(null); return; }

    const finalPoint = Math.min(500, Math.max(100, Math.round(calculatedPoint * 10000) / 10000));
    setResult({ point: finalPoint, totalNet });
  };

  const updateScore = useCallback((subject: LgsSubjectKey, field: "c" | "w", val: string) => {
    setScores(prev => ({ ...prev, [subject]: { ...prev[subject], [field]: val } }));
  }, []);

  const reset = () => {
    setScores({
      turkce: { c: "20", w: "0" }, mat: { c: "15", w: "2" }, fen: { c: "18", w: "1" },
      inkilap: { c: "10", w: "0" }, din: { c: "10", w: "0" }, dil: { c: "10", w: "0" }
    });
    setResult(null);
  };

  useEffect(() => { calculate(); }, [scores]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div>
          <div className="calc-section-title">📊 Sayısal Bölüm</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
             <LgsInputRow label="Matematik" maxQ={20} name="mat" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="Fen Bilimleri" maxQ={20} name="fen" scores={scores} onUpdate={updateScore} />
          </div>
        </div>
        <div>
          <div className="calc-section-title">📚 Sözel Bölüm</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
             <LgsInputRow label="Türkçe" maxQ={20} name="turkce" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="İnkılap" maxQ={10} name="inkilap" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="Din Kültürü" maxQ={10} name="din" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="İngilizce" maxQ={10} name="dil" scores={scores} onUpdate={updateScore} />
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📈 LGS Analiz Et</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📈 LGS Gerçek Puan Tahmini</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini LGS Puanı</div>
              <div className="calc-result-hero-value" style={{ color: "var(--accent-primary)", fontSize: "3rem" }}>{result.point.toFixed(4)}</div>
              <div className="calc-result-hero-sub">
                {result.point > 480 ? "FEN LİSESİ DÜZEYİ 🔥" : result.point > 450 ? "ÜST DÜZEY ANADOLU LİSESİ 🌟" : result.point > 350 ? "İYİ DERECE 👍" : "ORTALAMA"}
              </div>
            </div>
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr" }}>
              <div className="calc-result-card" style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <span className="calc-result-card-label" style={{ marginBottom: 0 }}>Toplam Net:</span>
                <span className="calc-result-card-value">{result.totalNet.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚠️</span>
        <span className="calc-info-box-text">Bu hesaplama MEB'in "3 Yanlış 1 Doğruyu Götürür" kuralı ve yayımlanan standart katsayılar (Mat 3.95, Türkçe 3.67 vb.) baz alınarak yapılmıştır. Sınav zorluğuna göre gerçek sonuç +- 5 Puan değişebilir.</span>
      </div>
    </div>
  );
}
