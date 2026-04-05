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

// MTV Hesaplama
export function MtvCalculator() {
  const [aracTipi, setAracTipi] = useState("otomobil");
  const [yas, setYas] = useState("1-3");
  const [motor, setMotor] = useState("1300");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    let mtv = 0;
    if (aracTipi === "motosiklet") {
       mtv = yas === "1-3" ? 1800 : (yas === "4-6" ? 1400 : 900);
    } else {
       switch(motor) {
         case "1300": mtv = yas === "1-3" ? 3359 : (yas === "4-6" ? 2339 : 1300); break;
         case "1600": mtv = yas === "1-3" ? 5851 : (yas === "4-6" ? 4387 : 2544); break;
         case "2000": mtv = yas === "1-3" ? 10450 : (yas === "4-6" ? 8047 : 4734); break;
         case "2000+": mtv = yas === "1-3" ? 16000 : (yas === "4-6" ? 13400 : 8000); break;
       }
    }
    setResult(mtv);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-center">
         <span className="text-xl">ℹ️</span>
         <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
           Bu form 2024-2025 yılı araç grupları ve ortalama kasko değerine göre referans tutarlar oluşturmaktadır.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Araç Tipi</label>
          <select value={aracTipi} onChange={e => { setAracTipi(e.target.value); setResult(null); }} className="input-field font-bold">
            <option value="otomobil">Otomobil / Cip</option>
            <option value="motosiklet">Motosiklet</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Araç Yaşı</label>
          <select value={yas} onChange={e => setYas(e.target.value)} className="input-field font-bold">
            <option value="1-3">1 - 3 Yaş Arası</option>
            <option value="4-6">4 - 6 Yaş Arası</option>
            <option value="7-11">7 - 11 Yaş Arası</option>
          </select>
        </div>
        {aracTipi === "otomobil" && (
          <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-muted uppercase px-1">Motor Hacmi</label>
            <select value={motor} onChange={e => setMotor(e.target.value)} className="input-field font-bold">
              <option value="1300">0 - 1300 cc</option>
              <option value="1600">1301 - 1600 cc</option>
              <option value="2000">1601 - 2000 cc</option>
              <option value="2000+">2001 cc ve Üzeri</option>
            </select>
          </div>
        )}
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Yıllık MTV'yi Gör</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Yıllık Toplam MTV</div>
              <div className="result-value-premium">₺{result.toLocaleString("tr-TR")}</div>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-5 bg-secondary/10 rounded-2xl transition-all hover:bg-secondary/20">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">1. Taksit (Ocak)</div>
                    <div className="font-bold text-xl text-primary">₺{(result/2).toLocaleString("tr-TR")}</div>
                 </div>
                 <div className="text-left p-5 bg-secondary/10 rounded-2xl transition-all hover:bg-secondary/20">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">2. Taksit (Temmuz)</div>
                    <div className="font-bold text-xl text-primary">₺{(result/2).toLocaleString("tr-TR")}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
