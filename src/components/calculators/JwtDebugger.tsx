"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Eye, Calendar, Clock, Terminal, AlertCircle, Copy, Check } from "lucide-react";

export function JwtDebugger() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const decodeJwt = (token: string) => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError("");
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Geçersiz JWT formatı. (Format: header.payload.signature)");

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError("");
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
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTimestamp = (ts: number) => {
    if (!ts) return "Belirtilmemiş";
    const date = new Date(ts * 1000);
    return date.toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "medium" });
  };

  return (
    <div className="calc-wrapper animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-600">
          <Terminal size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">JWT Debugger & Visualizer</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Token Çözümleyici ve Güvenlik Denetimi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
             <div className="space-y-4">
                <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Lock size={14} className="text-red-500" /> ENCODED TOKEN (Yapıştırın)
                </label>
                <textarea 
                  value={jwt}
                  onChange={(e) => setJwt(e.target.value)}
                  placeholder="Bearer eyJhbGciOiJIUzI1..."
                  className="input-field w-full min-h-[350px] !p-6 font-mono text-xs break-all resize-none focus:ring-4 focus:ring-red-500/10 transition-all leading-relaxed"
                />
                
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 items-center text-red-600 text-xs font-bold animate-shake">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Decode Results */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {payload ? (
              <div className="space-y-6 flex flex-col h-full">
                 {/* Header & Payload Cards */}
                 <div className="grid grid-cols-1 gap-6">
                    {/* Header */}
                    <div className="bg-zinc-900 border-l-8 border-red-500 rounded-[2rem] overflow-hidden shadow-2xl">
                       <div className="p-4 bg-zinc-800/50 flex justify-between items-center px-6 border-b border-white/5">
                          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">HEADER: Algorithm & Token Type</span>
                       </div>
                       <div className="p-8">
                          <pre className="text-red-300 font-mono text-sm">
                             {JSON.stringify(header, null, 2)}
                          </pre>
                       </div>
                    </div>

                    {/* Payload */}
                    <div className="bg-zinc-900 border-l-8 border-purple-500 rounded-[2rem] overflow-hidden shadow-2xl flex-grow">
                       <div className="p-4 bg-zinc-800/50 flex justify-between items-center px-6 border-b border-white/5">
                          <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest italic">PAYLOAD: Data & Claims</span>
                          <button 
                             onClick={() => copyToClipboard(JSON.stringify(payload, null, 2))}
                             className={`text-[10px] font-black px-3 py-1 rounded-lg transition-all ${isCopied ? "bg-green-500 text-white" : "bg-white/10 text-white/40 hover:bg-white/20"}`}
                          >
                             {isCopied ? "KOPYALANDI" : "JSON KOPYALA"}
                          </button>
                       </div>
                       <div className="p-8">
                          <pre className="text-purple-300 font-mono text-sm whitespace-pre-wrap break-words">
                             {JSON.stringify(payload, null, 2)}
                          </pre>
                       </div>
                    </div>
                 </div>

                 {/* Key Info Metadata */}
                 <div className="bg-surface p-6 rounded-3xl border border-border flex flex-col md:flex-row gap-6 justify-around">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                          <Clock size={18} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-muted uppercase">OLUŞTURULMA (IAT)</p>
                          <p className="text-xs font-bold text-primary">{formatTimestamp(payload.iat)}</p>
                       </div>
                    </div>
                    <div className="w-px h-10 bg-border hidden md:block" />
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                          <Calendar size={18} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-muted uppercase">SON KULLANMA (EXP)</p>
                          <p className="text-xs font-bold text-primary">{formatTimestamp(payload.exp)}</p>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-12 bg-secondary/10 rounded-[3rem] border-dashed border-4 border-border grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">🔑</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    DECODE İÇİN<br/>SOLA TOKEN YAPIŞTIRIN
                 </h4>
              </div>
           )}
        </div>
      </div>

      <div className="calc-info-box mt-12 bg-red-500/5 border-red-500/20">
        <span className="calc-info-box-icon text-red-600">🛡️</span>
        <span className="calc-info-box-text text-muted">
           <b>Güvenlik Notu:</b> JWT çözme işlemi tamamen <b>tarayıcı tarafında (client-side)</b> yapılır. Token'larınız sunucuya gönderilmez veya loglanmaz. Bu araç sadece veriyi görselleştirir, imzayı doğrulamaz.
        </span>
      </div>
    </div>
  );
}
