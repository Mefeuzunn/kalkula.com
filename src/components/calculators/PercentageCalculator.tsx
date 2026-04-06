"use client";

import React, { useState, useEffect } from "react";

export function PercentageCalculator() {
  const [val1, setVal1] = useState("500");
  const [val2, setVal2] = useState("20");
  const [val3, setVal3] = useState("50");
  const [val4, setVal4] = useState("200");
  const [val5, setVal5] = useState("100");
  const [val6, setVal6] = useState("150");

  const [res1, setRes1] = useState<string | null>(null);
  const [res2, setRes2] = useState<string | null>(null);
  const [res3, setRes3] = useState<string | null>(null);

  useEffect(() => {
    const x = parseFloat(val1), y = parseFloat(val2);
    if (!isNaN(x) && !isNaN(y)) setRes1(((x * y) / 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }));
    else setRes1(null);
  }, [val1, val2]);

  useEffect(() => {
    const x = parseFloat(val3), y = parseFloat(val4);
    if (!isNaN(x) && !isNaN(y) && y !== 0) setRes2(((x / y) * 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }) + "%");
    else setRes2(null);
  }, [val3, val4]);

  useEffect(() => {
    const start = parseFloat(val5), end = parseFloat(val6);
    if (!isNaN(start) && !isNaN(end) && start !== 0) {
      const change = ((end - start) / Math.abs(start)) * 100;
      setRes3((change >= 0 ? "+" : "") + change.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + "%");
    } else setRes3(null);
  }, [val5, val6]);

  const reset = () => {
    setVal1("500"); setVal2("20"); setVal3("50"); setVal4("200"); setVal5("100"); setVal6("150");
  };

  return (
    <div className="calc-wrapper">
      {/* Bölüm 1 */}
      <div className="calc-section">
        <div className="calc-section-title">📌 A sayısının %B'si kaçtır?</div>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label">A Sayısı</label>
            <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="calc-input" placeholder="500" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">B Yüzdesi</label>
            <div className="calc-input-wrapper">
              <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="calc-input has-unit" placeholder="20" />
              <span className="calc-unit">%</span>
            </div>
          </div>
        </div>
        {res1 && (
          <div className="calc-result-panel">
            <div className="calc-result-body">
              <div className="calc-result-row" style={{ borderBottom: "none" }}>
                <span className="calc-result-row-label">{val1} sayısının %{val2}'si</span>
                <span className="calc-result-row-value accent" style={{ fontSize: "1.4rem" }}>{res1}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bölüm 2 */}
      <div className="calc-section">
        <div className="calc-section-title">📌 A sayısı, B'nin yüzde kaçıdır?</div>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label">A Sayısı</label>
            <input type="number" value={val3} onChange={e => setVal3(e.target.value)} className="calc-input" placeholder="50" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">B Sayısı</label>
            <input type="number" value={val4} onChange={e => setVal4(e.target.value)} className="calc-input" placeholder="200" />
          </div>
        </div>
        {res2 && (
          <div className="calc-result-panel">
            <div className="calc-result-body">
              <div className="calc-result-row" style={{ borderBottom: "none" }}>
                <span className="calc-result-row-label">{val3}, {val4} sayısının</span>
                <span className="calc-result-row-value accent" style={{ fontSize: "1.4rem" }}>{res2}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bölüm 3 */}
      <div className="calc-section">
        <div className="calc-section-title">📌 A'dan B'ye yüzde değişim kaçtır?</div>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label">Başlangıç Değeri (A)</label>
            <input type="number" value={val5} onChange={e => setVal5(e.target.value)} className="calc-input" placeholder="100" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Son Değer (B)</label>
            <input type="number" value={val6} onChange={e => setVal6(e.target.value)} className="calc-input" placeholder="150" />
          </div>
        </div>
        {res3 && (
          <div className="calc-result-panel">
            <div className="calc-result-body">
              <div className="calc-result-row" style={{ borderBottom: "none" }}>
                <span className="calc-result-row-label">Yüzde Değişim</span>
                <span className="calc-result-row-value" style={{ fontSize: "1.4rem", color: parseFloat(res3) >= 0 ? "#22c55e" : "#ef4444" }}>{res3}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-reset" onClick={reset} style={{ flex: 1 }}>↺ Tümünü Sıfırla</button>
      </div>
    </div>
  );
}
