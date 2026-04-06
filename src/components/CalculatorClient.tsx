"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryBySlug, Category, CalculatorInfo } from "@/data/calculators";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebarAds } from "@/components/RightSidebarAds";
import { AdPlaceholder } from "@/components/AdPlaceholder";

// Tüm Hesaplama Bileşenlerini İçe Aktar (Orijinal dosyadan kopyalandı)
import { BmiCalculator } from "@/components/calculators/BmiCalculator";
import { PregnancyCalculator } from "@/components/calculators/PregnancyCalculator";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { LoanAmortization } from "@/components/calculators/LoanAmortization";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { CreditCardCalculator } from "@/components/calculators/CreditCardCalculator";
import { EbobEkokCalculator } from "@/components/calculators/EbobEkokCalculator";
import { NetGrossCalculator } from "@/components/calculators/NetGrossCalculator";
import { InflationCalculator } from "@/components/calculators/InflationCalculator";
import { InterestCalculator } from "@/components/calculators/InterestCalculator";
import { SeveranceCalculator } from "@/components/calculators/SeveranceCalculator";
import { BodyFatCalculator } from "@/components/calculators/BodyFatCalculator";
import { AgssCalculator } from "@/components/calculators/AgssCalculator";
import { EurobondCalculator } from "@/components/calculators/EurobondCalculator";
import { GenerationCalculator } from "@/components/calculators/GenerationCalculator";
import { HsyCalculator } from "@/components/calculators/HsyCalculator";
import { VehicleExpenseCalculator } from "@/components/calculators/VehicleExpenseCalculator";
import { PriceCalculator } from "@/components/calculators/PriceCalculator";
import { DayOfYearCalculator } from "@/components/calculators/DayOfYearCalculator";
import { BmrCalculator } from "./calculators/BmrCalculator";
import { MacroCalculator } from "./calculators/MacroCalculator";
import { CagrCalculator } from "@/components/calculators/CagrCalculator";
import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";
import { BillCalculator } from "@/components/calculators/BillCalculator";
import { HistoricalGoldCalculator } from "@/components/calculators/HistoricalGoldCalculator";
import { HistoricalCurrencyCalculator } from "@/components/calculators/HistoricalCurrencyCalculator";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { RentIncreaseCalculator } from "@/components/calculators/RentIncreaseCalculator";
import { AverageMaturityCalculator } from "@/components/calculators/AverageMaturityCalculator";
import { TimeValueCalculator } from "@/components/calculators/TimeValueCalculator";
import { RealReturnCalculator } from "@/components/calculators/RealReturnCalculator";
import { RepoCalculator } from "@/components/calculators/RepoCalculator";
import { DividendCalculator } from "@/components/calculators/DividendCalculator";
import { FuturesCalculator } from "@/components/calculators/FuturesCalculator";
import { DepositInterestCalculator } from "@/components/calculators/DepositInterestCalculator";
import { LgsCalculator } from "@/components/calculators/LgsCalculator";
import { YksCalculator } from "@/components/calculators/YksCalculator";
import { GradeCalculator } from "@/components/calculators/GradeCalculator";
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
import { DamgaVergisiCalculator } from "@/components/calculators/TaxCalculators";
import { IncomeTaxCalculator } from "@/components/calculators/IncomeTaxCalculator";
import { VatCalculator } from "@/components/calculators/VatCalculator";
import { KarZararCalculator, TopPriceCalculator, BreakEvenCalculator } from "@/components/calculators/CommercialCalculators";
import { CommercialAnalytics } from "@/components/calculators/CommercialAnalytics";
import { DateDiffCalculator, AgeCalculator, TimeCalculator, WorkHoursCalculator } from "@/components/calculators/TimeCalculators";
import { KpssCalculator, AlesCalculator, DgsCalculator, YdsCalculator } from "@/components/calculators/OsymCalculators";
import { PeriodCalculator, ZodiacCalculator } from "@/components/calculators/ExtraHealthMiscCalculators";
import { FractionsCalculator, LogarithmCalculator } from "@/components/calculators/ExtraMathCalculators";
import { MatrixCalculator } from "@/components/calculators/MatrixCalculator";
import { EquationSolver } from "@/components/calculators/EquationSolver";
import { IdealWeightCalculator, PowerRootCalculator, PrimeNumberCalculator } from "@/components/calculators/Phase1Calculators";
import { GeometryCalculators } from "@/components/calculators/GeometryCalculators";
import { OhmLawCalculator } from "@/components/calculators/OhmLawCalculator";
import { PhysicsVisualizers } from "@/components/calculators/PhysicsVisualizers";
import { ResistorCalculator } from "@/components/calculators/ResistorCalculator";
import { FuelCostCalculator } from "@/components/calculators/Phase2Calculators";
import { WaterIntakePremium } from "@/components/calculators/WaterIntakePremium";
import { SleepCyclePremium } from "@/components/calculators/SleepCyclePremium";
import { MtvCalculator } from "@/components/calculators/MtvCalculator";
import { LengthConverter, WeightConverter, TempConverter, AreaConverter, VolumeConverter, SpeedConverter, DataConverter, TimeConverter, KitchenConverter } from "@/components/calculators/Converters";
import { AofCalculator } from "@/components/calculators/AofCalculator";
import { TusDusCalculator } from "@/components/calculators/TusDusCalculator";
import { RecipeScaler } from "@/components/calculators/RecipeScaler";
import { GastroConverter } from "@/components/calculators/GastroConverter";
import { ChineseZodiac } from "@/components/calculators/ChineseZodiac";
import { AscendantCalculator } from "@/components/calculators/AscendantCalculator";
import { RaffleMaker } from "@/components/calculators/RaffleMaker";
import { RandomNumberGenerator } from "@/components/calculators/RandomNumberGenerator";
import { PasswordGenerator } from "@/components/calculators/PasswordGenerator";
import { WordCounter } from "@/components/calculators/WordCounter";
import { QRCodeGenerator } from "@/components/calculators/QRCodeGenerator";
import { JsonFormatter } from "@/components/calculators/JsonFormatter";
import { HashGenerator } from "@/components/calculators/HashGenerator";
import { ColorConverter } from "@/components/calculators/ColorConverter";
import { Base64Converter } from "@/components/calculators/Base64Converter";
import { XCharacterCounter } from "@/components/calculators/XCharacterCounter";
import { StyleTextGenerator } from "@/components/calculators/StyleTextGenerator";

