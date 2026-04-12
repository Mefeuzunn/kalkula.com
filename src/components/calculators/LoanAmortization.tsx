"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, PieChart, ArrowLeft, Download, Share2, Info, ChevronDown, TrendingUp, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";
import { downloadCSV } from "@/lib/ExportUtils";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";

function LoanAmortizationContent() {
  const searchParams = useSearchParams();
  
  const [amount, setAmount] = useState(searchParams.get("amount") || "100000");
  const [months, setMonths] = useState(searchParams.get("months") || "12");
  const [rate, setRate] = useState(searchParams.get("rate") || "3.5");
  
  const [summary, setSummary] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    schedule: { 
      period: number; 
      payment: number; 
      principal: number; 
      interestAmt: number; 
      balance: number 
    }[];
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const n = parseInt(months);
    const i = parseFloat(rate) / 100;

    if (!P || !n || !i || P <= 0 || n <= 0 || i <= 0) {
      setSummary(null);
      return;
    }

    const monthlyPayment = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    const schedule = [];
    let remainingBalance = P;

    for (let k = 1; k <= n; k++) {
      const interestAmt = remainingBalance * i;
      const principal = monthlyPayment - interestAmt;
      remainingBalance -= principal;

      schedule.push({
        period: k,
        payment: monthlyPayment,
        principal,
        interestAmt,
        balance: Math.max(0, remainingBalance)
      });
    }

    setSummary({ monthlyPayment, totalPayment, totalInterest, schedule });
  };

  const handleDownload = () => {
    if (!summary) return;
    const headers = ["Donem", "Odeme", "Anapara", "Faiz", "Kalan Bakiye"];
    const rows = summary.schedule.map(s => [
      s.period,
      s.payment.toFixed(2),
      s.principal.toFixed(2),
      s.interestAmt.toFixed(2),
      s.balance.toFixed(2)
    ]);
    downloadCSV(headers, rows, `odeme-plani-${amount}-tutar`);
  };

  useEffect(() => {
    calculate();
  }, [amount, months, rate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="calc-wrapper animate-fade-in max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Detaylı Ödeme Planı</h1>
            <p className="text-muted text-sm uppercase tracking-widest font-bold">Kredi Geri Ödeme Projeksiyonu</p>
          </div>
        </div>
        <Link 
          href="/hesapla/kredi-hesaplama"
          className="flex items-center gap-2 text-xs font-black text-muted hover:text-primary transition-colors uppercase tracking-widest bg-secondary/10 px-6 py-3 rounded-2xl border border-border"
        >
          <ArrowLeft size={14} /> Ana Kredi Hesaplayıcıya Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-surface p-10 rounded-[3rem] border border-border shadow-2xl space-y-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">TOPLAM KREDİ TUTARI</label>
                 <div className="relative">
                    <input 
                       type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                       className="input-field w-full !text-2xl font-black py-4 px-6 border-4 border-border focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-6 top-[32%] text-muted font-black opacity-30">₺</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">VADE (AY)</label>
                 <div className="relative">
                    <input 
                       type="number" value={months} onChange={(e) => setMonths(e.target.value)}
                       className="input-field w-full !text-2xl font-black py-4 px-6 border-4 border-border focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-6 top-[32%] text-muted font-black opacity-30">AY</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">AYLIK FAİZ ORANI (%)</label>
                 <div className="relative">
                    <input 
                       type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)}
                       className="input-field w-full !text-2xl font-black py-4 px-6 border-4 border-border focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-6 top-[32%] text-muted font-black opacity-30">%</span>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-start gap-4">
              <Info size={18} className="text-blue-500 shrink-0 mt-1" />
              <div className="space-y-1">
                 <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">NEDİR BU TABLO?</h4>
                 <p className="text-[11px] text-muted leading-relaxed">
                   <b>Amortizasyon Tablosu</b>, kredi borcunuzun zaman içindeki erimesini gösterir. Ödediğiniz her taksidin ne kadarının <b>ana borca</b>, ne kadarının <b>faize</b> gittiğini kuruşu kuruşuna takip edebilirsiniz.
                 </p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           {summary ? (
              <div className="space-y-10">
                  <V2Premium3DResult
                    title="KREDİ GERİ ÖDEME PROJEKSİYONU"
                    mainLabel="AYLIK TAKSİT TUTARI"
                    mainValue={formatCurrency(summary.monthlyPayment)}
                    subLabel="TOPLAM GERİ ÖDEME"
                    subValue={formatCurrency(summary.totalPayment)}
                    color="blue"
                    variant="precise"
                    accentIcon={<Calendar size={32} />}
                    items={[
                      {
                        label: "TOPLAM FAİZ YÜKÜ",
                        value: formatCurrency(summary.totalInterest),
                        icon: <TrendingDown size={16} />,
                        color: "bg-red-500/10 text-red-500"
                      },
                      {
                        label: "VADE SÜRESİ",
                        value: `${months} Ay`,
                        icon: <Clock size={16} />,
                        color: "bg-blue-500/10 text-blue-500"
                      }
                    ]}
                  />

                 <div className="bg-surface border-4 border-border rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up">
                    <div className="p-8 bg-secondary/5 flex justify-between items-center border-b border-border">
                       <div className="flex items-center gap-3">
                          <PieChart size={18} className="text-blue-500" />
                          <h3 className="text-sm font-black text-primary uppercase tracking-widest italic">Aylık Ödeme Planı Özeti</h3>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={handleDownload} className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-border shadow-sm hover:translate-y-[-2px] transition-all hover:text-emerald-500"><Download size={14} /></button>
                          <button className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-border shadow-sm hover:translate-y-[-2px] transition-all cursor-not-allowed opacity-50"><Share2 size={14} /></button>
                       </div>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20">
                       <table className="w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-white dark:bg-zinc-900 border-b-2 border-border z-10">
                             <tr>
                                <th className="p-6 text-[10px] font-black text-muted uppercase tracking-tighter">DÖNEM</th>
                                <th className="p-6 text-[10px] font-black text-muted uppercase tracking-tighter">TAKSİT</th>
                                <th className="p-6 text-[10px] font-black text-muted uppercase tracking-tighter">ANAPARA</th>
                                <th className="p-6 text-[10px] font-black text-muted uppercase tracking-tighter">FAİZ</th>
                                <th className="p-6 text-[10px] font-black text-muted uppercase tracking-tighter text-right">KALAN BORÇ</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40">
                             {summary.schedule.map((row) => (
                                <tr key={row.period} className="hover:bg-blue-500/5 transition-all group">
                                   <td className="p-6 text-xs font-black text-muted italic">#{row.period}</td>
                                   <td className="p-6 text-xs font-bold text-primary">{formatCurrency(row.payment)}</td>
                                   <td className="p-6 text-xs font-bold text-emerald-600">{formatCurrency(row.principal)}</td>
                                   <td className="p-6 text-xs font-bold text-red-500">{formatCurrency(row.interestAmt)}</td>
                                   <td className="p-6 text-xs font-black text-primary text-right tracking-tighter">{formatCurrency(row.balance)}</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                    
                    <div className="p-8 bg-zinc-900 text-center">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Projeksiyonun Sonu • {months} Ay Tamamlandı</p>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <div className="text-7xl mb-8">🗓️</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    İSTatistİkler İÇİN<br/>SOL tarafi doldurun
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

export function LoanAmortization() {
  return (
    <Suspense fallback={
      <div className="animate-pulse flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-muted uppercase tracking-widest italic">Hesaplayıcı Yükleniyor...</p>
      </div>
    }>
      <LoanAmortizationContent />
    </Suspense>
  );
}

