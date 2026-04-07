"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface ExamResult {
  puan: number;
  status?: "pass" | "fail" | "neutral";
  message?: string;
}

// 1. AKS (Adaylık Kaldırma Sınavı)
export function AksCalculator() {
  const [dogru, setDogru] = useState("75");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 1.0; // Her soru 1 puan
    setResult({
      puan,
      status: puan >= 60 ? "pass" : "fail",
      message: puan >= 60 ? "Tebrikler, Barajı Geçtiniz!" : "Baraj Altı Kadınız."
    });
    if (puan >= 60) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (100 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="100" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Puan Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 2. Ehliyet Sınavı
export function EhliyetCalculator() {
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 2; // 50 soru, her biri 2 puan
    setResult({
      puan,
      status: puan >= 70 ? "pass" : "fail",
      message: puan >= 70 ? "Sertifika Almaya Hak Kazandınız!" : "Maalesef Kaldınız (Min 70 Puan Gereklidir)."
    });
    if (puan >= 70) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (50 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="50" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Sonucu Gör</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 3. İSG (İş Sağlığı ve Güvenliği)
export function IsgCalculator() {
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = d * 2; // 50 soru
    setResult({
      puan,
      status: puan >= 70 ? "pass" : "fail",
      message: puan >= 70 ? "İSG Belgesi Almaya Hak Kazandınız!" : "Barajı Geçemediniz (Min 70 Puan)."
    });
    if (puan >= 70) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (50 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="50" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 4. Özel Güvenlik Sınavı
export function OzelGuvenlikCalculator() {
  const [temelDogru, setTemelDogru] = useState("60");
  const [silahDogru, setSilahDogru] = useState("15");
  const [isSilahli, setIsSilahli] = useState(true);
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const t = parseInt(temelDogru) || 0;
    const s = parseInt(silahDogru) || 0;
    const puan = isSilahli ? (t + (s * 4)) / 1.1 : t; // Basitleştirilmiş tahmini formül
    setResult({
      puan: Math.round(puan),
      status: puan >= 60 ? "pass" : "fail",
      message: puan >= 60 ? "Başarıyla Tamamladınız!" : "Puanınız Yetersiz (Min 60)."
    });
    if (puan >= 60) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-secondary/10 p-1 rounded-xl mb-2">
        <button onClick={() => setIsSilahli(false)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${!isSilahli ? 'bg-accent-primary text-white' : 'text-muted'}`}>Silahsız</button>
        <button onClick={() => setIsSilahli(true)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${isSilahli ? 'bg-accent-primary text-white' : 'text-muted'}`}>Silahlı</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Temel Eğitim Doğru</label>
          <input type="number" value={temelDogru} onChange={e => setTemelDogru(e.target.value)} className="input-field font-black !text-2xl" max="100" />
        </div>
        {isSilahli && (
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Silah Doğru (25 Soru)</label>
            <input type="number" value={silahDogru} onChange={e => setSilahDogru(e.target.value)} className="input-field font-black !text-2xl" max="25" />
          </div>
        )}
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Özel Güvenlik Puanı Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
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

    const say = 100 + (t * 1.5) + (s * 0.5) + (m * 2.5) + (f * 3.5); // Yaklaşık katsayılar
    const soz = 100 + (t * 3.5) + (s * 3.5) + (m * 1.5) + (f * 0.5);
    const ea = 100 + (t * 3.0) + (s * 2.0) + (m * 3.5) + (f * 1.0);
    const gen = 100 + (t * 3.3) + (s * 3.3) + (m * 3.3) + (f * 3.3);

    setResult({ say, soz, ea, gen });
    confetti();
  };

  return (
    <div className="flex flex-col gap-6 font-primary">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Türkçe</label>
          <input type="number" value={tr} onChange={e => setTr(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Sosyal</label>
          <input type="number" value={sos} onChange={e => setSos(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Matematik</label>
          <input type="number" value={mat} onChange={e => setMat(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Fen B.</label>
          <input type="number" value={fen} onChange={e => setFen(e.target.value)} className="input-field font-black !text-xl" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">MSÜ Puanlarını Tahmin Et</button>
      {result && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-result">
          <ResultBadge label="MSÜ-SAY" val={result.say} color="blue" />
          <ResultBadge label="MSÜ-SÖZ" val={result.soz} color="red" />
          <ResultBadge label="MSÜ-EA" val={result.ea} color="orange" />
          <ResultBadge label="MSÜ-GENEL" val={result.gen} color="purple" />
        </div>
      )}
    </div>
  );
}

// 6. PMYO / POMEM
export function PoliceCalculator() {
  const [tyt, setTyt] = useState("250");
  const [spor, setSpor] = useState("80");
  const [mulakat, setMulakat] = useState("80");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const t = parseFloat(tyt) || 0;
    const s = parseFloat(spor) || 0;
    const m = parseFloat(mulakat) || 0;
    const total = (t * 0.25) + (s * 0.25) + (m * 0.50);
    setResult({
      puan: Math.round(total),
      status: total >= 65 ? "pass" : "neutral",
      message: total >= 65 ? "Polislik İçin Oldukça Şanslısınız!" : "Puanınızı Yükseltmeye Odaklanın."
    });
    if (total >= 70) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">TYT Puanı</label>
          <input type="number" value={tyt} onChange={e => setTyt(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Fiziki M. (0-100)</label>
          <input type="number" value={spor} onChange={e => setSpor(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Mülakat (0-100)</label>
          <input type="number" value={mulakat} onChange={e => setMulakat(e.target.value)} className="input-field font-black !text-xl" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Giriş Puanını Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 7. EKPSS (Disabled KPSS)
export function EkpssCalculator() {
  const [genel, setGenel] = useState("45");
  const [dogru, setDogru] = useState("35");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = 40 + (d * 1.0); // Simple estimated formula
    setResult({
      puan: Math.min(100, puan),
      status: "neutral",
      message: "Tercih döneminde kontenjanlara dikkat ediniz."
    });
    confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Toplam Doğru (60 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="60" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">EKPSS Puanı Tahmin Et</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 8. HMGS / HMGS-Y
export function HmgsCalculator() {
  const [dogru, setDogru] = useState("70");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = (d / 100) * 100; // 100 Soruluk test
    setResult({
      puan,
      status: puan >= 70 ? "pass" : "fail",
      message: puan >= 70 ? "Hukuk Mesleğine Giriş Barajını Geçtiniz!" : "Maalesef 70 Baraj Altı."
    });
    if (puan >= 70) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (100 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="100" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Baraj Sorgula</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 10. DİB MBSTS (Mesleki Bilgiler Seviye Tespit Sınavı)
export function DibMbstsCalculator() {
  const [dogru, setDogru] = useState("60");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = 35 + (d * 0.8125); // 80 soruluk sınav tahmini
    setResult({
      puan,
      status: puan >= 60 ? "pass" : "neutral",
      message: puan >= 60 ? "Mülakatlara katılma şansınız yüksek!" : "Sınav başarınızı artırmayı hedefleyin."
    });
    if (puan >= 60) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (80 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="80" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Puanı Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 11. EUS (Eczacılıkta Uzmanlık Sınavı)
export function EusCalculator() {
  const [dogru, setDogru] = useState("75");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const d = parseInt(dogru) || 0;
    const puan = (d / 100) * 100;
    setResult({
      puan,
      status: "neutral",
      message: "EUS sonuçları klinik bilimler ortalamasına göre değişebilir."
    });
    confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Doğru Sayısı (100 Soru)</label>
        <input type="number" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field font-black !text-2xl" max="100" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">EUS Puanı Tahmin Et</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 12. İYÖS (Uluslararası Öğrenci Sınavı)
export function IyosCalculator() {
  const [mat, setMat] = useState("35");
  const [iq, setIq] = useState("35");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const m = parseInt(mat) || 0;
    const i = parseInt(iq) || 0;
    const total = m + i;
    const puan = (total / 80) * 100;
    setResult({
      puan,
      status: puan >= 50 ? "pass" : "fail",
      message: puan >= 50 ? "Üniversite başvuruları için yeterli puan." : "Puanınızı yükseltmelisiniz."
    });
    if (puan >= 50) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Matematik (40 Soru)</label>
          <input type="number" value={mat} onChange={e => setMat(e.target.value)} className="input-field font-black !text-2xl" max="40" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">IQ / Mantık (40 Soru)</label>
          <input type="number" value={iq} onChange={e => setIq(e.target.value)} className="input-field font-black !text-2xl" max="40" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">İYÖS Puanı Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 13. ÖYP (Öğretim Üyesi Yetiştirme Programı)
export function OypCalculator() {
  const [ales, setAles] = useState("80");
  const [gpa, setGpa] = useState("85");
  const [dil, setDil] = useState("70");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const a = parseFloat(ales) || 0;
    const g = parseFloat(gpa) || 0;
    const d = parseFloat(dil) || 0;
    const puan = (a * 0.5) + (g * 0.25) + (d * 0.25);
    setResult({
      puan,
      status: "neutral",
      message: "Akademik kadro atamalarında sıralama önemlidir."
    });
    confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">ALES Puanı</label>
          <input type="number" value={ales} onChange={e => setAles(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Mezuniyet Notu (0-100)</label>
          <input type="number" value={gpa} onChange={e => setGpa(e.target.value)} className="input-field font-black !text-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yabancı Dil</label>
          <input type="number" value={dil} onChange={e => setDil(e.target.value)} className="input-field font-black !text-xl" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">ÖYP Puanı Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 14. HSY (Hâkim ve Savcı Yardımcılığı)
export function HsyCalculator() {
  const [genel, setGenel] = useState("25");
  const [alan, setAlan] = useState("60");
  const [result, setResult] = useState<ExamResult | null>(null);

  const calculate = () => {
    const g = parseFloat(genel) || 0;
    const a = parseFloat(alan) || 0;
    const puan = 40 + (g * 0.4) + (a * 0.6); // Estimated
    setResult({
      puan,
      status: puan >= 70 ? "pass" : "fail",
      message: puan >= 70 ? "Mülakat barajını geçtiniz!" : "Sınav sonucunuz mülakat için yeterli olmayabilir."
    });
    if (puan >= 70) confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Genel Kültür (30 Soru)</label>
          <input type="number" value={genel} onChange={e => setGenel(e.target.value)} className="input-field font-black !text-2xl" max="30" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Alan Bilgisi (70 Soru)</label>
          <input type="number" value={alan} onChange={e => setAlan(e.target.value)} className="input-field font-black !text-2xl" max="70" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">HSY Puanı Hesapla</button>
      {result && <ResultCard result={result} />}
    </div>
  );
}

// 15. OBP / Diploma Puanı
export function ObpCalculator() {
  const [diploma, setDiploma] = useState("85");
  const [result, setResult] = useState<{ obp: number; ek: number } | null>(null);

  const calculate = () => {
    const d = parseFloat(diploma) || 0;
    setResult({
      obp: d * 5, // ÖSYM OBP Puanı
      ek: d * 0.6 // Sınava eklenen ham puan
    });
    confetti();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Diploma Notu (0-100)</label>
        <input type="number" value={diploma} onChange={e => setDiploma(e.target.value)} className="input-field font-black !text-2xl" max="100" />
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-sm font-black uppercase tracking-widest">Yerleştirme Puanını Bul</button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-result">
           <div className="p-6 bg-secondary/5 rounded-3xl border border-border text-center shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-wider text-muted opacity-80 decoration-accent-primary underline decoration-2 underline-offset-4">ÖSYM OBP Puanı</span>
              <div className="text-4xl font-black italic text-primary mt-2">{result.obp}</div>
           </div>
           <div className="p-6 bg-accent-primary text-white rounded-3xl text-center shadow-xl">
              <span className="text-[9px] font-black uppercase tracking-wider opacity-80">Sınava Katkısı</span>
              <div className="text-4xl font-black italic mt-2">+{result.ek.toFixed(2)}</div>
           </div>
        </div>
      )}
    </div>
  );
}

// 15. İSG (İş Sağlığı ve Güvenliği) - Duplicate check, already implemented at 68.
// 16. AKS - Duplicate check, already implemented at 12.

// Helpers
function ResultCard({ result }: { result: ExamResult }) {
  const isPass = result.status === "pass";
  const isNeutral = result.status === "neutral";

  return (
    <div className={`result-container-premium animate-result`}>
      <div className={`result-card-premium ${isPass ? 'bg-green-500 border-emerald-400' : isNeutral ? 'bg-blue-500 border-sky-400' : 'bg-red-500 border-rose-400'} border-4 shadow-2xl text-white`}>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 italic">Hesaplanan Tahmini Puan</div>
          <div className="text-6xl font-black tracking-tighter italic">{result.puan.toFixed(2)}</div>
          <p className="mt-4 text-sm font-bold opacity-90 leading-relaxed bg-black/10 p-4 rounded-2xl border border-white/10">{result.message}</p>
        </div>
      </div>
    </div>
  );
}

function ResultBadge({ label, val, color }: { label: string; val: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-600 border-blue-400",
    red: "bg-red-600 border-red-400",
    orange: "bg-orange-600 border-orange-400",
    purple: "bg-purple-600 border-purple-400"
  };

  return (
    <div className={`p-6 ${colors[color]} border-2 rounded-3xl text-white shadow-lg group hover:scale-105 transition-all text-center`}>
      <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80 block mb-2">{label}</span>
      <div className="text-3xl font-black italic">{val.toFixed(3)}</div>
    </div>
  );
}
