"use client";

import React, { useState, useEffect } from "react";
import { Droplet, Info, Calculator, RotateCcw } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function VolumeCalculator() {
  const [valL, setValL] = useState("1");
  const [valCl, setValCl] = useState("100");
  const [valMl, setValMl] = useState("1000");
  const [valM3, setValM3] = useState("0.001");

  const updateFromL = (v: string) => {
    setValL(v);
    const num = parseFloat(v) || 0;
    setValCl((num * 100).toString());
    setValMl((num * 1000).toString());
    setValM3((num / 1000).toString());
  };

  const updateFromCl = (v: string) => {
    setValCl(v);
    const num = parseFloat(v) || 0;
    setValL((num / 100).toString());
    setValMl((num * 10).toString());
    setValM3((num / 100000).toString());
  };

  const updateFromMl = (v: string) => {
    setValMl(v);
    const num = parseFloat(v) || 0;
    setValL((num / 1000).toString());
    setValCl((num / 10).toString());
    setValM3((num / 1000000).toString());
  };

  const updateFromM3 = (v: string) => {
    setValM3(v);
    const num = parseFloat(v) || 0;
    setValL((num * 1000).toString());
    setValCl((num * 100000).toString());
    setValMl((num * 1000000).toString());
  };

  const reset = () => {
    updateFromL("1");
  };

  return (
    <V2CalculatorWrapper
      title="HACİM & SIVI BİRİM DÖNÜŞTÜRÜCÜ"
      icon="💧"
      infoText="Litre, mililitre, santilitre ve metreküp birimleri arasında hızlı dönüşüm yapın. Bir değeri girdiğinizde diğerleri anlık olarak hesaplanır."
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input label="LİTRE (L)" value={valL} onChange={updateFromL} type="number" placeholder="1" unit="L" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="SANTİLİTRE (CL)" value={valCl} onChange={updateFromCl} type="number" placeholder="100" unit="cl" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="MİLİLİTRE (ML)" value={valMl} onChange={updateFromMl} type="number" placeholder="1000" unit="ml" fieldClassName="!text-2xl font-black italic" />
              <V2Input label="METREKÜP (M³)" value={valM3} onChange={updateFromM3} type="number" placeholder="0.001" unit="m³" fieldClassName="!text-2xl font-black italic" />
           </div>

           <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex flex-col items-center justify-center gap-3">
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic opacity-60">MATEMATİKSEL EŞİTLİK</div>
              <div className="flex items-center gap-4 text-primary font-black text-xl italic drop-shadow-sm">
                 <span className="text-blue-500">1 L</span>
                 <span className="text-muted text-sm">=</span>
                 <span>100 cl</span>
                 <span className="text-muted text-sm">=</span>
                 <span>1000 ml</span>
              </div>
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Anlık Dönüşüm" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Kullanım Notu:</b> Bu araç mutfak ölçüleri, endüstriyel sıvı transferleri ve laboratuvar çalışmaları için optimize edilmiştir. 1 Litre, tam olarak 1 desimetreküpe (dm³) eşittir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
