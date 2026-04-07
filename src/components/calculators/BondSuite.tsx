"use client";

import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  Landmark, 
  RefreshCw, 
  FileText, 
  BarChart3, 
  Scissors, 
  Info,
  ChevronRight,
  Calculator,
  DollarSign,
  Copy,
  CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";

type BondTool = "eurobond" | "bono" | "tahvil" | "discount" | "iban";

export function BondSuite() {
  const [tool, setTool] = useState<BondTool>("eurobond");

  // Shared States
  const [amount, setAmount] = useState("10000");
  const [price, setPrice] = useState("9500");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("5");
  const [iban, setIban] = useState("");

  const results = useMemo(() => {
    const P = parseFloat(price) || 0;
    const N = parseFloat(amount) || 0;
    const R = parseFloat(rate) / 100 || 0;
    const T = parseFloat(term) || 0;

    switch (tool) {
      case "eurobond": {
        if (P <= 0 || N <= 0 || T <= 0) return null;
        const annualCoupon = N * R;
        const currentYield = (annualCoupon / P) * 100;
        const totalPayment = (annualCoupon * T) + N;
        return { currentYield, totalPayment, totalCoupon: annualCoupon * T };
      }
      case "bono": {
        // Simple Discounted Bond
        if (N <= 0 || R <= 0 || T <= 0) return null;
        const formulaPrice = N / (1 + R * (T / 365));
        return { price: formulaPrice, gain: N - formulaPrice };
      }
      case "tahvil": {
        // Coupon Bond PV
        if (N <= 0 || R <= 0 || T <= 0) return null;
        const coupon = N * R;
        const discRate = 0.45; // Fixed market rate for simulation
        const pvCoupons = coupon * ((1 - Math.pow(1 + discRate, -T)) / discRate);
        const pvFace = N / Math.pow(1 + discRate, T);
        return { fairPrice: pvCoupons + pvFace, totalReturn: (coupon * T) + N };
      }
      case "discount": {
        const factor = (R * T) / 365;
        const dsDiscount = N * factor;
        const isDiscount = (N * factor) / (1 + factor);
        return { isNet: N - isDiscount, dsNet: N - dsDiscount, isDiscount, dsDiscount };
      }
      case "iban": {
        let str = iban.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        if (str.length < 15) return null;
        const rearranged = str.substring(4) + str.substring(0, 4);
        let numStr = "";
        for (let i = 0; i < rearranged.length; i++) {
          const code = rearranged.charCodeAt(i);
          numStr += (code >= 65 && code <= 90) ? (code - 55).toString() : rearranged[i];
        }
        let rem = numStr;
        while (rem.length > 2) {
          let block = rem.slice(0, 9);
          rem = (parseInt(block, 10) % 97) + rem.slice(block.length);
        }
        return { isValid: (parseInt(rem, 10) % 97) === 1 };
      }
      default: return null;
    }
  }, [tool, amount, price, rate, term, iban]);

  const fmt = (v: number, curr = "TRY") => {
      const locale = curr === "TRY" ? "tr-TR" : "en-US";
      return new Intl.NumberFormat(locale, { style: "currency", currency: curr, maximumFractionDigits: 0 }).format(v);
  };

  const copyIban = () => {
    navigator.clipboard.writeText(iban);
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="calc-wrapper max-w-6xl mx-auto pb-20">
      {/* 3D ACTION TILE SWITCHER */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
        {([
          { id: "eurobond", label: "Eurobond", emoji: "💵" },
          { id: "bono", label: "Hazine Bonosu", emoji: "📄" },
          { id: "tahvil", label: "Devlet Tahvili", emoji: "📈" },
          { id: "discount", label: "İskonto Hesabı", emoji: "✂️" },
          { id: "iban", label: "IBAN Doğrulama", emoji: "🏦" }
        ] as { id: BondTool; label: string; emoji: string }[]).map((t) => (
          <button 
            key={t.id}
            onClick={() => { setTool(t.id); confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] transition-all duration-300 relative group border-2 ${
              tool === t.id 
                ? "bg-amber-600 border-amber-500 text-white shadow-[0_20px_50px_rgba(245,158,11,0.4)] -translate-y-3 border-b-[10px] border-amber-800" 
                : "bg-surface border-border text-muted hover:border-amber-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${tool === t.id ? "bg-white/20 rotate-12" : "bg-amber-500/5"}`}>
                {t.emoji}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">
                {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <Calculator size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">TAHVİL PARAMETRELERİ</h3>
          </div>

          <div className="space-y-6">
            {tool !== "iban" ? (
                <>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Nominal Değer / Tutar</label>
                        <div className="calc-input-key !bg-secondary/10">
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                            <span className="absolute right-6 top-[30%] text-xl font-black text-amber-500 opacity-40 italic">{tool === "eurobond" ? "$" : "₺"}</span>
                        </div>
                    </div>

                    {tool === "eurobond" && (
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Güncel Piyasa Fiyatı</label>
                            <div className="calc-input-key">
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Faiz/Kupon Oranı</label>
                            <div className="calc-input-key">
                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Vade ({tool === "discount" || tool === "bono" ? "Gün" : "Yıl"})</label>
                            <div className="calc-input-key">
                                <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">IBAN NUMARASI</label>
                    <div className="calc-input-key">
                        <input 
                            type="text" value={iban} onChange={(e) => setIban(e.target.value.toUpperCase())} 
                            className="calc-input-field !text-lg font-black py-4 tracking-widest text-center"
                            placeholder="TR00..."
                        />
                    </div>
                </div>
            )}
          </div>

          <div className="pt-6 border-t border-border flex items-center gap-4 text-amber-600/60 italic text-[10px] font-black">
              <CheckCircle2 size={16} /> Uluslararası Bankacılık Standartları
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <>
              <div className={`p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[10px] ${tool === "iban" && !(results as any).isValid ? "bg-red-600 border-red-800" : "bg-amber-600 border-amber-800"}`}>
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                   <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-3 italic">
                      {tool === "iban" ? "DOĞRULAMA SONUCU" : "TEORİK DEĞERLEME"}
                   </p>
                   <h3 className="text-5xl font-black tracking-tighter mb-8 italic">
                      {tool === "eurobond" ? `%${(results as any).currentYield.toFixed(2)}` : 
                       tool === "iban" ? ((results as any).isValid ? "GEÇERLİ IBAN" : "GEÇERSİZ IBAN") :
                       fmt((results as any).price || (results as any).fairPrice || (results as any).isNet)}
                   </h3>

                   {tool !== "iban" && (
                    <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">TOPLAM GERİ ÖDEME</p>
                           <p className="text-2xl font-black">{fmt((results as any).totalPayment || (results as any).totalReturn || amount, tool === "eurobond" ? "USD" : "TRY")}</p>
                       </div>
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">NET KAZANÇ</p>
                           <p className="text-2xl font-black text-amber-200">{fmt((results as any).totalCoupon || (results as any).gain || (results as any).isDiscount || 0, tool === "eurobond" ? "USD" : "TRY")}</p>
                       </div>
                    </div>
                   )}
                </div>
              </div>

              {tool === "iban" && (results as any).isValid && (
                  <button onClick={copyIban} className="bg-surface p-6 rounded-[2rem] border border-amber-500/30 flex items-center justify-between group hover:bg-amber-500/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                            <Copy size={18} />
                        </div>
                        <span className="text-xs font-black text-primary">IBAN'ı Kopyala ve Paylaş</span>
                      </div>
                      <ChevronRight size={18} className="text-muted group-hover:translate-x-1 transition-transform" />
                  </button>
              )}

              <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                          <BarChart3 size={20} />
                      </div>
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">Piyasa Analiz Raporu</span>
                  </div>
                  <p className="text-sm font-bold text-primary leading-relaxed">
                      {tool === "eurobond" ? "Eurobond getirileri USD bazlıdır. Türkiye risk primi (CDS) fiyatlamaya doğrudan etki eder." : 
                       tool === "discount" ? "İç iskonto matematiksel, dış iskonto ise ticari bankacılık standartlarında hesaplanmıştır." :
                       "Tahvil fiyatları piyasa faiz oranlarıyla ters orantılı hareket eder. Faizler düştüğünde tahvil fiyatı artar."}
                  </p>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-4 border-dashed border-border opacity-50 grayscale text-center">
                <Landmark size={80} className="mb-8 opacity-20" />
                <h4 className="text-sm font-black text-muted uppercase tracking-[0.4em] italic">
                   LÜTFEN PARAMETRELERİ<br/>BELİRLEYİN
                </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
