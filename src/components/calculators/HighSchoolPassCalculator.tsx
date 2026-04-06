"use client";

import React, { useState, useEffect } from "react";

export function HighSchoolPassCalculator() {
  const [literatureGrade, setLiteratureGrade] = useState("48");
  const [generalGPA, setGeneralGPA] = useState("52.5");
  const [failedCoursesCount, setFailedCoursesCount] = useState("2");
  const [result, setResult] = useState<{ status: string; color: string; message: string } | null>(null);

  const calculate = () => {
    const lg = parseFloat(literatureGrade);
    const gpa = parseFloat(generalGPA);
    const failedCount = parseInt(failedCoursesCount);

    if (lg >= 0 && gpa >= 0 && failedCount >= 0) {
      if (gpa >= 50) {
          if (lg < 50) {
              setResult({ status: "Sorumlu Geçtiniz", color: "#f59e0b", message: "Genel ortalamanız 50 ve üzeri olduğu için sınıfı geçtiniz. Ancak baraj ders olan Edebiyat ortalamanız 50'nin altında olduğu için edebiyattan sorumlu geçiyorsunuz. (Sorumluluk sınavına girmeniz gerekir)." });
          } else {
              setResult({ status: "Doğrudan Geçtiniz", color: "#22c55e", message: "Hem genel ortalamanız 50 ve üzeri, hem de baraj ders (Edebiyat) ortalamanız 50 veya üzeri olduğu için sınıfı doğrudan, başarısız dersiniz olsa dahi geçtiniz." });
          }
      } else {
          if (failedCount <= 3) {
             setResult({ status: "Sorumlu Geçtiniz", color: "#f59e0b", message: "Genel ortalamanız 50'nin altında olmasına rağmen en fazla 3 zayıfınız olduğu için sınıfı bu derslerden sorumlu olarak geçtiniz." });
          } else {
             setResult({ status: "Sınıf Tekrarı (Kaldınız)", color: "#ef4444", message: "Genel ortalamanız 50'nin altında ve 3'ten fazla başarısız dersiniz olduğu için maalesef sınıf tekrarına kaldınız." });
          }
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => { setLiteratureGrade("48"); setGeneralGPA("52.5"); setFailedCoursesCount("2"); setResult(null); };

  useEffect(() => { calculate(); }, [literatureGrade, generalGPA, failedCoursesCount]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group" style={{ marginBottom: "0.5rem" }}>
        <label className="calc-label">Genel Not Ortalamanız (Tüm Derslerin Ağırlıklı Ortalaması)</label>
        <input type="number" value={generalGPA} onChange={e => setGeneralGPA(e.target.value)} className="calc-input" placeholder="52.5" min="0" max="100" />
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Türk Dili ve Ed. (Baraj)</label>
          <input type="number" value={literatureGrade} onChange={e => setLiteratureGrade(e.target.value)} className="calc-input" placeholder="48" min="0" max="100" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Başarısız Ders Sayısı</label>
          <input type="number" value={failedCoursesCount} onChange={e => setFailedCoursesCount(e.target.value)} className="calc-input" placeholder="2" min="0" max="20" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🎓 Durumu Sorgula</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header" style={{ color: result.color }}>🎓 MEB Sınıf Geçme Kararı</div>
          <div className="calc-result-body">
            <div className="calc-result-hero" style={{ background: `linear-gradient(135deg, ${result.color}22, transparent)`, marginBottom: "1rem" }}>
              <div className="calc-result-hero-label">Geçme Durumunuz</div>
              <div className="calc-result-hero-value" style={{ color: result.color, fontSize: "2.5rem" }}>{result.status}</div>
            </div>
            
            <div style={{ background: "var(--surface)", border: `1px solid ${result.color}44`, padding: "1.5rem", borderRadius: "12px", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)" }}>
              {result.message}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">2025-2026 eğitim-öğretim yılı güncel yönetmeliğine göre baraj ders (Türk Dili ve Edebiyatı) kuralı çok önemlidir. Ortalamanız 50'yi geçse dahi baraj dersten kaldığınız zaman sorumlu olarak geçersiniz.</span>
      </div>
    </div>
  );
}
