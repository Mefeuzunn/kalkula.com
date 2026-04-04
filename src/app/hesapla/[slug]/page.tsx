"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCalculatorBySlug, getCategoryBySlug } from "@/data/calculators";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebarAds } from "@/components/RightSidebarAds";
import { AdPlaceholder } from "@/components/AdPlaceholder";

// Yeni eklenen Bileşenleri İçe Aktar
import { PregnancyCalculator } from "@/components/calculators/PregnancyCalculator";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { CreditCardCalculator } from "@/components/calculators/CreditCardCalculator";
import { EbobEkokCalculator } from "@/components/calculators/EbobEkokCalculator";
import { NetGrossCalculator } from "@/components/calculators/NetGrossCalculator";
import { InflationCalculator } from "@/components/calculators/InflationCalculator";
import { InterestCalculator } from "@/components/calculators/InterestCalculator";
import { SeveranceCalculator } from "@/components/calculators/SeveranceCalculator";

// 8 Yeni Eklenen Araçlar
import { AgssCalculator } from "@/components/calculators/AgssCalculator";
import { EurobondCalculator } from "@/components/calculators/EurobondCalculator";
import { GenerationCalculator } from "@/components/calculators/GenerationCalculator";
import { HsyCalculator } from "@/components/calculators/HsyCalculator";
import { VehicleExpenseCalculator } from "@/components/calculators/VehicleExpenseCalculator";
import { PriceCalculator } from "@/components/calculators/PriceCalculator";
import { DayOfYearCalculator } from "@/components/calculators/DayOfYearCalculator";
import { NpvCalculator } from "@/components/calculators/NpvCalculator";

// Finans Araclari - Yeni 15
import { GoldCalculator } from "@/components/calculators/GoldCalculator";
import { CurrencyCalculator } from "@/components/calculators/CurrencyCalculator";
import { CagrCalculator } from "@/components/calculators/CagrCalculator";
import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";
import { BillCalculator } from "@/components/calculators/BillCalculator";
import { BondCalculator } from "@/components/calculators/BondCalculator";
import { HistoricalGoldCalculator } from "@/components/calculators/HistoricalGoldCalculator";
import { HistoricalCurrencyCalculator } from "@/components/calculators/HistoricalCurrencyCalculator";
import { IbanValidator } from "@/components/calculators/IbanValidator";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { IrrCalculator } from "@/components/calculators/IrrCalculator";
import { RentIncreaseCalculator } from "@/components/calculators/RentIncreaseCalculator";
import { AverageMaturityCalculator } from "@/components/calculators/AverageMaturityCalculator";
import { TimeValueCalculator } from "@/components/calculators/TimeValueCalculator";
import { RealReturnCalculator } from "@/components/calculators/RealReturnCalculator";
import { RepoCalculator } from "@/components/calculators/RepoCalculator";
import { DividendCalculator } from "@/components/calculators/DividendCalculator";
import { FuturesCalculator } from "@/components/calculators/FuturesCalculator";
import { DepositInterestCalculator } from "@/components/calculators/DepositInterestCalculator";

