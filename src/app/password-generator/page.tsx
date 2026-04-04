"use client";

import styles from "./password.module.css";
import React, { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (password.length > 12) strength += 25;
    if (includeUppercase && includeLowercase) strength += 15;
    if (includeNumbers) strength += 15;
    if (includeSymbols) strength += 20;
    return Math.min(100, Math.max(0, strength));
  };

  const strength = calculateStrength();
  
  let strengthLabel = "Çok Zayıf";
  let strengthColor = "var(--red-500, #ef4444)";
  
  if (strength >= 80) {
    strengthLabel = "Çok Güçlü";
    strengthColor = "var(--green-500, #22c55e)";
  } else if (strength >= 60) {
    strengthLabel = "Güçlü";
    strengthColor = "var(--yellow-500, #eab308)";
  } else if (strength >= 40) {
    strengthLabel = "Orta";
    strengthColor = "var(--orange-500, #f97316)";
  } else if (strength >= 20) {
    strengthLabel = "Zayıf";
    strengthColor = "var(--red-400, #f87171)";
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Güvenli Şifre Oluşturucu</h1>
        <p className={styles.subtitle}>Kırılması zor, rastgele ve güvenli şifreler yaratın.</p>
      </div>

      <div className={styles.card}>
        <div className={styles.passwordDisplay}>
          <input 
            type="text" 
            value={password} 
            readOnly 
            className={styles.passwordInput}
            placeholder="Şifre oluşturun..."
          />
          <button 
            className={styles.copyButton} 
            onClick={copyToClipboard}
            title="Kopyala"
          >
            {copied ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </div>

        <div className={styles.strengthContainer}>
          <div className={styles.strengthHeader}>
            <span>Şifre Gücü:</span>
            <span style={{ color: strengthColor, fontWeight: 600 }}>{strengthLabel}</span>
          </div>
          <div className={styles.strengthBarBg}>
            <div 
              className={styles.strengthBar} 
              style={{ width: `${strength}%`, backgroundColor: strengthColor }}
            ></div>
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <label htmlFor="length">Şifre Uzunluğu</label>
              <span className={styles.lengthValue}>{length}</span>
            </div>
            <input 
              type="range" 
              id="length" 
              min="8" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={includeUppercase} 
                onChange={(e) => setIncludeUppercase(e.target.checked)} 
              />
              <span className={styles.checkmark}></span>
              Büyük Harfler (A-Z)
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={includeLowercase} 
                onChange={(e) => setIncludeLowercase(e.target.checked)} 
              />
              <span className={styles.checkmark}></span>
              Küçük Harfler (a-z)
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)} 
              />
              <span className={styles.checkmark}></span>
              Rakamlar (0-9)
            </label>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)} 
              />
              <span className={styles.checkmark}></span>
              Özel Karakterler (!@#$%)
            </label>
          </div>
        </div>

        <button className={styles.generateButton} onClick={generatePassword}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Yeniden Oluştur
        </button>
      </div>
    </div>
  );
}
