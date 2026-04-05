import React, { useState } from "react";
import confetti from "canvas-confetti";

export function RaffleMaker() {
  const [names, setNames] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const roll = () => {
    const list = names.split("\n").map(n => n.trim()).filter(n => n.length > 0);
    if (list.length < winnersCount || list.length === 0) {
      alert("Katılımcı sayısı, kazanan sayısından az olamaz.");
      return;
    }
    
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] px-2 italic">Katılımcı Listesi (Her satıra bir isim)</label>
        <textarea 
          placeholder="Ahmet Yılmaz&#10;Mehmet Demir&#10;Ayşe Kaya..." 
          value={names} 
          onChange={e => setNames(e.target.value)} 
          className="input-field p-6 min-h-[250px] text-lg leading-relaxed shadow-inner border-2 focus:border-accent-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col gap-2">
           <label className="text-[10px] font-black text-muted uppercase tracking-widest px-1">Kazanan Sayısı</label>
           <input 
            type="number" 
            min="1" 
            value={winnersCount} 
            onChange={e => setWinnersCount(parseInt(e.target.value) || 1)} 
            className="input-field py-4 font-bold text-center"
           />
        </div>
        <button 
          className={`btn-primary md:col-span-2 py-4 text-xl font-black shadow-2xl transition-all uppercase tracking-widest ${isRolling ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'}`}
          onClick={roll} 
          disabled={isRolling || !names.trim()}
        >
          {isRolling ? "Kura Çekiliyor..." : "ÇEKİLİŞİ BAŞLAT"}
        </button>
      </div>

      {isRolling && (
        <div className="result-container-premium animate-pulse">
           <div className="result-card-premium !bg-accent-glow border-accent-primary/30 flex items-center justify-center py-24 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="text-5xl md:text-7xl font-black text-accent-secondary italic tracking-tighter uppercase drop-shadow-lg">
                {currentName}
              </div>
           </div>
        </div>
      )}

      {winners.length > 0 && !isRolling && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 border-accent-primary/20 bg-surface/50">
              <div className="result-badge !bg-green-500/10 !text-green-500 !border-green-500/20">Tebrikler! Kazananlar Belirlendi</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {winners.map((w, i) => (
                  <div key={i} className="group relative animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                     <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                     <div className="relative bg-surface p-6 rounded-2xl border border-border border-b-4 border-b-accent-primary">
                        <span className="text-xs font-black text-muted uppercase block mb-1">KAZANAN #{i+1}</span>
                        <span className="text-xl font-black text-primary italic truncate block">{w}</span>
                     </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-border flex justify-between items-center text-xs font-bold text-muted uppercase tracking-widest px-2">
                 <span>Toplam Katılımcı: {names.split("\n").filter(n => n.trim()).length}</span>
                 <span>Güvenli Kura √</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
