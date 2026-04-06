"use client";

import React, { useState, useEffect } from "react";

const GENERATIONS = [
  { min: 1900, max: 1927, gen: "En Büyük Kuşak (Greatest)", desc: "1929 Büyük Buhranını ve 2. Dünya Savaşını yaşamış nesil.", color: "#64748b" },
  { min: 1928, max: 1945, gen: "Sessiz Kuşak", desc: "Geleneksel değerlere bağlı, disiplinli çalışan kuşağı.", color: "#78716c" },
  { min: 1946, max: 1964, gen: "Baby Boomer Kuşağı", desc: "Savaş sonrası nüfus patlamasında doğan, sadakat ve iş güvenliği odaklı rekabetçi nesil.", color: "#0ea5e9" },
  { min: 1965, max: 1980, gen: "X Kuşağı", desc: "Analogdan dijitale geçişi yaşayan, bağımsız, iş-yaşam dengesini önemseyen köprü nesil.", color: "#f97316" },
  { min: 1981, max: 1996, gen: "Y Kuşağı (Millennial)", desc: "İnternetin yükselişiyle büyüyen, esneklik arayan, teknolojiye yatkın ilk dijital nesil.", color: "#8b5cf6" },
  { min: 1997, max: 2012, gen: "Z Kuşağı", desc: "Doğuştan dijital, akıllı telefonlarla büyüyen, hızlı içerik tüketen global bakış açılı nesil.", color: "#ec4899" },
  { min: 2013, max: 2100, gen: "Alfa Kuşağı", desc: "Tamamen yapay zeka jenerasyonu, tabletlerle büyüyen en dijital çocuklar.", color: "#14b8a6" },
];

export function GenerationCalculator() {
  const [year, setYear] = useState("1998");
  const [result, setResult] = useState<{ gen: string; desc: string; color: string } | null>(null);

  const calculate = () => {
    const y = parseInt(year);
    if (!y || y < 1900 || y > new Date().getFullYear() + 10) { setResult(null); return; }
    
    const found = GENERATIONS.find(g => y >= g.min && y <= g.max);
    if (found) {
      setResult({ gen: found.gen, desc: found.desc, color: found.color });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setYear("1998"); setResult(null); };

  useEffect(() => { calculate(); }, [year]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Doğum Yılınız</label>
        <div className="calc-input-wrapper">
          <input type="number" value={year} onChange={e => setYear(e.target.value)} className="calc-input" placeholder="1998" min="1900" max="2100" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🧑‍🤝‍🧑 Kuşağımı Bul</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-hero" style={{ background: `linear-gradient(135deg, ${result.color}22, transparent)`, marginBottom: 0 }}>
            <div className="calc-result-hero-label" style={{ color: result.color, letterSpacing: "0.2em" }}>SİZİN KUŞAĞINIZ</div>
            <div className="calc-result-hero-value" style={{ color: result.color, fontSize: "2.5rem" }}>
              {result.gen}
            </div>
            <div className="calc-result-hero-sub" style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "1rem" }}>
              {result.desc}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🌍</span>
        <span className="calc-info-box-text">Kuşak aralıkları kültürel ve akademik açıdan değişkenlik gösterebilir. Yukarıdaki aralıklar Pew Research standartlarına göre optimize edilmiştir.</span>
      </div>
    </div>
  );
}