import { MebEkDersCalculator } from "@/components/calculators/MebEkDersCalculator";
import { AkademisyenEkDersCalculator } from "@/components/calculators/AkademisyenEkDersCalculator";
import { CurrencyCommodityCalculator } from "@/components/calculators/CurrencyCommodityCalculator";
import { TaxFreeCalculator } from "@/components/calculators/TaxFreeCalculator";
import { VolumeCalculator } from "@/components/calculators/VolumeCalculator";
import { DesiCalculator } from "@/components/calculators/DesiCalculator";
import { IbanValidator } from "@/components/calculators/IbanValidator";
import { BondCalculator } from "@/components/calculators/BondCalculator";
import { IrrNpvCalculator } from "@/components/calculators/IrrNpvCalculator";
import { BtuCalculator } from "@/components/calculators/BtuCalculator";
import { MotorPowerCalculator } from "@/components/calculators/MotorPowerCalculator";
import { SteelWeightCalculator } from "@/components/calculators/SteelWeightCalculator";
import { KineticEnergyCalculator } from "@/components/calculators/KineticEnergyCalculator";
import { FluidPressureCalculator } from "@/components/calculators/FluidPressureCalculator";
import { StatisticsCalculator } from "@/components/calculators/StatisticsCalculator";
import { PermutationCombinationCalculator } from "@/components/calculators/PermutationCombinationCalculator";

