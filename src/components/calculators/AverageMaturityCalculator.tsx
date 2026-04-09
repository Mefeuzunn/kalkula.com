"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { Scale, Landmark, Calendar, Clock, Plus, Trash2, Info } from "lucide-react";

type Cheque = { id: number; amount: string; days: string };

export function AverageMaturityCalculator() {
  const [cheques, setCheques] = useState<Cheque[]>([
    { id: 1, amount: "150000", days: "30" },
    { id: 2, amount: "250000", days: "60" }
  ]);
  const [result, setResult] = useState<{ averageDays: number; totalAmount: number } | null>(null);

  const calculate = () => {
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

    if (sumAmount > 0) {
      setResult({ averageDays: sumWeighted / sumAmount, totalAmount: sumAmount });
    } else {
      setResult(null);
    }
  };

  const updateField = (id: number, field: "amount" | "days", val: string) => {
    setCheques(cheques.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const addRow = () => {
    setCheques([...cheques, { id: Date.now(), amount: "", days: "" }]);
  };

  const removeRow = (id: number) => {
    if (cheques.length <= 1) return;
    setCheques(cheques.filter(c => c.id !== id));
  };

  const reset = () => {
    setCheques([
      { id: Date.now(), amount: "150000", days: "30" },
      { id: Date.now() + 1, amount: "250000", days: "60" }
    ]);
  };

  useEffect(() => { calculate(); }, [cheques]);

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="ORTALAMA VADE HESABI"
      icon="⚖️"
      infoText="Ortalama vade, portföyünüzdeki her bir alacağın/borcun büyüklüğüne göre süresinin matematiksel ağırlığı alınarak hesaplanır."
    >
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-[10px] font-black uppercase text-muted tracking-widest flex items-center gap-2">
            <Landmark size={14} className="text-emerald-500" />
            ÇEK / SENET PORTFÖYÜ
          </h3>
          <button 
            onClick={addRow}
            className="group flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl text-xs font-black transition-all duration-300"
          >
            <Plus size={14} className="group-hover:rotate-90 transition-transform" />
            YENİ EKLE
          </button>
        </div>

        <div className="space-y-3">
          {cheques.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-3 items-center group animate-in fade-in slide-in-from-left duration-300">
              <div className="col-span-6">
                <V2Input 
                  label="" 
                  value={c.amount} 
                  onChange={(val) => updateField(c.id, "amount", val)} 
                  unit="₺" 
                  placeholder="Tutar"
                />
              </div>
              <div className="col-span-5">
                <V2Input 
                  label="" 
                  value={c.days} 
                  onChange={(val) => updateField(c.id, "days", val)} 
                  unit="GÜN" 
                  placeholder="Vade"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  onClick={() => removeRow(c.id)}
                  disabled={cheques.length <= 1}
                  className={`p-3 rounded-xl transition-all ${cheques.length > 1 ? "text-red-500/50 hover:text-red-500 hover:bg-red-500/10 cursor-pointer" : "text-muted/20 cursor-not-allowed"}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="⚖️ Vade Analizi Yap"
      />

      {result && (
        <V2Premium3DResult
          title="VADE ANALİZ SONUÇLARI"
          mainLabel="AĞIRLIKLI ORTALAMA VADE"
          mainValue={`${Math.round(result.averageDays)} Gün`}
          subLabel={`Toplam ${cheques.length} adet kalem analiz edildi.`}
          subValue=""
          color="blue"
          variant="precise"
          accentIcon={<Scale size={32} />}
          items={[
            {
              label: "TOPLAM PORTFÖY TUTARI",
              value: fmt(result.totalAmount),
              icon: <Landmark size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "MATEMATİKSEL KESİN VADE",
              value: `${result.averageDays.toFixed(1)} Gün`,
              icon: <Clock size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            },
            {
              label: "ORTALAMA VADE TARİHİ",
              value: `~ ${Math.round(result.averageDays)} Gün Sonra`,
              icon: <Calendar size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Ortalama vade, portföyünüzdeki her bir alacağın/borcun büyüklüğüne göre süresinin matematiksel ağırlığı alınarak(Tutar x Gün / Toplam Tutar) hesaplanır.</span>
      </div>
    </div>
  );
}
