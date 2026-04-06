"use client";

import React, { useState, useEffect } from "react";

export function MebEkDersCalculator() {
  const [daytimeHours, setDaytimeHours] = useState("15");
  const [nightHours, setNightHours] = useState("0");
  const [dykDayHours, setDykDayHours] = useState("0");
  const [dykNightHours, setDykNightHours] = useState("0");
  const [specialEducation, setSpecialEducation] = useState(false);
  const [educationLevel, setEducationLevel] = useState<"none" | "master" | "phd">("none");
  const [taxBracket, setTaxBracket] = useState<"15" | "20" | "27">("15");

  const [results, setResults] = useState<{
    grossTotal: number;
    netTotal: number;
    incomeTax: number;
    stampTax: number;
    details: { label: string; gross: number; net: number }[];
  } | null>(null);

  // 2026 April Updated Rates (approx based on katsayı 1.258071)
  const RATES_2026 = {
    DAY: 185.45,
    NIGHT: 198.70,
    DYK_DAY: 370.90,
    DYK_NIGHT: 397.40,
    STAMP_TAX_RATE: 0.00759,
  };

  const calculate = () => {
    const d = parseFloat(daytimeHours) || 0;
    const n = parseFloat(nightHours) || 0;
    const dykD = parseFloat(dykDayHours) || 0;
    const dykN = parseFloat(dykNightHours) || 0;

    const multiplier = specialEducation ? 1.25 : 1;
    const eduBonus = educationLevel === "master" ? 0.07 : educationLevel === "phd" ? 0.20 : 0;
    const taxRate = parseFloat(taxBracket) / 100;

    const calcNet = (gross: number) => {
      const incomeTax = gross * taxRate;
      const stampTax = gross * RATES_2026.STAMP_TAX_RATE;
      return gross - incomeTax - stampTax;
    };

    const items = [
      { label: "Gündüz", gross: d * RATES_2026.DAY * multiplier * (1 + eduBonus) },
      { label: "Gece / Hafta Sonu", gross: n * RATES_2026.NIGHT * multiplier * (1 + eduBonus) },
      { label: "DYK Gündüz", gross: dykD * RATES_2026.DYK_DAY * (SpecialEducationInDYK(specialEducation) ? 1.25 : 1) * (1 + eduBonus) },
      { label: "DYK Gece", gross: dykN * RATES_2026.DYK_NIGHT * (SpecialEducationInDYK(specialEducation) ? 1.25 : 1) * (1 + eduBonus) },
    ];

    const grossTotal = items.reduce((acc, curr) => acc + curr.gross, 0);
    const incomeTaxTotal = grossTotal * taxRate;
    const stampTaxTotal = grossTotal * RATES_2026.STAMP_TAX_RATE;
    const netTotal = grossTotal - incomeTaxTotal - stampTaxTotal;

    setResults({
      grossTotal,
      netTotal,
      incomeTax: incomeTaxTotal,
      stampTax: stampTaxTotal,
      details: items.filter(i => i.gross > 0).map(i => ({ ...i, net: calcNet(i.gross) }))
    });
  };

  const SpecialEducationInDYK = (isSpecial: boolean) => isSpecial; // Logic helper

  const reset = () => {
    setDaytimeHours("15");
    setNightHours("0");
    setDykDayHours("0");
    setDykNightHours("0");
    setSpecialEducation(false);
    setEducationLevel("none");
    setTaxBracket("15");
    setResults(null);
  };

  useEffect(() => { calculate(); }, [daytimeHours, nightHours, dykDayHours, dykNightHours, specialEducation, educationLevel, taxBracket]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Gündüz (Haftalık)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={daytimeHours} onChange={e => setDaytimeHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">DERS</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Gece / Hafta Sonu</label>
          <div className="calc-input-wrapper">
            <input type="number" value={nightHours} onChange={e => setNightHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">DERS</span>
          </div>
        </div>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">DYK Gündüz</label>
          <div className="calc-input-wrapper">
            <input type="number" value={dykDayHours} onChange={e => setDykDayHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">DERS</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">DYK Gece</label>
          <div className="calc-input-wrapper">
            <input type="number" value={dykNightHours} onChange={e => setDykNightHours(e.target.value)} className="calc-input has-unit" min="0" />
            <span className="calc-unit">DERS</span>
          </div>
        </div>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Eğitim Seviyesi</label>
          <select value={educationLevel} onChange={e => setEducationLevel(e.target.value as any)} className="calc-input">
            <option value="none">Lisans</option>
            <option value="master">Yüksek Lisans (+%7)</option>
            <option value="phd">Doktora (+%20)</option>
          </select>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Vergi Dilimi</label>
          <select value={taxBracket} onChange={e => setTaxBracket(e.target.value as any)} className="calc-input">
            <option value="15">%15 (Yıl Başlangıcı)</option>
            <option value="20">%20</option>
            <option value="27">%27</option>
          </select>
        </div>
      </div>

      <div className="calc-input-group">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={specialEducation} onChange={e => setSpecialEducation(e.target.checked)} style={{ width: "1.2rem", height: "1.2rem" }} />
          <div>
            <div className="font-bold text-sm">Özel Eğitim / Cezaevi (+%25)</div>
            <div className="text-xs text-muted">Özel eğitim öğretmenleri veya cezaevinde görevli olanlar için arttırımlı ücret</div>
          </div>
        </label>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>👨‍🏫 Ek Ders Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📅 Aylık Tahmini Ek Ders Ücreti (4 Hafta)</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Toplam Net Alınacak</div>
              <div className="calc-result-hero-value" style={{ color: "#3b82f6" }}>{fmt(results.netTotal * 4)}</div>
              <div className="calc-result-hero-sub">Brüt Toplam: {fmt(results.grossTotal * 4)}</div>
            </div>

            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">Gelir Vergisi (Dilim: %{taxBracket})</div>
                <div className="calc-result-card-value text-red-600">-{fmt(results.incomeTax * 4)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Damga Vergisi (0.00759)</div>
                <div className="calc-result-card-value text-red-600">-{fmt(results.stampTax * 4)}</div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-3">Haftalık Detaylar</div>
              {results.details.map((item, idx) => (
                <div key={idx} className="calc-result-row">
                  <span className="calc-result-row-label">{item.label}</span>
                  <span className="calc-result-row-value">{fmt(item.net)} <span className="text-[10px] text-muted">(Net)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Bu hesaplama 2026 Ocak memur maaş katsayıları baz alınarak yapılmıştır. Hesaplamalar 4 haftalık (1 ay) üzerinden tahmin edilmektedir. Bordro işlemleri sırasında vergi matrahınıza göre küçük farklar oluşabilir.</span>
      </div>
    </div>
  );
}
