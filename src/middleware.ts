import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bellek içi basit oran sınırı (Rate Limiting) - Edge nodelarında en iyi çaba mantığıyla çalışır.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 Dakika
const MAX_REQUESTS_PER_WINDOW = 60; // 1 dakikada maksimum 60 istek

// Sistem erişimi istemediğimiz zararlı araçların ve botların imzaları
const BLOCKED_USER_AGENTS = [
  'curl',
  'wget',
  'python-requests',
  'postmanruntime',
  'axios',
  'libwww-perl',
  'sqlmap',
  'nmap',
  'nikto',
  'dirb',
  'scrapy'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // 1. Bot ve Kötü Niyetli Yazılım Koruması
  for (const bot of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(bot)) {
      return new NextResponse('Access Denied: Malicious Agent Detected', { status: 403 });
    }
  }

  // Sadece API rotalarına özel koruma protokolleri
  if (pathname.startsWith('/api/')) {
    
    // 2. Origin ve CORS Doğrulaması (CSRF Koruması)
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    
    // Geliştirme ortamı dışında kontrol et
    if (process.env.NODE_ENV !== 'development' && origin) {
      const allowedOrigins = ['kalkula.com', 'kalkula.com.tr'];
      
      const isAllowed = allowedOrigins.some(allowed => 
        origin.includes(`://${allowed}`) || origin.includes(`://www.${allowed}`)
      );

      if (!isAllowed) {
        return new NextResponse('Access Denied: Invalid Origin', { status: 403 });
      }
    }

    // 3. API için Rate Limiting (Saldırı Önleyici)
    const currentTime = Date.now();
    const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, timestamp: currentTime };

    // Zaman penceresi dolduysa sıfırla
    if (currentTime - rateLimitInfo.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitInfo.count = 1;
      rateLimitInfo.timestamp = currentTime;
    } else {
      rateLimitInfo.count += 1;
    }

    rateLimitMap.set(ip, rateLimitInfo);

    // Bellek sızıntısını önlemek için rastgele periyotta temizlik
    if (Math.random() < 0.01) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (currentTime - value.timestamp > RATE_LIMIT_WINDOW_MS) {
          rateLimitMap.delete(key);
        }
      }
    }

    // Sınır aşıldıysa engelle
    if (rateLimitInfo.count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '60' // İstemciye 60 saniye sonra tekrar denemesini bildir
        }
      });
    }

    // 4. Zararlı Yük (Payload) Sınırlandırması
    if (request.method === 'POST' || request.method === 'PUT') {
      const contentLength = request.headers.get('content-length');
      // Payload maksimum 5MB boyutunda olabilir
      if (contentLength && parseInt(contentLength, 10) > 5 * 1024 * 1024) {
        return new NextResponse('Payload Too Large', { status: 413 });
      }
    }
  }

  // İzin ver, isteği geçir
  return NextResponse.next();
}

// Güvenlik duvarının çalışacağı rotalar: Statik dosyalar harici tüm adresler
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
