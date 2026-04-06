"use client";

import React, { useState } from "react";
import { mergePdfs, downloadUint8Array } from "@/utils/documentProcessor";
import { ArrowUp, ArrowDown, X, FileText, Upload } from "lucide-react";

export function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
      setIsCompleted(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    setFiles(newFiles);
  };

  const process = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedPdf = await mergePdfs(files);
      downloadUint8Array(mergedPdf, `kalkula_birlesmis_${Date.now()}.pdf`);
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
        <label className="calc-label text-[10px] font-black uppercase opacity-60 mb-2 block">Döküman Yükleme</label>
        <div 
          className="p-10 border-2 border-dashed border-border rounded-3xl bg-secondary/5 text-center transition-all hover:bg-secondary/10 relative group cursor-pointer mb-8"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
            setIsCompleted(false);
          }}
        >
          <input 
            type="file" 
            multiple 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 bg-accent-glow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="text-accent-primary" size={32} />
          </div>
          <p className="text-sm font-bold text-primary mb-1">PDF Dosyalarını Seç veya Sürükle</p>
          <p className="text-[10px] font-medium text-muted uppercase tracking-widest">En az 2 dosya gereklidir</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[11px] font-black text-muted uppercase tracking-widest">Sıralama ({files.length} Dosya)</h4>
              <button onClick={() => setFiles([])} className="text-[10px] font-bold text-red-500 hover:underline">Tümünü Kaldır</button>
            </div>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {files.map((file, idx) => (
                <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-3 bg-surface border border-border rounded-2xl group hover:border-accent-primary/40 transition-all shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-secondary/50 rounded-xl flex items-center justify-center flex-shrink-0 text-accent-primary">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-bold truncate pr-4">{file.name}</span>
                      <span className="text-[9px] text-muted font-black uppercase tracking-tighter">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-xl">
                    <button 
                      onClick={() => moveUp(idx)} 
                      disabled={idx === 0}
                      className="p-1.5 hover:bg-surface rounded-lg text-muted disabled:opacity-20 transition-colors"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      onClick={() => moveDown(idx)} 
                      disabled={idx === files.length - 1}
                      className="p-1.5 hover:bg-surface rounded-lg text-muted disabled:opacity-20 transition-colors"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button onClick={() => removeFile(idx)} className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-muted transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="calc-action-row pt-4">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={files.length < 2 || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Hazırlanıyor...
            </span>
          ) : (
            <span className="flex items-center gap-2 font-black">
              📄 PDF'leri Birleştir
            </span>
          )}
        </button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-green-500/5 !border-green-500/20">
          <div className="calc-result-body text-center py-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-md font-black text-green-600 dark:text-green-400 uppercase tracking-tight">Dökümanınız Birleştirildi!</h3>
            <p className="text-[11px] text-muted font-medium mt-1">Otomatik indirme işlemi başlatıldı. Keyifli çalışmalar!</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🔒</span>
        <span className="calc-info-box-text">
          <b>Gizlilik Önceliği:</b> Dökümanlarınız tarayıcı içinde yerel olarak işlenir. Hiçbir veriniz sunucularımıza <u>aktarılmaz</u>.
        </span>
      </div>
    </div>
  );
}
