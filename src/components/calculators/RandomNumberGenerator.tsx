"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const generate = () => {
    const minValue = parseInt(min) || 0;
    const maxValue = parseInt(max) || 0;
    
    if (minValue >= maxValue) {
      alert("Minimum değer maximum değerden küçük olmalıdır!");
      return;
    }

    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
      count++;
      if (count > 25) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        setResult(final);
        setIsRolling(false);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ["#3b82f6", "#10b981", "#f59e0b"] });
      }
    }, 60);
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setResult(null);
    setIsRolling(false);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Minimum Değer</label>
          <input type="number" value={min} onChange={e => setMin(e.target.value)} className="calc-input" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 900 }} />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Maximum Değer</label>
          <input type="number" value={max} onChange={e => setMax(e.target.value)} className="calc-input" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 900 }} />
        </div>
      </div>

      <div style={{ padding: "2rem 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: "200px", height: "200px", borderRadius: "32px", 
          background: "var(--surface)", border: "4px solid var(--border)",
          display: "flex", justifyContent: "center", alignItems: "center",
          boxShadow: isRolling ? "0 0 30px var(--accent-primary)" : "0 10px 30px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          transform: isRolling ? "scale(1.05) rotate(5deg)" : "scale(1) rotate(0deg)",
          borderColor: isRolling ? "var(--accent-primary)" : "var(--border)"
        }}>
           <span style={{ fontSize: "5rem", fontWeight: 900, fontFamily: "monospace", color: isRolling ? "var(--accent-primary)" : "var(--text-primary)", opacity: isRolling ? 0.7 : 1 }}>
             {result ?? "?"}
           </span>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={generate} disabled={isRolling} style={{ flex: 2, background: "var(--accent-primary)", padding: "1.2rem", fontSize: "1.2rem", color: "#fff" }}>
          {isRolling ? "🎲 Üretiliyor..." : "🎲 Rastgele Seç"}
        </button>
        <button className="calc-btn-reset" onClick={reset} disabled={isRolling} style={{ flex: 1 }}>↺ Sıfırla</button>
      </div>

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Matematiksel rastlantısallık algoritmasıyla (Math.random) iki sınır arasında tamamen tarafsız bir seçim yapıldı. Çekiliş ve kuralarınızda güvenle kullanabilirsiniz.</span>
      </div>
    </div>
  );
}
