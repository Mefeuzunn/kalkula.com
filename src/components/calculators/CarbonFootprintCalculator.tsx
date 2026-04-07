"use client";

import React, { useState, useEffect } from "react";
import { TreeDeciduous, Car, Zap, Plane, Utensils, Info, Wind, LayoutPanelLeft } from "lucide-react";

export function CarbonFootprintCalculator() {
  const [electricity, setElectricity] = useState(3000); // kWh/year
  const [gas, setGas] = useState(1200); // m3/year
  const [carKm, setCarKm] = useState(12000); // km/year
  const [flightHours, setFlightHours] = useState(5); // hours/year
  const [diet, setDiet] = useState<"meat" | "vegetarian" | "vegan">("meat");

  const [totalCO2, setTotalCO2] = useState(0);
  const [treesNeeded, setTreesNeeded] = useState(0);

  const calculateFootprint = () => {
    const electricityCO2 = electricity * 0.45;
    const gasCO2 = gas * 2.02;
    const carCO2 = carKm * 0.17;
    const flightCO2 = flightHours * 90;
    
    let dietCO2 = 1500;
    if (diet === "vegetarian") dietCO2 = 800;
    if (diet === "vegan") dietCO2 = 500;

    const total = electricityCO2 + gasCO2 + carCO2 + flightCO2 + dietCO2;
    setTotalCO2(Math.round(total));
    setTreesNeeded(Math.ceil(total / 20)); // Each tree absorbs ~20kg CO2/year
  };

  useEffect(() => {
    calculateFootprint();
  }, [electricity, gas, carKm, flightHours, diet]);

  const getCO2Level = () => {
    if (totalCO2 < 3000) return { label: "Çok İyi", color: "text-green-500", bg: "bg-green-500/10" };
    if (totalCO2 < 7000) return { label: "Ortalama", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Yüksek", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const level = getCO2Level();

  return (
    <div className="calc-wrapper animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-accent-glow rounded-2xl flex items-center justify-center text-accent-primary">
          <Wind size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Karbon Ayak İzi Hesaplayıcı</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Ekolojik Etki Analizi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Electricity */}
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" /> YILLIK ELEKTRİK (kWh)
              </label>
              <input 
                type="number" value={electricity} onChange={(e) => setElectricity(Number(e.target.value))}
                className="calc-input w-full"
              />
            </div>
            {/* Natural Gas */}
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter flex items-center gap-2">
                <Wind size={14} className="text-blue-400" /> YILLIK DOĞAL GAZ (m³)
              </label>
              <input 
                type="number" value={gas} onChange={(e) => setGas(Number(e.target.value))}
                className="calc-input w-full"
              />
            </div>
            {/* Car */}
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter flex items-center gap-2">
                <Car size={14} className="text-slate-400" /> YILLIK ARAÇ MESAFESİ (km)
              </label>
              <input 
                type="number" value={carKm} onChange={(e) => setCarKm(Number(e.target.value))}
                className="calc-input w-full"
              />
            </div>
            {/* Flights */}
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter flex items-center gap-2">
                <Plane size={14} className="text-blue-500" /> YILLIK UÇUŞ SÜRESİ (SAAT)
              </label>
              <input 
                type="number" value={flightHours} onChange={(e) => setFlightHours(Number(e.target.value))}
                className="calc-input w-full"
              />
            </div>
          </div>

          {/* Diet Selection */}
          <div className="space-y-4 pt-4 border-t border-border">
            <label className="text-xs font-black text-muted uppercase tracking-tighter flex items-center gap-2">
              <Utensils size={14} className="text-red-500" /> BESLENME ALIŞKANLIĞI
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "meat", label: "ETÇİL", icon: "🍖" },
                { id: "vegetarian", label: "VEJETARYEN", icon: "🥦" },
                { id: "vegan", label: "VEGAN", icon: "🌱" }
              ].map(d => (
                <button 
                  key={d.id}
                  onClick={() => setDiet(d.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-black text-[10px] ${diet === d.id ? "bg-accent-primary border-accent-primary text-white shadow-lg" : "bg-secondary/20 border-border text-muted hover:border-accent-primary/20"}`}
                >
                  <span className="text-xl">{d.icon}</span>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
           {/* Total Result */}
           <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <span className={`${level.bg} ${level.color} text-[10px] font-black px-3 py-1 rounded-full border border-current opacity-80 uppercase tracking-widest`}>
                    {level.label}
                 </span>
              </div>
              <p className="text-xs font-black text-muted uppercase tracking-widest mb-2">YILLIK TOPLAM SALINIM</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-5xl font-black text-primary">{totalCO2}</p>
                <div className="text-left leading-none">
                   <p className="text-xl font-black text-muted uppercase">kg</p>
                   <p className="text-xs font-black text-muted uppercase tracking-tighter">CO₂e</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-secondary/10 rounded-3xl border border-border flex flex-col items-center">
                    <p className="text-[10px] font-black text-muted uppercase mb-1">DÜNYA ORTALAMASI</p>
                    <p className="text-lg font-black text-primary">~4,800 kg</p>
                 </div>
                 <div className="p-4 bg-secondary/10 rounded-3xl border border-border flex flex-col items-center">
                    <p className="text-[10px] font-black text-muted uppercase mb-1">HEDEF SEVİYE</p>
                    <p className="text-lg font-black text-green-500">2,000 kg</p>
                 </div>
              </div>
           </div>

           {/* Offset Action */}
           <div className="bg-accent-primary p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <TreeDeciduous size={200} />
              </div>
              <h3 className="text-lg font-black mb-2">Etkinizi SIFIRLAMAK İçin...</h3>
              <p className="text-sm opacity-80 mb-8 leading-relaxed max-w-[80%]">
                Yıllık karbon salınımınızı tamamen telafi etmek (Carbon Neutral) için doğaya borcunuz olan ağaç miktarı:
              </p>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center text-white backdrop-blur-sm">
                   <TreeDeciduous size={40} />
                </div>
                <div>
                   <p className="text-4xl font-black">{treesNeeded} AĞAÇ</p>
                   <p className="text-xs font-black opacity-80 uppercase tracking-widest">YILLIK DİKİLMELİ</p>
                </div>
              </div>
              <button 
                className="mt-8 w-full bg-white text-accent-primary p-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg"
                onClick={() => window.open('https://www.tema.org.tr/bagis-secenekleri', '_blank')}
              >
                HEMEN FİDAN BAĞIŞLA (TEMA)
              </button>
           </div>
        </div>
      </div>

      <div className="calc-info-box mt-12">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">
          <b>Nasıl Azaltırsınız?</b> Kırmızı et tüketiminizi haftada 2 gün azaltmak ayak izinizi yılda ~300kg düşürebilir. Ampullerinizi LED ile değiştirmek ve toplu taşımayı tercih etmek en hızlı adımlardır.
        </span>
      </div>
    </div>
  );
}
