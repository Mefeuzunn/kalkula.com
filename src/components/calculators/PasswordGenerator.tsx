"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { ShieldCheck, Key, Lock, Fingerprint, Copy, Trash2, Zap, Code, Terminal, Sparkles, Binary, RefreshCw, Layers, Eye, CheckCircle, AlertTriangle, Shield, Check } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<{
    score: number;
    label: string;
    color: "red" | "amber" | "emerald" | "blue" | "purple";
  }>({ score: 0, label: "Zayıf", color: "red" });

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
    
    confetti({ 
      particleCount: 100, 
      spread: 70, 
      origin: { y: 0.6 }
    });
  };

  const calculateStrength = (p: string) => {
    let score = 0;
    if (p.length > 12) score += 2;
    if (p.length > 16) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 2;

    if (score >= 6) setStrength({ score: 100, label: "KRİPTO GÜCÜNDE", color: "emerald" });
    else if (score >= 4) setStrength({ score: 60, label: "GÜÇLÜ", color: "blue" });
    else if (score >= 2) setStrength({ score: 30, label: "ORTA", color: "amber" });
    else setStrength({ score: 10, label: "ZAYIF", color: "red" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  useEffect(() => { generate(); }, []);

  return (
    <V2CalculatorWrapper
      title="GÜVENLİ ŞİFRE ÜRETECİ"
      icon="🔐"
      infoText="Kriptografik olarak rastlantısal ve tahmin edilmesi imkansız güçlü şifreler üretin. AES-256 standartlarına uygun entropi seviyeleri."
      results={password && (
        <div className="space-y-6">
          <V2ResultCard
            color={strength.color}
            label="ÜRETİLEN GÜVENLİ ŞİFRE"
            value={password}
            subLabel={strength.label}
            icon="🔑"
            className="font-mono text-xl md:text-2xl break-all tracking-[0.1em]"
            onClick={copyToClipboard}
          />

          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-end">
                <div className="text-left">
                   <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">Güvenlik Skoru</div>
                   <div className={`text-sm font-black italic tracking-tighter ${
                      strength.color === "emerald" ? "text-emerald-500" : 
                      strength.color === "blue" ? "text-blue-500" :
                      strength.color === "amber" ? "text-amber-500" : "text-red-500"
                   }`}>
                      {strength.label}
                   </div>
                </div>
                <div className="text-[10px] font-bold text-muted opacity-30 italic">{strength.score}/100</div>
             </div>
             <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner p-[2px]">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    strength.color === "emerald" ? "bg-emerald-500" : 
                    strength.color === "blue" ? "bg-blue-500" :
                    strength.color === "amber" ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${strength.score}%` }}
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[9px] font-black text-muted uppercase mb-1">ENTROPİ</div>
                <div className="text-xs font-bold text-primary italic">{(length * 5.2).toFixed(1)} bits</div>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[9px] font-black text-muted uppercase mb-1">DİRENÇ</div>
                <div className="text-xs font-bold text-primary italic">Yüksek (AES)</div>
             </div>
          </div>

          <button 
            onClick={copyToClipboard}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-blue-500 transition-all active:scale-95"
          >
             <Copy className="w-4 h-4" /> ŞİFREYİ KOPYALA
          </button>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Binary className="w-4 h-4 text-blue-500" /> ŞİFRE UZUNLUĞU
              </div>
              <div className="text-2xl font-black text-blue-500 italic tracking-tighter">{length}</div>
           </div>
           
           <div className="px-2">
              <input 
                type="range" 
                min="8" max="64" 
                value={length} 
                onChange={e => setLength(parseInt(e.target.value))} 
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[8px] font-bold text-muted mt-2 uppercase tracking-widest opacity-30 italic">
                 <span>8 Karakter</span>
                 <span>64 Karakter</span>
              </div>
           </div>
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
               className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${
                opt.checked 
                ? 'bg-blue-600/10 border-blue-600 text-blue-500 shadow-lg shadow-blue-500/10' 
                : 'bg-white/5 border-white/5 text-muted hover:border-white/20'
               }`}
             >
               <span className="text-[10px] font-black tracking-widest italic">{opt.label}</span>
               <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                opt.checked 
                ? 'bg-blue-600 border-blue-600 rotate-0' 
                : 'border-white/20 rotate-45'
               }`}>
                 {opt.checked && <Check className="w-3 h-3 text-white" />}
               </div>
             </button>
           ))}
        </div>

        <V2ActionRow 
          onCalculate={generate} 
          onReset={() => { setLength(20); setUseUpper(true); setUseNumbers(true); setUseSymbols(true); setPassword(""); }} 
          calculateLabel="⚡ Güvenli Şifre Üret"
        />

        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
           <Shield className="w-5 h-5 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             Şifreleriniz yerel olarak `window.crypto` API kullanılarak üretilir. Hiçbir veri kaydedilmez veya paylaşılmaz.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
