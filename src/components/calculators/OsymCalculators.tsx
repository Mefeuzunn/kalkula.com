"use client";

import { useState } from "react";

// KPSS Puan Hesaplama
export function KpssCalculator() {
  const [gyNet, setGyNet] = useState("");
  const [gkNet, setGkNet] = useState("");
  const [egitimNet, setEgitimNet] = useState("");
  const [tur, setTur] = useState("lisans");
  const [result, setResult] = useState<null | { p3: number; p10?: number }>(null);

  const hesapla = () => {
    const gy = parseFloat(gyNet) || 0;
    const gk = parseFloat(gkNet) || 0;
    
    // Basit P3 tahmini formülü: 50 + (GY * 0.4) + (GK * 0.4) -- Ortalama sapmalarla
    const p3 = 50 + (gy * 0.45) + (gk * 0.45);
    
    let res: any = { p3 };
    if (tur === "egitim") {
      const eg = parseFloat(egitimNet) || 0;
      // KPSS P10 (Eğitim Bilimleri için yaklaşık formül)
      res.p10 = 40 + (gy * 0.25) + (gk * 0.25) + (eg * 0.35);
    }
    setResult(res);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sınav Türü</label>
        <select value={tur} onChange={e => { setTur(e.target.value); setResult(null); }} className="input-field">
          <option value="lisans">Lisans / Ön Lisans / Ortaöğretim (B GRUBU P3/P93/P94)</option>
          <option value="egitim">Eğitim Bilimleri (A GRUBU P10)</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Genel Yetenek Neti</label>
          <input type="number" placeholder="Örn: 45" value={gyNet} onChange={e => setGyNet(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Genel Kültür Neti</label>
          <input type="number" placeholder="Örn: 50" value={gkNet} onChange={e => setGkNet(e.target.value)} className="input-field" />
        </div>
        {tur === "egitim" && (
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Eğitim Bilimleri Neti</label>
            <input type="number" placeholder="Örn: 65" value={egitimNet} onChange={e => setEgitimNet(e.target.value)} className="input-field" />
          </div>
        )}
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Puanı Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Tahmini P3 / P93 / P94 Puanı</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.p3.toFixed(3)}</div>
          {result.p10 && (
            <>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "1rem", marginBottom: "0.5rem" }}>Tahmini KPSS P10 Puanı</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#8b5cf6" }}>{result.p10.toFixed(3)}</div>
            </>
          )}
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>*ÖSYM yığınsal standart sapmalarına göre farklılık gösterebilir.</div>
        </div>
      )}
    </div>
  );
}

// ALES Hesaplama
export function AlesCalculator() {
  const [sayNet, setSayNet] = useState("");
  const [sozNet, setSozNet] = useState("");
  const [result, setResult] = useState<null | { say: number; soz: number; ea: number }>(null);

  const hesapla = () => {
    const say = parseFloat(sayNet) || 0;
    const soz = parseFloat(sozNet) || 0;
    // Yakaşık ALES Formülü
    const pSay = 50 + (say * 0.75) + (soz * 0.25);
    const pSoz = 50 + (soz * 0.75) + (say * 0.25);
    const pEa = 50 + (say * 0.5) + (soz * 0.5);
    
    setResult({
      say: Math.min(100, Math.max(50, pSay)),
      soz: Math.min(100, Math.max(50, pSoz)),
      ea: Math.min(100, Math.max(50, pEa))
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sayısal Neti</label>
          <input type="number" placeholder="Maks: 50" max="50" value={sayNet} onChange={e => setSayNet(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sözel Neti</label>
          <input type="number" placeholder="Maks: 50" max="50" value={sozNet} onChange={e => setSozNet(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>ALES Puanı Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {[
            { label: "ALES SAY", value: result.say.toFixed(3), color: "#3b82f6" },
            { label: "ALES SÖZ", value: result.soz.toFixed(3), color: "#ef4444" },
            { label: "ALES EA", value: result.ea.toFixed(3), color: "#f59e0b" },
          ].map(r => (
            <div key={r.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: r.color }}>{r.value}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem", fontWeight: 600 }}>{r.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// DGS Hesaplama
export function DgsCalculator() {
  const [sayNet, setSayNet] = useState("");
  const [sozNet, setSozNet] = useState("");
  const [obp, setObp] = useState("");
  const [result, setResult] = useState<null | { say: number; soz: number; ea: number }>(null);

  const hesapla = () => {
    // 2026 DGS Güncel Katsayıları (Öngörülen)
    const sayN = parseFloat(sayNet) || 0;
    const sozN = parseFloat(sozNet) || 0;
    const o = parseFloat(obp) || 50; // ÖBP (Diploma x 10)
    
    const obpPuan = o * 0.6;
    const pSay = 130 + (sayN * 3.1) + (sozN * 0.4) + obpPuan;
    const pSoz = 130 + (sayN * 0.4) + (sozN * 3.0) + obpPuan;
    const pEa = 130 + (sayN * 1.75) + (sozN * 1.7) + obpPuan;

    setResult({ say: pSay, soz: pSoz, ea: pEa });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sayısal Neti</label>
          <input type="number" placeholder="Maks: 50" value={sayNet} onChange={e => setSayNet(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sözel Neti</label>
          <input type="number" placeholder="Maks: 50" value={sozNet} onChange={e => setSozNet(e.target.value)} className="input-field" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Önlisans Başarı Puanı (ÖBP)</label>
          <input type="number" placeholder="Okul puanı (50-100)" value={obp} onChange={e => setObp(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>DGS Puanı Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {[
            { label: "DGS SAY", value: result.say.toFixed(3), color: "#3b82f6" },
            { label: "DGS SÖZ", value: result.soz.toFixed(3), color: "#ef4444" },
            { label: "DGS EA", value: result.ea.toFixed(3), color: "#f59e0b" },
          ].map(r => (
            <div key={r.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: r.color }}>{r.value}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem", fontWeight: 600 }}>{r.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// YDS Hesaplama
export function YdsCalculator() {
  const [dogru, setDogru] = useState("");
  const [yanlis, setYanlis] = useState("");
  const [result, setResult] = useState<null | { dogru: number; puan: number; seviye: string }>(null);

  const hesapla = () => {
    const d = parseFloat(dogru) || 0;
    // YDS'de yanlış doğruyu götürmez, bu aracı genel tutalım. Eğer kullanıcı yanlış girer ise uyarı verebiliriz fakat genelde YDS net = doğru sayısıdır.
    const puan = d * 1.25;
    
    let seviye = "";
    if (puan >= 90) seviye = "A Seviyesi";
    else if (puan >= 80) seviye = "B Seviyesi";
    else if (puan >= 70) seviye = "C Seviyesi";
    else if (puan >= 60) seviye = "D Seviyesi";
    else if (puan >= 50) seviye = "E Seviyesi";
    else seviye = "Baraj Altı";

    setResult({ dogru: d, puan, seviye });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px", padding: "1rem", fontSize: "0.85rem" }}>
        💡 YDS ve YÖKDİL gibi dil sınavlarında 4 yanlış 1 doğruyu <strong>götürmez</strong>. Bu nedenle puanınız sadece doğru cevap sayınız üzerinden hesaplanır.
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğru Sayısı</label>
        <input type="number" placeholder="80 soruda kaç doğru (Maks: 80)" max="80" value={dogru} onChange={e => setDogru(e.target.value)} className="input-field" />
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>YDS/YÖKDİL Puanı Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Sınav Puanınız</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.puan.toFixed(3)}</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#8b5cf6", marginTop: "0.5rem" }}>{result.seviye}</div>
        </div>
      )}
    </div>
  );
}
