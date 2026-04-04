"use client";

import { useState } from "react";

// Adet/Ovulasyon Takibi (Period Tracker)
export function PeriodCalculator() {
  const [sonTarih, setSonTarih] = useState("");
  const [dongu, setDongu] = useState("28");
  const [kanama, setKanama] = useState("5");
  const [result, setResult] = useState<null | { next: string; ovulasyon: string; dogurganBas: string; dogurganBit: string; adetBit: string }>(null);

  const hesapla = () => {
    if (!sonTarih) return;
    const d1 = new Date(sonTarih);
    const donguGun = parseInt(dongu) || 28;
    const kanamaGun = parseInt(kanama) || 5;

    // Sonraki adet başlangıcı
    const nextDate = new Date(d1);
    nextDate.setDate(d1.getDate() + donguGun);

    // Adet bitişi (geçerli)
    const bitisDate = new Date(d1);
    bitisDate.setDate(d1.getDate() + kanamaGun);

    // Ovulasyon (Genelde döngüden 14 gün önce)
    const ovulasyonDate = new Date(nextDate);
    ovulasyonDate.setDate(nextDate.getDate() - 14);

    // Doğurganlık penceresi (ovulasyondan 5 gün önce başlar, 1 gün sonra biter)
    const dogBas = new Date(ovulasyonDate);
    dogBas.setDate(ovulasyonDate.getDate() - 5);
    const dogBit = new Date(ovulasyonDate);
    dogBit.setDate(ovulasyonDate.getDate() + 1);

    const fmt = (d: Date) => d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" });

    setResult({
      next: fmt(nextDate),
      adetBit: fmt(bitisDate),
      ovulasyon: fmt(ovulasyonDate),
      dogurganBas: fmt(dogBas),
      dogurganBit: fmt(dogBit),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Son Adet Başlangıç Tarihi</label>
          <input type="date" value={sonTarih} onChange={e => setSonTarih(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Adet Döngüsü Süresi (Gün)</label>
          <input type="number" placeholder="Genelde 28" value={dongu} onChange={e => setDongu(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Kanama Süresi (Gün)</label>
          <input type="number" placeholder="Genelde 5" value={kanama} onChange={e => setKanama(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center", color: "var(--accent-primary)" }}>Tahmini Takviminiz</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🩸", title: "Sonraki Adet Başlangıcı", val: result.next, color: "#ef4444" },
              { icon: "✨", title: "Yüksek Doğurganlık Dönemi", val: `${result.dogurganBas.split(" ")[0]} - ${result.dogurganBit}`, color: "#f59e0b" },
              { icon: "🥚", title: "Tahmini Yumurtlama (Ovulasyon)", val: result.ovulasyon, color: "#8b5cf6" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                <div style={{ fontSize: "2rem" }}>{r.icon}</div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{r.title}</div>
                  <div style={{ fontWeight: 700, color: r.color, fontSize: "1.05rem" }}>{r.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Burç Hesaplama
export function ZodiacCalculator() {
  const [gun, setGun] = useState("");
  const [ay, setAy] = useState("");
  const [result, setResult] = useState<null | { burc: string; element: string; yonetici: string; icon: string }>(null);

  const hesapla = () => {
    const d = parseInt(gun);
    const m = parseInt(ay);
    if (!d || !m || d < 1 || d > 31 || m < 1 || m > 12) return;

    let burc = ""; let element = ""; let yonetici = ""; let icon = "";

    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) { burc = "Koç"; element = "Ateş"; yonetici = "Mars"; icon = "♈"; }
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) { burc = "Boğa"; element = "Toprak"; yonetici = "Venüs"; icon = "♉"; }
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) { burc = "İkizler"; element = "Hava"; yonetici = "Merkür"; icon = "♊"; }
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) { burc = "Yengeç"; element = "Su"; yonetici = "Ay"; icon = "♋"; }
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) { burc = "Aslan"; element = "Ateş"; yonetici = "Güneş"; icon = "♌"; }
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) { burc = "Başak"; element = "Toprak"; yonetici = "Merkür"; icon = "♍"; }
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) { burc = "Terazi"; element = "Hava"; yonetici = "Venüs"; icon = "♎"; }
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) { burc = "Akrep"; element = "Su"; yonetici = "Plüton/Mars"; icon = "♏"; }
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) { burc = "Yay"; element = "Ateş"; yonetici = "Jüpiter"; icon = "♐"; }
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) { burc = "Oğlak"; element = "Toprak"; yonetici = "Satürn"; icon = "♑"; }
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) { burc = "Kova"; element = "Hava"; yonetici = "Uranüs/Satürn"; icon = "♒"; }
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) { burc = "Balık"; element = "Su"; yonetici = "Neptün/Jüpiter"; icon = "♓"; }

    setResult({ burc, element, yonetici, icon });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğum Günü</label>
          <select value={gun} onChange={e => setGun(e.target.value)} className="input-field">
            <option value="">Gün Seçin</option>
            {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Doğum Ayı</label>
          <select value={ay} onChange={e => setAy(e.target.value)} className="input-field">
            <option value="">Ay Seçin</option>
            {["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"].map((m, i) => (
              <option key={i+1} value={i+1}>{m}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Güneş Burcumu Bul</button>

      {result && (
        <div style={{ background: "linear-gradient(145deg, #1e293b, #0f172a)", border: "1px solid #334155", borderRadius: "12px", padding: "2rem", textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "0.5rem" }}>{result.icon}</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-secondary)", marginBottom: "1rem" }}>{result.burc}</div>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
             <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.75rem", opacity: 0.7, textTransform: "uppercase" }}>Grup</div>
                <div style={{ fontWeight: 600 }}>{result.element}</div>
             </div>
             <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.75rem", opacity: 0.7, textTransform: "uppercase" }}>Yönetici Gezegen</div>
                <div style={{ fontWeight: 600 }}>{result.yonetici}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
