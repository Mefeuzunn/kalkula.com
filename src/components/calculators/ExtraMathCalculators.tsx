"use client";

import { useState } from "react";

// Kesir Hesaplama
export function FractionsCalculator() {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [islem, setIslem] = useState<"+" | "-" | "*" | "/">("+");
  const [result, setResult] = useState<null | { n: number; d: number; def: string }>(null);

  const ebob = (a: number, b: number): number => {
    return b === 0 ? a : ebob(b, a % b);
  };

  const hesapla = () => {
    const num1 = parseInt(n1); const den1 = parseInt(d1);
    const num2 = parseInt(n2); const den2 = parseInt(d2);
    
    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) return;

    let resN = 0, resD = 1;
    if (islem === "+") {
      resN = (num1 * den2) + (num2 * den1);
      resD = den1 * den2;
    } else if (islem === "-") {
      resN = (num1 * den2) - (num2 * den1);
      resD = den1 * den2;
    } else if (islem === "*") {
      resN = num1 * num2;
      resD = den1 * den2;
    } else if (islem === "/") {
      if (num2 === 0) return;
      resN = num1 * den2;
      resD = den1 * num2;
    }

    const gcd = Math.abs(ebob(resN, resD));
    const finalN = resN / gcd;
    const finalD = resD / gcd;
    
    setResult({ 
      n: finalD < 0 ? -finalN : finalN, 
      d: Math.abs(finalD),
      def: (finalN / finalD).toPrecision(5)
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
        {/* Fraction 1 */}
        <div style={{ display: "flex", flexDirection: "column", width: "80px", gap: "0.25rem" }}>
          <input type="number" value={n1} onChange={e => setN1(e.target.value)} className="input-field" style={{ textAlign: "center", padding: "0.5rem" }} />
          <div style={{ height: "2px", background: "var(--text-primary)", width: "100%" }}></div>
          <input type="number" value={d1} onChange={e => setD1(e.target.value)} className="input-field" style={{ textAlign: "center", padding: "0.5rem" }} />
        </div>

        {/* Operator */}
        <select value={islem} onChange={e => setIslem(e.target.value as any)} className="input-field" style={{ width: "60px", textAlign: "center", fontSize: "1.5rem", padding: "0.25rem" }}>
          {["+", "-", "*", "/"].map(o => <option key={o} value={o}>{o === "*" ? "×" : o === "/" ? "÷" : o}</option>)}
        </select>

        {/* Fraction 2 */}
        <div style={{ display: "flex", flexDirection: "column", width: "80px", gap: "0.25rem" }}>
          <input type="number" value={n2} onChange={e => setN2(e.target.value)} className="input-field" style={{ textAlign: "center", padding: "0.5rem" }} />
          <div style={{ height: "2px", background: "var(--text-primary)", width: "100%" }}></div>
          <input type="number" value={d2} onChange={e => setD2(e.target.value)} className="input-field" style={{ textAlign: "center", padding: "0.5rem" }} />
        </div>
      </div>
      
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Eşittir (=)</button>

      {result && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700 }}>{result.n}</span>
            <div style={{ height: "3px", background: "var(--accent-primary)", width: "100%", borderRadius: "2px" }}></div>
            <span style={{ fontSize: "2rem", fontWeight: 700 }}>{result.d}</span>
          </div>
          <span style={{ fontSize: "2rem", color: "var(--text-muted)" }}>≈</span>
          <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-secondary)" }}>{result.def}</span>
        </div>
      )}
    </div>
  );
}

// Logaritma Hesaplama
export function LogarithmCalculator() {
  const [base, setBase] = useState("10");
  const [val, setVal] = useState("");
  const [result, setResult] = useState<null | string>(null);

  const hesapla = () => {
    const b = parseFloat(base);
    const x = parseFloat(val);
    if (isNaN(b) || isNaN(x) || b <= 0 || b === 1 || x <= 0) return;
    
    // log_b(x) = ln(x) / ln(b)
    const res = Math.log(x) / Math.log(b);
    setResult(res.toPrecision(8));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Taban (b)</label>
          <input type="number" placeholder="Örn: 10, 2, e" value={base} onChange={e => setBase(e.target.value)} className="input-field" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Değer (x)</label>
          <input type="number" placeholder="Örn: 100" value={val} onChange={e => setVal(e.target.value)} className="input-field" />
        </div>
      </div>
      <button className="btn-primary" onClick={hesapla} style={{ padding: "0.85rem" }}>Logaritma Değerini Bul</button>

      {result && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.2rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>log</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, transform: "translateY(5px)" }}>{base}</span>
            <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>({val})</span>
            <span style={{ fontSize: "1.5rem", margin: "0 0.5rem" }}>=</span>
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{result}</div>
        </div>
      )}
    </div>
  );
}
