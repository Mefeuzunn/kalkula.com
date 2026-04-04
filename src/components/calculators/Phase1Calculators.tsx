"use client";

import { useState } from "react";

// İdeal Kilo Hesaplama
export function IdealWeightCalculator() {
  const [cinsiyet, setCinsiyet] = useState("kadin");
  const [boy, setBoy] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const b = parseFloat(boy);
    if (!b || b < 100 || b > 250) return;
    
    // Devine formülü
    let res = 0;
    if (cinsiyet === "erkek") {
      res = 50 + 2.3 * ((b / 2.54) - 60);
    } else {
      res = 45.5 + 2.3 * ((b / 2.54) - 60);
    }
    setResult(Math.max(30, res));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Cinsiyet</label>
          <select value={cinsiyet} onChange={e => setCinsiyet(e.target.value)} className="input-field">
            <option value="kadin">Kadın</option>
            <option value="erkek">Erkek</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Boy (cm)</label>
          <input type="number" placeholder="Örn: 170" value={boy} onChange={e => setBoy(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>İdeal Kilomu Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Tahmini İdeal Kilonuz</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.toFixed(1)} <span style={{ fontSize: "1.2rem" }}>kg</span></div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>*Devine formülü kullanılarak hesaplanmıştır. Tıbbi teşhis yerine geçmez.</div>
        </div>
      )}
    </div>
  );
}

// Su İhtiyacı Hesaplama
export function WaterIntakeCalculator() {
  const [kilo, setKilo] = useState("");
  const [hareket, setHareket] = useState("orta");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const k = parseFloat(kilo);
    if (!k || k < 20) return;
    
    // Temel su ihtiyacı = kilo * 30-35 ml. Hareketliliğe göre artar.
    let base = k * 33;
    if (hareket === "az") base = k * 30;
    if (hareket === "cok") base = k * 40;
    
    setResult(base / 1000); // Litre
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Kilo (kg)</label>
          <input type="number" placeholder="Örn: 70" value={kilo} onChange={e => setKilo(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hareket Seviyesi</label>
          <select value={hareket} onChange={e => setHareket(e.target.value)} className="input-field">
            <option value="az">Az Hareketli</option>
            <option value="orta">Orta Hareketli</option>
            <option value="cok">Çok Hareketli (Sporcu)</option>
          </select>
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>Su İhtiyacımı Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>💧</div>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Günlük İçmeniz Gereken Su</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#3b82f6" }}>{result.toFixed(2)} <span style={{ fontSize: "1.2rem" }}>Litre</span></div>
          <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem", fontWeight: 600 }}>Yaklaşık {Math.ceil((result * 1000) / 250)} Bardak</div>
        </div>
      )}
    </div>
  );
}

