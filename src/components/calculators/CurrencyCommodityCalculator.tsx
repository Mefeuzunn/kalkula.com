"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface LiveRates {
  [key: string]: number | string;
  USD: number;
  EUR: number;
  XAU: number; 
  XAG: number;
  TRY: number;
  lastUpdated: string;
}

export function CurrencyCommodityCalculator() {
  const [rates, setRates] = useState<LiveRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("1");
  const [selectedUnit, setSelectedUnit] = useState<string>("USD");

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

  const CURRENCY_LABELS: Record<string, { label: string, name: string }> = {
    USD: { label: "$", name: "ABD Doları" },
    EUR: { label: "€", name: "Euro" },
    GBP: { label: "£", name: "İngiliz Sterlini" },
    CHF: { label: "₣", name: "İsviçre Frangı" },
    JPY: { label: "¥", name: "Japon Yeni" },
    SAR: { label: "SR", name: "Suudi Riyali" },
    AED: { label: "د.إ", name: "BAE Dirhemi" },
    CAD: { label: "C$", name: "Kanada Doları" },
    AUD: { label: "A$", name: "Avustralya Doları" },
    QAR: { label: "QR", name: "Katar Riyali" },
  };

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/rates");
      const data = await res.json();
      if (data.rates) {
        // Convert all rates to TRY based rates
        const usdToTry = data.rates["TRY"] || 49.30;
        const newRates: any = { TRY: 1, lastUpdated: data.lastUpdated };
        
        // Calculate each currency's TRY value
        Object.keys(data.rates).forEach(code => {
           newRates[code] = (1 / data.rates[code]) * usdToTry;
        });

        newRates["TRY_RATE"] = usdToTry; // 1 USD in TRY
        newRates["XAU"] = data.tryRates.XAU;
        newRates["XAG"] = data.tryRates.XAG;

        setRates(newRates);
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

    if (CURRENCY_LABELS[selectedUnit]) {
      const c = CURRENCY_LABELS[selectedUnit];
      tryValue = qty * (rates[selectedUnit] as number);
      desc = `${qty} ${c.name}`;
    } else if (selectedUnit.startsWith("XAU")) {
      const g = GOLD_UNITS[selectedUnit as keyof typeof GOLD_UNITS];
      tryValue = qty * g.weight * (rates.XAU as number);
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
    <div className="flex flex-col gap-10 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-end">
        <div className="group relative">
           <div className={`relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
             shadow-[0_12px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_0_rgba(0,0,0,0.4)]
             group-focus-within:-translate-y-1 group-focus-within:shadow-[0_8px_0_rgba(0,0,0,0.1)]
             hover:-translate-y-1 hover:shadow-[0_16px_0_rgba(0,0,0,0.06)]
             overflow-hidden`}>
              <div className="bg-secondary/20 p-3 border-b-2 border-border text-amber-500 flex items-center justify-between px-6">
                 <label className="text-[10px] font-black uppercase tracking-widest italic opacity-60">Varlık Türü</label>
              </div>
              <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="w-full bg-transparent border-none outline-none font-black text-lg py-5 px-6 appearance-none cursor-pointer">
                <optgroup label="Döviz">
                  {Object.entries(CURRENCY_LABELS).map(([code, info]) => (
                    <option key={code} value={code}>{info.name} ({info.label})</option>
                  ))}
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
        </div>

        <div className="group relative">
           <div className={`relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
             shadow-[0_12px_0_rgba(0,0,0,0.08)] dark:shadow-[0_12px_0_rgba(0,0,0,0.4)]
             group-focus-within:-translate-y-1 group-focus-within:shadow-[0_8px_0_rgba(0,0,0,0.1)]
             hover:-translate-y-1 hover:shadow-[0_16px_0_rgba(0,0,0,0.06)] 
             overflow-hidden`}>
              <div className="bg-secondary/20 p-3 border-b-2 border-border text-amber-500 flex items-center justify-between px-6">
                 <label className="text-[10px] font-black uppercase tracking-widest italic opacity-60">Miktar / Adet</label>
              </div>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-4xl font-black p-5 text-center italic tracking-tighter" 
                placeholder="1" 
              />
           </div>
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
    </div>
  );
}
