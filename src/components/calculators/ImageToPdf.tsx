"use client";

import React, { useState } from "react";
import { imagesToPdf } from "@/utils/documentProcessor";

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

  const process = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await imagesToPdf(files);
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kalkula_gorsel_pdf_${Date.now()}.pdf`;
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
        <label className="calc-label">Görsellerinizi Ekleyin (JPG, PNG)</label>
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
            accept="image/jpeg,image/png" 
            onChange={handleFileChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🖼️</div>
          <p className="text-sm font-bold text-muted uppercase tracking-widest">Görselleri Sürükle veya Tıkla</p>
        </div>

        {files.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((file, idx) => (
              <div key={idx} className="relative aspect-square bg-secondary rounded-2xl overflow-hidden group border border-border animate-fade-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Preview" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <button 
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="calc-action-row">
        <button 
          className="calc-btn-calculate" 
          onClick={process} 
          disabled={files.length === 0 || isProcessing}
        >
          {isProcessing ? "☕ PDF Oluşturuluyor..." : "📄 Görselleri PDF Yap"}
        </button>
        <button className="calc-btn-reset" onClick={() => setFiles([])}>↺ Temizle</button>
      </div>

      {isCompleted && (
        <div className="calc-result-panel animate-result !bg-blue-500/5 !border-blue-500/20">
          <div className="calc-result-body text-center p-8">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-lg font-black text-blue-600 dark:text-blue-400">Görseller PDF Oldu!</h3>
            <p className="text-sm text-muted">Tüm görselleriniz tek bir pürüzsüz PDF dökümanında birleşti.</p>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">
          <b>İpucu:</b> Seçtiğiniz görseller eklendikleri sırayla PDF sayfalarına yerleştirilir. Her bir görsel ayrı bir sayfayı temsil eder.
        </span>
      </div>
    </div>
  );
}
