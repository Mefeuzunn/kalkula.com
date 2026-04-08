"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Lock, Unlock, Eye, Calendar, Clock, Terminal, AlertCircle, Copy, Check, ShieldCheck, Key, Fingerprint, Zap, Code, Braces, Sparkles, Binary, Shield, Trash2 } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function JwtDebugger() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");

  const decodeJwt = (token: string) => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError("");
      return;
    }

    // Clean potential "Bearer " prefix
    const cleanToken = token.replace(/^Bearer\s+/i, "");

    try {
      const parts = cleanToken.split(".");
      if (parts.length < 2) throw new Error("Geçersiz JWT formatı. (Format: header.payload.signature)");

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError("");
      
      if (token.length > 20) {
        confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#ef4444", "#a855f7"] });
      }
    } catch (e: any) {
      setError(e.message || "JWT ayrıştırılamadı. Lütfen geçerli bir token girin.");
      setHeader(null);
      setPayload(null);
    }
  };

  useEffect(() => {
    decodeJwt(jwt);
  }, [jwt]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const formatTimestamp = (ts: number) => {
    if (!ts) return "Belirtilmemiş";
    const date = new Date(ts * 1000);
    return date.toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "medium" });
  };

  const reset = () => {
    setJwt("");
    setHeader(null);
    setPayload(null);
    setError("");
  };

  return (
    <V2CalculatorWrapper
      title="JWT DEBUGGER"
      icon="🛡️"
      infoText="JSON Web Token (JWT) içeriklerini anında çözümleyin. Header ve Payload verilerini görselleştirerek claim denetimi yapın."
      results={payload && (
        <div className="space-y-6">
          <div className="space-y-4">
             {/* Header Section */}
             <div className="p-6 rounded-3xl bg-red-600/5 border border-red-600/20 space-y-4 shadow-lg shadow-red-900/5">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black text-red-500 uppercase italic tracking-widest">HEADER: ALGORITHM & TYPE</span>
                   </div>
                   <button 
                     onClick={() => copyToClipboard(JSON.stringify(header, null, 2))}
                     className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                   >
                      <Copy className="w-3 h-3" />
                   </button>
                </div>
                <div className="font-mono text-xs break-all bg-black/40 p-5 rounded-2xl border border-white/5 text-red-300/90 leading-relaxed whitespace-pre overflow-x-auto">
                   {JSON.stringify(header, null, 2)}
                </div>
             </div>

             {/* Payload Section */}
             <div className="p-6 rounded-3xl bg-purple-600/5 border border-purple-600/20 space-y-4 shadow-lg shadow-purple-900/5">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Braces className="w-4 h-4 text-purple-500" />
                      <span className="text-[10px] font-black text-purple-500 uppercase italic tracking-widest">PAYLOAD: DATA & CLAIMS</span>
                   </div>
                   <button 
                     onClick={() => copyToClipboard(JSON.stringify(payload, null, 2))}
                     className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/10 hover:bg-purple-500 hover:text-white transition-all active:scale-90"
                   >
                      <Copy className="w-3 h-3" />
                   </button>
                </div>
                <div className="font-mono text-xs break-all bg-black/40 p-5 rounded-2xl border border-white/5 text-purple-300/90 leading-relaxed whitespace-pre overflow-x-auto">
                   {JSON.stringify(payload, null, 2)}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                   <Clock className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-blue-500 uppercase italic">OLUŞTURULMA (IAT)</div>
                   <div className="text-[10px] text-primary font-bold">{formatTimestamp(payload.iat)}</div>
                </div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                   <Calendar className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-emerald-500 uppercase italic">SON KULLANMA (EXP)</div>
                   <div className="text-[10px] text-primary font-bold">{formatTimestamp(payload.exp)}</div>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex gap-3 items-center">
             <Shield className="w-5 h-5 text-red-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
                <b>Önemli:</b> Bu araç sadece Decode işlemi yapar, imza doğrulaması (verify) yapmaz. Gizli anahtarınızı burada paylaşmayın.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
           <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Lock className="w-4 h-4 text-red-500" /> ENCODED TOKEN
              </div>
              <button 
                onClick={reset}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black italic hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                 <Trash2 className="w-3 h-3" /> TEMİZLE
              </button>
           </div>
           
           <div className="relative group">
              <textarea 
                placeholder="Bearer eyJhbGciOiJIUzI1..."
                value={jwt} 
                onChange={e => setJwt(e.target.value)} 
                className={`w-full min-h-[300px] p-6 rounded-2xl bg-white/5 border-2 ${error ? 'border-red-500/50' : 'border-white/10'} text-primary font-mono text-sm focus:outline-none focus:border-red-500/50 transition-all resize-none placeholder:text-muted/30 placeholder:italic`}
              />
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Terminal className="w-8 h-8 text-red-500" />
              </div>
           </div>

           {error && (
             <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 items-center text-red-500 text-xs font-bold animate-shake">
                <AlertCircle size={16} /> {error}
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                 <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-red-500 uppercase italic">GİZLİLİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">İşlem tamamen tarayıcıda yapılır</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Eye className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">GÖRSELLEŞTİRME</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">JSON Claim Denetimi</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
