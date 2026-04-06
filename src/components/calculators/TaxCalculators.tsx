"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

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
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 bg-secondary/30 p-1 rounded-xl border border-border">
        {(["haric", "dahil"] as const).map(m => (
          <button key={m} onClick={() => setMod(m)}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${mod === m ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-primary'}`}>
            KDV {m === "haric" ? "Hariç" : "Dahil"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">
          Tutar (KDV {mod === "haric" ? "Hariç" : "Dahil"}) ₺
        </label>
        <input type="number" placeholder="Örn: 1000" value={tutar} onChange={e => setTutar(e.target.value)}
          className="input-field text-xl font-bold py-4" />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">KDV Oranı</label>
        <div className="flex gap-2 flex-wrap">
          {["1", "10", "20"].map(o => (
            <button key={o} onClick={() => setKdvOran(o)}
              className={`px-6 py-2.5 rounded-xl font-bold border-2 transition-all ${kdvOran === o ? 'bg-accent-glow border-accent-primary text-accent-primary' : 'bg-surface border-border text-muted hover:border-muted'}`}>
              %{o}
            </button>
          ))}
          <input type="number" value={kdvOran} onChange={e => setKdvOran(e.target.value)}
            className="w-24 px-4 py-2 border-2 border-border rounded-xl text-center font-bold focus:border-accent-primary outline-none"
            placeholder="Özel" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Hesaplama Sonucu</div>
              <div className="result-value-premium">₺{fmt(result.gross)}</div>
              <div className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">KDV Dahil Toplam</div>
              
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-muted">KDV Hariç Tutar:</span>
                   <span className="text-primary font-bold">₺{fmt(result.net)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-accent-primary">
                   <span className="opacity-70">Hesaplanan KDV (%{kdvOran}):</span>
                   <span className="font-black">₺{fmt(result.kdv)}</span>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
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
    confetti({ particleCount: 30, spread: 30, origin: { y: 0.8 } });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">İşlem Türü</label>
        <select value={tur} onChange={e => setTur(e.target.value)} className="input-field text-lg font-bold h-[60px]">
          {Object.entries(ORANLAR).map(([k, v]) => (
            <option key={k} value={k}>{v.label} (‰{(v.oran * 1000).toFixed(2)})</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Matrah (₺)</label>
        <input type="number" placeholder="Örn: 50000" value={tutar} onChange={e => setTutar(e.target.value)} className="input-field text-xl font-bold py-4" />
      </div>

      <button className="btn-primary py-4 text-lg font-bold" onClick={hesapla}>Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Ödenecek Vergi</div>
              <div className="result-value-premium">₺{fmt(result.vergi)}</div>
              <div className="text-[10px] font-black text-muted uppercase tracking-widest mt-2">
                 Uygulanan Oran: ‰{(result.oran * 1000).toFixed(2)}
              </div>
           </div>
        </div>
      )}
    </div>
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
      { limit: 110000, oran: 0.15 },
      { limit: 230000, oran: 0.20 },
      { limit: 870000, oran: 0.27 },
      { limit: 3000000, oran: 0.35 },
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
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#22c55e", "#10b981"] });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-amber-500/10 border-2 border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
         <span className="text-xl">💡</span>
         <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-normal">
           2026 yılı gelir vergisi dilimlerine göre hesaplanır. Sonuçlar tahmini olup profesyonel danışmanlık yerine geçmez.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Aylık Brüt Maaş (₺)</label>
           <input type="number" placeholder="Örn: 25000" value={brutMaas} onChange={e => setBrutMaas(e.target.value)} className="input-field text-lg font-bold" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-muted uppercase px-1">Hesaplama Ayı</label>
           <select value={ay} onChange={e => setAy(e.target.value)} className="input-field text-lg font-bold">
             {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
               <option key={m} value={m}>{m}. Ay (Kümülatif)</option>
             ))}
           </select>
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={hesapla}>Maaşı Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-green-500/10 !text-green-500 !border-green-500/20">Tahmini Net Maaş</div>
              <div className="result-value-premium !text-green-500">₺{fmt(result.net)}</div>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/20 rounded-xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">SGK + İŞSİZLİK (%15)</div>
                    <div className="font-bold text-sm">₺{fmt(result.sgkIsci + result.issizlik)}</div>
                 </div>
                 <div className="text-left p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                    <div className="text-[10px] font-black text-red-400 uppercase mb-1">GELİR VERGİSİ</div>
                    <div className="font-bold text-sm text-red-500">₺{fmt(result.vergi)}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
