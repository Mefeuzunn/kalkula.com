"use client";

import React, { useState, useEffect } from "react";

export function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<{ dueDate: string; weeks: number; daysLeft: number; trimester: string; trimesterColor: string } | null>(null);

  const calculate = () => {
    if (!lastPeriod) { setResult(null); return; }
    const date = new Date(lastPeriod);
    const today = new Date();
    const dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
    const diffTime = today.getTime() - date.getTime();
    const weeks = Math.max(0, Math.min(42, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))));
    const daysLeft = Math.max(0, Math.round((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let trimester = "1. Trimester";
    let trimesterColor = "#3b82f6";
    if (weeks >= 14 && weeks < 28) { trimester = "2. Trimester"; trimesterColor = "#22c55e"; }
    else if (weeks >= 28) { trimester = "3. Trimester"; trimesterColor = "#f59e0b"; }

    setResult({ dueDate: dueDate.toLocaleDateString("tr-TR"), weeks, daysLeft, trimester, trimesterColor });
  };

  const reset = () => {
    const today = new Date().toISOString().split("T")[0];
    setLastPeriod(today);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setLastPeriod(today);
  }, []);

  useEffect(() => { calculate(); }, [lastPeriod]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Son Adet Tarihiniz (SAT)</label>
        <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="calc-input" />
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🤱 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🤰 Gebelik Takibi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini Doğum Tarihi</div>
              <div className="calc-result-hero-value" style={{ color: "var(--accent-primary)", fontSize: "2.25rem" }}>{result.dueDate}</div>
              <div className="calc-result-hero-sub" style={{ color: result.trimesterColor, fontWeight: 700 }}>{result.trimester}</div>
            </div>
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">📅 Gebelik Haftası</div>
                <div className="calc-result-card-value" style={{ color: result.trimesterColor }}>{result.weeks}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>hafta</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">⏳ Kalan Süre</div>
                <div className="calc-result-card-value">{result.daysLeft}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>gün</div>
              </div>
            </div>
            <div style={{ padding: "0.5rem 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span className="calc-result-row-label">Gebelik Süreci</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: result.trimesterColor }}>%{Math.min(100, ((result.weeks / 40) * 100)).toFixed(0)}</span>
              </div>
              <div className="calc-scale-bar">
                <div className="calc-scale-fill" style={{ width: `${Math.min(100, (result.weeks / 40) * 100)}%`, background: result.trimesterColor }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🏥</span>
        <span className="calc-info-box-text">Tahmini doğum tarihi, son adet baş tarihinden 280 gün (40 hafta) sonrasına karşılık gelir. Kesin bilgi için doktorunuza danışınız.</span>
      </div>
    </div>
  );
}
