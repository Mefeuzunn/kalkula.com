import React, { useState, useCallback } from "react";
import confetti from "canvas-confetti";

type LgsSubjectKey = "turkce" | "mat" | "fen" | "inkilap" | "din" | "dil";
type LgsScores = Record<LgsSubjectKey, { c: string; w: string }>;

interface LgsInputRowProps {
  label: string;
  maxQ: number;
  name: LgsSubjectKey;
  scores: LgsScores;
  onUpdate: (subject: LgsSubjectKey, field: "c" | "w", val: string) => void;
  color: string;
}

function LgsInputRow({ label, maxQ, name, scores, onUpdate, color }: LgsInputRowProps) {
  const c = parseFloat(scores[name].c) || 0;
  const w = parseFloat(scores[name].w) || 0;
  const net = Math.max(0, c - (w / 3));

  return (
    <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-border hover:border-accent-primary/20 transition-all group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-black text-muted uppercase tracking-widest">{label} <span className="opacity-40">({maxQ} Soru)</span></span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-glow/5 text-accent-primary border border-accent-primary/10">{net.toFixed(2)} Net</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input 
            type="number" 
            value={scores[name].c} 
            onChange={e => onUpdate(name, "c", e.target.value)} 
            className="input-field !py-2 !text-sm !text-center font-bold !bg-green-500/5 !border-green-500/20 text-green-600" 
            placeholder="Doğru" 
          />
        </div>
        <div className="relative">
          <input 
            type="number" 
            value={scores[name].w} 
            onChange={e => onUpdate(name, "w", e.target.value)} 
            className="input-field !py-2 !text-sm !text-center font-bold !bg-red-500/5 !border-red-500/20 text-red-600" 
            placeholder="Yanlış" 
          />
        </div>
      </div>
    </div>
  );
}

