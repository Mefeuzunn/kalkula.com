"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCalculatorBySlug, getCategoryBySlug, Category, CalculatorInfo } from "@/data/calculators";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebarAds } from "@/components/RightSidebarAds";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import confetti from "canvas-confetti";

// Tüm Hesaplama Bileşenlerini İçe Aktar (Orijinal dosyadan kopyalandı)
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
import { AgssCalculator } from "@/components/calculators/AgssCalculator";
import { EurobondCalculator } from "@/components/calculators/EurobondCalculator";
import { GenerationCalculator } from "@/components/calculators/GenerationCalculator";
import { HsyCalculator } from "@/components/calculators/HsyCalculator";
import { VehicleExpenseCalculator } from "@/components/calculators/VehicleExpenseCalculator";
import { PriceCalculator } from "@/components/calculators/PriceCalculator";
import { DayOfYearCalculator } from "@/components/calculators/DayOfYearCalculator";
import { BmrCalculator } from "@/components/calculators/BmrCalculator";
import { MacroCalculator } from "@/components/calculators/MacroCalculator";
import { GoldCalculator } from "@/components/calculators/GoldCalculator";
import { CurrencyCalculator } from "@/components/calculators/CurrencyCalculator";
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
import { IdealWeightCalculator, SleepCycleCalculator, PowerRootCalculator, EquationSolverCalculator, PrimeNumberCalculator } from "@/components/calculators/Phase1Calculators";
import { GeometryCalculators } from "@/components/calculators/GeometryCalculators";
import { OhmLawCalculator } from "@/components/calculators/OhmLawCalculator";
import { WaterIntakeCalculator } from "@/components/calculators/WaterIntakeCalculator";
import { ResistorCalculator } from "@/components/calculators/ResistorCalculator";
import { FuelCostCalculator } from "@/components/calculators/Phase2Calculators";
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

import { IbanValidator } from "@/components/calculators/IbanValidator";
import { BondCalculator } from "@/components/calculators/BondCalculator";
import { IrrNpvCalculator } from "@/components/calculators/IrrNpvCalculator";

// BMI Calculator
function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const vke = w / (h * h);
      setResult(vke);
      
      // WOW Efekti
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  let status = "";
  let color = "";

  if (result !== null) {
    if (result < 18.5) { status = "Zayıf"; color = "#3b82f6"; }
    else if (result < 24.9) { status = "Normal"; color = "#22c55e"; }
    else if (result < 29.9) { status = "Fazla Kilolu"; color = "#eab308"; }
    else { status = "Obez"; color = "#ef4444"; }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Boy (cm)</label>
          <input 
            type="number" 
            placeholder="175" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input-field text-xl font-bold py-4" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Kilo (kg)</label>
          <input 
            type="number" 
            placeholder="70" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-field text-xl font-bold py-4" 
          />
        </div>
      </div>
      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>
        Hesapla
      </button>

      {result !== null && (
        <div className="result-container-premium animate-result shadow-2xl">
          <div className="result-card-premium">
            <div className="result-badge" style={{ backgroundColor: `${color}11`, color, borderColor: `${color}33` }}>
               {status}
            </div>
            <div className="result-value-premium" style={{ color }}>
              {result.toFixed(1)}
            </div>
            <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">Vücut Kitle Endeksiniz</div>
            
            <div className="mt-8 pt-6 border-t border-border flex justify-center">
               <div className="flex gap-1 h-3 w-full max-w-sm rounded-full overflow-hidden bg-secondary/20">
                  <div className="h-full flex-1 bg-blue-400 opacity-60"></div>
                  <div className="h-full flex-1 bg-green-500"></div>
                  <div className="h-full flex-1 bg-yellow-500 opacity-60"></div>
                  <div className="h-full flex-1 bg-red-500 opacity-60"></div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
      case "vucut-kitle-endeksi": return <BMICalculator />;
      case "gebelik": return <PregnancyCalculator />;
      case "adet-takibi": return <PeriodCalculator />;
      case "ideal-kilo": return <IdealWeightCalculator />;
      case "su-ihtiyaci": return <WaterIntakeCalculator />;
      case "bmr": return <BmrCalculator />;
      case "makro-hesaplama": return <MacroCalculator />;
      case "gunluk-kalori-ihtiyaci": return <CalorieCalculator />;
      case "kredi-hesaplama": return <LoanCalculator />;
      case "kredi-ödeme-plani": return <LoanAmortization />;
      case "kredi-karti-asgari": return <CreditCardCalculator />;
      case "faiz": return <InterestCalculator />;
      case "enflasyon": return <InflationCalculator />;
      case "yuzde": return <PercentageCalculator />;
      case "ebob-ekok": return <EbobEkokCalculator />;
      case "kesir": return <FractionsCalculator />;
      case "logaritma": return <LogarithmCalculator />;
      case "alan-hacim": return <GeometryCalculators />;
      case "uslu-koklu": return <PowerRootCalculator />;
      case "denklem-cozucu": return <EquationSolverCalculator />;
      case "asal-sayi": return <PrimeNumberCalculator />;
      case "netten-brute": return <NetGrossCalculator />;
      case "kidem-tazminati": return <SeveranceCalculator />;
      case "yakit-maliyeti": return <FuelCostCalculator />;
      case "mtv-hesaplama": return <MtvCalculator />;
      case "ags-puan": return <AgssCalculator />;
      case "eurobond": return <EurobondCalculator />;
      case "kusak": return <GenerationCalculator />;
      case "hakim-savci-puan": return <HsyCalculator />;
      case "binek-arac-gider": return <VehicleExpenseCalculator />;
      case "fiyat": return <PriceCalculator />;
      case "yilin-kacinci-gunu": return <DayOfYearCalculator />;
      case "net-bugunku-deger": return <IrrNpvCalculator />;
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
      case "direnc-renk-kodlari": return <ResistorCalculator />;
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
