"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, ShieldCheck, Key, Lock, Fingerprint, Copy, Trash2, Zap, Code, Terminal, Sparkles, Binary } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

export function HashGenerator() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [algo, setAlgo] = useState<Algorithm>('SHA-256');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHash = async (val: string, selectedAlgo: Algorithm = algo) => {
    setText(val);
    if (!val.trim()) { 
      setHash(""); 
      return; 
    }
    
    setIsGenerating(true);
    try {
      const msgUint8 = new TextEncoder().encode(val);
      const hashBuffer = await crypto.subtle.digest(selectedAlgo, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHash(hashHex);
      
      if (val.length > 5) {
        confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#8b5cf6", "#3b82f6"] });
      }
    } catch(e) {
      console.error(e);
      setHash("Hash error");
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#8b5cf6"] });
  };

  const reset = () => {
    setText("");
    setHash("");
    setIsGenerating(false);
  };

  const handleAlgoChange = (newAlgo: Algorithm) => {
    setAlgo(newAlgo);
    if (text) generateHash(text, newAlgo);
  };

  return (
    <V2CalculatorWrapper
      title="HASH GENERATOR"
      icon="🔒"
      infoText="Metin verilerinizden fonsiyonel olarak benzersiz parmak izleri (hash) üretin. SHA-256, SHA-512 ve SHA-1 algoritmalarını destekler."
      results={text && hash && (
        <div className="space-y-6">
          <V2ResultCard
            color="purple"
            label={`${algo} CHECKSUM OUTPUT`}
            value={hash}
            subLabel="Kriptografik Olarak Güvenli Parmak İzi"
            icon="🆔"
            className="font-mono text-xs break-all"
          />

          <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-purple-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hash değerleri tek yönlüdür ve geri döndürülemez. Veri bütünlüğünü doğrulamak ve şifreleme işlemlerinde kullanmak için idealdir.
             </p>
          </div>

          <button 
            onClick={copy}
            className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black italic shadow-lg shadow-purple-500/20 flex items-center justify-center gap-3 hover:bg-purple-500 transition-all active:scale-95"
          >
             <Copy className="w-4 h-4" /> HASH DEĞERİNİ KOPYALA
          </button>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" /> ALGORİTMA SEÇİMİ
           </div>
           <div className="flex gap-2">
              {(['SHA-1', 'SHA-256', 'SHA-512'] as Algorithm[]).map(a => (
                <button 
                  key={a}
                  onClick={() => handleAlgoChange(a)}
                  className={`flex-1 py-4 rounded-2xl font-black italic border-b-4 transition-all ${
                    algo === a 
                    ? "bg-purple-600 text-white border-purple-800 translate-y-[2px]" 
                    : "bg-white/5 text-muted border-white/10 hover:bg-white/10"
                  }`}
                >
                  {a}
                </button>
              ))}
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Terminal className="w-4 h-4" /> KAYNAK METİN
              </div>
              <button 
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <textarea 
                placeholder="Hash üretilecek metni girin..."
                value={text} 
                onChange={e => generateHash(e.target.value)} 
                className="w-full min-h-[150px] p-6 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-mono text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-muted/30 placeholder:italic"
              />
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Fingerprint className="w-8 h-8 text-purple-500" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Lock className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">GÜVENLİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">SubtleCrypto Native Motoru</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Binary className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">FORMAT</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Hexadecimal Çıktı Düzeni</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
