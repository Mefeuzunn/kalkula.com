"use client";

import { useState } from "react";

/* ─── Tarihler Arası Gün Hesaplama ─── */
export function DateDiffCalculator() {
  const [basTarih, setBasTarih] = useState("");
  const [bitTarih, setBitTarih] = useState("");
  const [result, setResult] = useState<null | {
    gun: number; hafta: number; ay: number; yil: number; iscal: number;
  }>(null);

  const hesapla = () => {
    if (!basTarih || !bitTarih) return;
    const d1 = new Date(basTarih);
    const d2 = new Date(bitTarih);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const gun = Math.floor(diff / (1000 * 60 * 60 * 24));

    // İş günü (hafta sonu hariç)
    let iscal = 0;
    const start = new Date(Math.min(d1.getTime(), d2.getTime()));
    for (let i = 0; i < gun; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) iscal++;
    }

    setResult({ gun, hafta: gun / 7, ay: gun / 30.4375, yil: gun / 365.25, iscal });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Başlangıç Tarihi</label>
          <input type="date" value={basTarih} onChange={e => setBasTarih(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Bitiş Tarihi</label>
          <input type="date" value={bitTarih} onChange={e => setBitTarih(e.target.value)} className="input-field" />
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["Bu Hafta", "Bu Ay", "Bu Yıl"].map(label => (
          <button key={label} onClick={() => {
            const now = new Date();
            setBasTarih(todayStr);
            if (label === "Bu Hafta") {
              const end = new Date(now); end.setDate(now.getDate() + 7);
              setBitTarih(end.toISOString().split("T")[0]);
            } else if (label === "Bu Ay") {
              setBitTarih(new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0]);
            } else {
              setBitTarih(`${now.getFullYear()}-12-31`);
            }
          }} style={{ padding: "0.35rem 0.85rem", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
            {label}
          </button>
        ))}
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            { label: "Toplam Gün", value: result.gun.toLocaleString("tr-TR"), icon: "📅", color: "#3b82f6" },
            { label: "İş Günü", value: result.iscal.toLocaleString("tr-TR"), icon: "💼", color: "#22c55e" },
            { label: "Hafta", value: result.hafta.toFixed(1), icon: "🗓️", color: "#f59e0b" },
            { label: "Ay / Yıl", value: `${result.ay.toFixed(1)} ay / ${result.yil.toFixed(2)} yıl`, icon: "⏳", color: "#8b5cf6" },
          ].map(r => (
            <div key={r.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: r.color, margin: "0.25rem 0" }}>{r.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{r.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Yaş Hesaplama ─── */
export function AgeCalculator() {
  const [dogumTarih, setDogumTarih] = useState("");
  const [hedefTarih, setHedefTarih] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<null | {
    yil: number; ay: number; gun: number; totalGun: number; sonrakiDogumGun: number;
  }>(null);

  const hesapla = () => {
    if (!dogumTarih) return;
    const dogum = new Date(dogumTarih);
    const hedef = new Date(hedefTarih);
    if (dogum > hedef) return;

    let yil = hedef.getFullYear() - dogum.getFullYear();
    let ay = hedef.getMonth() - dogum.getMonth();
    let gun = hedef.getDate() - dogum.getDate();

    if (gun < 0) { ay--; gun += new Date(hedef.getFullYear(), hedef.getMonth(), 0).getDate(); }
    if (ay < 0) { yil--; ay += 12; }

    const totalGun = Math.floor((hedef.getTime() - dogum.getTime()) / (1000 * 60 * 60 * 24));

    // Sonraki doğum günü
    const sonrakiDG = new Date(hedef.getFullYear(), dogum.getMonth(), dogum.getDate());
    if (sonrakiDG <= hedef) sonrakiDG.setFullYear(hedef.getFullYear() + 1);
    const sonrakiGun = Math.ceil((sonrakiDG.getTime() - hedef.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ yil, ay, gun, totalGun, sonrakiDogumGun: sonrakiGun });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğum Tarihi</label>
          <input type="date" value={dogumTarih} onChange={e => setDogumTarih(e.target.value)} className="input-field" max={new Date().toISOString().split("T")[0]} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hedef Tarih</label>
          <input type="date" value={hedefTarih} onChange={e => setHedefTarih(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "var(--accent-primary)", borderRadius: "12px", padding: "1.75rem", textAlign: "center", color: "white" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.25rem" }}>Yaşınız</div>
            <div style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
              {result.yil}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>
              yıl {result.ay} ay {result.gun} gün
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem" }}>📅</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#3b82f6" }}>{result.totalGun.toLocaleString("tr-TR")}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Toplam Gün</div>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem" }}>🎂</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#f59e0b" }}>{result.sonrakiDogumGun}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Gün Sonra Doğum Günün</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Saat Hesaplama ─── */
export function TimeCalculator() {
  const [saat1, setSaat1] = useState("");
  const [saat2, setSaat2] = useState("");
  const [islem, setIslem] = useState<"topla" | "cikar">("topla");
  const [result, setResult] = useState<null | { saat: number; dakika: number; saniye: number; toplamDk: number }>(null);

  const parseTime = (s: string) => {
    const [h, m, sec] = s.split(":").map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (sec || 0);
  };

  const hesapla = () => {
    if (!saat1 || !saat2) return;
    const t1 = parseTime(saat1);
    const t2 = parseTime(saat2);
    let total = islem === "topla" ? t1 + t2 : Math.abs(t1 - t2);
    const saat = Math.floor(total / 3600);
    const dakika = Math.floor((total % 3600) / 60);
    const saniye = total % 60;
    setResult({ saat, dakika, saniye, toplamDk: Math.floor(total / 60) });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", background: "var(--bg-secondary)", borderRadius: "8px", padding: "4px" }}>
        {(["topla", "cikar"] as const).map(m => (
          <button key={m} onClick={() => setIslem(m)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600, background: islem === m ? "var(--accent-primary)" : "transparent", color: islem === m ? "white" : "var(--text-secondary)", transition: "all 0.2s" }}>
            {m === "topla" ? "➕ Topla" : "➖ Çıkar"}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>1. Süre (SS:DD:SN)</label>
          <input type="time" step="1" value={saat1} onChange={e => setSaat1(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>2. Süre (SS:DD:SN)</label>
          <input type="time" step="1" value={saat2} onChange={e => setSaat2(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Sonuç</div>
          <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--accent-primary)", fontVariantNumeric: "tabular-nums" }}>
            {String(result.saat).padStart(2, "0")}:{String(result.dakika).padStart(2, "0")}:{String(result.saniye).padStart(2, "0")}
          </div>
          <div style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Toplam {result.toplamDk.toLocaleString("tr-TR")} dakika
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Çalışma Saati Hesaplama ─── */
export function WorkHoursCalculator() {
  const [giris, setGiris] = useState("09:00");
  const [cikis, setCikis] = useState("18:00");
  const [arabek, setArabek] = useState("60");
  const [gunler, setGunler] = useState("5");
  const [result, setResult] = useState<null | {
    gunlukSaat: number; haftalikSaat: number; aylikSaat: number; yillikSaat: number;
  }>(null);

  const hesapla = () => {
    const [gh, gm] = giris.split(":").map(Number);
    const [ch, cm] = cikis.split(":").map(Number);
    const arabekDk = parseInt(arabek) || 0;
    const g = parseInt(gunler) || 5;

    const totalDakika = (ch * 60 + cm) - (gh * 60 + gm) - arabekDk;
    if (totalDakika <= 0) return;

    const gunlukSaat = totalDakika / 60;
    setResult({
      gunlukSaat,
      haftalikSaat: gunlukSaat * g,
      aylikSaat: gunlukSaat * g * 4.33,
      yillikSaat: gunlukSaat * g * 52,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>İşe Giriş</label>
          <input type="time" value={giris} onChange={e => setGiris(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>İşçıkış</label>
          <input type="time" value={cikis} onChange={e => setCikis(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Mola Süresi (dk)</label>
          <input type="number" value={arabek} onChange={e => setArabek(e.target.value)} className="input-field" placeholder="60" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Haftalık Çalışma Günü</label>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {[5, 6].map(d => (
              <button key={d} onClick={() => setGunler(String(d))}
                style={{ flex: 1, padding: "0.6rem", borderRadius: "7px", border: `1px solid ${gunler === String(d) ? "var(--accent-primary)" : "var(--border)"}`, background: gunler === String(d) ? "var(--accent-glow)" : "var(--surface)", color: gunler === String(d) ? "var(--accent-primary)" : "var(--text-secondary)", fontWeight: 700, cursor: "pointer" }}>
                {d} Gün
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            { label: "Günlük", value: `${result.gunlukSaat.toFixed(1)} saat`, icon: "☀️", color: "#f59e0b" },
            { label: "Haftalık", value: `${result.haftalikSaat.toFixed(1)} saat`, icon: "📆", color: "#3b82f6" },
            { label: "Aylık", value: `${result.aylikSaat.toFixed(0)} saat`, icon: "🗓️", color: "#22c55e" },
            { label: "Yıllık", value: `${result.yillikSaat.toFixed(0)} saat`, icon: "📊", color: "#8b5cf6" },
          ].map(r => (
            <div key={r.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: r.color, margin: "0.25rem 0" }}>{r.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{r.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
