"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [grossSalary, setGrossSalary] = useState("30000");
  const [severanceCeiling, setSeveranceCeiling] = useState("35058.58"); // July 2024 Ceiling
  const [includeNotice, setIncludeNotice] = useState(true);
  
  const [results, setResults] = useState<{
    durationYears: number;
    durationMonths: number;
    durationDays: number;
    totalDays: number;
    grossSeverance: number;
    stampTaxSeverance: number;
    netSeverance: number;
    noticeWeeks: number;
    grossNotice: number;
    incomeTaxNotice: number;
    stampTaxNotice: number;
    netNotice: number;
    grandTotal: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const salary = parseFloat(grossSalary) || 0;
    const ceiling = parseFloat(severanceCeiling) || 35058.58;

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setResults(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const remainingDays = totalDays % 30;

    const baseSalaryForSeverance = Math.min(salary, ceiling);
    const grossSeverance = (totalDays / 365) * baseSalaryForSeverance;
    const stampTaxRate = 0.00759;
    const stampTaxSeverance = grossSeverance * stampTaxRate;
    const netSeverance = totalDays >= 365 ? (grossSeverance - stampTaxSeverance) : 0;

    let noticeWeeks = 0;
    if (totalDays < 183) noticeWeeks = 2; // < 6 months
    else if (totalDays < 548) noticeWeeks = 4; // 6m - 1.5y
    else if (totalDays < 1095) noticeWeeks = 6; // 1.5y - 3y
    else noticeWeeks = 8; // > 3y

    const dailyGross = salary / 30;
    const grossNotice = (noticeWeeks * 7) * dailyGross;
    const incomeTaxRate = 0.15;
    const incomeTaxNotice = grossNotice * incomeTaxRate;
    const stampTaxNotice = grossNotice * stampTaxRate;
    const netNotice = includeNotice ? (grossNotice - incomeTaxNotice - stampTaxNotice) : 0;

    setResults({
      durationYears: years,
      durationMonths: months,
      durationDays: remainingDays,
      totalDays,
      grossSeverance,
      stampTaxSeverance,
      netSeverance,
      noticeWeeks,
      grossNotice,
      incomeTaxNotice,
      stampTaxNotice,
      netNotice,
      grandTotal: netSeverance + netNotice
    });

    if (totalDays >= 365) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ["#10b981", "#3b82f6"] });
    }
  };

  const reset = () => {
    setStartDate("2020-01-01");
    setEndDate(new Date().toISOString().split('T')[0]);
    setGrossSalary("30000");
    setSeveranceCeiling("35058.58");
    setIncludeNotice(true);
    setResults(null);
  };

  useEffect(() => { calculate(); }, [startDate, endDate, grossSalary, severanceCeiling, includeNotice]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">İşe Giriş Tarihi</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="calc-input" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">İşten Çıkış Tarihi</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="calc-input" />
        </div>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Son Brüt Maaş (TL)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={grossSalary} onChange={e => setGrossSalary(e.target.value)} className="calc-input has-unit" placeholder="30000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Kıdem Tazminatı Tavanı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={severanceCeiling} onChange={e => setSeveranceCeiling(e.target.value)} className="calc-input has-unit" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
      </div>

      <div className="calc-input-group">
        <label className="flex items-center gap-3 cursor-pointer" style={{ userSelect: "none" }}>
          <input type="checkbox" checked={includeNotice} onChange={e => setIncludeNotice(e.target.checked)} style={{ width: "1.2rem", height: "1.2rem" }} />
          <div>
            <div className="font-bold text-sm">İhbar Tazminatını Dahil Et</div>
            <div className="text-xs text-muted">Kullanılmayan ihbar süresi tazminatını hesaplar</div>
          </div>
        </label>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚖️ Tazminatı Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">⚖️ Tazminat Hesaplama Sonucu</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Toplam Net Tahsilat</div>
              <div className="calc-result-hero-value" style={{ color: "#10b981" }}>{fmt(results.grandTotal)}</div>
              <div className="calc-result-hero-sub">Toplam Çalışma Süresi: {results.durationYears} Yıl, {results.durationMonths} Ay, {results.durationDays} Gün</div>
            </div>

            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">Net Kıdem Tazminatı</div>
                <div className="calc-result-card-value text-emerald-600">
                  {results.totalDays < 365 ? "Yetersiz Süre (1 Yıl Altı)" : fmt(results.netSeverance)}
                </div>
                {results.totalDays >= 365 && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Brüt: {fmt(results.grossSeverance)}</div>}
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Net İhbar Tazminatı</div>
                <div className="calc-result-card-value text-blue-600">
                  {includeNotice ? fmt(results.netNotice) : "Dahil Edilmedi"}
                </div>
                {includeNotice && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Süre: {results.noticeWeeks} Hafta</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Bu hesaplayıcı 4857 sayılı İş Kanunu'na uygundur. Kıdem tazminatı tavanı her 6 ayda bir güncellenir. Damga vergisi oranı (%0.759) ve ihbar tazminatı gelir vergisi (%15) standart varsayılanlardır.</span>
      </div>
    </div>
  );
}
