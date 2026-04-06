import React, { useState } from "react";

export function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  
  // Ortalama okuma hızı dakikada 200-250 kelimedir, konuşma hızı ise 130-150.
  const readingTime = Math.ceil(words / 225) || 0;
  const speakingTime = Math.ceil(words / 140) || 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Kelime", val: words, color: "var(--accent-primary)" },
          { label: "Karakter", val: chars, color: "var(--primary)" },
          { label: "Boşluksuz", val: charsNoSpace, color: "var(--text-secondary)" },
          { label: "Paragraf", val: paragraphs, color: "#8b5cf6" },
          { label: "Okuma (Dk)", val: readingTime, color: "#10b981" },
          { label: "Konuşma (Dk)", val: speakingTime, color: "#f59e0b" }
        ].map((item, i) => (
          <div key={i} className="panel flex flex-col items-center justify-center p-6 border-2 border-border hover:border-accent-primary/30 transition-all group rounded-3xl relative overflow-hidden bg-secondary/5">
            <div className="absolute top-0 right-0 p-1 opacity-20 transition-opacity group-hover:opacity-100">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20"/></svg>
            </div>
            <div style={{ color: item.color || "var(--text-primary)" }} className="text-3xl font-black italic tracking-tighter">{item.val}</div>
            <div className="text-[9px] uppercase font-black text-muted mt-2 tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-[2.5rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-all duration-700"></div>
         <textarea 
           placeholder="Saymak istediğiniz metni buraya yapıştırın veya yazmaya başlayın..." 
           value={text} 
           onChange={e => setText(e.target.value)} 
           className="input-field p-10 text-xl border-4 border-border rounded-[2.5rem] min-h-[450px] leading-relaxed shadow-inner placeholder:opacity-30 relative z-10 focus:border-accent-primary transition-all scrollbar-custom"
           style={{ resize: "vertical" }}
         />
         <div className="absolute bottom-6 right-8 text-[10px] font-black text-muted uppercase tracking-[0.3em] italic z-20 pointer-events-none opacity-40">
            Kalkula AI Word Analysis Engine
         </div>
      </div>

      <div className="flex flex-wrap justify-between items-center px-4">
         <div className="flex gap-6 items-center">
            <div className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Real-Time Analysis
            </div>
            <div className="hidden md:flex text-[10px] font-black text-muted uppercase tracking-widest border-l border-border pl-6 italic">
               Okunabilirlik Analizi: {words > 100 ? "OPTIMUM" : "ANALİZ EDİLİYOR"}
            </div>
         </div>
         <button onClick={() => setText("")} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Temizle</button>
      </div>

      <div className="mt-8 p-6 bg-secondary/5 border border-border rounded-3xl text-center">
         <p className="text-[10px] text-muted font-medium italic leading-relaxed max-w-2xl mx-auto">
            💡 <b>Hesaplama Notu:</b> Okuma süresi dakikada ortalama 225 kelime, konuşma süresi ise dakikada 140 kelime baz alınarak bir yetişkinin ortalama hızı üzerinden hesaplanmıştır.
         </p>
      </div>
    </div>
  );
}
