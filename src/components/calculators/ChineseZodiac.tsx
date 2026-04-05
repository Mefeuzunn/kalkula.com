import React, { useState } from "react";
import confetti from "canvas-confetti";

export function ChineseZodiac() {
  const [yil, setYil] = useState("");
  const [result, setResult] = useState<{ name: string; icon: string; traits: string; element: string; color: string } | null>(null);

  const animals = [
    { name: "Maymun", icon: "🐒", element: "Metal", color: "#94a3b8", traits: "Esprili, zeki ve problem çözücü bir yapıya sahipsiniz." },
    { name: "Horoz", icon: "🐓", element: "Metal", color: "#fcd34d", traits: "Dakik, dürüst ve yetenekli bir gözlemcisiniz." },
    { name: "Köpek", icon: "🐕", element: "Toprak", color: "#b45309", traits: "Sadık, vefalı ve adalet duygusu güçlü bir karakteriniz var." },
    { name: "Domuz", icon: "🐖", element: "Su", color: "#f472b6", traits: "Cömert, hoşgörülü ve lüksü seven bir doğanız var." },
    { name: "Fare", icon: "🐁", element: "Su", color: "#6b7280", traits: "Pratik zekalı, hırslı ve sosyal çevrede popülersiniz." },
    { name: "Öküz", icon: "🐂", element: "Toprak", color: "#78350f", traits: "Sabırlı, çalışkan ve güvenilir bir lidersiniz." },
    { name: "Kaplan", icon: "🐅", element: "Odun", color: "#ea580c", traits: "Cesur, enerjik ve rekabetçi bir ruhunuz var." },
    { name: "Tavşan", icon: "🐇", element: "Odun", color: "#34d399", traits: "Zarif, nazik ve çatışmadan kaçınan birisiniz." },
    { name: "Ejderha", icon: "🐉", element: "Toprak", color: "#ef4444", traits: "Güçlü, kendinden emin ve şanslı bir lidersiniz." },
    { name: "Yılan", icon: "🐍", element: "Ateş", color: "#059669", traits: "Bilge, gizemli ve sezgisel bir zekaya sahipsiniz." },
    { name: "At", icon: "🐎", element: "Ateş", color: "#b91c1c", traits: "Özgür ruhlu, enerjik ve bağımsızlık düşkünü birisiniz." },
    { name: "Keçi", icon: "🐐", element: "Toprak", color: "#d1d5db", traits: "Yaratıcı, sanatçı ruhlu ve merhametli bir kalbiniz var." }
  ];

  const hesapla = () => {
    const y = parseInt(yil);
    if (isNaN(y)) return;
    const idx = y % 12;
    setResult(animals[idx]);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: [animals[idx].color, "#ffffff"] });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
         <label className="text-xs font-black text-muted uppercase tracking-widest px-2 italic text-center">Doğum Yılı</label>
         <input 
            type="number" 
            placeholder="1990" 
            value={yil} 
            onChange={e => setYil(e.target.value)} 
            className="input-field text-center py-6 text-3xl font-black border-2 focus:border-accent-primary max-w-sm mx-auto w-full"
         />
      </div>
      
      <button className="btn-primary py-4 text-xl font-bold rounded-2xl mx-auto px-16 shadow-xl" onClick={hesapla}>Burcumu Keşfet</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 border-border bg-gradient-to-b from-surface to-secondary/10 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 text-[180px] opacity-10 rotate-12 pointer-events-none select-none italic font-black">{result.icon}</div>
              
              <div className="result-badge !bg-secondary/10 !text-muted !border-border">Çin Astrolojisi</div>
              
              <div className="text-8xl mb-4 animate-bounce-slow mt-4">{result.icon}</div>
              <div className="text-5xl font-black italic tracking-tighter" style={{ color: result.color }}>{result.name}</div>
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-8">{result.element} Elementi</div>
              
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-border shadow-inner text-left">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-2 tracking-widest">Karakteristik Özellikler</div>
                    <p className="text-sm font-medium leading-relaxed italic text-primary/80">
                       "{result.traits}"
                    </p>
                 </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                 <span className="px-3 py-1 bg-secondary/10 rounded-full text-[9px] font-bold text-muted uppercase">Ay Takvimi</span>
                 <span className="px-3 py-1 bg-secondary/10 rounded-full text-[9px] font-bold text-muted uppercase">12 Yıllık Döngü</span>
              </div>
           </div>
        </div>
      )}

      <div className="mt-4 p-5 bg-secondary/5 rounded-2xl border border-border/10 text-xs text-muted leading-relaxed text-center italic">
        💡 Çin Astrolojisi, Ay Takvimine dayanır ve 12 farklı hayvan figürüyle temsil edilen yıllık dönemleri baz alır. 
        Her burç beş temel elementle (Odun, Ateş, Toprak, Metal, Su) etkileşime girer.
      </div>
    </div>
  );
}
