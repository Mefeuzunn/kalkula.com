"use client";

import React, { useState, useEffect } from "react";
import { Percent, ArrowRight, RefreshCw, Calculator, TrendingUp } from "lucide-react";

export function PercentageCalculator() {
  const [val1, setVal1] = useState("500");
  const [val2, setVal2] = useState("20");
  const [val3, setVal3] = useState("50");
  const [val4, setVal4] = useState("200");
  const [val5, setVal5] = useState("100");
  const [val6, setVal6] = useState("150");

  const [res1, setRes1] = useState<string | null>(null);
  const [res2, setRes2] = useState<string | null>(null);
  const [res3, setRes3] = useState<string | null>(null);

  useEffect(() => {
    const x = parseFloat(val1), y = parseFloat(val2);
    if (!isNaN(x) && !isNaN(y)) setRes1(((x * y) / 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }));
    else setRes1(null);
  }, [val1, val2]);

  useEffect(() => {
    const x = parseFloat(val3), y = parseFloat(val4);
    if (!isNaN(x) && !isNaN(y) && y !== 0) setRes2(((x / y) * 100).toLocaleString("tr-TR", { maximumFractionDigits: 4 }) + "%");
    else setRes2(null);
  }, [val3, val4]);

  useEffect(() => {
    const start = parseFloat(val5), end = parseFloat(val6);
    if (!isNaN(start) && !isNaN(end) && start !== 0) {
      const change = ((end - start) / Math.abs(start)) * 100;
      setRes3((change >= 0 ? "+" : "") + change.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + "%");
    } else setRes3(null);
  }, [val5, val6]);

  const reset = () => {
    setVal1("500"); setVal2("20"); setVal3("50"); setVal4("200"); setVal5("100"); setVal6("150");
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-600">
          <Percent size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black italic">Yüzde Hesaplama</h1>
          <p className="text-muted text-[10px] font-black uppercase tracking-widest italic opacity-60">Pratik Matematik Araçları</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Bölüm 1 */}
        <div className="flex flex-col gap-5">
           <div className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem] border-b-4 border-purple-500/20">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest px-1 block mb-4 italic">📌 YÜZDE TUTARI</span>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">SAYI (A)</label>
                    <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border" placeholder="500" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">YÜZDE (B)</label>
                    <div className="relative">
                       <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border pr-12" placeholder="20" />
                       <span className="absolute right-4 top-[32%] font-black text-muted opacity-30">%</span>
                    </div>
                 </div>
              </div>
           </div>
           {res1 && (
              <div className="result-container-premium !mt-0 animate-result">
                 <div className="result-card-premium !p-6">
                    <div className="result-label-premium !mb-2 !text-[9px]">{val1} sayısının %{val2}'si</div>
                    <div className="result-value-premium !text-3xl tracking-tighter text-purple-600">{res1}</div>
                 </div>
              </div>
           )}
        </div>

        {/* Bölüm 2 */}
        <div className="flex flex-col gap-5">
           <div className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem] border-b-4 border-blue-500/20">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest px-1 block mb-4 italic">📌 YÜZDE ORANI</span>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">SAYI (A)</label>
                    <input type="number" value={val3} onChange={e => setVal3(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border" placeholder="50" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">TÜMÜ (B)</label>
                    <input type="number" value={val4} onChange={e => setVal4(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border" placeholder="200" />
                 </div>
              </div>
           </div>
           {res2 && (
              <div className="result-container-premium !mt-0 animate-result">
                 <div className="result-card-premium !p-6">
                    <div className="result-label-premium !mb-2 !text-[9px]">{val3}, {val4} sayısının yüzde kaçıdır?</div>
                    <div className="result-value-premium !text-3xl tracking-tighter text-blue-600">{res2}</div>
                 </div>
              </div>
           )}
        </div>

        {/* Bölüm 3 */}
        <div className="flex flex-col gap-5">
           <div className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem] border-b-4 border-emerald-500/20">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest px-1 block mb-4 italic">📌 DEĞİŞİM ORANI</span>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">İLK DEĞER (A)</label>
                    <input type="number" value={val5} onChange={e => setVal5(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border" placeholder="100" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-muted tracking-widest px-2">SON DEĞER (B)</label>
                    <input type="number" value={val6} onChange={e => setVal6(e.target.value)} className="input-field !text-xl font-black py-3 border-4 border-border" placeholder="150" />
                 </div>
              </div>
           </div>
           {res3 && (
              <div className="result-container-premium !mt-0 animate-result">
                 <div className="result-card-premium !p-6">
                    <div className="result-label-premium !mb-2 !text-[9px]">A'dan B'ye değişim oranı</div>
                    <div className={`result-value-premium !text-3xl tracking-tighter ${parseFloat(res3) >= 0 ? "text-emerald-600" : "text-red-600"}`}>{res3}</div>
                 </div>
              </div>
           )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button className="btn-secondary !rounded-2xl !py-4 !px-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest group" onClick={reset}>
           <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
           Tüm Verileri Temizle
        </button>
      </div>

      <div className="calc-info-box mt-10 bg-purple-500/5 border-purple-500/10">
         <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
            <Calculator size={20} />
         </div>
         <p className="text-[11px] text-muted leading-relaxed font-medium italic">
            <b>Pratik Bilgi:</b> Yüzde hesaplamaları günlük hayatta indirim, KDV, kâr payı ve büyüme analizlerinde en sık kullanılan matematiksel formüllerdir. Her kutucukta yaptığınız değişiklik anında alt panelde sonuçlanır.
         </p>
      </div>
    </div>
  );
}
