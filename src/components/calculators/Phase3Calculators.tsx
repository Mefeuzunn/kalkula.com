"use client";

import { useState } from "react";

// Açıköğretim (AÖF) Çan Eğrisi / Harf Notu
export function AofCalculator() {
  const [vize, setVize] = useState("");
  const [final, setFinal] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const v = parseFloat(vize);
    const f = parseFloat(final);
    if(isNaN(v) || isNaN(f)) return;

    // AÖF Standart: Vize %30, Final %70
    const ortalama = (v * 0.3) + (f * 0.7);
    
    // Basit AÖF kriterleri (Çan eğrisi sabit kabulü)
    let harf = ""; let durum = ""; let color = "";
    if (f < 35) { harf = "FF"; durum = "Kaldı (Final Barajı)"; color = "#ef4444"; }
    else if (ortalama < 35) { harf = "FF"; durum = "Kaldı"; color = "#ef4444"; }
    else if (ortalama >= 84) { harf = "AA"; durum = "Geçti (Başarılı)"; color = "#10b981"; }
    else if (ortalama >= 77) { harf = "AB"; durum = "Geçti"; color = "#10b981"; }
    else if (ortalama >= 71) { harf = "BA"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 66) { harf = "BB"; durum = "Geçti"; color = "#3b82f6"; }
    else if (ortalama >= 61) { harf = "BC"; durum = "Geçti"; color = "#6366f1"; }
    else if (ortalama >= 56) { harf = "CB"; durum = "Geçti"; color = "#6366f1"; }
    else if (ortalama >= 50) { harf = "CC"; durum = "Geçti"; color = "#8b5cf6"; }
    else if (ortalama >= 46) { harf = "CD"; durum = "Koşullu Geçti"; color = "#f59e0b"; }
    else if (ortalama >= 40) { harf = "DC"; durum = "Koşullu Geçti"; color = "#f59e0b"; }
    else if (ortalama >= 35) { harf = "DD"; durum = "Koşullu Geçti"; color = "#f59e0b"; }

    setResult({ ortalama, harf, durum, color });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Ara Sınav (Vize) Notu</label>
            <input type="number" placeholder="Örn: 65" value={vize} onChange={e => setVize(e.target.value)} className="input-field" />
         </div>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Dönem Sonu (Final/Büt) Notu</label>
            <input type="number" placeholder="Örn: 50" value={final} onChange={e => setFinal(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>Genel Ortalamayı Hesapla</button>

      {result && (
         <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>AÖF Başarı Ortalamanız</div>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)" }}>{result.ortalama.toFixed(2)}</div>
            
            <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "1rem", padding: "0.5rem 1rem", border: "2px solid " + result.color, borderRadius: "8px", background: result.color + "15" }}>
               <div style={{ fontSize: "1.5rem", fontWeight: 800, color: result.color }}>{result.harf}</div>
               <div style={{ width: "2px", height: "30px", background: result.color, opacity: 0.5 }}></div>
               <div style={{ fontWeight: 600, color: result.color }}>{result.durum}</div>
            </div>
            
            <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>*Çan eğrisi (harf notu sınırları) üniversitelere ve sınıf ortalamasına göre değişiklik gösterebilir. Bu değerler sabittir.</p>
         </div>
      )}
    </div>
  );
}

export function TusDusCalculator() {
  const [tt1, setTt1] = useState("");
  const [tk, setTk] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const t1 = parseFloat(tt1); const k = parseFloat(tk);
    if(isNaN(t1) || isNaN(k)) return;

    // Basit TUS Yaklaşık Formülü
    const pKlinik = 40 + (k * 0.45) + (t1 * 0.25);
    const pTemel = 40 + (t1 * 0.45) + (k * 0.25);
    
    setResult({ klinik: pKlinik.toFixed(3), temel: pTemel.toFixed(3) });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Temel Tıp Neti</label>
            <input type="number" placeholder="Maks: 100" value={tt1} onChange={e => setTt1(e.target.value)} className="input-field" />
         </div>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Klinik Tıp Neti</label>
            <input type="number" placeholder="Maks: 100" value={tk} onChange={e => setTk(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>TUS Puanı Hesapla</button>

      {result && (
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
               <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Klinik Puanı (K)</div>
               <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.klinik}</div>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
               <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Temel Puanı (T)</div>
               <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-secondary)" }}>{result.temel}</div>
            </div>
         </div>
      )}
    </div>
  );
}

