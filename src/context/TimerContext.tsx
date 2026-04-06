"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

type Lap = {
  id: number;
  time: number;
  lapTime: number;
};

interface TimerContextType {
  // Stopwatch
  swTime: number;
  swIsRunning: boolean;
  laps: Lap[];
  startStopSw: () => void;
  recordLap: () => void;
  resetSw: () => void;

  // Timer
  timerInitial: number;
  timerLeft: number;
  timerIsRunning: boolean;
  timerInput: { h: number; m: number; s: number };
  setTimerInput: (input: { h: number; m: number; s: number }) => void;
  startStopTimer: () => void;
  setTimerPreset: (s: number) => void;
  handleTimerSet: () => void;
  resetTimer: () => void;

  // Utils
  formatTime: (ms: number) => string;
  formatTimer: (secs: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  // --- Stopwatch State ---
  const [swTime, setSwTime] = useState(0);
  const [swIsRunning, setSwIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const swStartTimeRef = useRef<number>(0);
  const swRequestRef = useRef<number | null>(null);

  // --- Timer State ---
  const [timerInitial, setTimerInitial] = useState(60);
  const [timerLeft, setTimerLeft] = useState(60);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerInput, setTimerInput] = useState({ h: 0, m: 1, s: 0 });
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Sound ---
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
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
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const newLap: Lap = {
      id: Date.now(),
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

  const setTimerPreset = (s: number) => {
    setTimerInitial(s);
    setTimerLeft(s);
    setTimerIsRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const resetTimer = () => {
    setTimerLeft(timerInitial);
    setTimerIsRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // --- Persistence ---
  const lastSavedRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("kalkula_timer_hub");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.swTime) setSwTime(data.swTime);
        if (data.laps) setLaps(data.laps);
        if (data.timerLeft) setTimerLeft(data.timerLeft);
        if (data.timerInitial) setTimerInitial(data.timerInitial);
      } catch(e) {}
    }
  }, []);

  useEffect(() => {
    const now = Date.now();
    if (now - lastSavedRef.current >= 1000) {
      const data = { swTime, laps, timerLeft, timerInitial };
      localStorage.setItem("kalkula_timer_hub", JSON.stringify(data));
      lastSavedRef.current = now;
    }
  }, [swTime, laps, timerLeft, timerInitial]);

  // --- Formats ---
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
    <TimerContext.Provider value={{
      swTime, swIsRunning, laps, startStopSw, recordLap, resetSw,
      timerInitial, timerLeft, timerIsRunning, timerInput, setTimerInput, startStopTimer, setTimerPreset, handleTimerSet, resetTimer,
      formatTime, formatTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within a TimerProvider");
  return context;
}
