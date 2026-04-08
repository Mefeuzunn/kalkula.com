"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, Globe, Plane, Receipt, Banknote, Star, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck, CreditCard, Landmark } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

interface CountryInfo {
  name: string;
  flag: string;
  vat: number;
  currency: string;
  minSpend: number;
  symbol: string;
  rateToTry: number;
  description: string;
}

const COUNTRY_DATA: Record<string, CountryInfo> = {
  france: { name: "Fransa", flag: "🇫🇷", vat: 20, currency: "EUR", minSpend: 100, symbol: "€", rateToTry: 55.45, description: "Dünyanın moda başkenti. %20 standart KDV ile yüksek iade potansiyeli." },
  italy: { name: "İtalya", flag: "🇮🇹", vat: 22, currency: "EUR", minSpend: 70.01, symbol: "€", rateToTry: 55.45, description: "Lüks alışverişte en yüksek KDV oranlarından birine sahip (%22)." },
  germany: { name: "Almanya", flag: "🇩🇪", vat: 19, currency: "EUR", minSpend: 50, symbol: "€", rateToTry: 55.45, description: "Düşük minimum harcama limiti (50€) ile her alışverişte iade imkanı." },
  spain: { name: "İspanya", flag: "🇪🇸", vat: 21, currency: "EUR", minSpend: 0, symbol: "€", rateToTry: 55.45, description: "Minimum harcama limiti yoktur. Her tutar için form alabilirsiniz." },
  uae: { name: "B.A.E (Dubai)", flag: "🇦🇪", vat: 5, currency: "AED", minSpend: 250, symbol: "د.إ", rateToTry: 13.42, description: "Düşük vergi (%5) ancak yüksek hacimli alışverişler için uygundur." },
  turkey: { name: "Türkiye", flag: "🇹🇷", vat: 20, currency: "TRY", minSpend: 118, symbol: "₺", rateToTry: 1, description: "Yerli üretim ve tekstilde avantajlı iade oranları." },
  greece: { name: "Yunanistan", flag: "🇬🇷", vat: 24, currency: "EUR", minSpend: 50, symbol: "€", rateToTry: 55.45, description: "%24 ile Avrupa'nın en yüksek KDV oranlarından biri." },
  japan: { name: "Japonya", flag: "🇯🇵", vat: 10, currency: "JPY", minSpend: 5000, symbol: "¥", rateToTry: 0.32, description: "Mağazada anında nakit iade veya vergisiz ödeme imkanı yaygındır." },
  singapore: { name: "Singapur", flag: "🇸🇬", vat: 9, currency: "SGD", minSpend: 100, symbol: "S$", rateToTry: 36.80, description: "Elektronik ve saat alışverişlerinde popüler bir durak." },
  korea: { name: "Güney Kore", flag: "🇰🇷", vat: 10, currency: "KRW", minSpend: 30000, symbol: "₩", rateToTry: 0.035, description: "Kozmetik ve teknoloji alışverişlerinde hızlı iade noktaları." },
  thailand: { name: "Tayland", flag: "🇹🇭", vat: 7, currency: "THB", minSpend: 2000, symbol: "฿", rateToTry: 1.35, description: "Turist dostu iade süreci ve %7 standart oran." },
  switzerland: { name: "İsviçre", flag: "🇨🇭", vat: 8.1, currency: "CHF", minSpend: 300, symbol: "CHF", rateToTry: 58.20, description: "Saat ve mücevheratta yüksek tutarlı iadeler için tercih edilir." },
  austria: { name: "Avusturya", flag: "🇦🇹", vat: 20, currency: "EUR", minSpend: 75, symbol: "€", rateToTry: 55.45, description: "Viyana'da lüks marka alışverişleri için %20 KDV avantajı." },
  netherlands: { name: "Hollanda", flag: "🇳🇱", vat: 21, currency: "EUR", minSpend: 50, symbol: "€", rateToTry: 55.45, description: "Havalimanında hızlı işlem ve %21 iade potansiyeli." },
  portugal: { name: "Portekiz", flag: "🇵🇹", vat: 23, currency: "EUR", minSpend: 61.50, symbol: "€", rateToTry: 55.45, description: "Lizbon ve Porto'da orta seviye KDV iade avantajı." },
};

