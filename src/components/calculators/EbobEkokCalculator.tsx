"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
      <div className="flex flex-col gap-4">
        {/* Desktop Labels Row */}
        <div className="hidden lg:flex justify-between px-6">
          <label className="calc-input-label !mb-0 text-xs text-muted font-black italic">1. SAYI</label>
          <label className="calc-input-label !mb-0 text-xs text-right text-muted font-black italic">2. SAYI</label>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">
            
            {/* Left Input Block */}
            <div className="flex flex-col gap-2">
              <label className="calc-input-label lg:hidden px-2 text-muted font-black italic">1. SAYI</label>
              <div className="calc-input-key">
                  <input 
                    type="number" 
                    value={num1} 
                    onChange={e => setNum1(e.target.value)} 
                    className="calc-input-field !py-8 text-center" 
                    placeholder="24" 
                  />
              </div>
            </div>

            {/* Right Input Block */}
            <div className="flex flex-col gap-2">
              <label className="calc-input-label lg:hidden px-2 text-right text-muted font-black italic">2. SAYI</label>
              <div className="calc-input-key">
                  <input 
                    type="number" 
                    value={num2} 
                    onChange={e => setNum2(e.target.value)} 
                    className="calc-input-field !py-8 text-center text-accent-primary" 
                    placeholder="36" 
                  />
              </div>
            </div>
          </div>

          {/* Central 3D Swap Button - Guaranteed Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none">
             <button 
                onClick={() => {
                  const temp = num1;
                  setNum1(num2);
                  setNum2(temp);
                  confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
                }}
                className="calc-swap-glass group/swapbtn pointer-events-auto shadow-2xl"
                title="Sayıları Yer Değiştir"
             >
                <div className="relative w-full h-full flex items-center justify-center text-primary/60 group-hover/swapbtn:text-accent-primary">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0 transition-all duration-500 group-hover/swapbtn:rotate-180 group-hover/swapbtn:scale-110"><path d="m7 16-4-4 4-4"/><path d="M3 12h18"/><path d="m17 8 4 4-4 4"/></svg>
                </div>
             </button>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate !py-6" onClick={calculate}>
          <span>🔢</span> Sonucu Göster
        </button>
        <button className="calc-btn-reset !py-6" onClick={reset}>
          <span>↺</span> Temizle
        </button>
      </div>

      {result && (
        <div className="panel p-0 bg-transparent border-none shadow-none mt-4 animate-result">
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
