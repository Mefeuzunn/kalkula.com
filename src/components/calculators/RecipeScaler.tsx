"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export function RecipeScaler() {
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [newServings, setNewServings] = useState<number>(4);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Un", amount: 500, unit: "gram" },
    { id: "2", name: "Şeker", amount: 200, unit: "gram" },
    { id: "3", name: "Su", amount: 300, unit: "ml" },
    { id: "4", name: "Yumurta", amount: 3, unit: "adet" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", amount: "", unit: "gram" });

  const addIngredient = () => {
    if (newItem.name && newItem.amount) {
      setIngredients([
        ...ingredients,
        { id: Date.now().toString(), name: newItem.name, amount: parseFloat(newItem.amount), unit: newItem.unit }
      ]);
      setNewItem({ name: "", amount: "", unit: "gram" });
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  const scale = (amount: number) => {
    return (amount * (newServings / originalServings)).toLocaleString('tr-TR', { maximumFractionDigits: 1 });
  };

  useEffect(() => {
    if (newServings !== originalServings) {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#f59e0b", "#d97706"]
      });
    }
  }, [newServings]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="md:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-amber-500/20 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Orijinal (Tarif)</label>
                    <div className="relative">
                       <input 
                          type="number" 
                          value={originalServings} 
                          onChange={e => setOriginalServings(Math.max(1, parseInt(e.target.value) || 1))}
                          className="input-field !py-4 font-black text-center"
                       />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-muted">Kişi</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-2 italic">Hedef (Siz)</label>
                    <div className="relative">
                       <input 
                          type="number" 
                          value={newServings} 
                          onChange={e => setNewServings(Math.max(1, parseInt(e.target.value) || 1))}
                          className="input-field !py-4 font-black text-center border-amber-500/30 bg-amber-500/5 text-amber-600"
                       />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-amber-600">Kişi</span>
                    </div>
                 </div>
              </div>

              <div className="w-full h-px bg-border/40 my-2"></div>

              <div className="flex flex-col gap-4">
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yeni Malzeme Ekle</h4>
                 <div className="flex flex-col gap-3">
                    <input 
                       type="text" 
                       placeholder="Malzeme adı..."
                       value={newItem.name}
                       onChange={e => setNewItem({...newItem, name: e.target.value})}
                       className="input-field !py-3 text-sm font-bold"
                    />
                    <div className="flex gap-2">
                       <input 
                          type="number" 
                          placeholder="Miktar"
                          value={newItem.amount}
                          onChange={e => setNewItem({...newItem, amount: e.target.value})}
                          className="input-field !py-3 text-sm font-bold flex-1"
                       />
                       <select 
                          value={newItem.unit}
                          onChange={e => setNewItem({...newItem, unit: e.target.value})}
                          className="input-field !py-3 text-xs font-black uppercase tracking-widest w-24 px-2"
                       >
                          <option value="gram">Gr</option>
                          <option value="ml">Ml</option>
                          <option value="adet">Adet</option>
                          <option value="bardak">Bardak</option>
                          <option value="kaşık">Kaşık</option>
                       </select>
                    </div>
                    <button 
                       onClick={addIngredient}
                       className="w-full py-4 bg-primary text-surface rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform active:scale-95"
                    >
                       Listeye Ekle
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Scaled List */}
        <div className="md:col-span-7 flex flex-col gap-4">
           <div className="panel p-6 bg-secondary/5 rounded-[2.5rem] border border-border min-h-[400px]">
              <div className="flex justify-between items-center mb-8 px-4">
                 <div className="flex flex-col">
                    <h3 className="text-xl font-black italic tracking-tighter text-primary uppercase">Mutfak Analiz Paneli</h3>
                    <p className="text-[10px] font-bold text-muted uppercase">Ölçeklendirilmiş Malzeme Listesi</p>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 italic">
                       Oran: x{(newServings / originalServings).toFixed(2)}
                    </span>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 {ingredients.map(item => (
                    <div key={item.id} className="group relative flex items-center justify-between p-5 bg-surface border border-border rounded-2xl hover:border-amber-500/30 transition-all shadow-sm">
                       <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-widest text-primary">{item.name}</span>
                          <span className="text-[10px] font-bold text-muted italic">Orijinal: {item.amount} {item.unit}</span>
                       </div>
                       
                       <div className="flex items-center gap-6">
                          <div className="flex flex-col items-end">
                             <span className="text-xl font-black text-amber-600 tracking-tighter">{scale(item.amount)}</span>
                             <span className="text-[9px] font-black uppercase text-amber-500/50 italic">{item.unit}</span>
                          </div>
                          <button 
                             onClick={() => removeIngredient(item.id)}
                             className="w-8 h-8 rounded-full bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-lg opacity-0 group-hover:opacity-100"
                          >
                             ×
                          </button>
                       </div>
                    </div>
                 ))}

                 {ingredients.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
                       <span className="text-6xl mb-6">🥘</span>
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted italic">Henüz malzeme eklenmedi</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
