import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { TrendingUp, BarChart3, Clock, DollarSign, ArrowUpRight } from "lucide-react";

export function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("10000");
  const [finalValue, setFinalValue] = useState("25000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ cagr: number; totalReturn: number } | null>(null);

  const calculate = () => {
    const start = parseFloat(initialValue);
    const end = parseFloat(finalValue);
    const y = parseFloat(years);
    if (start > 0 && end > 0 && y > 0) {
      const cagr = (Math.pow(end / start, 1 / y) - 1) * 100;
      const totalReturn = ((end - start) / start) * 100;
      setResult({ cagr, totalReturn });
    } else setResult(null);
  };

  const reset = () => { setInitialValue("10000"); setFinalValue("25000"); setYears("5"); setResult(null); };

  useEffect(() => { calculate(); }, [initialValue, finalValue, years]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="BİLEŞİK YILLIK BÜYÜME HESABI"
      icon="📈"
      infoText="CAGR (Bileşik Yıllık Büyüme Oranı), farklı sürelerdeki yatırımları karşılaştırmak için kullanılır. Gerçek getirinin her yıl sabit kaldığını varsayar."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Başlangıç Değeri" 
          value={initialValue} 
          onChange={setInitialValue} 
          unit="₺" 
          placeholder="10000"
        />
        <V2Input 
          label="Bitiş Değeri" 
          value={finalValue} 
          onChange={setFinalValue} 
          unit="₺" 
          placeholder="25000"
        />
        <div className="md:col-span-2">
          <V2Input 
            label="Geçen Süre" 
            value={years} 
            onChange={setYears} 
            unit="YIL" 
            placeholder="5"
          />
        </div>
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📈 CAGR Hesapla"
      />

      {result && (
        <V2Premium3DResult
          title="BİLEŞİK BÜYÜME ANALİZİ"
          mainLabel="YILLIK BİLEŞİK BÜYÜME ORANI (CAGR)"
          mainValue={`%${result.cagr.toFixed(2)}`}
          subLabel={`${years} yıllık dönem için yıllıklandırılmış getiri`}
          subValue=""
          color="emerald"
          variant="precise"
          accentIcon={<TrendingUp size={32} />}
          items={[
            {
              label: "TOPLAM GETİRİ ORANI",
              value: `${result.totalReturn >= 0 ? "+" : ""}${result.totalReturn.toFixed(1)}%`,
              icon: <ArrowUpRight size={16} />,
              color: result.totalReturn >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
            },
            {
              label: "NET KAZANÇ",
              value: fmt(parseFloat(finalValue) - parseFloat(initialValue)),
              icon: <DollarSign size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "ANALİZ DÖNEMİ",
              value: `${years} Yıl`,
              icon: <Clock size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">CAGR (Bileşik Yıllık Büyüme Oranı), farklı sürelerdeki yatırımları karşılaştırmak için kullanılır. Gerçek getirinin her yıl sabit kaldığını varsayar.</span>
      </div>
    </div>
  );
}
