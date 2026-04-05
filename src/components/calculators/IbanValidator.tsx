import React, { useState } from "react";
import confetti from "canvas-confetti";

export function IbanValidator() {
  const [iban, setIban] = useState("");
  const [result, setResult] = useState<{ 
    isValid: boolean; 
    message: string; 
    details?: { country: string; check: string; bank: string; account: string } 
  } | null>(null);

  const validateIban = () => {
    let str = iban.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (str.length < 15 || str.length > 34) {
      setResult({ isValid: false, message: "Geçersiz IBAN Uzunluğu! (15-34 karakter olmalı)" });
      return;
    }

    const rearranged = str.substring(4) + str.substring(0, 4);
    let numericString = "";
    for (let i = 0; i < rearranged.length; i++) {
        const charCode = rearranged.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            numericString += (charCode - 55).toString();
        } else {
            numericString += rearranged[i];
        }
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
         message: "IBAN Matematiksel Olarak Doğrudur.",
         details: {
           country: str.substring(0, 2),
           check: str.substring(2, 4),
           bank: str.substring(4, 9),
           account: str.substring(9)
         }
       });
       confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ["#22c55e", "#10b981"] });
    } else {
       setResult({ isValid: false, message: "Geçersiz IBAN! Checksum hatası tespit edildi." });
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(iban);
    alert("IBAN kopyalandı!");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] px-2 italic">IBAN Numarasını Giriniz</label>
        <div className="relative">
          <input 
            type="text" 
            value={iban} 
            onChange={e => { setIban(e.target.value); setResult(null); }} 
            className={`input-field p-8 text-2xl font-mono tracking-widest text-center border-2 transition-all ${result?.isValid ? 'border-green-500/50 bg-green-500/5' : result?.isValid === false ? 'border-red-500/50 bg-red-500/5' : 'border-border'}`}
            placeholder="TR00 0000 0000..." 
          />
          {iban && (
             <button onClick={() => setIban("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-primary">✕</button>
          )}
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-bold shadow-2xl uppercase tracking-widest" onClick={validateIban}>Doğruluğunu Sorgula</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className={`result-card-premium ${result.isValid ? 'border-green-500/20' : 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]'}`}>
              <div className={`result-badge ${result.isValid ? '!bg-green-500/10 !text-green-500 !border-green-500/20' : '!bg-red-500/10 !text-red-500 !border-red-500/20'}`}>
                {result.isValid ? 'GEÇERLİ IBAN' : 'GEÇERSİZ IBAN'}
              </div>
              
              <div className={`text-2xl font-black mb-8 ${result.isValid ? 'text-green-500' : 'text-red-500'}`}>
                 {result.message}
              </div>

              {result.isValid && result.details && (
                <div className="flex flex-col gap-6">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border">
                      <div className="p-4 bg-secondary/10 rounded-2xl">
                         <div className="text-[10px] font-black text-muted uppercase mb-1">Ülke</div>
                         <div className="font-bold text-lg text-primary">{result.details.country}</div>
                      </div>
                      <div className="p-4 bg-secondary/10 rounded-2xl">
                         <div className="text-[10px] font-black text-muted uppercase mb-1">Kontrol</div>
                         <div className="font-bold text-lg text-primary">{result.details.check}</div>
                      </div>
                      <div className="p-4 bg-secondary/10 rounded-2xl">
                         <div className="text-[10px] font-black text-muted uppercase mb-1">Banka Kodu</div>
                         <div className="font-bold text-lg text-primary">{result.details.bank}</div>
                      </div>
                      <div className="p-4 bg-secondary/10 rounded-2xl">
                         <div className="text-[10px] font-black text-muted uppercase mb-1">Hesap / Diğer</div>
                         <div className="font-bold text-lg text-primary truncate" title={result.details.account}>{result.details.account.substring(0, 6)}...</div>
                      </div>
                   </div>

                   <button onClick={copy} className="flex items-center justify-center gap-2 py-3 bg-accent-glow/10 text-accent-primary rounded-xl font-bold hover:bg-accent-primary hover:text-white transition-all border border-accent-primary/20">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a1 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                      IBAN'ı Kopyala
                   </button>
                </div>
              )}
           </div>
        </div>
      )}

      <div className="mt-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-xs text-blue-600 dark:text-blue-400 leading-relaxed italic">
        💡 IBAN doğrulamada <b>MOD 97</b> standardı kullanılır. Bu matematiksel bir kontroldür. IBAN'ın kime ait olduğunu veya bankada aktif olup olmadığını sadece ilgili banka teyit edebilir.
      </div>
    </div>
  );
}
