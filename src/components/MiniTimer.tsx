"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "@/context/TimerContext";
import { usePathname } from "next/navigation";

export function MiniTimer() {
  const { 
    swTime, swIsRunning, timerLeft, timerIsRunning, timerInitial, 
    formatTime, formatTimer, startStopSw, startStopTimer, resetSw, resetTimer 
  } = useTimer();
  
  const pathname = usePathname();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 }); // From bottom-right
  const offsetRef = useRef({ x: 0, y: 0 });

  // Only show if stopwatch is non-zero or timer is non-initial or running
  const hasActiveStopwatch = swTime > 0 || swIsRunning;
  const hasActiveTimer = (timerLeft > 0 && timerLeft < timerInitial) || timerIsRunning;
  const isVisible = (hasActiveStopwatch || hasActiveTimer);

  // Auto-hide when on /counters page (the main hub)
  if (pathname === "/counters" || !isVisible) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX + position.x,
      y: window.innerHeight - e.clientY - position.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = window.innerWidth - e.clientX - offsetRef.current.x;
    const newY = window.innerHeight - e.clientY - offsetRef.current.y;
    setPosition({ 
      x: Math.max(10, Math.min(window.innerWidth - 200, newX)), 
      y: Math.max(10, Math.min(window.innerHeight - 80, newY)) 
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const activeLabel = hasActiveStopwatch ? "KRONOMETRE" : "SAYAÇ";
  const activeTime = hasActiveStopwatch ? formatTime(swTime) : formatTimer(timerLeft);
  const handleToggle = hasActiveStopwatch ? startStopSw : startStopTimer;
  const handleReset = hasActiveStopwatch ? resetSw : resetTimer;
  const isRunning = hasActiveStopwatch ? swIsRunning : timerIsRunning;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: `${position.y}px`,
        right: `${position.x}px`,
        zIndex: 9999,
        width: '220px',
        background: 'rgba(23, 23, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '12px 16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>{activeLabel}</span>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isRunning ? '#22c55e' : '#ef4444' }}></div>
      </div>

      <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'white', textAlign: 'center', margin: '4px 0' }}>
        {activeTime}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); handleToggle(); }}
          style={{
            flex: 2,
            background: isRunning ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '8px',
            fontSize: '10px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {isRunning ? "DURDUR" : "BAŞLAT"}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReset(); }}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '8px',
            fontSize: '10px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          SIFIRLA
        </button>
      </div>
    </div>
  );
}
