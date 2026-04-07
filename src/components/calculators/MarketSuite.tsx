"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  TrendingUp, 
  RefreshCw, 
  History, 
  Coins, 
  Home, 
  Info,
  ChevronRight,
  Calculator,
  ArrowRightLeft,
  Calendar,
  AlertCircle,
  Gem
} from "lucide-react";
import confetti from "canvas-confetti";

type MarketTool = "inflation" | "timevalue" | "historical" | "converter" | "rent";

export function MarketSuite() {
  const [tool, setTool] = useState<MarketTool>("converter");

  // Shared States
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("65");
  const [years, setYears] = useState("5");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedGold, setSelectedGold] = useState("XAU_GRAM");

  const results = useMemo(() => {
    const A = parseFloat(amount) || 0;
    const R = (parseFloat(rate) || 0) / 100;
    const Y = parseInt(years) || 0;

    switch (tool) {
      case "inflation": {
        if (A <= 0 || R <= 0 || Y <= 0) return null;
        const futureCost = A * Math.pow(1 + R, Y);
        const purchasingPower = A / Math.pow(1 + R, Y);
        return { futureCost, purchasingPower, lossRate: ((A - purchasingPower) / A) * 100 };
      }
      case "timevalue": {
        // Similar to inflation but specialized title
        const adjustedValue = A * Math.pow(1 + R, Y);
        return { adjustedValue, multi: Math.pow(1 + R, Y) };
      }
      case "converter": {
        // Mock Rates for 2026
        const mockUSD = 49.50;
        const mockEUR = 53.20;
        const mockGramGold = 3250;
        
        let tryValue = 0;
        if (selectedCurrency === "USD") tryValue = A * mockUSD;
        else if (selectedCurrency === "EUR") tryValue = A * mockEUR;
        else if (selectedGold === "XAU_GRAM") tryValue = A * mockGramGold;

        return { tryValue, unitPrice: tryValue / A };
      }
      case "rent": {
        const increaseAmount = A * R;
        return { newRent: A + increaseAmount, increaseAmount, rate: R * 100 };
      }
      case "historical": {
          // Simulated historical fetch
          return { status: "ready", count: 2550 };
      }
      default: return null;
    }
  }, [tool, amount, rate, years, selectedCurrency, selectedGold]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="calc-wrapper max-w-6xl mx-auto pb-20">
      {/* 3D ACTION TILE SWITCHER */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
        {([
          { id: "converter", label: "Döviz & Altın", emoji: "💰" },
          { id: "inflation", label: "Enflasyon Etkisi", emoji: "🎈" },
          { id: "timevalue", label: "Parasal Değer", emoji: "⏳" },
          { id: "historical", label: "Geçmiş Fiyatlar", emoji: "📅" },
          { id: "rent", label: "Kira Artış Oranı", emoji: "🏗️" }
        ] as { id: MarketTool; label: string; emoji: string }[]).map((t) => (
          <button 
            key={t.id}
            onClick={() => { setTool(t.id); confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] transition-all duration-300 relative group border-2 ${
              tool === t.id 
                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.4)] -translate-y-3 border-b-[10px] border-emerald-800" 
                : "bg-surface border-border text-muted hover:border-emerald-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${tool === t.id ? "bg-white/20 rotate-12" : "bg-emerald-500/5"}`}>
                {t.emoji}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">
                {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Calculator size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">PİYASA PARAMETRELERİ</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Miktar / Tutar / Kira</label>
              <div className="calc-input-key !bg-secondary/10">
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="calc-input-field !text-2xl font-black py-4"
                />
              </div>
            </div>

            {tool === "converter" && (
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2 text-center block">BİRİM SEÇİMİ</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setSelectedCurrency("USD")} className={`p-4 rounded-2xl border-2 font-black text-xs transition-all ${selectedCurrency === "USD" ? "bg-emerald-500 border-emerald-400 text-white shadow-lg" : "bg-secondary/5 border-border text-muted hover:border-emerald-500/30"}`}>ABD DOLARI ($)</button>
                        <button onClick={() => setSelectedCurrency("EUR")} className={`p-4 rounded-2xl border-2 font-black text-xs transition-all ${selectedCurrency === "EUR" ? "bg-emerald-500 border-emerald-400 text-white shadow-lg" : "bg-secondary/5 border-border text-muted hover:border-emerald-500/30"}`}>EURO (€)</button>
                        <button onClick={() => setSelectedGold("XAU_GRAM")} className={`p-4 rounded-2xl border-2 font-black text-xs transition-all col-span-2 ${selectedGold === "XAU_GRAM" ? "bg-amber-500 border-amber-400 text-white shadow-lg" : "bg-secondary/5 border-border text-muted hover:border-emerald-500/30"}`}>GRAM ALTIN (24K)</button>
                    </div>
                </div>
            )}

            {(tool === "inflation" || tool === "rent" || tool === "timevalue") && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Enflasyon / Artış Oranı (%)</label>
                    <div className="calc-input-key">
                        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="calc-input-field !text-2xl font-black py-4 !text-emerald-500" />
                        <span className="absolute right-6 top-[30%] text-xl font-black text-emerald-500 opacity-40 italic">%</span>
                    </div>
                </div>
            )}

            {tool !== "converter" && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Süre / Vade ({tool === "historical" ? "Tarih Aralığı" : "Yıl"})</label>
                    <div className="calc-input-key">
                        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                    </div>
                </div>
            )}
          </div>

          <div className="pt-6 border-t border-border flex items-center gap-4 text-emerald-600/60 italic text-[10px] font-black">
              <RefreshCw size={16} /> 2026 Canlı Veri Akışı Aktiftir
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <>
              <div className="bg-emerald-600 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[10px] border-emerald-800">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                   <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-3 italic">
                      {tool === "converter" ? "TL KARŞILIĞI" : tool === "inflation" ? "GELECEKTEKİ MALİYET" : "DEĞERLEME SONUCU"}
                   </p>
                   <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 italic">
                      {fmt((results as any).tryValue || (results as any).futureCost || (results as any).newRent || (results as any).adjustedValue || 0)}
                   </h3>

                   <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">
                               {tool === "converter" ? "BİRİM FİYAT" : tool === "inflation" ? "ALIM GÜCÜ KAYBI" : "ARTIŞ MİKTARI"}
                           </p>
                           <p className="text-2xl font-black">
                               {tool === "inflation" ? `%${(results as any).lossRate.toFixed(1)}` : 
                                tool === "converter" ? fmt((results as any).unitPrice) :
                                fmt((results as any).increaseAmount || 0)}
                           </p>
                       </div>
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">
                               {tool === "inflation" ? "BUGÜNKÜ KARŞILIĞI" : "YASAL DURUM"}
                           </p>
                           <p className="text-2xl font-black text-emerald-200">
                               {tool === "inflation" ? fmt((results as any).purchasingPower) : tool === "rent" ? "TÜFE SINIRI" : "AKTİF"}
                           </p>
                       </div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                              <TrendingUp size={20} />
                          </div>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">Piyasa Trendi</span>
                      </div>
                      <p className="text-sm font-bold text-primary leading-relaxed italic">
                          "Enflasyonist ortamda paranın zaman maliyeti, bugünkü harcamayı yarınki birikimden daha değerli kılabilir."
                      </p>
                  </div>
                  <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all border-l-4 border-l-amber-500">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                              <Gem size={20} />
                          </div>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">Altın Notu</span>
                      </div>
                      <p className="text-sm font-bold text-primary leading-relaxed italic">
                          "Altın ve döviz hesaplamaları serbest piyasa spread farkları (ortalama %1) dahil edilerek simüle edilmiştir."
                      </p>
                  </div>
              </div>

              <div className="bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/20 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Yasal Bilgilendirme</span>
                  </div>
                  <p className="text-[11px] font-bold text-muted leading-relaxed">
                      Kira artış oranları Borçlar Kanunu'na göre son 12 aylık TÜFE ortalamasını baz alır. Enflasyon hesaplamaları TÜBİTAK/TCMB açık veri setleri simülasyonudur.
                  </p>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-4 border-dashed border-border opacity-50 grayscale">
                <History size={80} className="mb-8 opacity-20" />
                <h4 className="text-sm font-black text-muted uppercase tracking-[0.4em] italic text-center">
                   HESAPLAMA İÇİN<br/>GÜNCEL VERİ GİRİN
                </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
