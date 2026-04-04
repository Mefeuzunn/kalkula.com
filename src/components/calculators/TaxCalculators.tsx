"use client";

import { useState } from "react";

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

    if (mod === "haric") {
      const kdv = t * r;
      setResult({ kdv, net: t, gross: t + kdv });
    } else {
      const net = t / (1 + r);
      const kdv = t - net;
      setResult({ kdv, net, gross: t });
    }
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", background: "var(--bg-secondary)", borderRadius: "8px", padding: "4px" }}>
        {(["haric", "dahil"] as const).map(m => (
          <button key={m} onClick={() => setMod(m)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", background: mod === m ? "var(--accent-primary)" : "transparent", color: mod === m ? "white" : "var(--text-secondary)", transition: "all 0.2s" }}>
            KDV {m === "haric" ? "Hariç" : "Dahil"}
          </button>
        ))}
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
          Tutar (KDV {mod === "haric" ? "Hariç" : "Dahil"}) ₺
        </label>
        <input type="number" placeholder="Örn: 1000" value={tutar} onChange={e => setTutar(e.target.value)}
          className="input-field" />
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>KDV Oranı</label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["1", "10", "20"].map(o => (
            <button key={o} onClick={() => setKdvOran(o)}
              style={{ padding: "0.45rem 1rem", borderRadius: "7px", border: `1px solid ${kdvOran === o ? "var(--accent-primary)" : "var(--border)"}`, background: kdvOran === o ? "var(--accent-glow)" : "var(--surface)", color: kdvOran === o ? "var(--accent-primary)" : "var(--text-secondary)", fontWeight: 600, cursor: "pointer" }}>
              %{o}
            </button>
          ))}
          <input type="number" value={kdvOran} onChange={e => setKdvOran(e.target.value)}
            style={{ width: "80px", padding: "0.45rem 0.75rem", border: "1px solid var(--border)", borderRadius: "7px", background: "var(--surface)", color: "var(--text-primary)", fontFamily: "inherit", textAlign: "center" }}
            placeholder="Özel" />
        </div>
      </div>

      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { label: "KDV Hariç Tutar", value: `₺${fmt(result.net)}`, highlight: false },
            { label: `KDV Tutarı (%${kdvOran})`, value: `₺${fmt(result.kdv)}`, highlight: false },
            { label: "KDV Dahil Tutar", value: `₺${fmt(result.gross)}`, highlight: true },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{r.label}</span>
              <span style={{ fontWeight: r.highlight ? 800 : 600, color: r.highlight ? "var(--accent-primary)" : "var(--text-primary)", fontSize: r.highlight ? "1.1rem" : "1rem" }}>{r.value}</span>
            </div>
          ))}
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
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Belge/İşlem Türü</label>
        <select value={tur} onChange={e => setTur(e.target.value)} className="input-field">
          {Object.entries(ORANLAR).map(([k, v]) => (
            <option key={k} value={k}>{v.label} — ‰{(v.oran * 1000).toFixed(2)}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Matrah (₺)</label>
        <input type="number" placeholder="Örn: 50000" value={tutar} onChange={e => setTutar(e.target.value)} className="input-field" />
      </div>

      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Uygulanan Oran</span>
            <span style={{ fontWeight: 600 }}>‰{(result.oran * 1000).toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Ödenecek Damga Vergisi</span>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--accent-primary)" }}>₺{fmt(result.vergi)}</span>
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

    // 2025 Gelir Vergisi Dilimleri
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

    // Damga vergisi
    const damga = brut * 0.00759;
    const toplamKesinti = sgkIsci + issizlik + vergi / parseInt(ay) + damga;
    const net = brut - toplamKesinti;

    setResult({ matrah: aylikMatrah, vergi: vergi / parseInt(ay), net, sgkIsci, issizlik });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        💡 2025 yılı gelir vergisi dilimlerine göre hesaplanır. Sonuçlar tahmini olup profesyonel danışmanlık yerine geçmez.
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Aylık Brüt Maaş (₺)</label>
        <input type="number" placeholder="Örn: 25000" value={brutMaas} onChange={e => setBrutMaas(e.target.value)} className="input-field" />
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hesaplama Ayı</label>
        <select value={ay} onChange={e => setAy(e.target.value)} className="input-field">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}. Ay</option>
          ))}
        </select>
      </div>

      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { label: "SGK İşçi Payı (%14)", value: fmt(result.sgkIsci), color: "" },
            { label: "İşsizlik Sigortası (%1)", value: fmt(result.issizlik), color: "" },
            { label: "Aylık Vergi Matrahı", value: fmt(result.matrah / parseInt(ay)), color: "" },
            { label: "Gelir Vergisi", value: fmt(result.vergi), color: "#ef4444" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.45rem 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{r.label}</span>
              <span style={{ fontWeight: 600, color: r.color || "var(--text-primary)" }}>₺{r.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
            <span style={{ fontWeight: 700 }}>Tahmini Net Maaş</span>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "#22c55e" }}>₺{fmt(result.net)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
