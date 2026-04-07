"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Download, Share2, RefreshCw, Landmark, ShieldCheck, PieChart } from "lucide-react";

export function NetGrossCalculator() {
  const [net, setNet] = useState("35000"); 
  const [results, setResults] = useState<{ gross: number; sgk: number; tax: number; unemploy: number; stamp: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(net);
    if (!n || n <= 0) { setResults(null); return; }
    
    // SGK işçi: %14, İşsizlik: %1, Gelir Vergisi: ~%15 (taban dilim), Damga: %0.759
    const totalDeductionRate = 0.14 + 0.01 + 0.15 + 0.00759;
    const gross = n / (1 - totalDeductionRate);
    const sgk = gross * 0.14;
    const unemploy = gross * 0.01;
    const tax = gross * 0.15;
    const stamp = gross * 0.00759;
    setResults({ gross, sgk, tax, unemploy, stamp });
  };

  const reset = () => { setNet("35000"); setResults(null); };

  useEffect(() => { calculate(); }, [net]);

  const fmt = (v: number) => 
    v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600">
           <Briefcase size={24} />
        </div>
        <div>
           <h1 className="text-2xl font-black italic">Netten Brüte Maaş</h1>
           <p className="text-muted text-[10px] font-black uppercase tracking-widest italic opacity-60">SGK ve Vergi Projeksiyonu 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-10 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-blue-500/20">
              <div className="space-y-6">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Aylık Net Maaş Tutarı</label>
                    <div className="relative">
                       <input 
                          type="number" 
                          value={net} 
                          onChange={(e) => setNet(e.target.value)}
                          placeholder="35000"
                          className="input-field !py-5 !text-4xl font-black border-4 border-border focus:border-blue-500 transition-all pr-12"
                       />
                       <span className="absolute right-6 top-[55%] font-black text-muted text-xl opacity-30 italic">₺</span>
                    </div>
                 </div>
                 
                 <div className="bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-blue-500 shrink-0" />
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-relaxed">
                       Hesaplamalar güncel SGK ve Gelir Vergisi dilimlerine (taban %15) göre anlık yapılır.
                    </span>
                 </div>
              </div>
           </div>

           <button 
              className="btn-secondary w-full !py-4 !rounded-2xl !text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 active:translate-y-1"
              onClick={reset}
           >
              <RefreshCw size={14} /> Tüm Verileri Sıfırla
           </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {results ? (
              <div className="result-container-premium !mt-0 animate-result">
                 <div className="result-card-premium !p-10">
                    <div className="result-badge">
                       <PieChart size={14} className="mr-2" /> MAAŞ ANALİZİ TAMAMLANDI
                    </div>
                    
                    <div className="result-label-premium">Tahmini Brüt Maaşınız</div>
                    <div className="result-value-premium tracking-tighter text-blue-600">
                       {fmt(results.gross)}
                    </div>

                    <div className="mt-10">
                       <table className="result-table-premium">
                          <tbody>
                             <tr>
                                <td>NET MAAŞ (ELE GEÇEN)</td>
                                <td>{fmt(parseFloat(net))}</td>
                             </tr>
                             <tr className="row-danger">
                                <td>SGK İŞÇİ PAYI (%14)</td>
                                <td>-{fmt(results.sgk)}</td>
                             </tr>
                             <tr className="row-danger">
                                <td>İSİZLİK SİGORTASI (%1)</td>
                                <td>-{fmt(results.unemploy)}</td>
                             </tr>
                             <tr className="row-danger">
                                <td>GELİR VERGİSİ (%15)</td>
                                <td>-{fmt(results.tax)}</td>
                             </tr>
                             <tr className="row-danger">
                                <td>DAMGA VERGİSİ (%0.759)</td>
                                <td>-{fmt(results.stamp)}</td>
                             </tr>
                             <tr className="row-total">
                                <td>HESAPLANAN BRÜT MAAŞ</td>
                                <td>{fmt(results.gross)}</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>

                    <div className="result-footer-premium">
                       <button className="btn-secondary !py-2.5 !px-6 text-[10px] font-black group"><Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> PDF BORDRO</button>
                       <button className="btn-primary !py-2.5 !px-6 text-[10px] font-black"><Share2 size={14} /> PAYLAŞ</button>
                    </div>

                    <div className="mt-8 p-6 bg-secondary/5 rounded-2xl border border-border/50 text-[10px] text-muted leading-relaxed italic text-center">
                       ⚠️ <b>Yasal Uyarı:</b> Bu hesaplama taban vergi dilimi esas alınarak yapılmış projeksiyondur. İşveren maliyeti için ayrıca %22.5 SGK işveren payı eklenmelidir.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-dashed border-4 border-border/40 text-center grayscale opacity-40 h-full">
                 <div className="text-7xl mb-8">💼</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">PROJEKSİYON İÇİN<br/> NET MAAŞ GİRİNİZ</h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
