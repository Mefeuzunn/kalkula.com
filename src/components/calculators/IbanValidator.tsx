"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function IbanValidator() {
  const [iban, setIban] = useState("");
  const [result, setResult] = useState<{ isValid: boolean; message: string; details?: { country: string; check: string; bank: string; account: string } } | null>(null);

  const validateIban = () => {
    let str = iban.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (!str) { setResult(null); return; }
    if (str.length < 15 || str.length > 34) {
      setResult({ isValid: false, message: "Geçersiz Uzunluk" });
      return;
    }

    const rearranged = str.substring(4) + str.substring(0, 4);
    let numericString = "";
    for (let i = 0; i < rearranged.length; i++) {
        const charCode = rearranged.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) numericString += (charCode - 55).toString();
        else numericString += rearranged[i];
    }

    let remainder = numericString;
    let block;
    while (remainder.length > 2) {
      block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
    }
    const finalMod = parseInt(remainder, 10) % 97;

    if (finalMod === 1) {
       setResult({ 
         isValid: true, 
         message: "Matematiksel Olarak Doğru",
         details: { country: str.substring(0, 2), check: str.substring(2, 4), bank: str.substring(4, 9), account: str.substring(9) }
       });
    } else {
       setResult({ isValid: false, message: "Checksum Hatası" });
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(iban);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ["#22c55e", "#10b981"] });
    alert("IBAN kopyalandı!");
  };

  const reset = () => { setIban(""); setResult(null); };

  useEffect(() => { validateIban(); }, [iban]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">IBAN Numarası</label>
        <div className="calc-input-wrapper relative">
          <input 
            type="text" 
            value={iban} 
            onChange={e => setIban(e.target.value)} 
            className="calc-input" 
            style={{ 
              fontFamily: "monospace", 
              letterSpacing: "2px", 
              fontSize: "1.2rem", 
              textAlign: "center",
              borderColor: result?.isValid ? "#22c55e" : result?.isValid === false ? "#ef4444" : "var(--border)",
              color: result?.isValid ? "#166534" : result?.isValid === false ? "#991b1b" : "var(--text-primary)",
              backgroundColor: result?.isValid ? "rgba(34,197,94,0.05)" : result?.isValid === false ? "rgba(239,68,68,0.05)" : "var(--surface)"
            }}
            placeholder="TR00 0000 0000 0000 0000 0000 00" 
          />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla / Temizle</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header" style={{ color: result.isValid ? "#166534" : "#991b1b" }}>
            {result.isValid ? "✅ IBAN Doğrulandı" : "❌ Geçersiz IBAN"}
          </div>
          <div className="calc-result-body">
            <div className="calc-result-hero" style={{ background: result.isValid ? "linear-gradient(135deg, rgba(34,197,94,0.1), transparent)" : "linear-gradient(135deg, rgba(239,68,68,0.1), transparent)", marginBottom: result.isValid ? "1rem" : 0 }}>
              <div className="calc-result-hero-value" style={{ color: result.isValid ? "#22c55e" : "#ef4444", fontSize: "2rem" }}>
                {result.message}
              </div>
            </div>

            {result.isValid && result.details && (
              <>
                <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "1rem" }}>
                  <div className="calc-result-card">
                    <div className="calc-result-card-label">Ülke Kodu</div>
                    <div className="calc-result-card-value font-bold">{result.details.country}</div>
                  </div>
                  <div className="calc-result-card">
                    <div className="calc-result-card-label">Banka Kodu</div>
                    <div className="calc-result-card-value font-bold">{result.details.bank}</div>
                  </div>
                </div>
                <div className="calc-result-row">
                  <span className="calc-result-row-label">Hesap / Diğer Şube No:</span>
                  <span className="calc-result-row-value">{result.details.account}</span>
                </div>
                <button 
                  onClick={copy} 
                  className="calc-btn-calculate" 
                  style={{ width: "100%", marginTop: "1rem", background: "var(--surface)", border: "1px solid var(--accent-primary)", color: "var(--accent-primary)" }}
                >
                  📋 İBAN'ı Kopyala
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Bu araç MOD 97 algoritması ile matematiksel doğrulama yapar. IBAN'ın gerçekten var olup olmadığı veya hangi isme ait olduğu sadece banka sistemlerinden teyit edilebilir.</span>
      </div>
    </div>
  );
}
