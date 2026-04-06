export interface ExchangeRates {
  [key: string]: number;
}

export interface RateData {
  base: string;
  rates: ExchangeRates;
  metals: {
    gold: number;   // USD per Ounce
    silver: number; // USD per Ounce
  };
  lastUpdated: string;
}

// 2026 April 6 Baseline Mock Data (Fallbacks)
const BASELINE_RATES: ExchangeRates = {
  USD: 1.0,
  EUR: 0.89,
  TRY: 49.30,
  GBP: 0.79,
  CHF: 0.85,
  SAR: 3.75,
  AED: 3.67,
  JPY: 153.20,
  CAD: 1.35,
  AUD: 1.52,
  QAR: 3.64,
  XAU: 2845.50, // Gold spot per ounce
  XAG: 34.20,   // Silver spot per ounce
};

export async function fetchLiveRates(): Promise<RateData> {
  try {
    // 1. Fetch Currencies from Frankfurter (EUR based)
    const frankfurterRes = await fetch('https://api.frankfurter.app/latest?from=USD', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!frankfurterRes.ok) throw new Error('Frankfurter API failed');
    
    const currencyData = await frankfurterRes.json();
    
    // 2. Metals (Normally requires an API Key, providing realistic 2026 data as mock/demo)
    // In production, would fetch from metals.dev or goldapi.io
    const metals = {
      gold: 2845.50,
      silver: 34.20
    };

    return {
      base: 'USD',
      rates: { ...currencyData.rates, USD: 1.0 },
      metals,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Currency API Fetch Failed, using baseline 2026 data', error);
    return {
      base: 'USD',
      rates: BASELINE_RATES,
      metals: { gold: 2845.50, silver: 34.20 },
      lastUpdated: new Date().toISOString()
    };
  }
}
