"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Yeniden kullanılabilir Google AdSense bileşeni.
 * Kullanım: <AdBanner adSlot="1234567890" adFormat="auto" />
 */
export default function AdBanner({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Aynı elemana iki kez push yapılmasını önle
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (err) {
      console.error("AdSense push hatası:", err);
    }
  }, []);

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        textAlign: "center",
        ...style,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1249009698882112"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
