"use client";

import React, { useState } from "react";
import { mergePdfs } from "@/utils/documentProcessor";

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

  const process = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedPdf = await mergePdfs(files);
      const blob = new Blob([mergedPdf as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kalkula_birlesmis_${Date.now()}.pdf`;
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
        <label className="calc-label">PDF Dosyalarınızı Ekleyin (En az 2)</label>
        <div 
          className="p-12 border-4 border-dashed border-border rounded-[2.5rem] bg-secondary/5 text-center transition-all hover:bg-secondary/10 relative group cursor-pointer"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
          }}
        >
          <input 
            type="file" 
            multiple 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📄</div>
          <p className="text-sm font-bold text-muted uppercase tracking-widest">Dosyaları Sürükle veya Tıkla</p>
        </div>

        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="text-[10px] font-black text-muted uppercase tracking-widest">Sıralanacak Dosyalar ({files.length})</h4>
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-surface border border-border rounded-2xl animate-fade-in group hover:border-accent-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 flex items-center justify-center bg-secondary rounded-full text-[10px] font-black">{idx + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold truncate max-w-[200px]">{file.name}</span>
                    <span className="text-[9px] text-muted font-bold">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
                <button onClick={() => removeFile(idx)} className="text-muted hover:text-red-500 p-2">&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="calc-action-row">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={files.length < 2 || isProcessing}
        >
          {isProcessing ? "☕ Birleştiriliyor..." : "📄 PDF'leri Birleştir"}
        </button>
        <button className="calc-btn-reset" onClick={() => setFiles([])}>↺ Temizle</button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-green-500/5 !border-green-500/20">
          <div className="calc-result-body text-center p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-black text-green-600 dark:text-green-400">İşlem Başarılı!</h3>
            <p className="text-sm text-muted">Dökümanınız oluşturuldu ve otomatik download başlatıldı.</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">🔒</span>
        <span className="calc-info-box-text">
          <b>Gizlilik Önceliği:</b> Dökümanlarınız tarayıcı içinde (Local-Side) işlenir. Hiçbir dosyanız Kalkula sunucularına <u>aktarılmaz veya saklanmaz</u>.
        </span>
      </div>
    </div>
  );
}
