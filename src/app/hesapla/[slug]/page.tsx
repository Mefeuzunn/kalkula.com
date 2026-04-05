import React from "react";
import { Metadata } from "next";
import { getCalculatorBySlug, getCategoryBySlug, calculators } from "@/data/calculators";
import { CalculatorClient } from "@/components/CalculatorClient";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO için Dinamik Metadata Oluşturma
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: "Araç Bulunamadı | Kalküla",
    };
  }

  return {
    title: `${calc.title} Hesaplama`,
    description: calc.description,
    alternates: {
      canonical: `https://kalkula.com/hesapla/${slug}`,
    },
    openGraph: {
      title: `${calc.title} | Kalküla`,
      description: calc.description,
      url: `https://kalkula.com/hesapla/${slug}`,
    },
  };
}

// Statik Parametre Üretimi (Hızlı Yükleme ve SEO için)
export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  const category = calc ? (getCategoryBySlug(calc.categoryId) ?? null) : null;

  if (!calc) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Hesaplama aracı bulunamadı.</h2>
        <Link href="/" className="btn-secondary" style={{ marginTop: "2rem" }}>&larr; Geri Dön</Link>
      </div>
    );
  }

  // Google için Yapılandırılmış Veri (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calc.title,
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "description": calc.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorClient slug={slug} calc={calc} category={category} />
    </>
  );
}
