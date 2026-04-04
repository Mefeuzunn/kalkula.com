"use client";

import { useState } from "react";

// Yakıt Maliyeti ve Tüketimi
export function FuelCostCalculator() {
  const [mesafe, setMesafe] = useState("");
  const [tuketim, setTuketim] = useState(""); // 100km'de yaktigi litre
  const [fiyat, setFiyat] = useState("");
  const [yolcu, setYolcu] = useState("1");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const m = parseFloat(mesafe);
    const t = parseFloat(tuketim);
    const f = parseFloat(fiyat);
    const y = parseInt(yolcu) || 1;

    if (!m || !t || !f) return;

    const netLitre = (m / 100) * t;
    const toplamMaliyet = netLitre * f;
    const kisiBasi = toplamMaliyet / y;
    const kmBasi = toplamMaliyet / m;

    setResult({
      litre: netLitre,
      toplamMaliyet,
      kisiBasi,
      kmBasi
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Gidilecek Mesafe (km)</label>
          <input type="number" placeholder="Örn: 450" value={mesafe} onChange={e => setMesafe(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Ortalama Yakıt Tüketimi</label>
          <input type="number" placeholder="Litre / 100km (Ön: 6.5)" value={tuketim} onChange={e => setTuketim(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Yakıt Litre Fiyatı (₺)</label>
          <input type="number" placeholder="Örn: 40.50" value={fiyat} onChange={e => setFiyat(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Yolcu Sayısı (Opsiyonel)</label>
          <input type="number" placeholder="Masmarafi bölmek için" value={yolcu} onChange={e => setYolcu(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>Yakıt Masrafını Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem" }}>
           <div style={{ fontSize: "1.2rem", fontWeight: 700, textAlign: "center", marginBottom: "1.5rem" }}>Toplam Yolculuk Özeti</div>
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
                 <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>Toplam Tüketilen Yakıt</div>
                 <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{result.litre.toFixed(1)} L</div>
              </div>
              <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
                 <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>Kilometre Başına (Km/₺)</div>
                 <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{result.kmBasi.toFixed(2)} ₺</div>
              </div>
           </div>
           
           <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))", border: "1px solid var(--accent-glow)", marginTop: "1rem", padding: "1.5rem", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>TOPLAM YAKIT MALİYETİ</div>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.toplamMaliyet.toFixed(2)} ₺</div>
              {parseInt(yolcu) > 1 && (
                 <div style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: 600, color: "var(--text-secondary)" }}>Kişi Başı Düşen: <strong>{result.kisiBasi.toFixed(2)} ₺</strong></div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}

// MTV Hesaplama (Basitleştirilmiş 2024 model)
export function MtvCalculator() {
  const [aracTipi, setAracTipi] = useState("otomobil");
  const [yas, setYas] = useState("1-3"); // 1-3, 4-6, 7-11
  const [motor, setMotor] = useState("1300");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    // 2024 Yaklaşık MTV tutarları (Otomobil için)
    let mtv = 0;
    if (aracTipi === "motosiklet") {
       mtv = yas === "1-3" ? 1800 : (yas === "4-6" ? 1400 : 900);
    } else { // otomobil
       switch(motor) {
         case "1300": mtv = yas === "1-3" ? 3359 : (yas === "4-6" ? 2339 : 1300); break;
         case "1600": mtv = yas === "1-3" ? 5851 : (yas === "4-6" ? 4387 : 2544); break;
         case "2000": mtv = yas === "1-3" ? 10450 : (yas === "4-6" ? 8047 : 4734); break;
         case "2000+": mtv = yas === "1-3" ? 16000 : (yas === "4-6" ? 13400 : 8000); break;
       }
    }
    
    setResult(mtv);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ background: "var(--surface-light)", padding: "1rem", borderRadius: "8px", border: "1px dashed var(--border)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
         💡 Not: Bu form 2024 yılı araç grupları ve ortalama kasko değerine göre <strong>referans (yaklaşık) MTV tutarı</strong> oluşturmaktadır.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Araç Tipi</label>
          <select value={aracTipi} onChange={e => { setAracTipi(e.target.value); setResult(null); }} className="input-field">
            <option value="otomobil">Otomobil / Cip</option>
            <option value="motosiklet">Motosiklet</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Araç Yaşı (Tescil)</label>
          <select value={yas} onChange={e => setYas(e.target.value)} className="input-field">
            <option value="1-3">1 - 3 Yaş Arası</option>
            <option value="4-6">4 - 6 Yaş Arası</option>
            <option value="7-11">7 - 11 Yaş Arası</option>
          </select>
        </div>
        {aracTipi === "otomobil" && (
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Motor Silindir Hacmi</label>
            <select value={motor} onChange={e => setMotor(e.target.value)} className="input-field">
              <option value="1300">0 - 1300 cc Gerek</option>
              <option value="1600">1301 - 1600 cc</option>
              <option value="2000">1601 - 2000 cc</option>
              <option value="2000+">2001 cc ve Üzeri</option>
            </select>
          </div>
        )}
      </div>
      <button className="btn-primary" onClick={hesapla}>Yıllık MTV Tutarını Gör</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
           <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>YILLIK TOPLAM MTV (Motorlu Taşıtlar Vergisi)</div>
           <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result} <span style={{ fontSize: "1.5rem" }}>₺</span></div>
           <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "8px" }}>
                 <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>1. Taksit (Ocak)</div>
                 <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{(result/2).toFixed(2)} ₺</div>
              </div>
              <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "8px" }}>
                 <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>2. Taksit (Temmuz)</div>
                 <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{(result/2).toFixed(2)} ₺</div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
