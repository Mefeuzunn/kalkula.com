"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{
    vatAmount: number;
    estimatedRefund: number;
    feeAmount: number;
    refundTRY: number;
    isEligible: boolean;
  } | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 }, colors: ["#10b981", "#3b82f6"] });
    }
  };

  useEffect(() => { calculate(); }, [selectedCountry, amount, rates]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-muted">GÜNCEL KURLAR ALINIYOR...</div>;

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Ülke Seçimi</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Object.entries(COUNTRY_DATA).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedCountry(key)}
              className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all text-sm font-bold ${
                selectedCountry === key 
                ? "border-accent-primary bg-accent-primary/10 text-accent-primary" 
                : "border-border hover:border-accent-primary/30"
              }`}
            >
              <span>{data.flag}</span>
              <span className="truncate">{data.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="calc-grid-2 mt-6">
        <div className="calc-input-group">
          <label className="calc-label">Alışveriş Tutarı ({country.currency})</label>
          <div className="calc-input-wrapper">
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              className="calc-input has-unit" 
            />
            <span className="calc-unit">{country.symbol}</span>
          </div>
          <div className="text-[10px] mt-1 text-muted">Minimum Harcama: <b>{country.minSpend} {country.symbol}</b></div>
        </div>
        
        <div className="p-6 bg-accent-primary/5 rounded-[2rem] border border-accent-primary/10 flex flex-col justify-center">
            <div className="text-[10px] uppercase font-black text-accent-primary/60 tracking-widest mb-1">Ülke Özeti</div>
            <div className="font-bold text-sm leading-tight text-primary">{country.description}</div>
            <div className="mt-2 text-xs font-bold text-accent-primary italic">KDV Oranı: %{country.vat}</div>
        </div>
      </div>

      {results && (
        <div className="calc-result-panel mt-8">
          <div className={`calc-result-header border-b px-8 py-4 flex justify-between items-center ${results.isEligible ? "text-emerald-500" : "text-amber-500"}`}>
            <span className="font-black italic uppercase tracking-tighter">
              {results.isEligible ? "✅ İade Alınabilir" : "⚠️ Limit Altı"}
            </span>
            <span className="text-[10px] opacity-60">2026 Güncel Verileri</span>
          </div>
          
          <div className="calc-result-body p-8 flex flex-col gap-8">
            <div className="calc-result-hero text-center p-10 bg-secondary/5 rounded-[3rem] border border-border relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-accent-primary/5 blur-3xl rounded-full scale-50"></div>
               
               <div className="relative z-10">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-4">Tahmini Alınacak İade</div>
                 <div className="text-6xl font-black italic tracking-tighter text-primary mb-2">
                   {results.estimatedRefund.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {results.isEligible ? country.symbol : ""}
                 </div>
                 <div className="text-xl font-bold text-accent-primary flex items-center justify-center gap-2">
                    <span className="opacity-50">≈</span> 
                    {results.refundTRY.toLocaleString('tr-TR', { style: "currency", currency: "TRY" })}
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] border border-border flex flex-col gap-1 items-center md:items-start">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest">Net KDV</div>
                 <div className="text-xl font-bold">{results.vatAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {country.symbol}</div>
                 <div className="text-[10px] text-muted italic">Ödenen Toplam Vergi</div>
              </div>
              <div className="p-6 rounded-[2rem] border border-border flex flex-col gap-1 items-center md:items-start text-red-500">
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Operatör Komisyonu</div>
                 <div className="text-xl font-bold">-{results.feeAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {country.symbol}</div>
                 <div className="text-[10px] italic opacity-60">Tahmini Hizmet Bedeli</div>
              </div>
            </div>

            {!results.isEligible && (
              <div className="bg-amber-500/10 border-2 border-amber-500/20 p-6 rounded-3xl text-center">
                 <p className="text-sm font-bold text-amber-700">Minimum harcama tutarı olan <b>{country.minSpend} {country.symbol}</b> limitinin altındasınız. Bu faturadan Tax Free iadesi alamazsınız.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="calc-info-box mt-8">
        <span className="calc-info-box-icon">💡</span>
        <div className="calc-info-box-text">
            <p className="font-bold mb-1">Profesyonel İade Rehberi:</p>
            <ul className="list-disc ml-5 text-sm opacity-80 flex flex-col gap-1">
                <li><b>Form Talep Edin:</b> Alışveriş sırasında mutlaka "Tax Free Form" istediğinizi belirtin.</li>
                <li><b>Pasaport Gerekli:</b> İşlem için pasaportunuzun yanınızda veya dijital kopyasının hazır olması gerekir.</li>
                <li><b>Gümrük Onayı:</b> Ülkeden ayrılırken formu gümrük noktasında (Customs) mühürletmeniz profesyonel süreç için şarttır.</li>
                <li><b>İade Noktaları:</b> Global Blue, Planet veya Tax Free Point gibi operatörlerin havalimanı ofislerinden nakit veya karta iade alabilirsiniz.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
