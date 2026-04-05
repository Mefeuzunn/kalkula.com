"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

// İdeal Kilo Hesaplama
export function IdealWeightCalculator() {
  const [cinsiyet, setCinsiyet] = useState("kadin");
  const [boy, setBoy] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const b = parseFloat(boy);
    if (!b || b < 100 || b > 250) return;
    
    let res = 0;
    if (cinsiyet === "erkek") {
      res = 50 + 2.3 * ((b / 2.54) - 60);
    } else {
      res = 45.5 + 2.3 * ((b / 2.54) - 60);
    }
    setResult(Math.max(30, res));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Cinsiyet</label>
          <select value={cinsiyet} onChange={e => setCinsiyet(e.target.value)} className="input-field font-bold">
            <option value="kadin">Kadın</option>
            <option value="erkek">Erkek</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Boy (cm)</label>
          <input type="number" placeholder="170" value={boy} onChange={e => setBoy(e.target.value)} className="input-field font-bold" />
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>İdeal Kilomu Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
          <div className="result-card-premium">
            <div className="result-badge">Tahmini İdeal Kilo</div>
            <div className="result-value-premium">{result.toFixed(1)} <span className="text-2xl font-black">kg</span></div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-6 opacity-60">
              Devine formülü kullanılarak hesaplanmıştır.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Su İhtiyacı Hesaplama
export function WaterIntakeCalculator() {
  const [kilo, setKilo] = useState("");
  const [hareket, setHareket] = useState("orta");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const k = parseFloat(kilo);
    if (!k || k < 20) return;
    
    let base = k * 33;
    if (hareket === "az") base = k * 30;
    if (hareket === "cok") base = k * 40;
    
    setResult(base / 1000); // Litre
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 }, colors: ["#3b82f6", "#60a5fa"] });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Kilo (kg)</label>
          <input type="number" placeholder="Örn: 70" value={kilo} onChange={e => setKilo(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Hareket Seviyesi</label>
          <select value={hareket} onChange={e => setHareket(e.target.value)} className="input-field font-bold">
            <option value="az">Az Hareketli</option>
            <option value="orta">Orta Hareketli</option>
            <option value="cok">Çok Hareketli (Sporcu)</option>
          </select>
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
          <div className="result-card-premium">
            <div className="text-5xl mb-4">💧</div>
            <div className="result-badge !bg-blue-500/10 !text-blue-500 !border-blue-500/20">Günlük Su İhtiyacı</div>
            <div className="result-value-premium !text-blue-500">{result.toFixed(2)} <span className="text-2xl font-black">L</span></div>
            <div className="mt-8 pt-6 border-t border-border">
               <span className="text-xl font-black text-primary">~{Math.ceil((result * 1000) / 250)} Bardak</span>
               <p className="text-[10px] text-muted uppercase font-bold mt-2">Günde ortalama içmeniz gereken miktar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Uyku Döngüsü (REM)
export function SleepCycleCalculator() {
  const [saat, setSaat] = useState("07:00");
  const [type, setType] = useState("uyanma"); 
  const [result, setResult] = useState<string[]>([]);

  const hesapla = () => {
    if (!saat) return;
    const [h, m] = saat.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);

    const cycles = [];
    const dalmaFarki = 15;
    
    if (type === "uyanma") {
      for (let i = 6; i >= 3; i--) {
        const t = new Date(date.getTime() - (i * 90 * 60000) - (dalmaFarki * 60000));
        cycles.push(t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
      }
    } else {
      for (let i = 3; i <= 6; i++) {
        const t = new Date(date.getTime() + (i * 90 * 60000) + (dalmaFarki * 60000));
        cycles.push(t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
      }
    }
    setResult(cycles);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#8b5cf6", "#7c3aed"] });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Hesaplama Tipi</label>
          <select value={type} onChange={e => { setType(e.target.value); setResult([]); }} className="input-field font-bold">
            <option value="uyanma">Şu saatte UYANMAK istiyorum</option>
            <option value="uyuma">Şimdi/Şu saatte UYUYACAĞIM</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Saat</label>
          <input type="time" value={saat} onChange={e => setSaat(e.target.value)} className="input-field text-xl font-bold" />
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Hesapla</button>

      {result.length > 0 && (
         <div className="result-container-premium animate-result">
            <div className="result-card-premium !text-left !p-8">
               <div className="result-badge !mb-6">{type === "uyanma" ? "Uyumak için en iyi saatler" : "Uyanmak için ideal saatler"}</div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.map((time, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border-2 transition-all ${idx === 0 || idx === 1 ? 'bg-accent-glow border-accent-primary' : 'bg-secondary/10 border-border opacity-70'}`}>
                       <div className={`text-2xl font-black ${idx === 0 || idx === 1 ? 'text-accent-primary' : 'text-primary'}`}>{time}</div>
                       <div className="text-[10px] font-bold text-muted mt-2 uppercase tracking-tighter">{6 - idx} Uyku Döngüsü</div>
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-muted font-bold mt-8 uppercase tracking-widest leading-relaxed">
                  Ortalama uykuya dalma süresi (15 dk) hesaplamaya dahildir. REM uykusu bölünmeden uyanmak için bu saatleri tercih edin.
               </p>
            </div>
         </div>
      )}
    </div>
  );
}

// BMR (Bazal Metabolizma)
export function BmrCalculator() {
  const [cinsiyet, setCinsiyet] = useState("kadin");
  const [yas, setYas] = useState("");
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const y = parseFloat(yas); const b = parseFloat(boy); const k = parseFloat(kilo);
    if (!y || !b || !k) return;

    let bmr = (10 * k) + (6.25 * b) - (5 * y);
    if (cinsiyet === "erkek") bmr += 5;
    else bmr -= 161;

    setResult(bmr);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Cinsiyet</label>
            <select value={cinsiyet} onChange={e => setCinsiyet(e.target.value)} className="input-field font-bold">
              <option value="kadin">Kadın</option>
              <option value="erkek">Erkek</option>
            </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yaş</label>
          <input type="number" value={yas} onChange={e => setYas(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Kilo (kg)</label>
          <input type="number" value={kilo} onChange={e => setKilo(e.target.value)} className="input-field font-bold" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Boy (cm)</label>
          <input type="number" value={boy} onChange={e => setBoy(e.target.value)} className="input-field font-bold" />
      </div>

      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>BMR Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
          <div className="result-card-premium">
            <div className="result-badge">Bazal Metabolizma Hızı</div>
            <div className="result-value-premium">{result.toFixed(0)} <span className="text-2xl font-black">kcal/gün</span></div>
            <p className="text-xs text-muted font-bold mt-6 leading-relaxed max-w-sm mx-auto uppercase tracking-tighter">
              İstirahat halindeyken sadece hayatta kalmak için vücudunuzun yakması gereken kalori miktarıdır.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Alan ve Hacim Hesaplayıcı
export function AreaVolumeCalculator() {
  const [sekil, setSekil] = useState("kare");
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const p1 = parseFloat(param1) || 0;
    const p2 = parseFloat(param2) || 0;
    let r: any = {};

    switch(sekil) {
      case "kare": r = { alan: p1 * p1, cevre: 4 * p1 }; break;
      case "dikdortgen": r = { alan: p1 * p2, cevre: 2 * (p1 + p2) }; break;
      case "daire": r = { alan: Math.PI * p1 * p1, cevre: 2 * Math.PI * p1 }; break;
      case "kup": r = { alan: 6 * p1 * p1, hacim: Math.pow(p1, 3) }; break;
      case "kure": r = { alan: 4 * Math.PI * p1 * p1, hacim: (4/3) * Math.PI * Math.pow(p1, 3) }; break;
      case "silindir": r = { alan: 2 * Math.PI * p1 * (p1 + p2), hacim: Math.PI * p1 * p1 * p2 }; break;
    }
    setResult(r);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Şekil Seçin</label>
        <select value={sekil} onChange={e => { setSekil(e.target.value); setParam1(""); setParam2(""); setResult(null); }} className="input-field font-bold">
          <option value="kare">Kare</option>
          <option value="dikdortgen">Dikdörtgen</option>
          <option value="daire">Daire</option>
          <option value="kup">Küp</option>
          <option value="kure">Küre</option>
          <option value="silindir">Silindir</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
         <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Parametre 1</label>
          <input type="number" value={param1} onChange={e => setParam1(e.target.value)} className="input-field font-bold" />
         </div>
         {["dikdortgen", "silindir"].includes(sekil) && (
           <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase px-1">Parametre 2</label>
            <input type="number" value={param2} onChange={e => setParam2(e.target.value)} className="input-field font-bold" />
           </div>
         )}
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Geometri Hesapla</button>

      {result && (
         <div className="result-container-premium animate-result">
            <div className="result-card-premium !p-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.alan !== undefined && (
                    <div className="p-8 bg-surface border-2 border-border rounded-3xl">
                       <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Yüzey Alanı</div>
                       <div className="text-4xl font-black text-primary">{result.alan.toFixed(2)}</div>
                    </div>
                  )}
                  {result.hacim !== undefined && (
                    <div className="p-8 bg-accent-glow border-2 border-accent-primary rounded-3xl">
                       <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest mb-2">Toplam Hacim</div>
                       <div className="text-4xl font-black text-accent-primary">{result.hacim.toFixed(2)}</div>
                    </div>
                  )}
                  {result.cevre !== undefined && (
                    <div className="p-8 bg-secondary/10 border-2 border-border rounded-3xl">
                       <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Çevre (P)</div>
                       <div className="text-4xl font-black text-primary">{result.cevre.toFixed(2)}</div>
                    </div>
                  )}
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

// Üslü ve Köklü Sayı
export function PowerRootCalculator() {
  const [taban, setTaban] = useState("");
  const [us, setUs] = useState("");
  const [kokDerece, setKokDerece] = useState("2");
  const [tip, setTip] = useState("us"); 
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    if (tip === "us") {
      const a = parseFloat(taban); const b = parseFloat(us);
      if (isNaN(a) || isNaN(b)) return;
      setResult(Math.pow(a, b));
    } else {
      const a = parseFloat(taban); const d = parseFloat(kokDerece);
      if (isNaN(a) || isNaN(d) || d === 0) return;
      if (a < 0 && d % 2 === 0) return;
      setResult(a < 0 ? -Math.pow(-a, 1/d) : Math.pow(a, 1/d));
    }
    confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">İşlem Tipi</label>
        <select value={tip} onChange={e => { setTip(e.target.value); setResult(null); }} className="input-field font-bold">
          <option value="us">Üslü Sayı Hesaplama (x^y)</option>
          <option value="kok">Köklü Sayı Hesaplama (n.√x)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">{tip === "us" ? "Taban (x)" : "Kök İçi (x)"}</label>
          <input type="number" value={taban} onChange={e => setTaban(e.target.value)} className="input-field text-xl font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">{tip === "us" ? "Üs (y)" : "Derece (n)"}</label>
          <input type="number" value={tip === "us" ? us : kokDerece} onChange={e => tip === "us" ? setUs(e.target.value) : setKokDerece(e.target.value)} className="input-field text-xl font-bold" />
        </div>
      </div>
      
      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Sayıyı Hesapla</button>

      {result !== null && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Matematiksel Sonuç</div>
              <div className="result-value-premium">{result.toString().length > 10 ? result.toExponential(4) : result}</div>
           </div>
        </div>
      )}
    </div>
  );
}

// Denklem Çözücü
export function EquationSolverCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const va = parseFloat(a); const vb = parseFloat(b); const vc = parseFloat(c) || 0;
    if (isNaN(va) || isNaN(vb)) return;

    if (va === 0) {
      if (vb === 0) return setResult({ type: "none", msg: "Geçersiz Denklem" });
      return setResult({ type: "linear", root: -vc / vb });
    }

    const delta = (vb * vb) - (4 * va * vc);
    if (delta > 0) {
      const x1 = (-vb + Math.sqrt(delta)) / (2 * va);
      const x2 = (-vb - Math.sqrt(delta)) / (2 * va);
      setResult({ type: "two", x1, x2, delta });
    } else if (delta === 0) {
      const x = -vb / (2 * va);
      setResult({ type: "one", x, delta });
    } else {
      setResult({ type: "complex", delta });
    }
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="bg-bg-secondary p-4 rounded-2xl text-center font-black text-2xl tracking-widest border border-border shadow-inner">
         ax² + bx + c = 0
       </div>
       <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase text-center">a</label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="input-field text-center font-bold" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase text-center">b</label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="input-field text-center font-bold" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase text-center">c</label>
            <input type="number" value={c} onChange={e => setC(e.target.value)} className="input-field text-center font-bold" />
          </div>
       </div>
       <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Kökleri Bul</button>

       {result && (
         <div className="result-container-premium animate-result">
            <div className="result-card-premium">
               {result.delta !== undefined && (
                  <div className="result-badge !mb-4">Delta (Δ) = {result.delta}</div>
               )}
               {result.type === "none" && <div className="text-red-500 font-bold">{result.msg}</div>}
               {result.type === "complex" && <div className="text-red-500 font-bold">Gerçek kök yoktur.</div>}
               {result.type === "linear" && (
                 <div>
                    <div className="text-xs font-bold text-muted uppercase mb-2">Denklem Kökü</div>
                    <div className="result-value-premium">x = {result.root.toFixed(3)}</div>
                 </div>
               )}
               {result.type === "one" && (
                 <div>
                    <div className="text-xs font-bold text-muted uppercase mb-2">Çakışık Kök</div>
                    <div className="result-value-premium">x = {result.x.toFixed(3)}</div>
                 </div>
               )}
               {result.type === "two" && (
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-6 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                       <span className="text-[10px] font-black text-accent-primary mb-2 block">X₁</span>
                       <span className="text-3xl font-black text-accent-primary">{result.x1.toFixed(3)}</span>
                    </div>
                    <div className="p-6 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                       <span className="text-[10px] font-black text-accent-primary mb-2 block">X₂</span>
                       <span className="text-3xl font-black text-accent-primary">{result.x2.toFixed(3)}</span>
                    </div>
                 </div>
               )}
            </div>
         </div>
       )}
    </div>
  );
}

// Asal Sayı Bulucu
export function PrimeNumberCalculator() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    let n = parseInt(num);
    if (!n || n <= 1) return setResult({ isPrime: false, carpanlar: [] });
    
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
       if (n % i === 0) { isPrime = false; break; }
    }

    const carpanlar = [];
    let temp = n;
    for (let i = 2; i <= temp; i++) {
        while (temp % i === 0) {
            carpanlar.push(i);
            temp = temp / i;
        }
    }
    setResult({ isPrime, carpanlar, n });
    if (isPrime) confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 }, colors: ["#10b981"] });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Sayıyı Giriniz</label>
        <input type="number" value={num} onChange={e => setNum(e.target.value)} className="input-field text-2xl font-black text-center" placeholder="Örn: 144" />
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Analiz Et</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className={`result-badge ${result.isPrime ? '!bg-green-500/10 !text-green-500 !border-green-500/20' : '!bg-red-500/10 !text-red-500 !border-red-500/20'}`}>
                 {result.isPrime ? "Asal Sayıdır" : "Asal Değildir"}
              </div>
              <div className={`result-value-premium ${result.isPrime ? '!text-green-500' : '!text-red-500'}`}>{result.n}</div>
              
              {!result.isPrime && result.carpanlar.length > 0 && (
                <div className="mt-8">
                   <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-3">Asal Çarpanlarına Ayrımı</div>
                   <div className="bg-bg-secondary p-6 rounded-2xl font-black text-xl tracking-[0.2em] border border-border shadow-inner">
                     {result.carpanlar.join(" × ")}
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}
