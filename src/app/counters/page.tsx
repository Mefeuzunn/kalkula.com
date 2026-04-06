"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./counters.module.css";
import Link from "next/link";
import confetti from "canvas-confetti";

type Lap = {
  id: number;
  time: number;
  lapTime: number;
};

export default function Counters() {
  const [activeTab, setActiveTab] = useState<"stopwatch" | "timer">("stopwatch");

  // --- Stopwatch State ---
  const [swTime, setSwTime] = useState(0);
  const [swIsRunning, setSwIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const swStartTimeRef = useRef<number>(0);
  const swRequestRef = useRef<number | null>(null);

  // --- Timer State ---
  const [timerInitial, setTimerInitial] = useState(60); // seconds
  const [timerLeft, setTimerLeft] = useState(60);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerInput, setTimerInput] = useState({ h: 0, m: 1, s: 0 });
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  // --- Stopwatch Logic ---
  const swTick = () => {
    setSwTime(Date.now() - swStartTimeRef.current);
    swRequestRef.current = requestAnimationFrame(swTick);
  };

  const startStopSw = () => {
    if (swIsRunning) {
      if (swRequestRef.current) cancelAnimationFrame(swRequestRef.current);
      setSwIsRunning(false);
    } else {
      swStartTimeRef.current = Date.now() - swTime;
      swRequestRef.current = requestAnimationFrame(swTick);
      setSwIsRunning(true);
    }
  };

  const recordLap = () => {
    if (!swIsRunning && swTime === 0) return;
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const newLap: Lap = {
      id: laps.length + 1,
      time: swTime,
      lapTime: swTime - lastLapTime
    };
    setLaps([newLap, ...laps]);
  };

  const resetSw = () => {
    if (swRequestRef.current) cancelAnimationFrame(swRequestRef.current);
    setSwTime(0);
    setSwIsRunning(false);
    setLaps([]);
  };

  // --- Timer Logic ---
  const startStopTimer = () => {
    if (timerIsRunning) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimerIsRunning(false);
    } else {
      if (timerLeft <= 0) return;
      setTimerIsRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerIsRunning(false);
            playBeep();
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleTimerSet = () => {
    const totalSecs = timerInput.h * 3600 + timerInput.m * 60 + timerInput.s;
    if (totalSecs > 0) {
      setTimerInitial(totalSecs);
      setTimerLeft(totalSecs);
      setTimerIsRunning(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const setPreset = (s: number) => {
    setTimerInitial(s);
    setTimerLeft(s);
    setTimerIsRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // --- Formatting ---
  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    const hStr = h > 0 ? `${h.toString().padStart(2, '0')}:` : "";
    return `${hStr}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className="btn-secondary rounded-full" style={{ padding: '0.5rem 1.5rem', fontWeight: 800 }}>
          &larr; Ana Sayfa
        </Link>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 className={styles.title}>Zaman Merkezi</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>2026 Profesyonel Seri</span>
          </div>
        </div>
        <div style={{ width: '100px' }}></div>
      </div>

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        background: 'rgba(255,255,255,0.03)', 
        padding: '0.5rem', 
        borderRadius: '100px', 
        marginBottom: '4rem',
        border: '1px solid var(--border)',
        width: 'fit-content',
        margin: '0 auto 4rem auto',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <button 
          onClick={() => setActiveTab("stopwatch")}
          style={{
            padding: '0.75rem 2.5rem',
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: 800,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeTab === "stopwatch" ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === "stopwatch" ? '#fff' : 'var(--text-secondary)',
            boxShadow: activeTab === "stopwatch" ? '0 10px 25px -5px var(--accent-primary-glow)' : 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Kronometre
        </button>
        <button 
          onClick={() => setActiveTab("timer")}
          style={{
            padding: '0.75rem 2.5rem',
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: 800,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeTab === "timer" ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === "timer" ? '#fff' : 'var(--text-secondary)',
            boxShadow: activeTab === "timer" ? '0 10px 25px -5px var(--accent-primary-glow)' : 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Geri Sayım
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "stopwatch" ? (
          <div className="fade-in">
            <div className="panel shadow-2xl relative overflow-hidden" style={{ minHeight: '450px', padding: '5rem 2rem', borderRadius: '4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              
              <div className="text-center relative z-10">
                <div style={{ fontSize: '7rem', fontWeight: 900, fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em', color: 'var(--text-primary)', marginBottom: '4rem', textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  {formatTime(swTime)}
                </div>

                <div className="flex gap-6 justify-center">
                  <div className={styles.btn3dContainer}>
                    <button className={`${styles.btn3d} ${styles.btn3dSecondary}`} onClick={resetSw}>SIFIRLA</button>
                  </div>
                  <div className={styles.btn3dContainer} style={{ transform: 'scale(1.1)' }}>
                    <button 
                      className={`${styles.btn3d} ${swIsRunning ? styles.btn3dDanger : styles.btn3dPrimary}`} 
                      onClick={startStopSw}
                    >
                      {swIsRunning ? "DURDUR" : "BAŞLAT"}
                    </button>
                  </div>
                  <div className={styles.btn3dContainer}>
                    <button 
                      className={`${styles.btn3d} ${styles.btn3dSecondary}`} 
                      disabled={!swIsRunning && swTime === 0}
                      onClick={recordLap}
                    >
                      TUR AT
                    </button>
                  </div>
                </div>
              </div>
              
              {laps.length > 0 && (
                <div className="mt-16 w-full max-w-lg mx-auto fade-in">
                  <div style={{ borderTop: '2px solid var(--border)', paddingTop: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      <span># Kademe</span>
                      <span>Tur Farkı</span>
                      <span>Kümülatif</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.75rem' }} className="custom-scrollbar">
                      {laps.map((lap, idx) => (
                        <div key={lap.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-accent-primary/30 transition-all animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                          <span className="font-black text-accent-primary/40 text-xs">{(laps.length - idx).toString().padStart(2, '0')}</span>
                          <span className="font-mono font-black text-accent-primary">+{formatTime(lap.lapTime)}</span>
                          <span className="font-mono font-black opacity-80">{formatTime(lap.time)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="fade-in">
            <div className="panel shadow-2xl relative overflow-hidden" style={{ minHeight: '450px', padding: '5rem 2rem', borderRadius: '4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div className="flex flex-col items-center">
                
                {/* SVG Progress Circle with Glow */}
                <div className="relative mb-14">
                   <div style={{ position: 'absolute', inset: '-20px', background: timerIsRunning ? 'var(--accent-primary-glow)' : 'transparent', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.1, transition: 'all 1s' }}></div>
                   <svg width="280" height="280" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
                      <circle cx="140" cy="140" r="130" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                      <circle 
                        cx="140" 
                        cy="140" 
                        r="130" 
                        fill="transparent" 
                        stroke="var(--accent-primary)" 
                        strokeWidth="12" 
                        strokeDasharray={2 * Math.PI * 130}
                        strokeDashoffset={2 * Math.PI * 130 * (1 - timerLeft / timerInitial)}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 5px var(--accent-primary))' }}
                      />
                   </svg>
                   <div className={timerLeft <= 10 && timerIsRunning ? styles.pulseEffect : ""} style={{ 
                     position: 'absolute', 
                     top: '50%', 
                     left: '50%', 
                     transform: 'translate(-50%, -50%)',
                     fontSize: '4.5rem',
                     fontWeight: 900,
                     fontFamily: 'var(--font-mono)',
                     color: timerLeft <= 10 && timerIsRunning ? '#ef4444' : 'var(--text-primary)',
                     textShadow: '0 5px 15px rgba(0,0,0,0.4)'
                   }}>
                      {formatTimer(timerLeft)}
                   </div>
                </div>

                <div className="flex gap-6 justify-center mb-14">
                   <div className={styles.btn3dContainer}>
                     <button className={`${styles.btn3d} ${styles.btn3dSecondary}`} onClick={() => setPreset(timerInitial)}>SIFIRLA</button>
                   </div>
                   <div className={styles.btn3dContainer} style={{ transform: 'scale(1.15)' }}>
                     <button 
                      className={`${styles.btn3d} ${timerIsRunning ? styles.btn3dDanger : styles.btn3dSuccess}`} 
                      onClick={startStopTimer}
                    >
                      {timerIsRunning ? "DURDUR" : "BAŞLAT"}
                    </button>
                   </div>
                </div>

                <div className="w-full max-w-md">
                   <div className="text-[10px] uppercase font-black text-muted tracking-widest mb-5 text-center">HIZLI ŞABLONLAR</div>
                   <div className="grid grid-cols-4 gap-3 mb-10">
                      {[1, 5, 15, 30].map(m => (
                        <button key={m} onClick={() => setPreset(m * 60)} className="p-3 bg-white/5 border border-white/5 rounded-2xl text-xs font-black hover:border-accent-primary hover:bg-accent-primary/10 transition-all text-primary uppercase">
                          {m} Dakika
                        </button>
                      ))}
                   </div>

                   <div className="p-8 bg-white/5 rounded-[3rem] border border-white/5 shadow-inner">
                      <div className="text-[10px] uppercase font-black text-accent-primary tracking-widest mb-5 text-center">ÖZEL SÜRE YAPILANDIRMASI</div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-muted text-center tracking-tighter">SAAT</span>
                            <input type="number" min="0" value={timerInput.h} onChange={e => setTimerInput({...timerInput, h: parseInt(e.target.value)||0})} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center font-black text-xl text-primary focus:border-accent-primary outline-none transition-all" />
                         </div>
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-muted text-center tracking-tighter">DAKİKA</span>
                            <input type="number" min="0" max="59" value={timerInput.m} onChange={e => setTimerInput({...timerInput, m: parseInt(e.target.value)||0})} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center font-black text-xl text-primary focus:border-accent-primary outline-none transition-all" />
                         </div>
                         <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black text-muted text-center tracking-tighter">SANİYE</span>
                            <input type="number" min="0" max="59" value={timerInput.s} onChange={e => setTimerInput({...timerInput, s: parseInt(e.target.value)||0})} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center font-black text-xl text-primary focus:border-accent-primary outline-none transition-all" />
                         </div>
                      </div>
                      <button onClick={handleTimerSet} className="w-full mt-6 bg-accent-primary text-white font-black py-4 rounded-2xl text-sm shadow-xl shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">SÜREYİ AYARLA</button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
