"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { ArrowLeftRight } from "lucide-react";

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

function UniversalConverter({ title, units, defaultLeft, defaultRight, customConverter }: UniversalConverterProps) {
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
    <V2CalculatorWrapper
      title={`${title.toUpperCase()} DÖNÜŞÜM ANALİZİ`}
      icon="🔄"
      infoText={`${units[leftUnit].name} ve ${units[rightUnit].name} birimleri arasında gerçek zamanlı, çift yönlü dönüşüm yapabilirsiniz.`}
      results={(
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            label="Dönüşüm Katsayısı"
            value={`1 ${units[leftUnit].id.toUpperCase()} = ${convert("1", leftUnit, rightUnit)} ${units[rightUnit].id.toUpperCase()}`}
            subLabel="Hassas Hesaplama Uygulandı"
          />
          
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-2">
             <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">Sonuç (Canlı)</span>
             <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-primary italic tracking-tighter">{rightValue || "0"}</span>
                <span className="text-xl font-bold text-muted uppercase">{units[rightUnit].id}</span>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-4">
             <V2Select 
               label="KAYNAK BİRİM" 
               value={leftUnit} 
               onChange={val => { setLeftUnit(val); handleLeftChange(leftValue, val, rightUnit); }}
               options={Object.values(units).map(u => ({ value: u.id, label: u.name }))}
             />
             <V2Input label="DEĞER" value={leftValue} onChange={handleLeftChange} fieldClassName="!text-4xl" />
          </div>

          <div className="flex items-center justify-center h-full pb-4">
             <button 
                onClick={swapUnits}
                className="w-14 h-14 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 hover:scale-110 active:scale-95 transition-all shadow-xl group"
             >
                <ArrowLeftRight size={24} className="group-hover:rotate-180 transition-transform duration-500" />
             </button>
          </div>

          <div className="space-y-4">
             <V2Select 
               label="HEDEF BİRİM" 
               value={rightUnit} 
               onChange={val => { setRightUnit(val); handleLeftChange(leftValue, leftUnit, val); }}
               options={Object.values(units).map(u => ({ value: u.id, label: u.name }))}
             />
             <V2Input label="KARŞILIK" value={rightValue} onChange={handleRightChange} fieldClassName="!text-4xl !text-blue-400" />
          </div>
        </div>
      </div>
    </V2CalculatorWrapper>
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
