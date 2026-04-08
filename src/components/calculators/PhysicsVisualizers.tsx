"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Rocket, Info, RotateCcw, Activity, Play, Gauge, Ruler, Clock, Zap, Target } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
    const scale = 5; 
    
    const x = velocity * Math.cos(rad) * t * scale;
    const y = (velocity * Math.sin(rad) * t - 0.5 * gravity * t * t) * scale;
    
    ctx.beginPath();
    ctx.arc(50 + x, 350 - y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;
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
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
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

  const reset = () => {
    setVelocity(50);
    setAngle(45);
    setGravity(9.8);
    setIsAnimating(false);
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#3b82f6"] });
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const canvas = canvasRef.current;
    if (canvas) {
       const ctx = canvas.getContext("2d");
       if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <V2CalculatorWrapper
      title="EĞİK ATIŞ SİMÜLATÖRÜ"
      icon="🚀"
      infoText="Hız, açı ve yerçekimi parametrelerini ayarlayarak mermi yolunu görselleştirin. Menzil, maksimum yükseklik ve uçuş süresini anlık analiz edin."
      results={stats && (
        <div className="space-y-6 animate-result">
           <div className="p-4 rounded-[2.5rem] bg-black/40 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-4 left-6 flex flex-col gap-0 z-10">
                 <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">YÖRÜNGE ANALİZİ</div>
                 <div className="text-[8px] text-muted uppercase font-bold tracking-widest opacity-50">V2.0 HIGH-FIDELITY PROJECTILE</div>
              </div>
              <canvas 
                 ref={canvasRef} 
                 width={800} 
                 height={400} 
                 className="w-full h-auto mt-6 rounded-2xl cursor-crosshair bg-white/[0.02]"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <V2ResultCard 
                color="blue" 
                label="MENZİL (X)" 
                value={stats.range.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
                unit="Metre"
                icon="📏"
                subLabel="Yatayda Katedilen Yol"
              />
              <V2ResultCard 
                color="emerald" 
                label="MAKS. YÜKSEKLİK (H)" 
                value={stats.maxHeight.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} 
                unit="Metre"
                icon="🏔️"
                subLabel="Dikeyde En Tepe Nokta"
              />
              <V2ResultCard 
                color="purple" 
                label="UÇUŞ SÜRESİ (T)" 
                value={stats.time.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} 
                unit="Saniye"
                icon="⏱️"
                subLabel="Havadaki Toplam Zaman"
              />
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-10">
           <div className="space-y-6">
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5">
                 <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4 text-blue-500" />
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest">İLK HIZ (V₀)</span>
                    </div>
                    <span className="text-sm font-black italic text-blue-500">{velocity} m/s</span>
                 </div>
                 <input 
                   type="range" min="10" max="100" value={velocity} 
                   onChange={e => setVelocity(parseInt(e.target.value))} 
                   className="w-full accent-blue-600 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                 />
              </div>

              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5">
                 <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                       <Target className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest">FIRLATMA AÇISI (Θ)</span>
                    </div>
                    <span className="text-sm font-black italic text-emerald-500">{angle}°</span>
                 </div>
                 <input 
                   type="range" min="1" max="89" value={angle} 
                   onChange={e => setAngle(parseInt(e.target.value))} 
                   className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                 />
              </div>

              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5">
                 <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                       <Activity className="w-4 h-4 text-purple-500" />
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest">YERÇEKİMİ (G)</span>
                    </div>
                    <span className="text-sm font-black italic text-purple-500">{gravity} m/s²</span>
                 </div>
                 <input 
                   type="range" min="1" max="25" step="0.1" value={gravity} 
                   onChange={e => setGravity(parseFloat(e.target.value))} 
                   className="w-full accent-purple-600 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                 />
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <button 
                onClick={startSimulation}
                disabled={isAnimating}
                className={`w-full py-6 rounded-3xl font-black italic flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${
                  isAnimating 
                  ? "bg-white/5 text-muted border border-white/10 opacity-50 cursor-not-allowed" 
                  : "bg-blue-600 text-white border-b-4 border-blue-800 hover:bg-blue-500 shadow-blue-500/20"
                }`}
              >
                 {isAnimating ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                 {isAnimating ? "SİMÜLASYON YÜRÜTÜLÜYOR..." : "SİMÜLASYONU BAŞLAT"}
              </button>
              
              <V2ActionRow onCalculate={() => {}} onReset={reset} isCalculateDisabled={true} showCalculate={false} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Target className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">BALİSTİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Hassas koordinat takibi</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Activity className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">KİNETİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anlık enerji transferi</div>
              </div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Fizik Notu:</b> Eğik atış, yerçekimi ivmesi altında gerçekleşen iki boyutlu bir harekettir. Bu simülatörde hava sürtünmesi (drag) ihmal edilmiştir ve cisim noktasal kabul edilmiştir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
