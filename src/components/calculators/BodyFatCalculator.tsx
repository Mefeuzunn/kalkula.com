"use client";

import React, { useState, useEffect } from "react";

export function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("180");
  const [neck, setNeck] = useState("40");
  const [waist, setWaist] = useState("90");
  const [hip, setHip] = useState("100"); // Female only

  const [results, setResults] = useState<{ bodyFat: number; category: string; color: string; } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) || 0;
    const n = parseFloat(neck) || 0;
    const w = parseFloat(waist) || 0;
    const hp = parseFloat(hip) || 0;

    if (h <= 0 || n <= 0 || w <= 0 || (gender === "female" && hp <= 0)) { setResults(null); return; }

    let bf = 0;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }
    if (bf < 0) bf = 0;

    let category = "Normal"; let color = "#3b82f6";
    if (gender === "male") {
      if (bf < 2) { category = "Çok Az Yağlı"; color = "#f87171"; }
      else if (bf < 6) { category = "Atletik"; color = "#34d399"; }
      else if (bf < 14) { category = "Fit"; color = "#10b981"; }
      else if (bf < 18) { category = "Ortalama"; color = "#60a5fa"; }
      else if (bf < 25) { category = "Normal"; color = "#fbbf24"; }
      else { category = "Aşırı Yağlanma (Obez)"; color = "#ef4444"; }
    } else {
      if (bf < 10) { category = "Çok Az Yağlı"; color = "#f87171"; }
      else if (bf < 14) { category = "Atletik"; color = "#34d399"; }
      else if (bf < 21) { category = "Fit"; color = "#10b981"; }
      else if (bf < 25) { category = "Ortalama"; color = "#60a5fa"; }
      else if (bf < 32) { category = "Normal"; color = "#fbbf24"; }
      else { category = "Aşırı Yağlanma (Obez)"; color = "#ef4444"; }
    }
    setResults({ bodyFat: bf, category, color });
  };

  const reset = () => { setHeight("180"); setNeck("40"); setWaist("90"); setHip("100"); setResults(null); };

  useEffect(() => { calculate(); }, [gender, height, neck, waist, hip]);

  return (
    <div className="calc-wrapper">
      <div className="calc-toggle-group" style={{ marginBottom: "1rem" }}>
         <button className={`calc-toggle-btn ${gender === "male" ? "active" : ""}`} onClick={() => setGender("male")}>♂ ERKEK</button>
         <button className={`calc-toggle-btn ${gender === "female" ? "active" : ""}`} onClick={() => setGender("female")}>♀ KADIN</button>
      </div>

      <div className={`calc-grid-${gender === "female" ? '2' : '3'}`}>
         <div className="calc-input-group">
            <label className="calc-label">Boy</label>
            <div className="calc-input-wrapper">
               <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="calc-input has-unit" placeholder="180" min="0" />
               <span className="calc-unit">cm</span>
            </div>
         </div>
         <div className="calc-input-group">
            <label className="calc-label">Boyun Çevresi</label>
            <div className="calc-input-wrapper">
               <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className="calc-input has-unit" placeholder="40" min="0" />
               <span className="calc-unit">cm</span>
            </div>
         </div>
         <div className="calc-input-group">
            <label className="calc-label">Bel Çevresi</label>
            <div className="calc-input-wrapper">
               <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="calc-input has-unit" placeholder="90" min="0" />
               <span className="calc-unit">cm</span>
            </div>
         </div>
         {gender === "female" && (
            <div className="calc-input-group">
               <label className="calc-label">Kalça Çevresi</label>
               <div className="calc-input-wrapper">
                  <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="calc-input has-unit" placeholder="100" min="0" />
                  <span className="calc-unit">cm</span>
               </div>
            </div>
         )}
      </div>

      <div className="calc-action-row">
         <button className="calc-btn-calculate" onClick={calculate}>🧑‍🔬 Yağ Oranını Analiz Et</button>
         <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header" style={{ color: results.color }}>🧑‍🔬 US Navy Vücut Yağ Oranı (BF%) Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero" style={{ background: `linear-gradient(135deg, ${results.color}22, transparent)` }}>
              <div className="calc-result-hero-label">Vücut Yağ Oranı</div>
              <div className="calc-result-hero-value" style={{ color: results.color, fontSize: "4rem" }}>
                %{results.bodyFat.toFixed(1)}
              </div>
              <div className="calc-result-hero-sub" style={{ marginTop: "1rem" }}>
                <span style={{ background: results.color, color: "#fff", padding: "4px 12px", borderRadius: "12px", fontWeight: "bold" }}>{results.category}</span>
              </div>
            </div>
            
            <div style={{ marginTop: "1rem", display: "flex", gap: "2px", height: "12px", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ flex: 1, background: "#34d399", opacity: results.category === "Atletik" || results.category === "Çok Az Yağlı" ? 1 : 0.3 }} title="Atletik"></div>
              <div style={{ flex: 1, background: "#10b981", opacity: results.category === "Fit" ? 1 : 0.3 }} title="Fit"></div>
              <div style={{ flex: 1, background: "#60a5fa", opacity: results.category === "Ortalama" ? 1 : 0.3 }} title="Ortalama"></div>
              <div style={{ flex: 1, background: "#fbbf24", opacity: results.category === "Normal" ? 1 : 0.3 }} title="Normal"></div>
              <div style={{ flex: 1, background: "#ef4444", opacity: results.category === "Aşırı Yağlanma (Obez)" ? 1 : 0.3 }} title="Aşırı Yağlı"></div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
         <span className="calc-info-box-icon">💡</span>
         <span className="calc-info-box-text">US Navy (Amerikan Donanması) metodunda ölçümleri mezura ile doğru almak sonucu %99 etkiler. Bel ölçümünü mutlaka göbek deliği hizasından yapınız.</span>
      </div>
    </div>
  );
}
