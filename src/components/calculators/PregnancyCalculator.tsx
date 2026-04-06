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
        <button className="calc-btn-calculate" onClick={calculate}>🤰 Gebeliği Takip Et</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel animate-result">
          <div className="calc-result-header">🤰 Gebelik Takip Özeti</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini Doğum Tarihi</div>
              <div className="calc-result-hero-value accent">{result.dueDate}</div>
              <div className="calc-result-hero-sub" style={{ color: result.trimesterColor }}>{result.trimester}</div>
            </div>

            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">Haftalık İlerleme</div>
                <div className="calc-result-card-value" style={{ color: result.trimesterColor }}>{result.weeks}</div>
                <div className="calc-result-card-unit">Haftalık</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Kalan Süre</div>
                <div className="calc-result-card-value">{result.daysLeft}</div>
                <div className="calc-result-card-unit">Gün</div>
              </div>
            </div>

            <div className="calc-result-section">
              <div className="calc-result-row">
                <span className="calc-result-row-label">Tamamlanma Oranı</span>
                <span className="calc-result-row-value accent">%{Math.min(100, ((result.weeks / 40) * 100)).toFixed(0)}</span>
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
        <span className="calc-info-box-text">Tahmini doğum tarihi, son adet baş tarihinden 280 gün (40 hafta) sonrasına karşılık gelir. Gebelik süreci kişiden kişiye farklılık gösterebilir, detaylar için doktorunuza başvurunuz.</span>
      </div>
    </div>
  );
}
