"use client";

import React, { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", label: "Dolar", emoji: "🇺🇸", rate: 1 },
  { code: "TRY", label: "Türk Lirası", emoji: "🇹🇷", rate: 32.5 },
  { code: "EUR", label: "Euro", emoji: "🇪🇺", rate: 0.92 },
  { code: "GBP", label: "Sterlin", emoji: "🇬🇧", rate: 0.79 },
  { code: "JPY", label: "Japon Yeni", emoji: "🇯🇵", rate: 151.2 },
  { code: "CHF", label: "İsviçre Frangı", emoji: "🇨🇭", rate: 0.90 },
];

export function CurrencyCalculator() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TRY");
  const [result, setResult] = useState<{ converted: number; rate: number } | null>(null);

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0) { setResult(null); return; }
    const fromRate = CURRENCIES.find(c => c.code === from)!.rate;
    const toRate = CURRENCIES.find(c => c.code === to)!.rate;
    const amountInUsd = qty / fromRate;
    const converted = amountInUsd * toRate;
    const rate = converted / qty;
    setResult({ converted, rate });
  };

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };
  const reset = () => { setAmount("1000"); setFrom("USD"); setTo("TRY"); setResult(null); };

  useEffect(() => { calculate(); }, [amount, from, to]);

  const fromCur = CURRENCIES.find(c => c.code === from)!;
  const toCur = CURRENCIES.find(c => c.code === to)!;

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Çevrilecek Miktar</label>
        <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input" placeholder="1000" min="0" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.75rem", alignItems: "end" }}>
        <div className="calc-input-group">
          <label className="calc-label">Kaynak Para Birimi</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className="calc-select">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.emoji} {c.code} — {c.label}</option>)}
          </select>
        </div>
        <button onClick={swap} className="calc-btn-reset" style={{ marginBottom: 0, height: "52px" }} title="Dövizleri Ters Çevir">⇄</button>
        <div className="calc-input-group">
          <label className="calc-label">Hedef Para Birimi</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="calc-select">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.emoji} {c.code} — {c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>💱 Döviz Çevir</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💱 Dönüştürme Sonucu</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">{fromCur.emoji} {amount} {from} =</div>
              <div className="calc-result-hero-value">{result.converted.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}</div>
              <div className="calc-result-hero-sub">{toCur.emoji} {toCur.label}</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">1 {from} =</span>
              <span className="calc-result-row-value accent">{result.rate.toFixed(4)} {to}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚠️</span>
        <span className="calc-info-box-text">Gösterilen kurlar gerçek zamanlı değil, sabit referans oranlardır. Anlık kur için TCMB veya yetkili döviz bürosu güncel kurlarını kullanın.</span>
      </div>
    </div>
  );
}
