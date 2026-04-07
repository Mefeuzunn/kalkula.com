"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Calendar, User, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function RetirementCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [birthDate, setBirthDate] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [premiumDays, setPremiumDays] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateRetirement = () => {
    if (!birthDate || !entryDate) return;

    const birth = new Date(birthDate);
    const entry = new Date(entryDate);
    const eytCutoff = new Date("1999-09-08");
    const secondCutoff = new Date("2008-04-30");

    let status = "";
    let targetAge = 0;
    let targetDays = 0;
    let targetServiceYears = gender === "male" ? 25 : 20;

    // 1. EYT (Before 08.09.1999)
    if (entry <= eytCutoff) {
      status = "EYT Kapsamındasınız";
      targetAge = 0; // No age limit for EYT
      // Days vary (5000 to 5975 based on date, simplified to 5000-5975 range)
      targetDays = gender === "male" ? 5000 + Math.min(975, Math.floor((entry.getTime() - new Date("1976-11-24").getTime()) / (1000 * 60 * 60 * 24 * 365) * 100)) : 5000;
      if (targetDays < 5000) targetDays = 5000;
      if (targetDays > 5975) targetDays = 5975;
    } 
    // 2. Mid Term (1999 - 2008)
    else if (entry <= secondCutoff) {
      status = "7000 Gün Kapsamı";
      targetAge = gender === "male" ? 60 : 58;
      targetDays = 7000;
    } 
    // 3. New Term (After 2008)
    else {
      status = "65 Yaş Kademeli Geçiş";
      targetAge = gender === "male" ? 60 : 58; // Base ages, but increases after 7200 days completion
      targetDays = 7200;
      // In reality, it increases by 1 year every 2 years after 2036...
      const daysDiff = Math.floor((entry.getTime() - secondCutoff.getTime()) / (1000 * 60 * 60 * 24 * 365));
      if (daysDiff > 28) targetAge = 65; // Simple approximation for post-2036
    }

    const ageAtEntry = Math.floor((entry.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365));
    const currentAge = Math.floor((new Date().getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365));
    const serviceYearsSoFar = Math.floor((new Date().getTime() - entry.getTime()) / (1000 * 60 * 60 * 24 * 365));

    const ageWait = Math.max(0, targetAge - currentAge);
    const dayWait = Math.max(0, targetDays - Number(premiumDays || 0));
    const serviceWait = Math.max(0, targetServiceYears - serviceYearsSoFar);

    const retirementDateByAge = new Date(birth);
    retirementDateByAge.setFullYear(birth.getFullYear() + targetAge);

    const retirementDateByService = new Date(entry);
    retirementDateByService.setFullYear(entry.getFullYear() + targetServiceYears);

    // Final retirement is the latest of all requirements
    let finalDate = retirementDateByAge > retirementDateByService ? retirementDateByAge : retirementDateByService;
    if (targetAge === 0) finalDate = retirementDateByService; // EYT case

    setResult({
      status,
      targetAge,
      targetDays,
      targetServiceYears,
      ageWait,
      dayWait,
      serviceWait,
      finalDate: finalDate.toLocaleDateString("tr-TR"),
      isRetired: ageWait <= 0 && dayWait <= 0 && serviceWait <= 0
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [gender, birthDate, entryDate, premiumDays]);

  return (
    <div className="calc-wrapper animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-accent-glow rounded-2xl flex items-center justify-center text-accent-primary">
          <Calculator size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Ne Zaman Emekli Olurum?</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">SGK & EYT Uyumlu Robot</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
          {/* Gender */}
          <div className="space-y-3">
            <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">CİNSİYET</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setGender("male")}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-black text-sm ${gender === "male" ? "bg-accent-primary border-accent-primary text-white shadow-lg" : "bg-secondary/20 border-border text-muted hover:border-accent-primary/30"}`}
              >
                <User size={18} /> ERKEK
              </button>
              <button 
                onClick={() => setGender("female")}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-black text-sm ${gender === "female" ? "bg-accent-primary border-accent-primary text-white shadow-lg" : "bg-secondary/20 border-border text-muted hover:border-accent-primary/30"}`}
              >
                <User size={18} /> KADIN
              </button>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">DOĞUM TARİHİ</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="calc-input w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">SGK GİRİŞ TARİHİ</label>
              <input 
                type="date" 
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="calc-input w-full"
              />
            </div>
          </div>

          {/* Premium Days */}
          <div className="space-y-2">
            <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">TOPLAM PRİM GÜNÜ</label>
            <div className="relative">
              <input 
                type="number" 
                value={premiumDays}
                onChange={(e) => setPremiumDays(e.target.value)}
                placeholder="Örn: 5200"
                className="calc-input w-full pl-12"
              />
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="bg-accent-primary/10 text-accent-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-accent-primary/20">
                  {result.status}
                </span>
                {result.isRetired ? (
                  <span className="flex items-center gap-1 text-green-500 font-black text-xs">
                    <CheckCircle2 size={14} /> EMEKLİLİĞE HAK KAZANDINIZ
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-orange-500 font-black text-xs">
                    <Clock size={14} /> SÜREÇ DEVAM EDİYOR
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-secondary/10 rounded-3xl border border-border">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-tighter mb-1">HEDEF YAŞ</p>
                  <p className="text-xl font-black">{result.targetAge === 0 ? "Yaş Sınırı Yok" : result.targetAge}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-3xl border border-border">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-tighter mb-1">HEDEF GÜN</p>
                  <p className="text-xl font-black">{result.targetDays}</p>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {/* Age Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>YAŞ ŞARTI</span>
                    <span>{result.ageWait > 0 ? `${result.ageWait} YIL KALDI` : "TAMAMLANDI"}</span>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-primary transition-all duration-1000" 
                      style={{ width: `${Math.min(100, Math.max(0, 100 - (result.ageWait / 65 * 100)))}%` }}
                    />
                  </div>
                </div>

                {/* Days Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>PRİM GÜNÜ</span>
                    <span>{result.dayWait > 0 ? `${result.dayWait} GÜN KALDI` : "TAMAMLANDI"}</span>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-primary transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (Number(premiumDays) / result.targetDays) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Service Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                    <span>SİGORTALILIK SÜRESİ</span>
                    <span>{result.serviceWait > 0 ? `${result.serviceWait} YIL KALDI` : "TAMAMLANDI"}</span>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-primary transition-all duration-1000" 
                      style={{ width: `${Math.min(100, 100 - (result.serviceWait / result.targetServiceYears * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">TAHMİNİ EMEKLİLİK TARİHİ</p>
                  <p className="text-2xl font-black text-accent-primary">{result.finalDate}</p>
                </div>
                <div className="w-12 h-12 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary">
                  <Calendar size={24} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface p-8 rounded-[2.5rem] border border-border border-dashed flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-muted mb-4">
                <AlertCircle size={32} />
              </div>
              <p className="text-muted font-bold">Lütfen doğum ve giriş tarihinizi seçerek hesaplamayı başlatın.</p>
            </div>
          )}
        </div>
      </div>

      <div className="calc-info-box mt-12">
        <span className="calc-info-box-icon">ℹ️</span>
        <span className="calc-info-box-text">
          <b>Yasal Uyarı:</b> Bu araç, 2024 yılı güncel SGK ve EYT yasalarına göre teorik bir hesaplama yapar. Kesin emeklilik tarihinizi ve hak edişinizi öğrenmek için resmi e-Devlet SGK Tescil ve Hizmet Dökümü verilerini veya bir Sosyal Güvenlik uzmanını rehber almalısınız.
        </span>
      </div>
    </div>
  );
}
