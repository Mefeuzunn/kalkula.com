"use client";

import React, { useState } from "react";

export function SchoolAgeCalculator() {
  const [birthYear, setBirthYear] = useState("2018");
  const [birthMonth, setBirthMonth] = useState("1");
  const [result, setResult] = useState<{ months: number; message: string; color: string } | null>(null);

  const calculate = () => {
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);

    if (y > 2000 && m >= 1 && m <= 12) {
      // MEB Referansi: Genelde Eylul sonu itibariyle cocugun baslangic ayi hesaplanir.
      // Eger bugunun donemi icin hesaplarsak eylul ayini referans alalim:
      const currentYear = new Date().getFullYear();
      // Hesaba katilacak egitim ogretim yili genelde bulundugumuz yilin eylulbaslangicidir.
      // Örnegin 2024 Eylul'e (9. ay) gore yasi:
      
      const refYear = currentYear;
      const refMonth = 9;

      let totalMonths = ((refYear - y) * 12) + (refMonth - m);
      
      // Eger egitim yilini cok gectiyse
      if (totalMonths < 0) totalMonths = 0;

      let msg = "";
      let color = "#3b82f6"; // Blue default

      if (totalMonths < 69) {
          msg = "Çocuğunuz ilkokul birinci sınıfa başlamak için yeterli ayda değil. Anaokulu kayıtları için durumunu araştırmanız önerilir.";
          color = "#eab308";
      } else if (totalMonths >= 69 && totalMonths <= 71) {
          msg = "Çocuğunuz ilkokul 1. sınıfa başlayabilir ancak veli dilekçesi ile anasınıfına da yönlendirilebilir (Kayıt hakkı veliye aittir).";
          color = "#22c55e";
      } else if (totalMonths >= 72) {
          msg = "Çocuğunuzun ilkokul 1. sınıfa zorunlu kayıt yaşı gelmiştir. İlkokula başlaması uygundur.";
          color = "#10b981"; // Green
      }

      setResult({ months: totalMonths, message: msg, color });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Milli Eğitim Bakanlığı (MEB) mevzuatına göre çocuğunuzun Eylül ayı itibariyle kaç aylık olduğunu ve ilkokula başlayıp başlayamayacağını hesaplayın.</p>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Doğum Yılı</label>
           <input type="number" value={birthYear} onChange={e => setBirthYear(e.target.value)} className="input-field" placeholder="Örn: 2018" />
        </div>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Doğum Ayı</label>
           <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)} className="input-field">
              {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                 <option key={m} value={m}>{m}. Ay</option>
              ))}
           </select>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Kayıt Durumunu Sorgula</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.color}` }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Doğum Ayı (Eylül İtibariyle)</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: result.color }}>
              {result.months} Aylık
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: "1.6" }}>
              {result.message}
           </p>
        </div>
      )}
    </div>
  );
}
