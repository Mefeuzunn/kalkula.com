"use client";

import React, { useState, useEffect } from "react";
import styles from "./counters.module.css";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useTimer } from "@/context/TimerContext";

export default function Counters() {
  const {
    swTime, swIsRunning, laps, startStopSw, recordLap, resetSw,
    timerInitial, timerLeft, timerIsRunning, timerInput, setTimerInput, 
    startStopTimer, setTimerPreset, handleTimerSet, resetTimer,
    formatTime, formatTimer
  } = useTimer();

  const [activeTab, setActiveTab] = useState<"stopwatch" | "timer">("stopwatch");

  // Auto-switch to active tool on mount
  useEffect(() => {
    if (timerIsRunning || (timerLeft > 0 && timerLeft < timerInitial)) {
      setActiveTab("timer");
    } else if (swIsRunning || swTime > 0) {
      setActiveTab("stopwatch");
    }
  }, []);

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
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 10
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
            cursor: 'pointer',
            position: 'relative',
            zIndex: 11
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
            cursor: 'pointer',
            position: 'relative',
            zIndex: 11
          }}
        >
          Geri Sayım
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "stopwatch" ? (
          <div className="fade-in animate-in fade-in zoom-in duration-300">
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
          <div className="fade-in animate-in fade-in zoom-in duration-300">
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
                     <button className={`${styles.btn3d} ${styles.btn3dSecondary}`} onClick={resetTimer}>SIFIRLA</button>
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
                   <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                     <div style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>HIZLI ŞABLONLAR</div>
                     <div className="flex flex-wrap justify-center gap-3">
                        {[1, 5, 15, 30].map(m => (
                          <div key={m} className={styles.btn3dContainer}>
                            <button 
                              onClick={() => setTimerPreset(m * 60)} 
                              className={styles.btn3d}
                              style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem', transform: 'translateY(-4px)', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 0 rgba(0,0,0,0.3)' }}
                            >
                              {m} DK
                            </button>
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="p-8 bg-black/20 rounded-[3.5rem] border border-white/5 shadow-2xl relative">
                      <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-secondary)', padding: '0 1rem', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>ÖZEL YAPILANDIRMA</div>
                      
                      <div className="grid grid-cols-3 gap-6 mb-8">
                         <div className="flex flex-col items-center gap-2">
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>SAAT</span>
                            <div className="w-full">
                              <input 
                                type="number" min="0" 
                                value={timerInput.h} 
                                onChange={e => setTimerInput({...timerInput, h: parseInt(e.target.value)||0})} 
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-center font-black text-2xl text-primary focus:border-accent-primary/50 outline-none transition-all" 
                                style={{ appearance: 'none', margin: 0 }}
                              />
                            </div>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>DAKİKA</span>
                            <div className="w-full">
                              <input 
                                type="number" min="0" max="59" 
                                value={timerInput.m} 
                                onChange={e => setTimerInput({...timerInput, m: parseInt(e.target.value)||0})} 
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-center font-black text-2xl text-primary focus:border-accent-primary/50 outline-none transition-all" 
                                style={{ appearance: 'none', margin: 0 }}
                              />
                            </div>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>SANİYE</span>
                            <div className="w-full">
                              <input 
                                type="number" min="0" max="59" 
                                value={timerInput.s} 
                                onChange={e => setTimerInput({...timerInput, s: parseInt(e.target.value)||0})} 
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-center font-black text-2xl text-primary focus:border-accent-primary/50 outline-none transition-all" 
                                style={{ appearance: 'none', margin: 0 }}
                              />
                            </div>
                         </div>
                      </div>

                      <div className={styles.btn3dContainer} style={{ width: '100%' }}>
                        <button 
                          onClick={handleTimerSet} 
                          className={`${styles.btn3d} ${styles.btn3dPrimary}`} 
                          style={{ width: '100%', justifyContent: 'center', padding: '1.25rem' }}
                        >
                          SÜREYİ AYARLA VE HAZIRLA
                        </button>
                      </div>
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
