"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Region {
  name: string;
  coeff: number;
}

const REGIONS: Region[] = [
  { name: "Marmara", coeff: 385 },
  { name: "Ege", coeff: 423 },
  { name: "Akdeniz", coeff: 445 },
  { name: "İç Anadolu", coeff: 385 },
  { name: "Karadeniz", coeff: 385 },
  { name: "Doğu Anadolu", coeff: 308 },
  { name: "Güneydoğu Anadolu", coeff: 445 }
];

export function BtuCalculator() {
  const [area, setArea] = useState("20");
  const [regionCoeff, setRegionCoeff] = useState(385);
  const [insulation, setInsulation] = useState("1.0"); // Factor
  const [sunlight, setSunlight] = useState("1.0");    // Factor
  const [people, setPeople] = useState("2");
  
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(area) || 0;
    const p = parseInt(people) || 0;
    const ins = parseFloat(insulation);
    const sun = parseFloat(sunlight);

    if (a <= 0) {
      setResult(null);
      return;
    }

    // Base formula: Area * RegionCoeff
    let btu = a * regionCoeff;
    
    // Apply insulation and sunlight factors
    btu = btu * ins * sun;
    
    // Add 600 BTU per additional person after the first 2
    if (p > 2) {
      btu += (p - 2) * 600;
    }

    setResult(btu);
    
    if (btu > 0) {
       confetti({
         particleCount: 20,
         spread: 30,
         origin: { y: 0.7 },
         colors: ["#3b82f6", "#60a5fa", "#ffffff"]
       });
    }
  };

  useEffect(() => {
    calculate();
  }, [area, regionCoeff, insulation, sunlight, people]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Parametreler */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Bulunduğunuz Bölge</label>
                 <select 
                    onChange={(e) => setRegionCoeff(parseInt(e.target.value))}
                    className="input-field !py-4 font-black cursor-pointer bg-white"
                 >
                    {REGIONS.map(r => (
                       <option key={r.name} value={r.coeff}>{r.name} (K: {r.coeff})</option>
                    ))}
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Oda Alanı (m²)</label>
                 <input type="number" value={area} onChange={e => setArea(e.target.value)} className="input-field !py-4 font-black text-center"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yalıtım</label>
                    <select value={insulation} onChange={e => setInsulation(e.target.value)} className="input-field !py-4 font-black cursor-pointer">
                       <option value="0.9">Mükemmel</option>
                       <option value="1.0">Standart</option>
                       <option value="1.2">Zayıf</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Cephe/Güneş</label>
                    <select value={sunlight} onChange={e => setSunlight(e.target.value)} className="input-field !py-4 font-black cursor-pointer">
                       <option value="0.9">Kuzey / Gölge</option>
                       <option value="1.0">Normal / Doğu</option>
                       <option value="1.15">Güney / Çok Güneş</option>
                    </select>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kişi Sayısı (Ortalama)</label>
                 <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="input-field !py-4 font-black text-center"/>
              </div>

              <div className="mt-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
                 <span className="text-2xl">🏭</span>
                 <p className="text-[10px] text-blue-900/70 dark:text-blue-400 leading-relaxed font-bold italic">
                    BTU değeri binanın yalıtım kalitesine ve pencere alanına göre ±%15 değişkenlik gösterebilir.
                 </p>
              </div>
           </div>
        </div>

        {/* Sonuç Paneli */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full">
           {result !== null ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-surface border-4 border-blue-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.5em] uppercase rotate-12">HVAC Analytics v4.0</div>
                    
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-5xl mb-8">❄️</div>
                    
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 italic">Gerekli Kapasite (BTU/h)</span>
                    
                    <div className="text-7xl font-black italic tracking-tighter text-primary mb-4">
                       {result.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </div>

                    <div className="mt-6 p-6 bg-secondary/5 rounded-3xl border border-border w-full">
                       <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic mb-3 block text-center">Önerilen Klima Sınıfı</span>
                       <div className="text-2xl font-black text-blue-600 italic">
                          {result <= 9000 ? "9.000 BTU" : result <= 12000 ? "12.000 BTU" : result <= 18000 ? "18.000 BTU" : result <= 24000 ? "24.000 BTU" : "Kaset / Salon Tipi (24.000+)"}
                       </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 w-full px-6">
                       <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Maliyet Analizi</span>
                          <span className="text-xs font-bold text-primary">Düşük Tüketim (A+++)</span>
                       </div>
                       <div className="flex flex-col items-center border-l border-border">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Hassasiyet</span>
                          <span className="text-xs font-bold text-primary">Termal Verimlilik</span>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">🌪️</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">MAHAL ÖLÇÜLERİNİ GİRİNİZ</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
