import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function StyleTextGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const FONTS: Record<string, (s: string) => string> = {
    "Bold (Serif)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120191 : code + 120211);
    }),
    "Italic (Serif)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120243 : code + 120263);
    }),
    "Bold Italic": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120295 : code + 120315);
    }),
    "Script (Handwriting)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 119939 : code + 119959);
    }),
    "Fraktur (Gothic)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120043 : code + 120063);
    }),
    "Double Struck": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120095 : code + 120115);
    }),
    "Circled": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 9327 : code + 9333);
    }),
    "Squared": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 127183 : code + 127247);
    }),
    "Small Caps": (s) => {
       const map: any = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ϙ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
       return s.toLowerCase().split('').map(c => map[c] || c).join('');
    },
    "Monospace": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120399 : code + 120419);
    }),
    "Upper (Bold)": (s) => s.toUpperCase().replace(/[A-Z]/g, (c) => {
       const code = c.charCodeAt(0);
       return String.fromCodePoint(code + 120211);
    })
  };

  useEffect(() => {
    if (!input.trim()) { setResults([]); return; }
    const res = Object.entries(FONTS).map(([name, transform]) => ({
      name,
      text: transform(input)
    }));
    setResults(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    confetti({ 
      particleCount: 40, 
      spread: 50, 
      origin: { y: 0.8 },
      colors: ["#8b5cf6", "#ec4899", "#3b82f6"]
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4">
           <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">Dönüştürülecek Metin</label>
           <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse delay-75"></span>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest pl-2 font-mono">STYLE ENGINE ACTIVE</span>
           </div>
        </div>
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-primary/20 rounded-3xl blur-xl opacity-20 group-focus-within:opacity-40 transition-all duration-700"></div>
           <input 
             type="text" 
             placeholder="Harika bir metin yazın ve sanata dönüşmesini izleyin..." 
             value={input} 
             onChange={e => setInput(e.target.value)} 
             className="input-field !text-3xl !py-8 !px-10 border-4 border-border rounded-3xl font-black italic tracking-tighter focus:border-accent-primary transition-all relative z-10 shadow-inner"
           />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-result">
           {results.map((res, i) => (
             <div key={i} className="result-container-premium !mt-0 group cursor-pointer" onClick={() => copy(res.text)}>
                <div className="result-card-premium !text-left p-8 border-2 border-border group-hover:border-accent-primary/40 transition-all flex flex-col justify-between bg-surface group-hover:scale-[1.02] shadow-xl relative overflow-hidden group-hover:shadow-accent-primary/10 min-h-[140px]">
                   <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-accent-primary/10 text-accent-primary text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Kopyalamak İçin Tıkla</div>
                   </div>
                   
                   <div className="text-[10px] font-black text-muted uppercase mb-4 tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3 bg-accent-primary/40 rounded-full"></span>
                      {res.name}
                   </div>
                   <div className="text-3xl font-medium text-primary break-all leading-tight">
                      {res.text}
                   </div>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="panel p-20 border-dashed border-4 border-border/40 text-center flex flex-col items-center gap-6 rounded-[3rem]">
           <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl grayscale opacity-20">✨</div>
           <p className="text-xs font-black text-muted uppercase tracking-[0.3em] italic">Yaratıcılığınızı serbest bırakmak için yukarıya yazmaya başlayın</p>
        </div>
      )}

      <div className="p-8 bg-secondary/5 border border-border rounded-[2.5rem] text-center">
         <p className="text-[10px] text-muted font-medium italic leading-relaxed max-w-2xl mx-auto flex flex-col gap-2">
            <span>💡 <b>NOT:</b> Unicode yazı tipleri tüm sosyal medya platformlarında (Instagram, WhatsApp, X, TikTok) çalışır.</span>
            <span className="opacity-60">Bazı cihazlar bu özel karakterleri tanımayabilir, o durumda karakterler ⊡ şeklinde görünebilir.</span>
         </p>
      </div>

      <div className="text-center p-4">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed italic">
            KALKÜLA MULTI-PLATFORM UNICODE TEXT ENGINE - CREATIVE EDITION
         </p>
      </div>
    </div>
  );
}
