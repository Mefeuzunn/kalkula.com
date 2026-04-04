"use client";

import React, { useState } from "react";

export function RealReturnCalculator() {
  const [nominalRate, setNominalRate] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [result, setResult] = useState<{ realRate: number } | null>(null);

  const calculate = () => {
    const nr = parseFloat(nominalRate) / 100;
    const infl = parseFloat(inflationRate) / 100;

    if (!isNaN(nr) && !isNaN(infl)) {
      // Fisher Denklemi ile tam Reel Getiri Hesabi: (1 + r_{real}) = (1 + r_{nom}) / (1 + i)
      const realRate = ((1 + nr) / (1 + infl) - 1) * 100;
      setResult({ realRate });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Bankadan veya faizden kazandığınız "Görünür (Nominal)" faizin, enflasyon etkisinden arındırılmış gerçek getirisini (Fisher Formülü) hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Nominal Faiz Oranınız / Getiriniz (%)</label>
        <input type="number" value={nominalRate} onChange={e => setNominalRate(e.target.value)} className="input-field" placeholder="Örn: 45" step="0.1" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Dönemdeki Yıllık Enflasyon (%)</label>
        <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="input-field" placeholder="Örn: 60" step="0.1" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Gerçek (Reel) Getiriyi Bul</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.realRate >= 0 ? '#22c55e' : '#ef4444'}` }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Gerçek (Reel) Getiri Oranınız</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: result.realRate >= 0 ? "#22c55e" : "#ef4444", marginTop: "0.5rem" }}>
            %{result.realRate.toFixed(2)}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            {result.realRate >= 0 
               ? "Yatırımınız enflasyonun üzerinde bir kazanç sağlamış ve alım gücünüz gerçekten artmıştır." 
               : "Para miktarınız rakamsal olarak büyüse de enflasyonun altında kaldığı için alım gücünüz erimiştir (Reel kayıp)."}
          </p>
        </div>
      )}
    </div>
  );
}
