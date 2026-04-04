import Link from "next/link";
import styles from "./converter.module.css";
import ToolCard from "@/components/ToolCard";

export default function ConverterHub() {
  const converters = [
    {
      title: "PDF'den Word'e",
      description: "PDF belgelerinizi düzenlenebilir Word (.docx) dosyalarına dönüştürün.",
      href: "/converter/pdf-to-word",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
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
    },
    {
      title: "PDF'den Excel'e",
      description: "PDF içerisindeki tablo verilerini Excel'e aktarın.",
      href: "/converter/pdf-to-excel",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      title: "JPG'den PDF'e",
      description: "Görsellerinizi tek bir PDF dosyası olarak birleştirin.",
      href: "/converter/jpg-to-pdf",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    },
    {
      title: "PDF'den JPG'e",
      description: "PDF sayfalarınızı yüksek çözünürlüklü görsellere çevirin.",
      href: "/converter/pdf-to-jpg",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
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
