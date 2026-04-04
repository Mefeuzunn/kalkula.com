import React from "react";

type AdType = "skyscraper" | "rectangle" | "leaderboard" | "fluid";

interface AdPlaceholderProps {
  type: AdType;
  className?: string;
}

export function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
  return (
    <div className={`ad-container ad-${type} ${className}`}>
      <span>Reklam Alanı ({type})</span>
    </div>
  );
}
