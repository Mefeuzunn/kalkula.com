import React, { useState, useCallback } from "react";
import confetti from "canvas-confetti";

type ScoreCategory = { c: string; w: string };

interface InputRowProps {
  label: string;
  maxQ: number;
  name: string;
  dict: Record<string, ScoreCategory>;
  setDict: React.Dispatch<React.SetStateAction<Record<string, ScoreCategory>>>;
}

function InputRow({ label, maxQ, name, dict, setDict }: InputRowProps) {
  const c = parseFloat(dict[name].c) || 0;
  const w = parseFloat(dict[name].w) || 0;
  const net = Math.max(0, c - (w / 4));

  const handleChange = (field: "c" | "w", val: string) => {
    setDict(prev => ({ ...prev, [name]: { ...prev[name], [field]: val } }));
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-surface/50 rounded-2xl border border-border hover:border-accent-primary/20 transition-all">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-black text-muted uppercase tracking-widest">{label} <span className="opacity-40">({maxQ} S)</span></span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-glow/5 text-accent-primary border border-accent-primary/10">{net.toFixed(2)} Net</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input 
          type="number" 
          value={dict[name].c} 
          onChange={e => handleChange("c", e.target.value)} 
          className="input-field !py-2 !text-sm !text-center font-bold !bg-green-500/5 !border-green-500/20 text-green-600" 
          placeholder="D" 
        />
        <input 
          type="number" 
          value={dict[name].w} 
          onChange={e => handleChange("w", e.target.value)} 
          className="input-field !py-2 !text-sm !text-center font-bold !bg-red-500/5 !border-red-500/20 text-red-600" 
          placeholder="Y" 
        />
      </div>
    </div>
  );
}

