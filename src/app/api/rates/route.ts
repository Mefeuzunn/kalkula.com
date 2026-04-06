import { NextResponse } from 'next/server';
import { fetchLiveRates } from '@/lib/rates';

export async function GET() {
  try {
    const data = await fetchLiveRates();
    
    // Custom logic to add common pairs for TRY directly
    const usdTry = data.rates['TRY'] || 49.30;
    const eurTry = usdTry / (data.rates['EUR'] || 0.89);
    
    return NextResponse.json({
      ...data,
      tryRates: {
        USD: usdTry,
        EUR: eurTry,
        XAU: (data.metals.gold / 31.1034768) * usdTry, // Gram Gold in TRY (24k)
        XAG: (data.metals.silver / 31.1034768) * usdTry, // Gram Silver in TRY
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}
