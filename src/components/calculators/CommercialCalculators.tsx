"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, BarChart3, ShoppingBag, Factory, TrendingUp, TrendingDown, Calculator, Star, ArrowRight, CheckCircle, AlertTriangle, PieChart } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

/* ─── Kar/Zarar Hesaplama ─── */
export function KarZararCalculator() {
  const [gelir, setGelir] = useState("");
  const [gider, setGider] = useState("");
  const [kdvOran, setKdvOran] = useState("20");
  const [result, setResult] = useState<null | {
    karZarar: number; yuzde: number; kdvHesabi: number; netKar: number;
  }>(null);

  const hesapla = () => {
    const g = parseFloat(gelir);
    const gz = parseFloat(gider);
    const kdv = parseFloat(kdvOran) / 100;
    if (isNaN(g) || isNaN(gz)) return;
    
    const karZarar = g - gz;
    const yuzde = gz > 0 ? (karZarar / gz) * 100 : 0;
    const kdvHesabi = g * kdv;
    const netKar = karZarar - kdvHesabi;
    
    setResult({ karZarar, yuzde, kdvHesabi, netKar });
    
    if (karZarar > 0) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const reset = () => {
    setGelir("");
    setGider("");
    setKdvOran("20");
    setResult(null);
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
  const isKar = result && result.karZarar >= 0;

  return (
    <V2CalculatorWrapper
      title="KAR / ZARAR ANALİZİ"
      icon="📈"
      infoText="İşletmenizin gelir ve gider kalemlerini girerek net kar oranınızı, KDV yükümlülüğünüzü ve karlılık performansınızı anında analiz edin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={isKar ? "emerald" : "red"}
            label={isKar ? "TOPLAM KAR" : "TOPLAM ZARAR"}
            value={fmt(result.karZarar)}
            subLabel={`Karlılık Oranı: %${Math.abs(result.yuzde).toFixed(1)}`}
            icon={isKar ? "📈" : "📉"}
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Finansal Detaylar</div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">KDV Yükümlülüğü:</span>
                   <span className="text-primary font-bold">{fmt(result.kdvHesabi)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">Vergi Sonrası Net Kar:</span>
                   <span className={`font-black ${isKar ? 'text-emerald-500' : 'text-red-500'}`}>{fmt(result.netKar)}</span>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama yüzeysel bir maliyet analizidir. Gelir vergisi, personel giderleri ve amortisman kalemleri ayrıca değerlendirilmelidir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="TOPLAM GELİR" 
             value={gelir} 
             onChange={setGelir} 
             unit="₺" 
             placeholder="50000" 
             fieldClassName="!py-6 font-black text-2xl !bg-emerald-500/5 !border-emerald-500/10 text-emerald-500"
           />
           <V2Input 
             label="TOPLAM GİDER" 
             value={gider} 
             onChange={setGider} 
             unit="₺" 
             placeholder="35000" 
             fieldClassName="!py-6 font-black text-2xl !bg-red-500/5 !border-red-500/10 text-red-500"
           />
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">KDV ORANI (%)</div>
           <div className="flex gap-4">
              {["0", "1", "10", "20"].map(o => (
                <button 
                  key={o} 
                  onClick={() => setKdvOran(o)}
                  className={`flex-1 py-4 rounded-2xl font-black italic transition-all border-b-4 ${
                    kdvOran === o 
                    ? "bg-blue-600 text-white border-blue-800 translate-y-[2px]" 
                    : "bg-white/5 text-muted border-white/10 hover:bg-white/10 active:translate-y-1"
                  }`}
                >
                  %{o}
                </button>
              ))}
           </div>
        </div>

        <V2ActionRow 
          onCalculate={hesapla} 
          onReset={reset} 
          calculateLabel="📊 Karlılığımı Analiz Et"
        />
      </div>
    </V2CalculatorWrapper>
  );
}

/* ─── Toptan–Perakende Fiyat ─── */
export function TopPriceCalculator() {
  const [maliyet, setMaliyet] = useState("");
  const [topMarj, setTopMarj] = useState("25");
  const [perMarj, setPerMarj] = useState("60");
  const [adet, setAdet] = useState("1");
  const [result, setResult] = useState<null | {
    topFiyat: number; perFiyat: number; topKar: number; perKar: number; topKdv: number; perKdv: number;
  }>(null);

  const fmt = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  const hesapla = () => {
    const m = parseFloat(maliyet);
    const tm = parseFloat(topMarj) / 100;
    const pm = parseFloat(perMarj) / 100;
    const a = parseFloat(adet) || 1;
    if (!m) return;
    
    const topFiyat = m * (1 + tm);
    const perFiyat = m * (1 + pm);
    
    setResult({
      topFiyat, perFiyat,
      topKar: (topFiyat - m) * a,
      perKar: (perFiyat - m) * a,
      topKdv: topFiyat * 0.20,
      perKdv: perFiyat * 0.20,
    });

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setMaliyet("");
    setTopMarj("25");
    setPerMarj("60");
    setAdet("1");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="TOPTAN & PERAKENDE ANALİZİ"
      icon="🛍️"
      infoText="Maliyet ve kar marjlarınıza göre ideal toptan ve perakende satış fiyatlarınızı belirleyin, potansiyel karlılığınızı görün."
      results={result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <V2ResultCard
               color="blue"
               label="TOPTAN SATIŞ"
               value={fmt(result.topFiyat)}
               subLabel={`Toplam Kar: ${fmt(result.topKar)}`}
               icon="🏭"
             />
             <V2ResultCard
               color="purple"
               label="PERAKENDE SATIŞ"
               value={fmt(result.perFiyat)}
               subLabel={`Toplam Kar: ${fmt(result.perKar)}`}
               icon="🛍️"
             />
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Vergi ve Marj Raporu</div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <div className="text-[9px] font-bold text-blue-500 uppercase italic">Toptan Detay</div>
                   <div className="flex justify-between text-[11px] italic">
                      <span className="text-muted">Birim Kar:</span>
                      <span className="text-primary font-bold">{fmt(result.topKar / (parseFloat(adet) || 1))}</span>
                   </div>
                   <div className="flex justify-between text-[11px] italic">
                      <span className="text-muted">KDV (%20):</span>
                      <span className="text-primary font-bold">{fmt(result.topKdv)}</span>
                   </div>
                </div>
                <div className="space-y-2 border-l border-white/5 pl-6">
                   <div className="text-[9px] font-bold text-purple-500 uppercase italic">Perakende Detay</div>
                   <div className="flex justify-between text-[11px] italic">
                      <span className="text-muted">Birim Kar:</span>
                      <span className="text-primary font-bold">{fmt(result.perKar / (parseFloat(adet) || 1))}</span>
                   </div>
                   <div className="flex justify-between text-[11px] italic">
                      <span className="text-muted">KDV (%20):</span>
                      <span className="text-primary font-bold">{fmt(result.perKdv)}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="BİRİM MALİYET" value={maliyet} onChange={setMaliyet} unit="₺" placeholder="80" />
           <V2Input label="TOPLAM ADET" value={adet} onChange={setAdet} unit="ADET" placeholder="100" />
           <V2Input label="TOPTAN KAR MARJI" value={topMarj} onChange={setTopMarj} unit="%" placeholder="25" />
           <V2Input label="PERAKENDE KAR MARJI" value={perMarj} onChange={setPerMarj} unit="%" placeholder="60" />
        </div>

        <V2ActionRow 
          onCalculate={hesapla} 
          onReset={reset} 
          calculateLabel="🛍️ Fiyatları Belirle"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
