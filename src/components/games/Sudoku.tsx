"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { generatePuzzle, SudokuBoard } from "@/utils/sudoku";
import { Timer, RotateCcw, PenTool, CheckCircle2, ChevronRight, Hash } from "lucide-react";
import confetti from "canvas-confetti";

type GameState = "selecting" | "playing" | "victory";
type Difficulty = "easy" | "medium" | "hard";

export function Sudoku() {
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [solution, setSolution] = useState<SudokuBoard>([]);
  const [initialBoard, setInitialBoard] = useState<boolean[][]>([]);
  const [notes, setNotes] = useState<number[][][]>([]);
  const [gameState, setGameState] = useState<GameState>("selecting");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPencilMode, setIsPencilMode] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startNewGame = (diff: Difficulty) => {
    const { puzzle, solution: sol } = generatePuzzle(diff);
    setBoard(puzzle);
    setSolution(sol);
    setInitialBoard(puzzle.map(row => row.map(cell => cell !== null)));
    setNotes(Array(9).fill(null).map(() => Array(9).fill(null).map(() => [])));
    setGameState("playing");
    setDifficulty(diff);
    setMistakes(0);
    setSeconds(0);
    setSelectedCell(null);
    setIsPencilMode(false);
  };

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState]);

  const handleCellInput = useCallback((num: number) => {
    if (!selectedCell || gameState !== "playing") return;
    const { r, c } = selectedCell;
    if (initialBoard[r][c]) return;

    if (isPencilMode) {
      if (board[r][c] !== null) return;
      setNotes(prev => {
        const newNotes = [...prev];
        const currentNotes = [...newNotes[r][c]];
        if (currentNotes.includes(num)) {
          newNotes[r][c] = currentNotes.filter(n => n !== num);
        } else {
          newNotes[r][c] = [...currentNotes, num].sort();
        }
        return newNotes;
      });
    } else {
      if (num === solution[r][c]) {
        setBoard(prev => {
          const nb = [...prev];
          nb[r] = [...nb[r]];
          nb[r][c] = num;
          return nb;
        });
        setNotes(prev => {
           const nn = [...prev];
           nn[r] = [...nn[r]];
           nn[r][c] = [];
           return nn;
        });
      } else {
        setMistakes(m => m + 1);
        if (mistakes >= 2) {
           // Opsiyonel: Oyun bitti mantığı eklenebilir, şimdilik sadece sayaç
        }
      }
    }
  }, [selectedCell, gameState, initialBoard, isPencilMode, board, solution, mistakes]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key >= "1" && e.key <= "9") handleCellInput(parseInt(e.key));
      if (e.key === "Backspace") {
        if (!selectedCell) return;
        const { r, c } = selectedCell;
        if (!initialBoard[r][c]) {
           setBoard(prev => { const nb = [...prev]; nb[r][c] = null; return nb; });
           setNotes(prev => { const nn = [...prev]; nn[r][c] = []; return nn; });
        }
      }
      if (e.key.startsWith("Arrow")) {
        setSelectedCell(prev => {
           if (!prev) return { r: 4, c: 4 };
           let { r, c } = prev;
           if (e.key === "ArrowUp") r = (r + 8) % 9;
           if (e.key === "ArrowDown") r = (r + 1) % 9;
           if (e.key === "ArrowLeft") c = (c + 8) % 9;
           if (e.key === "ArrowRight") c = (c + 1) % 9;
           return { r, c };
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, handleCellInput, selectedCell, initialBoard]);

  useEffect(() => {
    if (gameState === "playing" && board.length > 0) {
      const isComplete = board.every((row, ri) => row.every((cell, ci) => cell === solution[ri][ci]));
      if (isComplete) {
        setGameState("victory");
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
      }
    }
  }, [board, solution, gameState]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // ---------------------------------------------------------
  // INLINE STYLES - GUARANTEED LAYOUT
  // ---------------------------------------------------------
  const styles = {
    container: { width: "100%", maxWidth: "500px", margin: "0 auto", padding: "10px", boxSizing: "border-box" as const, fontFamily: "sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    infoGroup: { display: "flex", gap: "10px" },
    statBox: { background: "#1e293b", padding: "8px 12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" },
    statTitle: { fontSize: "10px", fontWeight: 900, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "1px" },
    statValue: { fontSize: "16px", fontWeight: 900, color: "#fff", fontFamily: "monospace" },
    iconBtn: { background: "#1e293b", border: "1px solid rgba(255,255,255,0.05)", color: "#fff", padding: "10px", borderRadius: "12px", cursor: "pointer" },
    
    boardOuter: { position: "relative" as const, background: "#475569", padding: "4px", borderRadius: "12px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", width: "100%", aspectRatio: "1/1", boxSizing: "border-box" as const },
    grid: { display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gridTemplateRows: "repeat(9, 1fr)", height: "100%", width: "100%", gap: "1px", background: "#334155" },
    
    cell: (r: number, c: number) => {
      const isSelected = selectedCell?.r === r && selectedCell?.c === c;
      const isRelated = selectedCell && (selectedCell.r === r || selectedCell.c === c || (Math.floor(selectedCell.r / 3) === Math.floor(r / 3) && Math.floor(selectedCell.c / 3) === Math.floor(c / 3)));
      const isMatch = selectedCell && board[selectedCell.r]?.[selectedCell.c] !== null && board[selectedCell.r][selectedCell.c] === board[r][c];
      const isInitial = initialBoard[r][c];

      let bg = "#1e293b";
      if (isSelected) bg = "#3b82f6";
      else if (isMatch) bg = "rgba(59, 130, 246, 0.4)";
      else if (isRelated) bg = "rgba(255, 255, 255, 0.05)";

      // Borders for 3x3
      const borderR = (c % 3 === 2 && c !== 8) ? "2px solid #64748b" : "1px solid rgba(255,255,255,0.05)";
      const borderB = (r % 3 === 2 && r !== 8) ? "2px solid #64748b" : "1px solid rgba(255,255,255,0.05)";

      return {
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: 900,
        color: isInitial ? "#94a3b8" : "#60a5fa",
        cursor: "pointer",
        position: "relative" as const,
        borderRight: borderR,
        borderBottom: borderB,
        transition: "all 0.1s"
      };
    },
    
    notesGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", width: "100%", height: "100%", padding: "2px" },
    note: { fontSize: "9px", color: "#64748b", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
    
    controls: { marginTop: "24px", display: "flex", flexDirection: "column" as const, gap: "16px" },
    numPad: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" },
    numBtn: { 
      background: "#1e293b", 
      border: "none", 
      color: "#fff", 
      height: "50px", 
      borderRadius: "12px", 
      fontSize: "20px", 
      fontWeight: 900, 
      cursor: "pointer", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      boxShadow: "0 4px 0 #0f172a",
      transform: "translateY(-4px)",
      transition: "all 0.1s"
    },
    clearBtn: { gridColumn: "span 1", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "10px", fontWeight: 900, boxShadow: "0 4px 0 rgba(239, 68, 68, 0.3)" },
    
    pencilBtn: { 
      width: "100%", 
      background: isPencilMode ? "#3b82f6" : "#1e293b", 
      border: "none", 
      color: "#fff", 
      padding: "12px", 
      borderRadius: "12px", 
      fontWeight: 900, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      gap: "10px", 
      cursor: "pointer", 
      transition: "all 0.2s",
      boxShadow: isPencilMode ? "0 4px 0 #1d4ed8" : "0 4px 0 #0f172a",
      transform: "translateY(-4px)"
    },
    
    overlay: { position: "absolute" as const, inset: 0, background: "rgba(15, 23, 42, 0.95)", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", zIndex: 100, borderRadius: "8px" },
    victoryTitle: { fontSize: "32px", fontWeight: 900, color: "#60a5fa", marginBottom: "8px" },
    victoryDesc: { fontSize: "14px", color: "#94a3b8", marginBottom: "24px" }
  };

  if (gameState === "selecting") {
    return (
      <div className="calc-wrapper animate-fade-in flex flex-col items-center py-12">
        <div className="w-20 h-20 bg-accent-glow rounded-[2rem] flex items-center justify-center text-accent-primary mb-6 animate-pulse">
           <Hash size={40} />
        </div>
        <h2 className="text-2xl font-black mb-2">Sudoku Premium</h2>
        <p className="text-muted text-sm mb-12 text-center max-w-[300px]">Zekanızı test edin. Tamamen tarayıcı üzerinde üretilen benzersiz bulmacalar.</p>
        
        <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
          {[
            { id: "easy", label: "KOLAY", color: "text-green-500", shadow: "shadow-[0_6px_0_rgb(22,163,74)]", bg: "bg-green-500/10" },
            { id: "medium", label: "ORTA", color: "text-orange-500", shadow: "shadow-[0_6px_0_rgb(234,88,12)]", bg: "bg-orange-500/10" },
            { id: "hard", label: "ZOR", color: "text-red-500", shadow: "shadow-[0_6px_0_rgb(220,38,38)]", bg: "bg-red-500/10" }
          ].map((d) => (
            <button 
              key={d.id}
              onClick={() => startNewGame(d.id as Difficulty)}
              className={`p-6 rounded-3xl border-2 border-transparent flex items-center justify-between group active:translate-y-1 active:shadow-none transition-all ${d.bg} ${d.color} ${d.shadow} -translate-y-1.5`}
            >
              <span className="font-black tracking-widest">{d.label}</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.infoGroup}>
           <div style={styles.statBox}>
              <Timer size={14} style={{ color: "#60a5fa" }} />
              <span style={styles.statValue}>{formatTime(seconds)}</span>
           </div>
           <div style={styles.statBox}>
              <span style={styles.statTitle}>Hata</span>
              <span style={{ ...styles.statValue, color: mistakes > 2 ? "#ef4444" : "#fff" }}>{mistakes}/3</span>
           </div>
        </div>
        <button style={styles.iconBtn} onClick={() => setGameState("selecting")}>
          <RotateCcw size={18} />
        </button>
      </div>

      {/* BOARD */}
      <div style={styles.boardOuter}>
        <div style={styles.grid}>
          {board.flatMap((row, r) => 
            row.map((cell, c) => (
              <div 
                key={`${r}-${c}`} 
                style={styles.cell(r, c)}
                onClick={() => setSelectedCell({ r, c })}
              >
                {cell !== null ? String(cell) : (
                  <div style={styles.notesGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                      <div key={n} style={styles.note}>
                        {notes[r][c].includes(n) ? n : ""}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {gameState === "victory" && (
           <div style={styles.overlay}>
              <CheckCircle2 size={64} style={{ color: "#60a5fa", marginBottom: "16px" }} />
              <h3 style={styles.victoryTitle}>MÜKEMMEL!</h3>
              <p style={styles.victoryDesc}>Bulmacayı {formatTime(seconds)} sürede çözdünüz.</p>
              <button 
                onClick={() => setGameState("selecting")} 
                className="btn-primary"
                style={{ padding: "14px 32px" }}
              >
                YENİ OYUN
              </button>
           </div>
        )}
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
         <button 
           style={styles.pencilBtn}
           onClick={() => setIsPencilMode(!isPencilMode)}
         >
           <PenTool size={18} />
           NOT MODU: {isPencilMode ? 'AÇIK' : 'KAPALI'}
         </button>

         <div style={styles.numPad}>
           {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
             <button 
               key={num} 
               className="btn-3d-key"
               style={{ ...styles.numBtn, transform: undefined, boxShadow: undefined, border: undefined }} 
               onClick={() => handleCellInput(num)}
             >
               {num}
             </button>
           ))}
           <button 
             className="btn-3d-key"
             style={{ ...styles.numBtn, ...styles.clearBtn, transform: undefined, boxShadow: undefined, border: undefined }}
             onClick={() => {
               if (!selectedCell) return;
               const { r, c } = selectedCell;
               if (!initialBoard[r][c]) {
                  setBoard(prev => { const nb = [...prev]; nb[r][c] = null; return nb; });
                  setNotes(prev => { const nn = [...prev]; nn[r][c] = []; return nn; });
               }
             }}
           >
             SİL
           </button>
         </div>
      </div>

      <div className="calc-info-box mt-8">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text text-white">
          <b>İpucu:</b> Seçili hücrenin ilgili alanları ve aynı rakamlar otomatik olarak vurgulanır. Klavye rakamlarını veya yön tuşlarını kullanarak daha hızlı oynayabilirsiniz.
        </span>
      </div>
    </div>
  );
}
