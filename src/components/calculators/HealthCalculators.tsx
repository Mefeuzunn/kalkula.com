"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Heart, 
  Baby, 
  Calendar, 
  Scale, 
  Dna, 
  Droplet, 
  Zap, 
  TrendingDown, 
  Activity, 
  ShieldAlert,
  Clock,
  Coins,
  Target,
  TrendingUp
} from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

// --- Medical Disclaimer Component ---
function MedicalDisclaimer() {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex gap-4 text-amber-500 text-[11px] font-medium leading-relaxed mb-8">
      <ShieldAlert className="w-5 h-5 flex-shrink-0" />
      <p>
        <strong className="block mb-1 uppercase tracking-widest text-[10px] font-black">TIBBİ UYARI</strong>
        Bu araçlar yalnızca bilgilendirme amaçlıdır. Verilen sonuçlar tıbbi tavsiye yerine geçmez. 
        Herhangi bir sağlık sorununuz için lütfen bir sağlık profesyoneline danışın.
      </p>
    </div>
  );
}

// 1. Aşı Takvimi Hesaplama
export function VaccinationCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);

  const vaccines = [
    { name: "Hepatit B (1. Doz)", months: 0, desc: "Doğumda uygulanır." },
    { name: "Hepatit B (2. Doz)", months: 1, desc: "1. ayın sonunda." },
    { name: "BCG (Verem)", months: 2, desc: "2. ayın sonunda." },
    { name: "DaBT-İPA-Hib (1. Doz)", months: 2, desc: "Beşli karma aşı." },
    { name: "KPA (1. Doz)", months: 2, desc: "Pnömokok aşısı." },
    { name: "DaBT-İPA-Hib (2. Doz)", months: 4, desc: "4. ayın sonunda." },
    { name: "KPA (2. Doz)", months: 4, desc: "4. ayın sonunda." },
    { name: "DaBT-İPA-Hib (3. Doz)", months: 6, desc: "6. ayın sonunda." },
    { name: "Hepatit B (3. Doz)", months: 6, desc: "6. ayın sonunda." },
    { name: "OPA (1. Doz)", months: 6, desc: "Çocuk felci aşısı (Ağızdan)." },
    { name: "KPA (Pekiştirme)", months: 12, desc: "12. ayın sonunda." },
    { name: "KKK (Kızamık-Kızamıkçık-Kabakulak)", months: 12, desc: "12. ayın sonunda." },
    { name: "Suçiçeği", months: 12, desc: "12. ayın sonunda." },
    { name: "DaBT-İPA-Hib (Pekiştirme)", months: 18, desc: "18. ayın sonunda." },
    { name: "OPA (2. Doz)", months: 18, desc: "18. ayın sonunda." },
    { name: "Hepatit A (1. Doz)", months: 18, desc: "18. ayın sonunda." },
    { name: "Hepatit A (2. Doz)", months: 24, desc: "24. ayın sonunda." },
  ];

  const calculate = () => {
    if (!birthDate) return;
    const base = new Date(birthDate);
    const newSchedule = vaccines.map(v => {
      const d = new Date(base);
      d.setMonth(d.getMonth() + v.months);
      return { ...v, date: d.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' }) };
    });
    setSchedule(newSchedule);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  const reset = () => { setBirthDate(""); setSchedule([]); };

  return (
    <V2CalculatorWrapper
      title="BEBEK AŞI TAKVİMİ"
      icon="🛡️"
      infoText="Sağlık Bakanlığı standart aşı takvimine göre bebeğinizin olması gereken aşıları doğum tarihine göre listeler."
      results={schedule.length > 0 && (
        <div className="space-y-4">
          <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> AŞI LİSTESİ VE TARİHLER
          </div>
          <div className="grid grid-cols-1 gap-3">
            {schedule.map((v, i) => (
              <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all border-l-4 border-l-blue-500">
                <div>
                  <div className="text-sm font-black text-primary italic mb-1 uppercase tracking-wide">{v.name}</div>
                  <div className="text-[10px] text-muted uppercase font-black opacity-60">{v.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-blue-500 flex items-center justify-end gap-1">
                     <Clock className="w-3 h-3" /> {v.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    >
      <MedicalDisclaimer />
      <V2Input
        label="BEBEĞİN DOĞUM TARİHİ"
        type="date"
        value={birthDate}
        onChange={setBirthDate}
      />
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🗓️ Takvimi Oluştur"
      />
    </V2CalculatorWrapper>
  );
}

// 2. Bebek Boy/Kilo Hesaplama (Growth)
export function BabyGrowthCalculator() {
  const [months, setMonths] = useState("1");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [status, setStatus] = useState<any>(null);

  const checkGrowth = () => {
    const m = parseInt(months);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h)) return;

    const baseWeight = gender === "male" ? 3.5 + (m * 0.8) : 3.3 + (m * 0.7);
    const baseHeight = 50 + (m * 2.5);

    setStatus({
      weightPercentile: w < baseWeight * 0.8 ? "Düşük" : w > baseWeight * 1.3 ? "Yüksek" : "Normal",
      heightPercentile: h < baseHeight * 0.9 ? "Kısa" : h > baseHeight * 1.1 ? "Uzun" : "Normal",
      idealWeight: baseWeight.toFixed(1),
      idealHeight: baseHeight.toFixed(1)
    });
  };

  const reset = () => { setMonths("1"); setWeight(""); setHeight(""); setStatus(null); };

  return (
    <V2CalculatorWrapper
      title="BEBEK GELİŞİM ANALİZİ (PERSENTİL)"
      icon="📈"
      infoText="Bebeğinizin boy ve kilo gelişimini WHO (Dünya Sağlık Örgütü) ortalamalarına göre analiz eder. Unutmayın her bebek eşsizdir."
      results={status && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <V2ResultCard
              color={status.weightPercentile === "Normal" ? "emerald" : "amber"}
              label="KİLO DURUMU"
              value={status.weightPercentile}
              icon="⚖️"
            />
            <V2ResultCard
              color={status.heightPercentile === "Normal" ? "emerald" : "amber"}
              label="BOY DURUMU"
              value={status.heightPercentile}
              icon="📏"
            />
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-center">
             <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-[0.2em]">50. PERSENTİL (ORTALAMA) DEĞERLERİ</div>
             <div className="text-2xl font-black text-primary italic">{status.idealWeight} KG / {status.idealHeight} CM</div>
          </div>
        </div>
      )}
    >
      <MedicalDisclaimer />
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Cinsiyet</label>
          <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1">
             <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♂ ERKEK
             </button>
             <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♀ KIZ
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <V2Input label="KAÇ AYLIK?" value={months} onChange={setMonths} unit="AY" />
          <V2Input label="KİLO (KG)" value={weight} onChange={setWeight} unit="KG" placeholder="Örn: 8.5" />
        </div>
        <V2Input label="BOY (CM)" value={height} onChange={setHeight} unit="CM" placeholder="Örn: 72" />
      </div>

      <V2ActionRow
        onCalculate={checkGrowth}
        onReset={reset}
        calculateLabel="📈 Gelişimi Kontrol Et"
      />
    </V2CalculatorWrapper>
  );
}

// 3. Bel / Kalça Oranı Hesaplama
export function WaistHipCalculator() {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    if (!w || !h) return;

    const ratio = w / h;
    let risk = "Düşük Risk";
    let themeColor: "emerald" | "amber" | "red" = "emerald";

    if (gender === "male") {
      if (ratio >= 1.0) { risk = "Yüksek Risk"; themeColor = "red"; }
      else if (ratio >= 0.9) { risk = "Orta Risk"; themeColor = "amber"; }
    } else {
      if (ratio >= 0.85) { risk = "Yüksek Risk"; themeColor = "red"; }
      else if (ratio >= 0.80) { risk = "Orta Risk"; themeColor = "amber"; }
    }

    setResult({ ratio: ratio.toFixed(2), risk, themeColor });
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
  };

  const reset = () => { setWaist(""); setHip(""); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="BEL / KALÇA ORANI (WHR)"
      icon="⭕"
      infoText="Vücut yağ dağılımını analiz eder. Bel çevresinin kalça çevresine oranı, abdominal obezite ve metabolik riskler hakkında bilgi verir."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.themeColor}
            label="RİSK DURUMU"
            value={result.risk}
            subLabel={`Hesaplanan Oran: ${result.ratio}`}
            icon="📊"
          />
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-[10px] text-muted italic text-center leading-relaxed">
             ℹ️ Dünya Sağlık Örgütü'ne göre ideal oran erkeklerde 0.90, kadınlarda ise 0.85 altıdır.
          </div>
        </div>
      )}
    >
      <MedicalDisclaimer />
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Cinsiyet</label>
          <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1">
             <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♂ ERKEK
             </button>
             <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♀ KADIN
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <V2Input label="BEL ÇEVRESİ (CM)" value={waist} onChange={setWaist} unit="CM" placeholder="90" />
          <V2Input label="KALÇA ÇEVRESİ (CM)" value={hip} onChange={setHip} unit="CM" placeholder="100" />
        </div>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="⭕ Oranı Hesapla"
      />
    </V2CalculatorWrapper>
  );
}

// 4. Doğum Tarihi Hesaplama (Due Date)
export function DueDateCalculator() {
  const [sat, setSat] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!sat) return;
    const lmp = new Date(sat);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);

    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmp.getTime());
    const weeksPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const daysPassed = Math.floor((diffTime / (1000 * 60 * 60 * 24)) % 7);

    setResult({
      due: dueDate.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' }),
      weeks: weeksPassed,
      remaining: Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))),
      trimester: Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) > 180 ? 1 : Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) > 90 ? 2 : 3
    });
    confetti({ particleCount: 30, spread: 70, origin: { y: 0.8 } });
  };

  const reset = () => { setSat(""); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="TAHMİNİ DOĞUM TARİHİ"
      icon="📅"
      infoText="Son adet tarihinize (SAT) göre bebeğinizin tahmini gelişim süreci ve doğum tarihini hesaplar."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="TAHMİNİ DOĞUM TARİHİ"
            value={result.due}
            subLabel={`${result.weeks} Hafta Gebelik`}
            icon="👶"
          />
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">KALAN GÜN</div>
                <div className="text-2xl font-black text-primary italic">{result.remaining}</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">TRIMESTER</div>
                <div className="text-2xl font-black text-primary italic">{result.trimester}. <span className="text-xs opacity-50">DÖNEM</span></div>
             </div>
          </div>
        </div>
      )}
    >
      <MedicalDisclaimer />
      <V2Input
        label="SON ADET TARİHİ (SAT)"
        type="date"
        value={sat}
        onChange={setSat}
      />
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🤰 Tarihi Hesapla"
      />
    </V2CalculatorWrapper>
  );
}

