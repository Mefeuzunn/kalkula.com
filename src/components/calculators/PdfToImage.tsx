"use client";

import React, { useState } from "react";
import { pdfToImages, downloadBlob } from "@/utils/documentProcessor";
import { Copy, FileText, Trash2, CheckCircle2, Download, Image as ImageIcon } from "lucide-react";

export function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);

  const handleFile = (f: File) => {
    setFile(f);
    setIsCompleted(false);
    setImageBlobs([]);
  };

  const process = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const blobs = await pdfToImages(file);
      setImageBlobs(blobs);
      setIsCompleted(true);
    } catch (e) {
      alert("Hata oluştu: " + (e as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    imageBlobs.forEach((blob, idx) => {
      downloadBlob(blob, `kalkula_sayfa_${idx + 1}.jpg`);
    });
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
            <div className="w-16 h-16 bg-accent-glow rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-accent-primary">
              <ImageIcon size={32} />
            </div>
            <p className="text-sm font-bold text-primary mb-1">Görsele Dönüştürülecek PDF'i Seç</p>
            <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Her sayfayı yüksek kalite görsel yapın</p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="p-4 bg-surface border border-border rounded-2xl flex items-center justify-between shadow-sm group hover:border-accent-primary/40 transition-all">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-accent-glow rounded-xl flex items-center justify-center text-accent-primary">
                   <FileText size={20} />
                 </div>
                 <div className="flex flex-col overflow-hidden">
                   <span className="text-[11px] font-bold truncate max-w-[200px]">{file.name}</span>
                   <span className="text-[9px] text-muted font-black uppercase tracking-tighter">
                     {(file.size / 1024 / 1024).toFixed(2)} MB
                   </span>
                 </div>
               </div>
               <button onClick={() => { setFile(null); setIsCompleted(false); setImageBlobs([]); }} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-muted transition-colors">
                 <Trash2 size={16} />
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="calc-action-row pt-4">
        {!isCompleted ? (
          <button 
            className="calc-btn-calculate" 
            onClick={process} 
            disabled={!file || isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Dönüştürülüyor...
              </span>
            ) : (
              <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
                🖼️ PDF'i Görsele Çevir
              </span>
            )}
          </button>
        ) : (
          <button 
            className="calc-btn-calculate !bg-indigo-600 hover:!bg-indigo-500 shadow-indigo-500/20 shadow-lg" 
            onClick={downloadAll}
          >
            <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
              <Download size={16} /> Tümünü İndir ({imageBlobs.length})
            </span>
          </button>
        )}
      </div>

      {isCompleted && imageBlobs.length > 0 && (
        <div className="mt-8 space-y-4 animate-result">
           <div className="flex items-center justify-between px-2">
             <h4 className="text-[11px] font-black text-muted uppercase tracking-widest">Oluşturulan Görseller</h4>
             <span className="text-[10px] font-bold text-accent-primary">{imageBlobs.length} Sayfa</span>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-1">
             {imageBlobs.map((blob, idx) => (
               <div key={idx} className="relative aspect-[3/4] bg-surface border border-border rounded-xl overflow-hidden group shadow-sm hover:border-accent-primary transition-all">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                   src={URL.createObjectURL(blob)} 
                   alt={`Page ${idx + 1}`} 
                   className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter shadow-sm">SAYFA {idx + 1}</span>
                    <button 
                      onClick={() => downloadBlob(blob, `kalkula_sayfa_${idx + 1}.jpg`)}
                      className="p-1.5 px-2 bg-white text-black rounded-lg hover:bg-accent-primary hover:text-white transition-all transform active:scale-90"
                    >
                      <Download size={10} />
                    </button>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📸</span>
        <span className="calc-info-box-text">
          <b>Yüksek Kalite Modu:</b> Her PDF sayfası yüksek çözünürlükle JPG formatına dönüştürülür. Sosyal medya ve sunum paylaşımları için idealdir.
        </span>
      </div>
    </div>
  );
}
