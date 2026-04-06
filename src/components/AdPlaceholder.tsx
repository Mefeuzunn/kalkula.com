import React from "react";
import AdBanner from "./AdBanner";

type AdType = "skyscraper" | "rectangle" | "leaderboard" | "fluid" | "native" | "multiplex";

interface AdPlaceholderProps {
  type: AdType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Kalkula 2026 AdSense Entegrasyon Bileşeni.
 * CLS (Layout Shift) önlemek için sabit min-height kullanımı içerir.
 */
export function AdPlaceholder({ type, className = "", style }: AdPlaceholderProps) {
  // Global AdSense Slot ID
  const AD_SLOT = "9909102653";

  return (
    <div 
      className={`ad-container ad-${type} ${className}`} 
      style={{ 
        ...style 
      }}
    >
      <AdBanner 
        adSlot={AD_SLOT} 
        adFormat={
          type === "skyscraper" ? "vertical" : 
          type === "leaderboard" ? "horizontal" : 
          type === "rectangle" ? "rectangle" : 
          "auto"
        }
      />
    </div>
  );
}