// Egitim Araclari
import { LgsCalculator } from "@/components/calculators/LgsCalculator";
import { YksCalculator } from "@/components/calculators/YksCalculator";
import { GradeCalculator } from "@/components/calculators/GradeCalculator";
// Yeni Egitim / Okul Paketi
import { UniversityExamCalculator } from "@/components/calculators/UniversityExamCalculator";
import { EOkulCalculator } from "@/components/calculators/EOkulCalculator";
import { LessonGradeCalculator } from "@/components/calculators/LessonGradeCalculator";
import { HighSchoolSubjectCalculator } from "@/components/calculators/HighSchoolSubjectCalculator";
import { HighSchoolPassCalculator } from "@/components/calculators/HighSchoolPassCalculator";
import { HighSchoolGPA } from "@/components/calculators/HighSchoolGPA";
import { CertificateCalculator } from "@/components/calculators/CertificateCalculator";
import { HighSchoolYBPCalculator } from "@/components/calculators/HighSchoolYBPCalculator";
import { HighSchoolGraduationCalculator } from "@/components/calculators/HighSchoolGraduationCalculator";
import { UniversityGPACalculator } from "@/components/calculators/UniversityGPACalculator";
import { SchoolAgeCalculator } from "@/components/calculators/SchoolAgeCalculator";
import { KdvCalculator, DamgaVergisiCalculator, GelirVergisiCalculator } from "@/components/calculators/TaxCalculators";
import { KarMarjiCalculator, KarZararCalculator, TopPriceCalculator, BreakEvenCalculator } from "@/components/calculators/CommercialCalculators";
import { DateDiffCalculator, AgeCalculator, TimeCalculator, WorkHoursCalculator } from "@/components/calculators/TimeCalculators";
import { KpssCalculator, AlesCalculator, DgsCalculator, YdsCalculator } from "@/components/calculators/OsymCalculators";
import { PeriodCalculator, ZodiacCalculator } from "@/components/calculators/ExtraHealthMiscCalculators";
import { FractionsCalculator, LogarithmCalculator } from "@/components/calculators/ExtraMathCalculators";
import { IdealWeightCalculator, WaterIntakeCalculator, SleepCycleCalculator, BmrCalculator, AreaVolumeCalculator, PowerRootCalculator, EquationSolverCalculator, PrimeNumberCalculator } from "@/components/calculators/Phase1Calculators";
import { FuelCostCalculator, MtvCalculator } from "@/components/calculators/Phase2Calculators";
import { LengthConverter, WeightConverter, TempConverter, AreaConverter, VolumeConverter, SpeedConverter, DataConverter, TimeConverter } from "@/components/calculators/Converters";
import { AofCalculator, TusDusCalculator, ChineseZodiac, AscendantCalculator } from "@/components/calculators/Phase3Calculators";
import { PasswordGenerator, WordCounter, QRCodeGenerator, RaffleMaker, RandomNumberGen } from "@/components/calculators/Phase4Utilities";
import { JsonFormatter, HashGenerator, ColorConverter } from "@/components/calculators/Phase4DevTools";

