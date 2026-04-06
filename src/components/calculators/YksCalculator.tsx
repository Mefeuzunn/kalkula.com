"use client";

import React, { useState, useEffect } from "react";

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
    setDict(prev => {
        const nextDict = { ...prev };
        const nextVal = { ...prev[name], [field]: val };
        const nc = parseFloat(nextVal.c) || 0;
        const nw = parseFloat(nextVal.w) || 0;
        
        // Strict Validation: D + Y <= Soru Sayısı
        if (nc + nw > maxQ) return prev;
        
        nextDict[name] = nextVal;
        return nextDict;
    });
  };

  return (
    <div className="calc-input-group" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
        <label className="calc-label" style={{ marginBottom: 0 }}>{label} <span style={{opacity: 0.6}}>({maxQ})</span></label>
        <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--accent-primary)" }}>{net.toFixed(2)} Net</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input type="number" value={dict[name].c} onChange={e => handleChange("c", e.target.value)} className="calc-input" 
            style={{ borderRadius: '12px', textAlign: 'center', background: 'rgba(34, 197, 94, 0.03)', borderColor: dict[name].c ? '#22c55e' : 'var(--border)' }} 
            placeholder="D" min="0" max={maxQ} />
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#22c55e', textAlign: 'center' }}>DOĞRU</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input type="number" value={dict[name].w} onChange={e => handleChange("w", e.target.value)} className="calc-input" 
            style={{ borderRadius: '12px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.03)', borderColor: dict[name].w ? '#ef4444' : 'var(--border)' }} 
            placeholder="Y" min="0" max={maxQ} />
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#ef4444', textAlign: 'center' }}>YANLIŞ</span>
        </div>
      </div>
    </div>
  );
}

