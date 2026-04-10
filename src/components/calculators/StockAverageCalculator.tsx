"use client";

import React, { useState, useEffect } from "react";
import { Info, TrendingUp, PlusCircle, Calculator, Wallet, Percent, ArrowRight, ShieldCheck, PieChart, Landmark } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function StockAverageCalculator() {
  const [currentQty, setCurrentQty] = useState("100");
  const [currentAvg, setCurrentAvg] = useState("50");
  const [newQty, setNewQty] = useState("50");
  const [newPrice, setNewPrice] = useState("45");
  const [commission, setCommission] = useState("0.2");

  const [results, setResults] = useState<{
    newAverage: number;
    totalQty: number;
    totalInvested: number;
    totalCommission: number;
    priceImpact: number;
  } | null>(null);

  const calculate = () => {
    const cQty = parseFloat(currentQty) || 0;
    const cAvg = parseFloat(currentAvg) || 0;
    const nQty = parseFloat(newQty) || 0;
    const nPrice = parseFloat(newPrice) || 0;
    const commRate = parseFloat(commission) || 0;

    const currentTotal = cQty * cAvg;
    const newBase = nQty * nPrice;
    const commAmount = newBase * (commRate / 100);
    const newTotalWithComm = newBase + commAmount;

    const totalQty = cQty + nQty;
    const totalInvested = currentTotal + newTotalWithComm;
    const newAverage = totalQty > 0 ? totalInvested / totalQty : 0;
    
    // Yüzdesel değişim (maliyet ne kadar düştü/arttı)
    const priceImpact = cAvg > 0 ? ((newAverage - cAvg) / cAvg) * 100 : 0;

    setResults({
      newAverage,
      totalQty,
      totalInvested,
      totalCommission: commAmount,
      priceImpact
    });
  };

  useEffect(() => {
    calculate();
  }, []);

  const reset = () => {
    setCurrentQty("100");
    setCurrentAvg("50");
    setNewQty("50");
    setNewPrice("45");
    setCommission("0.2");
    setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="HİSSE ORTALAMA HESAPLA"
      icon="📈"
      infoText="Mevcut hisse senedi pozisyonunuza yeni alım eklediğinizde oluşacak yeni maliyetinizi, toplam lot sayınızı ve komisyon etkisini anında analiz edin."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color={results.newAverage < (parseFloat(currentAvg) || 0) ? "emerald" : "amber"}
            label="YENİ ORTALAMA MALİYET"
            value={(results.newAverage || 0).toLocaleString('tr-TR', { maximumFractionDigits: 4, minimumFractionDigits: 2 }) + " ₺"}
            subLabel={results.priceImpact !== 0 
              ? `${results.priceImpact > 0 ? '+' : ''}${(results.priceImpact || 0).toFixed(2)}% Maliyet Değişimi`
              : "Maliyet değişmedi"}
            icon="🎯"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">TOPLAM LOT</div>
                <div className="text-xl font-black text-primary">{(results.totalQty || 0).toLocaleString('tr-TR')}</div>
             </div>
             <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">TOPLAM YATIRIM</div>
                <div className="text-xl font-black text-primary">{(results.totalInvested || 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">İşlem Detayları</div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Ödenen Komisyon:</span>
                   <span className="text-red-500 font-bold">{results.totalCommission.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">Yeni Alım Tutarı (Net):</span>
                   <span className="text-primary font-bold">{(parseFloat(newQty) * parseFloat(newPrice)).toLocaleString('tr-TR')} ₺</span>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 space-y-3">
             <div className="flex gap-3 items-center text-[10px] font-black text-blue-500 uppercase italic">
                <Info className="w-4 h-4" /> Yatırımcı Notu
             </div>
             <p className="text-[10px] text-muted leading-relaxed italic">
                Maliyet düşürme (averaging down), fiyat düşerken yapılan alımlarla ortalamayı aşağı çekme stratejisidir. Bu hesaplama, aracı kurum komisyonunuzu da maliyete ekleyerek gerçekçi sonuç verir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Mevcut Pozisyon */}
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Wallet className="w-4 h-4 text-emerald-500" /> MEVCUT POZİSYON
              </div>
              <V2Input 
                label="MEVCUT LOT ADEDİ" 
                value={currentQty} 
                onChange={setCurrentQty} 
                unit="Lot" 
                placeholder="100" 
              />
              <V2Input 
                label="MEVCUT ORTALAMA FİYAT" 
                value={currentAvg} 
                onChange={setCurrentAvg} 
                unit="₺" 
                placeholder="50.00" 
              />
           </div>

           {/* Yeni Alım */}
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <PlusCircle className="w-4 h-4 text-blue-500" /> YENİ ALIM BİLGİLERİ
              </div>
              <V2Input 
                label="YENİ ALINACAK LOT" 
                value={newQty} 
                onChange={setNewQty} 
                unit="Lot" 
                placeholder="50" 
              />
              <V2Input 
                label="YENİ ALIŞ FİYATI" 
                value={newPrice} 
                onChange={setNewPrice} 
                unit="₺" 
                placeholder="45.00" 
              />
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <Percent className="w-4 h-4 text-amber-500" /> KOMİSYON AYARLARI
                 </div>
                 <p className="text-[10px] text-muted italic">Aracı kurumunuzun binde oranını girin (Örn: 0.2)</p>
              </div>
              <div className="w-full md:w-64">
                 <V2Input 
                   label="KOMİSYON (%)" 
                   value={commission} 
                   onChange={setCommission} 
                   unit="%" 
                   placeholder="0.2" 
                 />
              </div>
           </div>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Ortalama Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
