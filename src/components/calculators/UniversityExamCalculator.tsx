import React, { useState } from "react";
import confetti from "canvas-confetti";

export function UniversityExamCalculator() {
  const [vize, setVize] = useState("");
  const [vizeWeight, setVizeWeight] = useState("40");
  const [finalScore, setFinalScore] = useState("");
  const [finalWeight, setFinalWeight] = useState("60");
  const [target, setTarget] = useState("50");
  const [result, setResult] = useState<{ average: number; needed?: number; status: string; color: string } | null>(null);

  const calculate = () => {
    const v = parseFloat(vize);
    const vw = parseFloat(vizeWeight) / 100;
    const f = parseFloat(finalScore);
    const fw = parseFloat(finalWeight) / 100;
    const t = parseFloat(target);

    let average = 0;
    let needed = undefined;

    if (!isNaN(v) && vw + fw > 0) {
       // Final notu girilmişse ortalama hesapla
       if(!isNaN(f)) {
          average = (v * vw + f * fw) / (vw + fw);
       }
       
       // Hedef not için gereken finali hesapla -> target = (v*vw + needed*fw) / (vw+fw)
       needed = (t * (vw + fw) - (v * vw)) / fw;
    }

    const status = (!isNaN(f) && average >= t) ? "BAŞARILI" : (!isNaN(f) ? "BAŞARISIZ" : "HESAPLANDI");
    const color = status === "BAŞARILI" ? "#10b981" : (status === "BAŞARISIZ" ? "#ef4444" : "#3b82f6");

    setResult({ average, needed: needed, status, color });
    
    if (status === "BAŞARILI") {
       confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#10b981", "#ffffff"] });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel p-6 border-2 border-border/50 bg-secondary/5 rounded-3xl">
           <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 italic">Vize (Ara Sınav) Ayarları</div>
           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary px-1">Notunuz</label>
                 <input type="number" value={vize} onChange={e => setVize(e.target.value)} className="input-field py-4 font-black" placeholder="Örn: 65" />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary px-1">Etkisi (%)</label>
                 <input type="number" value={vizeWeight} onChange={e => setVizeWeight(e.target.value)} className="input-field py-3 font-bold opacity-70" />
              </div>
           </div>
        </div>

        <div className="panel p-6 border-2 border-border/50 bg-secondary/5 rounded-3xl">
           <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 italic">Final (Dönem Sonu) Ayarları</div>
           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary px-1">Notunuz (Opsiyonel)</label>
                 <input type="number" value={finalScore} onChange={e => setFinalScore(e.target.value)} className="input-field py-4 font-black border-accent-primary/20" placeholder="Örn: 70" />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary px-1">Etkisi (%)</label>
                 <input type="number" value={finalWeight} onChange={e => setFinalWeight(e.target.value)} className="input-field py-3 font-bold opacity-70" />
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
         <div className="flex flex-col gap-2 text-center mb-6">
            <label className="text-xs font-black text-muted uppercase tracking-[0.2em]">Hedef Geçme Notu</label>
            <input type="number" value={target} onChange={e => setTarget(e.target.value)} className="input-field !text-3xl py-4 font-black text-center border-accent-primary shadow-2xl" />
         </div>
         <button className="btn-primary w-full py-5 text-xl font-black shadow-2xl uppercase tracking-widest italic" onClick={calculate}>Durumumu Analiz Et</button>
      </div>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 shadow-[0_0_50px_rgba(59,130,246,0.1)]" style={{ borderColor: result.color + "33" }}>
              <div className="result-badge" style={{ backgroundColor: result.color + "11", color: result.color, borderColor: result.color + "33" }}>
                 SINAV ANALİZ RAPORU
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
                 <div className="flex flex-col items-center gap-1">
                    <div className="text-6xl font-black italic tracking-tighter" style={{ color: result.color }}>
                      {finalScore ? result.average.toFixed(2) : "--"}
                    </div>
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest">Mevcut Ortalamanız</div>
                 </div>

                 <div className="text-center p-6 bg-secondary/10 rounded-3xl border border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 bg-accent-primary/10 rounded-bl-xl text-[8px] font-black italic text-accent-primary">HEDEF: {target}</div>
                    <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Finalde Gereken Not</div>
                    <div className={`text-4xl font-black ${result.needed && result.needed > 100 ? 'text-red-500' : 'text-primary'}`}>
                       {result.needed !== undefined ? Math.max(0, result.needed).toFixed(0) : "?"}
                    </div>
                 </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                       <span className="text-[9px] font-black text-muted uppercase mb-1">Durum</span>
                       <span className="text-xs font-black italic" style={{ color: result.color }}>{result.status}</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-border px-4">
                       <span className="text-[9px] font-black text-muted uppercase mb-1">Risk Seviyesi</span>
                       <span className="text-xs font-black italic text-primary">
                          {result.needed && result.needed > 70 ? "YÜKSEK" : (result.needed && result.needed > 45 ? "ORTA" : "DÜŞÜK")}
                       </span>
                    </div>
                    <div className="flex flex-col items-center border-l border-border px-4 col-span-2">
                       <p className="text-[10px] font-medium leading-relaxed italic text-muted text-left">
                          💡 {result.needed && result.needed > 100 
                             ? "Üzgünüz, vize notunuz çok düşük olduğu için finalden 100 alsanız bile hedeflediğiniz nota ulaşamıyorsunuz." 
                             : `Finalden ${result.needed?.toFixed(0)} veya üzerinde alırsanız dersi başarıyla tamamlarsınız.`}
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
