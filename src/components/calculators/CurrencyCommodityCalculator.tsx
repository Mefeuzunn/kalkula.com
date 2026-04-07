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
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        <div className="flex flex-col">
          <label className="calc-input-label">VARLIK TÜRÜ</label>
          <div className="calc-input-key">
              <div className="bg-secondary/10 p-4 border-b border-border flex justify-between items-center px-8">
                 <span className="text-[10px] font-bold text-muted uppercase tracking-widest italic opacity-40">Döviz veya Altın Birimi Seçin</span>
              </div>
              <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="calc-input-field !text-xl py-6 appearance-none cursor-pointer">
                <optgroup label="DÖVİZ BİRİMLERİ">
                  {Object.entries(CURRENCY_LABELS).map(([code, info]) => (
                    <option key={code} value={code} className="bg-surface text-primary">{info.name} ({info.label})</option>
                  ))}
                </optgroup>
                <optgroup label="ALTIN BİRİMLERİ">
                  <option value="XAU_GRAM" className="bg-surface text-primary">Gram Altın (24 Ayar)</option>
                  <option value="XAU_CEYREK" className="bg-surface text-primary">Çeyrek Altın</option>
                  <option value="XAU_YARIM" className="bg-surface text-primary">Yarım Altın</option>
                  <option value="XAU_TAM" className="bg-surface text-primary">Tam / Cumhuriyet Altını</option>
                  <option value="XAU_ATA" className="bg-surface text-primary">Ata Altın / Reşat</option>
                </optgroup>
              </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="calc-input-label">MİKTAR / ADET</label>
          <div className="calc-input-key">
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="calc-input-field !text-5xl py-8" 
                placeholder="1" 
              />
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>
          <span>🔄</span> Hesaplamayı Güncelle
        </button>
        <button className="calc-btn-reset" onClick={() => setAmount("1")}>
          <span>↺</span> Sıfırla
        </button>
      </div>

      {results && (
        <div className="panel p-0 bg-transparent border-none shadow-none mt-4">
          <div className="calc-result-header flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span>📉</span> HESAPLANAN TL KARŞILIĞI
            </div>
            {rates && (
              <span className="text-[9px] opacity-40 italic lowercase">
                son güncelleme: {new Date(rates.lastUpdated).toLocaleTimeString("tr-TR")}
              </span>
            )}
          </div>

          <div className="calc-result-card !bg-secondary/5 border-amber-500/20 mb-8 !items-start overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.97 0-1.82 1.28-3.26 3.11-3.66V3.33h2.67v1.92c1.39.2 2.62 1.23 2.98 2.56h-2.03c-.27-.69-.74-1.13-1.68-1.13-.96 0-1.73.51-1.73 1.38 0 .81.65 1.2 2.76 1.71 2.5.61 4.1 1.77 4.1 4.09 0 2.26-1.8 3.54-3.5 3.91z"/></svg>
             </div>
             <div className="calc-result-card-label text-amber-500">{results.description}</div>
             <div className="calc-result-card-value text-amber-500 !text-6xl md:!text-7xl">
                {results.tryValue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
             </div>
             <div className="calc-result-card-desc italic mt-2">Serbest Piyasa Verileri Uygulanmıştır</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {results.metrics.map((m, i) => (
                <div key={i} className="panel p-6 bg-secondary/5 flex flex-col justify-center border-border/40 hover:border-amber-500/30 transition-all">
                   <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">{m.label}</div>
                   <div className="text-xl font-black text-primary italic lowercase">{m.value}</div>
                </div>
             ))}
             <div className="panel p-6 bg-secondary/5 flex flex-col justify-center border-border/40 hover:border-amber-500/30 transition-all">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">BİRİM FİYAT</div>
                <div className="text-xl font-black text-primary italic lowercase">
                   {(results.tryValue / (parseFloat(amount) || 1)).toLocaleString('tr-TR')} ₺
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="mt-10 p-8 bg-secondary/5 border-2 border-border rounded-[2.5rem] flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             <span className="text-xs font-black uppercase tracking-widest">Veri Bildirimi</span>
          </div>
          <p className="opacity-80 text-sm font-bold italic text-muted leading-relaxed">Veriler Frankfurter ve Global Spot piyasalardan 2026 Q1 verileriyle senkronize edilerek sunulmaktadır. Çeyrek, Yarım ve Tam altın hesaplamaları standart 22 ayar ağırlıkları ve darphane baskı farkları (yaklaşık) gözetilerek has altın karşılığı üzerinden yapılmaktadır.</p>
      </div>
    </div>
  );
}