function GenericCalculator() {
  return (
    <div className="animate-fade-in" style={{ textAlign: "center", padding: "4rem 2rem", background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dashed var(--border)' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
        <div className="animate-pulse" style={{ position: 'absolute', inset: 0, background: 'var(--accent-glow)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"></path>
        </svg>
      </div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>Başarıyla Geliştiriliyor</h2>
      <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto" }}>
        Bu modül şu an 2026 standartlarına uygun şekilde optimize ediliyor. Çok yakında tam kapasite ile yayında olacak.
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {[1,2,3].map(i => <div key={i} className="animate-bounce" style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', animationDelay: `${i * 0.2}s` }}></div>)}
      </div>
    </div>
  );
}

interface CalculatorClientProps {
  slug: string;
  calc: CalculatorInfo;
  category: Category | null;
}

export function CalculatorClient({ slug, calc, category }: CalculatorClientProps) {
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

  const renderCalculator = () => {
    switch (slug) {
      case "vucut-kitle-endeksi": return <BmiCalculator />;
      case "gebelik": return <PregnancyCalculator />;
      case "vucut-yag-orani": return <BodyFatCalculator />;
      case "adet-takibi": return <PeriodCalculator />;
      case "ideal-kilo": return <IdealWeightCalculator />;
      case "su-ihtiyaci":
      case "su-takibi": return <WaterIntakePremium />;
      case "uyku-dongusu": return <SleepCyclePremium />;
      case "makro-hesaplama": return <MacroCalculator />;
      case "bmr": return <BmrCalculator />;
      case "gunluk-kalori-ihtiyaci": return <CalorieCalculator />;
      case "kredi-hesaplama": return <LoanCalculator />;
      case "kredi-ödeme-plani": return <LoanAmortization />;
      case "kredi-karti-asgari": return <CreditCardCalculator />;
      case "faiz": return <InterestCalculator />;
      case "enflasyon": return <InflationCalculator />;
      case "yuzde": return <PercentageCalculator />;
      case "ebob-ekok": return <EbobEkokCalculator />;
      case "kesir-hesaplama": return <FractionsCalculator />;
      case "matris-hesaplama": return <MatrixCalculator />;
      case "denklem-cozucu": return <EquationSolver />;
      case "logaritma": return <LogarithmCalculator />;
      case "alan-hacim": return <GeometryCalculators />;
      case "uslu-koklu": return <PowerRootCalculator />;
      case "denklem-eski": return <EquationSolver />;
      case "asal-sayi": return <PrimeNumberCalculator />;
      case "netten-brute": return <NetGrossCalculator />;
      case "kidem-tazminati": return <SeveranceCalculator />;
      case "meb-ek-ders-hesaplama": return <MebEkDersCalculator />;
      case "akademisyen-ek-ders-hesaplama": return <AkademisyenEkDersCalculator />;
      case "yakit-maliyeti": return <FuelCostCalculator />;
      case "mtv-hesaplama": return <MtvCalculator />;
      case "tax-free-hesaplama": return <TaxFreeCalculator />;
      case "doviz-altin-hesaplama": return <CurrencyCommodityCalculator />;
      case "kargo-desi-hesaplama": return <DesiCalculator />;
      case "litre-cl-ml-hesaplama": return <VolumeCalculator />;
      case "ags-puan": return <AgssCalculator />;
      case "eurobond": return <EurobondCalculator />;
      case "kusak": return <GenerationCalculator />;
      case "hakim-savci-puan": return <HsyCalculator />;
      case "binek-arac-gider": return <VehicleExpenseCalculator />;
      case "fiyat": return <PriceCalculator />;
      case "yilin-kacinci-gunu": return <DayOfYearCalculator />;
      case "net-bugunku-deger": return <IrrNpvCalculator />;
      case "bilesik-buyume": return <CagrCalculator />;
      case "birikim": return <SavingsCalculator />;
      case "bono": return <BillCalculator />;
      case "tahvil": return <BondCalculator />;
      case "gecmis-altin": return <HistoricalGoldCalculator />;
      case "gecmis-doviz": return <HistoricalCurrencyCalculator />;
      case "iban": return <IbanValidator />;
      case "iskonto": return <DiscountCalculator />;
      case "ic-verim-orani": return <IrrNpvCalculator />;
      case "kira-artisi": return <RentIncreaseCalculator />;
      case "ortalama-vade": return <AverageMaturityCalculator />;
      case "parasal-deger": return <TimeValueCalculator />;
      case "reel-getiri": return <RealReturnCalculator />;
      case "repo": return <RepoCalculator />;
      case "temettu": return <DividendCalculator />;
      case "vadeli-islem": return <FuturesCalculator />;
      case "vadeli-mevduat": return <DepositInterestCalculator />;
      case "kpss-puan": return <KpssCalculator />;
      case "ales-puan": return <AlesCalculator />;
      case "dgs-puan": return <DgsCalculator />;
      case "yds-puan": return <YdsCalculator />;
      case "tus-dus-puan": return <TusDusCalculator />;
      case "tarif-olcekleyici": return <RecipeScaler />;
      case "mutfak-donusturucu": return <GastroConverter />;
      case "egik-atish": return <PhysicsVisualizers />;
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
      case "kdv": return <VatCalculator />;
      case "direnc-hesaplama": return <ResistorCalculator />;
      case "ohm-kanunu": return <OhmLawCalculator />;
      case "gelir-vergisi": return <IncomeTaxCalculator />;
      case "damga-vergisi": return <DamgaVergisiCalculator />;
      case "kar-marji": return <CommercialAnalytics />;
      case "kar-zarar": return <KarZararCalculator />;
      case "toptan-perakende": return <TopPriceCalculator />;
      case "basabas-noktasi": return <BreakEvenCalculator />;
      case "tarihler-arasi-gun": return <DateDiffCalculator />;
      case "yas-hesaplama": return <AgeCalculator />;
      case "saat-hesaplama": return <TimeCalculator />;
      case "calisma-saati": return <WorkHoursCalculator />;
      case "burc-hesaplama": return <ZodiacCalculator />;
      case "cin-burcu": return <ChineseZodiac />;
      case "yukselen-burc": return <AscendantCalculator />;
      case "uzunluk-cevirici": return <LengthConverter />;
      case "agirlik-cevirici": return <WeightConverter />;
      case "sicaklik-cevirici": return <TempConverter />;
      case "alan-cevirici": return <AreaConverter />;
      case "hacim-cevirici": return <VolumeConverter />;
      case "mutfak-donusturucu": return <KitchenConverter />;
      case "hiz-cevirici": return <SpeedConverter />;
      case "veri-cevirici": return <DataConverter />;
      case "zaman-cevirici": return <TimeConverter />;
      case "twitter-karakter-sayaci": return <XCharacterCounter />;
      case "sik-yazi-tipi-olusturucu": return <StyleTextGenerator />;
      case "sifre-olusturucu": return <PasswordGenerator />;
      case "kelime-sayaci": return <WordCounter />;
      case "qr-kod-olusturucu": return <QRCodeGenerator />;
      case "cekilis-yapici": return <RaffleMaker />;
      case "rastgele-sayi": return <RandomNumberGenerator />;
      case "json-formatter": return <JsonFormatter />;
      case "hash-generator": return <HashGenerator />;
      case "base64-converter": return <Base64Converter />;
      case "renk-donusturucu": return <ColorConverter />;
      case "btu-hesaplama": return <BtuCalculator />;
      case "motor-gucu-hesaplama": return <MotorPowerCalculator />;
      case "metal-agirlik-hesaplama": return <SteelWeightCalculator />;
      case "kinetik-enerji-hesaplama": return <KineticEnergyCalculator />;
      case "sivi-basinci-hesaplama": return <FluidPressureCalculator />;
      case "istatistik-hesaplama": return <StatisticsCalculator />;
      case "permutasyon-kombinasyon-hesaplama": return <PermutationCombinationCalculator />;
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
          <div style={{ padding: "2.5rem 2.5rem 1.75rem", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{calc.title}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "800px" }}>
              {calc.description}
            </p>
          </div>
          
          <div style={{ padding: "1.5rem 2.5rem" }}>
             <AdPlaceholder type="native" />
          </div>

          <div style={{ padding: "2.5rem" }}>
            {renderCalculator()}
          </div>
        </div>
        
        <AdPlaceholder type="fluid" style={{ marginTop: '2rem' }} />

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem", opacity: 0.8 }}>Sizin İçin Seçtiklerimiz</h3>
          <AdPlaceholder type="multiplex" />
        </div>
      </div>

      <RightSidebarAds />
    </div>
  );
}
