"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="btn-secondary" style={{ width: 46, height: 46 }}></button>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn-secondary"
      aria-label="Toggle Dark Mode"
      title={theme === "dark" ? "Açık Tema" : "Koyu Tema"}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
