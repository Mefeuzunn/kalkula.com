"use client";

import { useState, useEffect } from "react";

// Ortak Çevirici Şablonu (Premium, Live, Bidirectional)
interface Unit {
  id: string;
  name: string;
  multiplier: number; // Base unit'e göre çarpan (veya özel fonksiyonlar için null)
}

interface UniversalConverterProps {
  title: string;
  icon: string;
  units: Record<string, Unit>;
  baseUnitId: string;
  defaultLeft: string;
  defaultRight: string;
  customConverter?: (val: number, from: string, to: string) => number; // Sıcaklık gibi özel formüller için
}

function UniversalConverter({ title, icon, units, defaultLeft, defaultRight, customConverter }: UniversalConverterProps) {
  const [leftUnit, setLeftUnit] = useState(defaultLeft);
  const [rightUnit, setRightUnit] = useState(defaultRight);
  const [leftValue, setLeftValue] = useState<string>("1");
  const [rightValue, setRightValue] = useState<string>("");

  useEffect(() => {
    // Initial calculate on load
    handleLeftChange("1", leftUnit, rightUnit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convert = (val: string, fromUnit: string, toUnit: string, isFromLeft: boolean) => {
    if (val === "" || val === "-" || isNaN(Number(val))) {
      return "";
    }
    const numVal = parseFloat(val);
    let output = 0;

    if (customConverter) {
      output = customConverter(numVal, fromUnit, toUnit);
    } else {
      // Standart çarpan mantığı
      // X = val * fromUnit.multiplier (base'e çevir)
      // Y = X / toUnit.multiplier (hedefe çevir)
      const inBase = numVal * units[fromUnit].multiplier;
      output = inBase / units[toUnit].multiplier;
    }

    // Virgülden sonrasını temizle (Max 7 basamak)
    let formatted = parseFloat(output.toPrecision(8)).toString();
    // Eger 0 ise 0 kalir
    if (Math.abs(output) < 1e-8 && Math.abs(output) > 0) formatted = output.toExponential(4);

    return formatted;
  };

  const handleLeftChange = (val: string, lMode = leftUnit, rMode = rightUnit) => {
    setLeftValue(val);
    setRightValue(convert(val, lMode, rMode, true));
  };

  const handleRightChange = (val: string, lMode = leftUnit, rMode = rightUnit) => {
    setRightValue(val);
    setLeftValue(convert(val, rMode, lMode, false));
  };

  const swapUnits = () => {
    const tempL = leftUnit;
    const tempR = rightUnit;
    setLeftUnit(tempR);
    setRightUnit(tempL);
    // Recalculate based on current left value
    handleLeftChange(leftValue, tempR, tempL);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "center" }}>
        
        {/* SOL PANEL */}
        <div style={{ display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", transition: "all 0.3s" }} className="hover-ring">
           <div style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
              <select 
                value={leftUnit} 
                onChange={e => { setLeftUnit(e.target.value); handleLeftChange(leftValue, e.target.value, rightUnit); }} 
                style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", cursor: "pointer" }}
              >
                {Object.values(units).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
           </div>
           <div style={{ padding: "1.5rem" }}>
              <input 
                 type="number" 
                 value={leftValue} 
                 onChange={e => handleLeftChange(e.target.value)} 
                 style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)", textAlign: "center" }}
                 placeholder="0"
              />
           </div>
        </div>

        {/* SWAP BUTTON */}
        <button 
           onClick={swapUnits}
           style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 10 }}
           onMouseOver={e => e.currentTarget.style.color = "var(--accent-primary)"}
           onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 4-4 4"/><path d="M12 7H4"/><path d="m16 21-4-4 4-4"/><path d="M12 17h8"/></svg>
        </button>

        {/* SAĞ PANEL */}
        <div style={{ display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", transition: "all 0.3s" }} className="hover-ring">
           <div style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
              <select 
                value={rightUnit} 
                onChange={e => { setRightUnit(e.target.value); handleLeftChange(leftValue, leftUnit, e.target.value); }} 
                style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", cursor: "pointer" }}
              >
                {Object.values(units).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
           </div>
           <div style={{ padding: "1.5rem" }}>
              <input 
                 type="number" 
                 value={rightValue} 
                 onChange={e => handleRightChange(e.target.value)} 
                 style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", textAlign: "center" }}
                 placeholder="0"
              />
           </div>
        </div>

      </div>

      <div style={{ marginTop: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", background: "var(--surface)", border: "1px dashed var(--border)", padding: "1rem", borderRadius: "8px" }}>
        <strong>Formül:</strong> 1 {units[leftUnit].name} = {convert("1", leftUnit, rightUnit, true)} {units[rightUnit].name}
      </div>
    </div>
  );
}

// ---------------- VERİ VE PRESETLER ----------------

// 1. Uzunluk
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
export function LengthConverter() { return <UniversalConverter title="Uzunluk" icon="" units={lengthUnits} baseUnitId="m" defaultLeft="cm" defaultRight="m" />; }

// 2. Ağırlık / Kütle
const weightUnits: Record<string, Unit> = {
  mcg: { id: "mcg", name: "Mikrogram (µg)", multiplier: 1e-9 },
  mg: { id: "mg", name: "Miligram (mg)", multiplier: 1e-6 },
  g: { id: "g", name: "Gram (g)", multiplier: 0.001 },
  kg: { id: "kg", name: "Kilogram (kg)", multiplier: 1 },
  t: { id: "t", name: "Ton (t)", multiplier: 1000 },
  oz: { id: "oz", name: "Ons (oz)", multiplier: 0.02834952 },
  lb: { id: "lb", name: "Libre / Pound (lb)", multiplier: 0.45359237 },
  gr: { id: "gr", name: "Grain (gr)", multiplier: 0.0000647989 },
};
export function WeightConverter() { return <UniversalConverter title="Ağırlık" icon="" units={weightUnits} baseUnitId="kg" defaultLeft="kg" defaultRight="lb" />; }

// 3. Sıcaklık (Custom Converter gerektirir)
const tempUnits: Record<string, Unit> = {
  C: { id: "C", name: "Santigrat Derece (°C)", multiplier: 1 },
  F: { id: "F", name: "Fahrenheit (°F)", multiplier: 1 },
  K: { id: "K", name: "Kelvin (K)", multiplier: 1 },
};
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
export function TempConverter() { return <UniversalConverter title="Sıcaklık" icon="" units={tempUnits} baseUnitId="C" defaultLeft="C" defaultRight="F" customConverter={tempLogic} />; }

// 4. Alan
const areaUnits: Record<string, Unit> = {
  mm2: { id: "mm2", name: "Milimetrekare (mm²)", multiplier: 1e-6 },
  cm2: { id: "cm2", name: "Santimetrekare (cm²)", multiplier: 1e-4 },
  m2: { id: "m2", name: "Metrekare (m²)", multiplier: 1 },
  ha: { id: "ha", name: "Hektar (ha)", multiplier: 10000 },
  km2: { id: "km2", name: "Kilometrekare (km²)", multiplier: 1e6 },
  donum: { id: "donum", name: "Dönüm", multiplier: 1000 },
  acre: { id: "acre", name: "Acre (ac)", multiplier: 4046.85642 },
};
export function AreaConverter() { return <UniversalConverter title="Alan" icon="" units={areaUnits} baseUnitId="m2" defaultLeft="m2" defaultRight="donum" />; }

// 5. Hacim
const volumeUnits: Record<string, Unit> = {
  ml: { id: "ml", name: "Mililitre (mL)", multiplier: 0.001 },
  l: { id: "l", name: "Litre (L)", multiplier: 1 },
  m3: { id: "m3", name: "Metreküp (m³)", multiplier: 1000 },
  us_gal: { id: "us_gal", name: "US Galon", multiplier: 3.78541178 },
  uk_gal: { id: "uk_gal", name: "UK Galon (Imperial)", multiplier: 4.54609 },
  cup: { id: "cup", name: "Su Bardağı (Ort.)", multiplier: 0.2 },
};
export function VolumeConverter() { return <UniversalConverter title="Hacim" icon="" units={volumeUnits} baseUnitId="l" defaultLeft="l" defaultRight="ml" />; }

// 6. Hız
const speedUnits: Record<string, Unit> = {
  ms: { id: "ms", name: "Metre / Saniye (m/s)", multiplier: 1 },
  kmh: { id: "kmh", name: "Kilometre / Saat (km/h)", multiplier: 0.277777778 },
  mph: { id: "mph", name: "Mil / Saat (mph)", multiplier: 0.44704 },
  knot: { id: "knot", name: "Knot (kn)", multiplier: 0.514444444 },
  mach: { id: "mach", name: "Mach (Deniz Seviyesi)", multiplier: 340.29 },
};
export function SpeedConverter() { return <UniversalConverter title="Hız" icon="" units={speedUnits} baseUnitId="ms" defaultLeft="kmh" defaultRight="mph" />; }

// 7. Veri
const dataUnits: Record<string, Unit> = {
  b:  { id: "b", name: "Bit", multiplier: 0.125 }, // 1 byte = 8 bit
  B:  { id: "B", name: "Byte (B)", multiplier: 1 },
  KB: { id: "KB", name: "Kilobyte (KB)", multiplier: 1024 },
  MB: { id: "MB", name: "Megabyte (MB)", multiplier: 1048576 },
  GB: { id: "GB", name: "Gigabyte (GB)", multiplier: 1073741824 },
  TB: { id: "TB", name: "Terabyte (TB)", multiplier: 1099511627776 },
};
export function DataConverter() { return <UniversalConverter title="Veri / Disk" icon="" units={dataUnits} baseUnitId="B" defaultLeft="GB" defaultRight="MB" />; }

// 8. Zaman
const timeUnits: Record<string, Unit> = {
  ms: { id: "ms", name: "Milisaniye", multiplier: 0.001 },
  sec: { id: "sec", name: "Saniye", multiplier: 1 },
  min: { id: "min", name: "Dakika", multiplier: 60 },
  hr: { id: "hr", name: "Saat", multiplier: 3600 },
  day: { id: "day", name: "Gün", multiplier: 86400 },
  week: { id: "week", name: "Hafta", multiplier: 604800 },
  month: { id: "month", name: "Ay (Ort 30.43)", multiplier: 2629800 },
  year: { id: "year", name: "Yıl (365)", multiplier: 31536000 },
};
export function TimeConverter() { return <UniversalConverter title="Zaman" icon="" units={timeUnits} baseUnitId="sec" defaultLeft="hr" defaultRight="min" />; }
