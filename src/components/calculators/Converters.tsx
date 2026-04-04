"use client";

import { useState } from "react";

// Uzunluk Çevirici
export function LengthConverter() {
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [val, setVal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const units: Record<string, number> = {
    "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000, "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.344
  };
  const unitNames: Record<string, string> = {
    "mm": "Milimetre", "cm": "Santimetre", "m": "Metre", "km": "Kilometre", "in": "İnç (Inch)", "ft": "Fit (Foot)", "yd": "Yarda (Yard)", "mi": "Mil (Mile)"
  };

  const handleConvert = () => {
    const v = parseFloat(val);
    if(isNaN(v)) return;
    // Metre'ye çevirip hedefe bölüyoruz
    const inMeters = v * units[from];
    const output = inMeters / units[to];
    // hassas
    setResult(output.toPrecision(7).replace(/\.?0+$/, ""));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Miktar ve Birim</label>
          <div style={{ display: "flex" }}>
            <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1 }} />
            <select value={from} onChange={e => setFrom(e.target.value)} className="input-field" style={{ width: "100px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0 }}>
              {Object.entries(unitNames).map(([k, v]) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>
        
        <div style={{ paddingBottom: "0.75rem", color: "var(--text-muted)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hedef Birim</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="input-field">
            {Object.entries(unitNames).map(([k, v]) => <option key={k} value={k}>{v} ({k})</option>)}
          </select>
        </div>
      </div>
      <button className="btn-primary" onClick={handleConvert}>Dönüştür</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center", marginTop: "1rem" }}>
           <div style={{ color: "var(--text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>Sonuç</div>
           <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)", wordBreak: "break-all" }}>
             {result} <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>{to}</span>
           </div>
        </div>
      )}
    </div>
  );
}

// Ağırlık, Alan, Sıcaklık için benzer mantığı uygulayalım
export function WeightConverter() {
    const [from, setFrom] = useState("kg");
    const [to, setTo] = useState("lb");
    const [val, setVal] = useState("");
    const [result, setResult] = useState<string | null>(null);
  
    const units: Record<string, number> = {
      "mg": 0.000001, "g": 0.001, "kg": 1, "t": 1000, "oz": 0.0283495, "lb": 0.453592
    };
    
    const handleConvert = () => {
      const v = parseFloat(val);
      if(isNaN(v)) return;
      const inKg = v * units[from];
      const output = inKg / units[to];
      setResult(output.toPrecision(7).replace(/\.?0+$/, ""));
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Miktar ve Birim</label>
            <div style={{ display: "flex" }}>
              <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1 }} />
              <select value={from} onChange={e => setFrom(e.target.value)} className="input-field" style={{ width: "80px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0 }}>
                {Object.keys(units).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <div style={{ paddingBottom: "0.75rem", color: "var(--text-muted)" }}>→</div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Hedef Birim</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="input-field">
              {Object.keys(units).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={handleConvert}>Dönüştür</button>
  
        {result && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
             <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result} <span style={{ fontSize: "1.2rem" }}>{to}</span></div>
          </div>
        )}
      </div>
    );
}

// Sıcaklık 
export function TempConverter() {
    const [from, setFrom] = useState("C");
    const [to, setTo] = useState("F");
    const [val, setVal] = useState("");
    const [result, setResult] = useState<string | null>(null);
    
    const handleConvert = () => {
      const v = parseFloat(val);
      if(isNaN(v)) return;
      let output = 0;
      if (from === "C" && to === "F") output = (v * 9/5) + 32;
      else if (from === "C" && to === "K") output = v + 273.15;
      else if (from === "F" && to === "C") output = (v - 32) * 5/9;
      else if (from === "F" && to === "K") output = (v - 32) * 5/9 + 273.15;
      else if (from === "K" && to === "C") output = v - 273.15;
      else if (from === "K" && to === "F") output = (v - 273.15) * 9/5 + 32;
      else output = v;
      setResult(output.toFixed(2));
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "end" }}>
          <div>
            <div style={{ display: "flex" }}>
              <input type="number" value={val} onChange={e => setVal(e.target.value)} className="input-field" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1 }} />
              <select value={from} onChange={e => setFrom(e.target.value)} className="input-field" style={{ width: "80px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0 }}>
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
              </select>
            </div>
          </div>
          <div style={{ paddingBottom: "0.75rem", color: "var(--text-muted)" }}>→</div>
          <div>
            <select value={to} onChange={e => setTo(e.target.value)} className="input-field">
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={handleConvert}>Dönüştür</button>
  
        {result && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
             <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result} <span style={{ fontSize: "1.2rem" }}>{to === "C" || to === "F" ? `°${to}` : to}</span></div>
          </div>
        )}
      </div>
    );
}
