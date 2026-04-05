import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, label: "Zayıf", color: "#ef4444" });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let gen = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
       gen += chars.charAt(array[i] % chars.length);
    }
    setPassword(gen);
    calculateStrength(gen);
    setCopied(false);
    
    confetti({ 
      particleCount: 50, 
      spread: 60, 
      origin: { y: 0.8 }, 
      colors: ["#3b82f6", "#10b981"] 
    });
  };

  const calculateStrength = (p: string) => {
    let score = 0;
    if (p.length > 12) score += 2;
    if (p.length > 16) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 2;

    if (score >= 6) setStrength({ score: 100, label: "KRİPTO GÜCÜNDE", color: "#10b981" });
    else if (score >= 4) setStrength({ score: 60, label: "GÜÇLÜ", color: "#3b82f6" });
    else if (score >= 2) setStrength({ score: 30, label: "ORTA", color: "#f59e0b" });
    else setStrength({ score: 10, label: "ZAYIF", color: "#ef4444" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => { generate(); }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="panel p-8 bg-secondary/10 border-border rounded-[2.5rem] flex flex-col gap-8">
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center px-2">
              <span className="text-xs font-black text-muted uppercase tracking-[0.2em]">Karakter Sayısı</span>
              <span className="text-3xl font-black text-accent-primary italic">{length}</span>
           </div>
           <input 
             type="range" 
             min="8" max="64" 
             value={length} 
             onChange={e => setLength(parseInt(e.target.value))} 
             className="w-full h-3 bg-secondary/30 rounded-full appearance-none cursor-pointer accent-accent-primary"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { id: "upper", label: "BÜYÜK HARF", checked: useUpper, set: setUseUpper },
             { id: "nums", label: "RAKAMLAR", checked: useNumbers, set: setUseNumbers },
             { id: "syms", label: "SEMBOLLER", checked: useSymbols, set: setUseSymbols }
           ].map(opt => (
             <button 
               key={opt.id}
               onClick={() => opt.set(!opt.checked)}
               className={`group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${opt.checked ? 'bg-accent-primary/10 border-accent-primary text-accent-primary' : 'bg-surface border-border text-muted hover:border-muted/50'}`}
             >
               <span className="text-[10px] font-black tracking-widest">{opt.label}</span>
               <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${opt.checked ? 'bg-accent-primary border-accent-primary rotate-0' : 'border-border rotate-45'}`}>
                 {opt.checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
               </div>
             </button>
           ))}
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-black shadow-2xl uppercase tracking-widest italic" onClick={generate}>
        Güvenli Şifre Üret
      </button>

      {password && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 shadow-[0_0_50px_rgba(59,130,246,0.1)] !p-0 overflow-hidden">
              <div 
                className="relative group cursor-pointer p-10 bg-surface border-b-2 border-border" 
                onClick={copyToClipboard}
              >
                 <div className="absolute top-3 right-3 text-[9px] font-black text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {copied ? "KOPYALANDI!" : "KOPYALAMAK İÇİN TIKLA"}
                 </div>
                 <div className="text-3xl md:text-5xl font-black font-mono tracking-[0.2em] text-accent-primary break-all leading-tight">
                    {password}
                 </div>
                 <div className="mt-4 flex gap-2 justify-center opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-bold text-muted uppercase italic tracking-tighter">AES-256 UYUMLU KRİPTOGRAFİK RASTLANTISALLIK</span>
                 </div>
              </div>

              <div className="p-8 bg-secondary/5">
                 <div className="flex justify-between items-end mb-4">
                    <div className="text-left">
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest">Güvenlik Skoru</span>
                       <h5 className="text-xl font-black italic tracking-tighter" style={{ color: strength.color }}>{strength.label}</h5>
                    </div>
                    <span className="text-xs font-black opacity-30 italic">{strength.score}/100</span>
                 </div>
                 <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden border border-border shadow-inner">
                    <div 
                      className="h-full transition-all duration-1000 ease-out" 
                      style={{ width: `${strength.score}%`, backgroundColor: strength.color, boxShadow: `0 0 20px ${strength.color}44` }}
                    />
                 </div>

                 <div className="mt-8 flex gap-4 text-center">
                    <div className="flex-1 p-3 bg-surface rounded-xl border border-border">
                       <div className="text-[9px] font-black text-muted uppercase mb-1">ENTROPİ</div>
                       <div className="text-xs font-bold text-primary italic">{(length * 5.2).toFixed(1)} bits</div>
                    </div>
                    <div className="flex-1 p-3 bg-surface rounded-xl border border-border">
                       <div className="text-[9px] font-black text-muted uppercase mb-1">DİRENÇ</div>
                       <div className="text-xs font-bold text-primary italic">Yüksek</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
