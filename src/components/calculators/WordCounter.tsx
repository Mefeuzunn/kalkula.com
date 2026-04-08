"use client";

import React, { useState } from "react";
import { Type, AlignLeft, Clock, MessageSquare, Hash, Timer, Trash2, Zap, Info, Quote, FileText, Sparkles } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  
  // Average reading speed is 200-250 wpm, speaking is 130-150.
  const readingTime = Math.ceil(words / 225) || 0;
  const speakingTime = Math.ceil(words / 140) || 0;

  const reset = () => setText("");

  return (
    <V2CalculatorWrapper
      title="KELİME & KARAKTER SAYACI"
      icon="📝"
      infoText="Metinlerinizin uzunluğunu, kelime sayısını ve tahmini okuma sürelerini anında analiz edin. Blog yazıları, akademik makaleler ve sosyal medya içerikleri için idealdir."
      results={(chars > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           <V2ResultCard 
             color="blue" 
             label="KELİME" 
             value={words.toLocaleString()} 
             icon="🔤" 
           />
           <V2ResultCard 
             color="emerald" 
             label="KARAKTER" 
             value={chars.toLocaleString()} 
             icon="🔢" 
           />
           <V2ResultCard 
             color="purple" 
             label="BOŞLUKSUZ" 
             value={charsNoSpace.toLocaleString()} 
             icon="🚫" 
           />
           <V2ResultCard 
             color="indigo" 
             label="PARAGRAF" 
             value={paragraphs.toLocaleString()} 
             icon="¶" 
           />
           <V2ResultCard 
             color="amber" 
             label="OKUMA SÜRESİ" 
             value={`${readingTime} DK`} 
             icon="📖" 
           />
           <V2ResultCard 
             color="pink" 
             label="KONUŞMA SÜRESİ" 
             value={`${speakingTime} DK`} 
             icon="🗣️" 
           />
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <AlignLeft className="w-4 h-4 text-blue-500" /> SAYILACAK METİN
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
                placeholder="Metninizi buraya yapıştırın veya yazmaya başlayın..." 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-medium text-lg min-h-[400px] leading-relaxed focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-muted/20 scrollbar-custom resize-none"
              />
              <div className="absolute right-6 bottom-6 pointer-events-none opacity-10 group-focus-within:opacity-30 transition-opacity">
                 <FileText className="w-12 h-12 text-blue-500" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">GERÇEK ZAMANLI</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Siz yazdıkça anlık analiz</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">OKUNABİLİRLİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Zamanlama ve hacim denetimi</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Okuma süresi dakikada 225 kelime, konuşma süresi ise 140 kelime ortalaması üzerinden hesaplanmıştır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
