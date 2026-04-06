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
    setDict(prev => ({ ...prev, [name]: { ...prev[name], [field]: val } }));
  };

  return (
    <div className="calc-input-group" style={{ marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
        <label className="calc-label" style={{ marginBottom: 0 }}>{label} ({maxQ})</label>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-primary)" }}>{net.toFixed(2)} Net</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <input type="number" value={dict[name].c} onChange={e => handleChange("c", e.target.value)} className="calc-input" style={{ borderColor: "#22c55e", color: "#22c55e", textAlign: "center" }} placeholder="D" min="0" max={maxQ} />
        <input type="number" value={dict[name].w} onChange={e => handleChange("w", e.target.value)} className="calc-input" style={{ borderColor: "#ef4444", color: "#ef4444", textAlign: "center" }} placeholder="Y" min="0" max={maxQ} />
      </div>
    </div>
  );
}

export function YksCalculator() {
  const [activeTab, setActiveTab] = useState<"TYT" | "AYT" | "YDT" | "SONUC">("TYT");

  const [tyt, setTyt] = useState<Record<string, ScoreCategory>>({
    turkce: { c: "30", w: "5" },
    sosyal: { c: "15", w: "3" },
    mat: { c: "20", w: "2" },
    fen: { c: "12", w: "4" },
  });

  const [ayt, setAyt] = useState<Record<string, ScoreCategory>>({
    mat: { c: "25", w: "2" },
    fizik: { c: "10", w: "2" },
    kimya: { c: "8", w: "1" },
    biyo: { c: "10", w: "1" },
    edebiyat: { c: "18", w: "3" },
    tarih1: { c: "7", w: "1" },
    cog1: { c: "5", w: "1" },
    tarih2: { c: "6", w: "2" },
    cog2: { c: "5", w: "1" },
    felsefe: { c: "8", w: "1" },
    din: { c: "5", w: "0" },
  });

  const [ydt, setYdt] = useState<ScoreCategory>({ c: "60", w: "5" });
  const [diploma, setDiploma] = useState("85");
  
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
    
    setResults({
      tytNet, obp,
      tytPuan: Math.min(500, tytHamPuan),
      sayPuan: Math.min(500, basePuan + tytEffect + (aMat * 3.0) + (aFizik * 2.85) + (aKimya * 3.07) + (aBiyo * 3.07)),
      eaPuan: Math.min(500, basePuan + tytEffect + (aMat * 3.0) + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33)),
      sozPuan: Math.min(500, basePuan + tytEffect + (aEdebiyat * 3.0) + (aTarih1 * 2.8) + (aCog1 * 3.33) + (aTarih2 * 2.91) + (aCog2 * 2.91) + (aFelsefe * 3.0) + (aDin * 3.33)),
      dilPuan: Math.min(500, basePuan + tytEffect + (dilNetValue * 3.0)),
    });
  };

  const calculateAndShowTab = () => { calculate(); setActiveTab("SONUC"); };

  const reset = () => {
    setTyt({ turkce: { c: "30", w: "5" }, sosyal: { c: "15", w: "3" }, mat: { c: "20", w: "2" }, fen: { c: "12", w: "4" } });
    setAyt({ mat: { c: "25", w: "2" }, fizik: { c: "10", w: "2" }, kimya: { c: "8", w: "1" }, biyo: { c: "10", w: "1" }, edebiyat: { c: "18", w: "3" }, tarih1: { c: "7", w: "1" }, cog1: { c: "5", w: "1" }, tarih2: { c: "6", w: "2" }, cog2: { c: "5", w: "1" }, felsefe: { c: "8", w: "1" }, din: { c: "5", w: "0" } });
    setYdt({ c: "60", w: "5" });
    setDiploma("85");
    setResults(null);
    setActiveTab("TYT");
  };

  useEffect(() => { calculate(); }, [tyt, ayt, ydt, diploma]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group" style={{ marginBottom: "1rem" }}>
        <label className="calc-label">Diploma Notu (OBP) - Sıralamaya Katkısı: +{(Math.min(100, parseFloat(diploma) || 50) * 0.6).toFixed(1)} Puan</label>
        <input type="number" value={diploma} onChange={e => setDiploma(e.target.value)} className="calc-input" placeholder="85" min="50" max="100" />
      </div>

      <div className="calc-toggle-group" style={{ marginBottom: "1rem" }}>
        {["TYT", "AYT", "YDT", "SONUC"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`calc-toggle-btn ${activeTab === tab ? "active" : ""}`}>
            {tab === "SONUC" ? "📊 ANALİZ" : tab}
          </button>
        ))}
      </div>

      {activeTab === "TYT" && (
        <div className="calc-grid-2">
          <InputRow label="Türkçe" maxQ={40} name="turkce" dict={tyt} setDict={setTyt} />
          <InputRow label="Temel Mat." maxQ={40} name="mat" dict={tyt} setDict={setTyt} />
          <InputRow label="Sosyal Bilimler" maxQ={20} name="sosyal" dict={tyt} setDict={setTyt} />
          <InputRow label="Fen Bilimleri" maxQ={20} name="fen" dict={tyt} setDict={setTyt} />
        </div>
      )}

      {activeTab === "AYT" && (
        <div className="calc-grid-2">
          <div>
            <div className="calc-section-title">Sayısal & EA Ortak</div>
            <InputRow label="AYT Matematik" maxQ={40} name="mat" dict={ayt} setDict={setAyt} />
            <div className="calc-section-title" style={{ marginTop: "1rem" }}>Fen Bilimleri (SAY)</div>
            <InputRow label="Fizik" maxQ={14} name="fizik" dict={ayt} setDict={setAyt} />
            <InputRow label="Kimya" maxQ={13} name="kimya" dict={ayt} setDict={setAyt} />
            <InputRow label="Biyoloji" maxQ={13} name="biyo" dict={ayt} setDict={setAyt} />
          </div>
          <div>
            <div className="calc-section-title">Edebiyat & Sosyal-1 (EA)</div>
            <InputRow label="T. Dili ve Ed." maxQ={24} name="edebiyat" dict={ayt} setDict={setAyt} />
            <InputRow label="Tarih - 1" maxQ={10} name="tarih1" dict={ayt} setDict={setAyt} />
            <InputRow label="Coğrafya - 1" maxQ={6} name="cog1" dict={ayt} setDict={setAyt} />
            <div className="calc-section-title" style={{ marginTop: "1rem" }}>Sosyal Bilimler-2 (SÖZ)</div>
            <InputRow label="Tarih - 2" maxQ={11} name="tarih2" dict={ayt} setDict={setAyt} />
            <InputRow label="Coğrafya - 2" maxQ={11} name="cog2" dict={ayt} setDict={setAyt} />
            <InputRow label="Felsefe Grubu" maxQ={12} name="felsefe" dict={ayt} setDict={setAyt} />
            <InputRow label="Din / Ek" maxQ={6} name="din" dict={ayt} setDict={setAyt} />
          </div>
        </div>
      )}

      {activeTab === "YDT" && (
        <div className="calc-grid-1">
          <InputRow label="Yabancı Dil (İng, Alm...)" maxQ={80} name="ydt" dict={{ydt}} setDict={(val: any) => setYdt(val.ydt)} />
        </div>
      )}

      {activeTab === "SONUC" && results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📈 YKS Sınav Puanı Projeksiyonu (Yerleştirme)</div>
          <div className="calc-result-body">
            <div className="calc-result-cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <div className="calc-result-card" style={{ borderTop: "4px solid #3b82f6" }}>
                <div className="calc-result-card-label" style={{ color: "#3b82f6" }}>TYT Yerleştirme</div>
                <div className="calc-result-card-value">{(results.tytPuan + results.obp).toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Ham: {results.tytPuan.toFixed(1)}</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-primary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-primary)" }}>SAYISAL (SAY)</div>
                <div className="calc-result-card-value">{(results.sayPuan + results.obp).toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Ham: {results.sayPuan.toFixed(1)}</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-secondary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-secondary)" }}>EŞİT AĞ. (EA)</div>
                <div className="calc-result-card-value">{(results.eaPuan + results.obp).toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Ham: {results.eaPuan.toFixed(1)}</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid #f59e0b" }}>
                <div className="calc-result-card-label" style={{ color: "#f59e0b" }}>SÖZEL (SÖZ)</div>
                <div className="calc-result-card-value">{(results.sozPuan + results.obp).toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Ham: {results.sozPuan.toFixed(1)}</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid #06b6d4" }}>
                <div className="calc-result-card-label" style={{ color: "#06b6d4" }}>DİL (YDT)</div>
                <div className="calc-result-card-value">{(results.dilPuan + results.obp).toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Ham: {results.dilPuan.toFixed(1)}</div>
              </div>
            </div>
            
            <div className="calc-result-row" style={{ marginTop: "1rem" }}>
              <span className="calc-result-row-label">TYT Toplam Net (Maks 120)</span>
              <span className="calc-result-row-value">{results.tytNet.toFixed(2)} Net</span>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "SONUC" && (
        <div className="calc-action-row" style={{ marginTop: "1rem" }}>
          <button className="calc-btn-calculate" onClick={calculateAndShowTab}>📋 Puanları Gör</button>
          <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
        </div>
      )}

      <div className="calc-info-box" style={{ marginTop: "1rem" }}>
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Hesaplamalar geçmiş yıllara ait standart sapmalar ve ÖSYM "4 yanlış 1 doğru" kuralı baz alınarak yapılmıştır. Gösterilen puanlar yerleştirme için kullanılan OBP eklenmiş Y-puanlarıdır.</span>
      </div>
    </div>
  );
}
