"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Type, Sparkles, Wand2, Stars, Copy, Trash2, Zap, Info, Share2, Rocket, Palette, Languages, Smile } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

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

  const copy = (txt: string, color: string = "#8b5cf6") => {
    navigator.clipboard.writeText(txt);
    confetti({ 
      particleCount: 40, 
      spread: 50, 
      origin: { y: 0.8 },
      colors: [color, "#ffffff"]
    });
  };

  const reset = () => setInput("");

  return (
    <V2CalculatorWrapper
      title="STİLLİ METİN YAZICI"
      icon="✨"
      infoText="Metinlerinizi sanata dönüştürün. Instagram, WhatsApp ve X (Twitter) gibi platformlarda kullanabileceğiniz özel Unicode yazı tipleri üretin."
      results={results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {results.map((res, i) => (
             <V2ResultCard
               key={i}
               color={i % 2 === 0 ? "blue" : "purple"}
               label={res.name}
               value={res.text}
               icon="🪄"
               className="font-medium !text-2xl break-all"
               onClick={() => copy(res.text, i % 2 === 0 ? "#3b82f6" : "#a855f7")}
             />
           ))}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Type className="w-4 h-4 text-blue-500" /> DÖNÜŞTÜRÜLECEK METİN
              </div>
              <button 
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-black text-2xl text-center focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-muted/20 placeholder:font-normal"
                placeholder="Buraya yazmaya başlayın..."
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Wand2 className="w-8 h-8 text-blue-500" />
              </div>
           </div>
        </div>

        {!input && (
          <div className="p-12 rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center gap-6 text-center">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center opacity-20">
                <Smile className="w-8 h-8" />
             </div>
             <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em] italic opacity-40">
                Giriş alanına metin yazarak sanatı başlatın
             </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Share2 className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">UYUMLULUK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Tüm sosyal mecralar ile uyumlu</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Rocket className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">HIZ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anında görsel dönüşüm</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Unicode karakterler çoğu cihazda sorunsuz görüntülenir. Nadiren eski cihazlarda ⊡ şeklinde görülebilir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
