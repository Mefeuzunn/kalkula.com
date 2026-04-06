"use client";

import React, { useState } from "react";
import { splitPdf } from "@/utils/documentProcessor";

export function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("1-1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const process = async () => {
    if (!file || !range) return;
    setIsProcessing(true);
    try {
      const splitResult = await splitPdf(file, range);
      const blob = new Blob([splitResult as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kalkula_bolunmus_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsCompleted(true);
    } catch (e) {
      alert("Hata oluştu: " + (e as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-input-section">
        <label className="calc-label font-black text-xs opacity-70">Hedef Dosya Seçimi</label>
        {!file ? (
          <div 
            className="p-12 border-4 border-dashed border-border rounded-[2.5rem] bg-secondary/5 text-center transition-all hover:bg-secondary/10 relative group cursor-pointer"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              setFile(e.dataTransfer.files[0]);
            }}
          >
            <input 
              type="file" 
              accept=".pdf" 
              onChange={e => setFile(e.target.files?.[0] || null)} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✂️</div>
            <p className="text-sm font-bold text-muted uppercase tracking-widest">Bölünecek PDF'i Seç veya Bırak</p>
          </div>
        ) : (
          <div className="p-6 bg-surface border-2 border-accent-primary/20 rounded-3xl flex items-center justify-between shadow-xl animate-fade-in group hover:border-accent-primary transition-all">
             <div className="flex items-center gap-4">
               <div className="text-3xl">📄</div>
               <div className="flex flex-col">
                 <span className="text-xs font-black truncate max-w-[200px]">{file.name}</span>
                 <span className="text-[10px] text-muted font-bold">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
               </div>
             </div>
             <button onClick={() => setFile(null)} className="btn-secondary px-4 !py-2 text-[10px] font-black uppercase">Değiştir</button>
          </div>
        )}

        {file && (
          <div className="mt-8 calc-input-group animate-result">
            <label className="calc-label">Ayıklanacak Sayfa Aralığı</label>
            <div className="calc-input-wrapper">
               <input 
                 type="text" 
                 value={range} 
                 onChange={e => setRange(e.target.value)} 
                 className="calc-input" 
                 placeholder="Örn: 1-3, 5, 10"
               />
               <span className="calc-unit">SAYFA</span>
            </div>
            <p className="text-[9px] text-muted font-bold mt-2 px-2 uppercase tracking-tighter">
              Aralık verirken "-" işareti, virgül ile yeni sayfa belirleyin. "1-5, 8" gibi.
            </p>
          </div>
        )}
      </div>

      <div className="calc-action-row">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={!file || !range || isProcessing}
        >
          {isProcessing ? "✂️ Sayfalar Ayıklanıyor..." : "✂️ PDF Sayfalarını Ayıkla"}
        </button>
        <button className="calc-btn-reset" onClick={() => { setFile(null); setRange("1-1"); setIsCompleted(false); }}>↺ Sıfırla</button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-green-500/5 !border-green-500/20">
          <div className="calc-result-body text-center p-8">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-black text-green-600 dark:text-green-400">Yeni Döküman Hazır!</h3>
            <p className="text-sm text-muted">Belirlediğiniz sayfalar başarıyla ayıklandı ve indirilmeye hazır.</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">
          <b>İpucu:</b> Bir PDF dosyasının sadece bir sayfasını almak için aralığa sadece o sayfa numarasını yazmanız yeterlidir. (Örn: 1)
        </span>
      </div>
    </div>
  );
}