// BMI Calculator within the file
function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      setResult(w / (h * h));
    }
  };

  let status = "";
  let color = "";

  if (result !== null) {
    if (result < 18.5) { status = "Zayıf"; color = "#3b82f6"; } // Blue
    else if (result < 24.9) { status = "Normal"; color = "#22c55e"; } // Green
    else if (result < 29.9) { status = "Fazla Kilolu"; color = "#eab308"; } // Yellow
    else { status = "Obez"; color = "#ef4444"; } // Red
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Boy (cm)</label>
        <input 
          type="number" 
          placeholder="Örn: 175" 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="input-field" 
        />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Kilo (kg)</label>
        <input 
          type="number" 
          placeholder="Örn: 70" 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="input-field" 
        />
      </div>
      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result !== null && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${color}` }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Vücut Kitle Endeksiniz:</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0", color: "var(--text-primary)" }}>
            {result.toFixed(1)}
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 600, color }}>
            {status}
          </div>
        </div>
      )}
    </div>
  );
}

// Global Mock Component
function GenericCalculator() {
  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem auto" }}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <p style={{ fontSize: "1.1rem" }}>Bu hesaplama aracı çok yakında form yapısıyla hizmetinizde olacak.</p>
    </div>
  );
}

export default function CalculatorPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";
  
  const calc = getCalculatorBySlug(slug);
  const category = calc ? getCategoryBySlug(calc.categoryId) : null;

  useEffect(() => {
    if (calc) {
      try {
        const stored = JSON.parse(localStorage.getItem("recent_calculators") || "[]");
        const filtered = stored.filter((s: string) => s !== slug);
        filtered.unshift(slug);
        localStorage.setItem("recent_calculators", JSON.stringify(filtered.slice(0, 4)));
      } catch (e) {
        // ignore errors
      }
    }
  }, [slug, calc]);

  if (!calc) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Hesaplama aracı bulunamadı.</h2>
        <Link href="/" className="btn-secondary" style={{ marginTop: "2rem" }}>&larr; Geri Dön</Link>
      </div>
    );
  }

  const renderCalculator = () => {
    switch (slug) {
      case "vucut-kitle-endeksi": return <BMICalculator />;
      case "gebelik": return <PregnancyCalculator />;
      case "adet-takibi": return <PeriodCalculator />;
      case "ideal-kilo": return <IdealWeightCalculator />;
      case "su-ihtiyaci": return <WaterIntakeCalculator />;
      case "uyku-dongusu": return <SleepCycleCalculator />;
      case "bmr": return <BmrCalculator />;
      case "gunluk-kalori-ihtiyaci": return <CalorieCalculator />;
      case "kredi-hesaplama": return <LoanCalculator />;
      case "kredi-karti-asgari": return <CreditCardCalculator />;
      case "faiz": return <InterestCalculator />;
      case "enflasyon": return <InflationCalculator />;
      
      // Matematik
      case "yuzde": return <PercentageCalculator />;
      case "ebob-ekok": return <EbobEkokCalculator />;
      case "kesir": return <FractionsCalculator />;
      case "logaritma": return <LogarithmCalculator />;
      case "alan-hacim": return <AreaVolumeCalculator />;
      case "uslu-koklu": return <PowerRootCalculator />;
      case "denklem-cozucu": return <EquationSolverCalculator />;
      case "asal-sayi": return <PrimeNumberCalculator />;
      
      // Muhasebe ve Gündelik
      case "netten-brute": return <NetGrossCalculator />;
      case "kidem-tazminati": return <SeveranceCalculator />;
      case "yakit-maliyeti": return <FuelCostCalculator />;
      case "mtv-hesaplama": return <MtvCalculator />;
      
      // Yeni eklenen 8 arac
      case "ags-puan": return <AgssCalculator />;
      case "eurobond": return <EurobondCalculator />;
      case "kusak": return <GenerationCalculator />;
      case "hakim-savci-puan": return <HsyCalculator />;
      case "binek-arac-gider": return <VehicleExpenseCalculator />;
      case "fiyat": return <PriceCalculator />;
      case "yilin-kacinci-gunu": return <DayOfYearCalculator />;
      case "net-bugunku-deger": return <NpvCalculator />;
      
      // Dev Finans Paketi
      case "altin": return <GoldCalculator />;
      case "doviz": return <CurrencyCalculator />;
      case "bilesik-buyume": return <CagrCalculator />;
      case "birikim": return <SavingsCalculator />;
      case "bono": return <BillCalculator />;
      case "tahvil": return <BondCalculator />;
      case "gecmis-altin": return <HistoricalGoldCalculator />;
      case "gecmis-doviz": return <HistoricalCurrencyCalculator />;
      case "iban": return <IbanValidator />;
      case "iskonto": return <DiscountCalculator />;
      case "ic-verim-orani": return <IrrCalculator />;
      case "kira-artisi": return <RentIncreaseCalculator />;
      case "ortalama-vade": return <AverageMaturityCalculator />;
      case "parasal-deger": return <TimeValueCalculator />;
      case "reel-getiri": return <RealReturnCalculator />;
      case "repo": return <RepoCalculator />;
      case "temettu": return <DividendCalculator />;
      case "vadeli-islem": return <FuturesCalculator />;
      case "vadeli-mevduat": return <DepositInterestCalculator />;
      
      // Egitim & Sinavlar
      case "kpss-puan": return <KpssCalculator />;
      case "ales-puan": return <AlesCalculator />;
      case "dgs-puan": return <DgsCalculator />;
      case "yds-puan": return <YdsCalculator />;
      case "tus-dus-puan": return <TusDusCalculator />;
      case "aof-harf-notu": return <AofCalculator />;
      case "lgs-puan": return <LgsCalculator />;
      case "yks-puan": return <YksCalculator />;
      case "not-ortalamasi": return <GradeCalculator />;
      case "vize-final-ortalama": return <UniversityExamCalculator />;
      case "e-okul-not": return <EOkulCalculator />;
      case "ders-notu-hesaplama": return <LessonGradeCalculator />;
      case "lise-ders-puani": return <HighSchoolSubjectCalculator />;
      case "lise-sinif-gecme": return <HighSchoolPassCalculator />;
      case "lise-ortalama": return <HighSchoolGPA />;
      case "takdir-tesekkur": return <CertificateCalculator />;
      case "lise-ybp": return <HighSchoolYBPCalculator />;
      case "lise-mezuniyet": return <HighSchoolGraduationCalculator />;
      case "universite-not-ortalamasi": return <UniversityGPACalculator />;
      case "okula-baslama-yasi": return <SchoolAgeCalculator />;

      // Vergi
      case "kdv": return <KdvCalculator />;
      case "damga-vergisi": return <DamgaVergisiCalculator />;
      case "gelir-vergisi": return <GelirVergisiCalculator />;

      // Ticari
      case "kar-marji": return <KarMarjiCalculator />;
      case "kar-zarar": return <KarZararCalculator />;
      case "toptan-perakende": return <TopPriceCalculator />;
      case "basabas-noktasi": return <BreakEvenCalculator />;

      // Zaman & Diger
      case "tarihler-arasi-gun": return <DateDiffCalculator />;
      case "yas-hesaplama": return <AgeCalculator />;
      case "saat-hesaplama": return <TimeCalculator />;
      case "calisma-saati": return <WorkHoursCalculator />;
      case "burc-hesaplama": return <ZodiacCalculator />;
      case "cin-burcu": return <ChineseZodiac />;
      case "yukselen-burc": return <AscendantCalculator />;
      
      // Donusturuculer
      case "uzunluk-cevirici": return <LengthConverter />;
      case "agirlik-cevirici": return <WeightConverter />;
      case "sicaklik-cevirici": return <TempConverter />;
      case "alan-cevirici": return <AreaConverter />;
      case "hacim-cevirici": return <VolumeConverter />;
      case "hiz-cevirici": return <SpeedConverter />;
      case "veri-cevirici": return <DataConverter />;
      case "zaman-cevirici": return <TimeConverter />;

      // Geliştirici & Pratik Araçlar (YENI)
      case "sifre-olusturucu": return <PasswordGenerator />;
      case "kelime-sayaci": return <WordCounter />;
      case "qr-kod-olusturucu": return <QRCodeGenerator />;
      case "cekilis-yapici": return <RaffleMaker />;
      case "rastgele-sayi": return <RandomNumberGen />;
      case "json-formatter": return <JsonFormatter />;
      case "hash-generator": return <HashGenerator />;
      case "renk-donusturucu": return <ColorConverter />;

      default: return <GenericCalculator />;
    }
  };

  return (
    <div className="container layout-3col" style={{ padding: "3rem 1rem" }}>
      <LeftSidebar />
      
      <div className="main-content">
        <AdPlaceholder type="leaderboard" />
        
        {category && (
          <div style={{ marginBottom: "1rem" }}>
            <Link href={`/kategori/${category.slug}`} style={{ color: "var(--text-muted)", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <span>{category.name}</span>
              <span>&rsaquo;</span>
              <span style={{ color: "var(--text-primary)" }}>{calc.title}</span>
            </Link>
          </div>
        )}

        <div className="panel" style={{ padding: 0 }}>
          {/* Header Area */}
          <div style={{ padding: "2.5rem 2.5rem 1.75rem", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{calc.title}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "800px" }}>
              {calc.description}
            </p>
          </div>

          {/* Calculator Area */}
          <div style={{ padding: "2.5rem" }}>
            {renderCalculator()}
          </div>
        </div>
        
        <AdPlaceholder type="fluid" />
      </div>

      <RightSidebarAds />
    </div>
  );
}
