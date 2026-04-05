import React, { useState } from "react";
import confetti from "canvas-confetti";

export function HashGenerator() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHash = async (val: string) => {
    setText(val);
    if (!val.trim()) { setHash(""); return; }
    
    setIsGenerating(true);
    try {
      const msgUint8 = new TextEncoder().encode(val);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHash(hashHex);
      
      if (val.length > 5 && hashHex) {
         // WOW Efekti: Küçük bir parıltı
         confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ["#8b5cf6", "#3b82f6"] });
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
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic px-4">Kaynak Metin (Input)</label>
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 rounded-3xl blur-lg opacity-10 group-focus-within:opacity-30 transition-all"></div>
           <textarea 
             placeholder="Hash üretmek istediğiniz metni buraya girin..."
             value={text} 
             onChange={e => generateHash(e.target.value)} 
             className="input-field !text-lg !py-8 !px-8 border-4 border-border rounded-[2rem] min-h-[150px] leading-relaxed shadow-inner placeholder:opacity-20 relative z-10 focus:border-accent-secondary transition-all"
           />
        </div>
      </div>

      {hash && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 border-accent-secondary/20 shadow-[0_0_50px_rgba(139,92,246,0.1)] !p-0 overflow-hidden">
              <div className="bg-secondary/5 p-6 border-b border-border flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">SHA-256 Checksum Output</span>
                 </div>
                 <button 
                   onClick={copy}
                   className="px-6 py-2 bg-accent-secondary text-white text-[10px] font-black rounded-full hover:scale-105 transition-all shadow-lg shadow-accent-secondary/20 active:scale-95"
                 >
                   KOPYALA
                 </button>
              </div>
              <div className="p-10 bg-surface">
                 <div className="text-xl md:text-2xl font-black font-mono break-all text-accent-secondary tracking-wider text-center leading-relaxed italic">
                    {hash}
                 </div>
                 <div className="mt-6 flex justify-center opacity-30">
                    <span className="text-[8px] font-bold text-muted uppercase tracking-[0.4em]">Cryptographically Secure Hashing (SHA-256)</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="text-center">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 italic">KALKÜLA CRYPTO ENGINE - SECURE CHECKSUM SERVICE</p>
      </div>
    </div>
  );
}
