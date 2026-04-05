"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type Matrix = number[][];

export function MatrixCalculator() {
  const [size, setSize] = useState<2 | 3>(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "detA" | "invA">("add");
  const [result, setResult] = useState<Matrix | number | string | null>(null);

  useEffect(() => {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrixA(newMatrix);
    setMatrixB(newMatrix);
    setResult(null);
  }, [size]);

  const updateMatrix = (m: "A" | "B", r: number, c: number, val: string) => {
    const num = parseFloat(val) || 0;
    if (m === "A") {
      const next = [...matrixA];
      next[r][c] = num;
      setMatrixA(next);
    } else {
      const next = [...matrixB];
      next[r][c] = num;
      setMatrixB(next);
    }
  };

  const calculateDet = (m: Matrix): number => {
    if (m.length === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    // 3x3 Sarrus
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  };

  const calculate = () => {
    try {
      if (operation === "add") {
        setResult(matrixA.map((r, i) => r.map((c, j) => c + matrixB[i][j])));
      } else if (operation === "sub") {
        setResult(matrixA.map((r, i) => r.map((c, j) => c - matrixB[i][j])));
      } else if (operation === "mul") {
        const res = Array(size).fill(0).map(() => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
              res[i][j] += matrixA[i][k] * matrixB[k][j];
            }
          }
        }
        setResult(res);
      } else if (operation === "detA") {
        setResult(calculateDet(matrixA));
      } else if (operation === "invA") {
        const det = calculateDet(matrixA);
        if (det === 0) {
          setResult("Determinant 0 (Tersi Yok)");
          return;
        }
        // Simplified inverse for 2x2 for demo, full for 3x3 is logic-heavy
        if (size === 2) {
          setResult([
            [matrixA[1][1]/det, -matrixA[0][1]/det],
            [-matrixA[1][0]/det, matrixA[0][0]/det]
          ]);
        } else {
           setResult("3x3 Ters Matris Yakında (v2.1)");
        }
      }

      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#3b82f6", "#6366f1"]
      });
    } catch (e) {
      setResult("Hata oluştu");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-4 justify-between items-center bg-secondary/5 p-6 rounded-[2rem] border border-border">
         <div className="flex bg-secondary/15 p-1 rounded-xl gap-1">
            <button onClick={() => setSize(2)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${size === 2 ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}>2x2</button>
            <button onClick={() => setSize(3)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${size === 3 ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}>3x3</button>
         </div>
         <select value={operation} onChange={(e: any) => setOperation(e.target.value)} className="bg-secondary/15 border-none rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
            <option value="add">Matris Toplama (A+B)</option>
            <option value="sub">Matris Çıkarma (A-B)</option>
            <option value="mul">Matris Çarpımı (AxB)</option>
            <option value="detA">Determinant (det A)</option>
            <option value="invA">Ters Matris (A⁻¹)</option>
         </select>
         <button onClick={calculate} className="bg-primary text-surface px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all">Hesapla</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Matrices */}
        <div className="flex flex-col gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem]">
                 <h4 className="text-[10px] font-black text-primary uppercase tracking-widest italic mb-6 px-2">Matris A</h4>
                 <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                    {matrixA.map((row, r) => row.map((val, c) => (
                       <input key={`A-${r}-${c}`} type="number" value={val} onChange={e => updateMatrix("A", r, c, e.target.value)} className="input-field !text-center !py-3 font-black"/>
                    )))}
                 </div>
              </div>

              {(operation === "add" || operation === "sub" || operation === "mul") && (
                 <div className="panel p-6 bg-secondary/5 border-border rounded-[2.5rem]">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest italic mb-6 px-2">Matris B</h4>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                       {matrixB.map((row, r) => row.map((val, c) => (
                          <input key={`B-${r}-${c}`} type="number" value={val} onChange={e => updateMatrix("B", r, c, e.target.value)} className="input-field !text-center !py-3 font-black"/>
                       )))}
                    </div>
                 </div>
              )}
           </div>
        </div>

        {/* Results Panel */}
        <div className="flex flex-col h-full min-h-[300px]">
           {result !== null ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 bg-surface border-4 border-primary/10 shadow-2xl h-full relative flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-primary tracking-[0.5em] uppercase rotate-12">Matrix Core v1.0</div>
                    
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8 bg-primary/5 px-6 py-2 rounded-full border border-primary/10 italic">İşlem Sonucu</span>

                    {Array.isArray(result) ? (
                       <div className="grid gap-4 w-full max-w-[280px]" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                          {(result as Matrix).map((row, r) => row.map((val, c) => (
                             <div key={`R-${r}-${c}`} className="aspect-square flex items-center justify-center p-4 bg-secondary/5 rounded-2xl border-2 border-border/50 text-xl font-black text-primary italic">
                                {typeof val === 'number' ? val.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : val}
                             </div>
                          )))}
                       </div>
                    ) : (
                       <div className="text-6xl font-black italic tracking-tighter text-primary">
                          {typeof result === 'number' ? result.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : result}
                       </div>
                    )}

                    <div className="mt-10 p-4 bg-secondary/5 rounded-2xl border border-border text-[9px] text-muted font-bold tracking-[0.2em] uppercase italic">
                       {size}x{size} BOYUTLU MATRİS ANALİZİ
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">🔳</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    MATRİS VERİLERİNİ GİRİN VE<br/>HESAPLA BUTONUNA BASIN
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
