"use client";

import { useState } from "react";

interface ShareResultButtonProps {
  title?: string;
  resultText: string;
}

export function ShareResultButton({ title = "Kalkula Hesaplama Sonucu", resultText }: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: resultText + "\\n\\nKalkula ile hesapladım: https://kalkula.com.tr",
    };

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Paylaşım iptal edildi veya hata:", err);
      }
    } else {
      // Fallback: Clipboard
      try {
        await navigator.clipboard.writeText(shareData.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Panoya kopyalanamadı:", e);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        background: copied ? "#10b98120" : "var(--bg-secondary)",
        color: copied ? "#10b981" : "var(--text-primary)",
        border: "1px solid " + (copied ? "#10b981" : "var(--border)"),
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
    >
      {copied ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Kopyalandı!
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Sonucu Paylaş
        </>
      )}
    </button>
  );
}
