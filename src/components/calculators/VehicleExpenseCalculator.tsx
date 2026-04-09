"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { Car, Fuel, ShieldAlert, ShieldCheck, Landmark, ReceiptText } from "lucide-react";

export function VehicleExpenseCalculator() {
  const [expenseTotal, setExpenseTotal] = useState("10000");
  const [rentTotal, setRentTotal] = useState("30000");
  const [result, setResult] = useState<{ deductible: number; kkeg: number; rentDeductible: number; rentKkeg: number } | null>(null);

  const RENT_LIMIT = 26000; // 2024 sınırı

  const calculate = () => {
    const e = parseFloat(expenseTotal) || 0;
    const r = parseFloat(rentTotal) || 0;
    if (e <= 0 && r <= 0) { setResult(null); return; }
    const deductible = e * 0.70;
    const kkeg = e * 0.30;
    const rentDeductible = Math.min(r, RENT_LIMIT);
    const rentKkeg = Math.max(0, r - RENT_LIMIT);
    setResult({ deductible, kkeg, rentDeductible, rentKkeg });
  };

  const reset = () => { setExpenseTotal("10000"); setRentTotal("30000"); setResult(null); };

  useEffect(() => { calculate(); }, [expenseTotal, rentTotal]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="ARAÇ GİDER — KKEG ANALİZİ"
      icon="🚗"
      infoText="Kiralık binek araçta KDV hariç kira bedelinin aylık 26.000 TL üzerindeki kısmı KKEG'dir. Genel giderlerin %30'u KKEG sayılır."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Aylık Araç Kira Bedeli" 
          value={rentTotal} 
          onChange={setRentTotal} 
          unit="₺" 
          placeholder="30000"
        />
        <V2Input 
          label="Genel Giderler (Yakıt, Bakım...)" 
          value={expenseTotal} 
          onChange={setExpenseTotal} 
          unit="₺" 
          placeholder="10000"
        />
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="🚗 Gider Analizi Yap"
      />

      {result && (
        <V2Premium3DResult
          title="VERGİSEL DURUM ANALİZİ"
          mainLabel="TOPLAM GİDER YAZILABİLEN"
          mainValue={fmt(result.rentDeductible + result.deductible)}
          subLabel={`Toplam KKEG (Kanunen Kabul Edilmeyen Gider): ${fmt(result.rentKkeg + result.kkeg)}`}
          subValue=""
          color="emerald"
          variant="precise"
          accentIcon={<Car size={32} />}
          items={[
            {
              label: "KİRA GİDERİ (KABUL)",
              value: fmt(result.rentDeductible),
              icon: <ShieldCheck size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              label: "KİRA GİDERİ (KKEG)",
              value: fmt(result.rentKkeg),
              icon: <ShieldAlert size={16} />,
              color: "bg-red-500/10 text-red-500"
            },
            {
              label: "YAKIT/BAKIM (KABUL %70)",
              value: fmt(result.deductible),
              icon: <Fuel size={16} />,
              color: "bg-emerald-500/10 text-emerald-400"
            },
            {
              label: "YAKIT/BAKIM (KKEG %30)",
              value: fmt(result.kkeg),
              icon: <ReceiptText size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Kiralık binek araçta KDV hariç kira bedelinin aylık {fmt(RENT_LIMIT)} üzerindeki kısmı KKEG'dir. Genel giderlerin (yakıt, bakım, sigorta) %30'u KKEG sayılır. (GVK 2024)</span>
      </div>
    </div>
  );
}
