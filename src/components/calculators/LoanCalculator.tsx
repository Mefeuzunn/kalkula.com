"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Landmark, Calendar, Percent, ArrowRight, RefreshCw, Calculator, TrendingUp } from "lucide-react";

export function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("24");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const n = parseInt(months);

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) {
      setResult(null);
      return;
    }

    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthlyPayment,
      total: totalPayment,
      interest: totalInterest,
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, rate, months]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(val);
  };

  const interestRatio = result ? (result.interest / result.total) * 100 : 0;

  return (
    <div className="calc-wrapper animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-600">
          <Landmark size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Kredi Hesaplama</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Finansal Planlama Aracı</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                <Landmark size={14} className="text-emerald-500" /> KREDİ TUTARI
              </label>
              <div className="relative">
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="input-field w-full !text-2xl font-black py-5 pl-8 pr-16"
                  placeholder="100.000"
                />
                <span className="absolute right-6 top-[32%] text-muted font-black text-lg opacity-30">₺</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Percent size={14} className="text-blue-500" /> FAİZ (%)
                </label>
                <input 
                  type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)}
                  className="input-field w-full font-black py-4"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Calendar size={14} className="text-purple-500" /> VADE (AY)
                </label>
                <input 
                  type="number" value={months} onChange={(e) => setMonths(e.target.value)}
                  className="input-field w-full font-black py-4"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <button 
              onClick={() => { setAmount("100000"); setRate("3.5"); setMonths("24"); }}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest hover:text-primary transition-colors"
            >
              <RefreshCw size={12} /> Tüm Değerleri Sıfırla
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {result ? (
            <div className="space-y-6 h-full flex flex-col">
              <div className="bg-emerald-600 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Calculator size={200} />
                </div>
                <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-2">AYLIK TAKSİT TUTARI</p>
                <h3 className="text-5xl font-black leading-tight italic tracking-tighter mb-8">
                  {formatCurrency(result.monthly)}
                </h3>
                
                <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                  <div>
                    <p className="text-[9px] font-black opacity-60 uppercase tracking-widest mb-1">TOPLAM GERİ ÖDEME</p>
                    <p className="text-xl font-bold">{formatCurrency(result.total)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black opacity-60 uppercase tracking-widest mb-1">TOPLAM FAİZ</p>
                    <p className="text-xl font-bold text-emerald-200">{formatCurrency(result.interest)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-8 rounded-[3rem] border border-border shadow-xl flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-500" />
                      <span className="text-[11px] font-black text-muted uppercase tracking-widest">MALİYET ANALİZİ</span>
                    </div>
                    <span className="text-xs font-black text-emerald-600">FAİZ ORANI: %{interestRatio.toFixed(1)}</span>
                  </div>
                  <div className="h-4 w-full bg-secondary/20 rounded-full overflow-hidden flex border border-border/50">
                    <div className="h-full bg-emerald-500" style={{ width: `${100 - interestRatio}%` }} title="Anapara" />
                    <div className="h-full bg-red-400" style={{ width: `${interestRatio}%` }} title="Faiz" />
                  </div>
                  <div className="flex gap-4 text-[9px] font-bold text-muted justify-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> ANAPARA
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" /> TOPLAM FAİZ
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/hesapla/kredi-odeme-plani?amount=${amount}&rate=${rate}&months=${months}`}
                  className="btn-primary w-full py-5 !bg-zinc-900 !border-zinc-800 hover:!bg-black flex items-center justify-center gap-3 mt-8"
                >
                  <span className="font-black text-xs uppercase tracking-widest">Detaylı Ödeme Planını Gör</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-12 bg-secondary/10 rounded-[3rem] border-dashed border-4 border-border grayscale opacity-40 text-center">
              <div className="text-6xl mb-6">📉</div>
              <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                HESAPLAMA İÇİN<br/>VERİLERİ DOLDURUN
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="calc-info-box mt-12 bg-emerald-500/5 border-emerald-500/20">
        <span className="calc-info-box-icon text-emerald-600">💡</span>
        <span className="calc-info-box-text text-muted leading-relaxed">
          <b>Önemli Hatırlatma:</b> Bu hesaplama bankaların kullandığı standart kredi formülünü temel alır. Bankanızın uyguladığı KKDF ve BSMV vergileri, sigorta bedelleri ve dosya masrafları toplam maliyeti değiştirebilir. Detaylı tablo için "Ödeme Planı" butonunu kullanın.
        </span>
      </div>
    </div>
  );
}
