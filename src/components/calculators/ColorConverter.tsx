import React, { useState } from "react";

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [cmyk, setCmyk] = useState("cmyk(76%, 47%, 0%, 4%)");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16); g = parseInt(h[2] + h[2], 16); b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16); g = parseInt(h.substring(3, 5), 16); b = parseInt(h.substring(5, 7), 16);
    }
    return isNaN(r) ? null : { r, g, b };
  };

  const updateAll = (h: string) => {
    if (!h.startsWith("#")) h = "#" + h;
    if (h.length > 7) h = h.substring(0, 7);
    
    setHex(h);
    const rgbVal = hexToRgb(h);
    if (rgbVal) {
      const { r, g, b } = rgbVal;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      let k = Math.min(c, Math.min(m, y));
      if (k === 1) { setCmyk("cmyk(0%, 0%, 0%, 100%)"); } 
      else {
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
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Renk Önizleme Paneli */}
      <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
         <div 
          className="h-48 md:h-64 flex items-center justify-center transition-all duration-700 ease-in-out border-border/10" 
          style={{ backgroundColor: hex }}
         >
            <div className="px-10 py-5 bg-black/20 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] text-white font-black text-3xl md:text-5xl tracking-tighter shadow-2xl drop-shadow-2xl animate-fadeIn">
               {hex.toUpperCase()}
            </div>
            <div className="absolute bottom-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic pointer-events-none">KALKÜLA PREMIUM PREVIEW</div>
         </div>
      </div>

      <div className="flex flex-col">
        <label className="calc-input-label">RENK SEÇİCİ VE HEX KODU</label>
        <div className="calc-input-key !flex-row items-center p-6 gap-6">
           <div className="relative group/picker cursor-pointer w-32 h-20 shrink-0">
              <input 
                type="color" 
                value={hex} 
                onChange={e => updateAll(e.target.value)} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="absolute inset-0 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center z-10 transition-transform group-hover/picker:scale-95" style={{ backgroundColor: hex }}>
                 <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full border border-white/30 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.17 7.17"/><path d="M11 11l.5.5"/></svg>
                 </div>
              </div>
           </div>

           <input 
            type="text" 
            value={hex.toUpperCase()} 
            onChange={e => updateAll(e.target.value)} 
            className="calc-input-field !text-left flex-1 !text-5xl p-0 h-auto"
            placeholder="#000000"
           />
        </div>
      </div>

      <div className="panel p-0 bg-transparent border-none shadow-none mt-4">
        <div className="calc-result-header">
           <span>🎨</span> RENK KODU SONUÇLARI
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {[
            { label: "RGB VALUE", val: rgb, color: "var(--accent-primary)", icon: "🔴" },
            { label: "CMYK VALUE", val: cmyk, color: "var(--accent-secondary)", icon: "🖨️" }
          ].map((item, i) => (
            <div key={i} className="calc-result-card !p-8 !bg-secondary/5 border-secondary/20 !items-start" onClick={() => copy(item.val)}>
               <div className="flex justify-between items-center w-full mb-4">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase text-muted tracking-widest">{item.label}</span>
                  </div>
                  <button className="px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black rounded-full hover:bg-accent-primary hover:text-white transition-all shadow-lg active:scale-90">
                      KOPYALA
                  </button>
               </div>
               <div style={{ color: item.color }} className="font-mono text-3xl font-black italic tracking-tighter">{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.4em] opacity-30 italic">
            KALKÜLA COLOR ENGINE • DESIGNER EDITION • 2026
         </p>
      </div>
    </div>
  );
}
