import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { CreditCard, AlertCircle, TrendingDown, Clock } from "lucide-react";

export function CreditCardCalculator() {
  const [debt, setDebt] = useState("15000");
  const [limit, setLimit] = useState("50000");
  const [interestRate, setInterestRate] = useState("5.00");
  const [result, setResult] = useState<{ 
    minPayment: number; 
    ratio: number; 
    remaining: number;
    dailyInterest: number;
    monthlyInterest: number;
  } | null>(null);

  const calculate = () => {
    const d = parseFloat(debt);
    const l = parseFloat(limit);
    const r = parseFloat(interestRate);
    if (!d || !l || d <= 0 || l <= 0) { setResult(null); return; }
    
    const ratio = l > 25000 ? 0.40 : 0.20;
    const minPayment = d * ratio;
    const remaining = d - minPayment;
    
    const dailyInterest = remaining > 0 ? remaining * (r / 100 / 30) : 0;
    const monthlyInterest = dailyInterest * 30;

    setResult({ minPayment, ratio, remaining, dailyInterest, monthlyInterest });
  };

  const reset = () => { 
    setDebt("15000"); 
    setLimit("50000"); 
    setInterestRate("5.00");
    setResult(null); 
  };

  useEffect(() => { calculate(); }, [debt, limit, interestRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="ASGARİ ÖDEME VE FAİZ ANALİZİ"
      icon="💳"
      infoText="Sadece asgari ödeme yapılması durumunda kalan borca akdi faiz uygulanır. BDDK kuralları gereği 25.000 TL altı limitlerde %20, üstü limitlerde %40 asgari ödeme oranı uygulanır."
      results={result && (
        <V2Premium3DResult
          title="KREDİ KARTI ANALİZ ANALİZİ"
          mainLabel="GEREKLİ ASGARİ ÖDEME"
          mainValue={fmt(result.minPayment)}
          subLabel={`%${(result.ratio * 100).toFixed(0)} asgari ödeme oranı uygulandı`}
          subValue=""
          color="red"
          variant="precise"
          accentIcon={<CreditCard size={32} />}
          items={[
            {
              label: "DÖNEM SONU KALAN BORÇ",
              value: fmt(result.remaining),
              icon: <Clock size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            },
            {
              label: "AYLIK FAİZ YÜKÜ",
              value: `+${fmt(result.monthlyInterest)}`,
              icon: <TrendingDown size={16} />,
              color: "bg-red-500/10 text-red-500"
            },
            {
              label: "GÜNLÜK FAİZ MALİYETİ",
              value: fmt(result.dailyInterest),
              icon: <AlertCircle size={16} />,
              color: "bg-red-500/10 text-red-400"
            }
          ]}
        />
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input label="KREDİ KARTI LİMİTİ" value={limit} onChange={setLimit} unit="₺" />
        <V2Input label="DÖNEM BORCU" value={debt} onChange={setDebt} unit="₺" />
      </div>

      <V2Input label="AYLIK AKDİ FAİZ (%)" value={interestRate} onChange={setInterestRate} unit="%" step="0.01" />

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="💳 Faiz Dahil Analiz Et"
      />
    </V2CalculatorWrapper>
  );
}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input
          label="KREDİ KARTI LİMİTİ"
          value={limit}
          onChange={setLimit}
          unit="₺"
        />
        <V2Input
          label="DÖNEM BORCU"
          value={debt}
          onChange={setDebt}
          unit="₺"
        />
      </div>

      <V2Input
        label="AYLIK AKDİ FAİZ (%)"
        value={interestRate}
        onChange={setInterestRate}
        unit="%"
        step="0.01"
      />

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="💳 Faiz Dahil Analiz Et"
      />
    </V2CalculatorWrapper>
  );
}
