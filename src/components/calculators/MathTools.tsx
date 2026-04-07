"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

// --- Helper: Turkish Number to Words ---
function numberToTurkishWords(num: number): string {
  if (num === 0) return "sıfır";
  if (num < 0) return "eksi " + numberToTurkishWords(Math.abs(num));

  const birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  const onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
  const binler = ["", "bin", "milyon", "milyar", "trilyon", "katrilyon"];

  let words = "";
  let step = 0;

  let n = Math.floor(num);
  
  while (n > 0) {
    let part = n % 1000;
    if (part > 0) {
      let partWords = "";
      
      // Yüzler
      let yuz = Math.floor(part / 100);
      if (yuz > 1) partWords += birler[yuz] + " yüz ";
      else if (yuz === 1) partWords += "yüz ";
      
      // Onlar ve Birler
      let kalan = part % 100;
      let on = Math.floor(kalan / 10);
      let bir = kalan % 10;
      
      partWords += onlar[on] + " " + birler[bir];
      
      // İstisna: "bir bin" -> "bin"
      if (step === 1 && part === 1) {
        words = "bin " + words;
      } else {
        words = partWords.trim() + " " + binler[step] + " " + words;
      }
    }
    n = Math.floor(n / 1000);
    step++;
  }

  return words.trim();
}

