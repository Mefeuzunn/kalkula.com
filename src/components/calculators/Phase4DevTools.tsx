"use client";

import { useState } from "react";
import { ShareResultButton } from "../ShareResultButton";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 4));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>JSON Verisi (Giriş)</label>
        <textarea 
          placeholder='{"isim":"kalküla"}' 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="input-field"
          style={{ minHeight: "150px", fontFamily: "monospace" }}
        />
      </div>
      
      <div style={{ display: "flex", gap: "1rem" }}>
         <button className="btn-primary" onClick={format} style={{ flex: 1 }}>Güzelleştir (Format)</button>
         <button className="btn-secondary" onClick={minify} style={{ flex: 1 }}>Sıkıştır (Minify)</button>
      </div>

      {error && (
        <div style={{ background: "#ef444420", color: "#ef4444", padding: "1rem", borderRadius: "8px", border: "1px solid #ef4444" }}>
           Hata: {error}
        </div>
      )}

      {output && (
        <div style={{ position: "relative" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--accent-primary)" }}>Sonuç</label>
          <textarea 
            value={output} 
            readOnly
            className="input-field"
            style={{ minHeight: "250px", fontFamily: "monospace", background: "var(--bg-secondary)" }}
          />
        </div>
      )}
    </div>
  );
}

export function HashGenerator() {
  const [text, setText] = useState("");
  const [base64Enc, setBase64Enc] = useState("");
  const [base64Dec, setBase64Dec] = useState("");

  const processBasic = () => {
    if (!text) { setBase64Enc(""); setBase64Dec(""); return; }
    
    // Base64 Encode
    try { setBase64Enc(btoa(unescape(encodeURIComponent(text)))); } catch(e) { setBase64Enc("Error"); }
    
    // Base64 Decode
    try { setBase64Dec(decodeURIComponent(escape(atob(text)))); } catch(e) { setBase64Dec("Invalid Base64"); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Metin veya Base64 Kodu Girin</label>
        <textarea 
          value={text} 
          onChange={e => { setText(e.target.value); setTimeout(processBasic, 100); }} 
          className="input-field"
          style={{ minHeight: "100px" }}
        />
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
         <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--accent-secondary)", fontWeight: 600, marginBottom: "0.5rem" }}>Base64 Encode (Şifreleme)</div>
            <div style={{ wordBreak: "break-all", fontFamily: "monospace", color: "var(--text-primary)" }}>{base64Enc || "Bekleniyor..."}</div>
         </div>
         <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "0.5rem" }}>Base64 Decode (Çözme)</div>
            <div style={{ wordBreak: "break-all", fontFamily: "monospace", color: "var(--text-primary)" }}>{base64Dec || "Bekleniyor..."}</div>
         </div>
      </div>
    </div>
  );
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    if (isNaN(r) || isNaN(g) || isNaN(b)) return "";
    return "rgb(" + r + ", " + g + ", " + b + ")";
  };

  const rgbToHex = (rStr: string) => {
    const arr = rStr.match(/\\d+/g);
    if (!arr || arr.length < 3) return "";
    const r = parseInt(arr[0]), g = parseInt(arr[1]), b = parseInt(arr[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const handleHexChange = (v: string) => {
    setHex(v);
    if(v.startsWith("#") && (v.length === 4 || v.length === 7)) {
       setRgb(hexToRgb(v));
    }
  };

  const handleRgbChange = (v: string) => {
    setRgb(v);
    const converted = rgbToHex(v);
    if(converted) setHex(converted);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      
      {/* Color Preview */}
      <div style={{ width: "100%", height: "120px", background: hex, borderRadius: "12px", border: "1px solid var(--border)", transition: "background 0.3s" }}></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>HEX Kodu</label>
            <input type="text" value={hex} onChange={e => handleHexChange(e.target.value)} className="input-field" placeholder="#RRGGBB" />
         </div>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>RGB Kodu</label>
            <input type="text" value={rgb} onChange={e => handleRgbChange(e.target.value)} className="input-field" placeholder="rgb(r, g, b)" />
         </div>
      </div>
    </div>
  );
}
