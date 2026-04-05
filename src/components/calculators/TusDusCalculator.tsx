import React, { useState } from "react";
import confetti from "canvas-confetti";

export function TusDusCalculator() {
  const [tt1, setTt1] = useState("");
  const [tk, setTk] = useState("");
  const [result, setResult] = useState<{ klinik: string; temel: string } | null>(null);

  const hesapla = () => {
    const t1 = parseFloat(tt1);
    const k = parseFloat(tk);
    
    if (isNaN(t1) || isNaN(k)) return;

    // TUS Yaklaşık Puan Formülü
    const pKlinik = 40 + (k * 0.45) + (t1 * 0.25);
    const pTemel = 40 + (t1 * 0.45) + (k * 0.25);
    
    setResult({ klinik: pKlinik.toFixed(2), temel: pTemel.toFixed(2) });
    
    confetti({ 
      particleCount: 50, 
      spread: 60, 
      origin: { y: 0.8 }, 
      colors: ["#3b82f6", "#8b5cf6"] 
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Temel Tıp Neti (0-120)</label>
          <input type="number" value={tt1} onChange={e => setTt1(e.target.value)} className="input-field py-4 font-bold text-center" placeholder="85" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Klinik Tıp Neti (0-120)</label>
          <input type="number" value={tk} onChange={e => setTk(e.target.value)} className="input-field py-4 font-bold text-center" placeholder="90" />
        </div>
      </div>

      <button className="btn-primary py-4 text-xl font-black shadow-xl uppercase tracking-widest" onClick={hesapla}>Puanları Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 border-border shadow-2xl">
              <div className="result-badge !bg-purple-500/10 !text-purple-500 !border-purple-500/20">Sınav Tahmin Sonucu</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <div className="text-center p-8 bg-accent-primary/5 rounded-[2rem] border-2 border-accent-primary/20 relative group hover:scale-[1.02] transition-all">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1 tracking-widest">Klinik Puanı</div>
                    <div className="text-5xl font-black text-accent-primary italic">{result.klinik}</div>
                    <div className="mt-4 text-[10px] text-muted font-bold">Tercih Puanı (K)</div>
                 </div>
                 <div className="text-center p-8 bg-accent-secondary/5 rounded-[2rem] border-2 border-accent-secondary/20 relative group hover:scale-[1.02] transition-all">
                    <div className="text-[10px] font-black text-accent-secondary uppercase mb-1 tracking-widest">Temel Puanı</div>
                    <div className="text-5xl font-black text-accent-secondary italic">{result.temel}</div>
                    <div className="mt-4 text-[10px] text-muted font-bold">Bilim Puanı (T)</div>
                 </div>
              </div>

              <div className="mt-8 p-6 bg-secondary/5 rounded-2xl text-[11px] text-muted font-medium italic border border-border/30 text-center leading-relaxed">
                 💡 Bu hesaplama, genel sınav ortalaması ve standart sapmaların geçmiş yıllara paralel olduğu varsayımıyla <b>tahmini</b> üretilmiştir. 
                 Net puanlar, ilgili sınav dönemindeki istatistiklere göre ±2 puan değişkenlik gösterebilir.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
