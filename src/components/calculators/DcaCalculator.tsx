"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart, 
  Info, 
  ArrowUpRight, 
  Plus, 
  Trash2, 
  Repeat,
  Calculator,
  Target
} from "lucide-react";

type PurchaseRow = {
  id: string;
  amount: string;
  price: string;
};

export function DcaCalculator() {
  const [activeTab, setActiveTab] = useState<"simulator" | "average">("simulator");

  // Simulator States
  const [initialAmount, setInitialAmount] = useState(1000);
  const [recurringAmount, setRecurringAmount] = useState(500);
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("monthly");
  const [annualReturn, setAnnualReturn] = useState(15);
  const [years, setYears] = useState(10);

  // Average Cost States
  const [rows, setRows] = useState<PurchaseRow[]>([
    { id: "1", amount: "10", price: "100" },
    { id: "2", amount: "5", price: "80" }
  ]);

  // Simulator Logic
  const simulatorData = useMemo(() => {
    const chartData = [];
    let totalValue = initialAmount;
    let totalContributions = initialAmount;
    
    // Convert annual return to the correct period rate
    const periodsPerYear = frequency === "weekly" ? 52 : 12;
    const periodRate = Math.pow(1 + annualReturn / 100, 1 / periodsPerYear) - 1;
    const totalPeriods = years * periodsPerYear;

    chartData.push({
      name: "Başlangıç",
      toplam: Math.round(totalValue),
      katki: Math.round(totalContributions),
      profit: 0
    });

    for (let period = 1; period <= totalPeriods; period++) {
      totalValue = (totalValue + recurringAmount) * (1 + periodRate);
      totalContributions += recurringAmount;

      // Only add to chart at certain intervals to keep it clean
      const shouldPush = frequency === "monthly" || period % 4 === 0 || period === totalPeriods;
      
      if (shouldPush) {
        let label = "";
        if (frequency === "monthly") {
          label = period % 12 === 0 ? `${period / 12}. Yıl` : "";
        } else {
          label = period % 52 === 0 ? `${period / 52}. Yıl` : "";
        }

        if (label || period === totalPeriods) {
            chartData.push({
                name: label || `${period}. ${frequency === "monthly" ? "Ay" : "Hafta"}`,
                toplam: Math.round(totalValue),
                katki: Math.round(totalContributions),
                profit: Math.round(totalValue - totalContributions)
            });
        }
      }
    }
    return chartData;
  }, [initialAmount, recurringAmount, frequency, annualReturn, years]);

  const finalValue = simulatorData[simulatorData.length - 1].toplam;
  const totalInvested = simulatorData[simulatorData.length - 1].katki;
  const totalProfit = finalValue - totalInvested;

  // Average Cost Logic
  const averageCostResult = useMemo(() => {
    let totalQty = 0;
    let totalCost = 0;
    
    rows.forEach(row => {
      const q = parseFloat(row.amount) || 0;
      const p = parseFloat(row.price) || 0;
      if (q > 0 && p > 0) {
        totalQty += q;
        totalCost += q * p;
      }
    });

    return {
      totalQty,
      totalCost,
      averagePrice: totalQty > 0 ? totalCost / totalQty : 0
    };
  }, [rows]);

  const addRow = () => {
    setRows([...rows, { id: Math.random().toString(36).substr(2, 9), amount: "", price: "" }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const updateRow = (id: string, field: "amount" | "price", value: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val);
  };

  return (
    <div className="calc-wrapper animate-fade-in max-w-6xl mx-auto">
      {/* Tab Switcher */}
      <div className="flex bg-surface-variant p-2 rounded-[22px] mb-12 w-full max-w-md mx-auto border border-border shadow-inner relative">
        <button 
          onClick={() => setActiveTab("simulator")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-black transition-all duration-200 ${
            activeTab === "simulator" 
              ? "bg-white dark:bg-slate-700 text-accent-primary shadow-[0_6px_0_rgba(37,99,235,0.2)] dark:shadow-[0_6px_0_rgba(0,0,0,0.4)] -translate-y-1 border border-accent-primary/10" 
              : "text-muted hover:text-primary"
          }`}
        >
          <Repeat size={16} />
          <span>DCA Simülatörü</span>
        </button>
        <button 
          onClick={() => setActiveTab("average")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-black transition-all duration-200 ${
            activeTab === "average" 
              ? "bg-white dark:bg-slate-700 text-accent-primary shadow-[0_6px_0_rgba(37,99,235,0.2)] dark:shadow-[0_6px_0_rgba(0,0,0,0.4)] -translate-y-1 border border-accent-primary/10" 
              : "text-muted hover:text-primary"
          }`}
        >
          <Calculator size={16} />
          <span>Maliyet Düşürme</span>
        </button>
      </div>

      {activeTab === "simulator" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
            <h3 className="text-xs font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Target size={14} className="text-accent-primary" />
                Simülasyon Ayarları
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-muted uppercase tracking-tighter">İLK YATIRIM</label>
                  <span className="text-sm font-black text-accent-primary">{formatCurrency(initialAmount)}</span>
                </div>
                <input 
                  type="range" min="0" max="50000" step="500"
                  value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="calc-range-input accent-accent-primary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-muted uppercase tracking-tighter">DÜZENLİ ÖDEME</label>
                  <span className="text-sm font-black text-accent-primary">{formatCurrency(recurringAmount)}</span>
                </div>
                <input 
                  type="range" min="10" max="10000" step="50"
                  value={recurringAmount} onChange={(e) => setRecurringAmount(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setFrequency("weekly")}
                    className={`py-3 px-4 rounded-2xl border text-[10px] font-black tracking-widest transition-all ${
                        frequency === "weekly" 
                        ? "bg-accent-primary border-accent-primary text-white shadow-[0_4px_0_rgb(30_64_175)] -translate-y-1" 
                        : "border-border text-muted hover:border-accent-primary/50 bg-secondary/20 shadow-[0_4px_0_var(--border)] active:translate-y-0 active:shadow-none"
                    }`}
                >HAFTALIK</button>
                <button 
                    onClick={() => setFrequency("monthly")}
                    className={`py-3 px-4 rounded-2xl border text-[10px] font-black tracking-widest transition-all ${
                        frequency === "monthly" 
                        ? "bg-accent-primary border-accent-primary text-white shadow-[0_4px_0_rgb(30_64_175)] -translate-y-1" 
                        : "border-border text-muted hover:border-accent-primary/50 bg-secondary/20 shadow-[0_4px_0_var(--border)] active:translate-y-0 active:shadow-none"
                    }`}
                >AYLIK</button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-muted uppercase tracking-tighter">YILLIK TAHMİNİ GETİRİ (%)</label>
                  <span className="text-sm font-black text-accent-primary">%{annualReturn}</span>
                </div>
                <input 
                  type="range" min="1" max="150" step="1"
                  value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-muted uppercase tracking-tighter">SÜRE (YIL)</label>
                  <span className="text-sm font-black text-accent-primary">{years} YIL</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1"
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
               <div className="flex items-start gap-3 p-4 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
                  <Info size={16} className="text-accent-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted leading-relaxed">
                    <b>DCA Stratejisi:</b> Piyasanın en düşük noktasını bulmaya çalışmak yerine, her hafta veya ay aynı miktarda alım yaparak piyasa riskini dağıtırsınız. Bu, uzun vadede duygusal kararları engeller.
                  </p>
               </div>
            </div>
          </div>

          {/* Results & Chart */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface p-6 rounded-3xl border border-border shadow-md">
                   <div className="flex items-center gap-2 text-muted mb-2">
                      <DollarSign size={14} className="text-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">TOPLAM DEĞER</span>
                   </div>
                   <p className="text-2xl font-black text-primary">{formatCurrency(finalValue)}</p>
                </div>
                <div className="bg-surface p-6 rounded-3xl border border-border shadow-md">
                   <div className="flex items-center gap-2 text-muted mb-2">
                      <Calendar size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">TOPLAM YATIRILAN</span>
                   </div>
                   <p className="text-2xl font-black text-primary">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="bg-surface p-6 rounded-3xl border border-border shadow-md bg-accent-primary/5 border-accent-primary/20">
                   <div className="flex items-center gap-2 text-muted mb-2">
                      <ArrowUpRight size={14} className="text-accent-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">TOPLAM KAR</span>
                   </div>
                   <p className="text-2xl font-black text-accent-primary">+{formatCurrency(totalProfit)}</p>
                </div>
            </div>

            <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl min-h-[400px] flex flex-col">
                <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-8 flex items-center gap-2">
                  <PieChart size={14} className="text-accent-primary" />
                  Birikim Büyüme Grafiği
                </h3>
                <div className="flex-grow w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulatorData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        interval={frequency === "weekly" ? 51 : 11}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#1e293b", 
                          border: "1px solid rgba(255,255,255,0.1)", 
                          borderRadius: "16px",
                          fontSize: "12px",
                          fontWeight: "900"
                        }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(val: any) => formatCurrency(Number(val))}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="toplam" 
                        name="Toplam Portföy" 
                        stroke="#3b82f6" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorTotal)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="katki" 
                        name="Anapara" 
                        stroke="#94a3b8" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="transparent" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-surface p-10 rounded-[2.5rem] border border-border shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-black mb-1">Maliyet Hesaplama</h2>
                  <p className="text-muted text-xs font-bold uppercase tracking-widest">Alım Yaptığınız Noktaları Ekleyin</p>
                </div>
                <button 
                  onClick={addRow}
                  className="btn-primary"
                  style={{ borderRadius: '20px', padding: '1rem' }}
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div key={row.id} className="grid grid-cols-12 gap-4 items-center animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="col-span-5 space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase ml-2 tracking-tighter">ADET / MİKTAR</label>
                        <input 
                          type="number" 
                          value={row.amount} 
                          placeholder="0.00"
                          onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                          className="w-full bg-secondary/30 border border-border rounded-2xl px-5 py-4 font-black text-lg focus:ring-2 focus:ring-accent-primary outline-none transition-all"
                        />
                    </div>
                    <div className="col-span-5 space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase ml-2 tracking-tighter">ALIM FİYATI ($)</label>
                        <input 
                          type="number" 
                          value={row.price} 
                          placeholder="0.00"
                          onChange={(e) => updateRow(row.id, "price", e.target.value)}
                          className="w-full bg-secondary/30 border border-border rounded-2xl px-5 py-4 font-black text-lg focus:ring-2 focus:ring-accent-primary outline-none transition-all"
                        />
                    </div>
                    <div className="col-span-2 pt-6">
                        <button 
                          onClick={() => removeRow(row.id)}
                          disabled={rows.length <= 1}
                          className="btn-secondary w-full h-14 !bg-red-500/5 !border-red-500/20 !text-red-500 hover:!bg-red-500/10"
                          style={{ borderRadius: '18px' }}
                        >
                          <Trash2 size={20} />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Result Card */}
            <div className="bg-accent-primary text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">Sizin İçin Ortalama</span>
                        <h2 className="text-5xl font-black mt-2 mb-4 tracking-tighter">
                            {formatPrice(averageCostResult.averagePrice)}
                        </h2>
                        <div className="flex gap-4">
                            <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                                Toplam: {averageCostResult.totalQty.toFixed(2)} Ünite
                            </div>
                        </div>
                    </div>
                    <div className="p-8 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm">
                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest block mb-4">Toplam Yatırım Tutarı</span>
                        <div className="text-3xl font-black tracking-tight">{formatCurrency(averageCostResult.totalCost)}</div>
                        
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-xs text-white/70 italic font-medium leading-relaxed">
                                "Maliyet düşürme stratejisi ile fiyatlar düşerken alım yaparak ortalamanızı aşağı çeker, yükseliş başladığında daha hızlı kara geçersiniz."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
