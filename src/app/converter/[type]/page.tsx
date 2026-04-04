"use client";

import styles from "../converter.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const typeMap: Record<string, { title: string; from: string; to: string; accept: string }> = {
  "pdf-to-word": { title: "PDF'den Word'e Dönüştürücü", from: "PDF", to: "Word (.docx)", accept: ".pdf" },
  "word-to-pdf": { title: "Word'den PDF'e Dönüştürücü", from: "Word", to: "PDF (.pdf)", accept: ".doc,.docx" },
  "excel-to-pdf": { title: "Excel'den PDF'e Dönüştürücü", from: "Excel", to: "PDF (.pdf)", accept: ".xls,.xlsx" },
  "pdf-to-excel": { title: "PDF'den Excel'e Dönüştürücü", from: "PDF", to: "Excel (.xlsx)", accept: ".pdf" },
  "jpg-to-pdf": { title: "JPG'den PDF'e Dönüştürücü", from: "Görsel", to: "PDF (.pdf)", accept: "image/*" },
  "pdf-to-jpg": { title: "PDF'den JPG'e Dönüştürücü", from: "PDF", to: "Görsel (.jpg)", accept: ".pdf" }
};

export default function ConverterType() {
  const params = useParams();
  const rawType = params?.type;
  const typeStr = Array.isArray(rawType) ? rawType[0] : rawType || "pdf-to-word";
  
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const info = typeMap[typeStr] || typeMap["pdf-to-word"];

  useEffect(() => {
    // Reset state on type change
    setFile(null);
    setIsConverting(false);
    setProgress(0);
    setIsCompleted(false);
    setShowPreview(false);
  }, [typeStr]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setIsCompleted(false);
      setProgress(0);
      setShowPreview(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setIsCompleted(false);
      setProgress(0);
      setShowPreview(false);
    }
  };

  const handleConvert = () => {
    if (!file) return;

    setIsConverting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setIsCompleted(true);
          setShowPreview(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleDownload = () => {
    if (!file) return;
    const mockContent = `Bu simüle edilmiş bir dönüştürme çıktısıdır.\nOrijinal Dosya: ${file.name}\nDönüştürülen Format: ${info.to}\n\nNot: Bu platform şu anda arayüz testi(mocking) aşamasındadır.`;
    const blob = new Blob([mockContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Replace the old extension with a generic one or keep original and append _converted
    a.download = `donusturulmus_${file.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ marginBottom: "1rem" }}>
          <Link href="/converter" className="btn-secondary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}>
            &larr; Geri Dön
          </Link>
        </div>
        <h1 className={styles.title}>{info.title}</h1>
        <p className={styles.subtitle}>{info.from} dosyalarınızı saniyeler içinde {info.to} formatına çevirin. Sınırsız, ücretsiz ve tamamen güvenli.</p>
      </div>

      <div className={`panel ${styles.card}`}>
        {!isCompleted && !isConverting && (
          <div 
            className={styles.uploadArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.uploadIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 className={styles.uploadTitle}>{info.from} Dosyanızı Seçin</h3>
            <p className={styles.uploadDesc}>veya sürükleyip bırakın</p>
            <input 
              type="file" 
              id="file-upload" 
              accept={info.accept} 
              className={styles.fileInput} 
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className={styles.uploadButton}>
              Dosya Seç
            </label>
            {file && (
              <div className={styles.selectedFile}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>{file.name}</span>
                <span className={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        )}

        {isConverting && (
          <div className={styles.conversionArea}>
            <div className={styles.pulseIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
            <h3 className={styles.conversionTitle}>Belgeniz Dönüştürülüyor...</h3>
            <div className={styles.progressBarWrapper}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className={styles.progressText}>%{progress}</p>
          </div>
        )}

        {isCompleted && (
          <div className={styles.successArea}>
            <div className={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className={styles.successTitle}>Dönüştürme İşlemi Tamamlandı!</h3>
            <p className={styles.successDesc}>
              <b>{file?.name}</b> başarıyla {info.to} formatına çevrildi.
            </p>
            <div className={styles.actionButtons}>
              <button 
                className="btn-primary"
                onClick={handleDownload}
              >
                Dosyayı İndir
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Önizlemeyi Kapat" : "Belgeyi Önizle"}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setFile(null);
                  setIsCompleted(false);
                  setShowPreview(false);
                }}
              >
                Yeni Dönüştür
              </button>
            </div>
            
            {showPreview && (
              <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "8px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                  <h4 style={{ margin: 0, color: "var(--text-secondary)" }}>Belge Önizlemesi</h4>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", background: "var(--bg-secondary)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{info.to}</span>
                </div>
                <div style={{ fontFamily: "monospace", color: "var(--text-primary)", fontSize: "0.9rem", whiteSpace: "pre-wrap", minHeight: "150px" }}>
                  {`[ DÖNÜŞTÜRÜLMÜŞ METİN / TABLO SİMÜLASYONU ]\n\n- Orijinal Kaynak: ${file?.name}\n- Tarih: ${new Date().toLocaleDateString("tr-TR")}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tortor a orci sagittis iaculis. Integer efficitur laoreet risus, at congue risus sodales ac.\n\nSimüle edilen veri satırları başarıyla ${info.to} formatına işlendi ve şifrelendi.`}
                </div>
              </div>
            )}
          </div>
        )}

        {!isCompleted && !isConverting && (
          <div className={styles.footerActions} style={{marginTop: "2rem"}}>
            <button 
              className={`btn-primary ${!file ? styles.disabled : ""}`}
              onClick={handleConvert}
              disabled={!file}
              style={{ padding: "0.875rem 2.5rem", fontSize: "1.1rem" }}
            >
              Dönüştürmeyi Başlat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
