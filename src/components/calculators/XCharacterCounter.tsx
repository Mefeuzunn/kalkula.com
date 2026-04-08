"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Hash, AtSign, Link as LinkIcon, MessageSquare, Trash2, Zap, AlertCircle, Info, Sparkles, Send, CheckCircle2, X, Copy } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function XCharacterCounter() {
  const [text, setText] = useState("");
  const LIMIT = 280;

  // Twitter character count logic (Simplified Link Sensitivity)
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
    if (remaining < 0) return "#ef4444"; // Red
    if (remaining < 20) return "#f59e0b"; // Amber
    return "#1d9bf0"; // Twitter Blue
  };

  const getStatusColorKey = () => {
    if (remaining < 0) return "red" as const;
    if (remaining < 20) return "amber" as const;
    return "blue" as const;
  };

  const reset = () => setText("");

  const copy = () => {
    navigator.clipboard.writeText(text);
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#1d9bf0", "#ffffff"] });
  };

  return (
    <V2CalculatorWrapper
      title="X (TWITTER) ANALİZ"
      icon="🐦"
      infoText="Tweetlerinizi X (Twitter) limitlerine göre anlık olarak analiz edin. Linkler, hashtagler ve mentionlar için özel sayım algoritması içerir."
      results={(count > 0) && (
        <div className="space-y-6">
           <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 space-y-6 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                 <X className="w-24 h-24" />
              </div>

              <div className="flex justify-between items-end relative z-10">
                 <div className="space-y-1">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.3em] italic">KARAKTER DOLULUĞU</div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-6xl font-black italic tracking-tighter transition-colors duration-500" style={{ color: getStatusColor() }}>
                          {count}
                       </span>
                       <span className="text-xl font-bold text-muted/30 italic">/ {LIMIT}</span>
                    </div>
                 </div>
                 <div className="text-right space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest italic" style={{ color: getStatusColor() }}>
                       {remaining >= 0 ? `${remaining} KALDI` : `${Math.abs(remaining)} AŞILDI`}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic ${remaining < 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-muted opacity-40'}`}>
                       {remaining < 0 ? 'LİMİT AŞILDI' : 'YAYINLANABİLİR'}
                    </div>
                 </div>
              </div>

              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner relative z-10">
                 <div 
                   className="h-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(29,155,240,0.3)]" 
                   style={{ width: `${progress}%`, backgroundColor: getStatusColor() }}
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <V2ResultCard 
                color="blue" 
                label="SÖZCÜK" 
                value={text.trim() ? text.trim().split(/\s+/).length : 0} 
                icon="📝" 
              />
              <V2ResultCard 
                color="emerald" 
                label="LİNKLER" 
                value={(text.match(/https?:\/\/[^\s]+/g) || []).length} 
                icon="🔗" 
              />
              <V2ResultCard 
                color="purple" 
                label="HASHTAG" 
                value={(text.match(/#[^\s]+/g) || []).length} 
                icon="#" 
              />
              <V2ResultCard 
                color="amber" 
                label="MENTION" 
                value={(text.match(/@[^\s]+/g) || []).length} 
                icon="@" 
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={copy}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95"
              >
                 <Copy className="w-4 h-4" /> KOPYALA
              </button>
              <button 
                onClick={reset}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-muted font-black italic hover:bg-red-600/10 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-95"
              >
                 <Trash2 className="w-4 h-4" /> TEMİZLE
              </button>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-2">
              <MessageSquare className="w-4 h-4 text-[#1d9bf0]" /> TWEET İÇERİĞİ
           </div>

           <div className="relative group">
              <textarea 
                placeholder="Neler oluyor?" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className={`w-full p-8 rounded-2xl bg-white/5 border-2 transition-all min-h-[300px] leading-relaxed text-xl focus:outline-none placeholder:text-muted/20 scrollbar-custom resize-none font-medium ${remaining < 0 ? 'border-red-500/50' : 'border-white/10 focus:border-[#1d9bf0]/50'}`}
              />
              <div className="absolute right-6 bottom-6 pointer-events-none opacity-5 group-focus-within:opacity-20 transition-opacity">
                 <X className="w-20 h-20 text-[#1d9bf0]" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">LİNK ANALİZİ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">t.co formatına göre sayım</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">GÜNCEL</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">280 karakter standardı</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> X (Twitter) tüm linkleri otomatik olarak 23 karakter sayar. Bu araç bu kuralı otomatik olarak uygular.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
