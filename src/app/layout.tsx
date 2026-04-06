import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { KalkulaAI } from "@/components/KalkulaAI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kalkula.com"),
  title: {
    default: "Kalkula | Türkiye'nin En Kapsamlı Hesaplama Platformu",
    template: "%s | Kalkula"
  },
  description: "Kalkula ile finans, eğitim, sağlık, vergi ve daha fazlasını kapsayan 60+ ücretsiz hesaplama aracı, not defteri, takvim ve belge dönüştürücü tek platformda.",
  keywords: ["hesaplama", "hesap makinesi", "kredi hesaplama", "vergi hesaplama", "kalkula", "birim dönüştürücü"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kalkula | Türkiye'nin En Kapsamlı Hesaplama Platformu",
    description: "160+ profesyonel hesaplama aracı tek platformda.",
    url: "https://kalkula.com",
    siteName: "Kalkula",
    locale: "tr_TR",
    type: "website",
  },
};

import { TimerProvider } from "@/context/TimerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kalkula",
    "url": "https://kalkula.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://kalkula.com/ara?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1249009698882112"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TimerProvider>
            <Navbar />
            <main style={{ paddingTop: "64px", minHeight: "calc(100vh - 200px)" }}>
              {children}
            </main>
            <Footer />
            <CookieConsent />
            <KalkulaAI />
          </TimerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
