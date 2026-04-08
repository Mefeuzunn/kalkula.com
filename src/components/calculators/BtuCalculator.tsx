"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Snowflake, Info, RotateCcw, Thermometer, Wind, Home, Users, Sun, Gauge, Activity } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
  const [regionCoeff, setRegionCoeff] = useState("385");
  const [insulation, setInsulation] = useState("1.0"); // Factor
  const [sunlight, setSunlight] = useState("1.0");    // Factor
  const [people, setPeople] = useState("2");
  
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(area) || 0;
    const p = parseInt(people) || 0;
    const rc = parseInt(regionCoeff);
    const ins = parseFloat(insulation);
    const sun = parseFloat(sunlight);

    if (a <= 0) {
      setResult(null);
      return;
    }

    // Base formula: Area * RegionCoeff
    let btu = a * rc;
    
    // Apply insulation and sunlight factors
    btu = btu * ins * sun;
    
    // Add 600 BTU per additional person after the first 2
    if (p > 2) {
      btu += (p - 2) * 600;
    }

    setResult(btu);
  };

  useEffect(() => {
    calculate();
  }, [area, regionCoeff, insulation, sunlight, people]);

  const reset = () => {
    setArea("20");
    setRegionCoeff("385");
    setInsulation("1.0");
    setSunlight("1.0");
    setPeople("2");
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const getSuggestedClass = (val: number) => {
    if (val <= 9000) return "9.000 BTU";
    if (val <= 12000) return "12.000 BTU";
    if (val <= 18000) return "18.000 BTU";
    if (val <= 24000) return "24.000 BTU";
    return "Salon Tipi (24.000+)";
  };

  return (
    <V2CalculatorWrapper
      title="KLİMA BTU HESAPLAYICI"
      icon="❄️"
      infoText="Yaşadığınız bölgeye, odanızın büyüklüğüne ve yalıtım durumuna göre en uygun klima kapasitesini (BTU) anında belirleyin."
      results={result !== null && (
        <div className="space-y-6 animate-result">
           <V2ResultCard 
             color="blue" 
             label="GEREKLİ KAPASİTE" 
             value={result.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} 
             unit="BTU/h"
             icon="🌡️"
             subLabel="İdeal Soğutma ve Isıtma Gücü"
             className="!text-5xl font-black italic"
           />
           
           <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex flex-col items-center justify-center gap-3">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic opacity-60">ÖNERİLEN KLİMA SINIFI</div>
              <div className="text-2xl font-black text-primary italic tracking-tight drop-shadow-sm">
                 {getSuggestedClass(result)}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">VERİMLİLİK</div>
                 <div className="text-xl font-black text-emerald-500 italic tracking-tighter">A+++ Uyumlu</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">TOLERANS</div>
                 <div className="text-xl font-black text-slate-500 italic">±%15 Güvenli</div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Select 
                label="BULUNDUĞUNUZ BÖLGE"
                value={regionCoeff}
                onChange={setRegionCoeff}
                options={REGIONS.map(r => ({ value: r.coeff.toString(), label: `${r.name} (K: ${r.coeff})` }))}
              />
              <V2Input 
                label="ODA ALANI (M²)" 
                value={area} 
                onChange={setArea} 
                unit="m²" 
                placeholder="20" 
                fieldClassName="!text-2xl font-black italic"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Select 
                label="BİNA YALITIM DURUMU"
                value={insulation}
                onChange={setInsulation}
                options={[
                  { value: "0.9", label: "Mükemmel Yalıtım" },
                  { value: "1.0", label: "Standart Yalıtım" },
                  { value: "1.2", label: "Zayıf / Yalıtımsız" },
                ]}
              />
              <V2Select 
                label="CEPHE VE GÜNEŞ DURUMU"
                value={sunlight}
                onChange={setSunlight}
                options={[
                  { value: "0.9", label: "Kuzey / Az Güneş Alan" },
                  { value: "1.0", label: "Normal (Doğu-Batı)" },
                  { value: "1.15", label: "Güney / Çok Güneş Alan" },
                ]}
              />
           </div>

           <V2Input 
             label="ORTALAMA KİŞİ SAYISI" 
             value={people} 
             onChange={setPeople} 
             unit="Kişi" 
             placeholder="2" 
             fieldClassName="!text-2xl font-black italic"
           />

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Termal Hesapla" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Wind className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">İKLİMLENDİRME</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">HVAC standartlarına uygun</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Users className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">KİŞİ YÜKÜ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Termal yük dağılım analizi</div>
              </div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Teknik Bilgi:</b> BTU (British Thermal Unit), bir klimanın bir saatte ortamdan taşıdığı ısı miktarını ifade eder. Hesaplama, Türkiye iklim bölgeleri ve standart bina yalıtım verileri üzerinden yapılmaktadır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
