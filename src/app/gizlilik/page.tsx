export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-main flex flex-col">
      <div className="container py-20 max-w-4xl">
        <div className="panel p-12 bg-white dark:bg-zinc-900 border border-border rounded-[3rem] shadow-2xl">
          <h1 className="text-4xl font-black italic text-primary mb-8 tracking-tighter">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none flex flex-col gap-8">
            <section className="bg-secondary/5 p-8 rounded-3xl border border-border/50">
               <h2 className="text-lg font-black uppercase tracking-widest text-accent-primary mb-4">1. Veri Sorumlusu ve Gizlilik Taahhüdü</h2>
               <p className="text-muted leading-relaxed font-medium">
                  Kalkula SaaS Hub ("Platform"), Mehmet Efe Uzun tarafından geliştirilmiştir. Platform olarak kullanıcı gizliliği ve veri güvenliği en üst önceliğimizdir. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve GDPR uyumluluğu kapsamında hazırlanmıştır.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-black text-primary mb-4 italic">2. "Privacy-First" Hesaplama İlkesi</h2>
               <p className="text-muted leading-relaxed">
                  Kalkula'nın çalışma prensibi <b>Uçtan Uca Yerel Hesaplama (End-to-End Client-side Calculation)</b> üzerinedir. Hesaplama araçlarına girdiğiniz hiçbir veri (maaş, kredi tutarı, sağlık verileri vb.) sunucularımıza gönderilmez, bir veritabanında saklanmaz ve 3. taraflarla paylaşılmaz. Tüm işlemler doğrudan tarayıcınızda gerçekleşir.
               </p>
            </section>

            <section>
               <h2 className="text-xl font-black text-primary mb-4 italic">3. Toplanan Veriler ve Çerezler</h2>
               <p className="text-muted leading-relaxed">
                  Platformumuz sadece deneyiminizi iyileştirmek amacıyla şu verileri anonim olarak işleyebilir:
               </p>
               <ul className="list-disc pl-6 mt-4 text-muted flex flex-col gap-2">
                  <li><b>Analitik Veriler:</b> Google Analytics veya benzeri araçlar aracılığıyla sayfa görüntüleme sayısı gibi anonim trafik verileri.</li>
                  <li><b>Tercih Çerezleri:</b> "Son kullanılan araçlar" listesi ve "Çerez onayı" gibi tercihleriniz tarayıcınızın yerel depolamasında (LocalStorage) saklanır.</li>
               </ul>
            </section>

            <section className="border-t border-border pt-8">
               <h2 className="text-xl font-black text-primary mb-4 italic">4. KVKK Kapsamındaki Haklarınız</h2>
               <p className="text-muted leading-relaxed">
                  KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme ve verilerinizin silinmesini isteme hakkına sahipsiniz. Sorularınız için <b>mefeuzunn@gmail.com</b> adresinden bizimle iletişime geçebilirsiniz.
               </p>
            </section>

            <div className="mt-12 p-6 bg-accent-glow rounded-2xl border border-accent-primary/20 text-center">
               <p className="text-xs font-bold text-accent-primary uppercase tracking-[0.2em]">Son Güncelleme: 1 Ocak 2026 | Kalkula Güvenlik Departmanı</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
