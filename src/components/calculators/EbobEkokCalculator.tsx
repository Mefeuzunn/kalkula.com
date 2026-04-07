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
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label className="calc-input-label">1. SAYI</label>
          <div className="calc-input-key">
            <input 
              type="number" 
              value={num1} 
              onChange={e => setNum1(e.target.value)} 
              className="calc-input-field" 
              placeholder="24"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="calc-input-label">2. SAYI</label>
          <div className="calc-input-key">
            <input 
              type="number" 
              value={num2} 
              onChange={e => setNum2(e.target.value)} 
              className="calc-input-field" 
              placeholder="36"
            />
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>
          <span>🔢</span> Hesapla
        </button>
        <button className="calc-btn-reset" onClick={reset}>
          <span>↺</span> Sıfırla
        </button>
      </div>

      {result && (
        <div className="panel p-0 bg-transparent border-none shadow-none mt-4">
          <div className="calc-result-header">
            <span>🔢</span> EBOB & EKOK SONUÇLARI
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="calc-result-card !bg-secondary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                 <span className="calc-result-card-label">EBOB</span>
              </div>
              <div className="calc-result-card-value text-blue-500">{result.ebob}</div>
              <div className="calc-result-card-desc italic">En Büyük Ortak Bölen</div>
            </div>

            <div className="calc-result-card !bg-secondary/5 border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                 <span className="calc-result-card-label">EKOK</span>
              </div>
              <div className="calc-result-card-value text-green-500">{result.ekok}</div>
              <div className="calc-result-card-desc italic">En Küçük Ortak Kat</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t-2 border-border pt-8">
             <div className="flex justify-between items-center px-4">
                <span className="text-sm font-black italic opacity-60">EBOB × EKOK</span>
                <span className="text-xl font-black text-primary">{(result.ebob * result.ekok).toLocaleString("tr-TR")}</span>
             </div>
             <div className="flex justify-between items-center px-4">
                <span className="text-sm font-black italic opacity-60">{num1} × {num2}</span>
                <span className="text-xl font-black text-primary">{(parseInt(num1) * parseInt(num2)).toLocaleString("tr-TR")} ✓</span>
             </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-accent-glow border-2 border-dashed border-accent-primary/20 rounded-3xl flex gap-4 items-center">
        <span className="text-2xl">💡</span>
        <p className="text-xs font-bold text-muted italic">EBOB × EKOK = A × B özelliği her zaman geçerlidir. Öklid Algoritması kullanılarak 2026 standartlarında hesaplanmaktadır.</p>
      </div>
    </div>
  );
}
