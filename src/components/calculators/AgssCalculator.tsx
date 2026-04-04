"use client";

import React, { useState } from "react";

export function AgssCalculator() {
  const [gkgyCorrect, setGkgyCorrect] = useState("");
  const [gkgyWrong, setGkgyWrong] = useState("");
  const [alanCorrect, setAlanCorrect] = useState("");
  const [alanWrong, setAlanWrong] = useState("");
  const [result, setResult] = useState<{ net: number; point: number } | null>(null);

  const calculate = () => {
    const gkgyC = parseFloat(gkgyCorrect) || 0;
    const gkgyW = parseFloat(gkgyWrong) || 0;
    const alanC = parseFloat(alanCorrect) || 0;
    const alanW = parseFloat(alanWrong) || 0;

    const gkgyNet = gkgyC - (gkgyW / 4);
    const alanNet = alanC - (alanW / 4);

    const totalNet = gkgyNet + alanNet;

    // Basit tahmini puan formülü: Taban Puan (~50) + (GKGY Net * 0.4) + (Alan Net * 0.5)
    // Gerçek Sınavda standart sapmaya göre değişir, bu bir simülasyondur.
    const point = 50 + (gkgyNet * 0.4) + (alanNet * 0.5);

    setResult({ net: totalNet, point: point });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Lütfen sınavdaki doğru ve yanlış sayılarınızı giriniz (4 yanlış 1 doğruyu götürür).</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Genel Yetenek ve Genel Kültür</h4>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Doğru Sayısı</label>
            <input type="number" value={gkgyCorrect} onChange={e => setGkgyCorrect(e.target.value)} className="input-field" placeholder="Örn: 20" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Yanlış Sayısı</label>
            <input type="number" value={gkgyWrong} onChange={e => setGkgyWrong(e.target.value)} className="input-field" placeholder="Örn: 5" />
          </div>
        </div>
      </div>

      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Alan Bilgisi</h4>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Doğru Sayısı</label>
            <input type="number" value={alanCorrect} onChange={e => setAlanCorrect(e.target.value)} className="input-field" placeholder="Örn: 40" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Yanlış Sayısı</label>
            <input type="number" value={alanWrong} onChange={e => setAlanWrong(e.target.value)} className="input-field" placeholder="Örn: 10" />
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Tahmini Puanı Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Tahmini AGS Puanı</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{result.point.toFixed(2)}</div>
          <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Toplam Netiniz: <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{result.net.toFixed(2)}</span></p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>* Formül varsayımsaldır. Gerçek sınavda standart sapma ve aday ortalamaları sonucu değiştirir.</p>
        </div>
      )}
    </div>
  );
}
