"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Calendar, Moon, Star, Sparkles, Droplets } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

// Adet/Ovulasyon Takibi (Period Tracker)
export function PeriodCalculator() {
  const [sonTarih, setSonTarih] = useState("");
  const [dongu, setDongu] = useState("28");
  const [kanama, setKanama] = useState("5");
  const [result, setResult] = useState<null | { next: string; ovulasyon: string; dogurganBas: string; dogurganBit: string; adetBit: string }>(null);

  const hesapla = () => {
    if (!sonTarih) return;
    const d1 = new Date(sonTarih);
    const donguGun = parseInt(dongu) || 28;
    const kanamaGun = parseInt(kanama) || 5;

    const nextDate = new Date(d1);
    nextDate.setDate(d1.getDate() + donguGun);

    const bitisDate = new Date(d1);
    bitisDate.setDate(d1.getDate() + kanamaGun);

    const ovulasyonDate = new Date(nextDate);
    ovulasyonDate.setDate(nextDate.getDate() - 14);

    const dogBas = new Date(ovulasyonDate);
    dogBas.setDate(ovulasyonDate.getDate() - 5);
    const dogBit = new Date(ovulasyonDate);
    dogBit.setDate(ovulasyonDate.getDate() + 1);

    const fmt = (d: Date) => d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" });

    setResult({
      next: fmt(nextDate),
      adetBit: fmt(bitisDate),
      ovulasyon: fmt(ovulasyonDate),
      dogurganBas: fmt(dogBas),
      dogurganBit: fmt(dogBit),
    });
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  const reset = () => { setSonTarih(""); setDongu("28"); setKanama("5"); setResult(null); };

  return (
    <V2CalculatorWrapper
       title="ADET VE YUMURTLAMA TAKVİMİ"
       icon="🩸"
       infoText="Son adet tarihinize göre sonraki adet döneminizi ve en yüksek doğurganlık günlerinizi hesaplar."
       results={result && (
         <div className="space-y-6">
           <V2ResultCard
             color="red"
             label="SONRAKİ ADET BAŞLANGICI"
             value={result.next}
             icon="🩸"
           />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">YUMURTLAMA GÜNÜ</div>
                    <div className="text-sm font-black text-primary italic">{result.ovulasyon}</div>
                 </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Droplets className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">ADET BİTİŞİ</div>
                    <div className="text-sm font-black text-primary italic">{result.adetBit}</div>
                 </div>
              </div>
           </div>
           <div className="p-8 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-[0.2em]">YÜKSEK DOĞURGANLIK DÖNEMİ</div>
              <div className="text-xl font-black text-amber-500 italic">{result.dogurganBas.split(" ")[0]} - {result.dogurganBit}</div>
           </div>
         </div>
       )}
    >
      <div className="space-y-6">
        <V2Input label="SON ADET BAŞLANGICI" type="date" value={sonTarih} onChange={setSonTarih} />
        <div className="grid grid-cols-2 gap-4">
          <V2Input label="DÖNGÜ SÜRESİ" value={dongu} onChange={setDongu} unit="GÜN" placeholder="28" />
          <V2Input label="KANAMA SÜRESİ" value={kanama} onChange={setKanama} unit="GÜN" placeholder="5" />
        </div>
      </div>
      <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="🗓️ Takvimi Hesapla" />
    </V2CalculatorWrapper>
  );
}

// Burç Hesaplama
export function ZodiacCalculator() {
  const [gun, setGun] = useState("");
  const [ay, setAy] = useState("");
  const [result, setResult] = useState<null | { burc: string; element: string; yonetici: string; icon: string }>(null);

  const hesapla = () => {
    const d = parseInt(gun);
    const m = parseInt(ay);
    if (!d || !m || d < 1 || d > 31 || m < 1 || m > 12) return;

    let burc = ""; let element = ""; let yonetici = ""; let icon = "";

    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) { burc = "Koç"; element = "Ateş"; yonetici = "Mars"; icon = "♈"; }
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) { burc = "Boğa"; element = "Toprak"; yonetici = "Venüs"; icon = "♉"; }
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) { burc = "İkizler"; element = "Hava"; yonetici = "Merkür"; icon = "♊"; }
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) { burc = "Yengeç"; element = "Su"; yonetici = "Ay"; icon = "♋"; }
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) { burc = "Aslan"; element = "Ateş"; yonetici = "Güneş"; icon = "♌"; }
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) { burc = "Başak"; element = "Toprak"; yonetici = "Merkür"; icon = "♍"; }
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) { burc = "Terazi"; element = "Hava"; yonetici = "Venüs"; icon = "♎"; }
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) { burc = "Akrep"; element = "Su"; yonetici = "Plüton/Mars"; icon = "♏"; }
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) { burc = "Yay"; element = "Ateş"; yonetici = "Jüpiter"; icon = "♐"; }
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) { burc = "Oğlak"; element = "Toprak"; yonetici = "Satürn"; icon = "♑"; }
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) { burc = "Kova"; element = "Hava"; yonetici = "Uranüs/Satürn"; icon = "♒"; }
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) { burc = "Balık"; element = "Su"; yonetici = "Neptün/Jüpiter"; icon = "♓"; }

    setResult({ burc, element, yonetici, icon });
    confetti({ particleCount: 50, spread: 80, origin: { y: 0.7 } });
  };

  const reset = () => { setGun(""); setAy(""); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="BURÇ HESAPLAYICI"
      icon="✨"
      infoText="Doğum tarihinize göre güneş burcunuzu, grubunuzu ve yönetici gezegeninizi bulur."
      results={result && (
        <div className="space-y-8">
           <div className="glass-morphism p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-8xl mb-4 animate-float drop-shadow-2xl">{result.icon}</div>
              <h3 className="text-5xl font-black italic text-primary tracking-tighter mb-6 underline decoration-blue-500/30 underline-offset-8">{result.burc.toUpperCase()}</h3>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">GRUP / ELEMENT</div>
                    <div className="text-lg font-black text-primary italic">{result.element}</div>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">YÖNETİCİ GEZEGEN</div>
                    <div className="text-lg font-black text-primary italic">{result.yonetici}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <V2Select label="DOĞUM GÜNÜ" value={gun} onChange={setGun}>
          <option value="" className="bg-slate-900">Gün Seçin</option>
          {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1} className="bg-slate-900">{i+1}</option>)}
        </V2Select>
        <V2Select label="DOĞUM AYI" value={ay} onChange={setAy}>
          <option value="" className="bg-slate-900">Ay Seçin</option>
          {["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"].map((m, i) => (
            <option key={i+1} value={i+1} className="bg-slate-900">{m}</option>
          ))}
        </V2Select>
      </div>
      <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="✨ Burcumu Bul" />
    </V2CalculatorWrapper>
  );
}