// 1. Altın Oran Hesaplama
export function GoldenRatioCalculator() {
  const [val, setVal] = useState("");
  const [mode, setMode] = useState("long"); // long side (a+b), short side (a)
  const [results, setResults] = useState<any>(null);

  const phi = 1.61803398875;

  useEffect(() => {
    const n = parseFloat(val);
    if (!n || isNaN(n)) {
      setResults(null);
      return;
    }

    if (mode === "long") {
      // n is a+b
      const a = n / phi;
      const b = n - a;
      setResults({ a, b, total: n });
    } else if (mode === "a") {
      // n is a
      const b = n / phi;
      const total = n + b;
      setResults({ a: n, b, total });
    } else {
      // n is b
      const a = n * phi;
      const total = a + n;
      setResults({ a, b: n, total });
    }
  }, [val, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Giriş Tipi</label>
        <select value={mode} onChange={e => setMode(e.target.value)} className="input-field font-bold">
          <option value="long">Toplam Uzunluk (a + b)</option>
          <option value="a">Uzun Kenar (a)</option>
          <option value="b">Kısa Kenar (b)</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Değer</label>
        <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field text-xl font-bold" placeholder="Örn: 100" />
      </div>

      {results && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Altın Oran Dağılımı</div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-bg-secondary p-4 rounded-xl border border-border shadow-sm">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Uzun Kenar (a)</div>
                   <div className="text-lg font-bold">{results.a.toFixed(3)}</div>
                </div>
                <div className="bg-bg-secondary p-4 rounded-xl border border-border shadow-sm">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Kısa Kenar (b)</div>
                   <div className="text-lg font-bold">{results.b.toFixed(3)}</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-accent-glow/5 border border-accent-primary/10 rounded-xl">
                 <div className="text-[10px] font-black text-accent-primary uppercase mb-1 text-center">Toplam</div>
                 <div className="text-2xl font-black text-center text-accent-primary">{results.total.toFixed(2)}</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 2. Faktöriyel Hesaplama
export function FactorialCalculator() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const n = parseInt(num);
    if (isNaN(n) || n < 0) return;
    if (n > 170) {
      setResult({ value: "Sonsuz (Çok Büyük)", steps: "" });
      return;
    }

    let res = 1;
    let steps = "1";
    for (let i = 2; i <= n; i++) {
      res *= i;
      if (n <= 10) steps += ` × ${i}`;
    }
    setResult({ value: res.toLocaleString("tr-TR"), steps: n <= 10 ? steps : `${n}! işlemi yapıldı.` });
    if (n > 0) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Sayı (n)</label>
        <input type="number" value={num} onChange={e => setNum(e.target.value)} className="input-field text-2xl font-black text-center" placeholder="10" />
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={calculate}>Faktöriyel Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Sonuç (n!)</div>
              <div className="result-value-premium !text-3xl break-all">{result.value}</div>
              <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-6 opacity-60">
                 {result.steps}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 3. Metrekare Hesaplama
export function SquareMeterCalculator() {
  const [en, setEn] = useState("");
  const [boy, setBoy] = useState("");
  const [birimFiyat, setBirimFiyat] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const e = parseFloat(en);
    const b = parseFloat(boy);
    const f = parseFloat(birimFiyat);

    if (isNaN(e) || isNaN(b)) {
      setResult(null);
      return;
    }

    const alan = e * b;
    const toplamFiyat = isNaN(f) ? null : alan * f;
    setResult({ alan, toplamFiyat });
  }, [en, boy, birimFiyat]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">En (m)</label>
          <input type="number" value={en} onChange={e => setEn(e.target.value)} className="input-field font-bold" placeholder="5" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Boy (m)</label>
          <input type="number" value={boy} onChange={e => setBoy(e.target.value)} className="input-field font-bold" placeholder="4" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">m² Birim Fiyatı (Opsiyonel ₺)</label>
        <input type="number" value={birimFiyat} onChange={e => setBirimFiyat(e.target.value)} className="input-field font-bold text-green-600 dark:text-green-400" placeholder="Örn: 250" />
      </div>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-blue-500/10 !text-blue-500 !border-blue-500/20">Toplam Alan</div>
              <div className="result-value-premium !text-blue-500">{result.alan.toFixed(2)} <span className="text-2xl font-black">m²</span></div>
              
              {result.toplamFiyat !== null && (
                <div className="mt-8 pt-8 border-t border-border">
                   <div className="text-[10px] font-black text-muted uppercase mb-1">Tahmini Toplam Maliyet</div>
                   <div className="text-3xl font-black text-green-500">₺{result.toplamFiyat.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}

// 4. Oran Orantı Hesaplama (Ratio)
export function RatioCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [isDirect, setIsDirect] = useState(true); // Doğru / Ters Orantı
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC) || valA === 0) {
      setResult(null);
      return;
    }

    if (isDirect) {
      // a/b = c/x => x = (b*c)/a
      setResult((valB * valC) / valA);
    } else {
      // a*b = c*x => x = (a*b)/c
      if (valC === 0) return;
      setResult((valA * valB) / valC);
    }
  }, [a, b, c, isDirect]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Orantı Tipi</label>
        <div className="grid grid-cols-2 gap-2 bg-bg-secondary p-1 rounded-xl border border-border">
           <button onClick={() => setIsDirect(true)} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${isDirect ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Doğru Orantı</button>
           <button onClick={() => setIsDirect(false)} className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${!isDirect ? "bg-accent-primary text-white shadow-lg" : "text-muted hover:bg-white/5"}`}>Ters Orantı</button>
        </div>
      </div>

      <div className="bg-bg-secondary/50 p-6 rounded-3xl border border-border shadow-inner">
         <div className="flex items-center justify-center gap-4">
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-16 input-field font-black text-center p-2" placeholder="a" />
            <span className="text-xl font-black text-muted">{isDirect ? "->" : "×"}</span>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-16 input-field font-black text-center p-2" placeholder="b" />
         </div>
         <div className="flex items-center justify-center gap-4 mt-6">
            <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-16 input-field font-black text-center p-2" placeholder="c" />
            <span className="text-xl font-black text-muted">{isDirect ? "->" : "×"}</span>
            <div className={`w-16 h-12 flex items-center justify-center bg-accent-glow/10 border-2 border-dashed border-accent-primary/30 rounded-xl text-accent-primary font-black text-xl animate-pulse`}>
               X
            </div>
         </div>
      </div>

      {result !== null && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">X Değeri</div>
              <div className="result-value-premium">{result.toFixed(2)}</div>
              <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-6 opacity-60">
                 {isDirect ? `${a} / ${b} = ${c} / ${result.toFixed(2)}` : `${a} × ${b} = ${c} × ${result.toFixed(2)}`}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 5. Sayı Okunuşu Hesaplama
export function NumberToWordsCalculator() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const n = parseFloat(num);
    if (isNaN(n)) {
      setResult("");
      return;
    }
    if (n > 999999999999999) {
      setResult("Sayı çok büyük!");
      return;
    }
    setResult(numberToTurkishWords(n));
  }, [num]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Sayıyı Giriniz</label>
        <input type="number" value={num} onChange={e => setNum(e.target.value)} className="input-field text-2xl font-black text-center" placeholder="1234" />
      </div>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium !text-left">
              <div className="result-badge">Sayı Okunuşu (TR)</div>
              <div className="text-xl font-bold leading-relaxed first-letter:uppercase text-accent-primary mt-4">
                 {result}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 6. Taban Dönüşümü (Base Converter)
export function BaseConverter() {
  const [val, setVal] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!val) {
      setResult("");
      return;
    }
    try {
      const decimal = parseInt(val, parseInt(fromBase));
      if (isNaN(decimal)) {
        setResult("Geçersiz karakter!");
        return;
      }
      setResult(decimal.toString(parseInt(toBase)).toUpperCase());
    } catch (e) {
      setResult("Hata!");
    }
  }, [val, fromBase, toBase]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Kaynak Taban</label>
          <select value={fromBase} onChange={e => setFromBase(e.target.value)} className="input-field font-bold">
            <option value="2">2 (Binary)</option>
            <option value="8">8 (Octal)</option>
            <option value="10">10 (Decimal)</option>
            <option value="16">16 (Hexadecimal)</option>
            {[...Array(31)].map((_, i) => (
               <option key={i+2} value={i+2}>{i+2}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Hedef Taban</label>
          <select value={toBase} onChange={e => setToBase(e.target.value)} className="input-field font-bold">
            <option value="2">2 (Binary)</option>
            <option value="8">8 (Octal)</option>
            <option value="10">10 (Decimal)</option>
            <option value="16">16 (Hexadecimal)</option>
            {[...Array(31)].map((_, i) => (
               <option key={i+2} value={i+2}>{i+2}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Değer ({fromBase}. Taban)</label>
        <input type="text" value={val} onChange={e => setVal(e.target.value)} className="input-field text-xl font-bold uppercase" placeholder="Örn: FF" />
      </div>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Dönüştürülen Değer ({toBase}. Taban)</div>
              <div className="result-value-premium break-all uppercase tracking-widest">{result}</div>
           </div>
        </div>
      )}
    </div>
  );
}

// 7. Basit Faiz (Math version)
export function SimpleInterestMath() {
  const [anapara, setAnapara] = useState("");
  const [faiz, setFaiz] = useState("");
  const [sure, setSure] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const p = parseFloat(anapara);
    const r = parseFloat(faiz) / 100;
    const t = parseFloat(sure);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const getir = p * r * t;
    const toplam = p + getir;
    setResult({ getir, toplam });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Anapara (₺)</label>
          <input type="number" value={anapara} onChange={e => setAnapara(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Faiz (%)</label>
          <input type="number" value={faiz} onChange={e => setFaiz(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Süre (Yıl)</label>
          <input type="number" value={sure} onChange={e => setSure(e.target.value)} className="input-field font-bold" />
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Faiz Getirisi</div>
              <div className="result-value-premium">₺{result.getir.toLocaleString("tr-TR")}</div>
              <div className="mt-6 pt-6 border-t border-border">
                 <div className="text-[10px] font-black text-muted uppercase mb-1">Toplam Tutar</div>
                 <div className="text-2xl font-black text-accent-primary">₺{result.toplam.toLocaleString("tr-TR")}</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 8. Bileşik Faiz (Math version)
export function CompoundInterestMath() {
  const [anapara, setAnapara] = useState("");
  const [faiz, setFaiz] = useState("");
  const [sure, setSure] = useState("");
  const [periyod, setPeriyod] = useState("1"); // Yıllık
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const p = parseFloat(anapara);
    const r = parseFloat(faiz) / 100;
    const t = parseFloat(sure);
    const n = parseInt(periyod);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    // A = P(1 + r/n)^(nt)
    const toplam = p * Math.pow((1 + r / n), (n * t));
    const getir = toplam - p;
    setResult({ getir, toplam });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Anapara (₺)</label>
          <input type="number" value={anapara} onChange={e => setAnapara(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Faiz (%)</label>
          <input type="number" value={faiz} onChange={e => setFaiz(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Süre (Yıl)</label>
          <input type="number" value={sure} onChange={e => setSure(e.target.value)} className="input-field font-bold" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Bileşik Periyodu</label>
          <select value={periyod} onChange={e => setPeriyod(e.target.value)} className="input-field font-bold">
            <option value="1">Yıllık (1)</option>
            <option value="2">Yarım Yıllık (2)</option>
            <option value="4">Çeyrek Yıllık (4)</option>
            <option value="12">Aylık (12)</option>
            <option value="365">Günlük (365)</option>
          </select>
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Bileşik Getiri</div>
              <div className="result-value-premium">₺{result.getir.toLocaleString("tr-TR")}</div>
              <div className="mt-6 pt-6 border-t border-border">
                 <div className="text-[10px] font-black text-muted uppercase mb-1">Gelecek Değer (Birikim)</div>
                 <div className="text-2xl font-black text-accent-primary">₺{result.toplam.toLocaleString("tr-TR")}</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// 9. Çevre Hesaplama (Dedicated 2D)
export function PerimeterCalculator() {
  const [shape, setShape] = useState("kare");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [r, setR] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valR = parseFloat(r);
    const PI = Math.PI;

    if (shape === "kare") {
      if (!isNaN(valA)) setResult(4 * valA); else setResult(null);
    } else if (shape === "dikdortgen") {
      if (!isNaN(valA) && !isNaN(valB)) setResult(2 * (valA + valB)); else setResult(null);
    } else if (shape === "daire") {
      if (!isNaN(valR)) setResult(2 * PI * valR); else setResult(null);
    } else if (shape === "ucgen") {
      // Assuming equilateral for simplicity or as a generic placeholder
      if (!isNaN(valA)) setResult(3 * valA); else setResult(null);
    }
  }, [shape, a, b, r]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-muted uppercase px-1">Şekil Seçin</label>
        <select value={shape} onChange={e => setShape(e.target.value)} className="input-field font-bold">
          <option value="kare">Kare</option>
          <option value="dikdortgen">Dikdörtgen</option>
          <option value="daire">Daire (Çember)</option>
          <option value="ucgen">Eşkenar Üçgen</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shape !== "daire" && (
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <label className="text-xs font-bold text-muted uppercase px-1">{shape === "dikdortgen" ? "Uzun Kenar" : "Kenar"}</label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="input-field font-bold" />
          </div>
        )}
        {shape === "dikdortgen" && (
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <label className="text-xs font-bold text-muted uppercase px-1">Kısa Kenar</label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="input-field font-bold" />
          </div>
        )}
        {shape === "daire" && (
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-xs font-bold text-muted uppercase px-1">Yarıçap (r)</label>
            <input type="number" value={r} onChange={e => setR(e.target.value)} className="input-field font-bold" />
          </div>
        )}
      </div>

      {result !== null && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Toplam Çevre</div>
              <div className="result-value-premium">{result.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} <span className="text-2xl font-black">birim</span></div>
           </div>
        </div>
      )}
    </div>
  );
}

// 10. İnç Hesaplama (Dedicated)
export function InchConverter() {
  const [val, setVal] = useState("");
  const [toCm, setToCm] = useState(true);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const v = parseFloat(val);
    if (isNaN(v)) {
      setResult(null);
      return;
    }
    if (toCm) setResult(v * 2.54);
    else setResult(v / 2.54);
  }, [val, toCm]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-bg-secondary p-1 rounded-xl border border-border">
         <button onClick={() => setToCm(true)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${toCm ? "bg-accent-primary text-white shadow-lg" : "text-muted"}`}>İnç &rarr; CM</button>
         <button onClick={() => setToCm(false)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${!toCm ? "bg-accent-primary text-white shadow-lg" : "text-muted"}`}>CM &rarr; İnç</button>
      </div>
      <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field text-2xl font-black text-center" placeholder={toCm ? "İnç Değeri" : "CM Değeri"} />

      {result !== null && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Dönüştürülen Değer</div>
              <div className="result-value-premium">{result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} <span className="text-2xl font-black">{toCm ? "cm" : "inç"}</span></div>
           </div>
        </div>
      )}
    </div>
  );
}

// 11. Mil Hesaplama (Dedicated)
export function MileConverter() {
  const [val, setVal] = useState("");
  const [toKm, setToKm] = useState(true);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const v = parseFloat(val);
    if (isNaN(v)) {
      setResult(null);
      return;
    }
    if (toKm) setResult(v * 1.60934);
    else setResult(v / 1.60934);
  }, [val, toKm]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-bg-secondary p-1 rounded-xl border border-border">
         <button onClick={() => setToKm(true)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${toKm ? "bg-accent-primary text-white shadow-lg" : "text-muted"}`}>Mil &rarr; KM</button>
         <button onClick={() => setToKm(false)} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${!toKm ? "bg-accent-primary text-white shadow-lg" : "text-muted"}`}>KM &rarr; Mil</button>
      </div>
      <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field text-2xl font-black text-center" placeholder={toKm ? "Mil Değeri" : "KM Değeri"} />

      {result !== null && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Dönüştürülen Değer</div>
              <div className="result-value-premium">{result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} <span className="text-2xl font-black">{toKm ? "km" : "mil"}</span></div>
           </div>
        </div>
      )}
    </div>
  );
}
