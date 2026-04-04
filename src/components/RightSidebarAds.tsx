import React from "react";
import { AdPlaceholder } from "./AdPlaceholder";

export function RightSidebarAds() {
  return (
    <aside className="right-sidebar sticky-sidebar">
      {/* 300x250 Rectangle Ad */}
      <AdPlaceholder type="rectangle" />
      
      {/* 300x600 Skyscraper Ad */}
      <AdPlaceholder type="skyscraper" />
    </aside>
  );
}