// 5. Nutrient Suite (Protein, Karbonhidrat, Yağ, Kreatin)
interface NutrientProps { type: 'carb' | 'protein' | 'fat' | 'creatine' }
export function NutrientCalculator({ type }: NutrientProps) {
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintenance");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;

    let res: any = {};
    const bmr = 175 * 6.25 + 10 * w - 5 * 30 + 5; 
    const tdee = bmr * parseFloat(activity);

    if (type === 'protein') {
      const factor = parseFloat(activity) > 1.5 ? 2.0 : 1.2;
      const grams = w * factor;
      res = { title: "Protein İhtiyacı", val: `${grams.toFixed(0)}g`, desc: "Günde tüketmeniz gereken protein miktarı.", color: "blue" };
    } else if (type === 'carb') {
      const carbs = (tdee * 0.5) / 4;
      res = { title: "Karbonhidrat İhtiyacı", val: `${carbs.toFixed(0)}g`, desc: "Enerji dengesi için önerilen miktar.", color: "amber" };
    } else if (type === 'fat') {
      const fatGrams = (tdee * 0.25) / 9;
      res = { title: "Sağlıklı Yağ İhtiyacı", val: `${fatGrams.toFixed(0)}g`, desc: "Hormonal denge için önerilen miktar.", color: "emerald" };
    } else {
      const dose = goal === 'maintenance' ? 5 : 20;
      res = { title: "Kreatin Dozu", val: `${dose}g`, desc: goal === 'maintenance' ? "Günlük koruma dozu." : "Yükleme dönemi (5-7 gün) dozu.", color: "red" };
    }

    setResult(res);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const titles = { carb: "Karbonhidrat", protein: "Protein", fat: "Yağ", creatine: "Kreatin" };
  const icons = { carb: "🍞", protein: "🍗", fat: "🥑", creatine: "💪" };

  const reset = () => { setWeight("70"); setActivity("1.2"); setGoal("maintenance"); setResult(null); };

  return (
    <V2CalculatorWrapper
      title={`${titles[type].toUpperCase()} HESAPLAYICI`}
      icon={icons[type]}
      infoText={`Vücut ağırlığınıza ve aktivite seviyenize göre günlük ${titles[type]} ihtiyacınızı belirler.`}
      results={result && (
        <V2ResultCard
          color={result.color}
          label={result.title}
          value={result.val}
          subLabel={result.desc}
          icon="⚡"
        />
      )}
    >
      <MedicalDisclaimer />
      <div className="space-y-6">
        <V2Input label="KİLO (KG)" value={weight} onChange={setWeight} unit="KG" />
        
        {type !== 'creatine' ? (
          <V2Select label="AKTİVİTE SEVİYESİ" value={activity} onChange={setActivity}>
            <option value="1.2" className="bg-slate-900">Sedanter (Hareketsiz)</option>
            <option value="1.375" className="bg-slate-900">Hafif Hareketli</option>
            <option value="1.55" className="bg-slate-900">Orta Hareketli</option>
            <option value="1.725" className="bg-slate-900">Çok Hareketli</option>
          </V2Select>
        ) : (
          <div className="space-y-3">
             <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">HEDEF / FAZ</label>
             <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1">
                <button 
                   onClick={() => setGoal("maintenance")}
                   className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${goal === "maintenance" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
                >
                   KORUMA
                </button>
                <button 
                   onClick={() => setGoal("loading")}
                   className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${goal === "loading" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
                >
                   YÜKLEME
                </button>
             </div>
          </div>
        )}
      </div>
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel={`${titles[type]} Hesapla`}
      />
    </V2CalculatorWrapper>
  );
}

// 6. Sigara Maliyeti Hesaplama
export function SmokingCostCalculator() {
  const [dailyPacks, setDailyPacks] = useState("");
  const [pricePerPack, setPricePerPack] = useState("");
  const [years, setYears] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const packs = parseFloat(dailyPacks);
    const price = parseFloat(pricePerPack);
    const y = parseInt(years);

    if (!packs || !price) return;

    const monthly = packs * price * 30;
    const yearly = packs * price * 365;
    const total = yearly * y;
    const opportunityCost = total * Math.pow(1.2, y);

    setResult({ monthly, yearly, total, opportunity: opportunityCost });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const reset = () => { setDailyPacks(""); setPricePerPack(""); setYears("1"); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="SİGARA MALİYET ANALİZİ"
      icon="🚬"
      infoText="Sigara kullanımının hem doğrudan finansal maliyetini hem de bu paranın yatırım olarak değerlendirilmesi durumundaki fırsat maliyetini gösterir."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="red"
            label={`${years} YILLIK TOPLAM KAYIP`}
            value={`₺${result.total.toLocaleString("tr-TR")}`}
            subLabel="Doğrudan Harcama"
            icon="💸"
          />
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">AYLIK</div>
                <div className="text-xl font-black text-primary italic">₺{result.monthly.toLocaleString("tr-TR")}</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">YILLIK</div>
                <div className="text-xl font-black text-primary italic">₺{result.yearly.toLocaleString("tr-TR")}</div>
             </div>
          </div>
          <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-center">
             <div className="text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-[0.2em]">BU PARA YATIRILSAYDI (TAHMİNİ)</div>
             <div className="text-2xl font-black text-emerald-500 italic">~ ₺{result.opportunity.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <V2Input label="GÜNDE KAÇ PAKET?" value={dailyPacks} onChange={setDailyPacks} placeholder="1" unit="PKT" />
        <V2Input label="PAKET FİYATI (₺)" value={pricePerPack} onChange={setPricePerPack} placeholder="70" unit="₺" />
        <V2Input label="SÜRE (YIL)" value={years} onChange={setYears} unit="YIL" />
      </div>
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="💸 Maliyeti Hesapla"
      />
    </V2CalculatorWrapper>
  );
}

// 7. Sütyen Bedeni Hesaplama
export function BraSizeCalculator() {
  const [underbust, setUnderbust] = useState("");
  const [bust, setBust] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const u = parseFloat(underbust);
    const b = parseFloat(bust);
    if (!u || !b) return;

    let band = 70;
    if (u >= 68 && u <= 72) band = 70;
    else if (u > 72 && u <= 77) band = 75;
    else if (u > 77 && u <= 82) band = 80;
    else if (u > 82 && u <= 87) band = 85;
    else if (u > 87 && u <= 92) band = 90;
    else if (u > 92 && u <= 97) band = 95;
    else if (u > 97) band = 100;

    const diff = b - u;
    let cup = "A";
    if (diff < 12) cup = "AA";
    else if (diff <= 14) cup = "A";
    else if (diff <= 16) cup = "B";
    else if (diff <= 18) cup = "C";
    else if (diff <= 20) cup = "D";
    else if (diff <= 22) cup = "E";
    else cup = "F+";

    setResult({ band, cup });
    confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } });
  };

  const reset = () => { setUnderbust(""); setBust(""); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="SÜTYEN BEDENİ HESAPLAYICI"
      icon="👗"
      infoText="Meme altı ve göğüs çevresi ölçülerinize göre EU standartlarında sütyen bedeninizi tahmin eder."
      results={result && (
        <V2ResultCard
          color="blue"
          label="TAHMİNİ BEDENİNİZ"
          value={`${result.band}${result.cup}`}
          subLabel="AB Standartları"
          icon="🎀"
        />
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <V2Input label="MEME ALTI (CM)" value={underbust} onChange={setUnderbust} placeholder="75" unit="CM" />
        <V2Input label="MEME ÜSTÜ (CM)" value={bust} onChange={setBust} placeholder="90" unit="CM" />
      </div>
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🎀 Bedeni Bul"
      />
    </V2CalculatorWrapper>
  );
}

// 8. Yaşam Süresi Hesaplama
export function LifeExpectancyCalculator() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(78);
  const [isFinal, setIsFinal] = useState(false);

  const questions = [
    { key: 'gender', q: 'Cinsiyetiniz?', options: [ { l: 'Erkek', v: 0 }, { l: 'Kadın', v: 5 } ] },
    { key: 'smoke', q: 'Sigara kullanıyor musunuz?', options: [ { l: 'Hayır', v: 0 }, { l: 'Nadiren', v: -3 }, { l: 'Evet, Her gün', v: -10 } ] },
    { key: 'exercise', q: 'Haftalık spor alışkanlığınız?', options: [ { l: 'Hiç', v: -2 }, { l: 'Haftada 1-2', v: 2 }, { l: 'Haftada 3+', v: 5 } ] },
    { key: 'diet', q: 'Beslenme tarzınız?', options: [ { l: 'Abur Cubur', v: -5 }, { l: 'Normal', v: 0 }, { l: 'Sağlıklı / Dengeli', v: 4 } ] },
    { key: 'stress', q: 'Günlük stres seviyeniz?', options: [ { l: 'Düşük', v: 2 }, { l: 'Orta', v: 0 }, { l: 'Yüksek', v: -4 } ] },
  ];

  const handleAnswer = (val: number) => {
    setScore(prev => prev + val);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinal(true);
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    }
  };

  const restart = () => {
    setStep(0);
    setScore(78);
    setIsFinal(false);
  };

  return (
    <V2CalculatorWrapper
      title="YAŞAM SÜRESİ TESTİ"
      icon="⌛"
      infoText="Alışkanlıklarınıza ve yaşam tarzınıza göre istatistiksel yaşam sürenizi tahmin eder."
    >
      <MedicalDisclaimer />
      {!isFinal ? (
        <div className="space-y-8">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic">Soru {step + 1} / {questions.length}</div>
              <div className="h-2 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((step + 1)/questions.length)*100}%` }}></div>
              </div>
           </div>
           
           <h3 className="text-xl font-black italic text-primary px-2">{questions[step].q}</h3>
           
           <div className="grid grid-cols-1 gap-4">
              {questions[step].options.map((opt, i) => (
                <button 
                   key={i} 
                   onClick={() => handleAnswer(opt.v)} 
                   className="p-6 text-left border border-white/5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all font-bold group flex justify-between items-center active:scale-95"
                >
                   <span className="text-sm uppercase tracking-wide">{opt.l}</span>
                   <Activity className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
           </div>
        </div>
      ) : (
        <div className="space-y-8 animate-result">
           <V2ResultCard
              color="emerald"
              label="TAHMİNİ YAŞAM SÜRENİZ"
              value={`${score} YIL`}
              subLabel="İstatistiksel Tahmin"
              icon="🌟"
           />
           <div className="text-center space-y-4">
              <p className="text-[10px] text-muted font-medium italic px-8">Bu sonuç istatistiksel ortalamalar ve girdiğiniz alışkanlıklara dayalı bir tahmindir.</p>
              <button onClick={restart} className="w-full py-5 rounded-[2rem] bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">↻ Testi Yeniden Başla</button>
           </div>
        </div>
      )}
    </V2CalculatorWrapper>
  );
}

// 9. Yumurtlama Dönemi Hesaplama
export function OvulationCalculator() {
  const [sat, setSat] = useState("");
  const [cycle, setCycle] = useState("28");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!sat) return;
    const base = new Date(sat);
    const cycleDays = parseInt(cycle);

    const ovulationDay = new Date(base);
    ovulationDay.setDate(ovulationDay.getDate() + (cycleDays - 14));

    const windowStart = new Date(ovulationDay);
    windowStart.setDate(windowStart.getDate() - 2);

    const windowEnd = new Date(ovulationDay);
    windowEnd.setDate(windowEnd.getDate() + 1);

    setResult({
      ov: ovulationDay.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long' }),
      start: windowStart.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long' }),
      end: windowEnd.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long' })
    });
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
  };

  const reset = () => { setSat(""); setCycle("28"); setResult(null); };

  return (
    <V2CalculatorWrapper
      title="YUMURTLAMA (OVULASYON) DÖNEMİ"
      icon="🥚"
      infoText="En doğurgan olduğunuz günleri ve yumurtlama döneminizi belirlemenize yardımcı olur."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            icon="✨"
            label="EN VERİMLİ GÜN"
            value={result.ov}
            subLabel="Ovulasyon Günü"
          />
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-center">
             <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-[0.2em]">DOĞURGANLIK PENCERESİ</div>
             <div className="text-xl font-black text-primary italic">{result.start} - {result.end}</div>
          </div>
        </div>
      )}
    >
      <MedicalDisclaimer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <V2Input label="SON ADET BAŞLANGICI" type="date" value={sat} onChange={setSat} />
        <V2Input label="DÖNGÜ SÜRESİ" value={cycle} onChange={setCycle} unit="GÜN" placeholder="28" />
      </div>
      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="📅 Takvimi Gör"
      />
    </V2CalculatorWrapper>
  );
}
