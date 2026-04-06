"use client";

import React, { useState, useEffect } from "react";

export function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<{ bmr: number; tdee: number; lose: number; gain: number } | null>(null);

  const ACTIVITIES = [
    { value: "1.2", label: "Hareketsiz (Masa başı)" },
    { value: "1.375", label: "Hafif aktif (1-3 gün/hafta)" },
    { value: "1.55", label: "Orta aktif (3-5 gün/hafta)" },
    { value: "1.725", label: "Çok aktif (6-7 gün/hafta)" },
    { value: "1.9", label: "Ekstra aktif (Fiziksel iş)" },
  ];

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) { setResult(null); return; }
    let bmr = gender === "male"
      ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
      : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    const tdee = Math.round(bmr * parseFloat(activity));
    setResult({ bmr: Math.round(bmr), tdee, lose: tdee - 500, gain: tdee + 500 });
  };

  const reset = () => { setGender("male"); setWeight("70"); setHeight("175"); setAge("30"); setActivity("1.2"); setResult(null); };

  useEffect(() => { calculate(); }, [gender, weight, height, age, activity]);

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

      <div className="calc-input-group">
        <label className="calc-label">Hareket Seviyesi</label>
        <select value={activity} onChange={e => setActivity(e.target.value)} className="calc-select">
          {ACTIVITIES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚡ Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🔥 Günlük Kalori İhtiyacı</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Günlük Toplam Enerji (TDEE)</div>
              <div className="calc-result-hero-value" style={{ color: "#22c55e" }}>{result.tdee} <span style={{ fontSize: "1.5rem" }}>kcal</span></div>
              <div className="calc-result-hero-sub">Bazal Metabolizma (BMR): {result.bmr} kcal</div>
            </div>
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">⬇️ Kilo Vermek</div>
                <div className="calc-result-card-value" style={{ color: "#3b82f6" }}>{result.lose}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">✅ Kilo Korumak</div>
                <div className="calc-result-card-value" style={{ color: "#22c55e" }}>{result.tdee}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">⬆️ Kilo Almak</div>
                <div className="calc-result-card-value" style={{ color: "#f59e0b" }}>{result.gain}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>kcal/gün</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🏃</span>
        <span className="calc-info-box-text">Harris-Benedict denklemi kullanılmaktadır. Kilo vermek için günlük 500 kcal açık, kilo almak için 500 kcal fazla almanız önerilir.</span>
      </div>
    </div>
  );
}
