"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Material {
  name: string;
  density: number; // g/ml
}

const MATERIALS: Material[] = [
  { name: "Su / Süt / Sirke", density: 1.0 },
  { name: "Un (Elenmiş)", density: 0.53 },
  { name: "Şeker (Toz)", density: 0.85 },
  { name: "Pudra Şekeri", density: 0.56 },
  { name: "Tereyağı (Eritilmiş)", density: 0.91 },
  { name: "Zeytinyağı / Sıvı Yağ", density: 0.92 },
  { name: "Bal / Pekmez", density: 1.42 },
  { name: "Kakao", density: 0.45 },
  { name: "Pirinç", density: 0.85 },
  { name: "İrmik", density: 0.75 },
];

const UNITS: any = {
  ml: 1,
  gram: 1, // Will be calculated with density
  cup: 240,
  tbsp: 15,
  tsp: 5,
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
      mlValue = val * UNITS[fromUnit];
    }

    // Convert from ML to target
    let finalValue = 0;
    if (toUnit === "gram") {
      finalValue = mlValue * material.density;
    } else {
      finalValue = mlValue / UNITS[toUnit];
    }

    setResult(finalValue);

    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.7 },
      colors: ["#6366f1", "#a855f7"]
    });
  };

  useEffect(() => {
    calculate();
  }, [material, fromUnit, toUnit, amount]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <label className="calc-input-label">MALZEME TÜRÜ</label>
        <div className="calc-input-key">
            <div className="bg-secondary/10 p-4 border-b border-border flex justify-between items-center px-8">
               <span className="text-[10px] font-bold text-muted uppercase tracking-widest italic opacity-40">Hesaplanacak Özkütle Seçimi</span>
            </div>
            <select 
               className="calc-input-field !text-2xl py-6 appearance-none cursor-pointer"
               onChange={(e) => setMaterial(MATERIALS.find(m => m.name === e.target.value) || MATERIALS[0])}
            >
               {MATERIALS.map(m => (
                  <option key={m.name} value={m.name} className="bg-surface text-primary">{m.name}</option>
               ))}
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label className="calc-input-label">MİKTAR VE BİRİM</label>
          <div className="calc-input-key">
              <div className="absolute top-4 right-6">
                 <select 
                    value={fromUnit} 
                    onChange={e => setFromUnit(e.target.value)}
                    className="bg-accent-glow border border-accent-primary/20 rounded-lg text-[9px] font-black uppercase tracking-widest px-3 py-1 cursor-pointer outline-none"
                 >
                    <option value="cup">Su Bardağı</option>
                    <option value="tbsp">Yemek Kaşığı</option>
                    <option value="tsp">Tatlı Kaşığı</option>
                    <option value="gram">Gram</option>
                    <option value="ml">Mililitre</option>
                 </select>
              </div>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="calc-input-field" 
                placeholder="1" 
              />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="calc-input-label">HEDEF BİRİM</label>
          <div className="calc-input-key">
              <div className="bg-secondary/10 p-3 border-b border-border text-center">
                 <span className="text-[10px] font-bold text-muted uppercase tracking-widest italic opacity-40">Sonuç Birimi</span>
              </div>
              <select 
                value={toUnit} 
                onChange={e => setToUnit(e.target.value)}
                className="calc-input-field !text-xl py-6 appearance-none cursor-pointer"
              >
                <option value="gram" className="bg-surface text-primary">Gram</option>
                <option value="ml" className="bg-surface text-primary">Mililitre</option>
                <option value="cup" className="bg-surface text-primary">Su Bardağı</option>
                <option value="tbsp" className="bg-surface text-primary">Yemek Kaşığı</option>
                <option value="tsp" className="bg-surface text-primary">Tatlı Kaşığı</option>
              </select>
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="panel p-0 bg-transparent border-none shadow-none mt-4">
          <div className="calc-result-header">
            <span>🥣</span> MUTFAK DÖNÜŞÜM SONUCU
          </div>
          
          <div className="calc-result-card !bg-secondary/5 border-indigo-500/20 !items-start overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-9xl">🍳</div>
             <div className="calc-result-card-label text-indigo-600">{material.name.toUpperCase()}</div>
             <div className="calc-result-card-value text-indigo-600 !text-6xl md:!text-7xl">
                {result.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} <span className="text-2xl not-italic ml-2 font-black text-primary uppercase">{toUnit}</span>
             </div>
             <div className="calc-result-card-desc italic mt-2">{amount} {fromUnit} baz alınarak hesaplandı</div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-indigo-500/5 border-2 border-dashed border-indigo-500/20 rounded-3xl flex gap-4 items-center">
        <span className="text-2xl">💡</span>
        <p className="text-xs font-bold text-muted italic">Her malzemenin özkütlesi farklıdır. Örn: 1 bardak un (140g) ile 1 bardak şeker (200g) aynı ağırlıkta değildir. Mutfak motoru bu farkları 2026 hassasiyetiyle hesaplar.</p>
      </div>
    </div>
  );
}
