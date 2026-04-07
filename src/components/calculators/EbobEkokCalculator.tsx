"use client";

import React, { useState, useEffect } from "react";

export function EbobEkokCalculator() {
  const [num1, setNum1] = useState("24");
  const [num2, setNum2] = useState("36");
  const [result, setResult] = useState<{ ebob: number; ekok: number } | null>(null);

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setResult(null); return; }
    const ebob = gcd(a, b);
    const ekok = (a * b) / ebob;
    setResult({ ebob, ekok });
  };

  const reset = () => { setNum1("24"); setNum2("36"); setResult(null); };

  useEffect(() => { calculate(); }, [num1, num2]);

  return (
    <div className="calc-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="group relative">
           <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
             shadow-[0_12px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_0_rgba(0,0,0,0.4)]
             group-focus-within:-translate-y-1 group-focus-within:shadow-[0_8px_0_rgba(0,0,0,0.1)]
             hover:-translate-y-1 hover:shadow-[0_16px_0_rgba(0,0,0,0.06)]
             overflow-hidden">
              <div className="bg-secondary/20 p-3 border-b-2 border-border text-center">
                 <label className="text-[10px] font-black uppercase tracking-widest italic opacity-60">1. Sayı</label>
              </div>
              <input 
                type="number" 
                value={num1} 
                onChange={e => setNum1(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-5xl font-black p-6 text-center italic tracking-tighter" 
                placeholder="24" 
              />
           </div>
        </div>

        <div className="group relative">
           <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
             shadow-[0_12px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_0_rgba(0,0,0,0.4)]
             group-focus-within:-translate-y-1 group-focus-within:shadow-[0_8px_0_rgba(0,0,0,0.1)]
             hover:-translate-y-1 hover:shadow-[0_16px_0_rgba(0,0,0,0.06)]
             overflow-hidden">
              <div className="bg-secondary/20 p-3 border-b-2 border-border text-center">
                 <label className="text-[10px] font-black uppercase tracking-widest italic opacity-60">2. Sayı</label>
              </div>
              <input 
                type="number" 
                value={num2} 
                onChange={e => setNum2(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-5xl font-black p-6 text-center italic tracking-tighter" 
                placeholder="36" 
              />
           </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🔢 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🔢 EBOB & EKOK Sonuçları</div>
          <div className="calc-result-body">
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">🔵 EBOB</div>
                <div className="calc-result-card-value" style={{ fontSize: "2.5rem", color: "var(--accent-primary)" }}>{result.ebob}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>En Büyük Ortak Bölen</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">🟢 EKOK</div>
                <div className="calc-result-card-value" style={{ fontSize: "2.5rem", color: "#22c55e" }}>{result.ekok}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>En Küçük Ortak Kat</div>
              </div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">EBOB × EKOK</span>
              <span className="calc-result-row-value">{(result.ebob * result.ekok).toLocaleString("tr-TR")}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">{num1} × {num2}</span>
              <span className="calc-result-row-value">{(parseInt(num1) * parseInt(num2)).toLocaleString("tr-TR")} ✓</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">EBOB × EKOK = A × B özelliği her zaman geçerlidir. Öklid Algoritması kullanılarak hesaplanmaktadır.</span>
      </div>
    </div>
  );
}
