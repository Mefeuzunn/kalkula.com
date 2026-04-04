"use client";

import React, { useState } from "react";

type ScoreCategory = { c: string; w: string };

export function YksCalculator() {
  const [activeTab, setActiveTab] = useState<"TYT" | "AYT" | "YDT" | "SONUC">("TYT");

  // TYT States
  const [tyt, setTyt] = useState<Record<string, ScoreCategory>>({
    turkce: { c: "", w: "" },
    sosyal: { c: "", w: "" },
    mat: { c: "", w: "" },
    fen: { c: "", w: "" },
  });

  // AYT States
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

  // YDT State
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
    // TYT Nets
    const tTurkce = calcNet(tyt.turkce.c, tyt.turkce.w);
    const tSosyal = calcNet(tyt.sosyal.c, tyt.sosyal.w);
    const tMat = calcNet(tyt.mat.c, tyt.mat.w);
    const tFen = calcNet(tyt.fen.c, tyt.fen.w);
    const tytNet = tTurkce + tSosyal + tMat + tFen;

    // AYT Nets
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

    // YDT Net
    const dilNet = calcNet(ydt.c, ydt.w);

    const obp = Math.min(100, parseFloat(diploma) || 50) * 0.6; 
    const basePuan = 100;

    // TYT Puan (Max 500 Ham Puan) -> Y-TYT (Max 560 OBP'li)
    const tytPuan = basePuan + (tTurkce * 3.3) + (tMat * 3.3) + (tSosyal * 3.4) + (tFen * 3.4);

    // AYT Çarpanları (Toplam Max Puan 500 ham = 100 taban + ~160 TYT %40 + ~240 AYT %60)
    // TYT Katkısı = tytPuan * 0.4 (approx) -> YÖK formülü gereği netlerin doğrudan katsayısı vardır.
    const tytKatkisi = (tTurkce * 1.32) + (tMat * 1.32) + (tSosyal * 1.36) + (tFen * 1.36);
    
    // SAY Puan
    const sayPuan = basePuan + tytKatkisi + (aMat * 3) + (aFizik * 2.85) + (aKimya * 3.07) + (aBiyo * 3.07);
    
    // EA Puan
    const eaPuan = basePuan + tytKatkisi + (aMat * 3) + (aEdebiyat * 3) + (aTarih1 * 2.8) + (aCog1 * 3.33);

    // SÖZ Puan
    const sozPuan = basePuan + tytKatkisi + (aEdebiyat * 3) + (aTarih1 * 2.8) + (aCog1 * 3.33) + (aTarih2 * 2.91) + (aCog2 * 2.91) + (aFelsefe * 3) + (aDin * 3.33);

    // DİL Puan
    const dilPuanNet = basePuan + tytKatkisi + (dilNet * 3);

    setResults({
      tytNet,
      obp,
      tytPuan: Math.min(500, tytPuan),
      sayPuan: Math.min(500, sayPuan),
      eaPuan: Math.min(500, eaPuan),
      sozPuan: Math.min(500, sozPuan),
      dilPuan: Math.min(500, dilPuanNet),
    });

    setActiveTab("SONUC");
  };

  const updateState = (setter: React.Dispatch<React.SetStateAction<any>>, stateDict: any, name: string, field: "c" | "w", val: string) => {
    setter({ ...stateDict, [name]: { ...stateDict[name], [field]: val } });
  };

  const InputRow = ({ label, maxQ, name, dict, setDict }: { label: string, maxQ: number, name: string, dict: any, setDict: any }) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)", marginBottom: "0.5rem" }}>
      <div style={{ flex: 1, fontWeight: 500 }}>{label} <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: "0.2rem" }}>({maxQ} Soru)</span></div>
      <input type="number" min="0" max={maxQ} value={dict[name].c} onChange={e => updateState(setDict, dict, name, "c", e.target.value)} className="input-field" placeholder="Doğru" style={{ width: "80px", padding: "0.5rem" }} />
      <input type="number" min="0" max={maxQ} value={dict[name].w} onChange={e => updateState(setDict, dict, name, "w", e.target.value)} className="input-field" placeholder="Yanlış" style={{ width: "80px", padding: "0.5rem" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* OBP Giriş */}
      <div className="panel" style={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h4 style={{ margin: 0 }}>Diploma Notu</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0.25rem 0 0 0" }}>Ortaöğretim Başarı Puanı için gereklidir (50-100 arası)</p>
        </div>
        <input 
          type="number" 
          value={diploma} 
          onChange={e => setDiploma(e.target.value)} 
          className="input-field" 
          style={{ width: "120px" }} 
          placeholder="Örn: 85" 
        />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
        {["TYT", "AYT", "YDT", "SONUC"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.95rem",
              background: activeTab === tab ? "var(--accent-primary)" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${activeTab === tab ? "var(--accent-primary)" : "var(--border)"}`,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {tab === "SONUC" ? "🏆 Sonuçlar" : tab + " Testi"}
          </button>
        ))}
      </div>

      {/* TYT TAB */}
      {activeTab === "TYT" && (
        <div className="panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>TYT - Temel Yeterlilik Testi (120 Soru)</h3>
          <InputRow label="Türkçe" maxQ={40} name="turkce" dict={tyt} setDict={setTyt} />
          <InputRow label="Sosyal Bilimler" maxQ={20} name="sosyal" dict={tyt} setDict={setTyt} />
          <InputRow label="Temel Matematik" maxQ={40} name="mat" dict={tyt} setDict={setTyt} />
          <InputRow label="Fen Bilimleri" maxQ={20} name="fen" dict={tyt} setDict={setTyt} />
        </div>
      )}

      {/* AYT TAB */}
      {activeTab === "AYT" && (
        <div className="panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>AYT - Alan Yeterlilik Testi (160 Soru)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div>
              <h4 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Sayısal / Eşit Ağırlık</h4>
              <InputRow label="Matematik" maxQ={40} name="mat" dict={ayt} setDict={setAyt} />
              
              <h4 style={{ color: "var(--accent-primary)", marginTop: "1.5rem", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Sayısal (Fen Bilimleri)</h4>
              <InputRow label="Fizik" maxQ={14} name="fizik" dict={ayt} setDict={setAyt} />
              <InputRow label="Kimya" maxQ={13} name="kimya" dict={ayt} setDict={setAyt} />
              <InputRow label="Biyoloji" maxQ={13} name="biyo" dict={ayt} setDict={setAyt} />
            </div>
            <div>
              <h4 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Eşit Ağırlık / Sözel (Ed.-Sos. 1)</h4>
              <InputRow label="Türk Edebiyatı" maxQ={24} name="edebiyat" dict={ayt} setDict={setAyt} />
              <InputRow label="Tarih - 1" maxQ={10} name="tarih1" dict={ayt} setDict={setAyt} />
              <InputRow label="Coğrafya - 1" maxQ={6} name="cog1" dict={ayt} setDict={setAyt} />
              
              <h4 style={{ color: "var(--accent-primary)", marginTop: "1.5rem", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Sözel (Sosyal Bilimler 2)</h4>
              <InputRow label="Tarih - 2" maxQ={11} name="tarih2" dict={ayt} setDict={setAyt} />
              <InputRow label="Coğrafya - 2" maxQ={11} name="cog2" dict={ayt} setDict={setAyt} />
              <InputRow label="Felsefe Grubu" maxQ={12} name="felsefe" dict={ayt} setDict={setAyt} />
              <InputRow label="Din Kültürü" maxQ={6} name="din" dict={ayt} setDict={setAyt} />
            </div>
          </div>
        </div>
      )}

      {/* YDT TAB */}
      {activeTab === "YDT" && (
        <div className="panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>YDT - Yabancı Dil Testi (80 Soru)</h3>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ flex: 1, fontWeight: 500 }}>Yabancı Dil Testi</div>
            <input type="number" value={ydt.c} onChange={e => setYdt(prev => ({ ...prev, c: e.target.value }))} className="input-field" placeholder="Doğru" style={{ width: "80px", padding: "0.5rem" }} />
            <input type="number" value={ydt.w} onChange={e => setYdt(prev => ({ ...prev, w: e.target.value }))} className="input-field" placeholder="Yanlış" style={{ width: "80px", padding: "0.5rem" }} />
          </div>
        </div>
      )}

      {/* SONUC TAB */}
      {activeTab === "SONUC" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {results ? (
            <>
              <div className="panel" style={{ padding: "1.5rem", textAlign: "center", background: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                <h3 style={{ marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Eklenecek OBP Puanı</h3>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#22c55e" }}>+{results.obp.toFixed(2)}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Hesaplanan tüm yerleştirme (Y-Puan) türlerine doğrudan eklenecektir.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                <div className="panel" style={{ padding: "1.5rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Temel Yeterlilik (Y-TYT)</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(results.tytPuan + results.obp).toFixed(2)}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Ham Puan: {results.tytPuan.toFixed(2)}</p>
                </div>
                
                <div className="panel" style={{ padding: "1.5rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Sayısal (Y-SAY)</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(results.sayPuan + results.obp).toFixed(2)}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Ham Puan: {results.sayPuan.toFixed(2)}</p>
                </div>

                <div className="panel" style={{ padding: "1.5rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Eşit Ağırlık (Y-EA)</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(results.eaPuan + results.obp).toFixed(2)}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Ham Puan: {results.eaPuan.toFixed(2)}</p>
                </div>

                <div className="panel" style={{ padding: "1.5rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Sözel (Y-SÖZ)</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(results.sozPuan + results.obp).toFixed(2)}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Ham Puan: {results.sozPuan.toFixed(2)}</p>
                </div>

                <div className="panel" style={{ padding: "1.5rem" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Yabancı Dil (Y-DİL)</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(results.dilPuan + results.obp).toFixed(2)}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Ham Puan: {results.dilPuan.toFixed(2)}</p>
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                * Bütün puanlar son eğitim yılı verileri ve standart test katsayılarına göre simüle edilmiştir. Gerçek sonuçlar ÖSYM standart sapma verilerine göre farklılık gösterir.
              </p>
            </>
          ) : (
            <div className="panel" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
              Puanları görmek için bilgilerinizi eksiksiz girip "Hesapla" butonuna basınız.
            </div>
          )}
        </div>
      )}

      {/* Hesapla Butonu Her Tabda Altta Sabit */}
      <div style={{ marginTop: "1.5rem" }}>
        <button 
          className="btn-primary" 
          onClick={calculate} 
          style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
        >
          YKS Yerleştirme Puanlarını (Y-Puan) Profesyonel Hesapla
        </button>
      </div>

    </div>
  );
}
