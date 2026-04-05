"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export function PhysicsVisualizers() {
  const [velocity, setVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const [stats, setStats] = useState<{
    range: number;
    maxHeight: number;
    time: number;
  } | null>(null);

  const calculateStats = () => {
    const rad = (angle * Math.PI) / 180;
    const tFlight = (2 * velocity * Math.sin(rad)) / gravity;
    const range = (Math.pow(velocity, 2) * Math.sin(2 * rad)) / gravity;
    const hMax = (Math.pow(velocity, 2) * Math.pow(Math.sin(rad), 2)) / (2 * gravity);

    setStats({
      range,
      maxHeight: hMax,
      time: tFlight
    });
  };

  const drawTrajectory = (ctx: CanvasRenderingContext2D, t: number) => {
    const rad = (angle * Math.PI) / 180;
    const scale = 5; // Scaling for visualization
    
    const x = velocity * Math.cos(rad) * t * scale;
    const y = (velocity * Math.sin(rad) * t - 0.5 * gravity * t * t) * scale;
    
    ctx.beginPath();
    ctx.arc(50 + x, 350 - y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
    ctx.closePath();
  };

  const startSimulation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    calculateStats();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    const rad = (angle * Math.PI) / 180;
    const tTotal = (2 * velocity * Math.sin(rad)) / gravity;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Ground
      ctx.strokeStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(canvas.width, 350);
      ctx.stroke();

      // Draw Path Trace
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      for (let i = 0; i <= t; i += 0.05) {
        const px = velocity * Math.cos(rad) * i * 5;
        const py = (velocity * Math.sin(rad) * i - 0.5 * gravity * i * i) * 5;
        if (i === 0) ctx.moveTo(50 + px, 350 - py);
        else ctx.lineTo(50 + px, 350 - py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      drawTrajectory(ctx, t);

      t += 0.05;
      if (t <= tTotal) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        confetti({
          particleCount: 20,
          spread: 30,
          origin: { y: 0.8 },
          colors: ["#3b82f6", "#1e40af"]
        });
      }
    };

    animate();
  };

  useEffect(() => {
    calculateStats();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [velocity, angle, gravity]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono">İlk Hız (v₀): {velocity} m/s</label>
                 <input type="range" min="10" max="100" value={velocity} onChange={e => setVelocity(parseInt(e.target.value))} className="w-full accent-blue-600 cursor-pointer h-2 bg-secondary/20 rounded-lg appearance-none"/>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono">Fırlatma Açısı (θ): {angle}°</label>
                 <input type="range" min="1" max="89" value={angle} onChange={e => setAngle(parseInt(e.target.value))} className="w-full accent-blue-600 cursor-pointer h-2 bg-secondary/20 rounded-lg appearance-none"/>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono">Yerçekimi (g): {gravity} m/s²</label>
                 <input type="range" min="1" max="25" step="0.1" value={gravity} onChange={e => setGravity(parseFloat(e.target.value))} className="w-full accent-blue-600 cursor-pointer h-2 bg-secondary/20 rounded-lg appearance-none"/>
              </div>

              <button 
                 onClick={startSimulation}
                 disabled={isAnimating}
                 className={`w-full py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${isAnimating ? 'bg-secondary/40 text-muted opacity-50' : 'bg-primary text-surface hover:scale-[1.02] shadow-xl hover:shadow-blue-500/20'}`}
              >
                 <span className="text-xl">🚀</span> {isAnimating ? 'SİMÜLASYON SÜRÜYOR' : 'SİMÜLASYONU BAŞLAT'}
              </button>
           </div>
        </div>

        {/* Visualizer & Stats */}
        <div className="lg:col-span-8 flex flex-col gap-4 h-full">
           <div className="panel p-6 bg-surface border-4 border-primary/5 rounded-[3rem] shadow-2xl relative overflow-hidden min-h-[450px]">
              <div className="absolute top-6 left-10 flex flex-col gap-1 z-10">
                 <h3 className="text-xl font-black italic tracking-tighter text-primary uppercase">Eğik Atış Simülatörü</h3>
                 <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">Kinetik Yörünge Analizi v2.0</p>
              </div>

              <canvas 
                 ref={canvasRef} 
                 width={800} 
                 height={400} 
                 className="w-full h-auto mt-10 rounded-2xl cursor-crosshair"
              />

              {stats && (
                 <div className="grid grid-cols-3 gap-6 mt-8 border-t border-border pt-8 px-6">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-muted uppercase italic tracking-widest mb-1">Menzil (X)</span>
                       <span className="text-xl font-black text-blue-600 tracking-tighter">{stats.range.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} m</span>
                    </div>
                    <div className="flex flex-col border-l border-border px-6">
                       <span className="text-[9px] font-black text-muted uppercase italic tracking-widest mb-1">Maks. Yükseklik (H)</span>
                       <span className="text-xl font-black text-blue-600 tracking-tighter">{stats.maxHeight.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} m</span>
                    </div>
                    <div className="flex flex-col border-l border-border px-6">
                       <span className="text-[9px] font-black text-muted uppercase italic tracking-widest mb-1">Uçuş Süresi (t)</span>
                       <span className="text-xl font-black text-blue-600 tracking-tighter">{stats.time.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} s</span>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
