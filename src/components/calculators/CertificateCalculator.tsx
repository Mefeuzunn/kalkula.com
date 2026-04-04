"use client";

import React, { useState } from "react";

type CourseRow = { id: number; name: string; grade: string; hours: string };

export function CertificateCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, name: "Matematik", grade: "", hours: "6" },
    { id: 2, name: "Edebiyat", grade: "", hours: "5" },
    { id: 3, name: "Fizik", grade: "", hours: "4" }
  ]);
  const [unexcusedAbsent, setUnexcusedAbsent] = useState("0");
  const [result, setResult] = useState<{ gpa: number; cert: string; message: string; color: string } | null>(null);

  const calculate = () => {
    let totalScore = 0;
    let totalHours = 0;
    let hasFailedCourse = false;

    courses.forEach(c => {
      const g = parseFloat(c.grade);
      const h = parseFloat(c.hours);

      if (!isNaN(g) && !isNaN(h) && h > 0) {
        totalScore += g * h;
        totalHours += h;
        if (g < 50) hasFailedCourse = true;
      }
    });

    const absent = parseFloat(unexcusedAbsent) || 0;

    if (totalHours > 0) {
      const gpa = totalScore / totalHours;
      
      let cert = "Belge Alamıyorsunuz";
      let message = "Ortalamanız belge almak için gereken sınırın altındadır.";
      let color = "#ef4444";

      // Belge alma sartlari: Ozursuz devamsizlik 5 gunu asmamali, zayif ders (50 alti) olmamali.
      if (hasFailedCourse) {
         message = `Ortalamanız ${gpa.toFixed(2)} ancak başarısız (50 altı) dersiniz olduğu için MEB mevzuatına göre belge alamazsınız.`;
      } else if (absent > 5) {
         message = `Ortalamanız ${gpa.toFixed(2)} ancak özürsüz devamsızlığınız 5 günü aştığı için belge alamazsınız.`;
      } else {
         if (gpa >= 85) {
            cert = "Takdir Belgesi";
            message = "Tebrikler! Hem ortalamanız hem de devamsızlık durumunuz Takdir Belgesi almak için yeterlidir.";
            color = "#22c55e";
         } else if (gpa >= 70) {
            cert = "Teşekkür Belgesi";
            message = "Tebrikler! Ortalamanız 70-84.99 arasında ve tüm koşulları sağladığınız için Teşekkür Belgesi hak ediyorsunuz.";
            color = "#3b82f6";
         }
      }

      setResult({ gpa, cert, message, color });
    }
  };

  const updateField = (id: number, field: "name" | "grade" | "hours", value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addRow = () => setCourses([...courses, { id: Date.now(), name: "", grade: "", hours: "" }]);
  const removeRow = (id: number) => setCourses(courses.filter(c => c.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Ortalamanızın 85 veya 70 barajını aşıp aşmadığını test edin. Zayıf ve devamsızlık koşulları da analiz edilir.</p>
      
      <div>
         <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Özürsüz Devamsızlık (Gün)</label>
         <input type="number" value={unexcusedAbsent} onChange={e => setUnexcusedAbsent(e.target.value)} className="input-field" placeholder="0" />
         <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>MEB mevzuatına göre özürsüz devamsızlık 5 günü aşarsa puan ne olursa olsun belge alınamaz.</p>
      </div>

      <div className="panel" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <div>Ders Adı</div>
          <div>Not (0-100)</div>
          <div>Ders Saati</div>
          <div></div>
        </div>

        {courses.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 40px", gap: "1rem", marginBottom: "0.75rem", alignItems: "center" }}>
             <input type="text" value={c.name} onChange={e => updateField(c.id, "name", e.target.value)} className="input-field" placeholder="Ders" />
             <input type="number" value={c.grade} onChange={e => updateField(c.id, "grade", e.target.value)} className="input-field" placeholder="Not" />
             <input type="number" value={c.hours} onChange={e => updateField(c.id, "hours", e.target.value)} className="input-field" placeholder="Saat" />
             <button onClick={() => removeRow(c.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}
        <button onClick={addRow} style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginTop: "1rem" }}>+ Yeni Ders</button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Karne & Belge Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.color}` }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Karne Sonucu</h3>
           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: result.color }}>
              {result.cert}
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
              {result.message}
           </p>
           {result.gpa >= 50 && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Ağırlıklı Ortalama: <span style={{ fontWeight: "bold", color: "var(--text-primary)"}}>{result.gpa.toFixed(4)}</span></p>
           )}
        </div>
      )}
    </div>
  );
}
