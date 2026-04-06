"use client";

import React, { useState } from "react";
import { imagesToPdf, downloadUint8Array } from "@/utils/documentProcessor";
import { Image as ImageIcon, Upload, ArrowUp, ArrowDown, X, CheckCircle2, Layout } from "lucide-react";

export function ImageToPdf() {
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
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await imagesToPdf(files);
      downloadUint8Array(pdfBytes, `kalkula_gorsel_pdf_${Date.now()}.pdf`);
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
        <label className="calc-label text-[10px] font-black uppercase opacity-60 mb-2 block">Görüntü Yükleme</label>
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
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleFileChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 bg-accent-glow rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
            <Upload className="text-accent-primary" size={32} />
          </div>
          <p className="text-sm font-bold text-primary mb-1">Görselleri Seç veya Sürükle</p>
          <p className="text-[10px] font-medium text-muted uppercase tracking-widest">JPG, PNG veya WebP</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[11px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} className="text-accent-primary" />
                Görsel Sıralaması ({files.length})
              </h4>
              <button onClick={() => setFiles([])} className="text-[10px] font-bold text-red-500 hover:scale-105 transition-transform uppercase tracking-tighter">Sıfırla</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {files.map((file, idx) => (
                <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-2 bg-surface border border-border rounded-2xl group hover:border-accent-primary/40 transition-all shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-12 h-12 bg-secondary rounded-xl overflow-hidden flex-shrink-0 border border-border/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[11px] font-bold truncate max-w-[120px]">{file.name}</span>
                      <span className="text-[9px] text-muted font-black uppercase tracking-tighter">Sayfa {idx + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => moveUp(idx)} 
                      disabled={idx === 0}
                      className="p-1.5 hover:bg-surface rounded-lg text-muted disabled:opacity-20 transition-colors"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button 
                      onClick={() => moveDown(idx)} 
                      disabled={idx === files.length - 1}
                      className="p-1.5 hover:bg-surface rounded-lg text-muted disabled:opacity-20 transition-colors"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <div className="w-px h-3 bg-border mx-0.5" />
                    <button onClick={() => removeFile(idx)} className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-muted transition-colors">
                      <X size={12} />
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
          disabled={files.length === 0 || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Hazırlanıyor...
            </span>
          ) : (
            <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
               📄 PDF'e Dönüştür
            </span>
          )}
        </button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-indigo-500/5 !border-indigo-500/20">
          <div className="calc-result-body text-center py-6">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="text-indigo-500" size={24} />
            </div>
            <h3 className="text-md font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">PDF Başarıyla Oluşturuldu!</h3>
            <p className="text-[11px] text-muted font-medium mt-1">Görselleriniz döküman haline getirildi ve indirme başlatıldı.</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">
          <b>Profesyonel İpucu:</b> Görselleri yukarı/aşağı okları kullanarak sıralayabilirsiniz. Sıralama, PDF dökümanındaki sayfa sırasını belirler.
        </span>
      </div>
    </div>
  );
}
