"use client";

import { useState, useEffect } from "react";
import { ShareResultButton } from "../ShareResultButton";
import confetti from "canvas-confetti";

/**
 * Profesyonel Çekiliş Yapıcı
 */
export function RaffleMaker() {
  const [names, setNames] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const roll = () => {
    const list = names.split("\n").map(n => n.trim()).filter(n => n.length > 0);
    if (list.length < winnersCount || list.length === 0) return;
    
    setIsRolling(true);
    setWinners([]);
    
    let counter = 0;
    const interval = setInterval(() => {
       const randomIdx = Math.floor(Math.random() * list.length);
       setCurrentName(list[randomIdx]);
       counter++;
       
       if(counter > 30) {
          clearInterval(interval);
          setIsRolling(false);
          
          // Gerçek kazananları seç (karıştır ve ilk n kişiyi al)
          const shuffled = [...list].sort(() => 0.5 - Math.random());
          const finalWinners = shuffled.slice(0, winnersCount);
          setWinners(finalWinners);

          // WOW Efekti: Konfeti Patlat
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3b82f6", "#8b5cf6", "#ec4899"]
          });
       }
    }, 80);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-muted uppercase tracking-tighter">Katılımcı Listesi</label>
        <textarea 
          placeholder="Ahmet&#10;Mehmet&#10;Ayşe..." 
          value={names} 
          onChange={e => setNames(e.target.value)} 
          className="input-field p-6 min-h-[200px] text-lg leading-relaxed shadow-inner"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
           <label className="text-xs font-bold text-muted mb-2 block uppercase">Kazanan Sayısı</label>
           <input 
            type="number" 
            min="1" 
            value={winnersCount} 
            onChange={e => setWinnersCount(parseInt(e.target.value) || 1)} 
            className="input-field"
           />
        </div>
        <button 
          className={`btn-primary flex-[2] w-full py-4 text-lg font-bold shadow-2xl transition-all ${isRolling ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'}`}
          onClick={roll} 
          disabled={isRolling || !names.trim()}
        >
          {isRolling ? "Kura Çekiliyor..." : "ÇEKİLİŞİ BAŞLAT"}
        </button>
      </div>

      {isRolling && (
        <div className="panel flex items-center justify-center py-20 bg-accent-glow animate-pulse border-accent-secondary/30">
           <div className="text-5xl md:text-7xl font-black text-accent-secondary italic tracking-tighter uppercase">
             {currentName}
           </div>
        </div>
      )}

      {winners.length > 0 && !isRolling && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
             <div className="result-badge">Tebrikler Kazananlar</div>
             <div className="flex flex-wrap justify-center gap-6 mt-2">
               {winners.map((w, i) => (
                 <div key={i} className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-surface px-10 py-6 rounded-2xl border border-border">
                       <span className="result-value-premium block">{w}</span>
                    </div>
                 </div>
               ))}
             </div>
             
             <div className="result-footer-premium">
               <ShareResultButton resultText={"Kalküla Çekilişi Kazananları: " + winners.join(", ")} />
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

/**
 * Modern Rastgele Sayı Üretici & Zar
 */
export function RandomNumberGen() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const generate = () => {
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * (max - min + 1)) + min);
      count++;
      if (count > 20) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(final);
        setIsRolling(false);
        
        // Küçük bir konfeti patlatması
        confetti({ particleCount: 50, spread: 40, origin: { y: 0.7 } });
      }
    }, 50);
  };

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase">Minimum</label>
          <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)} className="input-field text-center text-xl font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase">Maximum</label>
          <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)} className="input-field text-center text-xl font-bold" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className={`w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-secondary/50 to-secondary flex items-center justify-center border-4 border-border shadow-2xl transition-all duration-500 ${isRolling ? 'rotate-12 scale-110 border-accent-primary' : ''}`}>
           <span className={`text-7xl font-black ${isRolling ? 'text-accent-primary opacity-50' : 'text-primary'}`}>
             {result ?? "?"}
           </span>
        </div>

        <button 
          onClick={generate} 
          disabled={isRolling}
          className="btn-primary px-12 py-4 text-lg font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
        >
          {isRolling ? "Dönüyor..." : "SAYI ÜRET"}
        </button>
      </div>
    </div>
  );
}

/**
 * Mevcut diğer araçlar (AÖF, TUS vb.)
 */
