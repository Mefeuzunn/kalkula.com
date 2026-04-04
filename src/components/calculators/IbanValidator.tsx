"use client";

import React, { useState } from "react";

export function IbanValidator() {
  const [iban, setIban] = useState("");
  const [result, setResult] = useState<{ isValid: boolean; message: string; data?: any } | null>(null);

  const validateIban = () => {
    let str = iban.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (str.length < 15 || str.length > 34) {
      setResult({ isValid: false, message: "Geçersiz IBAN uzunluğu!" });
      return;
    }

    // Rearrange characters
    const rearranged = str.substring(4) + str.substring(0, 4);

    // Convert letters to numbers (A=10, B=11 ... Z=35)
    let numericString = "";
    for (let i = 0; i < rearranged.length; i++) {
        const charCode = rearranged.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            numericString += (charCode - 55).toString();
        } else {
            numericString += rearranged[i];
        }
    }

    // Mod 97-10 Computation (because integer is too big we divide in chunks)
    let remainder = numericString;
    let block;

    while (remainder.length > 2) {
      block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
    }
    
    const finalMod = parseInt(remainder, 10) % 97;

    if (finalMod === 1) {
       // Turkey specifies 26 chars for IBAN
       let extra = "";
       if (str.startsWith("TR") && str.length === 26) {
         extra = " - Geçerli Türk IBAN numarası.";
       }
       setResult({ isValid: true, message: `IBAN DOĞRU ${extra}` });
    } else {
       setResult({ isValid: false, message: "Matematiksel Checksum Hatası! IBAN Yanlış." });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>ISO 13616 Mod-97-10 standartlarına göre global IBAN doğrulaması yapın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>IBAN Numarası</label>
        <input 
          type="text" 
          value={iban} 
          onChange={e => setIban(e.target.value)} 
          className="input-field" 
          placeholder="Örn: TR12 0000 0000 0000 0000 0000 00" 
          style={{ letterSpacing: "1px", fontFamily: "monospace", fontSize: "1.2rem" }}
        />
      </div>

      <button className="btn-primary" onClick={validateIban} style={{ marginTop: "1rem" }}>Doğruluğunu Sorgula</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.isValid ? '#22c55e' : '#ef4444'}` }}>
           {result.isValid ? (
             <div>
               <div style={{ fontSize: "3rem" }}>✅</div>
               <h3 style={{ color: "#22c55e", fontSize: "1.2rem", marginTop: "1rem" }}>{result.message}</h3>
             </div>
           ) : (
             <div>
               <div style={{ fontSize: "3rem" }}>❌</div>
               <h3 style={{ color: "#ef4444", fontSize: "1.2rem", marginTop: "1rem" }}>{result.message}</h3>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
