"use client";

import React, { useState } from "react";

export function HighSchoolPassCalculator() {
  const [literatureGrade, setLiteratureGrade] = useState("");
  const [generalGPA, setGeneralGPA] = useState("");
  const [failedCoursesCount, setFailedCoursesCount] = useState("0");
  const [result, setResult] = useState<{ status: string; color: string; message: string } | null>(null);

  const calculate = () => {
    const lg = parseFloat(literatureGrade);
    const gpa = parseFloat(generalGPA);
    const failedCount = parseInt(failedCoursesCount);

    if (lg >= 0 && gpa >= 0 && failedCount >= 0) {
      // MEB Lise sinif gecme temel kurallari (Ozeti)
      // Baraj ders genelde Türk Dili ve Edebiyati'dir.
      
      if (gpa >= 50) {
          if (lg < 50) {
              setResult({
                 status: "Sorumlu Geçtiniz",
                 color: "#eab308",
                 message: "Genel ortalamanız 50 ve üzeri olduğu için sınıfı geçtiniz. Ancak baraj ders olan Edebiyat ortalamanız 50'nin altında olduğu için edebiyattan sorumlu geçiyorsunuz. (Sorumluluk sınavına girmeniz gerekir)."
              });
          } else {
              setResult({
                 status: "Doğrudan Geçtiniz",
                 color: "#22c55e",
                 message: "Hem genel ortalamanız 50 ve üzeri, hem de baraj ders (Edebiyat) ortalamanız 50 veya üzeri olduğu için sınıfı doğrudan, başarısız dersiniz olsa dahi geçtiniz."
              });
          }
      } else {
          // Ortalamasi 50'nin altinda
          if (failedCount <= 3) {
             setResult({
                 status: "Sorumlu Geçtiniz",
                 color: "#eab308",
                 message: "Genel ortalamanız 50'nin altında olmasına rağmen en fazla 3 zayıfınız olduğu için sınıfı bu derslerden sorumlu olarak geçtiniz."
             });
          } else {
             setResult({
                 status: "Sınıf Tekrarı (Kaldınız)",
                 color: "#ef4444",
                 message: "Genel ortalamanız 50'nin altında ve 3'ten fazla başarısız dersiniz olduğu için maalesef sınıf tekrarına kaldınız."
             });
          }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>MEB yönetmeliğine göre genel not ortalamanız ve Türk Dili Edebiyatı notunuza bakarak sınıfı geçip geçmediğinizi tespit edin.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Genel Not Ortalamanız (Tüm Derslerin Ağırlıklı Ortalaması)</label>
        <input type="number" value={generalGPA} onChange={e => setGeneralGPA(e.target.value)} className="input-field" placeholder="Örn: 52.5" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Türk Dili ve Edebiyatı (Baraj) Yıl Sonu Notu</label>
        <input type="number" value={literatureGrade} onChange={e => setLiteratureGrade(e.target.value)} className="input-field" placeholder="Örn: 48" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Başarısız (50'nin altında olan) Ders Sayısı</label>
        <input type="number" value={failedCoursesCount} onChange={e => setFailedCoursesCount(e.target.value)} className="input-field" placeholder="Örn: 2" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Sınıf Geçme Durumunu Sorgula</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.color}` }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Geçme Durumunuz:</h3>
           <div style={{ fontSize: "2rem", fontWeight: "bold", color: result.color }}>
              {result.status}
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
              {result.message}
           </p>
        </div>
      )}
    </div>
  );
}
