"use client";

import React, { useState } from "react";

export function GenerationCalculator() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{ gen: string; desc: string } | null>(null);

  const calculate = () => {
    const y = parseInt(year);
    if (!y || y < 1900 || y > new Date().getFullYear()) return;

    if (y >= 1946 && y <= 1964) {
      setResult({ gen: "Baby Boomer Kuşağı", desc: "II. Dünya Savaşı sonrasında doğan, çalışkanlığı ve rekabetçiliği ile bilinen kuşak." });
    } else if (y >= 1965 && y <= 1980) {
      setResult({ gen: "X Kuşağı", desc: "Teknolojiye geçiş doneminde büyüyen, bağımsız ve uyumlu kuşak." });
    } else if (y >= 1981 && y <= 1996) {
      setResult({ gen: "Y Kuşağı (Millennial)", desc: "İnternetin yükselişiyle büyüyen, dijitale yatkın ilk kuşak." });
    } else if (y >= 1997 && y <= 2012) {
      setResult({ gen: "Z Kuşağı", desc: "Doğuştan dijital, sosyal medya bağımlısı ve küresel bakış açısına sahip kuşak." });
    } else if (y >= 2013) {
      setResult({ gen: "Alfa Kuşağı", desc: "Tamamen teknolojinin içine doğan ve en dijital kuşak." });
    } else {
      setResult({ gen: "Sessiz Kuşak veya Öncesi", desc: "Geleneksel değerlere bağlı, savaş dönemi kuşağı." });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Doğum Yılınız</label>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} className="input-field" placeholder="Örn: 1998" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Kuşağımı Bul
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
            {result.gen}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
            {result.desc}
          </p>
        </div>
      )}
    </div>
  );
}
