"use client";

import { useState, useEffect } from "react";
import styles from "./counters.module.css";
import Link from "next/link";

export default function Counters() {
  const [count, setCount] = useState(0);
  
  // Stopwatch
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className="btn-secondary">
          &larr; Geri
        </Link>
        <h1 className={styles.title}>Sayaç & Kronometre</h1>
      </div>
      
      <div className={styles.grid}>
        {/* Click Counter */}
        <div className={`panel ${styles.panel}`}>
          <h2 className={styles.panelTitle}>Tıklama Sayacı</h2>
          <div className={styles.countDisplay}>{count}</div>
          <div className={styles.actions}>
            <button className="btn-secondary" onClick={() => setCount(0)}>Sıfırla</button>
            <button className="btn-primary" onClick={() => setCount(c => c + 1)}>Arttır (+1)</button>
          </div>
        </div>

        {/* Stopwatch */}
        <div className={`panel ${styles.panel}`}>
          <h2 className={styles.panelTitle}>Kronometre</h2>
          <div className={styles.timeDisplay}>{formatTime(time)}</div>
          <div className={styles.actions}>
            <button className="btn-secondary" onClick={() => { setIsRunning(false); setTime(0); }}>Sıfırla</button>
            <button 
              className={isRunning ? "btn-secondary" : "btn-primary"} 
              onClick={() => setIsRunning(!isRunning)}
              style={isRunning ? { background: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.5)' } : {}}
            >
              {isRunning ? "Durdur" : "Başlat"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
