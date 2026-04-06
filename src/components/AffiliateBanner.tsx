"use client";

import React from "react";

/**
 * Üst düzey marka uyumu için tasarlanmış Affiliate Banner bileşeni.
 * Coinpayu promosyonu için 320x50 boyutunda optimize edilmiştir.
 */
export function AffiliateBanner() {
  const affiliateUrl = "https://www.coinpayu.com/?r=ichbinefe2";
  const bannerUrl = "https://www.coinpayu.com/static/advertiser_banner/320X50.gif";

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: "0.25rem",
      padding: "0.5rem",
      background: "rgba(0,0,0,0.02)",
      borderRadius: "12px",
      border: "1px solid var(--border)",
      overflow: "hidden"
    }}>
      <span style={{ 
        fontSize: "0.6rem", 
        fontWeight: 800, 
        color: "var(--text-muted)", 
        textTransform: "uppercase", 
        letterSpacing: "0.1em" 
      }}>
        Sponsorlu
      </span>
      <a 
        href={affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer nofollow"
        style={{ display: "block", lineHeight: 0 }}
      >
        <img 
          src={bannerUrl} 
          alt="Join Coinpayu to earn!" 
          style={{ 
            maxWidth: "100%", 
            height: "auto", 
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }} 
        />
      </a>
    </div>
  );
}
