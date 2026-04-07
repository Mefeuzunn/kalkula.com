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
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Controls */}
        <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-indigo-500/20 flex flex-col gap-6">
            <div className="group relative">
               <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
                  shadow-[0_10px_0_rgba(0,0,0,0.08)] dark:shadow-[0_10px_0_rgba(0,0,0,0.4)]
                  group-focus-within:-translate-y-1 group-focus-within:shadow-[0_6px_0_rgba(0,0,0,0.1)]
                  hover:-translate-y-0.5 hover:shadow-[0_12px_0_rgba(0,0,0,0.06)] 
                  overflow-hidden">
                  <div className="bg-secondary/20 p-3 border-b-2 border-border text-teal-600 dark:text-teal-400">
                     <label className="text-[9px] font-black uppercase tracking-widest px-4 italic opacity-60">Malzeme Seçimi</label>
                  </div>
                  <select 
                     className="w-full bg-transparent border-none outline-none font-black text-lg py-5 px-6 appearance-none cursor-pointer"
                     onChange={(e) => setMaterial(MATERIALS.find(m => m.name === e.target.value) || MATERIALS[0])}
                  >
                     {MATERIALS.map(m => (
                        <option key={m.name} value={m.name}>{m.name}</option>
                     ))}
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
               <div className="group relative">
                  <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
                     shadow-[0_10px_0_rgba(0,0,0,0.08)] dark:shadow-[0_10px_0_rgba(0,0,0,0.4)]
                     group-focus-within:-translate-y-1 group-focus-within:shadow-[0_6px_0_rgba(0,0,0,0.1)]
                     overflow-hidden flex items-center">
                     <div className="flex-1">
                        <div className="bg-secondary/20 p-2 border-b-2 border-border text-teal-600 dark:text-teal-400">
                           <label className="text-[9px] font-black uppercase tracking-widest px-4 italic opacity-60">Miktar ve Birim</label>
                        </div>
                        <div className="flex">
                           <input 
                              type="number" 
                              value={amount} 
                              onChange={e => setAmount(e.target.value)}
                              className="bg-transparent border-none outline-none font-black text-4xl p-6 w-full italic tracking-tighter"
                              placeholder="1"
                           />
                           <select 
                              value={fromUnit} 
                              onChange={e => setFromUnit(e.target.value)}
                              className="bg-secondary/10 border-l-2 border-border outline-none text-[10px] font-black uppercase tracking-widest w-32 px-4 cursor-pointer"
                           >
                              <option value="cup">Su Bardağı</option>
                              <option value="tbsp">Yemek Kaşığı</option>
                              <option value="tsp">Tatlı Kaşığı</option>
                              <option value="gram">Gram</option>
                              <option value="ml">Mililitre</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="group relative">
                  <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
                     shadow-[0_8px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_0_rgba(0,0,0,0.4)]
                     group-focus-within:-translate-y-1 group-focus-within:shadow-[0_6px_0_rgba(59,130,246,0.1)]
                     overflow-hidden">
                     <div className="bg-secondary/20 p-2 border-b-2 border-border text-accent-primary">
                        <label className="text-[9px] font-black uppercase tracking-widest px-4 italic opacity-60">Hedef Birim</label>
                     </div>
                     <select 
                        value={toUnit} 
                        onChange={e => setToUnit(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest py-4 px-6 appearance-none cursor-pointer"
                     >
                        <option value="gram">Gram</option>
                        <option value="ml">Mililitre</option>
                        <option value="cup">Su Bardağı</option>
                        <option value="tbsp">Yemek Kaşığı</option>
                        <option value="tsp">Tatlı Kaşığı</option>
                     </select>
                  </div>
               </div>
            </div>

           <div className="mt-4 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-[9px] text-indigo-700 dark:text-indigo-400 font-bold italic text-center">
              💡 Her malzemenin özkütlesi farklıdır. 1 bardak un ile 1 bardak şeker aynı ağırlıkta (gram) değildir.
           </div>
        </div>

        {/* Display Area */}
        <div className="flex flex-col gap-4">
           {result !== null ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-white dark:bg-zinc-900 border-4 border-indigo-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-indigo-600 tracking-[0.3em] uppercase rotate-12">Kitchen Engine v1.5</div>
                    
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center text-4xl mb-6">⚖️</div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 italic">Karşılık Gelen Miktar</span>
                    
                    <div className="text-6xl font-black italic tracking-tighter text-indigo-600 mb-2 drop-shadow-sm">
                       {result.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} <span className="text-2xl not-italic ml-1 font-bold text-primary">{toUnit === "gram" ? 'gr' : toUnit === "ml" ? 'ml' : 'adet'}</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent my-8"></div>

                    <div className="flex flex-col gap-2">
                       <span className="text-[11px] font-black text-primary uppercase italic tracking-widest">{material.name}</span>
                       <span className="text-[9px] font-bold text-muted uppercase italic tracking-widest">{amount} {fromUnit} için geçerli</span>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex items-center justify-center bg-secondary/5 rounded-[2.5rem] grayscale opacity-40">
                 <span className="text-xl font-black italic text-muted">Dönüştürülüyor... 🥣</span>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
