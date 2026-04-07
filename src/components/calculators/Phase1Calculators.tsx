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
