"use client";

import React, { useState, useEffect } from "react";

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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { label: "LİTRE (L)", val: valL, update: updateFromL, unit: "L" },
          { label: "SANTİLİTRE (CL)", val: valCl, update: updateFromCl, unit: "cl" },
          { label: "MİLİLİTRE (ML)", val: valMl, update: updateFromMl, unit: "ml" },
          { label: "METREKÜP (M³)", val: valM3, update: updateFromM3, unit: "m³" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col">
            <label className="calc-input-label">{item.label}</label>
            <div className="calc-input-key">
               <div className="absolute top-4 right-6 text-[10px] font-black text-accent-primary italic opacity-40">{item.unit}</div>
               <input 
                 type="number" 
                 value={item.val} 
                 onChange={e => item.update(e.target.value)} 
                 className="calc-input-field" 
                 placeholder="0" 
               />
            </div>
          </div>
        ))}
      </div>

      <div className="panel p-8 bg-secondary/5 border-2 border-dashed border-border rounded-[2.5rem] text-center mt-6">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-4 block italic opacity-60">Matematiksel Karşılık</label>
        <div className="font-mono text-xl font-black text-primary tracking-tighter flex items-center justify-center gap-4">
          <span className="text-3xl text-accent-primary italic drop-shadow-sm">1 Litre = 100 cl = 1000 ml</span>
        </div>
      </div>

      <div className="mt-8 p-6 bg-accent-glow border-2 border-dashed border-accent-primary/20 rounded-3xl flex gap-4 items-center">
        <span className="text-2xl">💡</span>
        <p className="text-xs font-bold text-muted italic">Birimlerden herhangi birine değer girdiğinizde diğerleri anlık olarak hesaplanır. Endüstriyel mutfak ve laboratuvar ölçümleri için idealdir.</p>
      </div>
    </div>
  );
}
