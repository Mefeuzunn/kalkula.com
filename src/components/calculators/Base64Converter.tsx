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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 group">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic px-6">Girdi (Metin veya Kod)</label>
        <div className="relative bg-surface border-4 border-border rounded-[2.5rem] transition-all duration-300 
          shadow-[0_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_16px_0_rgba(0,0,0,0.4)]
          group-focus-within:-translate-y-1 group-focus-within:shadow-[0_10px_0_rgba(0,0,0,0.1)]
          hover:shadow-[0_20px_0_rgba(0,0,0,0.06)]
          overflow-hidden">
           <textarea 
             placeholder="Encode edilecek metni veya Decode edilecek Base64 kodunu buraya girin..."
             value={text} 
             onChange={e => processBasic(e.target.value)} 
             className="w-full bg-transparent border-none outline-none text-xl p-10 font-black italic tracking-tight min-h-[220px] leading-relaxed relative z-10"
           />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="result-container-premium !mt-0 h-full group">
            <div className="result-card-premium h-full flex flex-col p-8 text-left border-2 border-accent-secondary/20 shadow-xl hover:border-accent-secondary/40 transition-all">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase text-accent-secondary tracking-widest italic">BASE64 ENCODE</span>
                 </div>
                 {base64Enc && base64Enc !== "Hata" && (
                   <button onClick={() => copy(base64Enc)} className="px-4 py-1.5 bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[8px] font-black rounded-full hover:bg-accent-secondary hover:text-white transition-all shadow-lg active:scale-95">
                      KOPYALA
                   </button>
                 )}
              </div>
              <div className="font-mono text-sm break-all text-primary leading-relaxed flex-1 bg-secondary/5 rounded-2xl p-4 border border-border/50">
                {base64Enc || "Metin girilmesi bekleniyor..."}
              </div>
            </div>
         </div>

         <div className="result-container-premium !mt-0 h-full group">
            <div className={`result-card-premium h-full flex flex-col p-8 text-left border-2 shadow-xl transition-all ${isError ? 'border-red-500/20 opacity-80' : 'border-accent-primary/20 hover:border-accent-primary/40'}`}>
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isError ? 'bg-red-500' : 'bg-accent-primary'}`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-widest italic ${isError ? 'text-red-500' : 'text-accent-primary'}`}>BASE64 DECODE</span>
                 </div>
                 {base64Dec && !isError && (
                   <button onClick={() => copy(base64Dec)} className="px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black rounded-full hover:bg-accent-primary hover:text-white transition-all shadow-lg active:scale-95">
                      KOPYALA
                   </button>
                 )}
              </div>
              <div className={`font-mono text-sm break-all leading-relaxed flex-1 bg-secondary/5 rounded-2xl p-4 border border-border/50 ${isError ? 'text-red-400 italic' : 'text-primary'}`}>
                {base64Dec || "Base64 girilmesi bekleniyor..."}
              </div>
            </div>
         </div>
      </div>

      <div className="text-center p-4">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed italic">
            SECURE BASE64 TRANSCODING - UTF-8 COMPLIANCE ENGINE
         </p>
      </div>
    </div>
  );
}
