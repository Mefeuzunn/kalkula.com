"use client";

import React, { useState } from "react";

export function GlassGenerator() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(20);
  const [color, setColor] = useState("#ffffff");
  const [border, setBorder] = useState(10);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const cssCode = `background: rgba(${hexToRgb(color)}, ${opacity / 100});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: 20px;
border: 1px solid rgba(${hexToRgb(color)}, ${border / 100});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-section relative overflow-hidden p-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] min-h-[400px] flex items-center justify-center">
           {/* Moving background items for preview */}
           <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400 rounded-full animate-bounce"></div>
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse"></div>
           
           <div 
             className="w-full max-w-[280px] h-48 flex flex-col items-center justify-center text-center p-6 animate-fade-in"
             style={{
               background: `rgba(${hexToRgb(color)}, ${opacity / 100})`,
               backdropFilter: `blur(${blur}px)`,
               WebkitBackdropFilter: `blur(${blur}px)`,
               borderRadius: "20px",
               border: `1px solid rgba(${hexToRgb(color)}, ${border / 100})`,
               boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
             }}
           >
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Glass UI</h4>
              <p className="text-white/80 text-[10px] font-medium leading-relaxed italic">Modern ve şeffaf katmanları projelerinize anında entegre edin.</p>
           </div>
        </div>

        <div className="calc-input-section">
           <div className="space-y-6">
              <div className="calc-input-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="calc-label !mb-0">Bulanıklık (Blur): {blur}px</label>
                </div>
                <input type="range" min="0" max="40" value={blur} onChange={e => setBlur(parseInt(e.target.value))} className="calc-range" />
              </div>
              
              <div className="calc-input-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="calc-label !mb-0">Şeffaflık: %{opacity}</label>
                </div>
                <input type="range" min="0" max="100" value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} className="calc-range" />
              </div>

              <div className="calc-input-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="calc-label !mb-0">Kenar Şıklığı: {border}%</label>
                </div>
                <input type="range" min="0" max="100" value={border} onChange={e => setBorder(parseInt(e.target.value))} className="calc-range" />
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Temel Renk</label>
                <div className="flex gap-2">
                   {['#ffffff', '#000000', '#2563eb', '#10b981', '#f59e0b'].map(c => (
                     <button 
                       key={c} 
                       onClick={() => setColor(c)}
                       className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-accent-primary scale-110' : 'border-transparent'} transition-all`}
                       style={{ backgroundColor: c }}
                     />
                   ))}
                   <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded-full border-none cursor-pointer" />
                </div>
              </div>
           </div>

           <div className="mt-8 bg-secondary/10 p-5 rounded-3xl border border-border relative group">
              <label className="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-3 block italic">Oluşturulan CSS Kodu</label>
              <pre className="text-[10px] font-mono text-primary leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {cssCode}
              </pre>
              <button 
                onClick={copy}
                className="absolute right-4 top-4 btn-primary !py-2 !px-4 text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                {copied ? "KOPYALANDI" : "KODU AL"}
              </button>
           </div>
        </div>
      </div>

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💎</span>
        <span className="calc-info-box-text">
          <b>Tasarımcı Notu:</b> Glassmorphism etkisinin belirgin olması için arka planın düz renk yerine gradyan veya karmaşık bir görsel içermesi önemlidir. Ürettiğiniz kodu doğrudan div stilinize ekleyebilirsiniz.
        </span>
      </div>
    </div>
  );
}