// Uyku Döngüsü (REM)
export function SleepCycleCalculator() {
  const [saat, setSaat] = useState("07:00");
  const [type, setType] = useState("uyanma"); // uyanma saatim -> ne zaman uyumalıyım? uyuma saatim -> ne zaman uyanmalıyım?
  const [result, setResult] = useState<string[]>([]);

  const hesapla = () => {
    if (!saat) return;
    const [h, m] = saat.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);

    const cycles = [];
    // Uykuya dalma süresi ort 15 dk.
    const dalmaFarki = 15;
    
    if (type === "uyanma") {
      // Geriye doğru döngüler hesaplanıyor (Her döngü 90 dk)
      for (let i = 6; i >= 3; i--) {
        const t = new Date(date.getTime() - (i * 90 * 60000) - (dalmaFarki * 60000));
        cycles.push({ time: t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), cycle: i });
      }
    } else {
      // İleriye doğru döngüler
      for (let i = 3; i <= 6; i++) {
        const t = new Date(date.getTime() + (i * 90 * 60000) + (dalmaFarki * 60000));
        cycles.push({ time: t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), cycle: i });
      }
    }
    
    setResult(cycles.map(c => c.time));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hesaplama Tipi</label>
          <select value={type} onChange={e => { setType(e.target.value); setResult([]); }} className="input-field">
            <option value="uyanma">Şu saatte UYANMAK istiyorum</option>
            <option value="uyuma">Şimdi/Şu saatte UYUYACAĞIM</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Saat</label>
          <input type="time" value={saat} onChange={e => setSaat(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>Hesapla</button>

      {result.length > 0 && (
         <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem" }}>
           <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>
             {type === "uyanma" ? "Uyumak için en iyi saatler:" : "Uyanmak için ideal saatler:"}
           </h3>
           <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {result.map((time, idx) => (
                <div key={idx} style={{ padding: "1rem", background: idx === 0 || idx === 1 ? "rgba(59, 130, 246, 0.1)" : "var(--bg-secondary)", border: idx === 0 || idx === 1 ? "1px solid var(--accent-primary)" : "1px solid var(--border)", borderRadius: "8px", flex: 1, minWidth: "120px", textAlign: "center" }}>
                   <div style={{ fontSize: "1.5rem", fontWeight: 700, color: idx === 0 || idx === 1 ? "var(--accent-primary)" : "var(--text-primary)" }}>{time}</div>
                   <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{6 - idx} Döngü</div>
                </div>
              ))}
           </div>
           <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>Ortalama uykuya dalma süresi (15 dk) hesaplamaya dahildir. REM uykusu bölünmeden uyanmak için bu saatleri tercih edin.</p>
         </div>
      )}
    </div>
  );
}

// BMR (Bazal Metabolizma)
export function BmrCalculator() {
  const [cinsiyet, setCinsiyet] = useState("kadin");
  const [yas, setYas] = useState("");
  const [boy, setBoy] = useState("");
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    const y = parseFloat(yas); const b = parseFloat(boy); const k = parseFloat(kilo);
    if (!y || !b || !k) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * k) + (6.25 * b) - (5 * y);
    if (cinsiyet === "erkek") bmr += 5;
    else bmr -= 161;

    setResult(bmr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
           <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Cinsiyet</label>
            <select value={cinsiyet} onChange={e => setCinsiyet(e.target.value)} className="input-field">
              <option value="kadin">Kadın</option>
              <option value="erkek">Erkek</option>
            </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Yaş</label>
          <input type="number" value={yas} onChange={e => setYas(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Kilo (kg)</label>
          <input type="number" value={kilo} onChange={e => setKilo(e.target.value)} className="input-field" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Boy (cm)</label>
          <input type="number" value={boy} onChange={e => setBoy(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla}>BMR Hesapla</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Bazal Metabolizma Hızınız</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.toFixed(0)} <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>kcal/gün</span></div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Hiçbir fiziksel aktivite yapmadan vücudunuzun istirahat halindeyken sadece yaşamsal fonksiyonlarını sürdürmek için harcadığı enerjidir.</p>
        </div>
      )}
    </div>
  );
}

