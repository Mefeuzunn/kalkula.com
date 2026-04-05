import React, { useState } from "react";
import confetti from "canvas-confetti";

type Cheque = { id: number; amount: string; days: string };

export function AverageMaturityCalculator() {
  const [cheques, setCheques] = useState<Cheque[]>([
    { id: 1, amount: "", days: "" },
    { id: 2, amount: "", days: "" }
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
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#3b82f6", "#2dd4bf"] });
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

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="result-card-premium !text-left bg-surface/40 p-6 border-border border-2">
        <div className="flex justify-between items-center mb-4">
           <span className="text-xs font-black text-muted uppercase tracking-widest">Çek / Senet Listesi</span>
           <button onClick={addRow} className="text-xs font-bold text-accent-primary hover:text-accent-primary/80 transition-all">+ Yeni Ekle</button>
        </div>

        <div className="flex flex-col gap-3">
          {cheques.map((c, i) => (
            <div key={c.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_40px] gap-3 items-center animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted/50">₺</span>
                 <input type="number" value={c.amount} onChange={e => updateField(c.id, "amount", e.target.value)} className="input-field !pl-8 !py-3" placeholder="Tutar" />
              </div>
              <div className="relative">
                 <input type="number" value={c.days} onChange={e => updateField(c.id, "days", e.target.value)} className="input-field !py-3" placeholder="Vade (Gün)" />
              </div>
              <button 
                onClick={() => removeRow(c.id)} 
                className={`p-2 rounded-lg transition-all ${cheques.length > 1 ? 'hover:bg-red-500/10 text-red-500' : 'opacity-20 cursor-not-allowed'}`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Ortalama Vadeyi Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-blue-500/10 !text-blue-500 !border-blue-500/20">Ağırlıklı Ortalama Vade</div>
              <div className="result-value-premium !text-blue-500 font-black">{Math.round(result.averageDays)} <span className="text-2xl opacity-40">Gün</span></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Toplam Portföy</div>
                    <div className="font-bold text-lg text-primary">{fmt(result.totalAmount)}</div>
                 </div>
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Kesin Vade</div>
                    <div className="font-bold text-lg text-primary">{result.averageDays.toFixed(1)} Gün</div>
                 </div>
                 <div className="text-left p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Durum</div>
                    <div className="font-bold text-lg text-accent-primary">Hesaplandı</div>
                 </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-[10px] text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
                 💡 Ortalama vade, her alacağın büyüklüğüne göre süresinin matematiksel ağırlığı alınarak bulunur. 
                 Nakit akışı planlamanızı bu tarihe göre yapabilirsiniz.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
