"use client";

import React, { useState } from "react";
import { splitPdf, getPdfPageCount, downloadUint8Array } from "@/utils/documentProcessor";
import { Scissors, FileText, Settings2, Trash2, CheckCircle2 } from "lucide-react";

export function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFile = async (f: File) => {
    setFile(f);
    setIsCompleted(false);
    try {
      const count = await getPdfPageCount(f);
      setTotalPages(count);
      setRange(`1-${count}`);
    } catch (e) {
      alert("Dosya okunamadı. Geçerli bir PDF olduğundan emin olun.");
      setFile(null);
    }
  };

  const process = async () => {
    if (!file || !range) return;
    setIsProcessing(true);
    try {
      const splitResult = await splitPdf(file, range);
      downloadUint8Array(splitResult, `kalkula_bolunmus_${Date.now()}.pdf`);
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
            <div className="w-16 h-16 bg-accent-glow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-accent-primary">
              <Scissors size={32} />
            </div>
            <p className="text-sm font-bold text-primary mb-1">Bölünecek PDF'i Seç veya Bırak</p>
            <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Tek bir PDF dökümanı seçin</p>
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
                     {(file.size / 1024 / 1024).toFixed(2)} MB • {totalPages} Sayfa
                   </span>
                 </div>
               </div>
               <button onClick={() => { setFile(null); setTotalPages(null); }} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-muted transition-colors">
                 <Trash2 size={16} />
               </button>
            </div>

            <div className="bg-secondary/20 p-6 rounded-2xl border border-secondary/50">
               <div className="flex items-center gap-2 mb-4">
                 <Settings2 className="text-accent-primary" size={16} />
                 <span className="text-[11px] font-black uppercase tracking-widest text-muted">Bölme Ayarları</span>
               </div>
               
               <div className="calc-input-group">
                 <label className="calc-label">Ayıklanacak Sayfa Aralığı</label>
                 <div className="calc-input-wrapper">
                    <input 
                      type="text" 
                      value={range} 
                      onChange={e => setRange(e.target.value)} 
                      className="calc-input !bg-surface" 
                      placeholder={`Örn: 1-3, 5, ${totalPages || 10}`}
                    />
                    <span className="calc-unit">ARALIK</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2 mt-3">
                   <button onClick={() => setRange("1-1")} className="px-3 py-2 bg-surface border border-border rounded-xl text-[10px] font-bold hover:border-accent-primary transition-all">Sadece 1. Sayfa</button>
                   <button onClick={() => setRange(totalPages ? `1-${totalPages}` : "1-5")} className="px-3 py-2 bg-surface border border-border rounded-xl text-[10px] font-bold hover:border-accent-primary transition-all">Tüm Sayfalar</button>
                 </div>
                 <p className="text-[9px] text-muted font-bold mt-3 px-1 uppercase tracking-tight leading-relaxed">
                   Virgül (,) ile sayfaları, Tire (-) ile aralıkları belirleyin.<br/>
                   Örnek: <span className="text-accent-primary">1-5, 8, 10-12</span>
                 </p>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="calc-action-row pt-4">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={!file || !range || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Lütfen Bekleyin...
            </span>
          ) : (
            <span className="flex items-center gap-2 font-black">
              ✂️ PDF Sayfalarını Ayıkla
            </span>
          )}
        </button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-blue-500/5 !border-blue-500/20">
          <div className="calc-result-body text-center py-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="text-blue-500" size={24} />
            </div>
            <h3 className="text-md font-black text-blue-600 dark:text-blue-400 uppercase tracking-tight">Yeni PDF Hazırlandı!</h3>
            <p className="text-[11px] text-muted font-medium mt-1">Seçtiğiniz sayfalar ayıklandı ve indirme başlatıldı.</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">
          <b>Profesyonel İpucu:</b> Bu araç ile bir PDF dosyasından gereksiz sayfaları çıkarabilir veya dökümanı parçalara bölebilirsiniz.
        </span>
      </div>
    </div>
  );
}
