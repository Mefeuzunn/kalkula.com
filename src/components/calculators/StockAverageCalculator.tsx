  "use client";

  import React, { useState, useEffect } from "react";
  import { Info, PlusCircle, Calculator, Percent, Trash2, TrendingUp, TrendingDown, Target, Wallet } from "lucide-react";
  import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
  import { V2Input } from "./ui-v2/V2Input";
  import { V2ActionRow } from "./ui-v2/V2ActionRow";
  import { V2ResultCard } from "./ui-v2/V2ResultCard";

  type PurchaseRow = {
    id: string;
    lot: string;
    price: string;
  };

  export function StockAverageCalculator() {
    const [rows, setRows] = useState<PurchaseRow[]>([
      { id: "1", lot: "100", price: "50" },
      { id: "2", lot: "50", price: "45" }
    ]);
    const [currentMarketPrice, setCurrentMarketPrice] = useState("");
    const [commission, setCommission] = useState("0.2");

    const [results, setResults] = useState<{
      newAverage: number;
      totalQty: number;
      totalInvested: number;
      totalCommission: number;
      currentValue: number;
      profitAmount: number;
      profitPercent: number;
    } | null>(null);

    const calculate = () => {
      let totalQty = 0;
      let totalInvestedWithoutComm = 0;
      const commRate = parseFloat(commission) || 0;

      rows.forEach((row) => {
        const l = parseFloat(row.lot) || 0;
        const p = parseFloat(row.price) || 0;
        if (l > 0 && p > 0) {
          totalQty += l;
          totalInvestedWithoutComm += l * p;
        }
      });

      if (totalQty === 0) {
        setResults(null);
        return;
      }

      const totalCommission = totalInvestedWithoutComm * (commRate / 100);
      const totalInvested = totalInvestedWithoutComm + totalCommission;
      const newAverage = totalInvested / totalQty;

      // Kar Zarar Hesabı
      const marketPrice = parseFloat(currentMarketPrice) || 0;
      let currentValue = 0;
      let profitAmount = 0;
      let profitPercent = 0;

      if (marketPrice > 0) {
        currentValue = totalQty * marketPrice;
        profitAmount = currentValue - totalInvested;
        profitPercent = (profitAmount / totalInvested) * 100;
      }

      setResults({
        newAverage,
        totalQty,
        totalInvested,
        totalCommission,
        currentValue,
        profitAmount,
        profitPercent,
      });
    };

    useEffect(() => {
      calculate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = () => {
      setRows([
        { id: "1", lot: "100", price: "50" },
        { id: "2", lot: "50", price: "45" }
      ]);
      setCurrentMarketPrice("");
      setCommission("0.2");
      setResults(null);
    };

    const addRow = () => {
      setRows([...rows, { id: Math.random().toString(36).substr(2, 9), lot: "", price: "" }]);
    };

    const removeRow = (id: string) => {
      if (rows.length > 2) {
        setRows(rows.filter((r) => r.id !== id));
      }
    };

    const updateRow = (id: string, field: "lot" | "price", value: string) => {
      setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    };

    return (
      <V2CalculatorWrapper
        title="PROFESYONEL HİSSE ORTALAMA HESAPLA"
        icon="📉"
        infoText="Farklı fiyatlardan yaptığınız hisse senedi alımlarını alt alta ekleyerek, ağırlıklı ortalama maliyetinizi, ödenen toplam komisyonu ve anlık kar/zarar durumunuzu profesyonelce analiz edin."
        results={results && (
          <div className="space-y-6">
            <V2ResultCard
              color="blue"
              label="ORTALAMA MALİYET"
              value={results.newAverage.toLocaleString("tr-TR", { maximumFractionDigits: 4, minimumFractionDigits: 2 }) + " ₺"}
              subLabel="Komisyon dahil ağırlıklı birim maliyet"
              icon="🎯"
            />

            {results.currentValue > 0 && (
              <V2ResultCard
                color={results.profitAmount >= 0 ? "emerald" : "red"}
                label={results.profitAmount >= 0 ? "TOPLAM KAR" : "TOPLAM ZARAR"}
                value={(results.profitAmount > 0 ? "+" : "") + results.profitAmount.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " ₺"}
                subLabel={`${results.profitPercent > 0 ? "+" : ""}${results.profitPercent.toFixed(2)}% Getiri Oranı`}
                icon={results.profitAmount >= 0 ? "TrendingUp" : "TrendingDown"}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">TOPLAM LOT</div>
                <div className="text-xl font-black text-primary">{results.totalQty.toLocaleString("tr-TR")}</div>
              </div>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">TOPLAM YATIRIM</div>
                <div className="text-xl font-black text-primary">{results.totalInvested.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Detaylı Portföy Analizi</div>
              <div className="space-y-3">
                {results.currentValue > 0 && (
                  <div className="flex justify-between items-center text-xs italic">
                    <span className="text-muted">Portföy Güncel Değeri:</span>
                    <span className="text-primary font-bold">{results.currentValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs italic">
                  <span className="text-muted">Toplam Komisyon:</span>
                  <span className="text-red-500 font-bold">{results.totalCommission.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                  <span className="text-muted">Maliyet Dağılımı:</span>
                  <span className="text-primary font-bold">{rows.filter((r) => r.lot && r.price).length} Kademe İşlem</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 space-y-3">
              <div className="flex gap-3 items-center text-[10px] font-black text-blue-500 uppercase italic">
                <Info className="w-4 h-4" /> Yatırımcı Notu
              </div>
              <p className="text-[10px] text-muted leading-relaxed italic">
                Piyasada işlem yaparken kademeli alım ve satım stratejileri (DCA), maliyetleri yönetmede ve piyasa riskini dağıtmada önemlidir.
                Girdiğiniz piyasa fiyatına göre sistem anlık Kar/Zarar durumunuzu otomatik hesaplar.
              </p>
            </div>
          </div>
        )}
      >
        <div className="space-y-8">
          {/* Market Price & Setting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest">
                  <Target className="w-4 h-4 text-emerald-500" /> GÜNCEL FİYAT (OPSİYONEL)
               </div>
               <V2Input 
                 label="PİYASA FİYATI" 
                 value={currentMarketPrice} 
                 onChange={setCurrentMarketPrice} 
                 unit="₺" 
                 placeholder="Opsiyonel (Kar/Zarar İçin)" 
                 type="number"
               />
             </div>
             
             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest">
                  <Percent className="w-4 h-4 text-amber-500" /> KOMİSYON ORANI
               </div>
               <V2Input 
                 label="ARACI KURUM KOMİSYONU" 
                 value={commission} 
                 onChange={setCommission} 
                 unit="%" 
                 placeholder="0.2" 
                 type="number"
               />
             </div>
          </div>

          {/* Dynamic Rows */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" /> ALIM KADEMELERİ
              </div>
              <button 
                onClick={addRow}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors text-xs font-black uppercase tracking-widest border border-blue-500/20"
              >
                <PlusCircle size={14} /> Kademe Ekle
              </button>
            </div>

            <div className="space-y-4">
              {rows.map((row, index) => (
                <div key={row.id} className="grid grid-cols-12 gap-3 items-end opacity-0 animate-fade-in" style={{ animationFillMode: "forwards", animationDelay: \`\${index * 0.05}s\` }}>
                  <div className="col-span-5 relative">
                    <label className="absolute -top-5 left-2 text-[9px] font-black text-muted uppercase tracking-tighter">
                      {index + 1}. ALIM LOT
                    </label>
                    <input 
                      type="number" 
                      value={row.lot} 
                      placeholder="0"
                      onChange={(e) => updateRow(row.id, "lot", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-black text-sm md:text-base focus:ring-2 focus:ring-accent-primary outline-none transition-all placeholder:text-muted/50"
                    />
                  </div>
                  <div className="col-span-5 relative">
                    <label className="absolute -top-5 left-2 text-[9px] font-black text-muted uppercase tracking-tighter">
                      ALIM FİYATI (₺)
                    </label>
                    <input 
                      type="number" 
                      value={row.price} 
                      placeholder="0.00"
                      onChange={(e) => updateRow(row.id, "price", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-black text-sm md:text-base focus:ring-2 focus:ring-accent-primary outline-none transition-all placeholder:text-muted/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <button 
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length <= 2}
                      className="w-full h-[54px] md:h-[58px] flex items-center justify-center rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500/10 border border-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <V2ActionRow 
            onCalculate={calculate} 
            onReset={reset} 
            calculateLabel="📉 Ortalama Hesapla"
          />
        </div>
      </V2CalculatorWrapper>
    );
  }

