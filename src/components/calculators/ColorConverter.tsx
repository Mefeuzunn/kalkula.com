"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, Palette, Droplet, Layers, Eye, Copy, Trash2, Zap, Code, Terminal, Sparkles, Binary, RefreshCw } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [cmyk, setCmyk] = useState("cmyk(76%, 47%, 0%, 4%)");
  const [hsl, setHsl] = useState("hsl(217, 91%, 60%)");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16); g = parseInt(h[2] + h[2], 16); b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16); g = parseInt(h.substring(3, 5), 16); b = parseInt(h.substring(5, 7), 16);
    }
    return isNaN(r) ? null : { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const updateAll = (h: string) => {
    if (!h.startsWith("#")) h = "#" + h;
    if (h.length > 7) h = h.substring(0, 7);
    
    setHex(h);
    const rgbVal = hexToRgb(h);
    if (rgbVal) {
      const { r, g, b } = rgbVal;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHsl(rgbToHsl(r, g, b));
      
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      let k = Math.min(c, Math.min(m, y));
      if (k === 1) { 
        setCmyk("cmyk(0%, 0%, 0%, 100%)"); 
      } else {
        c = Math.round(((c - k) / (1 - k)) * 100);
        m = Math.round(((m - k) / (1 - k)) * 100);
        y = Math.round(((y - k) / (1 - k)) * 100);
        k = Math.round(k * 100);
        setCmyk(`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`);
      }
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: [hex] });
  };

  const randomColor = () => {
    const rc = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    updateAll(rc);
  };

  return (
    <V2CalculatorWrapper
      title="RENK DÖNÜŞTÜRÜCÜ"
      icon="🎨"
      infoText="HEX, RGB, CMYK ve HSL formatları arasında anında dönüşüm yapın. CSS ve tasarım projeleriniz için ideal renk kodlarını belirleyin."
      results={(
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { label: "HEX CODE", val: hex.toUpperCase(), icon: "🔢", color: "blue" },
               { label: "RGB VALUE", val: rgb, icon: "🔴", color: "red" },
               { label: "HSL CODE", val: hsl, icon: "🌓", color: "amber" },
               { label: "CMYK VALUE", val: cmyk, icon: "🖨️", color: "purple" }
             ].map((item, i) => (
               <V2ResultCard
                 key={i}
                 color={item.color as any}
                 label={item.label}
                 value={item.val}
                 icon={item.icon}
                 className="cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                 onClick={() => copy(item.val)}
               />
             ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center justify-center">
             <div className="text-[10px] font-black text-muted uppercase italic tracking-widest opacity-30">
                KLİPBOARD'A KOPYALAMAK İÇİN KARTA TIKLAYIN
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
           <div 
             className="h-48 md:h-64 flex items-center justify-center transition-all duration-700 ease-in-out relative" 
             style={{ backgroundColor: hex }}
           >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10"></div>
              <div className="px-10 py-5 bg-black/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-black text-3xl md:text-5xl tracking-tighter shadow-2xl relative z-10">
                 {hex.toUpperCase()}
              </div>
              <div className="absolute bottom-6 text-[10px] font-black text-white/50 uppercase tracking-[0.4em] italic pointer-events-none z-10">
                 PREMIUM COLOR PREVIEW
              </div>
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Palette className="w-4 h-4 text-blue-500" /> RENK SEÇİMİ
              </div>
              <button 
                onClick={randomColor}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-[9px] font-black italic hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <RefreshCw className="w-3 h-3" /> RASTGELE
              </button>
           </div>

           <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="relative group/picker w-32 h-20 shrink-0">
                 <input 
                   type="color" 
                   value={hex} 
                   onChange={e => updateAll(e.target.value)} 
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 />
                 <div className="absolute inset-0 rounded-2xl border-4 border-white/20 shadow-lg flex items-center justify-center z-10 group-hover/picker:scale-95 transition-transform" style={{ backgroundColor: hex }}>
                    <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full border border-white/30 text-white">
                       <Droplet className="w-5 h-5" />
                    </div>
                 </div>
              </div>
              <div className="flex-1">
                 <V2Input 
                   label="HEX KODU" 
                   value={hex.toUpperCase()} 
                   onChange={updateAll} 
                   unit="#" 
                   placeholder="000000"
                   fieldClassName="!py-4 font-black italic text-3xl tracking-tighter"
                 />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Layers className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">FORMATLAR</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">HEX, RGB, CMYK, HSL</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Eye className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">ÖNİZLEME</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Canlı Değişim & Görsel Etki</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
