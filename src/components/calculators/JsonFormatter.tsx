import React, { useState } from "react";
import confetti from "canvas-confetti";

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
      confetti({ 
        particleCount: 40, 
        spread: 50, 
        origin: { y: 0.8 }, 
        colors: ["#3b82f6", "#60a5fa"] 
      });
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4">
           <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">Girdi (Raw JSON)</label>
           <span className="text-[10px] font-bold text-accent-primary animate-pulse">JSON VALIDATOR ACTIVE</span>
        </div>
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-3xl blur-lg opacity-10 group-focus-within:opacity-30 transition-all"></div>
           <textarea 
             placeholder='{"id": 1, "name": "Kalküla", "status": "active"}' 
             value={input} 
             onChange={e => setInput(e.target.value)} 
             className="input-field !font-mono !text-sm !py-8 !px-8 border-4 border-border rounded-3xl min-h-[250px] leading-relaxed shadow-inner placeholder:opacity-20 relative z-10 focus:border-accent-primary transition-all"
           />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <button className="btn-primary py-4 text-sm font-black uppercase tracking-widest italic" onClick={() => format(4)}>4 Boşlukla Düzenle</button>
         <button className="btn-secondary py-4 text-sm font-black border-accent-primary/20 text-accent-primary uppercase tracking-widest" onClick={() => format(2)}>2 Boşlukla Düzenle</button>
         <button className="btn-secondary py-4 text-sm font-black border-accent-secondary/20 text-accent-secondary uppercase tracking-widest hover:bg-accent-secondary hover:text-white" onClick={minify}>Minify (Sıkıştır)</button>
      </div>

      {error && (
        <div className="p-6 bg-red-500/5 border-2 border-red-500/20 text-red-500 rounded-2xl text-xs font-mono leading-relaxed animate-shake italic shadow-xl">
           <div className="font-black mb-1 uppercase tracking-widest text-[10px]">Syntax Error Detected</div>
           <p className="opacity-80">⚠️ {error}</p>
        </div>
      )}

      {output && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium !text-left !p-0 border-2 border-accent-primary/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <div className="flex justify-between items-center bg-secondary/10 p-5 border-b border-border">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">İşlenmiş JSON Çıktısı</span>
                 </div>
                 <button 
                   onClick={copyToClipboard}
                   className="px-6 py-2 bg-accent-primary text-white text-[10px] font-black rounded-full hover:scale-105 transition-all shadow-lg shadow-accent-primary/20 active:scale-95"
                 >
                   KODU KOPYALA
                 </button>
              </div>
              <div className="p-2 bg-[#0d1117] relative">
                 <div className="absolute top-4 right-4 text-[8px] font-black text-white/10 uppercase italic">Kalküla Code Engine v1.0</div>
                 <textarea 
                   value={output} 
                   readOnly
                   className="w-full bg-transparent border-0 font-mono text-[13px] text-blue-100 leading-relaxed p-8 min-h-[400px] outline-none scrollbar-custom"
                 />
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
