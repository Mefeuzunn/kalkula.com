"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Soup, Wheat, Droplets, FlaskConical, Scale, Trash2, Zap, Info, Utensils, ArrowLeftRight, Coffee, Candy, Beef, ChefHat, Sparkles } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

interface Material {
  name: string;
  density: number; // g/ml
  icon: string;
}

const MATERIALS: Material[] = [
  { name: "Su / Süt / Sirke", density: 1.0, icon: "🥛" },
  { name: "Un (Elenmiş)", density: 0.53, icon: "🌾" },
  { name: "Şeker (Toz)", density: 0.85, icon: "🍬" },
  { name: "Pudra Şekeri", density: 0.56, icon: "✨" },
  { name: "Tereyağı (Eritilmiş)", density: 0.91, icon: "🧈" },
  { name: "Zeytinyağı / Sıvı Yağ", density: 0.92, icon: "🫒" },
  { name: "Bal / Pekmez", density: 1.42, icon: "🍯" },
  { name: "Kakao", density: 0.45, icon: "🍫" },
  { name: "Pirinç", density: 0.85, icon: "🍚" },
  { name: "İrmik", density: 0.75, icon: "🥣" },
];

const UNITS: any = {
  ml: { id: "ml", name: "Mililitre", val: 1 },
  gram: { id: "gram", name: "Gram", val: 1 }, // Calculated with density
  cup: { id: "cup", name: "Su Bardağı", val: 240 },
  tbsp: { id: "tbsp", name: "Yemek Kaşığı", val: 15 },
  tsp: { id: "tsp", name: "Tatlı Kaşığı", val: 5 },
};

export function GastroConverter() {
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("gram");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    if (val <= 0) {
      setResult(0);
      return;
    }

    // Convert everything to ML first
    let mlValue = 0;
    if (fromUnit === "gram") {
      mlValue = val / material.density;
    } else {
      mlValue = val * UNITS[fromUnit].val;
    }

    // Convert from ML to target
    let finalValue = 0;
    if (toUnit === "gram") {
      finalValue = mlValue * material.density;
    } else {
      finalValue = mlValue / UNITS[toUnit].val;
    }

    setResult(finalValue);
  };

  useEffect(() => {
    calculate();
  }, [material, fromUnit, toUnit, amount]);

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 }, colors: ["#6366f1", "#ffffff"] });
  };

  return (
    <V2CalculatorWrapper
      title="MUTFAK & GASTRONOMİ"
      icon="🥣"
      infoText="Malzemelerin özkütle farklarını hesaplayarak ölçü birimleri arasında profesyonel dönüşümler yapın. Tariflerinizde mükemmel sonuçlar için idealdir."
      results={result !== null && (
        <div className="space-y-6">
           <V2ResultCard 
             color="indigo" 
             label={material.name.toUpperCase()} 
             value={`${result.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${UNITS[toUnit].name}`}
             icon={material.icon}
             subLabel="Özkütle Odaklı Hesaplama"
             className="!text-3xl font-black italic"
           />
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-muted font-bold tracking-widest text-center italic opacity-60">
              {amount} {UNITS[fromUnit].name} baz alınarak hesaplandı
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="space-y-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                 <ChefHat className="w-4 h-4 text-indigo-500" /> MALZEME TÜRÜ SEÇİMİ
              </div>
              <V2Select 
                value={material.name} 
                onChange={(val) => setMaterial(MATERIALS.find(m => m.name === val) || MATERIALS[0])}
                options={MATERIALS.map(m => ({ value: m.name, label: `${m.icon} ${m.name}` }))}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end relative">
              <div className="space-y-4">
              <V2Select 
                label="KAYNAK BİRİM" 
                value={fromUnit} 
                onChange={setFromUnit}
                options={[
                  { value: "cup", label: "Su Bardağı" },
                  { value: "tbsp", label: "Yemek Kaşığı" },
                  { value: "tsp", label: "Tatlı Kaşığı" },
                  { value: "gram", label: "Gram" },
                  { value: "ml", label: "Mililitre" },
                ]}
              />
                 <V2Input 
                   label="MİKTAR" 
                   value={amount} 
                   onChange={setAmount} 
                   type="number"
                   fieldClassName="!text-3xl font-black italic"
                 />
              </div>

              <div className="flex items-center justify-center pb-4">
                 <button 
                   onClick={swap}
                   className="w-14 h-14 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center text-muted hover:text-indigo-500 hover:border-indigo-500/40 transition-all hover:scale-110 active:scale-95 group shadow-xl"
                 >
                    <ArrowLeftRight className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                 </button>
              </div>

              <div className="space-y-4">
              <V2Select 
                label="HEDEF BİRİM" 
                value={toUnit} 
                onChange={setToUnit}
                options={[
                  { value: "gram", label: "Gram" },
                  { value: "ml", label: "Mililitre" },
                  { value: "cup", label: "Su Bardağı" },
                  { value: "tbsp", label: "Yemek Kaşığı" },
                  { value: "tsp", label: "Tatlı Kaşığı" },
                ]}
              />
                 <V2Input 
                   label="KARŞILIK" 
                   value={result?.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) || "0"} 
                   readOnly
                   fieldClassName="!text-3xl font-black italic text-indigo-400"
                 />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-indigo-500 uppercase italic">HASSASİYET</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Özkütle Odaklı Ölçüm</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Utensils className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">KULLANIM</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Tüm Mutfak Ölçüleri</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-indigo-600/5 border border-indigo-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-indigo-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Önemli:</b> Her malzemenin hacim/ağırlık oranı farklıdır. Bu araç, malzemelerin bilimsel özkütle verilerini kullanarak hesaplama yapar.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
