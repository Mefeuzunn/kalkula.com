"use client";

import React, { useState, useEffect, useCallback } from "react";

type LgsSubjectKey = "turkce" | "mat" | "fen" | "inkilap" | "din" | "dil";
type LgsScores = Record<LgsSubjectKey, { c: string; w: string }>;

interface LgsInputRowProps {
  label: string;
  maxQ: number;
  name: LgsSubjectKey;
  scores: LgsScores;
  onUpdate: (subject: LgsSubjectKey, field: "c" | "w", val: string, maxQ: number) => void;
}

function LgsInputRow({ label, maxQ, name, scores, onUpdate }: LgsInputRowProps) {
  const c = parseFloat(scores[name].c) || 0;
  const w = parseFloat(scores[name].w) || 0;
  const net = Math.max(0, c - (w / 3));

  return (
    <div className="calc-input-group" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <label className="calc-label" style={{ marginBottom: 0 }}>{label} <span style={{ opacity: 0.6 }}>({maxQ} Soru)</span></label>
        <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--accent-primary)" }}>{net ? net.toFixed(2) : "0.00"} Net</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input 
            type="number" 
            value={scores[name].c} 
            onChange={e => onUpdate(name, "c", e.target.value, maxQ)} 
            className="calc-input" 
            style={{ borderRadius: '12px', textAlign: "center", background: 'rgba(34, 197, 94, 0.05)', borderColor: scores[name].c ? '#22c55e' : 'var(--border)' }}
            placeholder="Doğru" 
            min="0" max={maxQ} 
          />
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#22c55e', textAlign: 'center' }}>DOĞRU</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input 
            type="number" 
            value={scores[name].w} 
            onChange={e => onUpdate(name, "w", e.target.value, maxQ)} 
            className="calc-input" 
            style={{ borderRadius: '12px', textAlign: "center", background: 'rgba(239, 68, 68, 0.05)', borderColor: scores[name].w ? '#ef4444' : 'var(--border)' }}
            placeholder="Yanlış" 
            min="0" max={maxQ} 
          />
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#ef4444', textAlign: 'center' }}>YANLIŞ</span>
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

    const coefficients = { turkce: 4, mat: 4, fen: 4, inkilap: 1, din: 1, dil: 1 };
    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;
    
    const weightedSum = (turkceNet * coefficients.turkce) + (matNet * coefficients.mat) + (fenNet * coefficients.fen) + (inkNet * coefficients.inkilap) + (dinNet * coefficients.din) + (dilNet * coefficients.dil);
    const maxWeighted = (20*4) + (20*4) + (20*4) + (10*1) + (10*1) + (10*1); // 270
    
    // Normalization Factor for 500 points baseline
    const calculatedPoint = 100 + ((weightedSum / maxWeighted) * 400);

    const hasValue = Object.values(scores).some(s => s.c !== "" || s.w !== "");
    if (!hasValue) { setResult(null); return; }

    const finalPoint = Math.min(500, Math.max(100, Math.round(calculatedPoint * 1000) / 1000));
    setResult({ point: finalPoint, totalNet });
  };

  const updateScore = useCallback((subject: LgsSubjectKey, field: "c" | "w", val: string, maxQ: number) => {
    setScores(prev => {
        const currentVals = { ...prev[subject], [field]: val };
        const c = parseInt(currentVals.c) || 0;
        const w = parseInt(currentVals.w) || 0;
        
        // Strict Validation: D + Y <= Soru Sayısı
        if (c + w > maxQ) {
            return prev; // Block invalid input
        }
        
        return { ...prev, [subject]: currentVals };
    });
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
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{result.totalNet.toFixed(2).replace('.', ',')}</div>
               </div>
               <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px' }}>PERFORMANS</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{result.point > 480 ? "🎯 Hedef İlk %1" : result.point > 450 ? "🚀 Üst Düzey" : "⭐ İyi"}</div>
               </div>
            </div>
            <div className="result-footer-premium" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                MEB resmi 2026 katsayıları baz alınmıştır.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
