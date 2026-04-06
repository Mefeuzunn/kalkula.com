"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface LiveRates {
  USD: number;
  EUR: number;
  XAU: number; // Gram 24k in TRY
  XAG: number; // Gram Silver in TRY
  TRY: number;
  lastUpdated: string;
}

export function CurrencyCommodityCalculator() {
  const [rates, setRates] = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("1");
  const [selectedUnit, setSelectedUnit] = useState<"USD" | "EUR" | "XAU_GRAM" | "XAU_CEYREK" | "XAU_YARIM" | "XAU_TAM" | "XAU_ATA">("USD");

  const [results, setResults] = useState<{
    tryValue: number;
    description: string;
    metrics: { label: string; value: string }[];
  } | null>(null);

  // Constants for Gold Weights (Standard TR)
  const GOLD_UNITS = {
    XAU_GRAM: { name: "Gram Altın (24k)", weight: 1, carat: 24 },
    XAU_CEYREK: { name: "Çeyrek Altın (22k)", weight: 1.606, carat: 22 }, // Fine gold equiv
    XAU_YARIM: { name: "Yarım Altın (22k)", weight: 3.212, carat: 22 },   // Fine gold equiv
    XAU_TAM: { name: "Tam Altın (22k)", weight: 6.424, carat: 22 },     // Fine gold equiv
    XAU_ATA: { name: "Ata Altın (22k)", weight: 6.608, carat: 22 },      // Fine gold equiv
  };

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/rates");
      const data = await res.json();
      if (data.tryRates) {
        setRates({
          USD: data.tryRates.USD,
          EUR: data.tryRates.EUR,
          XAU: data.tryRates.XAU,
          XAG: data.tryRates.XAG,
          TRY: 1,
          lastUpdated: data.lastUpdated,
        });
      }
    } catch (e) {
      console.error("Failed to load rates", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRates(); }, []);

  const calculate = () => {
    if (!rates) return;
    const qty = parseFloat(amount) || 0;
    let tryValue = 0;
    let desc = "";
    const metrics: { label: string; value: string }[] = [];

    if (selectedUnit === "USD") {
      tryValue = qty * rates.USD;
      desc = `${qty} ABD Doları`;
    } else if (selectedUnit === "EUR") {
      tryValue = qty * rates.EUR;
      desc = `${qty} Euro`;
    } else if (selectedUnit.startsWith("XAU")) {
      const g = GOLD_UNITS[selectedUnit as keyof typeof GOLD_UNITS];
      tryValue = qty * g.weight * rates.XAU;
      desc = `${qty} Adet ${g.name}`;
      metrics.push({ label: "Has Altın Karşılığı", value: `${(qty * g.weight).toFixed(3)} gr` });
      metrics.push({ label: "Ayar", value: `${g.carat}K` });
    }

    setResults({ tryValue, description: desc, metrics });
    if (qty > 100) confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
  };

  useEffect(() => { calculate(); }, [amount, selectedUnit, rates]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-muted">KUR VERİLERİ YÜKLENİYOR...</div>;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Varlık Türü</label>
          <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value as any)} className="calc-select">
            <optgroup label="Döviz">
              <option value="USD">ABD Doları ($)</option>
              <option value="EUR">Euro (€)</option>
            </optgroup>
            <optgroup label="Altın Birimleri">
              <option value="XAU_GRAM">Gram Altın (24 Ayar)</option>
              <option value="XAU_CEYREK">Çeyrek Altın</option>
              <option value="XAU_YARIM">Yarım Altın</option>
              <option value="XAU_TAM">Tam / Cumhuriyet</option>
              <option value="XAU_ATA">Ata Altın / Reşat</option>
            </optgroup>
          </select>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Miktar / Adet</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input" placeholder="1" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🔄 Hesaplamayı Güncelle</button>
        <button className="calc-btn-reset" onClick={() => setAmount("1")}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header flex justify-between items-center">
            <span className="font-black italic">HESAPLANAN TL KARŞILIĞI</span>
            {rates && (
              <span className="text-[9px] opacity-40 italic">
                Son Güncelleme: {new Date(rates.lastUpdated).toLocaleTimeString("tr-TR")}
              </span>
            )}
          </div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">{results.description}</div>
              <div className="calc-result-hero-value" style={{ color: "#f59e0b" }}>
                {results.tryValue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </div>
              <div className="calc-result-hero-sub">Anlık Piyasa Verileri Uygulanmıştır</div>
            </div>

            <div className="calc-result-cards">
               {results.metrics.map((m, i) => (
                 <div key={i} className="calc-result-card">
                   <div className="calc-result-card-label">{m.label}</div>
                   <div className="calc-result-card-value">{m.value}</div>
                 </div>
               ))}
               <div className="calc-result-card">
                  <div className="calc-result-card-label">Birim Fiyat</div>
                  <div className="calc-result-card-value">
                     {(results.tryValue / (parseFloat(amount) || 1)).toLocaleString('tr-TR')} ₺
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
         <span className="calc-info-box-icon">📉</span>
         <div className="calc-info-box-text">
            <p className="font-bold mb-1">Kur Bildirimi:</p>
            <p className="opacity-80 text-sm">Veriler Frankfurter ve Global Spot piyasalardan 2026 1. Çeyrek verileriyle senkronize edilerek sunulmaktadır. Çeyrek, Yarım ve Tam altın hesaplamaları standart 22 ayar ağırlıkları ve darphane baskı farkları (yaklaşık) gözetilerek has altın karşılığı üzerinden yapılmaktadır.</p>
         </div>
      </div>
    </div>
  );
}
