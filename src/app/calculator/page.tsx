"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type HistoryEntry = { expression: string; result: string };
type Mode = "standard" | "scientific";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mode, setMode] = useState<Mode>("standard");
  const [justCalculated, setJustCalculated] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [showHistory, setShowHistory] = useState(false);
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");

  const toRad = (x: number) => angleMode === "deg" ? x * Math.PI / 180 : x;

  const appendToDisplay = useCallback((val: string) => {
    setJustCalculated(false);
    if (justCalculated && /[0-9.]/.test(val)) {
      setDisplay(val);
      setExpression("");
    } else if (display === "0" && /[0-9]/.test(val)) {
      setDisplay(val);
    } else if (display === "Hata") {
      setDisplay(val === "." ? "0." : val);
    } else {
      setDisplay(prev => prev + val);
    }
  }, [display, justCalculated]);

  const handleOperator = useCallback((op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
    setJustCalculated(false);
  }, [display]);

  const calculate = useCallback(() => {
    try {
      const eq = expression + display;
      if (!eq.trim()) return;
      // safe eval replacement
      const sanitized = eq
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/,/g, ".");
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      const resultStr = Number.isFinite(result) ? String(+result.toPrecision(12)) : "Hata";
      setHistory(h => [{ expression: eq, result: resultStr }, ...h.slice(0, 19)]);
      setDisplay(resultStr);
      setExpression("");
      setJustCalculated(true);
    } catch {
      setDisplay("Hata");
    }
  }, [expression, display]);

  const applyScientific = (fn: string) => {
    const num = parseFloat(display);
    let result: number;
    switch (fn) {
      case "sin": result = Math.sin(toRad(num)); break;
      case "cos": result = Math.cos(toRad(num)); break;
      case "tan": result = Math.tan(toRad(num)); break;
      case "√": result = Math.sqrt(num); break;
      case "x²": result = num * num; break;
      case "x³": result = num * num * num; break;
      case "1/x": result = 1 / num; break;
      case "log": result = Math.log10(num); break;
      case "ln": result = Math.log(num); break;
      case "π": result = Math.PI; break;
      case "e": result = Math.E; break;
      case "!": {
        let f = 1; for (let i = 2; i <= num; i++) f *= i;
        result = f; break;
      }
      default: result = num;
    }
    const res = +result.toPrecision(10);
    setDisplay(String(res));
    setJustCalculated(true);
  };

  const clear = () => { setDisplay("0"); setExpression(""); setJustCalculated(false); };
  const backspace = () => {
    if (display.length <= 1 || display === "Hata") setDisplay("0");
    else setDisplay(d => d.slice(0, -1));
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") appendToDisplay(e.key);
      else if (e.key === ".") appendToDisplay(".");
      else if (e.key === "+") handleOperator("+");
      else if (e.key === "-") handleOperator("-");
      else if (e.key === "*") handleOperator("*");
      else if (e.key === "/") { e.preventDefault(); handleOperator("/"); }
      else if (e.key === "Enter" || e.key === "=") calculate();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clear();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [appendToDisplay, handleOperator, calculate]);

  const numDisplay = display.length > 12 ? parseFloat(display).toExponential(6) : display;

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <Link href="/" className="btn-secondary">← Geri</Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Hesap Makinesi</h1>
          <button className="btn-secondary" onClick={() => setShowHistory(h => !h)}>
            {showHistory ? "Kapat" : "Geçmiş"}
          </button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem", marginBottom: "1rem", maxHeight: "200px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Son İşlemler</span>
              <button onClick={() => setHistory([])} style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>Temizle</button>
            </div>
            {history.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>Henüz hesaplama yok.</p>
            ) : history.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
                onClick={() => { setDisplay(h.result); setExpression(""); }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{h.expression}</span>
                <span style={{ fontWeight: 600, color: "var(--accent-primary)", fontSize: "0.9rem" }}>{h.result}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main Calculator */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
          {/* Mode & Angle toggle */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
            <button onClick={() => setMode("standard")}
              style={{ flex: 1, padding: "0.6rem", fontWeight: mode === "standard" ? 700 : 400, background: mode === "standard" ? "var(--accent-primary)" : "none", color: mode === "standard" ? "white" : "var(--text-muted)", border: "none", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" }}>
              Standart
            </button>
            <button onClick={() => setMode("scientific")}
              style={{ flex: 1, padding: "0.6rem", fontWeight: mode === "scientific" ? 700 : 400, background: mode === "scientific" ? "var(--accent-primary)" : "none", color: mode === "scientific" ? "white" : "var(--text-muted)", border: "none", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" }}>
              Bilimsel
            </button>
            {mode === "scientific" && (
              <button onClick={() => setAngleMode(a => a === "deg" ? "rad" : "deg")}
                style={{ padding: "0.6rem 1rem", background: "var(--bg-tertiary)", color: "var(--accent-primary)", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.75rem" }}>
                {angleMode.toUpperCase()}
              </button>
            )}
          </div>

          {/* Display */}
          <div style={{ padding: "1.25rem 1.5rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ minHeight: "1.5rem", color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "right", fontFamily: "monospace" }}>
              {expression || "\u00a0"}
            </div>
            <div style={{ fontSize: numDisplay.length > 10 ? "1.8rem" : "2.5rem", fontWeight: 700, textAlign: "right", fontFamily: "monospace", transition: "font-size 0.2s", color: "var(--text-primary)", overflow: "hidden", whiteSpace: "nowrap" }}>
              {numDisplay}
            </div>
            {/* Memory indicator */}
            {memory !== 0 && <div style={{ fontSize: "0.75rem", color: "var(--accent-primary)", textAlign: "right" }}>M: {memory}</div>}
          </div>

          {/* Scientific row */}
          {mode === "scientific" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1px", background: "var(--border)", padding: "1px" }}>
              {[
                { label: "sin", fn: "sin" }, { label: "cos", fn: "cos" }, { label: "tan", fn: "tan" },
                { label: "log", fn: "log" }, { label: "ln", fn: "ln" }, { label: "π", fn: "π" },
                { label: "√", fn: "√" }, { label: "x²", fn: "x²" }, { label: "x³", fn: "x³" },
                { label: "1/x", fn: "1/x" }, { label: "n!", fn: "!" }, { label: "e", fn: "e" },
              ].map(b => (
                <button key={b.fn} onClick={() => applyScientific(b.fn)}
                  style={{ padding: "0.6rem 0", background: "var(--bg-secondary)", color: "var(--accent-primary)", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-glow)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-secondary)")}>
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {/* Memory row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px", background: "var(--border)", padding: "1px" }}>
            {[
              { label: "MC", fn: () => setMemory(0) },
              { label: "MR", fn: () => { setDisplay(String(memory)); setJustCalculated(true); } },
              { label: "M+", fn: () => setMemory(m => m + parseFloat(display)) },
              { label: "M-", fn: () => setMemory(m => m - parseFloat(display)) },
              { label: "MS", fn: () => setMemory(parseFloat(display)) },
            ].map(b => (
              <button key={b.label} onClick={b.fn}
                style={{ padding: "0.5rem 0", background: "var(--bg-tertiary)", color: "var(--text-muted)", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>

          {/* Main Keypad */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--border)", padding: "1px" }}>
            {/* Row 1 */}
            <button onClick={clear} style={btnStyle("action")}>AC</button>
            <button onClick={() => setDisplay(p => String(parseFloat(p) * -1))} style={btnStyle("action")}>+/-</button>
            <button onClick={() => setDisplay(p => String(parseFloat(p) / 100))} style={btnStyle("action")}>%</button>
            <button onClick={() => handleOperator("/")} style={btnStyle("op")}>÷</button>
            {/* Row 2 */}
            <button onClick={() => appendToDisplay("7")} style={btnStyle("num")}>7</button>
            <button onClick={() => appendToDisplay("8")} style={btnStyle("num")}>8</button>
            <button onClick={() => appendToDisplay("9")} style={btnStyle("num")}>9</button>
            <button onClick={() => handleOperator("*")} style={btnStyle("op")}>×</button>
            {/* Row 3 */}
            <button onClick={() => appendToDisplay("4")} style={btnStyle("num")}>4</button>
            <button onClick={() => appendToDisplay("5")} style={btnStyle("num")}>5</button>
            <button onClick={() => appendToDisplay("6")} style={btnStyle("num")}>6</button>
            <button onClick={() => handleOperator("-")} style={btnStyle("op")}>−</button>
            {/* Row 4 */}
            <button onClick={() => appendToDisplay("1")} style={btnStyle("num")}>1</button>
            <button onClick={() => appendToDisplay("2")} style={btnStyle("num")}>2</button>
            <button onClick={() => appendToDisplay("3")} style={btnStyle("num")}>3</button>
            <button onClick={() => handleOperator("+")} style={btnStyle("op")}>+</button>
            {/* Row 5 */}
            <button onClick={backspace} style={btnStyle("action")}>⌫</button>
            <button onClick={() => appendToDisplay("0")} style={btnStyle("num")}>0</button>
            <button onClick={() => appendToDisplay(".")} style={btnStyle("num")}>,</button>
            <button onClick={calculate} style={{ ...btnStyle("op"), background: "var(--accent-primary)", color: "white" }}>=</button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.75rem" }}>
          Klavye ile de kullanabilirsiniz • Enter = hesapla • Esc = temizle
        </p>
      </div>
    </div>
  );
}

function btnStyle(type: "num" | "op" | "action"): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "1.1rem 0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1.15rem",
    fontWeight: 600,
    transition: "background 0.1s",
    fontFamily: "inherit",
  };
  if (type === "num") return { ...base, background: "var(--surface)", color: "var(--text-primary)" };
  if (type === "op") return { ...base, background: "var(--bg-secondary)", color: "var(--accent-primary)" };
  return { ...base, background: "var(--bg-tertiary)", color: "var(--text-secondary)" };
}
