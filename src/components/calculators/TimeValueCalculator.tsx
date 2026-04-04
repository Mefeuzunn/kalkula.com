"use client";

import React, { useState } from "react";

export function TimeValueCalculator() {
  const [pv, setPv] = useState("");
  const [inflation, setInflation] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ futureValue: number; lossPercent: number } | null>(null);

  const calculate = () => {
    const presentValue = parseFloat(pv);
    const infl = parseFloat(inflation) / 100;
    const y = parseFloat(years);

    if (presentValue > 0 && infl > 0 && y > 0) {
      // Paranın gelecekteki 'nominal' karşılığı için: FV = PV * (1 + inflation)^years 
      // (Aynı "alım gücünü" korumak için gereken para)
      const futureValue = presentValue * Math.pow(1 + infl, y);
      
      // Bugünkü paranın alım gücü kaybı = 1 - (PV / FV)
      const lossPercent = (1 - (presentValue / futureValue)) * 100;

      setResult({ futureValue, lossPercent });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Paranızın zaman içindeki alım gücünü enflasyon karşısında test edin. Aynı şeyleri alabilmek için gelecekteki parasal değeri hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Paranın Bugünkü Değeri (₺)</label>
        <input type="number" value={pv} onChange={e => setPv(e.target.value)} className="input-field" placeholder="Örn: 10000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Beklenen Yıllık Enflasyon (%)</label>
          <input type="number" value={inflation} onChange={e => setInflation(e.target.value)} className="input-field" placeholder="Örn: 40" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>İleriye Dönük Yıl</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 3" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Zaman Değerini Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Alım Gücünü Korumak İçin Gereken Para</h3>
           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-primary)", marginTop: "0.5rem" }}>
              {result.futureValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
           </div>
           
           <div style={{ marginTop: "1.5rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "1rem", borderRadius: "8px" }}>
              <p style={{ color: "#ef4444", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Alım Gücü Kaybı Etkisi</p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                Paranızı hiçbir şeye yatırmayıp bir kenarda tutarsanız, bugünkü <span style={{ fontWeight: "bold" }}>{pv} ₺</span>'niz, {years} yıl sonra yukarıdaki rakamla alınabilecek mal/hizmet kadar bir enflasyon erimesine uğrayacaktır. Paranın satın alma gücündeki nispi değer kaybı: <span style={{ fontWeight: "bold", color: "#ef4444" }}>%{result.lossPercent.toFixed(2)}</span>
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
