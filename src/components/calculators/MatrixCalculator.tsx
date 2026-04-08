"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Grid, Plus, Minus, X, Calculator, RefreshCcw, Info, Hash, Braces } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const sub: number[] = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (r !== i && c !== j) sub.push(m[r][c]);
          }
        }
        const minor = sub[0] * sub[3] - sub[1] * sub[2];
        const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * minor;
        res[j][i] = cofactor / det;
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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#6366f1", "#ffffff"]
      });
    } catch (e) {
      setResult("Hata");
    }
  };

  const reset = () => {
    const empty = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrixA(empty);
    setMatrixB(empty);
    setResult(null);
    setDetSteps([]);
  };

  return (
    <V2CalculatorWrapper
      title="MATRİS HESAPLAYICI"
      icon="📐"
      infoText="2x2 ve 3x3 matrisler üzerinde toplama, çarpma, determinant ve ters matris gibi lineer cebir işlemlerini gerçekleştirin."
      results={result !== null && (
        <div className="space-y-6 animate-result">
           <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic mb-8">İŞLEM SONUCU</div>
              
              {Array.isArray(result) ? (
                 <div 
                   className="grid gap-4 bg-black/20 p-6 rounded-[2rem] border border-white/5 shadow-inner" 
                   style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
                 >
                    {(result as Matrix).map((row, r) => row.map((val, c) => (
                       <div key={`R-${r}-${c}`} className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-indigo-100 italic shadow-xl">
                          {typeof val === 'number' ? val.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) : val}
                       </div>
                    )))}
                 </div>
              ) : (
                 <div className="flex flex-col items-center gap-6">
                    <V2ResultCard color="indigo" label="SKALER SONUÇ" value={typeof result === 'number' ? result.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) : result} icon="💡" className="!w-full max-w-sm" />
                    {detSteps.length > 0 && (
                      <div className="flex flex-col gap-2 w-full max-w-md">
                         {detSteps.map((step, i) => (
                            <div key={i} className="text-[10px] font-mono font-bold text-indigo-300/60 bg-white/5 py-3 px-4 rounded-xl border border-white/5 flex items-center gap-3">
                               <Hash className="w-3 h-3" /> {step}
                            </div>
                         ))}
                      </div>
                    )}
                 </div>
              )}
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex flex-wrap gap-4 items-center justify-between">
           <div className="flex bg-white/5 p-1 rounded-xl gap-1">
              <button onClick={() => setSize(2)} className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all ${size === 2 ? 'bg-indigo-500 text-white shadow-lg' : 'text-muted hover:text-white'}`}>2x2</button>
              <button onClick={() => setSize(3)} className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all ${size === 3 ? 'bg-indigo-500 text-white shadow-lg' : 'text-muted hover:text-white'}`}>3x3</button>
           </div>
           
           <div className="flex-1 min-w-[200px]">
              <V2Select 
                label="İŞLEM TİPİ" 
                value={operation} 
                onChange={setOperation} 
                options={[
                  { value: "add", label: "Toplama (A+B)" },
                  { value: "sub", label: "Çıkarma (A-B)" },
                  { value: "mul", label: "Çarpma (AxB)" },
                  { value: "detA", label: "Determinant (detA)" },
                  { value: "invA", label: "Ters Matris (A⁻¹)" },
                  { value: "transA", label: "Devrik (Aᵀ)" },
                ]}
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Matrix A */}
           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between px-2">
                 <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic flex items-center gap-2">
                    <Braces className="w-4 h-4" /> MATRİS A
                 </div>
              </div>
              <div 
                className="grid gap-4" 
                style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
              >
                 {matrixA.map((row, r) => row.map((val, c) => (
                    <div key={`A-${r}-${c}`} className="calc-input-key !p-0">
                       <input 
                         type="number" 
                         value={val} 
                         onChange={e => updateMatrix("A", r, c, e.target.value)} 
                         className="calc-input-field !text-center !py-5 font-black !text-xl bg-transparent focus:text-indigo-400"
                         placeholder="0"
                       />
                    </div>
                 )))}
              </div>
           </div>

           {/* Matrix B */}
           {!operation.endsWith('A') ? (
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 relative overflow-hidden">
                 <div className="flex items-center justify-between px-2">
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic flex items-center gap-2">
                       <Braces className="w-4 h-4" /> MATRİS B
                    </div>
                 </div>
                 <div 
                   className="grid gap-4" 
                   style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
                 >
                    {matrixB.map((row, r) => row.map((val, c) => (
                       <div key={`B-${r}-${c}`} className="calc-input-key !p-0">
                          <input 
                            type="number" 
                            value={val} 
                            onChange={e => updateMatrix("B", r, c, e.target.value)} 
                            className="calc-input-field !text-center !py-5 font-black !text-xl bg-transparent focus:text-indigo-400"
                            placeholder="0"
                          />
                       </div>
                    )))}
                 </div>
              </div>
           ) : (
              <div className="hidden md:flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-[2.5rem] opacity-20">
                 <Calculator className="w-16 h-16 mb-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Tek Matris İşlemi Seçildi</span>
              </div>
           )}
        </div>

        <V2ActionRow onCalculate={calculate} onReset={reset} calculateLabel="Lineer Hesapla" className="!mt-4" />
      </div>
    </V2CalculatorWrapper>
  );
}