export function TaxFreeCalculator() {
  const [selectedCountry, setSelectedCountry] = useState("france");
  const [amount, setAmount] = useState("1000");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [results, setResults] = useState<{
    vatAmount: number;
    estimatedRefund: number;
    feeAmount: number;
    refundTRY: number;
    isEligible: boolean;
  } | null>(null);

  const fetchRates = async () => {
    try {
      const res = await fetch("/api/rates");
      const data = await res.json();
      if (data.rates) {
        setRates({
          ...data.rates,
          TRY: data.rates.TRY || 49.30,
          EUR: data.rates.EUR || 0.89,
        });
      }
    } catch (e) {
      console.error("Rates fetch failed", e);
    }
  };

  useEffect(() => { fetchRates(); }, []);

  const country = COUNTRY_DATA[selectedCountry];

  const calculate = () => {
    const total = parseFloat(amount) || 0;
    const vatRate = country.vat;
    
    const vatAmount = total - (total / (1 + vatRate / 100));
    
    let refundRatio = 0.65;
    if (total > 5000) refundRatio = 0.85;
    else if (total > 1000) refundRatio = 0.75;
    
    const estimatedRefund = vatAmount * refundRatio;
    const feeAmount = vatAmount - estimatedRefund;

    const currentRateToTry = rates[country.currency] ? (rates["TRY"] / rates[country.currency]) : country.rateToTry;
    const refundTRY = estimatedRefund * currentRateToTry;
    
    const isEligible = total >= country.minSpend;

    setResults({
      vatAmount,
      estimatedRefund,
      feeAmount,
      refundTRY,
      isEligible
    });

    if (isEligible && total > 2000) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const reset = () => {
    setAmount("1000");
    setSelectedCountry("france");
    setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="TAX FREE HESAPLA"
      icon="✈️"
      infoText="Yurt dışı alışverişlerinizde ülkelerin KDV oranlarına göre alabileceğiniz vergi iadesini (Tax Free) ve tahmini hizmet bedelini anında hesaplayın."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color={results.isEligible ? "emerald" : "amber"}
            label={results.isEligible ? "TAHMİNİ İADE TUTARI" : "LİMİT ALTI HARCAMA"}
            value={results.isEligible ? `${results.estimatedRefund.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${country.symbol}` : "0.00"}
            subLabel={results.isEligible ? `≈ ${results.refundTRY.toLocaleString('tr-TR', { style: "currency", currency: "TRY" })}` : `Min: ${country.minSpend} ${country.symbol}`}
            icon={results.isEligible ? "💰" : "⚠️"}
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">İade Analizi</div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Ödenen Toplam KDV:</span>
                   <span className="text-primary font-bold">{results.vatAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {country.symbol}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted text-red-500/70">Operatör Komisyonu (Tahmini):</span>
                   <span className="text-red-500 font-bold">-{results.feeAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {country.symbol}</span>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex gap-3 items-center text-[10px] font-black text-blue-500 uppercase italic">
                <Info className="w-4 h-4" /> Profesyonel İade Rehberi
             </div>
             <ul className="grid grid-cols-1 gap-2">
                {[
                  "Alışverişte mutlaka Tax Free Form talep edin.",
                  "İşlem için pasaportunuzun yanında olması gerekir.",
                  "Ülkeden ayrılırken formu gümrükte mühürletin.",
                  "Havalimanı iade ofislerinden nakit/kart iadesi alın."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center text-[10px] text-muted italic">
                    <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe className="w-4 h-4" /> ÜLKE SEÇİMİ
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.entries(COUNTRY_DATA).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCountry(key)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all group ${
                    selectedCountry === key 
                    ? "border-blue-600 bg-blue-600/10 text-blue-500 shadow-lg shadow-blue-500/10" 
                    : "border-white/5 bg-white/5 text-muted hover:border-white/10 hover:text-primary"
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{data.flag}</span>
                  <span className="text-[10px] font-black italic uppercase truncate">{data.name}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Receipt className="w-4 h-4" /> HARCAMA BİLGİSİ
              </div>
              <V2Input 
                label={`TOPLAM TUTAR (${country.currency})`} 
                value={amount} 
                onChange={setAmount} 
                unit={country.symbol} 
                placeholder="1000" 
                fieldClassName="!py-6 font-black text-3xl italic"
              />
              <div className="flex items-center justify-between text-[10px] font-bold text-muted px-2 uppercase tracking-widest italic">
                 <span>Minimum Harcama:</span>
                 <span className="text-primary">{country.minSpend} {country.symbol}</span>
              </div>
           </div>

           <div className="p-6 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex flex-col justify-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Plane className="w-20 h-20 -rotate-12" />
              </div>
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">ÜLKE ANALİZİ</div>
              <p className="text-xs font-medium italic text-primary leading-relaxed relative z-10">
                 {country.description}
              </p>
              <div className="flex gap-4 items-center">
                 <div className="px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 text-[10px] font-black text-blue-500 italic">
                    KDV: %{country.vat}
                 </div>
                 <div className="px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 text-[10px] font-black text-blue-500 italic">
                    PARA BİRİMİ: {country.currency}
                 </div>
              </div>
           </div>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="✈️ İademi Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
