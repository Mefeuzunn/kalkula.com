import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

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

  const GOLD_UNITS = {
    XAU_GRAM: { name: "Gram Altın (24k)", weight: 1, carat: 24 },
    XAU_CEYREK: { name: "Çeyrek Altın (22k)", weight: 1.606, carat: 22 },
    XAU_YARIM: { name: "Yarım Altın (22k)", weight: 3.212, carat: 22 },
    XAU_TAM: { name: "Tam Altın (22k)", weight: 6.424, carat: 22 },
    XAU_ATA: { name: "Ata Altın (22k)", weight: 6.608, carat: 22 },
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
        const usdToTry = data.rates["TRY"] || 49.30;
        const newRates: any = { TRY: 1, lastUpdated: data.lastUpdated };
        Object.keys(data.rates).forEach(code => {
           newRates[code] = (1 / data.rates[code]) * usdToTry;
        });
        newRates["TRY_RATE"] = usdToTry;
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
    <V2CalculatorWrapper
      title="HESAPLANAN TL KARŞILIĞI"
      icon="📉"
      infoText="Veriler Frankfurter ve Global Spot piyasalardan 2026 Q1 verileriyle senkronize edilerek sunulmaktadır. Çeyrek, Yarım ve Tam altın hesaplamaları standart 22 ayar ağırlıkları ve darphane baskı farkları gözetilerek has altın karşılığı üzerinden yapılmaktadır."
      results={results && (
        <>
          <V2ResultCard
            color="amber"
            icon="💰"
            label={results.description}
            value={results.tryValue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            subLabel="Serbest Piyasa Verileri Uygulanmıştır"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
             {results.metrics.map((m: { label: string; value: string }, i: number) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                   <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">{m.label}</div>
                   <div className="text-xl font-black text-primary italic">{m.value}</div>
                </div>
             ))}
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">BİRİM FİYAT</div>
                <div className="text-xl font-black text-primary italic">
                   {(results.tryValue / (parseFloat(amount) || 1)).toLocaleString('tr-TR')} ₺
                </div>
             </div>
          </div>
          
          {rates && (
            <div className="mt-6 text-center">
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest opacity-40">
                Son Güncelleme: {new Date(rates.lastUpdated).toLocaleTimeString("tr-TR")}
              </span>
            </div>
          )}
        </>
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <V2Select
          label="VARLIK TÜRÜ"
          value={selectedUnit}
          onChange={setSelectedUnit}
        >
          <optgroup label="DÖVİZ BİRİMLERİ">
            {Object.entries(CURRENCY_LABELS).map(([code, info]) => (
              <option key={code} value={code} className="bg-slate-900">{info.name} ({info.label})</option>
            ))}
          </optgroup>
          <optgroup label="ALTIN BİRİMLERİ">
            <option value="XAU_GRAM" className="bg-slate-900">Gram Altın (24 Ayar)</option>
            <option value="XAU_CEYREK" className="bg-slate-900">Çeyrek Altın</option>
            <option value="XAU_YARIM" className="bg-slate-900">Yarım Altın</option>
            <option value="XAU_TAM" className="bg-slate-900">Tam / Cumhuriyet Altını</option>
            <option value="XAU_ATA" className="bg-slate-900">Ata Altın / Reşat</option>
          </optgroup>
        </V2Select>

        <V2Input
          label="MİKTAR / ADET"
          value={amount}
          onChange={setAmount}
          fieldClassName="!text-5xl"
        />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={() => setAmount("1")}
        calculateLabel="🔄 Hesaplamayı Güncelle"
        resetLabel="Sıfırla"
      />
    </V2CalculatorWrapper>
  );
}
