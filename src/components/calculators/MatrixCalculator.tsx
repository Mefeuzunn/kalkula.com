"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type Matrix = number[][];

export function MatrixCalculator() {
  const [size, setSize] = useState<2 | 3>(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "detA" | "invA" | "transA">("add");
  const [result, setResult] = useState<Matrix | number | string | null>(null);
  const [detSteps, setDetSteps] = useState<string[]>([]);

  useEffect(() => {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrixA(newMatrix);
    setMatrixB(newMatrix);
    setResult(null);
    setDetSteps([]);
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

  const calculateDet = (m: Matrix): { val: number; steps: string[] } => {
    if (m.length === 2) {
      const val = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      const steps = [`det(A) = (${m[0][0]} * ${m[1][1]}) - (${m[0][1]} * ${m[1][0]}) = ${val}`];
      return { val, steps };
    }
    // 3x3 Sarrus/Laplace
    const a = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]);
    const b = m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]);
    const c = m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    const val = a - b + c;
    const steps = [
      `det(A) = a₁₁(a₂₂a₃₃ - a₂₃a₃₂) - a₁₂(a₂₁a₃₃ - a₂₃a₃₁) + a₁₃(a₂₁a₃₂ - a₂₂a₃₁)`,
      `= ${m[0][0]}(${m[1][1]}*${m[2][2]} - ${m[1][2]}*${m[2][1]}) - ${m[0][1]}(${m[1][0]}*${m[2][2]} - ${m[1][2]}*${m[2][0]}) + ${m[0][2]}(${m[1][0]}*${m[2][1]} - ${m[1][1]}*${m[2][0]})`,
      `= ${a.toFixed(2)} - ${b.toFixed(2)} + ${c.toFixed(2)} = ${val.toFixed(2)}`
    ];
    return { val, steps };
  };

  const getInverse3x3 = (m: Matrix): Matrix | null => {
    const { val: det } = calculateDet(m);
    if (det === 0) return null;

    const res: Matrix = Array(3).fill(0).map(() => Array(3).fill(0));
    
    // Adjoint calculation
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Minor elements
        const sub: number[] = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (r !== i && c !== j) sub.push(m[r][c]);
          }
        }
        const minor = sub[0] * sub[3] - sub[1] * sub[2];
        const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * minor;
        res[j][i] = cofactor / det; // Transpose here
      }
    }
    return res;
  };

  const calculate = () => {
    try {
      setDetSteps([]);
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
        const { val, steps } = calculateDet(matrixA);
        setResult(val);
        setDetSteps(steps);
      } else if (operation === "invA") {
        const { val: det } = calculateDet(matrixA);
        if (det === 0) {
          setResult("Matris Tekil (Tersi Yok)");
          return;
        }
        if (size === 2) {
          setResult([
            [matrixA[1][1] / det, -matrixA[0][1] / det],
            [-matrixA[1][0] / det, matrixA[0][0] / det]
          ]);
        } else {
          setResult(getInverse3x3(matrixA));
        }
      } else if (operation === "transA") {
        const res = Array(size).fill(0).map((_, i) => Array(size).fill(0).map((_, j) => matrixA[j][i]));
        setResult(res);
      }

      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#3b82f6", "#6366f1", "#ffffff"]
      });
    } catch (e) {
      setResult("Hata: " + (e as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-secondary/5 p-6 rounded-[2.5rem] border border-border shadow-sm">
         <div className="flex bg-secondary/15 p-1 rounded-2xl gap-1">
            <button onClick={() => setSize(2)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${size === 2 ? 'bg-surface text-primary shadow-lg shadow-blue-500/5' : 'text-muted hover:text-primary'}`}>2x2</button>
            <button onClick={() => setSize(3)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${size === 3 ? 'bg-surface text-primary shadow-lg shadow-blue-500/5' : 'text-muted hover:text-primary'}`}>3x3</button>
         </div>
         
         <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={operation} 
              onChange={(e: any) => setOperation(e.target.value)} 
              className="bg-surface border border-border rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:border-blue-500/30 transition-all shadow-sm"
            >
              <optgroup label="İki Matris">
                <option value="add">Toplama (A+B)</option>
                <option value="sub">Çıkarma (A-B)</option>
                <option value="mul">Çarpma (AxB)</option>
              </optgroup>
              <optgroup label="Tek Matris (A)">
                <option value="detA">Determinant (detA)</option>
                <option value="invA">Ters Matris (A⁻¹)</option>
                <option value="transA">Devrik (Aᵀ)</option>
              </optgroup>
            </select>
            
            <button 
              onClick={calculate} 
              className="bg-primary text-surface px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
               Hesapla
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Areas */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className={`panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-blue-500/10 transition-all ${operation.endsWith('A') ? 'md:col-span-2 max-w-xl mx-auto w-full' : ''}`}>
              <div className="flex items-center justify-between mb-8 px-2">
                 <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] italic font-mono">Matris A</h4>
                 <div className="flex gap-1">
                    {[...Array(size)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-blue-500/30" />)}
                 </div>
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                 {matrixA.map((row, r) => row.map((val, c) => (
                    <input 
                      key={`A-${r}-${c}`} 
                      type="number" 
                      value={val} 
                      onChange={e => updateMatrix("A", r, c, e.target.value)} 
                      className="input-field !text-center !py-4 font-black !text-lg bg-surface border-2 border-border/50 focus:border-blue-500/50 hover:border-blue-500/20"
                    />
                 )))}
              </div>
           </div>

           {(!operation.endsWith('A')) && (
              <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-indigo-500/10 transition-all">
                 <div className="flex items-center justify-between mb-8 px-2">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] italic font-mono">Matris B</h4>
                    <div className="flex gap-1">
                       {[...Array(size)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-indigo-500/30" />)}
                    </div>
                 </div>
                 <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                    {matrixB.map((row, r) => row.map((val, c) => (
                       <input 
                         key={`B-${r}-${c}`} 
                         type="number" 
                         value={val} 
                         onChange={e => updateMatrix("B", r, c, e.target.value)} 
                         className="input-field !text-center !py-4 font-black !text-lg bg-surface border-2 border-border/50 focus:border-indigo-500/50 hover:border-indigo-500/20"
                       />
                    )))}
                 </div>
              </div>
           )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           {result !== null ? (
              <div className="result-container-premium !animate-none h-full flex flex-col gap-6">
                 <div className="result-card-premium !p-10 bg-surface border-4 border-blue-500/10 shadow-2xl relative flex flex-col items-center justify-center text-center overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.5em] uppercase rotate-12">Matrix Core v2.1</div>
                    
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10 italic">İşlem Sonucu</span>

                    {Array.isArray(result) ? (
                       <div className="grid gap-4 w-full" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                          {(result as Matrix).map((row, r) => row.map((val, c) => (
                             <div key={`R-${r}-${c}`} className="aspect-square flex items-center justify-center p-2 bg-blue-500/5 border-2 border-blue-500/10 rounded-2xl text-xl font-black text-primary italic shadow-inner">
                                {typeof val === 'number' ? val.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : val}
                             </div>
                          )))}
                       </div>
                    ) : (
                       <div className="flex flex-col items-center gap-4">
                          <div className="text-6xl font-black italic tracking-tighter text-blue-600 drop-shadow-sm">
                             {typeof result === 'number' ? result.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : result}
                          </div>
                          {detSteps.length > 0 && (
                            <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                               {detSteps.map((step, i) => (
                                  <div key={i} className="text-[9px] font-mono font-bold text-muted bg-secondary/10 py-2 px-3 rounded-lg border border-border/50 text-left">
                                     {step}
                                  </div>
                               ))}
                            </div>
                          )}
                       </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-border/40 w-full">
                        <div className="flex justify-center gap-2 mb-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                        </div>
                        <p className="text-[9px] font-black text-muted uppercase tracking-[0.3em] italic">Precision Algebra Engine</p>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[3rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center min-h-[400px]">
                 <div className="w-20 h-20 border-4 border-muted/20 rounded-2xl flex items-center justify-center text-4xl mb-6 rotate-12">🧮</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.4em] italic leading-relaxed">
                    SONUÇ BURADA<br/>LİSTELENECEK
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
