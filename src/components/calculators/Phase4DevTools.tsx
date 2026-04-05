"use client";

import { useState } from "react";
import { ShareResultButton } from "../ShareResultButton";

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
        <label className="text-sm font-bold text-muted uppercase tracking-tighter">JSON Girişi</label>
        <textarea 
          placeholder='{"key": "value", "id": 1}' 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="input-field font-mono text-sm leading-relaxed"
          style={{ minHeight: "200px" }}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
         <button className="btn-primary" onClick={() => format(4)}>Formatla (4 Space)</button>
         <button className="btn-secondary" onClick={() => format(2)}>Formatla (2 Space)</button>
         <button className="btn-secondary text-accent-secondary border-accent-secondary/20" onClick={minify}>Minify (Küçült)</button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm font-mono leading-relaxed">
           ⚠️ {error}
        </div>
      )}

      {output && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-2 px-1">
             <label className="text-sm font-bold text-accent-primary uppercase tracking-tighter">Sonuç (Formatlanmış)</label>
             <button 
              onClick={() => { navigator.clipboard.writeText(output); }}
              className="text-[10px] font-bold py-1 px-3 bg-accent-primary/10 text-accent-primary rounded-full hover:bg-accent-primary/20 transition-all border border-accent-primary/20"
             >
               KOPYALA
             </button>
          </div>
          <textarea 
            value={output} 
            readOnly
            className="input-field font-mono text-sm leading-relaxed bg-secondary/20 border-accent-primary/30"
            style={{ minHeight: "350px" }}
          />
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
      setBase64Dec("Geçersiz Base64 Formatı"); 
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-muted uppercase tracking-tighter">Metin veya Base64 Kodu</label>
        <textarea 
          placeholder="Şifrelemek için metin, çözmek için Base64 kodu girin..."
          value={text} 
          onChange={e => processBasic(e.target.value)} 
          className="input-field min-h-[120px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="panel p-5 border-accent-secondary/20 bg-accent-secondary/5 relative overflow-hidden group">
            <div className="text-[10px] uppercase font-black text-accent-secondary mb-3 tracking-widest opacity-80">BASE64 ENCODE (ŞİFRELE)</div>
            <div className="font-mono text-sm break-all text-primary min-h-[50px] leading-relaxed">
              {base64Enc || "Metin girilmesi bekleniyor..."}
            </div>
            {base64Enc && (
              <button 
                onClick={() => navigator.clipboard.writeText(base64Enc)}
                className="mt-4 w-full py-2 bg-accent-secondary/10 text-accent-secondary text-[11px] font-bold rounded-lg hover:bg-accent-secondary/20 border border-accent-secondary/30"
              >
                KOPYALA
              </button>
            )}
         </div>

         <div className={`panel p-5 border-accent-primary/20 bg-accent-primary/5 ${isError ? 'border-red-500/30' : ''}`}>
            <div className="text-[10px] uppercase font-black text-accent-primary mb-3 tracking-widest opacity-80">BASE64 DECODE (ÇÖZÜCÜ)</div>
            <div className={`font-mono text-sm break-all leading-relaxed min-h-[50px] ${isError ? 'text-red-400 opacity-60' : 'text-primary'}`}>
              {base64Dec || "Kod girilmesi bekleniyor..."}
            </div>
            {base64Dec && !isError && (
              <button 
                onClick={() => navigator.clipboard.writeText(base64Dec)}
                className="mt-4 w-full py-2 bg-accent-primary/10 text-accent-primary text-[11px] font-bold rounded-lg hover:bg-accent-primary/20 border border-accent-primary/30"
              >
                KOPYALA
              </button>
            )}
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
      
      // Calculate CMYK
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
    <div className="flex flex-col gap-6">
      <div 
        className="w-full h-32 rounded-2xl shadow-xl border-4 border-surface shadow-black/20" 
        style={{ backgroundColor: hex, transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      ></div>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-muted uppercase tracking-tighter">Renk Seçici</label>
        <div className="flex gap-4">
           <input 
            type="color" 
            value={hex} 
            onChange={e => updateAll(e.target.value)} 
            className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-0 p-0"
           />
           <input 
            type="text" 
            value={hex.toUpperCase()} 
            onChange={e => updateAll(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)} 
            className="input-field text-2xl font-mono text-center tracking-widest flex-1 p-0"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "RGB Değeri", val: rgb, color: "var(--accent-primary)" },
          { label: "CMYK Değeri", val: cmyk, color: "var(--accent-secondary)" }
        ].map((item, i) => (
          <div key={i} className="panel p-5 bg-secondary/10 border-border">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-black uppercase text-muted tracking-widest">{item.label}</span>
               <button onClick={() => navigator.clipboard.writeText(item.val)} className="text-[9px] font-bold text-primary opacity-50 hover:opacity-100 transition-opacity">KOPYALA</button>
            </div>
            <div style={{ color: item.color }} className="font-mono text-lg font-bold">{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
