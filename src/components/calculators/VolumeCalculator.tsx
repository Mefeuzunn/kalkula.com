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
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Litre (L)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={valL} onChange={e => updateFromL(e.target.value)} className="calc-input has-unit" />
            <span className="calc-unit">L</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Santilitre (cl)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={valCl} onChange={e => updateFromCl(e.target.value)} className="calc-input has-unit" />
            <span className="calc-unit">cl</span>
          </div>
        </div>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Mililitre (ml)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={valMl} onChange={e => updateFromMl(e.target.value)} className="calc-input has-unit" />
            <span className="calc-unit">ml</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Metreküp (m³)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={valM3} onChange={e => updateFromM3(e.target.value)} className="calc-input has-unit" />
            <span className="calc-unit">m³</span>
          </div>
        </div>
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
