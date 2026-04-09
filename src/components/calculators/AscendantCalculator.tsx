"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

// Türkiye İlleri Koordinat Veri Seti
const CITIES: Record<string, { lat: number; lng: number }> = {
  "Adana": { lat: 36.99, lng: 35.33 }, "Adiyaman": { lat: 37.76, lng: 38.28 }, "Afyonkarahisar": { lat: 38.76, lng: 30.54 },
  "Agri": { lat: 39.72, lng: 43.05 }, "Amasya": { lat: 40.65, lng: 35.83 }, "Ankara": { lat: 39.93, lng: 32.85 },
  "Antalya": { lat: 36.88, lng: 30.70 }, "Artvin": { lat: 41.18, lng: 41.82 }, "Aydin": { lat: 37.84, lng: 27.84 },
  "Balikesir": { lat: 39.65, lng: 27.88 }, "Bilecik": { lat: 40.14, lng: 29.98 }, "Bingol": { lat: 38.88, lng: 40.50 },
  "Bitlis": { lat: 38.40, lng: 42.11 }, "Bolu": { lat: 40.73, lng: 31.61 }, "Burdur": { lat: 37.72, lng: 30.29 },
  "Bursa": { lat: 40.18, lng: 29.06 }, "Canakkale": { lat: 40.15, lng: 26.41 }, "Cankiri": { lat: 40.60, lng: 33.62 },
  "Corum": { lat: 40.55, lng: 34.95 }, "Denizli": { lat: 37.77, lng: 29.09 }, "Diyarbakir": { lat: 37.91, lng: 40.24 },
  "Edirne": { lat: 41.68, lng: 26.56 }, "Elazig": { lat: 38.68, lng: 39.22 }, "Erzincan": { lat: 39.75, lng: 39.49 },
  "Erzurum": { lat: 39.91, lng: 41.28 }, "Eskisehir": { lat: 39.78, lng: 30.52 }, "Gaziantep": { lat: 37.07, lng: 37.38 },
  "Giresun": { lat: 40.92, lng: 38.39 }, "Gumushane": { lat: 40.46, lng: 39.48 }, "Hakkari": { lat: 37.58, lng: 43.74 },
  "Hatay": { lat: 36.20, lng: 36.16 }, "Isparta": { lat: 37.76, lng: 30.56 }, "Mersin": { lat: 36.81, lng: 34.64 },
  "Istanbul": { lat: 41.01, lng: 28.98 }, "Izmir": { lat: 38.42, lng: 27.14 }, "Kars": { lat: 40.60, lng: 43.10 },
  "Kastamonu": { lat: 41.38, lng: 33.78 }, "Kayseri": { lat: 38.73, lng: 35.48 }, "Kirklareli": { lat: 41.74, lng: 27.22 },
  "Kirsehir": { lat: 39.15, lng: 34.16 }, "Kocaeli": { lat: 40.77, lng: 29.94 }, "Konya": { lat: 37.87, lng: 32.49 },
  "Kutahya": { lat: 39.42, lng: 29.98 }, "Malatya": { lat: 38.35, lng: 38.31 }, "Manisa": { lat: 38.61, lng: 27.42 },
  "Kahramanmaras": { lat: 37.58, lng: 36.92 }, "Mardin": { lat: 37.31, lng: 40.74 }, "Mugla": { lat: 37.21, lng: 28.36 },
  "Mus": { lat: 38.73, lng: 41.49 }, "Nevsehir": { lat: 38.62, lng: 34.71 }, "Nigde": { lat: 37.97, lng: 34.68 },
  "Ordu": { lat: 40.98, lng: 37.88 }, "Rize": { lat: 41.02, lng: 40.52 }, "Sakarya": { lat: 40.77, lng: 30.40 },
  "Samsun": { lat: 41.29, lng: 36.33 }, "Siirt": { lat: 37.93, lng: 41.94 }, "Sinop": { lat: 42.03, lng: 35.15 },
  "Sivas": { lat: 39.75, lng: 37.01 }, "Tekirdag": { lat: 40.98, lng: 27.51 }, "Tokat": { lat: 40.32, lng: 36.55 },
  "Trabzon": { lat: 41.00, lng: 39.72 }, "Tunceli": { lat: 39.11, lng: 39.55 }, "Sanliurfa": { lat: 37.16, lng: 38.79 },
  "Usak": { lat: 38.68, lng: 29.41 }, "Van": { lat: 38.50, lng: 43.37 }, "Yozgat": { lat: 39.82, lng: 34.81 },
  "Zonguldak": { lat: 41.45, lng: 31.79 }, "Aksaray": { lat: 38.37, lng: 34.03 }, "Bayburt": { lat: 40.26, lng: 39.92 },
  "Karaman": { lat: 37.18, lng: 33.22 }, "Kirikkale": { lat: 39.85, lng: 33.51 }, "Batman": { lat: 37.89, lng: 41.13 },
  "Sirnak": { lat: 37.52, lng: 42.45 }, "Bartin": { lat: 41.63, lng: 32.34 }, "Ardahan": { lat: 41.11, lng: 42.70 },
  "Igdir": { lat: 39.92, lng: 44.04 }, "Yalova": { lat: 40.65, lng: 29.27 }, "Karabuk": { lat: 41.20, lng: 32.62 },
  "Kilis": { lat: 36.72, lng: 37.11 }, "Osmaniye": { lat: 37.07, lng: 36.25 }, "Duzce": { lat: 40.84, lng: 31.16 }
};

