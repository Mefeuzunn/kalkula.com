"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

// Ortak Çevirici Şablonu (Premium, Live, Bidirectional)
interface Unit {
  id: string;
  name: string;
  multiplier: number; // Base unit'e göre çarpan
}

interface UniversalConverterProps {
  title: string;
  units: Record<string, Unit>;
  defaultLeft: string;
  defaultRight: string;
  customConverter?: (val: number, from: string, to: string) => number;
}

function UniversalConverter({ units, defaultLeft, defaultRight, customConverter }: UniversalConverterProps) {
  const [leftUnit, setLeftUnit] = useState(defaultLeft);
  const [rightUnit, setRightUnit] = useState(defaultRight);
  const [leftValue, setLeftValue] = useState<string>("1");
  const [rightValue, setRightValue] = useState<string>("");

  useEffect(() => {
    handleLeftChange("1", leftUnit, rightUnit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convert = (val: string, fromUnit: string, toUnit: string) => {
    if (val === "" || val === "-" || isNaN(Number(val))) return "";
    const numVal = parseFloat(val);
    let output = 0;

    if (customConverter) {
      output = customConverter(numVal, fromUnit, toUnit);
    } else {
      const inBase = numVal * units[fromUnit].multiplier;
      output = inBase / units[toUnit].multiplier;
    }

    let formatted = parseFloat(output.toPrecision(8)).toString();
    if (Math.abs(output) < 1e-8 && Math.abs(output) > 0) formatted = output.toExponential(4);
    return formatted;
  };

  const handleLeftChange = (val: string, lMode = leftUnit, rMode = rightUnit) => {
    setLeftValue(val);
    setRightValue(convert(val, lMode, rMode));
  };

  const handleRightChange = (val: string, lMode = leftUnit, rMode = rightUnit) => {
    setRightValue(val);
    setLeftValue(convert(val, rMode, lMode));
  };

  const swapUnits = () => {
    const tempL = leftUnit;
    const tempR = rightUnit;
    setLeftUnit(tempR);
    setRightUnit(tempL);
    handleLeftChange(leftValue, tempR, tempL);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#3b82f6", "#ffffff"] });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {/* Desktop Labels Row */}
        <div className="hidden lg:flex justify-between px-6">
          <label className="calc-input-label !mb-0 text-xs">{units[leftUnit].name.toUpperCase()}</label>
          <label className="calc-input-label !mb-0 text-xs text-right">{units[rightUnit].name.toUpperCase()}</label>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">
            
            {/* Left Input Block */}
            <div className="flex flex-col gap-2">
              <label className="calc-input-label lg:hidden px-2">{units[leftUnit].name.toUpperCase()}</label>
              <div className="calc-input-key">
                  <div className="bg-secondary/10 p-3 border-b border-border">
                    <select 
                        value={leftUnit} 
                        onChange={e => { setLeftUnit(e.target.value); handleLeftChange(leftValue, e.target.value, rightUnit); }} 
                        className="w-full bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none text-center"
                    >
                        {Object.values(units).map(u => <option key={u.id} value={u.id} className="bg-surface text-primary font-bold">{u.name}</option>)}
                    </select>
                  </div>
                  <input 
                    type="number" 
                    value={leftValue} 
                    onChange={e => handleLeftChange(e.target.value)} 
                    className="calc-input-field !text-5xl py-10"
                    placeholder="0"
                  />
              </div>
            </div>

            {/* Right Input Block */}
            <div className="flex flex-col gap-2">
              <label className="calc-input-label lg:hidden px-2 text-right">{units[rightUnit].name.toUpperCase()}</label>
              <div className="calc-input-key">
                  <div className="bg-secondary/10 p-3 border-b border-border">
                    <select 
                        value={rightUnit} 
                        onChange={e => { setRightUnit(e.target.value); handleLeftChange(leftValue, leftUnit, e.target.value); }} 
                        className="w-full bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none text-center"
                    >
                        {Object.values(units).map(u => <option key={u.id} value={u.id} className="bg-surface text-primary font-bold">{u.name}</option>)}
                    </select>
                  </div>
                  <input 
                    type="number" 
                    value={rightValue} 
                    onChange={e => handleRightChange(e.target.value)} 
                    className="calc-input-field !text-5xl py-10 text-accent-primary"
                    placeholder="0"
                  />
              </div>
            </div>
          </div>

          {/* Central 3D Swap Button - Guaranteed Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none">
             <button 
                onClick={swapUnits}
                className="calc-swap-glass group/swapbtn pointer-events-auto shadow-2xl"
                title="Birimleri Değiştir"
             >
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0 transition-all duration-500 group-hover/swapbtn:rotate-180 group-hover/swapbtn:scale-110"><path d="m7 16-4-4 4-4"/><path d="M3 12h18"/><path d="m17 8 4 4-4 4"/></svg>
                </div>
             </button>
          </div>
        </div>
      </div>

      <div className="panel p-8 bg-secondary/5 border-2 border-dashed border-border rounded-[2.5rem] text-center mt-6">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-4 block italic opacity-60">Dönüşüm Katsayısı</label>
        <div className="font-mono text-xl font-black text-primary tracking-tighter flex items-center justify-center gap-4">
          <span className="opacity-40 whitespace-nowrap">1 {units[leftUnit].id.toUpperCase()} =</span>
          <span className="text-4xl text-accent-primary italic drop-shadow-sm">{convert("1", leftUnit, rightUnit)}</span>
          <span className="opacity-40 whitespace-nowrap">{units[rightUnit].id.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------- VERİ VE PRESETLER ----------------

const kitchenUnits: Record<string, Unit> = {
  ml: { id: "ml", name: "Mililitre (ml)", multiplier: 1 },
  cl: { id: "cl", name: "Santilitre (cl)", multiplier: 10 },
  l: { id: "l", name: "Litre (L)", multiplier: 1000 },
  cup_tr: { id: "cup_tr", name: "Su Bardağı (TR)", multiplier: 200 },
  cup_us: { id: "cup_us", name: "Su Bardağı (US)", multiplier: 240 },
  glass: { id: "glass", name: "Çay Bardağı", multiplier: 100 },
  tbsp: { id: "tbsp", name: "Yemek Kaşığı", multiplier: 15 },
  dssp: { id: "dssp", name: "Tatlı Kaşığı", multiplier: 10 },
  tsp: { id: "tsp", name: "Çay Kaşığı", multiplier: 5 },
  coffee: { id: "coffee", name: "Kahve Fincanı", multiplier: 75 },
};
export function KitchenConverter() { return <UniversalConverter title="Mutfak" units={kitchenUnits} defaultLeft="cup_tr" defaultRight="ml" />; }

const lengthUnits: Record<string, Unit> = {
  mm: { id: "mm", name: "Milimetre (mm)", multiplier: 0.001 },
  cm: { id: "cm", name: "Santimetre (cm)", multiplier: 0.01 },
  m: { id: "m", name: "Metre (m)", multiplier: 1 },
  km: { id: "km", name: "Kilometre (km)", multiplier: 1000 },
  in: { id: "in", name: "İnç (in)", multiplier: 0.0254 },
  ft: { id: "ft", name: "Fit (ft)", multiplier: 0.3048 },
  yd: { id: "yd", name: "Yarda (yd)", multiplier: 0.9144 },
  mi: { id: "mi", name: "Mil (mi)", multiplier: 1609.344 },
  nm: { id: "nm", name: "Deniz Mili (nmi)", multiplier: 1852 },
};
export function LengthConverter() { return <UniversalConverter title="Uzunluk" units={lengthUnits} defaultLeft="cm" defaultRight="m" />; }

const weightUnits: Record<string, Unit> = {
  mg: { id: "mg", name: "Miligram (mg)", multiplier: 1e-6 },
  g: { id: "g", name: "Gram (g)", multiplier: 0.001 },
  kg: { id: "kg", name: "Kilogram (kg)", multiplier: 1 },
  t: { id: "t", name: "Ton (t)", multiplier: 1000 },
  oz: { id: "oz", name: "Ons (oz)", multiplier: 0.02834952 },
  lb: { id: "lb", name: "Libre (lb)", multiplier: 0.45359237 },
};
export function WeightConverter() { return <UniversalConverter title="Ağırlık" units={weightUnits} defaultLeft="kg" defaultRight="lb" />; }

const areaUnits: Record<string, Unit> = {
  cm2: { id: "cm2", name: "Santimetrekare (cm²)", multiplier: 1e-4 },
  m2: { id: "m2", name: "Metrekare (m²)", multiplier: 1 },
  ha: { id: "ha", name: "Hektar (ha)", multiplier: 10000 },
  km2: { id: "km2", name: "Kilometrekare (km²)", multiplier: 1e6 },
  donum: { id: "donum", name: "Dönüm", multiplier: 1000 },
  acre: { id: "acre", name: "Acre (ac)", multiplier: 4046.85642 },
};
export function AreaConverter() { return <UniversalConverter title="Alan" units={areaUnits} defaultLeft="m2" defaultRight="donum" />; }

const volumeUnits: Record<string, Unit> = {
  ml: { id: "ml", name: "Mililitre (mL)", multiplier: 0.001 },
  l: { id: "l", name: "Litre (L)", multiplier: 1 },
  m3: { id: "m3", name: "Metreküp (m³)", multiplier: 1000 },
  us_gal: { id: "us_gal", name: "US Galon", multiplier: 3.78541178 },
  uk_gal: { id: "uk_gal", name: "UK Galon (Imperial)", multiplier: 4.54609 },
};
export function VolumeConverter() { return <UniversalConverter title="Hacim" units={volumeUnits} defaultLeft="l" defaultRight="us_gal" />; }

const dataUnits: Record<string, Unit> = {
  B:  { id: "B", name: "Byte (B)", multiplier: 1 },
  KB: { id: "KB", name: "Kilobyte (KB)", multiplier: 1024 },
  MB: { id: "MB", name: "Megabyte (MB)", multiplier: 1048576 },
  GB: { id: "GB", name: "Gigabyte (GB)", multiplier: 1073741824 },
  TB: { id: "TB", name: "Terabyte (TB)", multiplier: 1099511627776 },
};
export function DataConverter() { return <UniversalConverter title="Veri / Disk" units={dataUnits} defaultLeft="GB" defaultRight="MB" />; }

const timeUnits: Record<string, Unit> = {
  sec: { id: "sec", name: "Saniye", multiplier: 1 },
  min: { id: "min", name: "Dakika", multiplier: 60 },
  hr: { id: "hr", name: "Saat", multiplier: 3600 },
  day: { id: "day", name: "Gün", multiplier: 86400 },
  week: { id: "week", name: "Hafta", multiplier: 604800 },
  month: { id: "month", name: "Ay (30.4)", multiplier: 2629800 },
  year: { id: "year", name: "Yıl (365)", multiplier: 31536000 },
};
export function TimeConverter() { return <UniversalConverter title="Zaman" units={timeUnits} defaultLeft="hr" defaultRight="min" />; }

const tempLogic = (val: number, from: string, to: string) => {
  let inC = 0;
  if (from === "C") inC = val;
  else if (from === "F") inC = (val - 32) * 5/9;
  else if (from === "K") inC = val - 273.15;
  if (to === "C") return inC;
  if (to === "F") return (inC * 9/5) + 32;
  if (to === "K") return inC + 273.15;
  return 0;
};
export function TempConverter() { 
  const units = { C: { id: "C", name: "Santigrat (°C)", multiplier: 1 }, F: { id: "F", name: "Fahrenheit (°F)", multiplier: 1 }, K: { id: "K", name: "Kelvin (K)", multiplier: 1 } };
  return <UniversalConverter title="Sıcaklık" units={units} defaultLeft="C" defaultRight="F" customConverter={tempLogic} />; 
}

export function SpeedConverter() {
  const units = { 
    ms: { id: "ms", name: "m/s", multiplier: 1 },
    kmh: { id: "kmh", name: "km/h", multiplier: 0.277777778 },
    mph: { id: "mph", name: "mph", multiplier: 0.44704 },
    knot: { id: "knot", name: "Knot", multiplier: 0.514444444 }
  };
  return <UniversalConverter title="Hız" units={units} defaultLeft="kmh" defaultRight="mph" />;
}
