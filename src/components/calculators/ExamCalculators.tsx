"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Award, Shield, BookOpen, Calculator, GraduationCap, CheckCircle2 } from "lucide-react";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

// Helpers
function V2ExamWrapper({ title, icon, info, children }: { title: string; icon: string; info?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8 animate-fade-in p-1">
      <div className="flex items-center gap-3 px-2">
         <span className="text-2xl">{icon}</span>
         <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic text-primary">{title}</h3>
            {info && <p className="text-[9px] text-muted italic">{info}</p>}
         </div>
      </div>
      {children}
    </div>
  );
}

// 1. AKS (Adaylık Kaldırma Sınavı)
export function AksCalculator() {
  const [dogru, setDogru] = useState("75");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 1.0; 
    setResult({ puan, passed: puan >= 60 });
    if (puan >= 60) confetti();
  };

  return (
    <V2ExamWrapper title="AK AKS HESAPLAMA" icon="👨‍🏫" info="Adaylık Kaldırma Sınavı puan ve baraj durumu.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (100 SORU)" value={dogru} onChange={setDogru} unit="DOĞRU" max="100" placeholder="75" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="AKS PUANI" 
            value={result.puan.toFixed(1)} 
            subLabel={result.passed ? "🎯 TEBRİKLER, BARAJI GEÇTİNİZ!" : "❌ BARAJ ALTI KALDINIZ."}
            icon="📊"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 2. Ehliyet Sınavı
export function EhliyetCalculator() {
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 2; 
    setResult({ puan, passed: puan >= 70 });
    if (puan >= 70) confetti();
  };

  return (
    <V2ExamWrapper title="EHLİYET SINAV PUANI" icon="🚗" info="Sürücü kursu e-sınav puan hesaplayıcısı.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (50 SORU)" value={dogru} onChange={setDogru} unit="DOĞRU" max="50" placeholder="35" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Sonucu Gör" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="EHLİYET PUANI" 
            value={result.puan.toFixed(1)} 
            subLabel={result.passed ? "🏆 SERTİFİKA ALMAYA HAK KAZANDINIZ!" : "❌ KALDINIZ (MİN 70 GEREKLİ)"}
            icon="🛑"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 3. İSG (İş Sağlığı ve Güvenliği)
export function IsgCalculator() {
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 2; 
    setResult({ puan, passed: puan >= 70 });
    if (puan >= 70) confetti();
  };

  return (
    <V2ExamWrapper title="İSG PUAN HESAPLAYICI" icon="⛑️" info="İş Sağlığı ve Güvenliği uzmanlık sınavı.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (50 SORU)" value={dogru} onChange={setDogru} unit="DOĞRU" max="50" placeholder="35" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="İSG PUANI" 
            value={result.puan.toFixed(1)} 
            subLabel={result.passed ? "✅ İSG BELGESİ ALABİLİRSİNİZ!" : "❌ BARAJI GEÇEMEDİNİZ (MİN 70)"}
            icon="📜"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 4. Özel Güvenlik Sınavı
export function OzelGuvenlikCalculator() {
  const [temelDogru, setTemelDogru] = useState("60");
  const [silahDogru, setSilahDogru] = useState("15");
  const [isSilahli, setIsSilahli] = useState(true);
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const t = parseInt(temelDogru) || 0;
    const s = parseInt(silahDogru) || 0;
    const puan = isSilahli ? (t + (s * 4)) / 1.1 : t; 
    setResult({ puan: Math.round(puan), passed: puan >= 60 });
    if (puan >= 60) confetti();
  };

  return (
    <V2ExamWrapper title="ÖZEL GÜVENLİK PUANI" icon="🛡️" info="Silahlı ve silahsız özel güvenlik puan hesabı.">
      <div className="space-y-6">
        <div className="flex bg-white/5 p-2 rounded-[2rem] gap-2 shadow-inner">
           <button onClick={() => setIsSilahli(false)} className={`flex-1 py-3 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${!isSilahli ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-muted hover:text-primary'}`}>SİLAHSIZ</button>
           <button onClick={() => setIsSilahli(true)} className={`flex-1 py-3 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${isSilahli ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-muted hover:text-primary'}`}>SİLAHLI</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <V2Input label="TEMEL EĞİTİM DOĞRU" value={temelDogru} onChange={setTemelDogru} unit="D" max="100" placeholder="60" />
          {isSilahli && <V2Input label="SİLAH DOĞRU (25 S)" value={silahDogru} onChange={setSilahDogru} unit="D" max="25" placeholder="15" />}
        </div>
        <V2ActionRow onCalculate={calculate} onReset={() => { setTemelDogru(""); setSilahDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="ÖGG PUANI" 
            value={result.puan.toFixed(0)} 
            subLabel={result.passed ? "🎯 BAŞARIYLA TAMAMLADINIZ!" : "❌ PUANINIZ YETERSİZ (MİN 60)"}
            icon="🎖️"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 5. MSÜ (Milli Savunma Üniversitesi)
export function MsuCalculator() {
  const [tr, setTr] = useState("30");
  const [sos, setSos] = useState("15");
  const [mat, setMat] = useState("25");
  const [fen, setFen] = useState("10");
  const [result, setResult] = useState<{ say: number; soz: number; ea: number; gen: number } | null>(null);

  const calculate = () => {
    const t = parseFloat(tr) || 0;
    const s = parseFloat(sos) || 0;
    const m = parseFloat(mat) || 0;
    const f = parseFloat(fen) || 0;

    const say = 100 + (t * 1.5) + (s * 0.5) + (m * 2.5) + (f * 3.5); 
    const soz = 100 + (t * 3.5) + (s * 3.5) + (m * 1.5) + (f * 0.5);
    const ea = 100 + (t * 3.0) + (s * 2.0) + (m * 3.5) + (f * 1.0);
    const gen = 100 + (t * 3.3) + (s * 3.3) + (m * 3.3) + (f * 3.3);

    setResult({ say, soz, ea, gen });
    confetti();
  };

  return (
    <V2ExamWrapper title="MSÜ PUAN TAHMİNİ" icon="🎖️" info="Tarih, Matematik, Fen ve Sosyal ders katsayıları ile.">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <V2Input label="TÜRKÇE" value={tr} onChange={setTr} unit="D" max="40" placeholder="30" />
          <V2Input label="SOSYAL" value={sos} onChange={setSos} unit="D" max="20" placeholder="15" />
          <V2Input label="MAT" value={mat} onChange={setMat} unit="D" max="40" placeholder="25" />
          <V2Input label="FEN" value={fen} onChange={setFen} unit="D" max="20" placeholder="10" />
        </div>
        <V2ActionRow onCalculate={calculate} onReset={() => { setTr(""); setSos(""); setMat(""); setFen(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <V2ResultCard color="emerald" label="MSÜ SAYISAL" value={result.say.toFixed(3)} icon="🏆" />
            <V2ResultCard color="emerald" label="MSÜ SÖZEL" value={result.soz.toFixed(3)} icon="🏆" />
            <V2ResultCard color="emerald" label="MSÜ E.A." value={result.ea.toFixed(3)} icon="🏆" />
            <V2ResultCard color="blue" label="MSÜ GENEL" value={result.gen.toFixed(3)} icon="🏆" />
          </div>
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 6. PMYO / POMEM
export function PoliceCalculator() {
  const [tyt, setTyt] = useState("250");
  const [spor, setSpor] = useState("80");
  const [mulakat, setMulakat] = useState("80");
  const [result, setResult] = useState<{ puan: number; msg: string; passed: boolean } | null>(null);

  const calculate = () => {
    const t = parseFloat(tyt) || 0;
    const s = parseFloat(spor) || 0;
    const m = parseFloat(mulakat) || 0;
    const total = (t * 0.25) + (s * 0.25) + (m * 0.50);
    setResult({
      puan: Math.round(total),
      passed: total >= 65,
      msg: total >= 65 ? "🎯 POLİSLİK İÇİN ŞANSLISINIZ!" : "⚠️ PUANINIZ DÜŞÜK KALABİLİR."
    });
    if (total >= 70) confetti();
  };

  return (
    <V2ExamWrapper title="POLİSLİK GİRİŞ PUANI" icon="👮" info="PMYO ve POMEM için TYT, Spor ve Mülakat analizi.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <V2Input label="TYT PUANI" value={tyt} onChange={setTyt} unit="P" placeholder="250" />
          <V2Input label="SPOR (0-100)" value={spor} onChange={setSpor} unit="P" placeholder="80" max="100" />
          <V2Input label="MÜLAKAT (0-100)" value={mulakat} onChange={setMulakat} unit="P" placeholder="80" max="100" />
        </div>
        <V2ActionRow onCalculate={calculate} onReset={() => { setTyt(""); setSpor(""); setMulakat(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "blue"} 
            label="POLİS ADAY PUANI" 
            value={result.puan.toFixed(0)} 
            subLabel={result.msg}
            icon="🚔"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 7. EKPSS (Disabled KPSS)
export function EkpssCalculator() {
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<{ puan: number } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = 40 + (d * 1.0); 
    setResult({ puan: Math.min(100, puan) });
    confetti();
  };

  return (
    <V2ExamWrapper title="EKPSS PUAN TAHMİNİ" icon="♿" info="Engelli Kamu Personeli Seçme Sınavı analizi.">
      <div className="space-y-6">
        <V2Input label="TOPLAM DOĞRU (60 SORU)" value={dogru} onChange={setDogru} unit="D" max="60" placeholder="35" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color="emerald" 
            label="EKPSS TAHMİNİ PUAN" 
            value={result.puan.toFixed(2)} 
            subLabel="Kontenjan ve Branş Sıralaması Önemlidir"
            icon="⭐"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 8. HMGS
export function HmgsCalculator() {
  const [dogru, setDogru] = useState("70");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = (d / 100) * 100; 
    setResult({ puan, passed: puan >= 70 });
    if (puan >= 70) confetti();
  };

  return (
    <V2ExamWrapper title="HMGS BARAJ SORGULAMA" icon="⚖️" info="Hukuk Mesleklerine Giriş Sınavı puan hesabı.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (100 SORU)" value={dogru} onChange={setDogru} unit="D" max="100" placeholder="70" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Baraj Sorgula" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="HMGS PUANI" 
            value={result.puan.toFixed(1)} 
            subLabel={result.passed ? "📈 BARAJI GEÇTİNİZ!" : "❌ 70 BARAJ ALTI KALDINIZ."}
            icon="⚖️"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 10. DİB MBSTS
export function DibMbstsCalculator() {
  const [dogru, setDogru] = useState("60");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = 35 + (d * 0.8125); 
    setResult({ puan, passed: puan >= 60 });
    if (puan >= 60) confetti();
  };

  return (
    <V2ExamWrapper title="DİB MBSTS PUANI" icon="🕌" info="Diyanet İşleri Başkanlığı mesleki sınavı.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (80 SORU)" value={dogru} onChange={setDogru} unit="D" max="80" placeholder="60" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "blue"} 
            label="MBSTS PUANI" 
            value={result.puan.toFixed(2)} 
            subLabel={result.passed ? "✨ MÜLAKAT ŞANSINIZ YÜKSEK!" : "📚 BAŞARIYI ARTIRMALISINIZ."}
            icon="📜"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 11. EUS (Eczacılıkta Uzmanlık Sınavı)
export function EusCalculator() {
  const [dogru, setDogru] = useState("75");
  const [result, setResult] = useState<{ puan: number } | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = (d / 100) * 100;
    setResult({ puan });
    confetti();
  };

  return (
    <V2ExamWrapper title="EUS PUAN HESABI" icon="💊" info="Eczacılıkta Uzmanlık Sınavı tahmini puanı.">
      <div className="space-y-6">
        <V2Input label="DOĞRU SAYISI (100 SORU)" value={dogru} onChange={setDogru} unit="D" max="100" placeholder="75" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDogru(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color="emerald" 
            label="EUS PUANI" 
            value={result.puan.toFixed(2)} 
            subLabel="Branş Ortalamaları Farklılık Gösterebilir"
            icon="🧪"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 12. İYÖS (Uluslararası Öğrenci Sınavı)
export function IyosCalculator() {
  const [mat, setMat] = useState("35");
  const [iq, setIq] = useState("35");
  const [result, setResult] = useState<{ puan: number; passed: boolean } | null>(null);

  const calculate = () => {
    const m = parseInt(mat) || 0;
    const i = parseInt(iq) || 0;
    const total = m + i;
    const puan = (total / 80) * 100;
    setResult({ puan, passed: puan >= 50 });
    if (puan >= 50) confetti();
  };

  return (
    <V2ExamWrapper title="İYÖS PUAN ANALİZİ" icon="🌍" info="Uluslararası öğrenciler için Matematik ve IQ analizi.">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <V2Input label="MATEMATİK (40 S)" value={mat} onChange={setMat} unit="D" max="40" placeholder="35" />
          <V2Input label="IQ / MANTIK (40 S)" value={iq} onChange={setIq} unit="D" max="40" placeholder="35" />
        </div>
        <V2ActionRow onCalculate={calculate} onReset={() => { setMat(""); setIq(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color={result.passed ? "emerald" : "red"} 
            label="İYÖS PUANI" 
            value={result.puan.toFixed(2)} 
            subLabel={result.passed ? "🎓 BAŞVURU İÇİN YETERLİ PUAN!" : "📝 PUANINIZ DÜŞÜK KALABİLİR."}
            icon="🏢"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 13. ÖYP (Öğretim Üyesi Yetiştirme Programı)
export function OypCalculator() {
  const [ales, setAles] = useState("80");
  const [gpa, setGpa] = useState("85");
  const [dil, setDil] = useState("70");
  const [result, setResult] = useState<{ puan: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(ales) || 0;
    const g = parseFloat(gpa) || 0;
    const d = parseFloat(dil) || 0;
    const puan = (a * 0.5) + (g * 0.25) + (d * 0.25);
    setResult({ puan });
    confetti();
  };

  return (
    <V2ExamWrapper title="ÖYP PUAN HESAPLA" icon="🏫" info="ALES, Diploma ve Dil katsayıları ile akademik puan.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <V2Input label="ALES PUANI" value={ales} onChange={setAles} unit="P" placeholder="80" />
          <V2Input label="MEZUNİYET NOTU" value={gpa} onChange={setGpa} unit="P" placeholder="85" max="100" />
          <V2Input label="YABANCI DİL" value={dil} onChange={setDil} unit="P" placeholder="70" max="100" />
        </div>
        <V2ActionRow onCalculate={calculate} onReset={() => { setAles(""); setGpa(""); setDil(""); setResult(null); }} calculateLabel="Hesapla" />
        {result && (
          <V2ResultCard 
            color="emerald" 
            label="ÖYP PUANI" 
            value={result.puan.toFixed(3)} 
            subLabel="Akademik Atamalarda Sıralama Önemlidir"
            icon="🎓"
          />
        )}
      </div>
    </V2ExamWrapper>
  );
}

// 15. OBP / Diploma Puanı
export function ObpCalculator() {
  const [diploma, setDiploma] = useState("85");
  const [result, setResult] = useState<{ obp: number; ek: number } | null>(null);

  const calculate = () => {
    const d = parseFloat(diploma) || 0;
    setResult({
      obp: d * 5, 
      ek: d * 0.6 
    });
    confetti();
  };

  return (
    <V2ExamWrapper title="OBP HESAPLAMA" icon="📜" info="Ortaöğretim Başarı Puanı ve üniversite sınavı katkısı.">
      <div className="space-y-6">
        <V2Input label="DİPLOMA NOTU (0-100)" value={diploma} onChange={setDiploma} unit="P" max="100" placeholder="85" />
        <V2ActionRow onCalculate={calculate} onReset={() => { setDiploma(""); setResult(null); }} calculateLabel="Yerleştirme Puanını Bul" />
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <V2ResultCard color="blue" label="ÖSYM OBP PUANI" value={result.obp.toFixed(0)} icon="📊" />
            <V2ResultCard color="emerald" label="SINAVA KATKISI" value={`+${result.ek.toFixed(2)}`} icon="⚡" />
          </div>
        )}
      </div>
    </V2ExamWrapper>
  );
}
