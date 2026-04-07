"use client";

import React, { useState, useMemo } from "react";
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
import { TrendingUp, DollarSign, Calendar, PieChart, Info, ArrowUpRight } from "lucide-react";

export function InvestmentSimulator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(20);

  const data = useMemo(() => {
    const chartData = [];
    let totalValue = initialAmount;
    let totalContributions = initialAmount;
    const monthlyRate = annualReturn / 100 / 12;

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        chartData.push({
          name: "Başlangıç",
          toplam: Math.round(totalValue),
          katki: Math.round(totalContributions),
          interest: 0
        });
        continue;
      }

      // Calculate for 12 months
      for (let month = 1; month <= 12; month++) {
        totalValue = (totalValue + monthlyContribution) * (1 + monthlyRate);
        totalContributions += monthlyContribution;
      }

      chartData.push({
        name: `${year}. Yıl`,
        toplam: Math.round(totalValue),
        katki: Math.round(totalContributions),
        interest: Math.round(totalValue - totalContributions)
      });
    }
    return chartData;
  }, [initialAmount, monthlyContribution, annualReturn, years]);

  const finalValue = data[data.length - 1].toplam;
  const totalInvested = data[data.length - 1].katki;
  const totalInterest = finalValue - totalInvested;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="calc-wrapper animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-accent-glow rounded-2xl flex items-center justify-center text-accent-primary">
          <TrendingUp size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Yatırım & Bileşik Faiz Simülatörü</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Finansal Özgürlük Planlayıcı</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-8 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
          <div className="space-y-6">
            {/* Initial Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">BAŞLANGIÇ ANA PARA</label>
                <span className="text-sm font-black text-accent-primary">{formatCurrency(initialAmount)}</span>
              </div>
              <input 
                type="range" min="0" max="1000000" step="5000"
                value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="calc-range-input accent-accent-primary"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">AYLIK TASARRUF</label>
                <span className="text-sm font-black text-accent-primary">{formatCurrency(monthlyContribution)}</span>
              </div>
              <input 
                type="range" min="0" max="50000" step="500"
                value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="calc-range-input"
              />
            </div>

            {/* Annual Return */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">YILLIK BEKLENEN GETİRİ (%)</label>
                <span className="text-sm font-black text-accent-primary">%{annualReturn}</span>
              </div>
              <input 
                type="range" min="1" max="100" step="1"
                value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="calc-range-input"
              />
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-muted uppercase tracking-tighter ml-1">SÜRE (YIL)</label>
                <span className="text-sm font-black text-accent-primary">{years} YIL</span>
              </div>
              <input 
                type="range" min="1" max="50" step="1"
                value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="calc-range-input"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
             <div className="flex items-start gap-3 p-4 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
                <Info size={16} className="text-accent-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted leading-relaxed">
                  <b>Bileşik Faiz Nedir?</b> "Dünyanın 8. harikası" olarak bilinen bu sistem, kazancınızın da kazanç getirmesi prensibiyle çalışır. Süre uzadıkça büyüme hızı logaritmik olarak artar.
                </p>
             </div>
          </div>
        </div>

        {/* Chart & Stats */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           {/* Stat Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface p-6 rounded-3xl border border-border shadow-md">
                 <div className="flex items-center gap-2 text-muted mb-2">
                    <DollarSign size={14} className="text-green-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">TOPLAM BİRİKİM</span>
                 </div>
                 <p className="text-2xl font-black text-primary">{formatCurrency(finalValue)}</p>
              </div>
              <div className="bg-surface p-6 rounded-3xl border border-border shadow-md">
                 <div className="flex items-center gap-2 text-muted mb-2">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">YATIRILAN TUTAR</span>
                 </div>
                 <p className="text-2xl font-black text-primary">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-surface p-6 rounded-3xl border border-border shadow-md bg-accent-primary/5 border-accent-primary/20">
                 <div className="flex items-center gap-2 text-muted mb-2">
                    <ArrowUpRight size={14} className="text-accent-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">TOPLAM KAZANÇ (FAİZ)</span>
                 </div>
                 <p className="text-2xl font-black text-accent-primary">{formatCurrency(totalInterest)}</p>
              </div>
           </div>

           {/* Chart */}
           <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl flex-grow flex flex-col">
              <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-8 ml-2 flex items-center gap-2">
                <PieChart size={14} className="text-accent-primary" />
                Zaman İçinde Büyüme Projeksiyonu
              </h3>
              <div className="flex-grow w-full min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorToplam" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorKatki" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "#94a3b8", fontSize: 10 }}
                      dy={10}
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
                      isAnimationActive={false}
                      type="monotone" 
                      dataKey="toplam" 
                      name="Toplam Değer" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorToplam)" 
                    />
                    <Area 
                      isAnimationActive={false}
                      type="monotone" 
                      dataKey="katki" 
                      name="Anapara + Katkı" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorKatki)" 
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 flex justify-center gap-8 text-[10px] font-black uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-glow" />
                  <span>Toplam Değer (Bileşik Faiz Dahil)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400 border border-dashed" />
                  <span>Yatırılan Toplam Anapara</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="calc-info-box mt-12 bg-indigo-500/5 border-indigo-500/20">
        <span className="calc-info-box-icon text-indigo-500">📈</span>
        <span className="calc-info-box-text text-muted">
          <b>Analiz:</b> Grafikte gördüğünüz mavi alan ile gri alan arasındaki fark, zamanın size kazandırdığı <b>bedava paradır (faiz)</b>. Yatırımlarınızın asıl gücü son 5-10 yılda ortaya çıkar. Bu yüzden erken başlamak en büyük avantajdır.
        </span>
      </div>
    </div>
  );
}
