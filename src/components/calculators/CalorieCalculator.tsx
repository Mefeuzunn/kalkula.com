"use client";

import React, { useState } from "react";

export function CalorieCalculator() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;

    // Harris-Benedict Equation
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    const tdee = bmr * parseFloat(activity);
    setResult(Math.round(tdee));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Cinsiyet</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className="input-field">
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yaş</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} className="input-field" placeholder="Örn: 25" />
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Kilo (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" placeholder="Örn: 70" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Boy (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field" placeholder="Örn: 175" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hareket Seviyesi</label>
        <select value={activity} onChange={e => setActivity(e.target.value)} className="input-field">
          <option value="1.2">Masa başı veya hareketsiz</option>
          <option value="1.375">Hafif egzersiz (1-3 gün/hafta)</option>
          <option value="1.55">Orta derece egzersiz (3-5 gün/hafta)</option>
          <option value="1.725">Ağır egzersiz (6-7 gün/hafta)</option>
          <option value="1.9">Çok ağır egzersiz veya fiziksel iş</option>
        </select>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid #22c55e" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Günlük İhtiyacınız</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#22c55e" }}>
            {result} <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>kcal</span>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Kilo vermek için günde ~{result - 500} kcal, kilo almak için ~{result + 500} kcal almalısınız.
          </p>
        </div>
      )}
    </div>
  );
}
