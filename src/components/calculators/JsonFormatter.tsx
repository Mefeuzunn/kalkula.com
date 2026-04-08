"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Braces, Zap, Code, Sparkles, Terminal, Copy, Trash2, ShieldCheck, FileJson, Binary, AlertCircle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = (mode: 'pretty' | 'minify') => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = mode === 'pretty' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      setOutput(formatted);
      setError("");
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      setError("Hatalı JSON Formatı: " + (e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <V2CalculatorWrapper
      title="JSON FORMATTER"
      icon="⚙️"
      infoText="Karmaşık JSON verilerinizi tek tıkla okunaklı hale getirin (Pretty Print) veya web performansı için küçültün (Minify)."
      results={(output || error) && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                   {error ? <AlertCircle className="w-4 h-4 text-red-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                   <span className="text-[10px] font-black text-muted uppercase italic tracking-widest">
                      {error ? "VALIDASYON HATASI" : "İŞLENMİŞ VERİ"}
                   </span>
                </div>
                {output && (
                   <button 
                     onClick={copy}
                     className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/10 hover:bg-blue-500 hover:text-white transition-all active:scale-90"
                   >
                      <Copy className="w-3 h-3" />
                   </button>
                )}
             </div>
             <div className={`font-mono text-xs break-all bg-black/20 p-5 rounded-2xl border border-white/5 min-h-[200px] leading-relaxed ${error ? 'text-red-500 italic' : 'text-primary/80 whitespace-pre'}`}>
                {output || error}
             </div>
          </div>

          {!error && output && (
            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
               <Info className="w-5 h-5 text-blue-500 shrink-0" />
               <p className="text-[10px] text-muted italic leading-relaxed">
                 JSON verisi başarıyla doğrulandı ve formatlandı. Çıktı boyutunu sağ üstteki kopyalama butonu ile hafızaya alabilirsiniz.
               </p>
            </div>
          )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Terminal className="w-4 h-4" /> KAYNAK JSON
              </div>
              <button 
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <textarea 
                placeholder='{"key": "value", "id": 123}...'
                value={input} 
                onChange={e => setInput(e.target.value)} 
                className="w-full min-h-[220px] p-6 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-mono text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-muted/30 placeholder:italic"
              />
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Braces className="w-8 h-8 text-blue-500" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <button 
             onClick={() => format('pretty')}
             className="p-6 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center gap-4 transition-all hover:bg-blue-600/20 active:scale-95 group"
           >
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                 <div className="text-xs font-black text-primary italic">GÜZEL FORMATLA</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Indented & Readale JSON</div>
              </div>
           </button>
           <button 
             onClick={() => format('minify')}
             className="p-6 rounded-3xl bg-black/20 border border-white/5 flex items-center gap-4 transition-all hover:bg-black/30 active:scale-95 group"
           >
              <div className="p-3 rounded-2xl bg-white text-black shadow-lg shadow-white/10 group-hover:scale-110 transition-transform">
                 <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                 <div className="text-xs font-black text-primary italic">MİNİFİE ET</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Tek Satır & Optimized</div>
              </div>
           </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Binary className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">UTF-8</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Tam Karakter Uyumu</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <FileJson className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">LINT</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Otomatik Validasyon</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
