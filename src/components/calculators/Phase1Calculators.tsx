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
