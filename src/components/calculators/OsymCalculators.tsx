"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Target, Calculator, Star, BookOpen, GraduationCap, Award, Languages } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

// KPSS Puan Hesaplama
export function KpssCalculator() {
  const [gyNet, setGyNet] = useState("");
  const [gkNet, setGkNet] = useState("");
  const [egitimNet, setEgitimNet] = useState("");
  const [tur, setTur] = useState("lisans");
  const [result, setResult] = useState<null | { p3: number; p10?: number }>(null);

  const calculate = () => {
    const gy = parseFloat(gyNet) || 0;
    const gk = parseFloat(gkNet) || 0;
    const p3 = 50 + (gy * 0.45) + (gk * 0.45);
    
    let res: any = { p3 };
    if (tur === "egitim") {
      const eg = parseFloat(egitimNet) || 0;
      res.p10 = 40 + (gy * 0.25) + (gk * 0.25) + (eg * 0.35);
    }
    setResult(res);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setGyNet("");
    setGkNet("");
    setEgitimNet("");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="KPSS PUAN HESAPLA"
      icon="🏛️"
      infoText="Lisans, Ön Lisans ve Ortaöğretim düzeyinde tahmini KPSS P3 ve P10 puanlarınızı hesaplayın."
      results={result && (
        <div className="space-y-6">
          <div className={`grid grid-cols-1 ${result.p10 ? 'md:grid-cols-2' : ''} gap-4`}>
             <V2ResultCard
               color="blue"
               label="TAHMİNİ P3 PUANI"
               value={result.p3.toFixed(3)}
               subLabel="Genel Yetenek & Kültür"
               icon="📊"
             />
             {result.p10 && (
               <V2ResultCard
                 color="purple"
                 label="TAHMİNİ P10 PUANI"
                 value={result.p10.toFixed(3)}
                 subLabel="Eğitim Bilimleri"
                 icon="🎓"
               />
             )}
          </div>
          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama geçmiş yılların standart sapmaları baz alınarak yapılmıştır. Gerçek sonuçlar ÖSYM verilerine göre farklılık gösterebilir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <V2Select 
          label="SINAV TÜRÜ" 
          value={tur} 
          onChange={setTur} 
          options={[
            { value: "lisans", label: "Lisans / Ön Lisans / Ortaöğretim (B Grubu)" },
            { value: "egitim", label: "Eğitim Bilimleri (A Grubu P10)" }
          ]}
          fieldClassName="font-bold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="GENEL YETENEK NETİ" value={gyNet} onChange={setGyNet} unit="NET" placeholder="45" max="60" />
           <V2Input label="GENEL KÜLTÜR NETİ" value={gkNet} onChange={setGkNet} unit="NET" placeholder="50" max="60" />
        </div>

        {tur === "egitim" && (
           <V2Input label="EĞİTİM BİLİMLERİ NETİ" value={egitimNet} onChange={setEgitimNet} unit="NET" placeholder="65" max="80" fieldClassName="!bg-purple-500/5 !text-purple-500 !border-purple-500/10" />
        )}

        <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="📉 KPSS Puanı Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}

// ALES Hesaplama
export function AlesCalculator() {
  const [sayNet, setSayNet] = useState("");
  const [sozNet, setSozNet] = useState("");
  const [result, setResult] = useState<null | { say: number; soz: number; ea: number }>(null);

  const calculate = () => {
    const say = parseFloat(sayNet) || 0;
    const soz = parseFloat(sozNet) || 0;
    const pSay = 50 + (say * 0.75) + (soz * 0.25);
    const pSoz = 50 + (soz * 0.75) + (say * 0.25);
    const pEa = 50 + (say * 0.5) + (soz * 0.5);
    
    setResult({
      say: Math.min(100, Math.max(50, pSay)),
      soz: Math.min(100, Math.max(50, pSoz)),
      ea: Math.min(100, Math.max(50, pEa))
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
     setSayNet("");
     setSozNet("");
     setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="ALES PUAN HESAPLA"
      icon="📐"
      infoText="Lisansüstü eğitim başvurularınız için ALES Sayısal, Sözel ve Eşit Ağırlık puanlarınızı anında tahmin edin."
      results={result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <V2ResultCard color="blue" label="ALES SAYISAL" value={result.say.toFixed(3)} subLabel="SAY Puanı" icon="➗" />
             <V2ResultCard color="red" label="ALES SÖZEL" value={result.soz.toFixed(3)} subLabel="SÖZ Puanı" icon="📝" />
             <V2ResultCard color="amber" label="ALES EŞİT AĞ." value={result.ea.toFixed(3)} subLabel="EA Puanı" icon="⚖️" />
          </div>
          <p className="text-[10px] text-muted text-center italic">
            * 50 soru üzerinden hesaplanmıştır. Standart sapmalar ±2 puan etkileyebilir.
          </p>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="SAYISAL NETİ" value={sayNet} onChange={setSayNet} unit="NET" placeholder="Maks: 50" max="50" fieldClassName="!bg-blue-500/5 !text-blue-500 !border-blue-500/10" />
           <V2Input label="SÖZEL NETİ" value={sozNet} onChange={setSozNet} unit="NET" placeholder="Maks: 50" max="50" fieldClassName="!bg-red-500/5 !text-red-500 !border-red-500/10" />
        </div>
        <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="📉 ALES Puanı Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}

// DGS Hesaplama
export function DgsCalculator() {
  const [sayNet, setSayNet] = useState("");
  const [sozNet, setSozNet] = useState("");
  const [obp, setObp] = useState("");
  const [result, setResult] = useState<null | { say: number; soz: number; ea: number }>(null);

  const calculate = () => {
    const sayN = parseFloat(sayNet) || 0;
    const sozN = parseFloat(sozNet) || 0;
    const o = parseFloat(obp) || 50;
    const obpPuan = o * 0.6;
    const pSay = 130 + (sayN * 3.1) + (sozN * 0.4) + obpPuan;
    const pSoz = 130 + (sayN * 0.4) + (sozN * 3.0) + obpPuan;
    const pEa = 130 + (sayN * 1.75) + (sozN * 1.7) + obpPuan;

    setResult({ say: pSay, soz: pSoz, ea: pEa });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
     setSayNet("");
     setSozNet("");
     setObp("");
     setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="DGS PUAN HESAPLA"
      icon="🎓"
      infoText="Dikey Geçiş Sınavı netlerinize ve Önlisans Başarı Puanınıza (ÖBP) göre yerleştirme puanlarınızı bulun."
      results={result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <V2ResultCard color="blue" label="DGS SAYISAL" value={result.say.toFixed(3)} subLabel="SAY Puanı" icon="🔢" />
             <V2ResultCard color="red" label="DGS SÖZEL" value={result.soz.toFixed(3)} subLabel="SÖZ Puanı" icon="📚" />
             <V2ResultCard color="amber" label="DGS EŞİT AĞ." value={result.ea.toFixed(3)} subLabel="EA Puanı" icon="🧬" />
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="SAYISAL NETİ" value={sayNet} onChange={setSayNet} unit="NET" placeholder="Maks: 50" max="50" />
           <V2Input label="SÖZEL NETİ" value={sozNet} onChange={setSozNet} unit="NET" placeholder="Maks: 50" max="50" />
        </div>
        <V2Input label="ÖNLİSANS BAŞARI PUANI (ÖBP)" value={obp} onChange={setObp} unit="P" placeholder="50-100 Arası" max="100" fieldClassName="!bg-primary/5 !border-primary/10" />
        <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="📉 DGS Puanı Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}

// YDS Hesaplama
export function YdsCalculator() {
  const [dogru, setDogru] = useState("");
  const [result, setResult] = useState<null | { dogru: number; puan: number; seviye: string; color: "emerald" | "purple" | "blue" | "amber" | "red" }>(null);

  const calculate = () => {
    const d = parseFloat(dogru) || 0;
    const puan = d * 1.25;
    
    let seviye = "";
    let color: "emerald" | "purple" | "blue" | "amber" | "red" = "red";

    if (puan >= 90) { seviye = "A SEVİYESİ"; color = "emerald"; }
    else if (puan >= 80) { seviye = "B SEVİYESİ"; color = "purple"; }
    else if (puan >= 70) { seviye = "C SEVİYESİ"; color = "blue"; }
    else if (puan >= 60) { seviye = "D SEVİYESİ"; color = "amber"; }
    else if (puan >= 50) { seviye = "E SEVİYESİ"; color = "amber"; }
    else { seviye = "BARAJ ALTI"; color = "red"; }

    setResult({ dogru: d, puan, seviye, color });
    if (puan >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
     setDogru("");
     setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="YDS / YÖKDİL HESAPLA"
      icon="🌍"
      infoText="Dil sınavlarında yaptığınız her doğru 1.25 puandır. Puanınızı ve karşılık gelen YÖK seviyesini anında öğrenin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="TOPLAM YDS PUANI"
            value={result.puan.toFixed(2)}
            subLabel={`DİL SEVİYESİ: ${result.seviye}`}
            icon="🏆"
          />
          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Languages className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[11px] text-muted italic leading-relaxed">
               YDS ve YÖKDİL gibi dil sınavlarında 4 yanlış 1 doğruyu götürmez. Puanınız sadece net doğru sayınız üzerinden hesaplanır.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <V2Input 
          label="DOĞRU CEVAP SAYISI" 
          value={dogru} 
          onChange={setDogru} 
          unit="D" 
          placeholder="80 soruda kaç doğru?" 
          max="80" 
          fieldClassName="!py-6 text-center text-5xl font-black italic text-primary"
        />
        <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="📉 Dil Puanı Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}
