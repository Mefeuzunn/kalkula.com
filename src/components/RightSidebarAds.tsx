import React from "react";
import { AdPlaceholder } from "./AdPlaceholder";
import { AffiliateBanner } from "./AffiliateBanner";

export function RightSidebarAds() {
  return (
    <aside className="right-sidebar sticky-sidebar">
      {/* Affiliate Banner */}
      <div style={{ marginBottom: "1.5rem" }}>
        <AffiliateBanner />
      </div>
      
      {/* 300x250 Rectangle Ad */}
      <AdPlaceholder type="rectangle" />
      
      {/* 300x600 Skyscraper Ad */}
      <AdPlaceholder type="skyscraper" />
    </aside>
  );
}