// Çin Burcu
export function ChineseZodiac() {
  const [yil, setYil] = useState("");
  const [result, setResult] = useState<any>(null);

  const animals = ["Maymun", "Horoz", "Köpek", "Domuz", "Fare", "Öküz", "Kaplan", "Tavşan", "Ejderha", "Yılan", "At", "Keçi"];
  const icons = ["🐒", "🐓", "🐕", "🐖", "🐁", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐"];

  const hesapla = () => {
    const y = parseInt(yil);
    if(isNaN(y)) return;
    const idx = y % 12;
    setResult({ name: animals[idx], icon: icons[idx] });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğduğunuz Yıl</label>
        <input type="number" placeholder="Örn: 1995" value={yil} onChange={e => setYil(e.target.value)} className="input-field" />
      </div>
      <button className="btn-primary" onClick={hesapla}>Çin Burcumu Bul</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
           <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{result.icon}</div>
           <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Sizin Çin Burcunuz</div>
           <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.name}</div>
        </div>
      )}
    </div>
  );
}

// Yükselen Burç (Tahmini / Basit)
export function AscendantCalculator() {
  const [burc, setBurc] = useState("Koc"); // Gunes burcu
  const [saat, setSaat] = useState("06:00");
  const [result, setResult] = useState<string | null>(null);

  const hesapla = () => {
    // Burada 2 saatte bir değişen çok basit (gerçek astroloji matrisinden daha simple) bir mapping yapıyoruz.
    const [h] = saat.split(":").map(Number);
    const burclar = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
    
    const baseIndex = ["Koc","Boga","Ikizler","Yengec","Aslan","Basak","Terazi","Akrep","Yay","Oglak","Kova","Balik"].indexOf(burc);
    if (baseIndex === -1) return;

    // Her iki saat, yükseleni 1 burç kaydırır. Gün doğumu (06:00) civarı güneş ve yükselen aynıdır.
    // Fark: (h - 6) / 2
    let offset = Math.floor((h - 6) / 2);
    let finalIdx = (baseIndex + offset) % 12;
    if (finalIdx < 0) finalIdx += 12;

    setResult(burclar[finalIdx]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Güneş Burcunuz (Öz Burcunuz)</label>
            <select value={burc} onChange={e => setBurc(e.target.value)} className="input-field">
              <option value="Koc">Koç</option><option value="Boga">Boğa</option>
              <option value="Ikizler">İkizler</option><option value="Yengec">Yengeç</option>
              <option value="Aslan">Aslan</option><option value="Basak">Başak</option>
              <option value="Terazi">Terazi</option><option value="Akrep">Akrep</option>
              <option value="Yay">Yay</option><option value="Oglak">Oğlak</option>
              <option value="Kova">Kova</option><option value="Balik">Balık</option>
            </select>
         </div>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğum Saatiniz (Yaklaşık)</label>
            <input type="time" value={saat} onChange={e => setSaat(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>Yükselen Burcumu Bul</button>

      {result && (
        <div style={{ background: "linear-gradient(135deg, #4c1d95, #1e3a8a)", border: "1px solid #3b82f6", borderRadius: "10px", padding: "2rem", textAlign: "center", color: "white" }}>
           <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>Tahmini Yükselen Burcunuz</div>
           <div style={{ fontSize: "3rem", fontWeight: 800 }}>{result}</div>
           <p style={{ marginTop: "1rem", fontSize: "0.85rem", opacity: 0.8 }}>Not: Gerçek yükselen burç, doğduğunuz sehrin enlem/boylam bilgilerine (ev haritasına) göre bir derece değişiklik gösterebilir.</p>
        </div>
      )}
    </div>
  );
}
