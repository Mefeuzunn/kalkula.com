import React, { useState } from "react";
import confetti from "canvas-confetti";

export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const generate = () => {
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * (max - min + 1)) + min);
      count++;
      if (count > 25) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(final);
        setIsRolling(false);
        
        confetti({ 
          particleCount: 60, 
          spread: 50, 
          origin: { y: 0.7 },
          colors: ["#3b82f6", "#10b981", "#f59e0b"]
        });
      }
    }, 60);
  };

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto w-full">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-2 italic">Minimum</label>
          <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)} className="input-field text-center text-2xl font-black py-4 border-2" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-2 italic">Maximum</label>
          <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)} className="input-field text-center text-2xl font-black py-4 border-2" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className={`relative group`}>
           <div className={`absolute -inset-4 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-[3rem] blur-xl opacity-20 transition-all duration-700 ${isRolling ? 'opacity-60 scale-110' : ''}`}></div>
           <div className={`w-48 h-48 rounded-[2.8rem] bg-surface flex flex-col items-center justify-center border-4 border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 transition-all duration-500 overflow-hidden ${isRolling ? 'rotate-12 scale-105 border-accent-primary animate-shake' : 'hover:border-accent-primary/40'}`}>
              <div className="absolute top-2 left-2 flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-border"></div>
                 <div className="w-2 h-2 rounded-full bg-border"></div>
              </div>
              <span className={`text-8xl font-black italic tracking-tighter ${isRolling ? 'text-accent-primary opacity-40 blur-[1px]' : 'text-primary'}`}>
                {result ?? "!"}
              </span>
              <div className="absolute bottom-4 text-[10px] font-black text-muted/30 uppercase tracking-[0.3em]">LUCKY NUMBER</div>
           </div>
        </div>

        <button 
          onClick={generate} 
          disabled={isRolling}
          className="btn-primary px-16 py-5 text-xl font-black rounded-full shadow-[0_15px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)] transition-all active:scale-95 uppercase tracking-widest italic"
        >
          {isRolling ? "Sayı Üretiliyor..." : "TALİHİ ÇAĞIR"}
        </button>
      </div>

      <div className="text-center">
         <p className="text-[11px] text-muted font-medium italic opacity-60">Matematiksel rastlantısallık algoritmasıyla {min} ile {max} arasında tarafsız bir seçim yapıldı.</p>
      </div>
    </div>
  );
}
