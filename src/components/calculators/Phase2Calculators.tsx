"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

// Yakıt Maliyeti ve Tüketimi
export function FuelCostCalculator() {
  const [mesafe, setMesafe] = useState("");
  const [tuketim, setTuketim] = useState(""); // 100km'de yaktigi litre
  const [fiyat, setFiyat] = useState("");
  const [yolcu, setYolcu] = useState("1");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const m = parseFloat(mesafe);
    const t = parseFloat(tuketim);
    const f = parseFloat(fiyat);
    const y = parseInt(yolcu) || 1;

    if (!m || !t || !f) return;

    const netLitre = (m / 100) * t;
    const toplamMaliyet = netLitre * f;
    const kisiBasi = toplamMaliyet / y;
    const kmBasi = toplamMaliyet / m;

    setResult({ litre: netLitre, toplamMaliyet, kisiBasi, kmBasi });
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ["#fbbf24", "#f59e0b"] });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Mesafe (km)</label>
          <input type="number" placeholder="Örn: 450" value={mesafe} onChange={e => setMesafe(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yakıt Tüketimi (L/100km)</label>
          <input type="number" placeholder="Örn: 6.5" value={tuketim} onChange={e => setTuketim(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Litre Fiyatı (₺)</label>
          <input type="number" placeholder="Örn: 43.50" value={fiyat} onChange={e => setFiyat(e.target.value)} className="input-field font-bold text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yolcu Sayısı</label>
          <input type="number" value={yolcu} onChange={e => setYolcu(e.target.value)} className="input-field font-bold" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium !text-left">
              <div className="result-badge !bg-yellow-500/10 !text-yellow-500 !border-yellow-500/20">Toplam Yolculuk Maliyeti</div>
              <div className="result-value-premium !text-yellow-500">₺{fmt(result.toplamMaliyet)}</div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="p-4 bg-secondary/10 rounded-2xl">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Toplam Yakıt</div>
                   <div className="font-bold text-lg">{result.litre.toFixed(1)} L</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-2xl">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Km Başına</div>
                   <div className="font-bold text-lg">₺{result.kmBasi.toFixed(2)}</div>
                </div>
                {parseInt(yolcu) > 1 && (
                  <div className="p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl col-span-2 lg:col-span-1">
                     <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Kişi Başı</div>
                     <div className="font-bold text-lg text-accent-primary">₺{result.kisiBasi.toFixed(2)}</div>
                  </div>
                )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
