"use client";

import React, { useState, useEffect } from "react";

export function DayOfYearCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ dayNumber: number; daysLeft: number; percent: number; isLeap: boolean; weekNumber: number } | null>(null);

  const getWeekNumber = (d: Date) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date as any) - (yearStart as any)) / 86400000 + 1) / 7);
  };

  const calculate = () => {
    if (!date) return;
    const d = new Date(date);
    const startOfYear = new Date(d.getFullYear(), 0, 0);
    const diff = (d.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - d.getTimezoneOffset()) * 60000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayNumber = Math.floor(diff / oneDay);
    const isLeap = (d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0;
    const totalDays = isLeap ? 366 : 365;
    const daysLeft = totalDays - dayNumber;
    const percent = (dayNumber / totalDays) * 100;
    const weekNumber = getWeekNumber(d);
    setResult({ dayNumber, daysLeft, percent, isLeap, weekNumber });
  };

  const reset = () => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => { calculate(); }, [date]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Hesaplanacak Tarih</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="calc-input" />
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📅 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Bugüne Dön</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📅 Tarih Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Yılın Kaçıncı Günü</div>
              <div className="calc-result-hero-value">{result.dayNumber}.</div>
              <div className="calc-result-hero-sub">Yılın %{result.percent.toFixed(1)}'i tamamlanmış</div>
            </div>
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">⏳ Kalan Gün</div>
                <div className="calc-result-card-value">{result.daysLeft}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">📆 Hafta No</div>
                <div className="calc-result-card-value">{result.weekNumber}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">🔁 Artık Yıl</div>
                <div className="calc-result-card-value" style={{ fontSize: "1rem", paddingTop: "0.25rem" }}>
                  {result.isLeap ? "✅ Evet" : "❌ Hayır"}
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <div className="calc-scale-bar">
                <div className="calc-scale-fill" style={{ width: `${result.percent}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