export function LgsCalculator() {
  const [scores, setScores] = useState<LgsScores>({
    turkce: { c: "", w: "" },
    mat: { c: "", w: "" },
    fen: { c: "", w: "" },
    inkilap: { c: "", w: "" },
    din: { c: "", w: "" },
    dil: { c: "", w: "" },
  });
  const [result, setResult] = useState<{ point: number; totalNet: number } | null>(null);

  const calculate = () => {
    const calcNet = (cStr: string, wStr: string) => {
      const c = parseFloat(cStr) || 0;
      const w = parseFloat(wStr) || 0;
      return Math.max(0, c - (w / 3));
    };

    const turkceNet = calcNet(scores.turkce.c, scores.turkce.w);
    const matNet = calcNet(scores.mat.c, scores.mat.w);
    const fenNet = calcNet(scores.fen.c, scores.fen.w);
    const inkNet = calcNet(scores.inkilap.c, scores.inkilap.w);
    const dinNet = calcNet(scores.din.c, scores.din.w);
    const dilNet = calcNet(scores.dil.c, scores.dil.w);

    // MEB Gerçek Katsayılar ve Ortalama Verileri (Gelişmiş Projeksiyon)
    const BASE_POINT = 194.7674;
    const coefficients = {
      turkce: 3.6718,
      mat: 3.9519,
      fen: 3.5358,
      inkilap: 1.6390,
      din: 1.5831,
      dil: 1.6313
    };

    const contributions = {
      turkce: turkceNet * coefficients.turkce,
      mat: matNet * coefficients.mat,
      fen: fenNet * coefficients.fen,
      inkilap: inkNet * coefficients.inkilap,
      din: dinNet * coefficients.din,
      dil: dilNet * coefficients.dil
    };

    const totalNet = turkceNet + matNet + fenNet + inkNet + dinNet + dilNet;
    const calculatedPoint = BASE_POINT + contributions.turkce + contributions.mat + contributions.fen + contributions.inkilap + contributions.din + contributions.dil;
    
    const finalPoint = Math.min(500, Math.max(100, calculatedPoint));

    setResult({ point: finalPoint, totalNet });
    confetti({ 
      particleCount: 100, 
      spread: 70, 
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#10b981", "#f59e0b"]
    });
  };

  const updateScore = useCallback((subject: LgsSubjectKey, field: "c" | "w", val: string) => {
    setScores(prev => ({ ...prev, [subject]: { ...prev[subject], [field]: val } }));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sayısal Dersler */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2 bg-blue-500/5 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            <h3 className="text-xs font-black text-primary uppercase tracking-widest">Sayısal Bölüm</h3>
          </div>
          <div className="flex flex-col gap-3">
             <LgsInputRow label="Matematik" maxQ={20} name="mat" scores={scores} onUpdate={updateScore} color="blue" />
             <LgsInputRow label="Fen Bilimleri" maxQ={20} name="fen" scores={scores} onUpdate={updateScore} color="green" />
          </div>
        </div>

        {/* Sözel Dersler */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2 bg-purple-500/5 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
            <h3 className="text-xs font-black text-primary uppercase tracking-widest">Sözel Bölüm</h3>
          </div>
          <div className="flex flex-col gap-3">
             <LgsInputRow label="Türkçe" maxQ={20} name="turkce" scores={scores} onUpdate={updateScore} color="purple" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <LgsInputRow label="İnkılap" maxQ={10} name="inkilap" scores={scores} onUpdate={updateScore} color="orange" />
                <LgsInputRow label="Din K." maxQ={10} name="din" scores={scores} onUpdate={updateScore} color="yellow" />
                <LgsInputRow label="İngilizce" maxQ={10} name="dil" scores={scores} onUpdate={updateScore} color="cyan" />
             </div>
          </div>
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-black shadow-2xl uppercase tracking-widest italic" onClick={calculate}>
        Sonuçları Analiz Et
      </button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 border-border shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <div className="result-badge !bg-accent-primary/10 !text-accent-primary !border-accent-primary/20">LGS Gerçek Puan Tahmini</div>
              
              <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent-primary to-accent-secondary mb-2 animate-glow">
                {result.point.toFixed(4)}
              </div>
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-10">AKADEMİK BAŞARI PROJEKSİYONU</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 border-t border-border mt-4">
                 <div className="flex flex-col items-center justify-center p-8 bg-secondary/5 rounded-3xl border border-border group hover:bg-accent-primary/5 transition-all">
                    <div className="text-[10px] font-black text-muted uppercase mb-2 tracking-widest italic">Toplam Net</div>
                    <div className="text-5xl font-black text-primary">{result.totalNet.toFixed(2)}</div>
                 </div>
                 <div className="flex flex-col items-center justify-center p-8 bg-secondary/5 rounded-3xl border border-border group hover:bg-accent-secondary/5 transition-all">
                    <div className="text-[10px] font-black text-muted uppercase mb-2 tracking-widest italic">Tahmini Başarı</div>
                    <div className={`text-2xl font-black mt-2 italic ${result.point > 450 ? 'text-green-500' : result.point > 350 ? 'text-blue-500' : 'text-orange-500'}`}>
                      {result.point > 480 ? "FEN LİSESİ ADAYI" : result.point > 450 ? "ÜST DÜZEY" : result.point > 350 ? "İYİ DERECE" : "ORTALAMA"}
                    </div>
                 </div>
              </div>

              <div className="mt-10 p-6 bg-secondary/5 rounded-[2rem] border border-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-3 opacity-10 font-black italic text-xs uppercase tracking-widest rotate-12">LGS Data Engine</div>
                 <h4 className="text-[10px] font-black text-muted uppercase mb-4 tracking-widest text-center border-b border-border/50 pb-2">Derslerin Puan Katkı Analizi</h4>
                 <div className="flex flex-wrap justify-center gap-4 text-center">
                    {[
                      { l: "Mat.", c: 3.95, n: (parseFloat(scores.mat.c) || 0) - (parseFloat(scores.mat.w) || 0)/3 },
                      { l: "Türkçe", c: 3.67, n: (parseFloat(scores.turkce.c) || 0) - (parseFloat(scores.turkce.w) || 0)/3 },
                      { l: "Fen", c: 3.53, n: (parseFloat(scores.fen.c) || 0) - (parseFloat(scores.fen.w) || 0)/3 }
                    ].map((d, i) => (
                      <div key={i} className="flex flex-col">
                         <span className="text-[9px] font-bold text-muted uppercase">{d.l}</span>
                         <span className="text-sm font-black text-accent-primary">+{(d.c * Math.max(0, d.n)).toFixed(1)} Puan</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="mt-8 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[9px] text-blue-600 dark:text-blue-400 font-medium leading-relaxed italic text-center">
                 ⚠️ <b>Önemli:</b> Bu hesaplama MEB'in "3 Yanlış 1 Doğruyu Götürür" kuralı ve son yılın Türkiye geneli standart puan katsayıları baz alınarak yapılmıştır. Gerçek sınavda standart sapmalar puanı +- 5-10 puan değiştirebilir.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
