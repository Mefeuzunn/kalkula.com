"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { ShieldCheck, Landmark, CreditCard, Hash, Copy, Trash2, AlertCircle, CheckCircle, Info, Shield, Zap, Search } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function IbanValidator() {
  const [iban, setIban] = useState("");
  const [result, setResult] = useState<{ isValid: boolean; message: string; details?: { country: string; check: string; bank: string; account: string } } | null>(null);

  const validateIban = (val: string = iban) => {
    let str = val.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (!str) { 
      setResult(null); 
      return; 
    }
    
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
       if (val.length > 10) {
         confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#22c55e", "#ffffff"] });
       }
    } else {
       setResult({ isValid: false, message: "Checksum (Doğrulama) Hatası" });
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(iban);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const reset = () => { 
    setIban(""); 
    setResult(null); 
  };

  useEffect(() => { 
    validateIban(); 
  }, [iban]);

  return (
    <V2CalculatorWrapper
      title="IBAN DOĞRULAYICI"
      icon="💳"
      infoText="IBAN numaralarını MOD 97 algoritması ile anında doğrulayın. Banka kodu, ülke kodu ve hesap numarası detaylarını çözümleyin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.isValid ? "emerald" : "red"}
            label={result.isValid ? "IBAN DOĞRULANDI" : "HATA TESPİT EDİLDİ"}
            value={result.message}
            subLabel={result.isValid ? "Checksum Analizi Başarılı" : "Sözdizimi Hatası"}
            icon={result.isValid ? "✅" : "❌"}
          />
          
          {result.isValid && result.details && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                       <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-blue-500 uppercase italic">ÜLKE KODU</div>
                       <div className="text-xl font-black text-primary italic">{result.details.country}</div>
                    </div>
                 </div>
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                       <Hash className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-purple-500 uppercase italic">BANKA KODU</div>
                       <div className="text-xl font-black text-primary italic">{result.details.bank}</div>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic mb-2">HESAP / ŞUBE NO</div>
                 <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-primary font-mono text-lg break-all text-center tracking-widest">
                    {result.details.account}
                 </div>
              </div>

              <button 
                onClick={copy}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 hover:bg-blue-500 transition-all active:scale-95"
              >
                 <Copy className="w-4 h-4" /> IBAN'I KOPYALA
              </button>
            </div>
          )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <CreditCard className="w-4 h-4 text-blue-500" /> IBAN NUMARASI
              </div>
              <button 
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <input 
                type="text" 
                value={iban} 
                onChange={e => setIban(e.target.value)} 
                className={`w-full p-8 rounded-2xl bg-white/5 border-2 ${result?.isValid === true ? 'border-emerald-500/50' : result?.isValid === false ? 'border-red-500/50' : 'border-white/10'} text-primary font-mono text-2xl font-black text-center tracking-widest focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-muted/20`}
                placeholder="TR00 0000 0000..."
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Search className="w-8 h-8 text-blue-500" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">GÜVENLİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">MOD 97 Matematiksel Denetim</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">HIZ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anında Detay Analizi</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Shield className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Bu araç matematiksel doğrulama yapar. IBAN'ın fiziki varlığı ve sahibi sadece banka sistemlerinden teyit edilebilir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
