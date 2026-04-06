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
    <div className="calc-input-group" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <label className="calc-label" style={{ marginBottom: 0 }}>{label} <span style={{ opacity: 0.6 }}>({maxQ})</span></label>
        <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--accent-primary)" }}>{net ? net.toFixed(2) : "0.00"} Net</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div className="calc-input-wrapper">
          <input 
            type="number" 
            value={scores[name].c} 
            onChange={e => onUpdate(name, "c", e.target.value)} 
            className="calc-input has-unit" 
            style={{ borderRadius: '16px', background: 'rgba(34, 197, 94, 0.05)', borderColor: scores[name].c ? 'rgba(34, 197, 94, 0.4)' : 'var(--border)' }}
            placeholder="D" 
            min="0" max={maxQ} 
          />
          <span className="calc-unit" style={{ color: '#22c55e' }}>DOĞRU</span>
        </div>
        <div className="calc-input-wrapper">
          <input 
            type="number" 
            value={scores[name].w} 
            onChange={e => onUpdate(name, "w", e.target.value)} 
            className="calc-input has-unit" 
            style={{ borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)', borderColor: scores[name].w ? 'rgba(239, 68, 68, 0.4)' : 'var(--border)' }}
            placeholder="Y" 
            min="0" max={maxQ} 
          />
          <span className="calc-unit" style={{ color: '#ef4444' }}>YANLIŞ</span>
        </div>
      </div>
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

    // Official 2026 Coefficients: 4 for main, 1 for others
    const coefficients = { turkce: 4, mat: 4, fen: 4, inkilap: 1, din: 1, dil: 1 };
    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;
    
    // Normalization Factor (Estimated for 500 max)
    // Formula: 100 + (Net * Coefficient * Normalization)
    // 20*4*3 + 20*4*3 + 20*4*3 + 10*1*3 + 10*1*3 + 10*1*3 = 810? 
    // Usually: Point = 100 + (300 * (A - MinA) / (MaxA - MinA))
    const weightedSum = (turkceNet * coefficients.turkce) + (matNet * coefficients.mat) + (fenNet * coefficients.fen) + (inkNet * coefficients.inkilap) + (dinNet * coefficients.din) + (dilNet * coefficients.dil);
    const maxWeighted = (20*4) + (20*4) + (20*4) + (10*1) + (10*1) + (10*1); // 270
    
    const calculatedPoint = 100 + ((weightedSum / maxWeighted) * 400);

    const hasValue = Object.values(scores).some(s => s.c !== "" || s.w !== "");
    if (!hasValue) { setResult(null); return; }

    const finalPoint = Math.min(500, Math.max(100, Math.round(calculatedPoint * 1000) / 1000));
    setResult({ point: finalPoint, totalNet });
  };

  const updateScore = useCallback((subject: LgsSubjectKey, field: "c" | "w", val: string) => {
    setScores(prev => ({ ...prev, [subject]: { ...prev[subject], [field]: val } }));
  }, []);

  const reset = () => {
    setScores({
      turkce: { c: "", w: "" }, mat: { c: "", w: "" }, fen: { c: "", w: "" },
      inkilap: { c: "", w: "" }, din: { c: "", w: "" }, dil: { c: "", w: "" }
    });
    setResult(null);
  };

  useEffect(() => { calculate(); }, [scores]);

  return (
    <div className="calc-wrapper animate-fade-in">
      <div className="calc-grid-2">
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <div className="calc-section-title" style={{ marginBottom: '1.5rem' }}>📊 Sayısal Bölüm</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
             <LgsInputRow label="Matematik" maxQ={20} name="mat" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="Fen Bilimleri" maxQ={20} name="fen" scores={scores} onUpdate={updateScore} />
          </div>
        </div>
        <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <div className="calc-section-title" style={{ marginBottom: '1.5rem' }}>📚 Sözel Bölüm</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
             <LgsInputRow label="Türkçe" maxQ={20} name="turkce" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="T.C. İnkılap" maxQ={10} name="inkilap" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="Din Kültürü" maxQ={10} name="din" scores={scores} onUpdate={updateScore} />
             <LgsInputRow label="Yabancı Dil" maxQ={10} name="dil" scores={scores} onUpdate={updateScore} />
          </div>
        </div>
      </div>

      <div className="calc-action-row" style={{ marginTop: '1rem' }}>
        <button className="calc-btn-reset" onClick={reset} style={{ flex: 0.3 }}>Temizle</button>
        <button className="calc-btn-calculate" onClick={calculate} style={{ flex: 1 }}>Hesapla</button>
      </div>

      {result && (
        <div className="result-container-premium animate-result">
          <div className="result-card-premium">
            <div className="result-badge">2026 TAHMİNİ PUAN</div>
            <div className="result-value-premium">{result.point.toFixed(4)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
               <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>TOPLAM NET</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{result.totalNet.toFixed(2).replace('.', ',')}</div>
               </div>
               <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>BAŞARI DURUMU</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{result.point > 480 ? "🎯 Hedef İlk %1" : result.point > 450 ? "🚀 Üst Düzey" : "⭐ İyi"}</div>
               </div>
            </div>
            <div className="result-footer-premium" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                MEB "3 Yanlış 1 Doğruyu Götürür" kuralı uygulanmıştır.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
