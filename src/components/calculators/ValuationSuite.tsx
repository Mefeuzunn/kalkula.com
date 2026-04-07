"use client";

import React, { useState, useMemo } from "react";
import { 
  Target, 
  Landmark, 
  RefreshCw, 
  Scale, 
  TrendingDown, 
  Boxes, 
  Info,
  ChevronRight,
  Calculator,
  Plus,
  Trash2,
  CheckCircle2,
  PieChart
} from "lucide-react";
import confetti from "canvas-confetti";

type ValuationTool = "npv" | "maturity" | "real" | "futures";
type CashFlow = { id: number; year: number; amount: string };
type Cheque = { id: number; amount: string; days: string };

export function ValuationSuite() {
  const [tool, setTool] = useState<ValuationTool>("npv");

  // NPV / IRR States
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [discountRate, setDiscountRate] = useState("15");
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { id: 1, year: 1, amount: "40000" },
    { id: 2, year: 2, amount: "50000" },
    { id: 3, year: 3, amount: "60000" }
  ]);

  // Maturity States
  const [cheques, setCheques] = useState<Cheque[]>([
    { id: 1, amount: "150000", days: "30" },
    { id: 2, amount: "250000", days: "60" }
  ]);

  // Real Return / Futures States
  const [nominalRate, setNominalRate] = useState("45");
  const [inflationRate, setInflationRate] = useState("60");
  const [spotPrice, setSpotPrice] = useState("1000");
  const [futuresDays, setFuturesDays] = useState("60");

  const results = useMemo(() => {
    switch (tool) {
      case "npv": {
        const inv = -Math.abs(parseFloat(initialInvestment) || 0);
        const rate = (parseFloat(discountRate) || 0) / 100;
        const flows = [inv, ...cashFlows.map(cf => parseFloat(cf.amount) || 0)];
        let npv = 0;
        flows.forEach((amount, t) => {
          npv += amount / Math.pow(1 + rate, t);
        });
        return { npv, isProfitable: npv > 0, totalIn: flows.reduce((a, b) => a + (b > 0 ? b : 0), 0) };
      }
      case "maturity": {
        let sumAmount = 0;
        let sumWeighted = 0;
        cheques.forEach(c => {
          const a = parseFloat(c.amount) || 0;
          const d = parseFloat(c.days) || 0;
          if (a > 0 && d >= 0) {
             sumAmount += a;
             sumWeighted += (a * d);
          }
        });
        return sumAmount > 0 ? { averageDays: sumWeighted / sumAmount, totalAmount: sumAmount } : null;
      }
      case "real": {
          const nr = (parseFloat(nominalRate) || 0) / 100;
          const ir = (parseFloat(inflationRate) || 0) / 100;
          const realRate = ((1 + nr) / (1 + ir) - 1) * 100;
          return { realRate, isPositive: realRate >= 0 };
      }
      case "futures": {
          const s = parseFloat(spotPrice) || 0;
          const r = 0.45; // Fixed market rate for simulation
          const d = parseFloat(futuresDays) || 0;
          const theoreticalPrice = s * (1 + r * (d / 365));
          return { theoreticalPrice, basis: theoreticalPrice - s };
      }
      default: return null;
    }
  }, [tool, initialInvestment, discountRate, cashFlows, cheques, nominalRate, inflationRate, spotPrice, futuresDays]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="calc-wrapper max-w-6xl mx-auto pb-20">
      {/* 3D ACTION TILE SWITCHER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {([
          { id: "npv", label: "Değerleme (NPV/IRR)", emoji: "📊" },
          { id: "maturity", label: "Ortalama Vade", emoji: "⚖️" },
          { id: "real", label: "Reel Getiri", emoji: "📉" },
          { id: "futures", label: "Vadeli İşlem", emoji: "🔮" }
        ] as { id: ValuationTool; label: string; emoji: string }[]).map((t) => (
          <button 
            key={t.id}
            onClick={() => { setTool(t.id); confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] transition-all duration-300 relative group border-2 ${
              tool === t.id 
                ? "bg-purple-600 border-purple-500 text-white shadow-[0_20px_50px_rgba(147,51,234,0.4)] -translate-y-3 border-b-[10px] border-purple-800" 
                : "bg-surface border-border text-muted hover:border-purple-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${tool === t.id ? "bg-white/20 rotate-12" : "bg-purple-500/5"}`}>
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                  <Calculator size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">DEĞERLEME PARAMETRELERİ</h3>
          </div>

          <div className="space-y-6">
            {tool === "npv" && (
                <>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Başlangıç Yatırımı</label>
                        <div className="calc-input-key !bg-red-500/5">
                            <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="calc-input-field !text-2xl font-black py-4 !text-red-500" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-black text-primary/40 uppercase">Nakit Akışları (Yıllık)</label>
                            <button onClick={() => setCashFlows([...cashFlows, { id: Date.now(), year: cashFlows.length + 1, amount: "" }])} className="text-[10px] font-black text-purple-500">+ EKLE</button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {cashFlows.map((cf) => (
                                <div key={cf.id} className="flex gap-2 items-center">
                                    <div className="calc-input-key flex-1">
                                        <input type="number" value={cf.amount} onChange={(e) => setCashFlows(cashFlows.map(f => f.id === cf.id ? { ...f, amount: e.target.value } : f))} className="calc-input-field !text-sm py-2" placeholder={`Yıl ${cf.year} Nakit Girişi`} />
                                    </div>
                                    <button onClick={() => setCashFlows(cashFlows.filter(f => f.id !== cf.id))} className="text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {tool === "maturity" && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <label className="text-[10px] font-black text-primary/40 uppercase">Portföy Listesi</label>
                        <button onClick={() => setCheques([...cheques, { id: Date.now(), amount: "", days: "" }])} className="text-[10px] font-black text-purple-500">+ EKLE</button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {cheques.map((c) => (
                            <div key={c.id} className="flex gap-2 items-center">
                                <div className="calc-input-key flex-[2]">
                                    <input type="number" value={c.amount} onChange={(e) => setCheques(cheques.map(h => h.id === c.id ? { ...h, amount: e.target.value } : h))} className="calc-input-field !text-sm py-2 text-center" placeholder="Tutar (₺)" />
                                </div>
                                <div className="calc-input-key flex-1">
                                    <input type="number" value={c.days} onChange={(e) => setCheques(cheques.map(h => h.id === c.id ? { ...h, days: e.target.value } : h))} className="calc-input-field !text-sm py-2 text-center" placeholder="Gün" />
                                </div>
                                <button onClick={() => setCheques(cheques.filter(h => h.id !== c.id))} className="text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tool === "real" && (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Nominal Getiri Oranı (%)</label>
                        <div className="calc-input-key">
                            <input type="number" value={nominalRate} onChange={(e) => setNominalRate(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Enflasyon Oranı (%)</label>
                        <div className="calc-input-key !bg-red-500/5">
                            <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="calc-input-field !text-2xl font-black py-4 !text-red-500" />
                        </div>
                    </div>
                </div>
            )}

            {tool === "futures" && (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Dayanak Varlık Spot Fiyatı</label>
                        <div className="calc-input-key">
                            <input type="number" value={spotPrice} onChange={(e) => setSpotPrice(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Vadeye Kalan Gün</label>
                        <div className="calc-input-key">
                            <input type="number" value={futuresDays} onChange={(e) => setFuturesDays(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        </div>
                    </div>
                </div>
            )}
          </div>

          <div className="pt-6 border-t border-border flex items-center gap-4 text-purple-600/60 italic text-[10px] font-black">
              <CheckCircle2 size={16} /> Finansal Matematik Standartlarına Uygundur
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <>
              <div className={`p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[10px] ${tool === "real" && !(results as any).isPositive ? "bg-red-600 border-red-800" : tool === "npv" && !(results as any).isProfitable ? "bg-zinc-800 border-black" : "bg-purple-600 border-purple-800"}`}>
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative z-10">
                   <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-3 italic">
                      {tool === "npv" ? "NET BUGÜNKÜ DEĞER" : tool === "maturity" ? "AĞIRLIKLI ORTALAMA VADE" : tool === "real" ? "GERÇEK ALIM GÜCÜ ETKİSİ" : "TEORİK VADELİ FİYAT"}
                   </p>
                   <h3 className="text-5xl font-black tracking-tighter mb-8 italic">
                      {tool === "maturity" ? `${Math.round((results as any).averageDays)} GÜN` : 
                       tool === "real" ? `%${(results as any).realRate.toFixed(2)}` :
                       fmt((results as any).npv || (results as any).theoreticalPrice)}
                   </h3>

                   <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">
                               {tool === "npv" ? "TOPLAM NAKİT GİRİŞİ" : tool === "maturity" ? "TOPLAM PORTFÖY" : tool === "real" ? "NOMİNAL GETİRİ" : "TAŞIMA MALİYETİ"}
                           </p>
                           <p className="text-2xl font-black">
                               {tool === "maturity" ? fmt((results as any).totalAmount) : 
                                tool === "real" ? `%${nominalRate}` : 
                                tool === "futures" ? fmt((results as any).basis) :
                                fmt((results as any).totalIn)}
                           </p>
                       </div>
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">DURUM ANALİZİ</p>
                           <p className="text-2xl font-black text-purple-200">
                               {tool === "npv" ? ((results as any).isProfitable ? "VERİMLİ" : "VERİMSİZ") :
                                tool === "real" ? ((results as any).isPositive ? "KAZANÇ" : "KAYIP") :
                                "HESAPLANDI"}
                           </p>
                       </div>
                   </div>
                </div>
              </div>

              <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                          <PieChart size={20} />
                      </div>
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">Profesyonel Değerleme Özeti</span>
                  </div>
                  <p className="text-sm font-bold text-primary leading-relaxed">
                      {tool === "npv" ? "Pozitif NPV, yatırımın beklenen getiri oranının üzerinde değer yarattığını gösterir." : 
                       tool === "maturity" ? "Vade, ödemelerin nakit akışını yönetmek için kritik bir risk göstergesidir." :
                       tool === "real" ? "Reel getiri, paranın enflasyon karşısındaki alım gücünü Fisher denklemiyle ölçer." :
                       "Futures fiyatlaması, spot fiyata paranın vadesel maliyetinin eklenmesiyle (Fair Value) bulunur."}
                  </p>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-4 border-dashed border-border opacity-50 grayscale">
                <Target size={80} className="mb-8 opacity-20" />
                <h4 className="text-sm font-black text-muted uppercase tracking-[0.4em] italic text-center">
                   ANALİZ İÇİN<br/>VERİLERİ GİRİN
                </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