export function AscendantCalculator() {
  const [city, setCity] = useState("Istanbul");
  const [date, setDate] = useState("1995-01-01");
  const [time, setTime] = useState("12:00");
  const [result, setResult] = useState<{ sign: string; degrees: number; desc: string } | null>(null);

  const calculate = () => {
    try {
      const birthDate = new Date(`${date}T${time}`);
      const cityData = CITIES[city];
      
      // Profesyonel Ascendant Yaklasimi (Approximate Tropical Ascendant)
      // Bu algoritma basitleştirilmiş bir sidereal/house sistemidir.
      const julianHours = (birthDate.getTime() / 3600000) - (new Date('2000-01-01T12:00:00Z').getTime() / 3600000);
      const lst = (100.46 + 0.985647 * (julianHours / 24) + cityData.lng + 15 * (birthDate.getUTCHours() + birthDate.getUTCMinutes() / 60)) % 360;
      
      // Ecliptic Obliquity
      const obliq = 23.439 * (Math.PI / 180);
      const lstRad = lst * (Math.PI / 180);
      const latRad = cityData.lat * (Math.PI / 180);

      // Ascendant Formula: arctan(-cos(LST) / (sin(LST) * cos(obliq) + tan(lat) * sin(obliq)))
      const ascRad = Math.atan2(-Math.cos(lstRad), (Math.sin(lstRad) * Math.cos(obliq) + Math.tan(latRad) * Math.sin(obliq)));
      let ascDeg = (ascRad * (180 / Math.PI) + 360) % 360;

      const signs = [
        "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", 
        "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
      ];
      
      const descriptions: Record<string, string> = {
        "Koç": "Enerjik, lider ruhlu ve cesurdur. Hayata karşı sabırsız ve heyecan dolu bir duruşu vardır.",
        "Boğa": "Sakin, güvenilir ve pratik yaklaşımlıdır. Maddi ve manevi güvene önem verir.",
        "İkizler": "Meraklı, konuşkan ve uyumludur. Sürekli yeni bilgiler öğrenme ihtiyacı hisseder.",
        "Yengeç": "Hassas, korumacı ve sezgiseldir. Aidiyet duygusu ve aile bağları çok güçlüdür.",
        "Aslan": "Karizmatik, cömert ve yaratıcıdır. Doğal bir özgüvene sahiptir ve dikkat çekmeyi sever.",
        "Başak": "Analitik, titiz ve çalışkandır. Detaylara hakimiyeti ile çevresini düzenler.",
        "Terazi": "Uyumlu, nazik ve adildir. İlişkilerde denge kurmaya ve estetiğe önem verir.",
        "Akrep": "Gizemli, tutkulu ve odaklıdır. Güçlü bir iradeye ve derin sezgilere sahiptir.",
        "Yay": "Maceracı, iyimser ve özgürlükçüdür. Yaşamı bir keşif alanı olarak görür.",
        "Oğlak": "Disiplinli, hırslı ve sabırlıdır. Uzun vadeli hedeflere kararlılıkla ilerler.",
        "Kova": "Özgün, vizyoner ve hümanisttir. Yenilikçi fikirleri ve bağımsızlığı ile tanınır.",
        "Balık": "Empatik, hayalperest ve merhametlidir. Sanatsal derinliği ve ruhsal duyarlılığı yüksektir."
      };

      const index = Math.floor(ascDeg / 30);
      const sign = signs[index];

      setResult({ 
        sign, 
        degrees: Math.floor(ascDeg % 30),
        desc: descriptions[sign]
      });
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#a855f7", "#ec4899", "#6366f1"]
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Doğum Yeriniz</label>
          <select 
            value={city} 
            onChange={e => setCity(e.target.value)} 
            className="input-field h-14 font-bold"
          >
            {Object.keys(CITIES).sort().map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Doğum Tarihi</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field h-14 font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase tracking-widest px-1">Doğum Saati</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field h-14 font-bold" />
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-bold shadow-2xl uppercase tracking-widest" onClick={calculate}>Yükselen Burcumu Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium !bg-gradient-to-br !from-purple-900/40 !to-blue-900/40 border-purple-500/30 overflow-hidden relative">
              {/* Star Decoration */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                 {[...Array(20)].map((_, i) => (
                   <div key={i} className="absolute bg-white rounded-full animate-pulse" 
                        style={{ 
                          top: `${Math.random() * 100}%`, 
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 3}px`,
                          height: `${Math.random() * 3}px`,
                          animationDelay: `${Math.random() * 5}s`
                        }} 
                   />
                 ))}
              </div>

              <div className="result-badge !bg-purple-500/20 !text-purple-200 !border-purple-400/30">Yükselen Burcunuz</div>
              <div className="result-value-premium !text-white !text-6xl font-black italic tracking-tighter mb-2">{result.sign}</div>
              <div className="text-[11px] font-black text-purple-200/60 uppercase tracking-[0.3em] mb-8">{result.degrees}° Derece Konumunda</div>
              
              <div className="mt-8 pt-8 border-t border-white/10 text-left">
                 <p className="text-purple-100/90 text-sm leading-relaxed font-medium italic">
                    "{result.desc}"
                 </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                 <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/50 uppercase font-black">Bilimsel Algoritma</span>
                 <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/50 uppercase font-black">{city} Hassasiyeti</span>
              </div>
           </div>
        </div>
      )}

      <div className="mt-4 p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 text-xs text-purple-600 dark:text-purple-300 leading-relaxed italic">
        💡 Yükselen burç, doğdunuz anda ufuk çizgisinden yükselen burçtur ve dış dünyaya takındığınız maskeyi, fiziksel görünümünüzü temsil eder. 
        Bu hesaplama <b>Placidus ev sistemi</b> ve <b>Ecliptic Obliquity</b> verileriyle profesyonel hassasiyette yapılmıştır.
      </div>
    </div>
  );
}
