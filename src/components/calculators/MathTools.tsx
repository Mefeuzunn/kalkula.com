"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calculator, Ruler, ArrowLeftRight, Coins, Zap, Info, Infinity, Hash, MousePointer2 } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
  const [val, setVal] = useState("100");
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
      const a = n / phi;
      const b = n - a;
      setResults({ a, b, total: n });
    } else if (mode === "a") {
      const b = n / phi;
      const total = n + b;
      setResults({ a: n, b, total });
    } else {
      const a = n * phi;
      const total = a + n;
      setResults({ a, b: n, total });
    }
  }, [val, mode]);

  const reset = () => {
    setVal("100");
    setMode("long");
    setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="ALTIN ORAN ANALİZİ"
      icon="✨"
      infoText="Doğanın ve sanatın mükemmel oranı (Phi ≈ 1.618) ile estetik ölçülendirmeler yapın. Bir değerin altın oran parçalarını anında bulun."
      results={results && (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard color="amber" label="UZUN KENAR (a)" value={results.a.toFixed(3)} icon="📏" />
              <V2ResultCard color="emerald" label="KISA KENAR (b)" value={results.b.toFixed(3)} icon="📏" />
           </div>
           <V2ResultCard color="blue" label="TOPLAM UZUNLUK" value={results.total.toFixed(2)} icon="📐" className="!bg-blue-500/5 border-blue-500/20" />
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Select 
             label="GİRİŞ TİPİ" 
             value={mode} 
             onChange={setMode} 
             options={[
               { value: "long", label: "Toplam Uzunluk (a+b)" },
               { value: "a", label: "Uzun Kenar (a)" },
               { value: "b", label: "Kısa Kenar (b)" },
             ]}
           />
           <V2Input 
             label="DEĞER" 
             value={val} 
             onChange={setVal} 
             type="number" 
             placeholder="100" 
             unit="birim"
             fieldClassName="!text-3xl font-black italic"
           />
           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Hesaplama √" isCalculateDisabled={true} className="!mt-2" />
        </div>
        
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4 items-center">
           <Info className="w-5 h-5 text-amber-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Altın oran (Phi), bir doğru parçasının ikiye bölünmesiyle oluşan, uzun parçanın kısa parçaya oranı ile tüm uzunluğın uzun parçaya olan oranının eşit olduğu sayıdır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
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
      setResult({ value: "Sonsuz (Limit Aşıldı)", steps: "Sayı 170'ten büyük olduğu için sonuç JavaScript limiti üzerindedir." });
      return;
    }

    let res = 1;
    let steps = "1";
    for (let i = 2; i <= n; i++) {
      res *= i;
      if (n <= 10) steps += ` × ${i}`;
    }
    setResult({ value: res.toLocaleString("tr-TR"), steps: n <= 10 ? steps : `${n}! işlemi tamamlandı.` });
    if (n > 0) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#8b5cf6", "#ec4899"] });
  };

  const reset = () => {
    setNum("");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="FAKTÖRİYEL HESAPLAMA"
      icon="🔢"
      infoText="Bir pozitif tamsayının faktöriyelini (n!) hesaplayın. 170! değerine kadar hassas matematiksel çözümleme sağlar."
      results={result && (
        <div className="space-y-6">
           <V2ResultCard color="purple" label={`SONUÇ (${num}!)`} value={result.value} icon="🚀" className="!text-3xl font-black italic break-all" />
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic opacity-40">İŞLEM ADIMLARI</div>
              <div className="text-xs font-bold text-primary italic break-all">{result.steps}</div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Input 
             label="SAYI (n)" 
             value={num} 
             onChange={setNum} 
             type="number" 
             placeholder="10"
             fieldClassName="!text-5xl font-black italic text-center"
           />
           <V2ActionRow 
             onCalculate={calculate} 
             onReset={reset} 
             calculateLabel="Faktöriyel Hesapla"
             className="!mt-4"
           />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-500" />
              <div className="text-[10px] font-bold text-muted uppercase italic">HIZLI MOTOR</div>
           </div>
           <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <Infinity className="w-5 h-5 text-pink-500" />
              <div className="text-[10px] font-bold text-muted uppercase italic">YÜKSEK HASSASİYET</div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
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

  const reset = () => {
    setEn(""); setBoy(""); setBirimFiyat(""); setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="METREKARE HESAPLAMA"
      icon="📐"
      infoText="Alan ölçülerini hesaplayın ve metrekare birim fiyatı üzerinden tahmini maliyet analizi yapın. İnşaat ve emlak projeleri için uygundur."
      results={result && (
        <div className="space-y-6">
           <V2ResultCard color="emerald" label="TOPLAM ALAN" value={`${result.alan.toFixed(2)} m²`} icon="🏙️" className="!text-3xl font-black italic" />
           {result.toplamFiyat !== null && (
              <V2ResultCard color="blue" label="TAHMİNİ MALİYET" value={`₺${result.toplamFiyat.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`} icon="💰" />
           )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-2 gap-4">
              <V2Input label="EN (Metre)" value={en} onChange={setEn} type="number" placeholder="5" unit="m" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="BOY (Metre)" value={boy} onChange={setBoy} type="number" placeholder="4" unit="m" fieldClassName="!text-2xl font-black italic" />
           </div>
           
           <V2Input 
             label="m² BİRİM FİYATI (Opsiyonel)" 
             value={birimFiyat} 
             onChange={setBirimFiyat} 
             type="number" 
             placeholder="250" 
             unit="₺"
             fieldClassName="!text-xl font-bold text-emerald-400"
           />

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Hesaplama" isCalculateDisabled={true} className="!mt-2" />
        </div>

        <div className="p-4 rounded-3xl bg-emerald-600/5 border border-emerald-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-emerald-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>İpucu:</b> En ve boy değerlerini metre cinsinden giriniz. Virgüllü sayılar için nokta (.) kullanabilirsiniz.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
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

  const reset = () => {
    setA(""); setB(""); setC(""); setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="ORAN ORANTI"
      icon="⚖️"
      infoText="Doğru ve ters orantı denklemlerini anında çözün. Bilinen üç değerden dördüncü (X) değeri otomatik olarak bulun."
      results={result !== null && (
        <div className="space-y-6 animate-result">
           <V2ResultCard color="amber" label="BİLİNMEYEN (X) DEĞERİ" value={result.toFixed(2)} icon="❓" className="!text-4xl font-black italic" />
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
              <div className="text-[10px] font-black text-muted uppercase mb-2 italic">DENKLEM ŞEMASI</div>
              <div className="text-lg font-black text-amber-500 italic">
                 {isDirect ? `${a} / ${b} = ${c} / ${result.toFixed(2)}` : `${a} × ${b} = ${c} × ${result.toFixed(2)}`}
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="space-y-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                 <MousePointer2 className="w-4 h-4 text-amber-500" /> ORANTI TİPİ
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => setIsDirect(true)} 
                   className={`py-6 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all flex flex-col items-center gap-2 ${isDirect ? "bg-amber-500 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "bg-white/5 text-muted hover:bg-white/10"}`}
                 >
                    <ArrowLeftRight className="w-4 h-4" /> DOĞRU ORANTI
                 </button>
                 <button 
                   onClick={() => { setIsDirect(false); confetti({ particleCount: 10, spread: 30, origin: { y: 0.8 } }); }} 
                   className={`py-6 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all flex flex-col items-center gap-2 ${!isDirect ? "bg-amber-500 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "bg-white/5 text-muted hover:bg-white/10"}`}
                 >
                    <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">×</div> TERS ORANTI
                 </button>
              </div>
           </div>

           <div className="bg-white/5 p-8 rounded-[2.5rem] border-2 border-dashed border-white/10 space-y-8">
              <div className="flex items-center justify-center gap-6">
                 <V2Input label="A" value={a} onChange={setA} type="number" fieldClassName="w-24 !py-4 text-center !text-2xl font-black" className="!space-y-1" />
                 <span className="text-3xl pt-6 font-black text-muted">{isDirect ? "/" : "×"}</span>
                 <V2Input label="B" value={b} onChange={setB} type="number" fieldClassName="w-24 !py-4 text-center !text-2xl font-black" className="!space-y-1" />
              </div>
              <div className="flex items-center justify-center gap-4">
                 <div className="w-full h-px bg-white/10"></div>
                 <span className="text-xl font-black text-muted/30 italic">VE</span>
                 <div className="w-full h-px bg-white/10"></div>
              </div>
              <div className="flex items-center justify-center gap-6">
                 <V2Input label="C" value={c} onChange={setC} type="number" fieldClassName="w-24 !py-4 text-center !text-2xl font-black" className="!space-y-1" />
                 <span className="text-3xl pt-6 font-black text-muted">{isDirect ? "/" : "×"}</span>
                 <div className="w-24 h-16 mt-6 flex items-center justify-center border-4 border-amber-500/20 bg-amber-500/5 rounded-2xl text-2xl font-black text-amber-500 animate-pulse italic">X</div>
              </div>
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Çözümleme" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
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
      setResult("Sayı çok büyük! (Katrilyon limiti)");
      return;
    }
    setResult(numberToTurkishWords(n));
  }, [num]);

  const reset = () => {
    setNum("");
    setResult("");
  };

  return (
    <V2CalculatorWrapper
      title="SAYI OKUNUŞU"
      icon="🗣️"
      infoText="Girdiğiniz sayıların Türkçe yazılışını anında görün. Milyarlar ve trilyonlar seviyesindeki sayıları doğru şekilde kelimelere döker."
      results={result && (
        <V2ResultCard 
          color="indigo" 
          label="TÜRKÇE OKUNUŞU" 
          value={result} 
          icon="📖" 
          className="!text-xl font-bold leading-relaxed first-letter:uppercase"
        />
      )}
    >
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Input 
             label="SAYIYI GİRİNİZ" 
             value={num} 
             onChange={setNum} 
             type="number" 
             placeholder="1234"
             fieldClassName="!text-3xl font-black italic text-center"
           />
           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Çeviri" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}

// 6. Taban Dönüşümü (Base Converter)
export function BaseConverter() {
  const [val, setVal] = useState("FF");
  const [fromBase, setFromBase] = useState("16");
  const [toBase, setToBase] = useState("10");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!val) {
      setResult("");
      return;
    }
    try {
      const decimal = parseInt(val, parseInt(fromBase));
      if (isNaN(decimal)) {
        setResult("Geçersiz Karakter");
        return;
      }
      setResult(decimal.toString(parseInt(toBase)).toUpperCase());
    } catch (e) {
      setResult("Hata");
    }
  }, [val, fromBase, toBase]);

  const reset = () => {
    setVal("");
    setResult("");
  };

  return (
    <V2CalculatorWrapper
      title="TABAN DÖNÜŞTÜRÜCÜ"
      icon="🔢"
      infoText="Sayıları farklı sayı tabanları (Binary, Hex, Decimal vb.) arasında hızlıca dönüştürün. 2'lik tabandan 36'lık tabana kadar destekler."
      results={result && (
        <V2ResultCard 
          color="emerald" 
          label={`${toBase}. TABANDA SONUÇ`} 
          value={result} 
          icon="🔄" 
          className="!text-4xl font-black italic tracking-widest break-all"
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <V2Select 
                label="KAYNAK TABAN" 
                value={fromBase} 
                onChange={setFromBase} 
                options={[
                  { value: "2", label: "2 (Binary)" },
                  { value: "8", label: "8 (Octal)" },
                  { value: "10", label: "10 (Decimal)" },
                  { value: "16", label: "16 (Hex)" },
                  ...Array.from({ length: 31 }, (_, i) => ({ value: (i + 2).toString(), label: (i + 2).toString() }))
                ].filter((v, i, a) => a.findIndex(t => t.value === v.value) === i)}
              />
              <V2Select 
                label="HEDEF TABAN" 
                value={toBase} 
                onChange={setToBase} 
                options={[
                  { value: "2", label: "2 (Binary)" },
                  { value: "8", label: "8 (Octal)" },
                  { value: "10", label: "10 (Decimal)" },
                  { value: "16", label: "16 (Hex)" },
                  ...Array.from({ length: 31 }, (_, i) => ({ value: (i + 2).toString(), label: (i + 2).toString() }))
                ].filter((v, i, a) => a.findIndex(t => t.value === v.value) === i)}
              />
           </div>
           
           <V2Input 
             label={`DEĞER (${fromBase}. TABAN)`} 
             value={val} 
             onChange={setVal} 
             placeholder="FF" 
             fieldClassName="!text-3xl font-black uppercase text-center"
           />

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Dönüşüm" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
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
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#10b981", "#3b82f6"] });
  };

  const reset = () => {
    setAnapara(""); setFaiz(""); setSure(""); setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="BASİT FAİZ ANALİZİ"
      icon="💰"
      infoText="Anapara üzerinden belirli bir süre ve faiz oranı ile basit getiriyi hesaplayın. Kısa vadeli finansal planlamalar için idealdir."
      results={result && (
        <div className="space-y-6">
           <V2ResultCard color="emerald" label="FAİZ GETİRİSİ" value={`₺${result.getir.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`} icon="📈" className="!text-3xl font-black italic" />
           <V2ResultCard color="blue" label="TOPLAM TUTAR" value={`₺${result.toplam.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`} icon="🏦" />
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Input label="ANAPARA" value={anapara} onChange={setAnapara} type="number" placeholder="10.000" unit="₺" fieldClassName="!text-2xl font-black italic" />
           <div className="grid grid-cols-2 gap-4">
              <V2Input label="YILLIK FAİZ" value={faiz} onChange={setFaiz} type="number" placeholder="45" unit="%" fieldClassName="!text-xl font-bold" />
              <V2Input label="SÜRE (YIL)" value={sure} onChange={setSure} type="number" placeholder="1" unit="Yıl" fieldClassName="!text-xl font-bold" />
           </div>
           <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="Getiri Hesapla" className="!mt-4" />
        </div>
      </div>
    </V2CalculatorWrapper>
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
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#2563eb", "#8b5cf6"] });
  };

  const reset = () => {
    setAnapara(""); setFaiz(""); setSure(""); setPeriyod("1"); setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="BİLEŞİK FAİZ ANALİZİ"
      icon="💹"
      infoText="Getirinin tekrar anaparaya eklendiği bileşik faiz modelini simüle edin. Uzun vadeli birikimler ve yatırım projeksiyonları için uygundur."
      results={result && (
        <div className="space-y-6">
           <V2ResultCard color="blue" label="BİLEŞİK GETİRİ" value={`₺${result.getir.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`} icon="📈" className="!text-3xl font-black italic" />
           <V2ResultCard color="indigo" label="GELECEK DEĞER" value={`₺${result.toplam.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`} icon="💎" />
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Input label="ANAPARA" value={anapara} onChange={setAnapara} type="number" placeholder="10.000" unit="₺" fieldClassName="!text-2xl font-black italic" />
           <div className="grid grid-cols-2 gap-4">
              <V2Input label="YILLIK FAİZ (%)" value={faiz} onChange={setFaiz} type="number" placeholder="45" unit="%" fieldClassName="!text-xl font-bold" />
              <V2Input label="SÜRE (YIL)" value={sure} onChange={setSure} type="number" placeholder="1" unit="Yıl" fieldClassName="!text-xl font-bold" />
           </div>
           <V2Select 
             label="BİLEŞİK PERİYODU" 
             value={periyod} 
             onChange={setPeriyod} 
             options={[
               { value: "1", label: "Yıllık (1)" },
               { value: "2", label: "Yarım Yıllık (2)" },
               { value: "4", label: "Çeyrek Yıllık (4)" },
               { value: "12", label: "Aylık (12)" },
               { value: "365", label: "Günlük (365)" },
             ]}
           />
           <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="Simülasyonu Çalıştır" className="!mt-4" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}

// 9. Çevre Hesaplama (Dedicated 2D)
export function PerimeterCalculator() {
  const [shape, setShape] = useState("kare");
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [r, setR] = useState("7");
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
      if (!isNaN(valA)) setResult(3 * valA); else setResult(null);
    }
  }, [shape, a, b, r]);

  const reset = () => {
    setA("10"); setB("5"); setR("7"); setShape("kare");
  };

  return (
    <V2CalculatorWrapper
      title="ÇEVRE HESAPLAMA"
      icon="⭕"
      infoText="Temel 2D geometrik şekillerin çevre uzunluklarını hesaplayın. Kare, dikdörtgen, daire ve eşkenar üçgen desteği sunar."
      results={result !== null && (
        <V2ResultCard 
          color="emerald" 
          label="TOPLAM ÇEVRE" 
          value={`${result.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} br`} 
          icon="📏" 
          className="!text-4xl font-black italic"
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <V2Select 
             label="ŞEKİL SEÇİN" 
             value={shape} 
             onChange={setShape} 
             options={[
               { value: "kare", label: "Kare" },
               { value: "dikdortgen", label: "Dikdörtgen" },
               { value: "daire", label: "Daire (Çember)" },
               { value: "ucgen", label: "Eşkenar Üçgen" },
             ]}
           />

           <div className="grid grid-cols-1 gap-4">
              {shape !== "daire" && (
                <V2Input 
                  label={shape === "dikdortgen" ? "UZUN KENAR" : "KENAR UZUNLUĞU"} 
                  value={a} 
                  onChange={setA} 
                  type="number" 
                  placeholder="10" 
                  unit="br" 
                  fieldClassName="!text-2xl font-black italic"
                />
              )}
              {shape === "dikdortgen" && (
                <V2Input 
                  label="KISA KENAR" 
                  value={b} 
                  onChange={setB} 
                  type="number" 
                  placeholder="5" 
                  unit="br" 
                  fieldClassName="!text-2xl font-black italic"
                />
              )}
              {shape === "daire" && (
                <V2Input 
                  label="YARIÇAP (r)" 
                  value={r} 
                  onChange={setR} 
                  type="number" 
                  placeholder="7" 
                  unit="br" 
                  fieldClassName="!text-2xl font-black italic text-center"
                />
              )}
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Hesaplama" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}

// 10. İnç Hesaplama (Dedicated)
export function InchConverter() {
  const [val, setVal] = useState("1");
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

  const reset = () => {
    setVal("1");
    setToCm(true);
  };

  return (
    <V2CalculatorWrapper
      title="İNÇ DÖNÜŞTÜRÜCÜ"
      icon="📐"
      infoText="İnç ve Santimetre (CM) birimleri arasında hassas dönüşüm yapın. Ekran boyutları ve teknik çizimler için pratik kullanım sunar."
      results={result !== null && (
        <V2ResultCard 
          color="blue" 
          label="DÖNÜŞTÜRÜLEN DEĞER" 
          value={`${result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} ${toCm ? "cm" : "inç"}`} 
          icon="🧩" 
          className="!text-3xl font-black italic"
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setToCm(true)} 
                className={`py-4 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${toCm ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-muted hover:bg-white/10"}`}
              >
                 İNÇ → CM
              </button>
              <button 
                onClick={() => setToCm(false)} 
                className={`py-4 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${!toCm ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-muted hover:bg-white/10"}`}
              >
                 CM → İNÇ
              </button>
           </div>

           <V2Input 
             label={toCm ? "İNÇ DEĞERİ" : "CM DEĞERİ"} 
             value={val} 
             onChange={setVal} 
             type="number" 
             placeholder="1" 
             fieldClassName="!text-3xl font-black italic text-center"
           />
           
           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Dönüşüm" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}

// 11. Mil Hesaplama (Dedicated)
export function MileConverter() {
  const [val, setVal] = useState("1");
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

  const reset = () => {
    setVal("1");
    setToKm(true);
  };

  return (
    <V2CalculatorWrapper
      title="MİL DÖNÜŞTÜRÜCÜ"
      icon="🛣️"
      infoText="Mil ve Kilometre (KM) birimleri arasında hızlı dönüşüm yapın. Mesafe hesaplamaları ve hız limitleri için uygundur."
      results={result !== null && (
        <V2ResultCard 
          color="emerald" 
          label="DÖNÜŞTÜRÜLEN DEĞER" 
          value={`${result.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} ${toKm ? "km" : "mil"}`} 
          icon="📍" 
          className="!text-3xl font-black italic"
        />
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setToKm(true)} 
                className={`py-4 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${toKm ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-muted hover:bg-white/10"}`}
              >
                 MİL → KM
              </button>
              <button 
                onClick={() => setToKm(false)} 
                className={`py-4 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${!toKm ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-muted hover:bg-white/10"}`}
              >
                 KM → MİL
              </button>
           </div>

           <V2Input 
             label={toKm ? "MİL DEĞERİ" : "KM DEĞERİ"} 
             value={val} 
             onChange={setVal} 
             type="number" 
             placeholder="1" 
             fieldClassName="!text-3xl font-black italic text-center"
           />
           
           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Dönüşüm" isCalculateDisabled={true} className="!mt-2" />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
