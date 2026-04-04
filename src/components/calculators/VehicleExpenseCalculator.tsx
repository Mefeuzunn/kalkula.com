"use client";

import React, { useState } from "react";

export function VehicleExpenseCalculator() {
  const [expenseTotal, setExpenseTotal] = useState("");
  const [rentTotal, setRentTotal] = useState("");
  const [result, setResult] = useState<{ deductible: number; kkeg: number; rentDeductible: number; rentKkeg: number } | null>(null);

  const calculate = () => {
    const e = parseFloat(expenseTotal) || 0;
    const r = parseFloat(rentTotal) || 0;

    // 2024 Kuralları:
    // 1. Genel giderlerin (yakıt, bakım, sigorta vb) en fazla %70'i gider yazılabilir. Kalan KKEG.
    // 2. Kiralama giderinde aylık kira bedelinin maksimum 26.000 TL'si gider yazılabilir. Üstü KKEG.

    const deductible = e * 0.70;
    const kkeg = e * 0.30;

    let rentDeductible = 0;
    let rentKkeg = 0;

    if (r > 26000) {
      rentDeductible = 26000;
      rentKkeg = r - 26000;
    } else {
      rentDeductible = r;
      rentKkeg = 0;
    }

    setResult({ deductible, kkeg, rentDeductible, rentKkeg });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>2024 Takvim Yılı sınırlarına göre binek araç KKEG (Kanunen Kabul Edilmeyen Gider) oranlarını hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Araç Kira Bedeli (₺)</label>
        <input type="number" value={rentTotal} onChange={e => setRentTotal(e.target.value)} className="input-field" placeholder="Örn: 30000" />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Araç Genel Giderleri Toplamı (Yakıt, Bakım, Sigorta vb.) (₺)</label>
        <input type="number" value={expenseTotal} onChange={e => setExpenseTotal(e.target.value)} className="input-field" placeholder="Örn: 10000" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Araç Giderlerini Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Gider Belgeleme Sonucu</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Gider Yazılabilen Kira Tutarı:</span>
            <span style={{ fontWeight: "bold", color: "var(--accent-primary)" }}>{result.rentDeductible.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Kira KKEG (Gider Yazılamayan):</span>
            <span style={{ fontWeight: "bold", color: "#ef4444" }}>{result.rentKkeg.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Gider Yazılabilen Genel Harcama (%70):</span>
            <span style={{ fontWeight: "bold", color: "var(--accent-primary)" }}>{result.deductible.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Genel Harcama KKEG (%30):</span>
            <span style={{ fontWeight: "bold", color: "#ef4444" }}>{result.kkeg.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
            * Kiralamada 26.000 TL sınırı aşan (KDV hariç bedel) ile işletme harcamalarında %30 KKEG kuralı (Gelir Vergisi Genel Tebliği 324) yansıtılmıştır.
          </p>
        </div>
      )}
    </div>
  );
}
