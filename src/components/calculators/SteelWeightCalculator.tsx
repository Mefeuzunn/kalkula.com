"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, RotateCcw, Anchor, Layers, Settings, Boxes, Ruler, Gauge, Activity } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

interface Material {
  name: string;
  density: number; // g/cm3
}

const MATERIALS: Material[] = [
  { name: "Çelik (St 37/52)", density: 7.85 },
  { name: "Paslanmaz Çelik", density: 8.00 },
  { name: "Alüminyum", density: 2.70 },
  { name: "Bakır", density: 8.96 },
  { name: "Demir", density: 7.87 },
  { name: "Pirinç", density: 8.50 }
];

type Shape = "plate" | "round" | "pipe";

export function SteelWeightCalculator() {
  const [materialIdx, setMaterialIdx] = useState("0");
  const [shape, setShape] = useState<Shape>("plate");
  const [coating, setCoating] = useState("1.0"); // 1.0 = None, 1.05 = Galvanized

  // Dimensions (mm)
  const [dim1, setDim1] = useState("1000"); // Length / Height
  const [dim2, setDim2] = useState("1000"); // Width / Diameter
  const [dim3, setDim3] = useState("5");    // Thickness / Wall Thickness

  const [result, setResult] = useState<number | null>(null);

  const material = MATERIALS[parseInt(materialIdx)];

  const calculate = () => {
    const l = parseFloat(dim1) || 0;
    const wD = parseFloat(dim2) || 0;
    const t = parseFloat(dim3) || 0;
    const rho = material.density;
    const coatFactor = parseFloat(coating);

    let weightKg = 0;

    if (shape === "plate") {
      weightKg = (l * wD * t * rho) / 1000000;
    } else if (shape === "round") {
      const radius = wD / 2;
      weightKg = (Math.PI * Math.pow(radius, 2) * l * rho) / 1000000;
    } else if (shape === "pipe") {
      const rOut = wD / 2;
      const rIn = rOut - t;
      if (rIn < 0) { weightKg = 0; }
      else {
        weightKg = (Math.PI * (Math.pow(rOut, 2) - Math.pow(rIn, 2)) * l * rho) / 1000000;
      }
    }

    weightKg *= coatFactor;
    setResult(weightKg);
  };

  useEffect(() => {
    calculate();
  }, [materialIdx, shape, dim1, dim2, dim3, coating]);

  const reset = () => {
    setMaterialIdx("0");
    setShape("plate");
    setCoating("1.0");
    setDim1("1000");
    setDim2("1000");
    setDim3("5");
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#64748b"] });
  };

  return (
    <V2CalculatorWrapper
      title="METAL & ÇELİK GÜCÜ HESAPLAYICI"
      icon="🏗️"
      infoText="Plaka, dolu mil ve boru gibi farklı kesitlerdeki metal ve polimer malzemelerin ağırlığını anında hesaplayın. Endüstriyel yoğunluk değerleri baz alınmıştır."
      results={result !== null && (
        <div className="space-y-6 animate-result">
           <V2ResultCard 
             color="slate" 
             label="TOPLAM AĞIRLIK" 
             value={result.toLocaleString('tr-TR', { maximumFractionDigits: 3 })} 
             unit="KG"
             icon="⚖️"
             subLabel={`${material.name} - ${shape === "plate" ? "Plaka" : shape === "round" ? "Dolu Mil" : "Boru/Profil"}`}
             className="!text-5xl font-black italic"
           />
           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">HACİM ANALİZİ</div>
                 <div className="text-xl font-black text-primary italic tracking-tighter">{(result / material.density).toFixed(2)} cm³</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic opacity-40">TONAJ</div>
                 <div className="text-xl font-black text-slate-500 italic">{(result / 1000).toFixed(4)} Ton</div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8">
           {/* Shape Selection */}
           <div className="flex bg-white/5 p-1.5 rounded-[2.2rem] gap-1 border border-white/10 shadow-lg overflow-x-auto no-scrollbar">
              {(["plate", "round", "pipe"] as Shape[]).map((s) => (
                <button 
                   key={s}
                   onClick={() => setShape(s)}
                   className={`flex-1 min-w-[120px] py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${shape === s ? 'bg-slate-700 text-white shadow-xl shadow-slate-900/20' : 'text-muted hover:text-primary hover:bg-white/5'}`}
                >
                   {s === "plate" ? "📐 PLAKA" : s === "round" ? "⭕ DOLU MİL" : "🚇 BORU"}
                </button>
              ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Select 
                label="MALZEME TÜRÜ"
                value={materialIdx}
                onChange={setMaterialIdx}
                options={MATERIALS.map((m, i) => ({ value: i.toString(), label: `${m.name} (${m.density} g/cm³)` }))}
              />
              <V2Select 
                label="KAPLAMA STANDARDI"
                value={coating}
                onChange={setCoating}
                options={[
                  { value: "1.0", label: "Yok / Yalın (Ham)" },
                  { value: "1.05", label: "Galvaniz Kaplama (+%5)" },
                  { value: "1.02", label: "Sıcak Boya / Epoxy (+%2)" },
                ]}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <V2Input 
                label="BOY / UZUNLUK" 
                value={dim1} 
                onChange={setDim1} 
                unit="mm" 
                placeholder="1000" 
                fieldClassName="!text-2xl font-black italic"
              />
              <V2Input 
                label={shape === "plate" ? "EN / GENİŞLİK" : "DIŞ ÇAP"} 
                value={dim2} 
                onChange={setDim2} 
                unit="mm" 
                placeholder="1000" 
                fieldClassName="!text-2xl font-black italic"
              />
              <V2Input 
                label="ET KALINLIĞI" 
                value={dim3} 
                onChange={setDim3} 
                unit="mm" 
                placeholder="5" 
                fieldClassName="!text-2xl font-black italic"
                disabled={shape === "round"}
              />
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Anlık Hesaplama" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-500/10 text-slate-500">
                 <Anchor className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-slate-500 uppercase italic">NAKLİYE</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Lojistik planlama desteği</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-500/10 text-slate-500">
                 <Settings className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-slate-500 uppercase italic">TOLERANS</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">ASTM & DIN standartları</div>
              </div>
           </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-600/5 border border-slate-600/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Teknik Not:</b> Hesaplamalarda malzemenin özgül ağırlığı ve profilin geometrik hacmi baz alınmıştır. Galvaniz kaplama ağırlığı teorik olarak %5 eklenmiştir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