export function YksCalculator() {
  const [activeTab, setActiveTab] = useState<"TYT" | "AYT" | "YDT" | "SONUC">("TYT");

  const [tyt, setTyt] = useState<Record<string, ScoreCategory>>({
    turkce: { c: "", w: "" }, sosyal: { c: "", w: "" }, mat: { c: "", w: "" }, fen: { c: "", w: "" },
  });

  const [ayt, setAyt] = useState<Record<string, ScoreCategory>>({
    mat: { c: "", w: "" }, fizik: { c: "", w: "" }, kimya: { c: "", w: "" }, biyo: { c: "", w: "" },
    edebiyat: { c: "", w: "" }, tarih1: { c: "", w: "" }, cog1: { c: "", w: "" },
    tarih2: { c: "", w: "" }, cog2: { c: "", w: "" }, felsefe: { c: "", w: "" }, din: { c: "", w: "" },
  });

  const [ydt, setYdt] = useState<ScoreCategory>({ c: "", w: "" });
  const [diploma, setDiploma] = useState("");
  
  const [results, setResults] = useState<{
    tytNet: number; tytPuan: number; sayPuan: number; eaPuan: number; sozPuan: number; dilPuan: number; obp: number;
  } | null>(null);

  const calculate = () => {
    const calcNet = (cStr: string, wStr: string) => Math.max(0, (parseFloat(cStr) || 0) - ((parseFloat(wStr) || 0) / 4));

    const tytNet = calcNet(tyt.turkce.c, tyt.turkce.w) + calcNet(tyt.sosyal.c, tyt.sosyal.w) + calcNet(tyt.mat.c, tyt.mat.w) + calcNet(tyt.fen.c, tyt.fen.w);

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

    const tytHamPuan = basePuan + (calcNet(tyt.turkce.c, tyt.turkce.w) * 3.3) + (calcNet(tyt.mat.c, tyt.mat.w) * 3.3) + (calcNet(tyt.sosyal.c, tyt.sosyal.w) * 3.4) + (calcNet(tyt.fen.c, tyt.fen.w) * 3.4);
    const tytEffect = (calcNet(tyt.turkce.c, tyt.turkce.w) * 1.32) + (calcNet(tyt.mat.c, tyt.mat.w) * 1.32) + (calcNet(tyt.sosyal.c, tyt.sosyal.w) * 1.36) + (calcNet(tyt.fen.c, tyt.fen.w) * 1.36);
    
    const say = Math.min(500, basePuan + tytEffect + (aMat * 3.0) + (aFizik * 2.85) + (aKimya * 3.07) + (aBiyo * 3.07));
    const ea = Math.min(500, basePuan + tytEffect + (aMat * 3.0) + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33));
    const soz = Math.min(500, basePuan + tytEffect + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33) + (aTarih2 * 2.91) + (aCog2 * 2.91) + (aFelsefe * 3.0) + (aDin * 3.33));
    const dil = Math.min(500, basePuan + tytEffect + (dilNetValue * 3.0));

    setResults({
      tytNet, obp,
      tytPuan: tytHamPuan, sayPuan: say, eaPuan: ea, sozPuan: soz, dilPuan: dil,
    });
  };

  const reset = () => {
    setTyt({ turkce: { c: "", w: "" }, sosyal: { c: "", w: "" }, mat: { c: "", w: "" }, fen: { c: "", w: "" } });
    setAyt({ mat: { c: "", w: "" }, fizik: { c: "", w: "" }, kimya: { c: "", w: "" }, biyo: { c: "", w: "" }, edebiyat: { c: "", w: "" }, tarih1: { c: "", w: "" }, cog1: { c: "", w: "" }, tarih2: { c: "", w: "" }, cog2: { c: "", w: "" }, felsefe: { c: "", w: "" }, din: { c: "", w: "" } });
    setYdt({ c: "", w: "" });
    setDiploma("");
    setResults(null);
    setActiveTab("TYT");
  };

  useEffect(() => {
    if (Object.values(tyt).some(s => s.c !== "" || s.w !== "")) {
      calculate();
    }
  }, [tyt, ayt, ydt, diploma]);

  return (
    <div className="calc-wrapper animate-fade-in">
      <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <div className="calc-input-group">
            <label className="calc-label">Diploma Notu (OBP)</label>
            <input type="number" value={diploma} onChange={e => setDiploma(e.target.value)} className="calc-input" placeholder="85" min="50" max="100" style={{ borderRadius: '16px' }} />
        </div>
      </div>

      <div className="calc-toggle-group" style={{ marginBottom: "1.5rem", padding: '8px', borderRadius: '20px' }}>
        {["TYT", "AYT", "YDT", "SONUC"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`calc-toggle-btn ${activeTab === tab ? "active" : ""}`} style={{ borderRadius: '12px' }}>
            {tab === "SONUC" ? "📋 SONUÇ ANALİZİ" : tab}
          </button>
        ))}
      </div>

      {activeTab === "TYT" && (
        <div className="calc-grid-2">
          <InputRow label="Türkçe" maxQ={40} name="turkce" dict={tyt} setDict={setTyt} />
          <InputRow label="Temel Matematik" maxQ={40} name="mat" dict={tyt} setDict={setTyt} />
          <InputRow label="Sosyal Bilimler" maxQ={20} name="sosyal" dict={tyt} setDict={setTyt} />
          <InputRow label="Fen Bilimleri" maxQ={20} name="fen" dict={tyt} setDict={setTyt} />
        </div>
      )}

      {activeTab === "AYT" && (
        <div className="calc-grid-2">
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '20px' }}>
            <div className="calc-section-title">Sayısal & EA</div>
            <InputRow label="AYT Matematik" maxQ={40} name="mat" dict={ayt} setDict={setAyt} />
            <div className="calc-section-title" style={{ marginTop: "1.5rem" }}>Fen Bilimleri (SAY)</div>
            <InputRow label="Fizik" maxQ={14} name="fizik" dict={ayt} setDict={setAyt} />
            <InputRow label="Kimya" maxQ={13} name="kimya" dict={ayt} setDict={setAyt} />
            <InputRow label="Biyoloji" maxQ={13} name="biyo" dict={ayt} setDict={setAyt} />
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '20px' }}>
            <div className="calc-section-title">Edebiyat & Sosyal (EA/SÖZ)</div>
            <InputRow label="Türk Dili Ed." maxQ={24} name="edebiyat" dict={ayt} setDict={setAyt} />
            <InputRow label="Tarih - 1" maxQ={10} name="tarih1" dict={ayt} setDict={setAyt} />
            <InputRow label="Coğrafya - 1" maxQ={6} name="cog1" dict={ayt} setDict={setAyt} />
            <div className="calc-section-title" style={{ marginTop: "1.5rem" }}>Sözel Bölüm-2</div>
            <InputRow label="Tarih-2" maxQ={11} name="tarih2" dict={ayt} setDict={setAyt} />
            <InputRow label="Felsefe Grubu" maxQ={12} name="felsefe" dict={ayt} setDict={setAyt} />
          </div>
        </div>
      )}

      {activeTab === "YDT" && (
        <div className="calc-grid-1" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <InputRow label="Yabancı Dil Sınavı" maxQ={80} name="ydt" dict={{ydt}} setDict={(val: any) => setYdt(val.ydt)} />
        </div>
      )}

      {activeTab === "SONUC" && results && (
        <div className="result-container-premium">
          <div className="result-card-premium" style={{ textAlign: 'left', padding: '2.5rem' }}>
            <div className="result-badge" style={{ marginBottom: '2rem' }}>2026 YKS YERLEŞTİRME PUANLARI (Y-PUAN)</div>
            
            <div className="calc-result-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { label: "TYT YERLEŞTİRME", score: results.tytPuan + results.obp, color: "#3b82f6" },
                { label: "SAYISAL (SAY)", score: results.sayPuan + results.obp, color: "#22c55e" },
                { label: "EŞİT AĞIRLIK (EA)", score: results.eaPuan + results.obp, color: "#8b5cf6" },
                { label: "SÖZEL (SÖZ)", score: results.sozPuan + results.obp, color: "#ef4444" },
                { label: "DİL (YDT)", score: results.dilPuan + results.obp, color: "#06b6d4" }
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '24px', borderLeft: `6px solid ${item.color}` }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{item.label}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>{item.score.toFixed(3)} <span style={{fontSize: '0.8rem', opacity: 0.5}}>Puan</span></div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
               <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-light)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>TYT TOPLAM NET</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{results.tytNet.toFixed(2)}</div>
               </div>
               <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-light)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>OBP KATKISI</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>+{results.obp.toFixed(1)}</div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-action-row" style={{ marginTop: "1.5rem" }}>
        <button className="calc-btn-reset" onClick={reset} style={{ flex: 0.3 }}>Sıfırla</button>
        {activeTab !== "SONUC" && <button className="calc-btn-calculate" onClick={() => { calculate(); setActiveTab("SONUC"); }} style={{ flex: 1 }}>Hesapla</button>}
      </div>
    </div>
  );
}