// Alan ve Hacim Hesaplayıcı
export function AreaVolumeCalculator() {
  const [sekil, setSekil] = useState("kare");
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const p1 = parseFloat(param1) || 0;
    const p2 = parseFloat(param2) || 0;
    let r: any = {};

    switch(sekil) {
      case "kare": r = { alan: p1 * p1, cevre: 4 * p1 }; break;
      case "dikdortgen": r = { alan: p1 * p2, cevre: 2 * (p1 + p2) }; break;
      case "daire": r = { alan: Math.PI * p1 * p1, cevre: 2 * Math.PI * p1 }; break;
      case "kup": r = { alan: 6 * p1 * p1, hacim: Math.pow(p1, 3) }; break;
      case "kure": r = { alan: 4 * Math.PI * p1 * p1, hacim: (4/3) * Math.PI * Math.pow(p1, 3) }; break;
      case "silindir": r = { alan: 2 * Math.PI * p1 * (p1 + p2), hacim: Math.PI * p1 * p1 * p2 }; break; // p1: yariçap, p2: yükseklik
    }
    setResult(r);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Şekil Seçin</label>
        <select value={sekil} onChange={e => { setSekil(e.target.value); setParam1(""); setParam2(""); setResult(null); }} className="input-field">
          <option value="kare">Kare (P1: Kenar)</option>
          <option value="dikdortgen">Dikdörtgen (P1: Kenar 1, P2: Kenar 2)</option>
          <option value="daire">Daire (P1: Yarıçap (r))</option>
          <option value="kup">Küp (P1: Kenar)</option>
          <option value="kure">Küre (P1: Yarıçap (r))</option>
          <option value="silindir">Silindir (P1: Yarıçap, P2: Yükseklik)</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Parametre 1</label>
          <input type="number" value={param1} onChange={e => setParam1(e.target.value)} className="input-field" placeholder="Değer (ör: 5)" />
         </div>
         {["dikdortgen", "silindir"].includes(sekil) && (
           <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Parametre 2</label>
            <input type="number" value={param2} onChange={e => setParam2(e.target.value)} className="input-field" placeholder="Değer" />
           </div>
         )}
      </div>
      <button className="btn-primary" onClick={hesapla}>Hesapla</button>

      {result && Object.keys(result).length > 0 && (
         <div style={{ display: "flex", gap: "1rem" }}>
           {result.alan && (
             <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
               <div style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem" }}>Alan</div>
               <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>{result.alan.toFixed(2)}</div>
             </div>
           )}
           {result.cevre && (
             <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
               <div style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem" }}>Çevre</div>
               <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>{result.cevre.toFixed(2)}</div>
             </div>
           )}
           {result.hacim && (
             <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
               <div style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.5rem" }}>Hacim</div>
               <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.hacim.toFixed(2)}</div>
             </div>
           )}
         </div>
      )}
    </div>
  );
}

// Üslü ve Köklü Sayı
export function PowerRootCalculator() {
  const [taban, setTaban] = useState("");
  const [us, setUs] = useState("");
  const [kokDerece, setKokDerece] = useState("2");
  const [tip, setTip] = useState("us"); // us, kok
  const [result, setResult] = useState<number | null>(null);

  const hesapla = () => {
    if (tip === "us") {
      const a = parseFloat(taban); const b = parseFloat(us);
      if (isNaN(a) || isNaN(b)) return;
      setResult(Math.pow(a, b));
    } else {
      const a = parseFloat(taban); const d = parseFloat(kokDerece);
      if (isNaN(a) || isNaN(d) || d === 0) return;
      if (a < 0 && d % 2 === 0) return; // Karmaşık sayı engelleme
      // n. root of x = x ^ (1/n)
      setResult(a < 0 ? -Math.pow(-a, 1/d) : Math.pow(a, 1/d));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>İşlem Tipi</label>
        <select value={tip} onChange={e => { setTip(e.target.value); setResult(null); }} className="input-field">
          <option value="us">Üslü Sayı Hesaplama (x^y)</option>
          <option value="kok">Köklü Sayı Hesaplama (n. dereceden √x)</option>
        </select>
      </div>

      {tip === "us" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Taban Sayısı (x)</label>
            <input type="number" value={taban} onChange={e => setTaban(e.target.value)} className="input-field" />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Üs (Kuvvet) (y)</label>
            <input type="number" value={us} onChange={e => setUs(e.target.value)} className="input-field" />
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Kök İçi (x)</label>
            <input type="number" value={taban} onChange={e => setTaban(e.target.value)} className="input-field" />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Kök Derecesi (n)</label>
            <input type="number" value={kokDerece} onChange={e => setKokDerece(e.target.value)} className="input-field" />
          </div>
        </div>
      )}
      
      <button className="btn-primary" onClick={hesapla}>Hesapla</button>

      {result !== null && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
           <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result}</div>
        </div>
      )}
    </div>
  );
}

