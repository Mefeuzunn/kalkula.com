"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function SleepCyclePremium() {
  const [mode, setMode] = useState<"wakeup" | "sleepnow">("wakeup");
  const [time, setTime] = useState("07:00");
  
  const [results, setResults] = useState<{
    time: string;
    cycles: number;
    hours: string;
    score: string;
    color: string;
  }[]>([]);

  const calculate = () => {
    const sleepCycles = [6, 5, 4, 3];
    const offset = 14;
    const newResults: any[] = [];

    if (mode === "wakeup") {
      const [h, m] = time.split(":").map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(h, m, 0);

      sleepCycles.forEach(cycle => {
        const sleepDate = new Date(wakeDate.getTime() - (cycle * 90 * 60000) - (offset * 60000));
        newResults.push({
          time: sleepDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          cycles: cycle,
          hours: `${(cycle * 1.5).toFixed(1)} Saat`,
          score: cycle >= 5 ? "Mükemmel" : cycle === 4 ? "İyi" : "Kısa",
          color: cycle === 6 ? "#8b5cf6" : cycle === 5 ? "#a855f7" : cycle === 4 ? "#c084fc" : "#d8b4fe"
        });
      });
    } else {
      const now = new Date();
      sleepCycles.forEach(cycle => {
        const wakeDate = new Date(now.getTime() + (cycle * 90 * 60000) + (offset * 60000));
        newResults.push({
          time: wakeDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          cycles: cycle,
          hours: `${(cycle * 1.5).toFixed(1)} Saat`,
          score: cycle >= 5 ? "Mükemmel" : cycle === 4 ? "İyi" : "Kısa",
          color: cycle === 6 ? "#8b5cf6" : cycle === 5 ? "#a855f7" : cycle === 4 ? "#c084fc" : "#d8b4fe"
        });
      });
    }

    setResults(newResults);
    if (newResults.length > 0) {
      confetti({ particleCount: 15, spread: 30, origin: { y: 0.7 }, colors: ["#8b5cf6", "#ffffff"] });
    }
  };

  const reset = () => {
    setMode("wakeup");
    setTime("07:00");
  };

  useEffect(() => { calculate(); }, [mode, time]);

  return (
    <div className="calc-wrapper">
      <div className="calc-toggle-group">
        <button className={`calc-toggle-btn ${mode === "wakeup" ? "active" : ""}`} onClick={() => setMode("wakeup")}>⏰ UYANMA SAATİ</button>
        <button className={`calc-toggle-btn ${mode === "sleepnow" ? "active" : ""}`} onClick={() => setMode("sleepnow")}>🛌 ŞİMDİ UYURSAM</button>
      </div>

      {mode === "wakeup" && (
        <div className="calc-input-group">
          <label className="calc-label">Sabah Kaçta Uyanmak İstiyorsunuz?</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="calc-input" style={{ fontSize: "1.5rem", textAlign: "center" }} />
        </div>
      )}

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🌙 Uyku Zamanımı Planla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results.length > 0 && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🛌 İdeal Uyku Zaman Çizelgesi</div>
          <div className="calc-result-body">
            <div className="mb-6 text-center">
               <p className="text-sm text-muted">{mode === "wakeup" ? 'Zinde uyanmak için şu saatlerde uyumalısınız:' : 'Şimdi uyursanız şu saatlerde uyanmalısınız:'}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {results.map((res, i) => (
                <div key={i} className="calc-result-row" style={{ padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: res.color + "22", color: res.color, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: "bold" }}>{res.time}</div>
                      <div>
                        <div className="font-bold text-sm">{res.hours} Uyku</div>
                        <div className="text-xs text-muted">{res.cycles} Döngü</div>
                      </div>
                   </div>
                   <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase" style={{ background: res.color + "15", color: res.color, border: `1px solid ${res.color}33` }}>
                     {res.score}
                   </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🌙</span>
        <span className="calc-info-box-text">İdeal bir uyku döngüsü 90 dakikadır. Sağlıklı bir yetişkinin her gece 5-6 döngü uyuması önerilir. Ortalama uykuya dalma süresi olan 14 dakika sonuçlara eklenmiştir.</span>
      </div>
    </div>
  );
}
