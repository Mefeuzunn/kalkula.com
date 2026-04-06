"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const vke = w / (h * h);
      setResult(vke);
      
      // WOW Effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#eab308", "#ef4444"]
      });
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  let status = "";
  let color = "";
  let description = "";

  if (result !== null) {
    if (result < 18.5) { 
        status = "Zayıf"; 
        color = "#3b82f6"; 
        description = "Kilonuz boyunuza göre az. Dengeli beslenmeye odaklanmalısınız.";
    }
    else if (result < 24.9) { 
        status = "Normal"; 
        color = "#22c55e"; 
        description = "Tebrikler! İdeal kilo aralığındasınız. Formunuzu koruyun.";
    }
    else if (result < 29.9) { 
        status = "Fazla Kilolu"; 
        color = "#eab308"; 
        description = "İdeal kilonun biraz üzerindesiniz. Hareket miktarını artırın.";
    }
    else { 
        status = "Obez"; 
        color = "#ef4444"; 
        description = "Kilonuz sağlığınızı tehdit edebilir. Bir uzmana danışmanızı öneririz.";
    }
  }

  return (
    <div className="calc-wrapper animate-fade-in">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Boy (cm)</label>
          <div className="calc-input-wrapper">
            <input 
              type="number" 
              placeholder="175" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="calc-input has-unit" 
              min="50" max="250"
            />
            <span className="calc-unit">CM</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Kilo (kg)</label>
          <div className="calc-input-wrapper">
            <input 
              type="number" 
              placeholder="70" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="calc-input has-unit" 
              min="20" max="300"
            />
            <span className="calc-unit">KG</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row" style={{ marginTop: '1.5rem' }}>
        <button className="calc-btn-reset" onClick={reset} style={{ flex: 0.3 }}>Temizle</button>
        <button className="calc-btn-calculate" onClick={calculate} style={{ flex: 1 }}>Hesapla</button>
      </div>

      {result !== null && (
        <div className="result-container-premium animate-result shadow-2xl" style={{ marginTop: '2.5rem' }}>
          <div className="result-card-premium">
            <div className="result-badge" style={{ backgroundColor: `${color}11`, color, borderColor: `${color}33`, marginBottom: '1.5rem' }}>
               {status.toUpperCase()}
            </div>
            <div className="result-value-premium" style={{ color, fontSize: '4.5rem', lineHeight: 1 }}>
              {result.toFixed(1)}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem' }}>Vücut Kitle Endeksiniz</div>
            
            <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500, maxWidth: '400px', margin: '1.5rem auto 0' }}>
               {description}
            </p>

            <div style={{ marginTop: '2.5rem', position: 'relative', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ flex: 18.5, background: '#3b82f6', opacity: result < 18.5 ? 1 : 0.4 }}></div>
                <div style={{ flex: 6.4, background: '#22c55e', opacity: (result >= 18.5 && result < 24.9) ? 1 : 0.4 }}></div>
                <div style={{ flex: 5, background: '#eab308', opacity: (result >= 24.9 && result < 29.9) ? 1 : 0.4 }}></div>
                <div style={{ flex: 10.1, background: '#ef4444', opacity: result >= 29.9 ? 1 : 0.4 }}></div>
                
                {/* Pointer */}
                <div style={{ 
                    position: 'absolute', 
                    left: `${Math.min(95, Math.max(5, (result / 40) * 100))}%`, 
                    top: 0, 
                    bottom: 0, 
                    width: '4px', 
                    background: '#fff', 
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)', 
                    zIndex: 2,
                    transition: 'left 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
