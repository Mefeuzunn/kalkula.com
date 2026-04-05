"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

/**
 * Profesyonel JSON Formatlayıcı & Minifier
 */
export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = (spaces: number = 4) => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError(null);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ["#3b82f6", "#60a5fa"] });
    } catch (e: any) {
      setError("Hatalı JSON Formatı: " + e.message);
      setOutput("");
    }
  };

  const minify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError("Hatalı JSON Formatı: " + e.message);
      setOutput("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="text-xs font-bold text-muted uppercase tracking-widest block mb-2">JSON Girişi</label>
        <textarea 
          placeholder='{"key": "value", "id": 1}' 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="input-field font-mono text-sm leading-relaxed border-2 shadow-inner min-h-[220px]"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
         <button className="btn-primary" onClick={() => format(4)}>Formatla (4 Space)</button>
         <button className="btn-secondary" onClick={() => format(2)}>Formatla (2 Space)</button>
         <button className="btn-secondary text-accent-secondary border-accent-secondary/20" onClick={minify}>Minify (Küçült)</button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border-2 border-red-500/30 text-red-500 rounded-xl text-sm font-mono leading-relaxed animate-result">
           ⚠️ {error}
        </div>
      )}

      {output && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium !text-left !p-0">
             <div className="flex justify-between items-center bg-bg-secondary p-4 border-b border-border">
                <span className="text-xs font-bold text-accent-primary uppercase tracking-widest">Çıktı (JSON)</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(output); }}
                  className="px-4 py-1.5 bg-accent-primary text-white text-[10px] font-black rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                  KOPYALA
                </button>
             </div>
             <div className="p-1">
                <textarea 
                  value={output} 
                  readOnly
                  className="w-full bg-surface border-0 font-mono text-sm leading-relaxed p-6 min-h-[350px] outline-none"
                />
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

/**
 * Base64 İşleyici
 */
export function HashGenerator() {
  const [text, setText] = useState("");
  const [base64Enc, setBase64Enc] = useState("");
  const [base64Dec, setBase64Dec] = useState("");
  const [isError, setIsError] = useState(false);

  const processBasic = (val: string) => {
    setText(val);
    if (!val.trim()) { setBase64Enc(""); setBase64Dec(""); setIsError(false); return; }
    
    // Encode
    try { setBase64Enc(btoa(unescape(encodeURIComponent(val)))); } catch(e) { setBase64Enc("Hata"); }
    
    // Decode
    try { 
      setBase64Dec(decodeURIComponent(escape(atob(val)))); 
      setIsError(false);
    } catch(e) { 
      setBase64Dec("Geçersiz Base64"); 
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="text-xs font-bold text-muted uppercase tracking-widest">Metin veya Base64 Kodu</label>
        <textarea 
          placeholder="İşlem yapmak istediğiniz metni girin..."
          value={text} 
          onChange={e => processBasic(e.target.value)} 
          className="input-field min-h-[140px] border-2 shadow-inner"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="result-container-premium !mt-0 h-full">
            <div className="result-card-premium h-full flex flex-col p-6 text-left">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-black uppercase text-accent-secondary tracking-widest">BASE64 ENCODE</span>
                 {base64Enc && (
                   <button onClick={() => navigator.clipboard.writeText(base64Enc)} className="p-2 hover:bg-accent-secondary/10 rounded-lg text-accent-secondary transition-colors">
                     <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                   </button>
                 )}
              </div>
              <div className="font-mono text-sm break-all text-primary leading-relaxed flex-1">
                {base64Enc || "Bekleniyor..."}
              </div>
            </div>
         </div>

         <div className="result-container-premium !mt-0 h-full">
            <div className={`result-card-premium h-full flex flex-col p-6 text-left ${isError ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${isError ? 'text-red-500' : 'text-accent-primary'}`}>BASE64 DECODE</span>
                 {base64Dec && !isError && (
                   <button onClick={() => navigator.clipboard.writeText(base64Dec)} className="p-2 hover:bg-accent-primary/10 rounded-lg text-accent-primary transition-colors">
                     <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                   </button>
                 )}
              </div>
              <div className={`font-mono text-sm break-all leading-relaxed flex-1 ${isError ? 'text-red-400' : 'text-primary'}`}>
                {base64Dec || "Bekleniyor..."}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}

/**
 * Tasarımcılar için Renk Dönüştürücü
 */
export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [cmyk, setCmyk] = useState("");

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

  return (
    <div className="flex flex-col gap-8">
      <div className="result-container-premium !mt-0 shadow-2xl">
         <div 
          className="result-card-premium !p-0 h-40 flex items-center justify-center transition-all duration-700" 
          style={{ backgroundColor: hex }}
         >
            <div className="px-8 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white font-black text-2xl tracking-tighter shadow-2xl drop-shadow-xl">
               {hex.toUpperCase()}
            </div>
         </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Renk Seçici</label>
        <div className="flex gap-4">
           <input 
            type="color" 
            value={hex} 
            onChange={e => updateAll(e.target.value)} 
            className="w-20 h-20 rounded-2xl cursor-pointer bg- surface border-4 border-surface shadow-xl p-0"
           />
           <input 
            type="text" 
            value={hex.toUpperCase()} 
            onChange={e => updateAll(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)} 
            className="input-field text-3xl font-black text-center tracking-tighter flex-1 border-2"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "RGB VALUE", val: rgb, color: "var(--accent-primary)" },
          { label: "CMYK VALUE", val: cmyk, color: "var(--accent-secondary)" }
        ].map((item, i) => (
          <div key={i} className="panel p-6 bg-secondary/5 border-2 flex justify-between items-center hover:border-primary/30 transition-all cursor-pointer" onClick={() => navigator.clipboard.writeText(item.val)}>
            <div>
               <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">{item.label}</div>
               <div style={{ color: item.color }} className="font-mono text-xl font-black">{item.val}</div>
            </div>
            <div className="text-muted opacity-30 group-hover:opacity-100">
               <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
