"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Text, 
  Float, 
  MeshDistortMaterial, 
  Stars, 
  PerspectiveCamera, 
  Environment,
  PresentationControls,
  ContactShadows,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, Minimize2, Palette, Zap, Battery, Calendar as CalendarIcon, Clock } from "lucide-react";

// --- Sub-components for 3D Clock ---

function Digit({ value, position, color }: { value: string, position: [number, number, number], color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        font="/fonts/Inter-Bold.woff" // Fallback to system font if not found, but Drei handled this well usually
        fontSize={1.5}
        color={color}
        position={position}
        anchorX="center"
        anchorY="middle"
      >
        {value}
        <meshStandardMaterial 
          emissive={color} 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </Text>
    </Float>
  );
}

function AnimatedBackground({ theme }: { theme: string }) {
  const starsRef = useRef<any>(null);
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <>
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color={theme === 'neon' ? '#ff00ff' : '#ffffff'} />
    </>
  );
}

// --- Main Standby Clock Component ---

export function StandbyClock() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<'neon' | 'minimal' | 'gold'>('neon');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const themeColors = {
    neon: "#00f2ff",
    minimal: "#ffffff",
    gold: "#ffcc00"
  };

  const hourStr = time.getHours().toString().padStart(2, '0');
  const minStr = time.getMinutes().toString().padStart(2, '0');
  const secStr = time.getSeconds().toString().padStart(2, '0');

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[600px] overflow-hidden rounded-3xl bg-black border border-white/10 group transition-all duration-700 ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none h-screen' : ''}`}
    >
      {/* 3D Scene */}
      <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <AnimatedBackground theme={theme} />
        
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <group position={[0, 0, 0]}>
            {/* Hours */}
            <Digit value={hourStr[0]} position={[-2.2, 0, 0]} color={themeColors[theme]} />
            <Digit value={hourStr[1]} position={[-1.2, 0, 0]} color={themeColors[theme]} />
            
            {/* Colon */}
            <Text position={[-0.45, 0, 0]} fontSize={1} color={themeColors[theme]} fillOpacity={time.getSeconds() % 2 === 0 ? 1 : 0.2}>:</Text>
            
            {/* Minutes */}
            <Digit value={minStr[0]} position={[0.3, 0, 0]} color={themeColors[theme]} />
            <Digit value={minStr[1]} position={[1.3, 0, 0]} color={themeColors[theme]} />

            {/* Seconds (Smaller) */}
            <group position={[2.4, -0.4, 0]} scale={0.4}>
               <Digit value={secStr[0]} position={[0, 0, 0]} color={themeColors[theme]} />
               <Digit value={secStr[1]} position={[1, 0, 0]} color={themeColors[theme]} />
            </group>
          </group>
        </PresentationControls>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute top-8 left-8 flex flex-col gap-1 pointer-events-none">
        <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Standby Mode</div>
        <div className="text-white text-xl font-bold flex items-center gap-2">
           <CalendarIcon className="w-4 h-4 text-accent-primary" />
           {time.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 flex items-center gap-6 pointer-events-none">
         <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="text-white/60 text-[10px] font-bold uppercase">Charging / PC Active</span>
         </div>
         <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-white/60 text-[10px] font-bold uppercase">Power Optimized</span>
         </div>
      </div>

      {/* Controls */}
      <div className="absolute top-8 right-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setTheme(t => t === 'neon' ? 'gold' : t === 'gold' ? 'minimal' : 'neon')}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
          title="Temayı Değiştir"
        >
          <Palette className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
          title={isFullscreen ? "Çık" : "Tam Ekran"}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Exit hint for fullscreen */}
      {isFullscreen && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-pulse-slow">
            <div className="bg-black/80 px-6 py-3 rounded-full border border-white/20 text-white/40 text-[10px] uppercase font-black tracking-widest backdrop-blur-xl">
               ESC tuşu ile çıkabilirsiniz
            </div>
         </div>
      )}

      {/* Dark Overlay gradient for edges */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-60"></div>
    </div>
  );
}
