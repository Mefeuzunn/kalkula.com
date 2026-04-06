"use client";

import React, { useState, useEffect } from "react";

export function VehicleExpenseCalculator() {
  const [expenseTotal, setExpenseTotal] = useState("10000");
  const [rentTotal, setRentTotal] = useState("30000");
  const [result, setResult] = useState<{ deductible: number; kkeg: number; rentDeductible: number; rentKkeg: number } | null>(null);

  const RENT_LIMIT = 26000; // 2024 sınırı

  const calculate = () => {
    const e = parseFloat(expenseTotal) || 0;
    const r = parseFloat(rentTotal) || 0;
    if (e <= 0 && r <= 0) { setResult(null); return; }
    const deductible = e * 0.70;
    const kkeg = e * 0.30;
    const rentDeductible = Math.min(r, RENT_LIMIT);
    const rentKkeg = Math.max(0, r - RENT_LIMIT);
    setResult({ deductible, kkeg, rentDeductible, rentKkeg });
  };

  const reset = () => { setExpenseTotal("10000"); setRentTotal("30000"); setResult(null); };

  useEffect(() => { calculate(); }, [expenseTotal, rentTotal]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Aylık Araç Kira Bedeli</label>
          <div className="calc-input-wrapper">
            <input type="number" value={rentTotal} onChange={e => setRentTotal(e.target.value)} className="calc-input has-unit" placeholder="30000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Genel Giderler (Yakıt, Bakım...)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={expenseTotal} onChange={e => setExpenseTotal(e.target.value)} className="calc-input has-unit" placeholder="10000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🚗 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🚗 Araç Gider — KKEG Analizi (2024)</div>
          <div className="calc-result-body">
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="calc-result-card">
                <div className="calc-result-card-label">✅ Kira — Gider Yazılan</div>
                <div className="calc-result-card-value success" style={{ fontSize: "1.2rem" }}>{fmt(result.rentDeductible)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">❌ Kira — KKEG</div>
                <div className="calc-result-card-value danger" style={{ fontSize: "1.2rem" }}>{fmt(result.rentKkeg)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">✅ Gider — %70 Kabul</div>
                <div className="calc-result-card-value success" style={{ fontSize: "1.2rem" }}>{fmt(result.deductible)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">❌ Gider — %30 KKEG</div>
                <div className="calc-result-card-value danger" style={{ fontSize: "1.2rem" }}>{fmt(result.kkeg)}</div>
              </div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Gider Yazılabilen</span>
              <span className="calc-result-row-value success">{fmt(result.rentDeductible + result.deductible)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam KKEG</span>
              <span className="calc-result-row-value danger">{fmt(result.rentKkeg + result.kkeg)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Kiralık binek araçta KDV hariç kira bedelinin aylık {fmt(RENT_LIMIT)} üzerindeki kısmı KKEG'dir. Genel giderlerin (yakıt, bakım, sigorta) %30'u KKEG sayılır. (GVK 2024)</span>
      </div>
    </div>
  );
}
