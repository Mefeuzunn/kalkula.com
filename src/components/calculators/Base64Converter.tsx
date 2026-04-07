import React, { useState } from "react";
import confetti from "canvas-confetti";

export function Base64Converter() {
  const [text, setText] = useState("");
  const [base64Enc, setBase64Enc] = useState("");
  const [base64Dec, setBase64Dec] = useState("");
  const [isError, setIsError] = useState(false);

  const processBasic = (val: string) => {
    setText(val);
    if (!val.trim()) { setBase64Enc(""); setBase64Dec(""); setIsError(false); return; }
    
    // Encode (UTF-8 Güvenli)
    try { 
       const encoded = btoa(unescape(encodeURIComponent(val)));
       setBase64Enc(encoded); 
    } catch(e) { setBase64Enc("Hata"); }
    
    // Decode (UTF-8 Güvenli)
    try { 
      const decoded = decodeURIComponent(escape(atob(val)));
      setBase64Dec(decoded); 
      setIsError(false);
    } catch(e) { 
      setBase64Dec("Geçersiz Base64"); 
      setIsError(true);
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <label className="calc-input-label">GİRDİ (METİN VEYA KOD)</label>
        <div className="calc-input-key">
            <textarea 
              placeholder="Encode edilecek metni veya Decode edilecek Base64 kodunu buraya girin..."
              value={text} 
              onChange={e => processBasic(e.target.value)} 
              className="calc-input-field !text-lg !text-left min-h-[220px] resize-none"
            />
        </div>
      </div>

      <div className="panel p-0 bg-transparent border-none shadow-none mt-4">
        <div className="calc-result-header">
           <span>⚡</span> BASE64 İŞLEM SONUÇLARI
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="calc-result-card !p-8 !bg-secondary/5 border-secondary/20 !items-start">
             <div className="flex justify-between items-center w-full mb-4">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                   <span className="calc-result-card-label">ENCODE (ŞİFRELE)</span>
                </div>
                {base64Enc && base64Enc !== "Hata" && (
                   <button onClick={() => copy(base64Enc)} className="px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black rounded-full hover:bg-accent-primary hover:text-white transition-all shadow-lg active:scale-90">
                      KOPYALA
                   </button>
                )}
             </div>
             <div className="w-full font-mono text-xs break-all bg-surface/50 p-6 rounded-2xl border border-border min-h-[100px]">
                {base64Enc || "Bekleniyor..."}
             </div>
          </div>

          <div className="calc-result-card !p-8 !bg-secondary/5 border-secondary/20 !items-start">
             <div className="flex justify-between items-center w-full mb-4">
                <div className="flex items-center gap-2">
                   <span className={`w-2 h-2 rounded-full ${isError ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></span>
                   <span className="calc-result-card-label">DECODE (ÇÖZ)</span>
                </div>
                {base64Dec && !isError && (
                   <button onClick={() => copy(base64Dec)} className="px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black rounded-full hover:bg-accent-primary hover:text-white transition-all shadow-lg active:scale-90">
                      KOPYALA
                   </button>
                )}
             </div>
             <div className={`w-full font-mono text-xs break-all bg-surface/50 p-6 rounded-2xl border border-border min-h-[100px] ${isError ? 'text-red-500 italic' : ''}`}>
                {base64Dec || "Bekleniyor..."}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.4em] opacity-30 italic">
            SECURE BASE64 TRANSCODING • UTF-8 COMPLIANCE • 2026 EDITION
         </p>
      </div>
    </div>
  );
}
