"use client";

import React, { useState, useEffect } from "react";
import { Maximize2, Minimize2, Battery, Zap } from "lucide-react";

export function StandbyClock() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  // Clock calculations
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDegrees = (seconds / 60) * 360;
  const minDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  // Calendar calculations
  const monthNames = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];
  const dayNamesShort = ["P", "S", "Ç", "P", "C", "C", "P"];
  
  const currentMonth = time.getMonth();
  const currentYear = time.getFullYear();
  const today = time.getDate();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust for Monday start: 0 (Sun) becomes 6, 1 (Mon) becomes 0
  const adjustedStartDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < adjustedStartDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Generate ticks for clock
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const rotate = i * 6;
    const isMajor = i % 5 === 0;
    return (
      <div 
        key={i} 
        className="absolute bottom-1/2 left-1/2 w-[2px] origin-bottom"
        style={{ 
          height: isMajor ? '12px' : '6px',
          transform: `translateX(-50%) rotate(${rotate}deg) translateY(-85px)`,
          backgroundColor: isMajor ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'
        }}
      />
    );
  });

  // Generate numbers for clock
  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
    const angle = i * 30;
    return (
      <div 
        key={num}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-8 text-center text-xl font-bold text-white flex items-start justify-center"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <span style={{ transform: `rotate(${-angle}deg)`, display: 'inline-block' }}>{num}</span>
      </div>
    );
  });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[500px] overflow-hidden rounded-[40px] bg-black group transition-all duration-700 flex items-center justify-center ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none h-screen' : ''}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 px-12 w-full max-w-6xl">
        
        {/* Analog Clock Face */}
        <div className="relative w-64 h-64 flex-shrink-0">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          {/* Ticks & Numbers */}
          <div className="absolute inset-0">{ticks}</div>
          <div className="absolute inset-0">{numbers}</div>

          {/* Hands */}
          {/* Hour Hand */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[6px] h-16 bg-white rounded-full origin-bottom -translate-x-1/2 transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
          ></div>
          
          {/* Minute Hand */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[4px] h-24 bg-white rounded-full origin-bottom -translate-x-1/2 transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-50%) rotate(${minDegrees}deg)` }}
          ></div>
          
          {/* Second Hand (Orange) */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-[2px] h-[110px] bg-[#ff9500] origin-bottom -translate-x-1/2 transition-transform duration-100 ease-linear"
            style={{ transform: `translateX(-50%) rotate(${secDegrees}deg)` }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff9500] rounded-full -translate-y-2 opacity-20 blur-sm"></div>
          </div>

          {/* Center Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff9500] rounded-full border-2 border-black z-10"></div>
        </div>

        {/* Calendar Side */}
        <div className="w-full md:w-[320px] select-none text-left">
           <h2 className="text-[#ff3b30] text-3xl font-black mb-6 tracking-tighter uppercase">
             {monthNames[currentMonth]}
           </h2>
           
           <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
              {dayNamesShort.map((day, idx) => (
                <div key={idx} className="text-white/40 text-xs font-black uppercase tracking-widest">{day}</div>
              ))}
              
              {days.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`text-xl font-bold flex items-center justify-center w-10 h-10 rounded-full transition-all ${day === today ? 'bg-[#ff3b30] text-white' : day ? 'text-white/90 hover:text-white' : ''}`}
                >
                  {day}
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Floating Status Bar (Apple style) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500">
         <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-[#34c759]" />
            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Charged</span>
         </div>
         <div className="w-[1px] h-4 bg-white/10"></div>
         <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Active</span>
         </div>
         <div className="w-[1px] h-4 bg-white/10"></div>
         <button 
           onClick={toggleFullscreen}
           className="text-white/60 hover:text-white transition-colors"
         >
           {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
         </button>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#ff3b30] rounded-full blur-[150px] opacity-10"></div>
         <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#5856d6] rounded-full blur-[150px] opacity-10"></div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
    </div>
  );
}
