"use client";

import React, { useState, useEffect } from "react";

export function AofCalculator() {
  const [vize, setVize] = useState("60");
  const [final, setFinal] = useState("70");
  const [result, setResult] = useState<{ ortalama: number; harf: string; durum: string; color: string; isFailed: boolean } | null>(null);

  const calculate = () => {
    const v = parseFloat(vize);
    const f = parseFloat(final);
    if (isNaN(v) || isNaN(f) || v < 0 || f < 0 || v > 100 || f > 100) { setResult(null); return; }

    const ortalama = (v * 0.3) + (f * 0.7);
    let harf = ""; let durum = ""; let color = ""; let isFailed = false;

    if (f < 35) {
      harf = "FF"; durum = "Kaldı (Final Barajı Altında)"; color = "#ef4444"; isFailed = true;
    } else if (ortalama < 35) {
      harf = "FF"; durum = "Kaldı (Ortalama Yetersiz)"; color = "#ef4444"; isFailed = true;
    } else if (ortalama >= 84) { harf = "AA"; durum = "Üstün Başarı ile Geçti"; color = "#10b981"; }
    else if (ortalama >= 77) { harf = "AB"; durum = "Başarı ile Geçti"; color = "#10b981"; }
    else if (ortalama >= 71) { harf = "BA"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 56) { harf = "BB"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 50) { harf = "CC"; durum = "Geçti"; color = "#8b5cf6"; }
    else { harf = "DC"; durum = "Koşullu Geçti"; color = "#f59e0b"; }

    setResult({ ortalama, harf, durum, color, isFailed });
  };

  const reset = () => { setVize("60"); setFinal("70"); setResult(null); };

  useEffect(() => { calculate(); }, [vize, final]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Vize Notu (%30)</label>
          <input type="number" value={vize} onChange={e => setVize(e.target.value)} className="calc-input" placeholder="60" min="0" max="100" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Final Notu (%70)</label>
          <input type="number" value={final} onChange={e => setFinal(e.target.value)} className="calc-input" placeholder="70" min="0" max="100" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🎓 Başarı Durumunu Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-hero" style={{ background: `linear-gradient(135deg, ${result.color}22, transparent)`, marginBottom: 0 }}>
            <div className="calc-result-hero-label" style={{ color: result.color }}>AÖF Başarı Sonucu</div>
            <div className="calc-result-hero-value" style={{ color: result.color, fontSize: "4rem" }}>
              {result.ortalama.toFixed(2)}
            </div>
            <div className="calc-result-hero-sub" style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Harf Notu</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: result.color }}>{result.harf}</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--border)" }}></div>
                <div>
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Durum</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: result.color, paddingTop: "0.5rem" }}>{result.durum}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">AÖF sisteminde final sınavından en az 35 alma zorunluluğu (baraj) bulunmaktadır. Aksi takdirde ortalamanız ne olursa olsun harf notunuz FF olarak yansır.</span>
      </div>
    </div>
  );
}
