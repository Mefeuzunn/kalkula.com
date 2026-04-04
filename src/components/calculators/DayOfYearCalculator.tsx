"use client";

import React, { useState, useEffect } from "react";

export function DayOfYearCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ dayNumber: number; daysLeft: number; percent: number } | null>(null);

  useEffect(() => {
    // Current date default
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  }, []);

  const calculate = () => {
    if (!date) return;
    const d = new Date(date);
    const startOfYear = new Date(d.getFullYear(), 0, 0);
    const diff = (d.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    
    const oneDay = 1000 * 60 * 60 * 24;
    const dayNumber = Math.floor(diff / oneDay);
    
    // Check leap year
    const isLeap = (d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0;
    const totalDays = isLeap ? 366 : 365;
    
    const daysLeft = totalDays - dayNumber;
    const percent = (dayNumber / totalDays) * 100;

    setResult({ dayNumber, daysLeft, percent });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hesaplanacak Tarih</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>Seçilen Tarih Analizi</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
            {result.dayNumber}. Gün
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginTop: "0.5rem" }}>
            Yılın kalan bölümü: <span style={{ fontWeight: "bold" }}>{result.daysLeft} gün</span>
          </p>
          
          <div style={{ width: "100%", height: "8px", background: "var(--border)", borderRadius: "4px", marginTop: "1.5rem", overflow: "hidden" }}>
             <div style={{ width: `${result.percent}%`, height: "100%", background: "var(--accent-primary)" }}></div>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Seçilen yılın %{result.percent.toFixed(1)}'lik kısmı bu tarihte tamamlanmış oluyor.
          </p>
        </div>
      )}
    </div>
  );
}
