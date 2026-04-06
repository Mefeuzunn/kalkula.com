import Link from "next/link";
import styles from "./converter.module.css";
import ToolCard from "@/components/ToolCard";

export default function ConverterHub() {
  const converters = [
    {
      title: "PDF Birleştir",
      description: "Birden fazla PDF dökümanını tek bir dosyada güvenle birleştirin.",
      href: "/converter/pdf-merge",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M11 13h6"></path>
          <path d="M11 17h6"></path>
          <path d="M7 13h2"></path>
          <path d="M7 17h2"></path>
          <rect x="4" y="4" width="8" height="8" rx="1" fill="var(--accent-primary)" fillOpacity="0.1"></rect>
        </svg>
      )
    },
    {
      title: "PDF Sayfa Ayıkla/Böl",
      description: "Büyük bir PDF dosyasından belirli sayfaları ayıklayın veya bölün.",
      href: "/converter/pdf-split",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <line x1="12" y1="12" x2="12" y2="20" strokeDasharray="4 2"></line>
          <path d="M8 15l4-4 4 4"></path>
        </svg>
      )
    },
    {
      title: "Görselden WebP'ye",
      description: "Görsellerinizi SEO uyumlu, yüksek sıkıştırmalı WebP formatına çevirin.",
      href: "/converter/to-webp",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
          <path d="M12 9v6"></path>
          <path d="M9 12h6"></path>
        </svg>
      )
    },
    {
      title: "Resim Boyutlandırıcı",
      description: "Görsellerinizin boyutlarını (px) kalite kaybı olmadan değiştirin.",
      href: "/converter/image-resize",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14V4h10"></path>
          <path d="M20 10v10H10"></path>
          <path d="M15 15l5 5"></path>
          <path d="M4 4l5 5"></path>
        </svg>
      )
    },
    {
      title: "Word'den PDF'e",
      description: "Word belgelerinizi güvenli PDF uyumlu dökümanlara çevirin.",
      href: "/converter/word-to-pdf",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <text x="9" y="16" fontSize="8" fontWeight="bold">PDF</text>
        </svg>
      )
    },
    {
      title: "Excel'den PDF'e",
      description: "Excel tablolarınızı hızlıca PDF formatına taşıyın.",
      href: "/converter/excel-to-pdf",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M8 13h8"></path>
          <path d="M8 17h8"></path>
          <path d="M12 11v8"></path>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Belge Dönüştürücü</h1>
        <p className={styles.subtitle}>İhtiyacınız olan tüm format dönüşümlerini tek bir çatı altında, güvenli ve anında yapın.</p>
      </div>

      <div className={styles.grid}>
        {converters.map((conv, i) => (
          <ToolCard 
            key={i} 
            title={conv.title} 
            description={conv.description} 
            href={conv.href} 
            icon={conv.icon} 
          />
        ))}
      </div>
    </div>
  );
}
