"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function OhmLawCalculator() {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [p, setP] = useState("");
  
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  const [results, setResults] = useState<{ v: number; i: number; r: number; p: number; formula: string } | null>(null);

  const handleInput = (name: string, val: string) => {
    if (val === "") {
      setActiveInputs(prev => prev.filter(item => item !== name));
    } else if (!activeInputs.includes(name)) {
      if (activeInputs.length >= 2) {
        // En eski girişi çıkar yeniyi ekle (LIFO tarzı veya basitçe kaydır)
        setActiveInputs(prev => [...prev.slice(1), name]);
      } else {
        setActiveInputs(prev => [...prev, name]);
      }
    }

    if (name === "v") setV(val);
    if (name === "i") setI(val);
    if (name === "r") setR(val);
    if (name === "p") setP(val);
  };

  const calculate = () => {
    if (activeInputs.length < 2) {
      setResults(null);
      return;
    }

    let valV = parseFloat(v);
    let valI = parseFloat(i);
    let valR = parseFloat(r);
    let valP = parseFloat(p);
    
    let resV = 0, resI = 0, resR = 0, resP = 0, formula = "";

    // Case selection based on provided 2 values
    if (activeInputs.includes("v") && activeInputs.includes("i")) {
      resV = valV; resI = valI;
      resR = valV / valI;
      resP = valV * valI;
      formula = `R = V / I = ${valV} / ${valI}, P = V * I = ${valV} * ${valI}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("r")) {
      resV = valV; resR = valR;
      resI = valV / valR;
      resP = (valV * valV) / valR;
      formula = `I = V / R = ${valV} / ${valR}, P = V² / R = ${valV}² / ${valR}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("r")) {
      resI = valI; resR = valR;
      resV = valI * valR;
      resP = (valI * valI) * valR;
      formula = `V = I * R = ${valI} * ${valR}, P = I² * R = ${valI}² * ${valR}`;
    } else if (activeInputs.includes("v") && activeInputs.includes("p")) {
      resV = valV; resP = valP;
      resI = valP / valV;
      resR = (valV * valV) / valP;
      formula = `I = P / V = ${valP} / ${valV}, R = V² / P = ${valV}² / ${valP}`;
    } else if (activeInputs.includes("i") && activeInputs.includes("p")) {
      resI = valI; resP = valP;
      resV = valP / valI;
      resR = valP / (valI * valI);
      formula = `V = P / I = ${valP} / ${valI}, R = P / I² = ${valP} / ${valI}²`;
    } else if (activeInputs.includes("r") && activeInputs.includes("p")) {
      resR = valR; resP = valP;
      resV = Math.sqrt(valP * valR);
      resI = Math.sqrt(valP / valR);
      formula = `V = √(P * R) = √(${valP} * ${valR}), I = √(P / R) = √(${valP} / ${valR})`;
    }

    setResults({ v: resV, i: resI, r: resR, p: resP, formula });
    
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7"]
    });
  };

  useEffect(() => {
    calculate();
  }, [v, i, r, p, activeInputs]);

  const clear = () => {
    setV(""); setI(""); setR(""); setP("");
    setActiveInputs([]);
    setResults(null);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        {/* Input Master Panel */}
        <div className="calc-input-section">
          <div className="calc-input-group mb-6">
            <label className="calc-label uppercase tracking-widest text-xs opacity-70">Parametre Girişi</label>
            <p className="text-[10px] text-muted font-bold uppercase mb-4">
              {activeInputs.length < 2 
                ? `Lütfen hesaplama için ${2 - activeInputs.length} parametre daha girin.` 
                : "Hesaplama 2 parametre üzerinden anlık yapılıyor."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { n: "v", l: "GERİLİM (VOLTAJ)", u: "V", c: "accent" },
                { n: "i", l: "AKIM (AMPER)", u: "A", c: "success" },
                { n: "r", l: "DİRENÇ (OHM)", u: "Ω", c: "warning" },
                { n: "p", l: "GÜÇ (WATT)", u: "W", c: "danger" }
              ].map((item) => (
                <div key={item.n} className={`calc-input-group transition-all duration-300 ${activeInputs.includes(item.n) ? "opacity-100" : "opacity-60"}`}>
                  <label className="calc-label text-[10px]">{item.l}</label>
                  <div className="calc-input-wrapper">
                    <input 
                      type="number" 
                      value={item.n === "v" ? v : item.n === "i" ? i : item.n === "r" ? r : p}
                      onChange={(e) => handleInput(item.n, e.target.value)}
                      className={`calc-input has-unit ${activeInputs.includes(item.n) ? "border-accent-primary" : ""}`}
                      placeholder="0"
                    />
                    <span className="calc-unit font-bold">{item.u}</span>
                    {activeInputs.includes(item.n) && (
                      <span className="absolute -top-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-[9px] font-black text-white shadow-lg">
                        {activeInputs.indexOf(item.n) + 1}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={clear}
              className="calc-btn-reset w-full mt-8"
            >
              ↺ Değerleri Sıfırla
            </button>
          </div>
        </div>

        {/* Results / Analysis Panel */}
        <div className="calc-result-section">
          {results ? (
            <div className="calc-result-panel animate-result h-full">
              <div className="calc-result-header">🔢 Devre Analizi Özeti</div>
              <div className="calc-result-body">
                <div className="grid grid-cols-2 gap-3 mb-6">
                   {[
                     { v: results.v, l: "Voltaj", u: "V", c: "accent", s: activeInputs.includes("v") },
                     { v: results.i, l: "Akım", u: "A", c: "success", s: activeInputs.includes("i") },
                     { v: results.r, l: "Direnç", u: "Ω", c: "warning", s: activeInputs.includes("r") },
                     { v: results.p, l: "Güç", u: "W", c: "danger", s: activeInputs.includes("p") }
                   ].map((r, idx) => (
                      <div key={idx} className={`calc-result-card !p-4 ${r.s ? "opacity-50 grayscale" : ""}`}>
                         <div className="calc-result-card-label">{r.l}</div>
                         <div className={`calc-result-card-value !text-xl ${r.c}`}>
                            {r.v.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
                         </div>
                         <div className="calc-result-card-unit">{r.u}</div>
                      </div>
                   ))}
                </div>

                <div className="calc-result-section mt-auto border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Çözüm Yolu</span>
                  </div>
                  <div className="calc-info-box !mt-0 !mb-0 !bg-accent-glow/30 !border-accent-primary/20">
                    <span className="calc-info-box-text font-mono italic text-[11px] accent">
                      {results.formula}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="calc-result-panel h-full flex flex-col items-center justify-center text-center opacity-40 border-dashed">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">
                Analiz Başlatmak İçin<br/>2 Değer Girin
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📘</span>
        <span className="calc-info-box-text">
          <b>Ohm Kanunu (V=IR)</b>, elektrik devrelerinin temel prensibidir. Bu araç girdiğiniz son 2 veriyi baz alarak diğer parametreleri anlık hesaplar. DC devreler ve güç faktörünün 1 olduğu AC devreler için uygundur.
        </span>
      </div>
    </div>
  );
}
