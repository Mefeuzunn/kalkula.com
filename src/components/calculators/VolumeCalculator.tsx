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
    <div className="calc-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[
          { label: "Litre (L)", val: valL, update: updateFromL, unit: "L" },
          { label: "Santilitre (cl)", val: valCl, update: updateFromCl, unit: "cl" },
          { label: "Mililitre (ml)", val: valMl, update: updateFromMl, unit: "ml" },
          { label: "Metreküp (m³)", val: valM3, update: updateFromM3, unit: "m³" }
        ].map((item, i) => (
          <div key={i} className="group relative">
             <div className="relative bg-surface border-2 border-border rounded-3xl transition-all duration-200 
               shadow-[0_10px_0_rgba(0,0,0,0.08)] dark:shadow-[0_10px_0_rgba(0,0,0,0.4)]
               group-focus-within:-translate-y-1 group-focus-within:shadow-[0_6px_0_rgba(0,0,0,0.1)]
               hover:-translate-y-1 hover:shadow-[0_14px_0_rgba(0,0,0,0.06)]
               overflow-hidden">
                <div className="bg-secondary/20 p-3 border-b-2 border-border flex items-center justify-between px-6">
                   <label className="text-[9px] font-black uppercase tracking-widest italic opacity-60">{item.label}</label>
                   <span className="text-[10px] font-black text-accent-primary">{item.unit}</span>
                </div>
                <input 
                  type="number" 
                  value={item.val} 
                  onChange={e => item.update(e.target.value)} 
                  className="w-full bg-transparent border-none outline-none text-4xl font-black p-6 text-center italic tracking-tighter" 
                  placeholder="0" 
                />
             </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-secondary/5 border-2 border-dashed border-border rounded-[2rem] text-center mt-6">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-3 block italic opacity-60">Matematiksel Karşılık</label>
        <div className="font-mono text-lg font-black text-primary tracking-tighter flex items-center justify-center gap-3">
          <span className="text-accent-primary italic">1 Litre = 100 cl = 1000 ml</span>
        </div>
      </div>

      <div className="calc-info-box mt-6">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Birimlerden herhangi birine değer girdiğinizde diğerleri anlık olarak hesaplanır. Endüstriyel mutfak ve laboratuvar ölçümleri için idealdir.</span>
      </div>
    </div>
  );
}
