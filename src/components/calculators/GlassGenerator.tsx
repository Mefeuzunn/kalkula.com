"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Layers, Droplet, Sun, Contrast, Code, Copy, Sparkles, RefreshCw, Palette, Box, Monitor, Smartphone, Layout, Check, Trash2, Zap, Info } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function GlassGenerator() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(20);
  const [color, setColor] = useState("#ffffff");
  const [border, setBorder] = useState(10);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const cssCode = `background: rgba(${hexToRgb(color)}, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder-radius: 20px;\nborder: 1px solid rgba(${hexToRgb(color)}, ${border / 100});\nbox-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: [color, "#3b82f6"] });
  };

  const reset = () => {
    setBlur(16);
    setOpacity(20);
    setColor("#ffffff");
    setBorder(10);
  };

  return (
    <V2CalculatorWrapper
      title="GLASSMORPHI-GEN"
      icon="💎"
      infoText="Modern Glassmorphism efektlerini canlı olarak tasarlayın ve CSS kodlarını anında kopyalayın. Şeffaf ve bulanık katmanların gücünü keşfedin."
      results={(
        <div className="space-y-6">
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 relative overflow-hidden shadow-2xl group min-h-[350px] flex items-center justify-center">
             {/* Animated glass background elements */}
             <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full animate-pulse blur-3xl opacity-40"></div>
             <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-400 rounded-full animate-bounce blur-3xl opacity-30"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400 rounded-full animate-pulse blur-3xl opacity-20"></div>

             <div 
               className="w-full max-w-[280px] h-48 flex flex-col items-center justify-center text-center p-8 transition-all duration-500 relative z-10 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl border-white/20 shadow-2xl"
               style={{
                 background: `rgba(${hexToRgb(color)}, ${opacity / 100})`,
                 backdropFilter: `blur(${blur}px)`,
                 WebkitBackdropFilter: `blur(${blur}px)`,
                 borderRadius: "24px",
                 border: `1px solid rgba(${hexToRgb(color)}, ${border / 100})`,
                 boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
               }}
             >
                <div className="p-3 bg-white/10 rounded-2xl mb-4 border border-white/20">
                   <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2 italic">PREMIUM GLASS</h4>
                <p className="text-white/70 text-[9px] font-bold leading-relaxed italic uppercase tracking-widest">
                   REAL-TIME SHADERS & BLUR
                </p>
             </div>
             <div className="absolute bottom-6 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] italic pointer-events-none">
                KALKÜLA VISUAL ENGINE
             </div>
          </div>

          <V2ResultCard
            color="blue"
            label="OLUŞTURULAN CSS KODU"
            value={cssCode}
            icon="💻"
            className="font-mono text-[10px] whitespace-pre leading-relaxed p-6"
            onClick={copy}
          />

          <button 
            onClick={copy}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
             <Copy className="w-4 h-4" /> CSS KODUNU KOPYALA
          </button>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Blur Control */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                       <Sun className="w-4 h-4 text-blue-500" /> BULANIKLIK (BLUR)
                    </div>
                    <div className="text-xl font-black text-blue-500 italic">{blur}px</div>
                 </div>
                 <input 
                   type="range" 
                   min="0" max="40" 
                   value={blur} 
                   onChange={e => setBlur(parseInt(e.target.value))} 
                   className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                 />
              </div>

              {/* Opacity Control */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                       <Droplet className="w-4 h-4 text-emerald-500" /> ŞEFFAFLIK (OPACITY)
                    </div>
                    <div className="text-xl font-black text-emerald-500 italic">%{opacity}</div>
                 </div>
                 <input 
                   type="range" 
                   min="0" max="100" 
                   value={opacity} 
                   onChange={e => setOpacity(parseInt(e.target.value))} 
                   className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                 />
              </div>

              {/* Border Control */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                       <Contrast className="w-4 h-4 text-purple-500" /> KENAR GÖRÜNÜRLÜĞÜ
                    </div>
                    <div className="text-xl font-black text-purple-500 italic">%{border}</div>
                 </div>
                 <input 
                   type="range" 
                   min="0" max="100" 
                   value={border} 
                   onChange={e => setBorder(parseInt(e.target.value))} 
                   className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

              {/* Color Control */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                       <Palette className="w-4 h-4 text-amber-500" /> TEMEL RENK
                    </div>
                    <div className="text-[10px] font-black text-amber-500 italic uppercase">{color}</div>
                 </div>
                 <div className="flex gap-3 px-1">
                    {['#ffffff', '#000000', '#2563eb', '#10b981', '#f59e0b'].map(c => (
                      <button 
                        key={c} 
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-xl border-2 ${color === c ? 'border-primary scale-110 shadow-lg' : 'border-white/10'} transition-all`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <div className="relative group w-10 h-10 cursor-pointer">
                       <input 
                         type="color" 
                         value={color} 
                         onChange={e => setColor(e.target.value)} 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                       />
                       <div className="absolute inset-0 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all">
                          <Palette className="w-4 h-4 text-muted" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Layout className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">TASARIM DİLİ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Apple, Microsoft, Google Uyumlu</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Monitor className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">CSS3 DESTEĞİ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Backdrop-filter teknolojisi</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>İpucu:</b> Glassmorphism etkisinin belirgin olması için arka planın düz renk yerine gradyan veya karmaşık bir görsel (blobs, shapes) içermesi önemlidir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
