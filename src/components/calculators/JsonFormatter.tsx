"use client";

import React, { useState, useEffect } from "react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = (mode: 'pretty' | 'minify') => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = mode === 'pretty' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError("Hatalı JSON Formatı: " + (e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label text-[10px] font-black">Giriş (Raw JSON)</label>
          <textarea 
            className="calc-input h-64 font-mono text-xs !bg-secondary/5 resize-none border-2 focus:border-accent-primary transition-all p-4 rounded-3xl"
            placeholder='{"key": "value"}'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        <div className="calc-input-group">
          <label className="calc-label text-[10px] font-black">Çıkış (Formatlanmış)</label>
          <textarea 
            readOnly
            className={`calc-input h-64 font-mono text-xs !bg-secondary/10 resize-none border-2 ${error ? "border-red-500/30" : "border-border"} p-4 rounded-3xl`}
            value={output || error}
          />
           {output && (
             <button 
               onClick={copy} 
               className="absolute right-4 bottom-4 p-2 bg-accent-primary text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
             >
               {copied ? "KOPYALANDI" : "KOPYALA"}
             </button>
           )}
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={() => format('pretty')}>✨ Güzel Formatla</button>
        <button className="calc-btn-calculate !bg-black" onClick={() => format('minify')}>⚡ Küçült (Minify)</button>
        <button className="calc-btn-reset" onClick={() => { setInput(""); setOutput(""); setError(""); }}>↺ Temizle</button>
      </div>

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🛠️</span>
        <span className="calc-info-box-text">
          <b>Profesyonel Veri İşleme:</b> JSON verilerinizi anında okunaklı hale getirin veya sunucu performansı için tek satıra indirgeyin. Hatalı JSON girişlerinde otomatik validasyon sağlar.
        </span>
      </div>
    </div>
  );
}
