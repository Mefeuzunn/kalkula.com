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
    <div className="flex flex-col gap-8">
      {/* Renk Önizleme Paneli */}
      <div className="result-container-premium !mt-0 shadow-2xl relative group overflow-hidden rounded-[3rem]">
         <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
         <div 
          className="result-card-premium !p-0 h-48 md:h-64 flex items-center justify-center transition-all duration-1000 ease-in-out border-4 border-white/10" 
          style={{ backgroundColor: hex }}
         >
            <div className="px-10 py-5 bg-black/20 backdrop-blur-2xl border-2 border-white/30 rounded-full text-white font-black text-3xl md:text-5xl tracking-tighter shadow-dark drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] animate-fadeIn">
               {hex.toUpperCase()}
            </div>
            <div className="absolute bottom-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">KALKÜLA DESIGN PREVIEW</div>
         </div>
      </div>

      <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] flex flex-col gap-6 border-b-4 border-accent-primary/20">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] italic px-2">Renk Seçici ve HEX Kod Girişi</label>
        <div className="flex flex-col md:flex-row gap-4">
           <div className="relative group/picker cursor-pointer w-full md:w-32 h-20">
              <input 
                type="color" 
                value={hex} 
                onChange={e => updateAll(e.target.value)} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="absolute inset-0 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center z-10 transition-transform group-hover/picker:scale-95" style={{ backgroundColor: hex }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="drop-shadow-lg"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.17 7.17"/><path d="M11 11l.5.5"/></svg>
              </div>
           </div>
           <input 
            type="text" 
            value={hex.toUpperCase()} 
            onChange={e => updateAll(e.target.value)} 
            className="input-field text-4xl font-black text-center tracking-tighter flex-1 border-4 focus:border-accent-primary transition-all rounded-2xl"
            placeholder="#000000"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "RGB VALUE", val: rgb, color: "var(--accent-primary)" },
          { label: "CMYK VALUE", val: cmyk, color: "var(--accent-secondary)" }
        ].map((item, i) => (
          <div key={i} className="panel p-8 bg-secondary/5 border-2 flex justify-between items-center group hover:border-primary/40 transition-all cursor-pointer rounded-3xl" onClick={() => copy(item.val)}>
            <div className="flex flex-col">
               <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></span>
                  {item.label}
               </div>
               <div style={{ color: item.color }} className="font-mono text-2xl font-black italic tracking-tighter">{item.val}</div>
            </div>
            <div className="opacity-10 group-hover:opacity-100 transition-opacity bg-accent-primary/10 p-3 rounded-xl text-accent-primary">
               <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 italic">KALKÜLA COLOR ENGINE - DESIGNER EDITION</p>
      </div>
    </div>
  );
}
