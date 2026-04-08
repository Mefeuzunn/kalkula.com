"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Trophy, Users, UserCheck, Trash2, Zap, PlayCircle, Star, Sparkles, Info, RefreshCw, AlertCircle, Copy } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function RaffleMaker() {
  const [names, setNames] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const list = names.split("\n").map(n => n.trim()).filter(n => n.length > 0);
  const isInvalid = list.length < winnersCount || list.length === 0;

  const roll = () => {
    if (isInvalid) return;
    
    setIsRolling(true);
    setWinners([]);
    
    let counter = 0;
    const interval = setInterval(() => {
       const randomIdx = Math.floor(Math.random() * list.length);
       setCurrentName(list[randomIdx]);
       counter++;
       
       if(counter > 40) {
          clearInterval(interval);
          setIsRolling(false);
          
          const shuffled = [...list].sort(() => 0.5 - Math.random());
          const finalWinners = shuffled.slice(0, winnersCount);
          setWinners(finalWinners);

          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"]
          });
       }
    }, 60);
  };

  const reset = () => {
    setNames("");
    setWinnersCount(1);
    setWinners([]);
    setIsRolling(false);
    setCurrentName("");
  };

  return (
    <V2CalculatorWrapper
      title="KUR'A VE ÇEKİLİŞ"
      icon="🎲"
      infoText="Katılımcı listesini girin, kazanan sayısını seçin ve şeffaf bir çekiliş gerçekleştirin. Tamamen rastlantısal ve adil seçim algoritması."
      results={(isRolling || winners.length > 0) && (
        <div className="space-y-8">
           {/* Rolling State */}
           {isRolling && (
              <div className="flex flex-col items-center">
                 <div className="w-full p-12 rounded-[3rem] bg-white/5 border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] flex items-center justify-center relative overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <span className="text-4xl md:text-6xl font-black text-purple-500 italic tracking-tighter uppercase drop-shadow-lg text-center">
                       {currentName}
                    </span>
                 </div>
                 <div className="mt-6 text-[10px] font-black text-muted uppercase tracking-[0.4em] italic opacity-40">
                    KURA ÇEKİLİYOR...
                 </div>
              </div>
           )}

           {/* Results State */}
           {winners.length > 0 && !isRolling && (
              <div className="space-y-6 animate-result">
                 <div className="flex items-center gap-3 px-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">KAZANANLAR</div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {winners.map((w, i) => (
                       <V2ResultCard 
                         key={i}
                         color={i === 0 ? "purple" : "blue"}
                         label={`KAZANAN #${i + 1}`}
                         value={w}
                         icon={i === 0 ? "🏆" : "⭐"}
                         className="!text-xl font-black italic break-all"
                       />
                    ))}
                 </div>

                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest italic">
                    <span>Toplam Katılımcı: {list.length}</span>
                    <span className="text-emerald-500">Güvenli Kura √</span>
                 </div>
              </div>
           )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Users className="w-4 h-4 text-purple-500" /> KATILIMCI LİSTESİ
              </div>
              <button 
                onClick={() => setNames("")}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <textarea 
                placeholder="Her satıra bir isim yazın...&#10;Örn: Ahmet Yılmaz&#10;Mehmet Demir" 
                value={names} 
                onChange={e => setNames(e.target.value)} 
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-medium text-lg min-h-[300px] leading-relaxed focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-muted/20 scrollbar-custom resize-none"
              />
              <div className="absolute right-6 bottom-6 pointer-events-none opacity-5 group-focus-within:opacity-20 transition-opacity">
                 <UserCheck className="w-16 h-16 text-purple-500" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input 
                label="KAZANAN SAYISI" 
                value={winnersCount.toString()} 
                onChange={(val) => setWinnersCount(parseInt(val) || 1)} 
                type="number"
                placeholder="1"
                fieldClassName="!text-2xl text-center font-black italic"
              />
              <div className="flex flex-col justify-end">
                 <V2ActionRow 
                   onCalculate={roll} 
                   onReset={reset} 
                   calculateLabel={isRolling ? "ÇEKİLİYOR..." : "🎯 KURA ÇEK"}
                   isCalculateDisabled={isRolling || isInvalid || names.trim() === ""}
                   className="!mt-0"
                 />
              </div>
           </div>

           {isInvalid && names.trim() !== "" && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex gap-3 items-center animate-shake">
                 <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                 <p className="text-[10px] text-red-500 font-bold italic uppercase tracking-widest">
                   Katılımcı sayısı kazanan sayısından az olamaz!
                 </p>
              </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">ADİL SEÇİM</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Tam Rastlantısal Algoritma</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">ŞEFFAF</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anlık ve Görülebilir Süreç</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-purple-600/5 border border-purple-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-purple-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Çekiliş süreci tamamen tarafımızdan sunulan rastlantısal sayı motoru ile gerçekleştirilir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
