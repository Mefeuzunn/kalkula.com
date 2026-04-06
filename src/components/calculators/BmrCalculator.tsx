"use client";

import React, { useState, useEffect } from "react";

export function BmrCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;
    if (w <= 0 || h <= 0 || a <= 0) { setBmr(null); return; }
    let result = (10 * w) + (6.25 * h) - (5 * a);
    result = gender === "male" ? result + 5 : result - 161;
    setBmr(result);
  };

  const reset = () => { setGender("male"); setWeight("70"); setHeight("175"); setAge("30"); setBmr(null); };

  useEffect(() => { calculate(); }, [gender, weight, height, age]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Cinsiyet</label>
        <div className="calc-toggle-group">
          <button className={`calc-toggle-btn ${gender === "male" ? "active" : ""}`} onClick={() => setGender("male")}>♂ Erkek</button>
          <button className={`calc-toggle-btn ${gender === "female" ? "active" : ""}`} onClick={() => setGender("female")}>♀ Kadın</button>
        </div>
      </div>

      <div className="calc-grid-3">
        <div className="calc-input-group">
          <label className="calc-label">Kilo</label>
          <div className="calc-input-wrapper">
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="calc-input has-unit" placeholder="70" min="1" />
            <span className="calc-unit">KG</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Boy</label>
          <div className="calc-input-wrapper">
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="calc-input has-unit" placeholder="175" min="1" />
            <span className="calc-unit">CM</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Yaş</label>
          <div className="calc-input-wrapper">
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="calc-input has-unit" placeholder="30" min="1" />
            <span className="calc-unit">YAŞ</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🔥 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {bmr !== null ? (
        <div className="calc-result-panel">
          <div className="calc-result-header">🧘 Bazal Metabolizma Hızı (BMR)</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Günlük Bazal Enerji İhtiyacı</div>
              <div className="calc-result-hero-value" style={{ color: "#ec4899" }}>
                {bmr.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span style={{ fontSize: "1.5rem" }}>kcal</span>
              </div>
              <div className="calc-result-hero-sub">Mifflin-St Jeor denklemine göre hesaplanmıştır</div>
            </div>
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">🪑 Hareketsiz</div>
                <div className="calc-result-card-value" style={{ fontSize: "1.1rem" }}>{Math.round(bmr * 1.2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">🚶 Hafif Aktif</div>
                <div className="calc-result-card-value" style={{ fontSize: "1.1rem" }}>{Math.round(bmr * 1.375)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">🏃 Orta Aktif</div>
                <div className="calc-result-card-value" style={{ fontSize: "1.1rem" }}>{Math.round(bmr * 1.55)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
            </div>
            <div className="calc-info-box" style={{ marginTop: "1rem" }}>
              <span className="calc-info-box-icon">ℹ️</span>
              <span className="calc-info-box-text">Bu miktar, vücudunuzun tam dinlenme halindeyken hayatta kalmak için harcadığı enerjidir. Aktif kalori ihtiyacınız daha yüksektir.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="calc-empty-state">
          <span className="calc-empty-state-icon">🧘</span>
          <span className="calc-empty-state-text">Değerleri girerek hesaplama başlatın</span>
        </div>
      )}
    </div>
  );
}