export function AofCalculator() {
  const [vize, setVize] = useState("");
  const [final, setFinal] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const v = parseFloat(vize);
    const f = parseFloat(final);
    if(isNaN(v) || isNaN(f)) return;
    const ortalama = (v * 0.3) + (f * 0.7);
    let harf = ""; let durum = ""; let color = "";
    if (f < 35) { harf = "FF"; durum = "Kaldı (Final Barajı)"; color = "#ef4444"; }
    else if (ortalama < 35) { harf = "FF"; durum = "Kaldı"; color = "#ef4444"; }
    else if (ortalama >= 84) { harf = "AA"; durum = "Geçti (Başarılı)"; color = "#10b981"; }
    else if (ortalama >= 77) { harf = "AB"; durum = "Geçti"; color = "#10b981"; }
    else if (ortalama >= 71) { harf = "BA"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 56) { harf = "BB"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 50) { harf = "CC"; durum = "Geçti"; color = "#8b5cf6"; }
    else { harf = "DC"; durum = "Koşullu Geçti"; color = "#f59e0b"; }
    setResult({ ortalama, harf, durum, color });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Vize Notu (%30)</label>
            <input type="number" placeholder="0-100" value={vize} onChange={e => setVize(e.target.value)} className="input-field" />
         </div>
         <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Final Notu (%70)</label>
            <input type="number" placeholder="0-100" value={final} onChange={e => setFinal(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary w-full py-4" onClick={hesapla}>Hesapla</button>
      {result && (
         <div className="panel text-center border-t-4" style={{ borderColor: result.color }}>
            <div className="text-4xl font-black mb-2">{result.ortalama.toFixed(2)}</div>
            <div className="text-xl font-bold" style={{ color: result.color }}>{result.harf} - {result.durum}</div>
         </div>
      )}
    </div>
  );
}

export function TusDusCalculator() {
  const [tt1, setTt1] = useState("");
  const [tk, setTk] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const t1 = parseFloat(tt1); const k = parseFloat(tk);
    if(isNaN(t1) || isNaN(k)) return;
    const pKlinik = 40 + (k * 0.45) + (t1 * 0.25);
    const pTemel = 40 + (t1 * 0.45) + (k * 0.25);
    setResult({ klinik: pKlinik.toFixed(2), temel: pTemel.toFixed(2) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
         <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Temel Tıp Neti</label>
            <input type="number" value={tt1} onChange={e => setTt1(e.target.value)} className="input-field" />
         </div>
         <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Klinik Tıp Neti</label>
            <input type="number" value={tk} onChange={e => setTk(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary py-4" onClick={hesapla}>Puan Hesapla</button>
      {result && (
         <div className="grid grid-cols-2 gap-4">
            <div className="panel text-center bg-accent-primary/5">
               <div className="text-xs text-muted mb-1">Klinik</div>
               <div className="text-2xl font-black text-accent-primary">{result.klinik}</div>
            </div>
            <div className="panel text-center bg-accent-secondary/5">
               <div className="text-xs text-muted mb-1">Temel</div>
               <div className="text-2xl font-black text-accent-secondary">{result.temel}</div>
            </div>
         </div>
      )}
    </div>
  );
}

export function ChineseZodiac() {
  const [yil, setYil] = useState("");
  const [result, setResult] = useState<any>(null);
  const animals = ["Maymun", "Horoz", "Köpek", "Domuz", "Fare", "Öküz", "Kaplan", "Tavşan", "Ejderha", "Yılan", "At", "Keçi"];
  const icons = ["🐒", "🐓", "🐕", "🐖", "🐁", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐"];

  const hesapla = () => {
    const y = parseInt(yil);
    if(isNaN(y)) return;
    const idx = y % 12;
    setResult({ name: animals[idx], icon: icons[idx] });
  };

  return (
    <div className="flex flex-col gap-6">
      <input type="number" placeholder="Doğum Yılınızı Girin" value={yil} onChange={e => setYil(e.target.value)} className="input-field text-center py-4 text-xl" />
      <button className="btn-primary py-4" onClick={hesapla}>Burcumu Bul</button>
      {result && (
        <div className="panel text-center py-10 bg-surface">
           <div className="text-7xl mb-4">{result.icon}</div>
           <div className="text-3xl font-black text-accent-primary">{result.name}</div>
        </div>
      )}
    </div>
  );
}

export function AscendantCalculator() {
  const [burc, setBurc] = useState("Koc");
  const [saat, setSaat] = useState("06:00");
  const [result, setResult] = useState<string | null>(null);

  const hesapla = () => {
    const [h] = saat.split(":").map(Number);
    const burclar = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
    const baseIndex = ["Koc","Boga","Ikizler","Yengec","Aslan","Basak","Terazi","Akrep","Yay","Oglak","Kova","Balik"].indexOf(burc);
    let offset = Math.floor((h - 6) / 2);
    let finalIdx = (baseIndex + offset) % 12;
    if (finalIdx < 0) finalIdx += 12;
    setResult(burclar[finalIdx]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <select value={burc} onChange={e => setBurc(e.target.value)} className="input-field h-[56px]">
            <option value="Koc">Koç</option><option value="Boga">Boğa</option>
            <option value="Ikizler">İkizler</option><option value="Yengec">Yengeç</option>
            <option value="Aslan">Aslan</option><option value="Basak">Başak</option>
            <option value="Terazi">Terazi</option><option value="Akrep">Akrep</option>
            <option value="Yay">Yay</option><option value="Oglak">Oğlak</option>
            <option value="Kova">Kova</option><option value="Balik">Balık</option>
         </select>
         <input type="time" value={saat} onChange={e => setSaat(e.target.value)} className="input-field h-[56px]" />
      </div>
      <button className="btn-primary py-4" onClick={hesapla}>Yükselen Bul</button>
      {result && (
        <div className="panel text-center bg-gradient-to-r from-purple-900 to-blue-900 border-0 p-10 text-white">
           <div className="text-sm opacity-70 mb-2 uppercase tracking-widest">Yükselen Burcunuz</div>
           <div className="text-5xl font-black tracking-tighter">{result}</div>
        </div>
      )}
    </div>
  );
}
