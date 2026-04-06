"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";

type Tile = {
  id: number;
  value: number;
  x: number;
  y: number;
  isNew: boolean;
  isMerged: boolean;
};

export function Game2048() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  
  const tileIdCounter = useRef(0);
  const touchStart = useRef<{ x: number, y: number } | null>(null);

  const playClick = () => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const createTile = (x: number, y: number, value: number = Math.random() < 0.9 ? 2 : 4): Tile => {
    tileIdCounter.current += 1;
    return { id: tileIdCounter.current, value, x, y, isNew: true, isMerged: false };
  };

  const startNewGame = useCallback(() => {
    const savedBest = localStorage.getItem('kalkula-2048-best');
    if (savedBest) setBestScore(parseInt(savedBest));
    setScore(0);
    setGameOver(false);
    setWin(false);
    const t1 = createTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
    let t2;
    do { t2 = createTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)); } while (t1.x === t2.x && t1.y === t2.y);
    setTiles([t1, t2]);
  }, []);

  useEffect(() => { startNewGame(); }, [startNewGame]);

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;
    setTiles(prev => {
      let newTiles = prev.map(t => ({ ...t, isNew: false, isMerged: false }));
      let moved = false;
      let scoreIncrease = 0;
      const sorted = [...newTiles].sort((a, b) => {
        if (direction === 'up') return a.y - b.y;
        if (direction === 'down') return b.y - a.y;
        if (direction === 'left') return a.x - b.x;
        if (direction === 'right') return b.x - a.x;
        return 0;
      });
      const vectors = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
      const vector = vectors[direction];
      const mergedIds = new Set<number>();

      sorted.forEach(tile => {
        let curX = tile.x;
        let curY = tile.y;
        const currentTile = newTiles.find(t => t.id === tile.id);
        if (!currentTile) return;

        while (true) {
          const nextX = curX + vector.x;
          const nextY = curY + vector.y;
          if (nextX < 0 || nextX >= 4 || nextY < 0 || nextY >= 4) break;
          const target = newTiles.find(t => t.x === nextX && t.y === nextY);
          if (!target) {
            currentTile.x = nextX;
            currentTile.y = nextY;
            curX = nextX;
            curY = nextY;
            moved = true;
          } else if (target.value === tile.value && !mergedIds.has(target.id) && !currentTile.isMerged) {
            target.value *= 2;
            target.isMerged = true;
            mergedIds.add(target.id);
            scoreIncrease += target.value;
            newTiles = newTiles.filter(t => t.id !== tile.id);
            moved = true;
            if (target.value === 2048) setWin(true);
            playClick();
            break;
          } else break;
        }
      });

      if (moved) {
        setScore(curr => {
          const newS = curr + scoreIncrease;
          if (newS > bestScore) { setBestScore(newS); localStorage.setItem("kalkula-2048-best", newS.toString()); }
          return newS;
        });
        const empties = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (!newTiles.some(t => t.x === c && t.y === r)) empties.push({ x: c, y: r });
        if (empties.length > 0) {
          const pick = empties[Math.floor(Math.random() * empties.length)];
          newTiles.push(createTile(pick.x, pick.y));
        }
        const canStillMove = () => {
          if (newTiles.length < 16) return true;
          for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
            const t = newTiles.find(t => t.x === x && t.y === y);
            if (!t) return true;
            const right = newTiles.find(t => t.x === x + 1 && t.y === y);
            const down = newTiles.find(t => t.x === x && t.y === y + 1);
            if (right && right.value === t.value) return true;
            if (down && down.value === t.value) return true;
          }
          return false;
        };
        if (!canStillMove()) setGameOver(true);
      }
      return newTiles;
    });
  }, [gameOver, bestScore]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace('Arrow', '').toLowerCase() as any);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) {
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
      else move(dy > 0 ? 'down' : 'up');
    }
    touchStart.current = null;
  };

  if (win && !gameOver) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

  const getTileStyles = (val: number) => {
    const colors: Record<number, string> = { 2: "#475569", 4: "#64748b", 8: "#f59e0b", 16: "#ea580c", 32: "#ef4444", 64: "#dc2626", 128: "#fbbf24", 256: "#fbbf24", 512: "#fbbf24", 1024: "#fbbf24", 2048: "#fbbf24" };
    return {
      backgroundColor: colors[val] || "#334155",
      color: (val >= 128) ? "#1e293b" : "#f8fafc",
      fontSize: val >= 1024 ? "20px" : val >= 128 ? "24px" : "32px",
    };
  };

  // ---------------------------------------------------------
  // INLINE STYLE ENGINE - FOOLPROOF DESIGN
  // ---------------------------------------------------------
  const styles = {
    wrapper: { display: "flex", flexDirection: "column" as const, alignItems: "center", width: "100%", maxWidth: "420px", margin: "0 auto", padding: "20px", boxSizing: "border-box" as const, color: "#fff", fontFamily: "sans-serif", userSelect: "none" as const },
    header: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    titleBox: { display: "flex", flexDirection: "column" as const },
    title: { fontSize: "36px", fontWeight: 900, fontStyle: "italic", margin: 0, lineHeight: 1, letterSpacing: "-1px" },
    subtitle: { fontSize: "11px", fontWeight: 700, color: "#a0aec0", textTransform: "uppercase" as const, letterSpacing: "2px", marginTop: "4px" },
    scoreRow: { display: "flex", gap: "8px" },
    scoreBox: { background: "#1e293b", padding: "8px 16px", borderRadius: "12px", textAlign: "center" as const, minWidth: "80px", border: "1px solid rgba(255,255,255,0.05)" },
    scoreLabel: { fontSize: "9px", fontWeight: 900, color: "#a0aec0", margin: "0 0 2px 0", letterSpacing: "1px" },
    scoreVal: { fontSize: "20px", fontWeight: 900, margin: 0, lineHeight: 1 },
    
    boardContainer: { position: "relative" as const, width: "100%", paddingBottom: "100%", background: "#1e293b", borderRadius: "16px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" },
    gridLayer: { position: "absolute" as const, inset: 0, padding: "12px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "12px", boxSizing: "border-box" as const },
    gridCell: { background: "rgba(255,255,255,0.05)", borderRadius: "8px" },
    
    tileLayer: { position: "absolute" as const, inset: 0, padding: "12px", boxSizing: "border-box" as const, pointerEvents: "none" as const },
    tile: { position: "absolute" as const, width: "calc(25% - 9px)", height: "calc(25% - 9px)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, borderRadius: "8px", transition: "transform 100ms ease-out", boxSizing: "border-box" as const },
    
    overlay: { position: "absolute" as const, inset: 0, background: "rgba(15, 23, 42, 0.95)", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", zIndex: 100, transform: "scale(1)", transition: "all 0.3s" },
    modalTitle: { fontSize: "32px", fontWeight: 900, marginBottom: "20px", fontStyle: "italic" },
    modalBtn: { background: "#2563eb", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontSize: "18px", fontWeight: 900, cursor: "pointer", transition: "transform 0.1s" }
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.titleBox}>
          <h1 style={styles.title}>2048</h1>
          <span style={styles.subtitle}>Kalkula Premium</span>
        </div>
        <div style={styles.scoreRow}>
          <div style={styles.scoreBox}>
            <p style={styles.scoreLabel}>SKOR</p>
            <p style={styles.scoreVal}>{score}</p>
          </div>
          <div style={styles.scoreBox}>
            <p style={styles.scoreLabel}>EN İYİ</p>
            <p style={styles.scoreVal}>{bestScore}</p>
          </div>
        </div>
      </div>

      {/* BOARD */}
      <div style={styles.boardContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* BACKGROUND GRID */}
        <div style={styles.gridLayer}>
          {Array(16).fill(0).map((_, i) => <div key={i} style={styles.gridCell} />)}
        </div>

        {/* TILES */}
        <div style={styles.tileLayer}>
          {tiles.map(tile => (
            <div 
              key={tile.id}
              style={{
                ...styles.tile,
                ...getTileStyles(tile.value),
                transform: `translate(calc(${tile.x * 100}% + ${tile.x * 12}px), calc(${tile.y * 100}% + ${tile.y * 12}px))`,
                opacity: tile.isNew ? 0.8 : 1,
                zIndex: tile.isMerged ? 10 : 1
              }}
            >
              {tile.value}
            </div>
          ))}
        </div>

        {/* OVERLAYS */}
        {(gameOver || (win && !gameOver)) && (
          <div style={styles.overlay}>
             <h2 style={{ ...styles.modalTitle, color: win ? "#fbbf24" : "#fff" }}>
               {win ? "🏆 KAZANDINIZ!" : "OYUN BİTTİ!"}
             </h2>
             <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", marginBottom: "24px", textAlign: "center" }}>
                <p style={{ ...styles.scoreLabel, fontSize: "11px" }}>TOPLAM PUAN</p>
                <p style={{ ...styles.scoreVal, fontSize: "36px" }}>{score}</p>
             </div>
             <button 
               style={styles.modalBtn}
               onClick={startNewGame}
               onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
               onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
             >
               TEKRAR OYNA
             </button>
             {win && !gameOver && (
               <button 
                 style={{ background: "none", color: "#a0aec0", border: "none", marginTop: "16px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                 onClick={() => setWin(false)}
               >
                 DEVAM ET
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
