"use client";

import React, { useState, useEffect } from "react";

export function AkademisyenEkDersCalculator() {
  const [title, setTitle] = useState<"prof" | "assoc" | "asst" | "lect">("prof");
  const [daytimeHours, setDaytimeHours] = useState("10");
  const [nightHours, setNightHours] = useState("0");
  const [taxBracket, setTaxBracket] = useState<"15" | "20" | "27">("15");

  const [results, setResults] = useState<{
    hourlyGrossDay: number;
    hourlyGrossNight: number;
    monthlyNet: number;
    totalGross: number;
    totalTax: number;
  } | null>(null);

  // 2026 January Points & Katsayı
  const KATSAYI_2026 = 1.387871;
  const POINTS = {
    prof: 300,
    assoc: 250,
    asst: 200,
    lect: 160,
  };
  const STAMP_TAX_RATE = 0.00759;

  const calculate = () => {
    const point = POINTS[title];
    const d = parseFloat(daytimeHours) || 0;
    const n = parseFloat(nightHours) || 0;
    const taxRate = parseFloat(taxBracket) / 100;

    const hourlyGrossDay = point * KATSAYI_2026;
    const hourlyGrossNight = hourlyGrossDay * 1.5;

    const weeklyGross = (d * hourlyGrossDay) + (n * hourlyGrossNight);
    const monthlyGross = weeklyGross * 4;

    const incomeTax = monthlyGross * taxRate;
    const stampTax = monthlyGross * STAMP_TAX_RATE;
    const monthlyNet = monthlyGross - incomeTax - stampTax;

    setResults({
      hourlyGrossDay,
      hourlyGrossNight,
      monthlyNet,
      totalGross: monthlyGross,
      totalTax: incomeTax + stampTax
    });
  };

  const reset = () => {
    setTitle("prof");
    setDaytimeHours("10");
    setNightHours("0");
    setTaxBracket("15");
    setResults(null);
  };

  useEffect(() => { calculate(); }, [title, daytimeHours, nightHours, taxBracket]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  const getTitleName = (t: string) => {
    switch(t) {
      case "prof": return "Profesör";
      case "assoc": return "Doçent";
      case "asst": return "Dr. Öğretim Üyesi";
      case "lect": return "Öğretim Görevlisi";
      default: return "";
    }
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Akademik Unvan</label>
        <select value={title} onChange={e => setTitle(e.target.value as any)} className="calc-input">
          <option value="prof">Profesör (300 Puan)</option>
          <option value="assoc">Doçent (250 Puan)</option>
          <option value="asst">Dr. Öğretim Üyesi (200 Puan)</option>
          <option value="lect">Öğretim Görevlisi (160 Puan)</option>
        </select>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Haftalık Gündüz Saati</label>
          <div className="calc-input-wrapper">
            <input type="number" value={daytimeHours} onChange={e => setDaytimeHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">SAAT</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Haftalık Gece / T2 Saati</label>
          <div className="calc-input-wrapper">
            <input type="number" value={nightHours} onChange={e => setNightHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">SAAT</span>
          </div>
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Vergi Dilimi</label>
        <select value={taxBracket} onChange={e => setTaxBracket(e.target.value as any)} className="calc-input">
          <option value="15">%15 (Başlangıç)</option>
          <option value="20">%20</option>
          <option value="27">%27</option>
        </select>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🎓 Ek Ders Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📑 Akademik Ek Ders Detayları (Aylık Tahmini)</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">{getTitleName(title)} - Toplam Net</div>
              <div className="calc-result-hero-value" style={{ color: "#8b5cf6" }}>{fmt(results.monthlyNet)}</div>
              <div className="calc-result-hero-sub">Brüt Toplam: {fmt(results.totalGross)}</div>
            </div>

            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">Gündüz Saatlik (Brüt)</div>
                <div className="calc-result-card-value">{fmt(results.hourlyGrossDay)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Gece Saatlik (Brüt)</div>
                <div className="calc-result-card-value">{fmt(results.hourlyGrossNight)}</div>
              </div>
            </div>

            <div className="calc-result-row" style={{ marginTop: "1rem" }}>
              <span className="calc-result-row-label">Toplam Vergi Kesintisi</span>
              <span className="calc-result-row-value danger">-{fmt(results.totalTax)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📜</span>
        <span className="calc-info-box-text">2026 yılı memur maaş katsayısı (1.387871) üzerinden hesaplanmıştır. Gece/Hafta sonu dersleri için 1.5x çarpanı uygulanmıştır. Bordronuzdaki diğer kesintiler (emekli keseneği vb.) farklılık yaratabilir.</span>
      </div>
    </div>
  );
}
