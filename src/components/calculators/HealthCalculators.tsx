"use client";

import { useState, useEffect } from "react";
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
  Coins
} from "lucide-react";

// --- Medical Disclaimer Component ---
function MedicalDisclaimer() {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-600 dark:text-amber-400 text-xs mb-6">
      <ShieldAlert className="w-5 h-5 flex-shrink-0" />
      <p>
        <strong>Uyarı:</strong> Bu araçlar yalnızca bilgilendirme amaçlıdır. Verilen sonuçlar tıbbi tavsiye yerine geçmez. 
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

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Bebeğin Doğum Tarihi</label>
        <div className="flex gap-2">
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="input-field flex-1" />
          <button onClick={calculate} className="btn-primary px-6 text-sm font-bold">Hesapla</button>
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="flex flex-col gap-3 animate-slide-up">
          <div className="text-sm font-bold text-muted px-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Aşı Takvimi Çizelgesi
          </div>
          <div className="grid grid-cols-1 gap-3">
            {schedule.map((v, i) => (
              <div key={i} className="bg-bg-secondary p-4 rounded-2xl border border-border flex items-center justify-between group hover:border-accent-primary/30 transition-colors">
                <div>
                  <div className="text-sm font-bold text-accent-primary">{v.name}</div>
                  <div className="text-[10px] text-muted uppercase font-black">{v.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-muted flex items-center gap-1">
                     <Clock className="w-3 h-3" /> {v.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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

    // Simple WHO-inspired logic
    const baseWeight = gender === "male" ? 3.5 + (m * 0.8) : 3.3 + (m * 0.7);
    const baseHeight = 50 + (m * 2.5);

    setStatus({
      weightPercentile: w < baseWeight * 0.8 ? "Düşük" : w > baseWeight * 1.3 ? "Yüksek" : "Normal",
      heightPercentile: h < baseHeight * 0.9 ? "Kısa" : h > baseHeight * 1.1 ? "Uzun" : "Normal",
      idealWeight: baseWeight.toFixed(1),
      idealHeight: baseHeight.toFixed(1)
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Cinsiyet</label>
           <div className="grid grid-cols-2 gap-2 bg-bg-secondary p-1 rounded-xl border border-border">
              <button onClick={() => setGender("male")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "male" ? "bg-blue-500 text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Erkek</button>
              <button onClick={() => setGender("female")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "female" ? "bg-pink-500 text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Kız</button>
           </div>
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Kaç Aylık?</label>
           <input type="number" value={months} onChange={e => setMonths(e.target.value)} className="input-field" min="0" max="36" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Kilo (kg)</label>
           <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" placeholder="Örn: 8.5" />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Boy (cm)</label>
           <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field" placeholder="Örn: 72" />
        </div>
      </div>
      <button onClick={checkGrowth} className="btn-primary py-4 text-xs font-black uppercase tracking-widest mt-2">Persentil Kontrol Et</button>

      {status && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Gelişim Analizi</div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-bg-secondary p-4 rounded-2xl border border-border">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Kilo Durumu</div>
                   <div className={`text-lg font-bold ${status.weightPercentile === "Normal" ? "text-green-500" : "text-amber-500"}`}>{status.weightPercentile}</div>
                </div>
                <div className="bg-bg-secondary p-4 rounded-2xl border border-border">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Boy Durumu</div>
                   <div className={`text-lg font-bold ${status.heightPercentile === "Normal" ? "text-green-500" : "text-amber-500"}`}>{status.heightPercentile}</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-accent-glow/5 border border-accent-primary/10 rounded-xl text-center">
                 <div className="text-[10px] font-black text-accent-primary uppercase mb-1">50. Persentil (Ortalama) Değerleri</div>
                 <div className="text-sm font-bold text-muted">{status.idealWeight} kg / {status.idealHeight} cm</div>
              </div>
           </div>
        </div>
      )}
    </div>
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
    let color = "text-green-500";

    if (gender === "male") {
      if (ratio >= 1.0) { risk = "Yüksek Risk"; color = "text-red-500"; }
      else if (ratio >= 0.9) { risk = "Orta Risk"; color = "text-amber-500"; }
    } else {
      if (ratio >= 0.85) { risk = "Yüksek Risk"; color = "text-red-500"; }
      else if (ratio >= 0.80) { risk = "Orta Risk"; color = "text-amber-500"; }
    }

    setResult({ ratio: ratio.toFixed(2), risk, color });
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Cinsiyet</label>
           <div className="grid grid-cols-2 gap-2 bg-bg-secondary p-1 rounded-xl border border-border">
              <button onClick={() => setGender("male")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "male" ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Erkek</button>
              <button onClick={() => setGender("female")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "female" ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Kadın</button>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-muted uppercase px-1">Bel Çevresi (cm)</label>
              <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="input-field" placeholder="Örn: 90" />
           </div>
           <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-muted uppercase px-1">Kalça Çevresi (cm)</label>
              <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="input-field" placeholder="Örn: 100" />
           </div>
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-xs font-black uppercase tracking-widest mt-2">Oranı Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">WHR Sonucu</div>
              <div className="result-value-premium">{result.ratio}</div>
              <div className={`text-xl font-bold uppercase tracking-widest mt-2 ${result.color}`}>{result.risk}</div>
              <div className="mt-6 text-[10px] text-muted leading-relaxed">
                 Bel/Kalça oranı, vücut yağ dağılımını ve abdominal obezite riskini gösteren önemli bir sağlık ölçütüdür.
              </div>
           </div>
        </div>
      )}
    </div>
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
      progress: `${weeksPassed} Hafta ${daysPassed} Günlük`,
      remaining: Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    });
    confetti({ particleCount: 30, spread: 70, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Son Adet Tarihi (SAT)</label>
        <div className="flex gap-2">
          <input type="date" value={sat} onChange={e => setSat(e.target.value)} className="input-field flex-1" />
          <button onClick={calculate} className="btn-primary px-6"><Calendar className="w-4 h-4" /></button>
        </div>
      </div>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Tahmini Doğum Tarihi</div>
              <div className="text-2xl font-black text-pink-500 my-2">{result.due}</div>
              <div className="text-sm font-bold text-muted mb-6">{result.progress} Hamilelik</div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                 <div className="bg-bg-secondary p-3 rounded-xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Kalan Gün</div>
                    <div className="text-xl font-bold">{result.remaining}</div>
                 </div>
                 <div className="bg-bg-secondary p-3 rounded-xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Trimester</div>
                    <div className="text-xl font-bold">{result.remaining > 180 ? "1." : result.remaining > 90 ? "2." : "3."}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 5. Nutrient Suite (Protein, Karbonhidrat, Yağ, Kreatin)
interface NutrientProps { type: 'carb' | 'protein' | 'fat' | 'creatine' }
export function NutrientCalculator({ type }: NutrientProps) {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintenance");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;

    let res: any = {};
    const bmr = 175 * 6.25 + 10 * w - 5 * 30 + 5; // Simplified BMR template
    const tdee = bmr * parseFloat(activity);

    if (type === 'protein') {
      const factor = parseFloat(activity) > 1.5 ? 2.0 : 1.2;
      const grams = w * factor;
      res = { title: "Protein İhtiyacı", val: `${grams.toFixed(0)}g`, desc: "Günde tüketmeniz gereken protein miktarı." };
    } else if (type === 'carb') {
      const carbs = (tdee * 0.5) / 4;
      res = { title: "Karbonhidrat İhtiyacı", val: `${carbs.toFixed(0)}g`, desc: "Enerji dengesi için önerilen miktar." };
    } else if (type === 'fat') {
      const fatGrams = (tdee * 0.25) / 9;
      res = { title: "Sağlıklı Yağ İhtiyacı", val: `${fatGrams.toFixed(0)}g`, desc: "Hormonal denge için önerilen miktar." };
    } else {
      const dose = goal === 'maintenance' ? 5 : 20;
      res = { title: "Kreatin Dozu", val: `${dose}g`, desc: goal === 'maintenance' ? "Günlük koruma dozu." : "Yükleme dönemi (5-7 gün) dozu." };
    }

    setResult(res);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const titles = { carb: "Karbonhidrat", protein: "Protein", fat: "Yağ", creatine: "Kreatin" };

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Kilo (kg)</label>
           <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field text-xl font-bold" placeholder="70" />
        </div>
        
        {type !== 'creatine' ? (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase px-1">Aktivite Seviyesi</label>
            <select value={activity} onChange={e => setActivity(e.target.value)} className="input-field">
              <option value="1.2">Sedanter (Hareketsiz)</option>
              <option value="1.375">Hafif Hareketli</option>
              <option value="1.55">Orta Hareketli</option>
              <option value="1.725">Çok Hareketli</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
             <label className="text-xs font-bold text-muted uppercase px-1">Hedef / Faz</label>
             <div className="grid grid-cols-2 gap-2 bg-bg-secondary p-1 rounded-xl border border-border">
                <button onClick={() => setGoal("maintenance")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${goal === "maintenance" ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Koruma</button>
                <button onClick={() => setGoal("loading")} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${goal === "loading" ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Yükleme</button>
             </div>
          </div>
        )}
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-xs font-black uppercase tracking-widest mt-2">{titles[type]} Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">{result.title}</div>
              <div className="result-value-premium">{result.val}</div>
              <div className="text-xs font-bold text-muted mt-4">{result.desc}</div>
           </div>
        </div>
      )}
    </div>
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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Günde Kaç Paket?</label>
           <input type="number" value={dailyPacks} onChange={e => setDailyPacks(e.target.value)} className="input-field" placeholder="Örn: 1" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Paket Fiyatı (₺)</label>
           <input type="number" value={pricePerPack} onChange={e => setPricePerPack(e.target.value)} className="input-field" placeholder="Örn: 70" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Süre (Yıl)</label>
           <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-xs font-black uppercase tracking-widest text-red-500 mt-2">Maliyeti Gör</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-red-500/10 !text-red-500 !border-red-500/20">Ekonomik Kayıp</div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="bg-bg-secondary p-4 rounded-xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Aylık</div>
                    <div className="text-lg font-bold">₺{result.monthly.toLocaleString("tr-TR")}</div>
                 </div>
                 <div className="bg-bg-secondary p-4 rounded-xl border border-border">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Yıllık</div>
                    <div className="text-lg font-bold">₺{result.yearly.toLocaleString("tr-TR")}</div>
                 </div>
              </div>
              <div className="mt-6 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                 <div className="text-[10px] font-black text-red-500 uppercase mb-1">{years} Yılda Toplam</div>
                 <div className="text-3xl font-black text-red-500">₺{result.total.toLocaleString("tr-TR")}</div>
              </div>
              <div className="mt-4 p-3 bg-green-500/5 rounded-xl border border-green-500/10">
                 <div className="text-[10px] font-black text-green-600 uppercase mb-1">Bu Para Yatırılsaydı (Tahmini)</div>
                 <div className="text-md font-bold text-green-600">~ ₺{result.opportunity.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}</div>
              </div>
           </div>
        </div>
      )}
    </div>
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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Gövde Çevresi (cm)</label>
           <input type="number" value={underbust} onChange={e => setUnderbust(e.target.value)} className="input-field" placeholder="Meme Altı" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Göğüs Çevresi (cm)</label>
           <input type="number" value={bust} onChange={e => setBust(e.target.value)} className="input-field" placeholder="Meme Üstü" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-xs font-black uppercase tracking-widest mt-2">Bedeni Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Tahmini Bedeniniz</div>
              <div className="result-value-premium text-purple-500">{result.band}{result.cup}</div>
              <div className="mt-4 text-[10px] text-muted leading-relaxed">
                 Bedenler markadan markaya değişiklik gösterebilir. Bu hesaplama EU (Avrupa) standartlarını baz alır.
              </div>
           </div>
        </div>
      )}
    </div>
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
    <div className="flex flex-col gap-6 pt-4">
      <MedicalDisclaimer />
      {!isFinal ? (
        <div className="animate-slide-up">
           <div className="flex justify-between items-center mb-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest">Soru {step + 1} / {questions.length}</div>
              <div className="h-1 flex-1 mx-4 bg-bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-accent-primary transition-all duration-500" style={{ width: `${((step + 1)/questions.length)*100}%` }}></div>
              </div>
           </div>
           <h3 className="text-xl font-bold mb-8">{questions[step].q}</h3>
           <div className="grid grid-cols-1 gap-3">
              {questions[step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.v)} className="p-5 text-left border border-border rounded-2xl hover:bg-bg-secondary hover:border-accent-primary transition-all font-bold group flex justify-between items-center">
                   {opt.l}
                   <Activity className="w-4 h-4 text-muted group-hover:text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
           </div>
        </div>
      ) : (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Tahmini Yaşam Süreniz</div>
              <div className="result-value-premium !text-5xl">{score} <span className="text-2xl font-black">YIL</span></div>
              <div className="mt-8 text-center">
                 <p className="text-xs text-muted mb-6">Bu sonuç istatistiksel ortalamalar ve girdiğiniz alışkanlıklara dayalı bir tahmindir.</p>
                 <button onClick={restart} className="btn-secondary py-3 px-8 text-xs font-black uppercase tracking-widest">Yeniden Başla</button>
              </div>
           </div>
        </div>
      )}
    </div>
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

  return (
    <div className="flex flex-col gap-6">
      <MedicalDisclaimer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Son Adet Başlangıcı</label>
           <input type="date" value={sat} onChange={e => setSat(e.target.value)} className="input-field" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Döngü Süresi (Gün)</label>
           <input type="number" value={cycle} onChange={e => setCycle(e.target.value)} className="input-field" placeholder="Örn: 28" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary py-4 text-xs font-black uppercase tracking-widest mt-2">Takvimi Gör</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-green-500/10 !text-green-500 !border-green-500/20">En Verimli Gün</div>
              <div className="result-value-premium text-green-500">{result.ov}</div>
              <div className="mt-6 p-4 bg-bg-secondary rounded-xl border border-border">
                 <div className="text-[10px] font-black text-muted uppercase mb-1">Doğurganlık Penceresi</div>
                 <div className="text-sm font-bold">{result.start} - {result.end}</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