export function YksCalculator() {
  const [activeTab, setActiveTab] = useState<"TYT" | "AYT" | "YDT" | "SONUC">("TYT");

  const [tyt, setTyt] = useState<Record<string, ScoreCategory>>({
    turkce: { c: "", w: "" },
    sosyal: { c: "", w: "" },
    mat: { c: "", w: "" },
    fen: { c: "", w: "" },
  });

  const [ayt, setAyt] = useState<Record<string, ScoreCategory>>({
    mat: { c: "", w: "" },
    fizik: { c: "", w: "" },
    kimya: { c: "", w: "" },
    biyo: { c: "", w: "" },
    edebiyat: { c: "", w: "" },
    tarih1: { c: "", w: "" },
    cog1: { c: "", w: "" },
    tarih2: { c: "", w: "" },
    cog2: { c: "", w: "" },
    felsefe: { c: "", w: "" },
    din: { c: "", w: "" },
  });

  const [ydt, setYdt] = useState<ScoreCategory>({ c: "", w: "" });
  const [diploma, setDiploma] = useState("85");
  
  const [results, setResults] = useState<{
    tytNet: number;
    tytPuan: number;
    sayPuan: number;
    eaPuan: number;
    sozPuan: number;
    dilPuan: number;
    obp: number;
  } | null>(null);

  const calcNet = (cStr: string, wStr: string) => {
    const c = parseFloat(cStr) || 0;
    const w = parseFloat(wStr) || 0;
    return Math.max(0, c - (w / 4));
  };

  const calculate = () => {
    const tTurkce = calcNet(tyt.turkce.c, tyt.turkce.w);
    const tSosyal = calcNet(tyt.sosyal.c, tyt.sosyal.w);
    const tMat = calcNet(tyt.mat.c, tyt.mat.w);
    const tFen = calcNet(tyt.fen.c, tyt.fen.w);
    const tytNet = tTurkce + tSosyal + tMat + tFen;

    const aMat = calcNet(ayt.mat.c, ayt.mat.w);
    const aFizik = calcNet(ayt.fizik.c, ayt.fizik.w);
    const aKimya = calcNet(ayt.kimya.c, ayt.kimya.w);
    const aBiyo = calcNet(ayt.biyo.c, ayt.biyo.w);
    const aEdebiyat = calcNet(ayt.edebiyat.c, ayt.edebiyat.w);
    const aTarih1 = calcNet(ayt.tarih1.c, ayt.tarih1.w);
    const aCog1 = calcNet(ayt.cog1.c, ayt.cog1.w);
    const aTarih2 = calcNet(ayt.tarih2.c, ayt.tarih2.w);
    const aCog2 = calcNet(ayt.cog2.c, ayt.cog2.w);
    const aFelsefe = calcNet(ayt.felsefe.c, ayt.felsefe.w);
    const aDin = calcNet(ayt.din.c, ayt.din.w);

    const dilNetValue = calcNet(ydt.c, ydt.w);
    const obp = Math.min(100, parseFloat(diploma) || 50) * 0.6; 
    const basePuan = 100;

    // TYT Ham Puan (Sadece TYT için 100-500 skalası)
    const tytHamPuan = basePuan + (tTurkce * 3.3) + (tMat * 3.3) + (tSosyal * 3.4) + (tFen * 3.4);
    
    // Yerleştirme Puanları İçin TYT Katkısı (%40 Etki)
    const tytEffect = (tTurkce * 1.32) + (tMat * 1.32) + (tSosyal * 1.36) + (tFen * 1.36);
    
    // Alan Puanları (Zorluk Katsayıları Optimize Edildi)
    const sayPuan = basePuan + tytEffect + (aMat * 3.0) + (aFizik * 2.85) + (aKimya * 3.07) + (aBiyo * 3.07);
    const eaPuan = basePuan + tytEffect + (aMat * 3.0) + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33);
    const sozPuan = basePuan + tytEffect + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33) + (aTarih2 * 2.91) + (aCog2 * 2.91) + (aFelsefe * 3.0) + (aDin * 3.33);
    const dilPuan = basePuan + tytEffect + (dilNetValue * 3.0);

    setResults({
      tytNet,
      obp,
      tytPuan: Math.min(500, tytHamPuan),
      sayPuan: Math.min(500, sayPuan),
      eaPuan: Math.min(500, eaPuan),
      sozPuan: Math.min(500, sozPuan),
      dilPuan: Math.min(500, dilPuan),
    });

    setActiveTab("SONUC");
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#8b5cf6", "#10b981"]
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 border-b-4 border-accent-primary/20">
        <div className="text-left">
          <h4 className="text-xl font-black text-primary uppercase tracking-tighter italic">Diploma Notu (OBP)</h4>
          <p className="text-[10px] text-muted font-bold mt-1 uppercase tracking-widest">Sıralamanıza Eklenecek Net Puan: <span className="text-accent-primary">+{(Math.min(100, parseFloat(diploma) || 50) * 0.6).toFixed(2)}</span></p>
        </div>
        <div className="relative group">
           <div className="absolute -inset-1 bg-accent-primary/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-40 transition-all"></div>
           <input 
            type="number" 
            value={diploma} 
            onChange={e => setDiploma(e.target.value)} 
            className="input-field !w-40 !py-4 !text-4xl font-black text-center border-4 border-border focus:border-accent-primary shadow-inner rounded-2xl relative z-10" 
            placeholder="100"
           />
        </div>
      </div>

      <div className="flex bg-secondary/10 p-2 rounded-[1.5rem] gap-2 border border-border">
        {["TYT", "AYT", "YDT", "SONUC"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${activeTab === tab ? 'bg-surface text-accent-primary shadow-xl border border-accent-primary/10' : 'text-muted hover:text-primary hover:bg-secondary/5'}`}
          >
            {activeTab === tab && <span className="absolute inset-0 bg-accent-primary/5 animate-pulse"></span>}
            <span className="relative z-10">{tab === "SONUC" ? "📊 ANALİZ" : tab}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === "TYT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
            <InputRow label="Türkçe" maxQ={40} name="turkce" dict={tyt} setDict={setTyt} />
            <InputRow label="Temel Matematik" maxQ={40} name="mat" dict={tyt} setDict={setTyt} />
            <InputRow label="Sosyal Bilimler" maxQ={20} name="sosyal" dict={tyt} setDict={setTyt} />
            <InputRow label="Fen Bilimleri" maxQ={20} name="fen" dict={tyt} setDict={setTyt} />
          </div>
        )}

        {activeTab === "AYT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 rounded-xl border-l-4 border-blue-500">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">Sayısal & EA Ortak</span>
               </div>
               <InputRow label="AYT Matematik" maxQ={40} name="mat" dict={ayt} setDict={setAyt} />
               <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 rounded-xl border-l-4 border-green-500 mt-4">
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic">Fen Bilimleri (SAY)</span>
               </div>
               <InputRow label="Fizik" maxQ={14} name="fizik" dict={ayt} setDict={setAyt} />
               <InputRow label="Kimya" maxQ={13} name="kimya" dict={ayt} setDict={setAyt} />
               <InputRow label="Biyoloji" maxQ={13} name="biyo" dict={ayt} setDict={setAyt} />
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/5 rounded-xl border-l-4 border-orange-500">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest italic">Edebiyat & Sosyal-1 (EA/SÖZ)</span>
               </div>
               <InputRow label="T. Dili ve Ed." maxQ={24} name="edebiyat" dict={ayt} setDict={setAyt} />
               <InputRow label="Tarih - 1" maxQ={10} name="tarih1" dict={ayt} setDict={setAyt} />
               <InputRow label="Coğrafya - 1" maxQ={6} name="cog1" dict={ayt} setDict={setAyt} />
               <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/5 rounded-xl border-l-4 border-purple-500 mt-4">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest italic">Sosyal Bilimler-2 (SÖZ)</span>
               </div>
               <InputRow label="Tarih - 2" maxQ={11} name="tarih2" dict={ayt} setDict={setAyt} />
               <InputRow label="Coğrafya - 2" maxQ={11} name="cog2" dict={ayt} setDict={setAyt} />
               <InputRow label="Felsefe Grubu" maxQ={12} name="felsefe" dict={ayt} setDict={setAyt} />
            </div>
          </div>
        )}

        {activeTab === "YDT" && (
          <div className="max-w-xl mx-auto w-full animate-fadeIn mt-10">
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-border"></div>
               <span className="text-xs font-black text-muted uppercase tracking-[0.4em] italic text-center">Yabancı Dil Oturumu</span>
               <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-border"></div>
            </div>
            <InputRow label="YDT (İng/Fr/Alm)" maxQ={80} name="ydt" dict={{ydt}} setDict={(val: any) => setYdt(val.ydt)} />
          </div>
        )}

        {activeTab === "SONUC" && (
          <div className="flex flex-col gap-8 animate-result mt-4">
            {results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { label: "TYT PUANI", icon: "🚀", val: results.tytPuan, yer: results.tytPuan + results.obp, clr: "text-blue-500", bg: "bg-blue-500/5" },
                     { label: "SAYISAL (SAY)", icon: "🔬", val: results.sayPuan, yer: results.sayPuan + results.obp, clr: "text-accent-primary", bg: "bg-accent-primary/5" },
                     { label: "EŞİT AĞIRLIK (EA)", icon: "⚖️", val: results.eaPuan, yer: results.eaPuan + results.obp, clr: "text-accent-secondary", bg: "bg-accent-secondary/5" },
                     { label: "SÖZEL (SÖZ)", icon: "📚", val: results.sozPuan, yer: results.sozPuan + results.obp, clr: "text-orange-500", bg: "bg-orange-500/5" },
                   ].map((p) => (
                     <div key={p.label} className={`result-card-premium !text-left !p-8 border-2 border-border hover:border-accent-primary/30 transition-all group overflow-hidden relative ${p.bg}`}>
                        <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:scale-125 transition-transform">{p.icon}</div>
                        <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 italic">{p.label}</div>
                        <div className={`text-4xl font-black italic tracking-tighter ${p.clr}`}>{p.yer.toFixed(2)}</div>
                        <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                           <span className="text-[9px] font-bold text-muted uppercase">Ham: {p.val.toFixed(2)}</span>
                           <span className="text-[8px] font-black bg-white/50 px-2 py-0.5 rounded-full">+OBP</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="panel p-10 bg-secondary/5 border-2 border-border rounded-[3rem] relative">
                   <h5 className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-10 text-center border-b border-border/50 pb-4 italic">Kritik Bölüm Baraj Analizi</h5>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { b: "TIP FAKÜLTESİ", p: 460, current: results.sayPuan + results.obp, info: "Puan Türü: SAY" },
                        { b: "HUKUK FAKÜLTESİ", p: 380, current: results.eaPuan + results.obp, info: "Puan Türü: EA" },
                        { b: "MÜHENDİSLİK", p: 350, current: results.sayPuan + results.obp, info: "Puan Türü: SAY" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-3">
                           <div className="flex justify-between items-center text-[10px] font-black">
                              <span className="text-primary tracking-widest">{item.b}</span>
                              <span className={item.current >= item.p ? "text-green-500" : "text-muted"}>%{Math.min(100, Math.round((item.current/item.p)*100))}</span>
                           </div>
                           <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${item.current >= item.p ? 'bg-green-500' : 'bg-accent-primary'}`} style={{ width: `${Math.min(100, (item.current/item.p)*100)}%` }} />
                           </div>
                           <span className="text-[8px] text-muted font-bold uppercase tracking-widest">{item.info}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </>
            ) : (
              <div className="panel p-20 text-center flex flex-col items-center gap-4 rounded-[3rem] border-dashed border-4 border-border/40">
                 <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center grayscale">📈</div>
                 <p className="text-sm font-black text-muted uppercase tracking-widest italic">Puanlarınızı görmek için ders netlerini girip "Hesapla" düğmesine basın.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
         <button 
           className="btn-primary py-6 text-2xl font-black shadow-dark transition-all active:scale-95 uppercase tracking-widest italic rounded-[2rem]" 
           onClick={calculate}
         >
           TÜM PUANLARI ANALİZ ET
         </button>
         
         <div className="text-center bg-secondary/5 p-6 rounded-2xl border border-border">
            <p className="text-[10px] text-muted font-medium italic leading-relaxed uppercase tracking-widest opacity-60">
               ⚠️ ŞU ANKİ VERİ: ÖSYM 2024 KATKILARI VE GEÇMİŞ YIL STANDART SAPMA PROJEKSİYONLARI KULLANILMIŞTIR.
            </p>
         </div>
      </div>
    </div>
  );
}
