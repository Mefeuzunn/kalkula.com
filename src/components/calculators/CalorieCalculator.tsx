"use client";

import React, { useState, useEffect } from "react";
import { Flame, Calculator, RefreshCw, Zap, TrendingUp, TrendingDown, Target } from "lucide-react";

export function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<{ bmr: number; tdee: number; lose: number; gain: number } | null>(null);

  const ACTIVITIES = [
    { value: "1.2", label: "Hareketsiz (Masa başı)" },
    { value: "1.375", label: "Hafif aktif (1-3 gün/hafta)" },
    { value: "1.55", label: "Orta aktif (3-5 gün/hafta)" },
    { value: "1.725", label: "Çok aktif (6-7 gün/hafta)" },
    { value: "1.9", label: "Ekstra aktif (Fiziksel iş)" },
  ];

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) { setResult(null); return; }
    let bmr = gender === "male"
      ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
      : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    const tdee = Math.round(bmr * parseFloat(activity));
    setResult({ bmr: Math.round(bmr), tdee, lose: tdee - 500, gain: tdee + 500 });
  };

  const reset = () => { setGender("male"); setWeight("70"); setHeight("175"); setAge("30"); setActivity("1.2"); setResult(null); };

  useEffect(() => { calculate(); }, [gender, weight, height, age, activity]);

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-600">
           <Flame size={24} />
        </div>
        <div>
           <h1 className="text-2xl font-black italic">Günlük Kalori İhtiyacı</h1>
           <p className="text-muted text-[10px] font-black uppercase tracking-widest italic opacity-60">Harris-Benedict Enerji Analizi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Inputs Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-10 bg-secondary/5 border-border rounded-[3.5rem] border-b-8 border-orange-500/20">
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Biyo-Cinsiyet</label>
                    <div className="flex bg-secondary/10 p-2 rounded-2xl gap-2">
                       <button 
                          className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-surface text-accent-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                          onClick={() => setGender("male")}
                       >
                          ♂ ERKEK
                       </button>
                       <button 
                          className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-surface text-accent-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                          onClick={() => setGender("female")}
                       >
                          ♀ KADIN
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">KİLO (KG)</label>
                       <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field !text-2xl font-black py-4 border-4 border-border" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">BOY (CM)</label>
                       <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field !text-2xl font-black py-4 border-4 border-border" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">YAŞ</label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="input-field !text-2xl font-black py-4 border-4 border-border" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 text-orange-600 italic">HAREKET SEVİYESİ</label>
                    <select value={activity} onChange={e => setActivity(e.target.value)} className="input-field !py-4 font-black !text-sm italic appearance-none bg-white dark:bg-zinc-800">
                       {ACTIVITIES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                    </select>
                 </div>
              </div>
           </div>

           <button 
              className="btn-secondary w-full !py-5 !rounded-3xl !text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 active:translate-y-1"
              onClick={reset}
           >
              <RefreshCw size={14} /> Temizle ve Sıfırla
           </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {result ? (
              <div className="result-container-premium !mt-0 animate-result">
                 <div className="result-card-premium !p-10">
                    <div className="result-badge">
                       <Zap size={14} className="mr-2" /> ENERJİ ANALİZİ TAMAMLANDI
                    </div>
                    
                    <div className="result-label-premium">Günlük Enerji İhtiyacınız (TDEE)</div>
                    <div className="result-value-premium tracking-tighter text-orange-600">
                       {result.tdee} <span className="text-xl font-black opacity-40">kcal</span>
                    </div>

                    <div className="mt-10 max-w-md mx-auto">
                       <table className="result-table-premium">
                          <tbody>
                             <tr>
                                <td className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-blue-500" /> BAZAL METABOLİZMA (BMR)
                                </td>
                                <td>{result.bmr} kcal</td>
                             </tr>
                             <tr className="row-success">
                                <td className="flex items-center gap-2">
                                   <Target size={14} /> KİLO KORUMAK İÇİN
                                </td>
                                <td>{result.tdee} kcal</td>
                             </tr>
                             <tr className="row-accent">
                                <td className="flex items-center gap-2">
                                   <TrendingDown size={14} /> KİLO VERMEK İÇİN
                                </td>
                                <td>{result.lose} kcal</td>
                             </tr>
                             <tr className="row-danger">
                                <td className="flex items-center gap-2">
                                   <TrendingUp size={14} /> KİLO ALMAK İÇİN
                                </td>
                                <td>{result.gain} kcal</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>

                    <div className="result-footer-premium">
                       <button className="btn-secondary !py-2.5 !px-6 text-[10px] font-black group"><RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> YENİ ANALİZ</button>
                       <button className="btn-primary !py-2.5 !px-6 text-[10px] font-black"><Calculator size={14} /> BESLENME PLANI</button>
                    </div>

                    <div className="mt-8 p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-[10px] text-orange-600/60 leading-relaxed italic text-center">
                       ℹ️ <b>Uzman Tavsiyesi:</b> Sağlıklı kilo kaybı için günlük kalori miktarınızı TDEE değerinizden 300-500 kcal daha az, kilo almak için ise 300-500 kcal daha fazla olarak belirlemeniz önerilir.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-dashed border-4 border-border/40 text-center grayscale opacity-40 h-full">
                 <div className="text-7xl mb-8">🔥</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">ENERJİ PROFİLİ İÇİN<br/> VERİLERİ DOLDURUN</h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
