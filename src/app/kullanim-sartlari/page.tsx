export default function TermsPage() {
  return (
    <main className="min-h-screen bg-main flex flex-col">
      <div className="container py-20 max-w-4xl">
        <div className="panel p-12 bg-white dark:bg-zinc-900 border border-border rounded-[3rem] shadow-2xl">
          <h1 className="text-4xl font-black italic text-primary mb-8 tracking-tighter">Kullanım Şartları</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none flex flex-col gap-8">
            <section className="bg-secondary/5 p-8 rounded-3xl border border-border/50">
               <h2 className="text-lg font-black uppercase tracking-widest text-accent-primary mb-4">1. Hizmet Kapsamı</h2>
               <p className="text-muted leading-relaxed font-medium">
                  Kalkula SaaS Hub ("Platform"), kullanıcılara finans, mühendislik, sağlık ve eğitim alanlarında çeşitli hesaplama araçları sunan bir yardımcı servisdir. Platformu kullanan her birey, bu kullanım şartlarını peşinen kabul etmiş sayılır.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-black text-primary mb-4 italic">2. Hesaplamalar ve Bilgilendirme Amacı</h2>
               <p className="text-muted leading-relaxed italic border-l-4 border-accent-primary pl-6">
                  Platformda sunulan tüm hesaplama sonuçları yalnızca bilgilendirme ve tahmini analiz amaçlıdır. Kalkula, resmi kurum, banka, noter veya hukuk danışmanlığı yerine geçmez. 
                  <b> Hesaplama sonuçlarına dayanarak yapılacak hiçbir işlemden dolayı platformumuz ve geliştiricimiz sorumlu tutulamaz.</b>
               </p>
            </section>

            <section>
               <h2 className="text-xl font-black text-primary mb-4 italic">3. Fikri Mülkiyet Hakları</h2>
               <p className="text-muted leading-relaxed">
                  Platformda yer alan özel hesaplama motorları, görsel tasarımlar, ikonlar ve özgün metinler Mehmet Efe Uzun adına tescillidir. Bu içeriklerin kaynak gösterilmeden kopyalanması, dağıtılması veya ticari amaçlarla kullanılması yasaktır.
               </p>
            </section>

            <section className="border-t border-border pt-8">
               <h2 className="text-xl font-black text-primary mb-4 italic">4. Sorumluluk Reddinin Sınırlandırılması</h2>
               <p className="text-muted leading-relaxed font-medium">
                  Verdiğimiz sonuçların güncel mevzuata ve resmi verilere (TÜFE, MTV, Vergi Dilimleri vb.) en yakın seviyede olması için azami gayret göstersek de, ani mevzuat değişiklikleri veya insan hataları nedeniyle oluşabilecek yanlışlıklardan doğacak mali veya hukuki kayıplarda platformun hiçbir hukuki yükümlülüğü bulunmamaktadır.
               </p>
            </section>

            <div className="mt-12 p-6 bg-secondary/5 rounded-2xl border border-border text-center">
               <p className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Son Güncelleme: 1 Ocak 2026 | Hukuk ve Operasyon</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
