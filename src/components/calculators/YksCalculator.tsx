"use client";

import React, { useState, useEffect } from "react";
import { Award, LayoutDashboard, TrendingUp, CheckCircle2, RotateCcw, Calculator, FileText, Share2 } from "lucide-react";
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
    setDict(prev => {
        const nextDict = { ...prev };
        const nextVal = { ...prev[name], [field]: val };
        const nc = parseFloat(nextVal.c) || 0;
        const nw = parseFloat(nextVal.w) || 0;
        
        if (nc + nw > maxQ) return prev;
        
        nextDict[name] = nextVal;
        return nextDict;
    });
  };

  return (
    <div className="calc-input-group">
      <div className="flex justify-between items-center mb-1">
        <label className="calc-label">{label} <span className="opacity-40">({maxQ})</span></label>
        <span className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full">{net.toFixed(2)} Net</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="calc-input-wrapper">
          <input 
            type="number" 
            value={dict[name].c} 
            onChange={e => handleChange("c", e.target.value)} 
            className="calc-input" 
            placeholder="D" 
            min="0" 
            max={maxQ} 
          />
          <span className="calc-unit" style={{ color: '#22c55e', opacity: 0.8 }}>D</span>
        </div>
        <div className="calc-input-wrapper">
          <input 
            type="number" 
            value={dict[name].w} 
            onChange={e => handleChange("w", e.target.value)} 
            className="calc-input" 
            placeholder="Y" 
            min="0" 
            max={maxQ} 
          />
          <span className="calc-unit" style={{ color: '#ef4444', opacity: 0.8 }}>Y</span>
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

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#22c55e', '#8b5cf6']
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
      <div className="calc-section">
        <div className="calc-section-title flex items-center gap-2">
          <Award className="w-4 h-4" /> Ortaöğretim Başarı Puanı
        </div>
        <div className="calc-input-group">
            <label className="calc-label">Diploma Notu (50-100)</label>
            <div className="calc-input-wrapper">
              <input type="number" value={diploma} onChange={e => setDiploma(e.target.value)} className="calc-input" placeholder="85" min="50" max="100" />
              <span className="calc-unit">OBP</span>
            </div>
        </div>
      </div>

      <div className="calc-toggle-group">
        {[
          { id: "TYT", label: "TYT", icon: <FileText className="w-4 h-4" /> },
          { id: "AYT", label: "AYT", icon: <TrendingUp className="w-4 h-4" /> },
          { id: "YDT", label: "YDT", icon: <Calculator className="w-4 h-4" /> },
          { id: "SONUC", label: "ANALİZ", icon: <LayoutDashboard className="w-4 h-4" /> }
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`calc-toggle-btn ${activeTab === tab.id ? "active" : ""}`}>
            <span className="flex items-center gap-2">{tab.icon} {tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "TYT" && (
        <div className="calc-section animate-slide-up">
           <div className="calc-section-title">Temel Yeterlilik Testi Soruları</div>
           <div className="calc-grid-2">
            <InputRow label="Türkçe" maxQ={40} name="turkce" dict={tyt} setDict={setTyt} />
            <InputRow label="Temel Matematik" maxQ={40} name="mat" dict={tyt} setDict={setTyt} />
            <InputRow label="Sosyal Bilimler" maxQ={20} name="sosyal" dict={tyt} setDict={setTyt} />
            <InputRow label="Fen Bilimleri" maxQ={20} name="fen" dict={tyt} setDict={setTyt} />
          </div>
        </div>
      )}

      {activeTab === "AYT" && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <div className="calc-section">
            <div className="calc-section-title">Matematik & Fen Bilimleri (SAY)</div>
            <div className="calc-grid-2">
              <InputRow label="AYT Matematik" maxQ={40} name="mat" dict={ayt} setDict={setAyt} />
              <InputRow label="Fizik" maxQ={14} name="fizik" dict={ayt} setDict={setAyt} />
              <InputRow label="Kimya" maxQ={13} name="kimya" dict={ayt} setDict={setAyt} />
              <InputRow label="Biyoloji" maxQ={13} name="biyo" dict={ayt} setDict={setAyt} />
            </div>
          </div>
          <div className="calc-section">
            <div className="calc-section-title">Edebiyat & Sosyal Bilimler (EA/SÖZ)</div>
            <div className="calc-grid-2">
              <InputRow label="Türk Dili Ed." maxQ={24} name="edebiyat" dict={ayt} setDict={setAyt} />
              <InputRow label="Tarih - 1" maxQ={10} name="tarih1" dict={ayt} setDict={setAyt} />
              <InputRow label="Coğrafya - 1" maxQ={6} name="cog1" dict={ayt} setDict={setAyt} />
              <InputRow label="Tarih - 2" maxQ={11} name="tarih2" dict={ayt} setDict={setAyt} />
              <InputRow label="Coğrafya - 2" maxQ={11} name="cog2" dict={ayt} setDict={setAyt} />
              <InputRow label="Felsefe Grubu" maxQ={12} name="felsefe" dict={ayt} setDict={setAyt} />
              <InputRow label="Din Kültürü" maxQ={6} name="din" dict={ayt} setDict={setAyt} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "YDT" && (
        <div className="calc-section animate-slide-up" style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <div className="calc-section-title">Yabancı Dil Testi</div>
          <InputRow label="İngilizce/Almanca/Fransızca" maxQ={80} name="ydt" dict={{ydt}} setDict={(val: any) => setYdt(val.ydt)} />
        </div>
      )}

      {activeTab === "SONUC" && results && (
        <div className="calc-result-panel animate-result">
          <div className="calc-result-header flex justify-between items-center">
            <span>YKS 2026 ÜSTÜN BAŞARI ANALİZİ</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">HEDEF ÜNİVERSİTE İÇİN ANALİZ</div>
              <div className="calc-result-hero-value">{(results.sayPuan + results.obp).toFixed(3)}</div>
              <div className="calc-result-hero-sub">Sayısal (Y-SAY) Güncel Puanınız</div>
              
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OBP DAHİL
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> 2026 PROJEKSİYONU
                </div>
              </div>
            </div>

            <div className="calc-table-wrapper mb-6">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>PUAN TÜRÜ</th>
                    <th>HAM PUAN</th>
                    <th>YERLEŞTİRME (Y-PUAN)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TYT</td>
                    <td>{results.tytPuan.toFixed(3)}</td>
                    <td className="font-bold text-blue-500">{(results.tytPuan + results.obp).toFixed(3)}</td>
                  </tr>
                  <tr>
                    <td>SAYISAL (SAY)</td>
                    <td>{results.sayPuan.toFixed(3)}</td>
                    <td className="font-bold text-green-500">{(results.sayPuan + results.obp).toFixed(3)}</td>
                  </tr>
                  <tr>
                    <td>EŞİT AĞIRLIK (EA)</td>
                    <td>{results.eaPuan.toFixed(3)}</td>
                    <td className="font-bold text-purple-500">{(results.eaPuan + results.obp).toFixed(3)}</td>
                  </tr>
                  <tr>
                    <td>SÖZEL (SÖZ)</td>
                    <td>{results.sozPuan.toFixed(3)}</td>
                    <td className="font-bold text-red-500">{(results.sozPuan + results.obp).toFixed(3)}</td>
                  </tr>
                  <tr>
                    <td>DİL (YDT)</td>
                    <td>{results.dilPuan.toFixed(3)}</td>
                    <td className="font-bold text-cyan-500">{(results.dilPuan + results.obp).toFixed(3)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="calc-grid-3">
              <div className="calc-result-card">
                <div className="calc-result-card-label">TYT NET</div>
                <div className="calc-result-card-value text-blue-500">{results.tytNet.toFixed(2)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">OBP KATKISI</div>
                <div className="calc-result-card-value text-green-500">+{results.obp.toFixed(1)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">SINAV YILI</div>
                <div className="calc-result-card-value">2026</div>
              </div>
            </div>

            <div className="calc-info-box mt-6">
              <div className="calc-info-box-icon text-blue-500">💡</div>
              <p className="calc-info-box-text">
                Bu hesaplama 2026 ÖSYM verileri ve katsayıları baz alınarak yapılmıştır. Yerleştirme puanınız hesaplanırken diploma notunuz (OBP) 0.6 katsayısı ile çarpılarak eklenmiştir.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="calc-action-row animate-fade-in">
        <button className="calc-btn-reset" onClick={reset}>
          <RotateCcw className="w-4 h-4" /> Sıfırla
        </button>
        {activeTab !== "SONUC" && (
          <button className="calc-btn-calculate" onClick={() => { calculate(); setActiveTab("SONUC"); }}>
            <Calculator className="w-4 h-4" /> Hesapla ve Analiz Et
          </button>
        )}
      </div>
    </div>
  );
}

