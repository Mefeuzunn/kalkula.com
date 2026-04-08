"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Lock, Unlock, Braces, ShieldCheck, Copy, Trash2, Zap, Code, Terminal, Sparkles } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function Base64Converter() {
  const [text, setText] = useState("");
  const [base64Enc, setBase64Enc] = useState("");
  const [base64Dec, setBase64Dec] = useState("");
  const [isError, setIsError] = useState(false);

  const processBasic = (val: string) => {
    setText(val);
    if (!val.trim()) { 
      setBase64Enc(""); 
      setBase64Dec(""); 
      setIsError(false); 
      return; 
    }
    
    // Encode (UTF-8 Güvenli)
    try { 
       const encoded = btoa(unescape(encodeURIComponent(val)));
       setBase64Enc(encoded); 
    } catch(e) { 
       setBase64Enc("Hata"); 
    }
    
    // Decode (UTF-8 Güvenli)
    try { 
      const decoded = decodeURIComponent(escape(atob(val)));
      setBase64Dec(decoded); 
      setIsError(false);
    } catch(e) { 
      setBase64Dec("Geçersiz Base64"); 
      setIsError(true);
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const reset = () => {
    setText("");
    setBase64Enc("");
    setBase64Dec("");
    setIsError(false);
  };

  return (
    <V2CalculatorWrapper
      title="BASE64 DÖNÜŞTÜRÜCÜ"
      icon="⚡"
      infoText="Verilerinizi Base64 formatına güvenli bir şekilde encode edin veya mevcut Base64 kodlarını çözün. UTF-8 uyumlu ve hızlı işlem."
      results={text && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-black text-muted uppercase italic tracking-widest">Base64 Encode</span>
                   </div>
                   {base64Enc && base64Enc !== "Hata" && (
                      <button 
                        onClick={() => copy(base64Enc)}
                        className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/10 hover:bg-blue-500 hover:text-white transition-all active:scale-90"
                      >
                         <Copy className="w-3 h-3" />
                      </button>
                   )}
                </div>
                <div className="font-mono text-xs break-all bg-black/20 p-5 rounded-2xl border border-white/5 min-h-[120px] text-primary/80 leading-relaxed">
                   {base64Enc || "Bekleniyor..."}
                </div>
             </div>

             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Unlock className={`w-4 h-4 ${isError ? 'text-red-500' : 'text-emerald-500'}`} />
                      <span className="text-[10px] font-black text-muted uppercase italic tracking-widest">Base64 Decode</span>
                   </div>
                   {base64Dec && !isError && (
                      <button 
                        onClick={() => copy(base64Dec)}
                        className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                      >
                         <Copy className="w-3 h-3" />
                      </button>
                   )}
                </div>
                <div className={`font-mono text-xs break-all bg-black/20 p-5 rounded-2xl border border-white/5 min-h-[120px] leading-relaxed ${isError ? 'text-red-500 italic' : 'text-primary/80'}`}>
                   {base64Dec || "Bekleniyor..."}
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu işlem tamamen tarayıcı tarafında gerçekleşir. Verileriniz sunucularımıza gönderilmez, gizliliğiniz korunur.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Terminal className="w-4 h-4" /> GİRDİ VERİSİ
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => copy(text)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                 >
                    <Copy className="w-3 h-3" /> KOPYALA
                 </button>
                 <button 
                  onClick={reset}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
                 >
                    <Trash2 className="w-3 h-3" /> TEMİZLE
                 </button>
              </div>
           </div>
           
           <div className="relative group">
              <textarea 
                placeholder="Şifrelenecek metni veya çözülecek Base64 kodunu buraya girin..."
                value={text} 
                onChange={e => processBasic(e.target.value)} 
                className="w-full min-h-[220px] p-6 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-mono text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder:text-muted/30 placeholder:italic"
              />
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Braces className="w-8 h-8 text-blue-500" />
              </div>
           </div>
        </div>

        <div className="flex flex-wrap gap-4">
           <div className="flex-1 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">CANLI DÖNÜŞÜM</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Yazdığınız anda sonuçlar güncellenir</div>
              </div>
           </div>
           <div className="flex-1 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">UTF-8 DESTEĞİ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Türkçe karakterler güvenle korunur</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
