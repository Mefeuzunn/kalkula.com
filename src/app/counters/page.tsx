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
        <Link href="/" className="btn-secondary rounded-full" style={{ padding: '0.5rem 1.25rem' }}>
          &larr; Ana Sayfa
        </Link>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 className={styles.title}>Zaman Merkezi</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Profesyonel Kronometre ve Sayaç</p>
        </div>
        <div style={{ width: '80px' }}></div>
      </div>

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        background: 'var(--bg-secondary)', 
        padding: '0.4rem', 
        borderRadius: '100px', 
        marginBottom: '3rem',
        border: '1px solid var(--border)',
        width: 'fit-content',
        margin: '0 auto 3rem auto'
      }}>
        <button 
          onClick={() => setActiveTab("stopwatch")}
          style={{
            padding: '0.6rem 2rem',
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: 700,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeTab === "stopwatch" ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === "stopwatch" ? '#fff' : 'var(--text-secondary)',
            boxShadow: activeTab === "stopwatch" ? '0 10px 20px -5px var(--accent-primary-glow)' : 'none'
          }}
        >
          Kronometre
        </button>
        <button 
          onClick={() => setActiveTab("timer")}
          style={{
            padding: '0.6rem 2rem',
            borderRadius: '100px',
            fontSize: '0.9rem',
            fontWeight: 700,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeTab === "timer" ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === "timer" ? '#fff' : 'var(--text-secondary)',
            boxShadow: activeTab === "timer" ? '0 10px 20px -5px var(--accent-primary-glow)' : 'none'
          }}
        >
          Geri Sayım
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "stopwatch" ? (
          <div className="fade-in">
            <div className="panel shadow-2xl relative overflow-hidden" style={{ minHeight: '400px', padding: '4rem 2rem' }}>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM13 13H12A1 1 0 0 1 11 12V7A1 1 0 0 1 13 7V11H14A1 1 0 0 1 14 13Z" />
                </svg>
              </div>

              <div className="text-center relative z-10">
                <div style={{ fontSize: '6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', letterSpacing: '-0.05em', color: 'var(--text-primary)', marginBottom: '3rem' }}>
                  {formatTime(swTime)}
                </div>

                <div className="flex gap-4 justify-center">
                  <button className="btn-secondary rounded-3xl px-8 py-4 font-black" onClick={resetSw}>SIFIRLA</button>
                  <button 
                    className="rounded-3xl px-12 py-4 font-black text-white transition-all shadow-xl"
                    style={{ 
                      background: swIsRunning ? '#ef4444' : 'var(--accent-primary)',
                      transform: swIsRunning ? 'scale(1)' : 'scale(1.05)'
                    }}
                    onClick={startStopSw}
                  >
                    {swIsRunning ? "DURDUR" : "BAŞLAT"}
                  </button>
                  <button 
                    className="btn-secondary rounded-3xl px-8 py-4 font-black" 
                    disabled={!swIsRunning && swTime === 0}
                    onClick={recordLap}
                  >
                    TUR
                  </button>
                </div>
              </div>
              
              {laps.length > 0 && (
                <div className="mt-12 w-full max-w-md mx-auto fade-in">
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      <span># Tur</span>
                      <span>Tur Süresi</span>
                      <span>Toplam</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                      {laps.map((lap, idx) => (
                        <div key={lap.id} className="flex justify-between items-center p-3 bg-secondary/5 rounded-xl border border-border/50 animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                          <span className="font-bold text-muted text-xs">{(laps.length - idx).toString().padStart(2, '0')}</span>
                          <span className="font-mono font-bold text-accent-primary">+{formatTime(lap.lapTime)}</span>
                          <span className="font-mono font-bold">{formatTime(lap.time)}</span>
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
            <div className="panel shadow-2xl relative overflow-hidden" style={{ minHeight: '400px', padding: '4rem 2rem' }}>
              <div className="flex flex-col items-center">
                
                {/* SVG Progress Circle */}
                <div className="relative mb-12">
                   <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="120" cy="120" r="110" fill="transparent" stroke="var(--border)" strokeWidth="6" />
                      <circle 
                        cx="120" 
                        cy="120" 
                        r="110" 
                        fill="transparent" 
                        stroke="var(--accent-primary)" 
                        strokeWidth="6" 
                        strokeDasharray={2 * Math.PI * 110}
                        strokeDashoffset={2 * Math.PI * 110 * (1 - timerLeft / timerInitial)}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                      />
                   </svg>
                   <div style={{ 
                     position: 'absolute', 
                     top: '50%', 
                     left: '50%', 
                     transform: 'translate(-50%, -50%)',
                     fontSize: '3.5rem',
                     fontWeight: 900,
                     fontFamily: 'var(--font-mono)',
                     color: timerLeft <= 10 && timerIsRunning ? '#ef4444' : 'var(--text-primary)',
                     animation: timerLeft <= 10 && timerIsRunning ? 'pulse 1s infinite' : 'none'
                   }}>
                      {formatTimer(timerLeft)}
                   </div>
                </div>

                <div className="flex gap-4 justify-center mb-10">
                   <button 
                    className="btn-secondary rounded-3xl px-8 py-4 font-black" 
                    onClick={() => setPreset(timerInitial)}
                   >
                    Sıfırla
                   </button>
                   <button 
                    className="rounded-3xl px-12 py-4 font-black text-white transition-all shadow-xl"
                    style={{ 
                      background: timerIsRunning ? '#ef4444' : '#22c55e',
                      transform: timerIsRunning ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={startStopTimer}
                  >
                    {timerIsRunning ? "DURDUR" : "BAŞLAT"}
                  </button>
                </div>

                <div className="w-full max-w-sm">
                   <div className="text-[10px] uppercase font-black text-muted tracking-widest mb-4 text-center">HIZLI BAŞLAT</div>
                   <div className="grid grid-cols-4 gap-2 mb-8">
                      {[1, 5, 10, 30].map(m => (
                        <button key={m} onClick={() => setPreset(m * 60)} className="p-2 bg-secondary/5 border border-border rounded-xl text-xs font-bold hover:border-accent-primary transition-colors">
                          {m} Dakika
                        </button>
                      ))}
                   </div>

                   <div className="p-6 bg-secondary/5 rounded-3xl border border-border">
                      <div className="text-[10px] uppercase font-black text-muted tracking-widest mb-3">ÖZEL SÜRE AYARLA</div>
                      <div className="grid grid-cols-3 gap-3">
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-muted ml-2">SAAT</span>
                            <input type="number" min="0" value={timerInput.h} onChange={e => setTimerInput({...timerInput, h: parseInt(e.target.value)||0})} className="p-2 rounded-xl bg-bg-primary border border-border text-center font-bold" />
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-muted ml-2">DK</span>
                            <input type="number" min="0" max="59" value={timerInput.m} onChange={e => setTimerInput({...timerInput, m: parseInt(e.target.value)||0})} className="p-2 rounded-xl bg-bg-primary border border-border text-center font-bold" />
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-muted ml-2">SN</span>
                            <input type="number" min="0" max="59" value={timerInput.s} onChange={e => setTimerInput({...timerInput, s: parseInt(e.target.value)||0})} className="p-2 rounded-xl bg-bg-primary border border-border text-center font-bold" />
                         </div>
                      </div>
                      <button onClick={handleTimerSet} className="w-full mt-4 bg-accent-primary text-white font-black py-3 rounded-2xl text-xs shadow-lg shadow-accent-primary/20">AYARLA VE HAZIRLA</button>
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
