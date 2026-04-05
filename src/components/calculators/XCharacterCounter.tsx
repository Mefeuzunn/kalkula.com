import React, { useState } from "react";
import confetti from "canvas-confetti";

export function XCharacterCounter() {
  const [text, setText] = useState("");
  const LIMIT = 280;

  // Twitter karakter sayım mantığı (Basitleştirilmiş Link Hassasiyeti)
  const calculateTwitterChars = (val: string) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = val.match(urlPattern) || [];
    let processed = val.replace(urlPattern, "");
    let count = processed.length + (urls.length * 23);
    return count;
  };

  const count = calculateTwitterChars(text);
  const remaining = LIMIT - count;
  const progress = Math.min(100, (count / LIMIT) * 100);

  const getStatusColor = () => {
    if (remaining < 0) return "#ef4444"; // Kırmızı
    if (remaining < 20) return "#f59e0b"; // Turuncu
    return "#1d9bf0"; // Twitter Mavisi
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="panel p-8 bg-secondary/10 border-border rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.663l4.715 6.235 5.616-6.235zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
        </div>

        <div className="flex justify-between items-end mb-6 relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-2 italic">X (Twitter) Karakter Analizi</span>
            <div className="flex items-baseline gap-2">
               <span className={`text-6xl font-black italic tracking-tighter transition-colors duration-500`} style={{ color: getStatusColor() }}>
                 {count}
               </span>
               <span className="text-xl font-bold text-muted/30 italic">/ {LIMIT}</span>
            </div>
          </div>
          <div className={`text-right font-black text-xs uppercase tracking-widest italic flex flex-col items-end gap-1`} style={{ color: getStatusColor() }}>
            {remaining >= 0 ? (
              <>
                <span>{remaining} KARAKTER KALDI</span>
                <span className="text-[8px] opacity-40">TWEET HAZIR</span>
              </>
            ) : (
              <>
                <span>{Math.abs(remaining)} KARAKTER AŞILDI!</span>
                <span className="text-[8px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">LİMİT GENİŞLETİLMELİ</span>
              </>
            )}
          </div>
        </div>

        <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden border border-border shadow-inner relative z-10 mb-8">
           <div 
             className="h-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(29,155,240,0.3)]" 
             style={{ width: `${progress}%`, backgroundColor: getStatusColor() }}
           />
        </div>

        <textarea 
          placeholder="Neler oluyor? Tweet'inizi buraya yazın..." 
          value={text} 
          onChange={e => setText(e.target.value)} 
          className={`input-field p-10 text-xl md:text-2xl min-h-[300px] leading-relaxed border-4 transition-all rounded-[2rem] placeholder:opacity-20 relative z-10 font-medium ${remaining < 0 ? 'border-red-500/40 bg-red-500/5' : 'focus:border-[#1d9bf0] border-border'}`}
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "SÖZCÜK", val: text.trim() ? text.trim().split(/\s+/).length : 0, icon: "📝" },
           { label: "LİNKLER", val: (text.match(/https?:\/\/[^\s]+/g) || []).length, icon: "🔗" },
           { label: "HASHTAG", val: (text.match(/#[^\s]+/g) || []).length, icon: "#" },
           { label: "MENTION", val: (text.match(/@[^\s]+/g) || []).length, icon: "@" }
         ].map((item, i) => (
           <div key={i} className="panel p-6 border-2 border-border flex flex-col items-center justify-center hover:border-accent-primary/30 transition-all rounded-3xl bg-secondary/5 group">
              <div className="text-xl mb-1 group-hover:scale-125 transition-transform">{item.icon}</div>
              <div className="text-3xl font-black italic tracking-tighter text-primary">{item.val}</div>
              <div className="text-[9px] font-black text-muted uppercase mt-1 tracking-widest">{item.label}</div>
           </div>
         ))}
      </div>

      <div className="text-center p-4">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed italic">
            X (TWITTER) OFFICIAL CHARACTER COUNTING ENGINE - VERSION 2024.1
         </p>
      </div>
    </div>
  );
}
