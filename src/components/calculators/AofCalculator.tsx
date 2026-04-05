import React, { useState } from "react";
import confetti from "canvas-confetti";

export function AofCalculator() {
  const [vize, setVize] = useState("");
  const [final, setFinal] = useState("");
  const [result, setResult] = useState<{ 
    ortalama: number; 
    harf: string; 
    durum: string; 
    color: string;
    isFailed: boolean;
  } | null>(null);

  const hesapla = () => {
    const v = parseFloat(vize);
    const f = parseFloat(final);
    
    if (isNaN(v) || isNaN(f)) return;

    // AÖF Standart: %30 vize, %70 final
    const ortalama = (v * 0.3) + (f * 0.7);
    
    let harf = "";
    let durum = "";
    let color = "";
    let isFailed = false;

    if (f < 35) {
      harf = "FF"; 
      durum = "Kaldı (Final Barajı Altında)"; 
      color = "#ef4444";
      isFailed = true;
    } else if (ortalama < 35) {
      harf = "FF"; 
      durum = "Kaldı (Ortalama Yetersiz)"; 
      color = "#ef4444";
      isFailed = true;
    } else if (ortalama >= 84) { 
      harf = "AA"; durum = "Üstün Başarı ile Geçti"; color = "#10b981"; 
    } else if (ortalama >= 77) { 
      harf = "AB"; durum = "Başarı ile Geçti"; color = "#10b981"; 
    } else if (ortalama >= 71) { 
      harf = "BA"; durum = "Geçti"; color = "#3b82f6"; 
    } else if (ortalama >= 56) { 
      harf = "BB"; durum = "Geçti"; color = "#3b82f6"; 
    } else if (ortalama >= 50) { 
      harf = "CC"; durum = "Geçti"; color = "#8b5cf6"; 
    } else { 
      harf = "DC"; durum = "Koşullu Geçti"; color = "#f59e0b"; 
    }

    setResult({ ortalama, harf, durum, color, isFailed });
    
    if (!isFailed) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: [color, "#ffffff"] });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Vize Notu (%30)</label>
          <input type="number" placeholder="0-100" value={vize} onChange={e => setVize(e.target.value)} className="input-field py-4 font-bold text-center" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Final Notu (%70)</label>
          <input type="number" placeholder="0-100" value={final} onChange={e => setFinal(e.target.value)} className="input-field py-4 font-bold text-center border-accent-primary/20" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Başarı Durumunu Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className={`result-card-premium border-2`} style={{ borderColor: `${result.color}33`, boxShadow: `0 0 20px ${result.color}11` }}>
              <div className="result-badge" style={{ backgroundColor: `${result.color}11`, color: result.color, borderColor: `${result.color}33` }}>
                 AÖF Başarı Sonucu
              </div>
              
              <div className="text-5xl font-black mb-1">{result.ortalama.toFixed(2)}</div>
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-8">Dönem Sonu Başarı Puanı</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-border">
                 <div className="text-center p-6 bg-secondary/10 rounded-2xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Harf Notu</div>
                    <div className="text-4xl font-black" style={{ color: result.color }}>{result.harf}</div>
                 </div>
                 <div className="text-center p-6 bg-secondary/10 rounded-2xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Durum</div>
                    <div className="text-sm font-bold mt-2" style={{ color: result.color }}>{result.durum}</div>
                 </div>
              </div>

              <div className="mt-6 p-4 bg-secondary/5 rounded-xl text-[10px] text-muted font-medium italic border border-border/30">
                 💡 AÖF sisteminde final sınavından en az 35 alma zorunluluğu (baraj) bulunmaktadır. 
                 Aksi takdirde ortalamanız kaç olursa olsun harf notunuz FF olarak sisteme yansır.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
