import React from "react";
import AdBanner from "./AdBanner";

type AdType = "skyscraper" | "rectangle" | "leaderboard" | "fluid" | "native";

interface AdPlaceholderProps {
  type: AdType;
  className?: string;
}

export function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
  // Kullanıcının sağladığı slot ID: 9909102653
  const AD_SLOT = "9909102653";

  return (
    <div className={`ad-container ad-${type} ${className}`} style={{ minHeight: type === "leaderboard" ? "90px" : "250px" }}>
      <AdBanner 
        adSlot={AD_SLOT} 
        adFormat={type === "skyscraper" ? "vertical" : type === "leaderboard" ? "horizontal" : "auto"}
      />
    </div>
  );
}
