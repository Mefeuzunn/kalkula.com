import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalküla | Türkiye'nin En Kapsamlı Hesaplama Platformu",
  description: "Kalküla ile finans, eğitim, sağlık, vergi ve daha fazlasını kapsayan 60+ ücretsiz hesaplama aracı, not defteri, takvim ve belge dönüştürücü tek platformda.",
  keywords: "hesaplama, hesap makinesi, kredi hesaplama, vergi hesaplama, kalküla",
  openGraph: {
    title: "Kalküla | Türkiye'nin En Kapsamlı Hesaplama Platformu",
    description: "60+ ücretsiz hesaplama aracı tek platformda.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main style={{ paddingTop: "64px", minHeight: "calc(100vh - 200px)" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