// Denklem Çözücü
export function EquationSolverCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    const va = parseFloat(a);
    const vb = parseFloat(b);
    const vc = parseFloat(c) || 0;

    if (isNaN(va) || isNaN(vb)) return;

    if (va === 0) {
      if (vb === 0) return setResult({ type: "none", msg: "Kök yok veya geçersiz." });
      return setResult({ type: "linear", root: -vc / vb });
    }

    const delta = (vb * vb) - (4 * va * vc);
    if (delta > 0) {
      const x1 = (-vb + Math.sqrt(delta)) / (2 * va);
      const x2 = (-vb - Math.sqrt(delta)) / (2 * va);
      setResult({ type: "two", x1, x2, delta });
    } else if (delta === 0) {
      const x = -vb / (2 * va);
      setResult({ type: "one", x, delta });
    } else {
      setResult({ type: "complex", delta });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
       <div style={{ background: "var(--surface-light)", padding: "1rem", borderRadius: "8px", textAlign: "center", fontWeight: 600, fontSize: "1.2rem", letterSpacing: "1px" }}>
         ax² + bx + c = 0
       </div>
       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>a Eklentisi</label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="input-field" placeholder="a" />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>b Eklentisi</label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="input-field" placeholder="b" />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>c (Sabit)</label>
            <input type="number" value={c} onChange={e => setC(e.target.value)} className="input-field" placeholder="c" />
          </div>
       </div>
       <button className="btn-primary" onClick={hesapla}>Kökleri Bul</button>

       {result && (
         <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
            {result.type === "none" && <div style={{ color: "var(--text-secondary)" }}>{result.msg}</div>}
            {result.type === "linear" && <div><div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Birinci dereceden denklem kökü:</div><div style={{ fontSize: "2rem", fontWeight: 800 }}>x = {result.root.toFixed(3)}</div></div>}
            
            {result.delta !== undefined && (
               <div style={{ marginBottom: "1rem", color: "var(--text-muted)", fontWeight: 600 }}>Δ (Delta) = {result.delta}</div>
            )}
            
            {result.type === "complex" && <div style={{ fontWeight: 600, color: "#ef4444" }}>Gerçek boyutlarda kök yoktur (Karmaşık kökler).</div>}
            {result.type === "one" && <div><div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>x₁ = x₂ = {result.x.toFixed(3)}</div></div>}
            {result.type === "two" && (
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                 <div><div style={{ color: "var(--text-muted)" }}>x₁</div><div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.x1.toFixed(3)}</div></div>
                 <div><div style={{ color: "var(--text-muted)" }}>x₂</div><div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result.x2.toFixed(3)}</div></div>
              </div>
            )}
         </div>
       )}
    </div>
  );
}

// Asal Sayı Bulucu
export function PrimeNumberCalculator() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<any>(null);

  const hesapla = () => {
    let n = parseInt(num);
    if (!n || n <= 1) return setResult({ isPrime: false, carpanlar: [] });
    
    // Check if prime
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
       if (n % i === 0) { isPrime = false; break; }
    }

    // Carpanlara ayirma
    const carpanlar = [];
    let temp = n;
    for (let i = 2; i <= temp; i++) {
        while (temp % i === 0) {
            carpanlar.push(i);
            temp = temp / i;
        }
    }

    setResult({ isPrime, carpanlar });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Sayıyı Giriniz</label>
        <input type="number" value={num} onChange={e => setNum(e.target.value)} className="input-field" placeholder="Örn: 144" />
      </div>
      <button className="btn-primary" onClick={hesapla}>Asal Mı & Çarpanları Neler?</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
           <div style={{ fontSize: "1.5rem", fontWeight: 800, color: result.isPrime ? "#10b981" : "#ef4444", marginBottom: "1rem" }}>
             {result.isPrime ? "ASAL SAYI ✅" : "ASAL DEĞİL ❌"}
           </div>
           
           {!result.isPrime && result.carpanlar.length > 0 && (
             <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Asal Çarpanları</div>
                <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "8px", fontWeight: 600, letterSpacing: "1px", wordBreak: "break-all" }}>
                  {result.carpanlar.join(" × ")}
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
