"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export function StandbyClock() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for hands to update via direct DOM for performance (as in user snippet)
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateClock = () => {
      const now = new Date();
      setTime(now);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      const secondDeg = (seconds / 60 + milliseconds / 60000) * 360;
      const minuteDeg = (minutes / 60 + seconds / 3600) * 360;
      const hourDeg = ((hours % 12) / 12 + minutes / 720) * 360;

      if (secondHandRef.current) secondHandRef.current.style.transform = `translateX(-50%) rotateZ(${secondDeg}deg)`;
      if (minuteHandRef.current) minuteHandRef.current.style.transform = `translateX(-50%) rotateZ(${minuteDeg}deg)`;
      if (hourHandRef.current) hourHandRef.current.style.transform = `translateX(-50%) rotateZ(${hourDeg}deg)`;

      animationFrameId = requestAnimationFrame(updateClock);
    };

    updateClock();
    return () => cancelAnimationFrame(animationFrameId);
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

  // Calendar logic
  const ayIsimleri = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];
  const currentYear = time.getFullYear();
  const currentMonth = time.getMonth();
  const currentDay = time.getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let startDay = firstDayOfMonth.getDay();
  startDay = (startDay === 0) ? 6 : startDay - 1; 

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(<div key={`empty-${i}`} className="w-8 h-8 md:w-10 md:h-10 invisible" />);
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div 
        key={day} 
        className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl font-medium tracking-tight ${day === currentDay ? 'text-white z-10' : 'text-white/90'}`}
      >
        {day === currentDay && (
          <div className="absolute inset-0 bg-[#e31e24] rounded-full -z-10 scale-90 md:scale-100" />
        )}
        {day}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-[40px] bg-black border border-[#2c2c2e] group flex items-center justify-center transition-all duration-700 ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none h-screen border-none' : ''}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex flex-row items-center justify-center w-full max-w-5xl px-6 md:px-12 gap-8 md:gap-24">
        
        {/* Left Side: Analog Clock */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-white/[0.03] rounded-[40px] border border-white/5">
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            {/* Numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
              const positions: Record<number, string> = {
                1: "top-[5%] right-[28%]", 2: "top-[22%] right-[8%]", 3: "top-[46%] right-0",
                4: "top-[70%] right-[8%]", 5: "top-[87%] right-[28%]", 6: "bottom-0 left-1/2 -translate-x-1/2",
                7: "top-[87%] left-[28%]", 8: "top-[70%] left-[8%]", 9: "top-[46%] left-0",
                10: "top-[22%] left-[8%]", 11: "top-[5%] left-[28%]", 12: "top-0 left-1/2 -translate-x-1/2"
              };
              return (
                <div key={num} className={`absolute ${positions[num]} text-2xl md:text-4xl font-bold text-white leading-none`}>
                  {num}
                </div>
              );
            })}

            {/* Ticks */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div 
                key={i} 
                className={`absolute bottom-1/2 left-1/2 w-[1px] origin-bottom ${i % 5 === 0 ? 'h-[18px] w-[2px] bg-[#8e8e93]' : 'h-[10px] bg-[#636366]'}`}
                style={{ transform: `translateX(-50%) rotateZ(${i * 6}deg) translateY(-100%) translateY(-110px)` }}
              />
            ))}

            {/* Hands */}
            <div ref={hourHandRef} className="absolute bottom-1/2 left-1/2 w-2 h-20 md:h-24 bg-white rounded-full origin-bottom -translate-x-1/2 z-10" />
            <div ref={minuteHandRef} className="absolute bottom-1/2 left-1/2 w-1.5 h-28 md:h-36 bg-white rounded-full origin-bottom -translate-x-1/2 z-20" />
            <div ref={secondHandRef} className="absolute bottom-1/2 left-1/2 w-0.5 h-32 md:h-40 bg-[#ea5e1a] origin-bottom -translate-x-1/2 z-30" />
            
            {/* Axis */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#ea5e1a] rounded-full z-40" />
          </div>
        </div>

        {/* Right Side: Calendar */}
        <div className="w-[300px] md:w-[350px] bg-white/[0.02] rounded-[40px] p-6 md:p-8 flex flex-col border border-white/5">
          <div className="text-[#e31e24] text-xl md:text-2xl font-black mb-6 tracking-tighter uppercase">{ayIsimleri[currentMonth]} {currentYear}</div>
          
          <div className="grid grid-cols-7 gap-y-3 md:gap-y-4 text-center">
            {["P", "S", "Ç", "P", "C", "C", "P"].map((day, idx) => (
              <div key={idx} className="text-[#a0aec0] text-xs font-bold uppercase">{day}</div>
            ))}
            {calendarDays}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
    </div>
  );
}
