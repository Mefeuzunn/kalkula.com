"use client";

import { useState } from "react";

/* ─── Kar/Zarar Hesaplama ─── */
export function KarZararCalculator() {
  const [gelir, setGelir] = useState("");
  const [gider, setGider] = useState("");
  const [kdvOran, setKdvOran] = useState("20");
  const [result, setResult] = useState<null | {
    karZarar: number; yuzde: number; kdvHesabi: number; netKar: number;
  }>(null);

  const hesapla = () => {
    const g = parseFloat(gelir);
    const gz = parseFloat(gider);
    const kdv = parseFloat(kdvOran) / 100;
    if (isNaN(g) || isNaN(gz)) return;
    const karZarar = g - gz;
    const yuzde = gz > 0 ? (karZarar / gz) * 100 : 0;
    const kdvHesabi = g * kdv;
    const netKar = karZarar - kdvHesabi;
    setResult({ karZarar, yuzde, kdvHesabi, netKar });
  };

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const isKar = result && result.karZarar >= 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Toplam Gelir (₺)</label>
          <input type="number" placeholder="Örn: 50000" value={gelir} onChange={e => setGelir(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Toplam Gider (₺)</label>
          <input type="number" placeholder="Örn: 35000" value={gider} onChange={e => setGider(e.target.value)} className="input-field" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>KDV Oranı (%)</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["0", "10", "20"].map(o => (
            <button key={o} onClick={() => setKdvOran(o)}
              style={{ padding: "0.45rem 1rem", borderRadius: "7px", border: `1px solid ${kdvOran === o ? "var(--accent-primary)" : "var(--border)"}`, background: kdvOran === o ? "var(--accent-glow)" : "var(--surface)", color: kdvOran === o ? "var(--accent-primary)" : "var(--text-secondary)", fontWeight: 600, cursor: "pointer" }}>
              %{o}
            </button>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{
          background: isKar ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
          border: `1px solid ${isKar ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          borderRadius: "12px", padding: "1.5rem",
        }}>
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>{isKar ? "📈" : "📉"}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: isKar ? "#22c55e" : "#ef4444" }}>
              {isKar ? "+" : ""}₺{fmt(result.karZarar)}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {isKar ? "Kar" : "Zarar"} — Gidere göre %{Math.abs(result.yuzde).toFixed(1)}
            </div>
          </div>
          {[
            { label: "KDV Yükümlülüğü", value: `₺${fmt(result.kdvHesabi)}` },
            { label: "KDV Sonrası Net Kar/Zarar", value: `₺${fmt(result.netKar)}` },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderTop: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{r.label}</span>
              <span style={{ fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Toptan–Perakende Fiyat ─── */
export function TopPriceCalculator() {
  const [maliyet, setMaliyet] = useState("");
  const [topMarj, setTopMarj] = useState("25");
  const [perMarj, setPerMarj] = useState("60");
  const [adet, setAdet] = useState("1");
  const [result, setResult] = useState<null | {
    topFiyat: number; perFiyat: number; topKar: number; perKar: number; topKdv: number; perKdv: number;
  }>(null);

  const fmt = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const hesapla = () => {
    const m = parseFloat(maliyet);
    const tm = parseFloat(topMarj) / 100;
    const pm = parseFloat(perMarj) / 100;
    const a = parseFloat(adet) || 1;
    if (!m) return;
    const topFiyat = m * (1 + tm);
    const perFiyat = m * (1 + pm);
    setResult({
      topFiyat, perFiyat,
      topKar: (topFiyat - m) * a,
      perKar: (perFiyat - m) * a,
      topKdv: topFiyat * 0.20,
      perKdv: perFiyat * 0.20,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Birim Maliyet (₺)</label>
          <input type="number" placeholder="Örn: 80" value={maliyet} onChange={e => setMaliyet(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Adet</label>
          <input type="number" placeholder="Örn: 100" value={adet} onChange={e => setAdet(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Toptan Kar Marjı (%)</label>
          <input type="number" placeholder="25" value={topMarj} onChange={e => setTopMarj(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Perakende Kar Marjı (%)</label>
          <input type="number" placeholder="60" value={perMarj} onChange={e => setPerMarj(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            {
              title: "🏭 Toptan",
              fiyat: result.topFiyat,
              kar: result.topKar,
              kdv: result.topKdv,
              color: "#3b82f6",
            },
            {
              title: "🛍️ Perakende",
              fiyat: result.perFiyat,
              kar: result.perKar,
              kdv: result.perKdv,
              color: "#8b5cf6",
            },
          ].map(c => (
            <div key={c.title} style={{ background: "var(--surface)", border: `2px solid ${c.color}22`, borderRadius: "12px", padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: c.color, marginBottom: "0.75rem" }}>{c.title}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>₺{fmt(c.fiyat)}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>birim fiyat</div>
              <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Toplam Kar</span>
                  <span style={{ fontWeight: 700, color: "#22c55e" }}>₺{fmt(c.kar)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>KDV (%20)</span>
                  <span style={{ fontWeight: 600 }}>₺{fmt(c.kdv)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
