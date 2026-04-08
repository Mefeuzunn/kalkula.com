"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Percent, FileText, Banknote, Calculator, Star, ArrowRight, CheckCircle, AlertTriangle, PieChart, ShieldCheck, Receipt } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

// KDV Hesaplama
export function KdvCalculator() {
  const [tutar, setTutar] = useState("");
  const [kdvOran, setKdvOran] = useState("20");
  const [mod, setMod] = useState<"dahil" | "haric">("haric");
  const [result, setResult] = useState<null | { kdv: number; net: number; gross: number }>(null);

  const hesapla = () => {
    const t = parseFloat(tutar);
    const r = parseFloat(kdvOran) / 100;
    if (!t || isNaN(t)) return;

    let res;
    if (mod === "haric") {
      const kdv = t * r;
      res = { kdv, net: t, gross: t + kdv };
    } else {
      const net = t / (1 + r);
      const kdv = t - net;
      res = { kdv, net, gross: t };
    }
    setResult(res);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setTutar("");
    setKdvOran("20");
    setMod("haric");
    setResult(null);
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="KDV HESAPLA"
      icon="🧾"
      infoText="KDV dahil veya hariç tutarlarınızı anında hesaplayın. %1, %10 veya %20 gibi standart oranların yanı sıra özel oran da belirleyebilirsiniz."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            label={mod === "haric" ? "KDV DAHİL TOPLAM" : "KDV HARİÇ TUTAR"}
            value={fmt(mod === "haric" ? result.gross : result.net)}
            subLabel={`KDV Oranı: %${kdvOran}`}
            icon="📊"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Hesaplama Detayı</div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Net Tutar (KDV Hariç):</span>
                   <span className="text-primary font-bold">{fmt(result.net)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">Hesaplanan KDV:</span>
                   <span className="text-blue-500 font-bold">+{fmt(result.kdv)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">Genel Toplam:</span>
                   <span className="text-primary font-black">{fmt(result.gross)}</span>
                </div>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-1 rounded-2xl bg-white/5 border border-white/5 flex gap-1">
           {(["haric", "dahil"] as const).map(m => (
             <button 
               key={m} 
               onClick={() => setMod(m)}
               className={`flex-1 py-4 rounded-xl font-black italic text-xs uppercase tracking-widest transition-all ${
                 mod === m 
                 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                 : "text-muted hover:bg-white/5"
               }`}
             >
               KDV {m === "haric" ? "HARİÇ" : "DAHİL"}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label={mod === "haric" ? "MATRAH (KDV HARİÇ)" : "TOPLAM (KDV DAHİL)"} 
             value={tutar} 
             onChange={setTutar} 
             unit="₺" 
             placeholder="1000" 
           />
           <div className="space-y-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-2 italic text-left">KDV ORANI (%)</div>
              <div className="flex gap-2">
                 {["1", "10", "20"].map(o => (
                   <button 
                     key={o} 
                     onClick={() => setKdvOran(o)}
                     className={`flex-1 py-4 rounded-2xl font-black italic border-b-4 transition-all ${
                       kdvOran === o 
                       ? "bg-blue-600 text-white border-blue-800" 
                       : "bg-white/5 text-muted border-white/10 hover:bg-white/10"
                     }`}
                   >
                     %{o}
                   </button>
                 ))}
                 <input 
                   type="number" 
                   value={kdvOran} 
                   onChange={e => setKdvOran(e.target.value)}
                   className="w-20 bg-white/5 border border-white/10 rounded-2xl text-center font-black italic focus:outline-none focus:border-blue-500/50"
                   placeholder="Özel"
                 />
              </div>
           </div>
        </div>

        <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="📉 KDV Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}

// Damga Vergisi
export function DamgaVergisiCalculator() {
  const [tutar, setTutar] = useState("");
  const [tur, setTur] = useState("sozlesme");
  const [result, setResult] = useState<null | { oran: number; vergi: number }>(null);

  const ORANLAR: Record<string, { label: string; oran: number }> = {
    sozlesme: { label: "Sözleşmeler", oran: 0.00948 },
    kira: { label: "Kira Sözleşmeleri", oran: 0.00189 },
    maas: { label: "Maaş/Ücret Bordrosu", oran: 0.00759 },
    banka: { label: "Banka Kredi Sözleşmeleri", oran: 0.00948 },
    teklif: { label: "İhale Teklif Mektubu", oran: 0.00591 },
  };

  const hesapla = () => {
    const t = parseFloat(tutar);
    if (!t || isNaN(t)) return;
    const { oran } = ORANLAR[tur];
    setResult({ oran, vergi: t * oran });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setTutar("");
    setTur("sozlesme");
    setResult(null);
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="DAMGA VERGİSİ HESAPLA"
      icon="📄"
      infoText="Sözleşme, kira veya bordro gibi farklı işlem türlerine göre güncel damga vergisi tutarını anında hesaplayın."
      results={result && (
        <V2ResultCard
          color="amber"
          label="ÖDENECEK VERGİ"
          value={fmt(result.vergi)}
          subLabel={`Uygulanan Oran: ‰${(result.oran * 1000).toFixed(2)}`}
          icon="🏦"
        />
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Select 
             label="İŞLEM TÜRÜ" 
             value={tur} 
             onChange={setTur} 
             options={Object.entries(ORANLAR).map(([k, v]) => ({
                value: k,
                label: `${v.label} (‰${(v.oran * 1000).toFixed(2)})`
             }))}
           />
           <V2Input label="MATRAH (TUTAR)" value={tutar} onChange={setTutar} unit="₺" placeholder="50000" />
        </div>

        <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="📄 Vergi Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}

// Gelir Vergisi
export function GelirVergisiCalculator() {
  const [brutMaas, setBrutMaas] = useState("");
  const [ay, setAy] = useState("1");
  const [result, setResult] = useState<null | { matrah: number; vergi: number; net: number; sgkIsci: number; issizlik: number }>(null);

  const hesapla = () => {
    const brut = parseFloat(brutMaas);
    if (!brut || isNaN(brut)) return;

    const sgkIsci = brut * 0.14;
    const issizlik = brut * 0.01;
    const matrah = brut - sgkIsci - issizlik;

    // 2026 Gelir Vergisi Dilimleri
    let vergi = 0;
    const dilimler = [
      { limit: 230000, oran: 0.15 },
      { limit: 580000, oran: 0.20 },
      { limit: 1200000, oran: 0.27 },
      { limit: 5000000, oran: 0.35 },
      { limit: Infinity, oran: 0.40 },
    ];

    const aylikMatrah = matrah * parseInt(ay);
    let kalan = aylikMatrah;
    let prev = 0;
    for (const d of dilimler) {
      if (kalan <= 0) break;
      const dilimTutar = Math.min(kalan, d.limit - prev);
      vergi += dilimTutar * d.oran;
      kalan -= dilimTutar;
      prev = d.limit;
    }

    const damga = brut * 0.00759;
    const toplamKesinti = sgkIsci + issizlik + vergi / parseInt(ay) + damga;
    const net = brut - toplamKesinti;

    setResult({ matrah: aylikMatrah, vergi: vergi / parseInt(ay), net, sgkIsci, issizlik });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setBrutMaas("");
    setAy("1");
    setResult(null);
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="GELİR VERGİSİ (MAAŞ)"
      icon="💰"
      infoText="Maaş matrahı üzerinden 2026 yılı gelir vergisi dilimlerine göre aylık net kazancınızı ve vergi yükünüzü hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="TAHMİNİ NET MAAŞ"
            value={fmt(result.net)}
            subLabel="Aylık Ele Geçen Tutarı"
            icon="🏦"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black text-muted uppercase italic mb-1">SGK + İŞSİZLİK (%15)</div>
                <div className="text-sm font-black text-primary italic">{fmt(result.sgkIsci + result.issizlik)}</div>
             </div>
             <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                <div className="text-[10px] font-black text-red-500/70 uppercase italic mb-1">GELİR VERGİSİ</div>
                <div className="text-sm font-black text-red-500 italic">{fmt(result.vergi)}</div>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="AYLIK BRÜT MAAŞ" value={brutMaas} onChange={setBrutMaas} unit="₺" placeholder="25000" />
           <V2Select 
             label="HESAPLAMA AYI (KÜMÜLATİF)" 
             value={ay} 
             onChange={setAy} 
             options={Array.from({ length: 12 }, (_, i) => ({
                value: (i + 1).toString(),
                label: `${i + 1}. Ay`
             }))}
           />
        </div>

        <V2ActionRow onCalculate={hesapla} onReset={reset} calculateLabel="💰 Maaşı Hesapla" />
      </div>
    </V2CalculatorWrapper>
  );
}
