"use client";

import React, { useState } from "react";
import { compressPdf, downloadUint8Array } from "@/utils/documentProcessor";
import { Rocket, FileText, Trash2, CheckCircle2, Zap } from "lucide-react";

export function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleFile = async (f: File) => {
    setFile(f);
    setIsCompleted(false);
    setResult(null);
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const compressedBytes = await compressPdf(file);
      downloadUint8Array(compressedBytes, `kalkula_sikismis_${Date.now()}.pdf`);
      setResult({
        original: file.size,
        compressed: compressedBytes.length
      });
      setIsCompleted(true);
    } catch (e) {
      alert("Sıkıştırma sırasında hata oluştu: " + (e as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const savingPercent = result ? Math.round(((result.original - result.compressed) / result.original) * 100) : 0;

  return (
    <div className="calc-wrapper">
      <div className="calc-input-section">
        {!file ? (
          <div 
            className="p-12 border-2 border-dashed border-border rounded-3xl bg-secondary/5 text-center transition-all hover:bg-secondary/10 relative group cursor-pointer"
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          >
            <input 
              type="file" 
              accept=".pdf" 
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 bg-accent-glow rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-accent-primary">
              <Zap size={32} fill="currentColor" />
            </div>
            <p className="text-sm font-bold text-primary mb-1">Sıkıştırılacak PDF'i Seç veya Bırak</p>
            <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Dosya boyutunu optimize edin</p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="p-4 bg-surface border border-border rounded-2xl flex items-center justify-between shadow-sm group hover:border-accent-primary/40 transition-all">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-accent-glow rounded-xl flex items-center justify-center text-accent-primary">
                   <FileText size={20} />
                 </div>
                 <div className="flex flex-col overflow-hidden">
                   <span className="text-xs font-bold truncate max-w-[200px]">{file.name}</span>
                   <span className="text-[9px] text-muted font-black uppercase tracking-tighter">
                     {(file.size / 1024 / 1024).toFixed(2)} MB
                   </span>
                 </div>
               </div>
               <button onClick={() => { setFile(null); setIsCompleted(false); setResult(null); }} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-muted transition-colors">
                 <Trash2 size={16} />
               </button>
            </div>

            <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-600/10 text-center">
               <p className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-widest">Hızlı Optimizasyon</p>
               <p className="text-[11px] text-muted leading-relaxed px-4">
                 PDF dökümanınızın yapısını bozmadan, döküman meta verilerini ve gereksiz nesneleri temizleyerek boyutunu küçültürüz.
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="calc-action-row pt-4">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={!file || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sıkıştırılıyor...
            </span>
          ) : (
            <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
              <Rocket size={16} /> Hızlandır ve Sıkıştır
            </span>
          )}
        </button>
      </div>

      {isCompleted && result && (
        <div className="calc-result-panel animate-result !bg-emerald-500/5 !border-emerald-500/20">
          <div className="calc-result-body text-center py-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>
            <h3 className="text-md font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">İşlem Tamamlandı!</h3>
            
            <div className="flex items-center justify-center gap-4 mt-4 mb-2">
               <div className="text-right">
                  <p className="text-[9px] text-muted font-bold uppercase tracking-tighter">Orijinal</p>
                  <p className="text-sm font-black text-muted">{(result.original / 1024 / 1024).toFixed(2)} MB</p>
               </div>
               <div className="w-px h-8 bg-border" />
               <div className="text-left">
                  <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">Yeni Boyut</p>
                  <p className="text-sm font-black text-emerald-600">{(result.compressed / 1024 / 1024).toFixed(2)} MB</p>
               </div>
            </div>
            
            <p className="text-[11px] text-muted font-medium mt-1">
               {savingPercent > 0 
                 ? `Tasarruf Oranı: %${savingPercent}. Dosya başarıyla optimize edildi.` 
                 : "Dosya zaten optimize edilmiş görünüyor."}
            </p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💎</span>
        <span className="calc-info-box-text">
          <b>Gizlilik:</b> Bu işlem tamamen tarayıcınızda gerçekleştirilir. Dosyalarınız hiçbir sunucuya yüklenmez, böylece verileriniz %100 güvende kalır.
        </span>
      </div>
    </div>
  );
}
