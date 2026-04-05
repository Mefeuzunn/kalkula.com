import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Kalküla",
  description: "Kalküla gizlilik politikası — verilerinizin nasıl işlendiğini öğrenin.",
};

export default function Gizlilik() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <nav style={{ marginBottom: "2rem", fontSize: "0.875rem", color: "var(--text-muted)", display: "flex", gap: "0.4rem" }}>
        <Link href="/" style={{ color: "var(--text-muted)" }}>Ana Sayfa</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>Gizlilik Politikası</span>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Gizlilik Politikası</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "0.875rem" }}>Son güncelleme: Nisan 2025</p>

      {[
        {
          title: "1. Toplanan Veriler",
          content: `Kalküla, hesaplama araçlarını kullanırken girdiğiniz verileri (sayılar, tarihler, tercihler) yalnızca hesaplama amacıyla ve yalnızca tarayıcınızda işler. Bu veriler hiçbir sunucuya gönderilmez.

Noktanızı not defterinde kaydetmeniz veya takvim etkinliği oluşturmanız gibi kişisel araçlarda ise veriler yalnızca tarayıcınızın yerel depolama alanında (localStorage) tutulur.`,
        },
        {
          title: "2. Çerezler ve Reklamcılık",
          content: `Kalküla, aydınlık/koyu tema tercihinizi ve son kullandığınız araçları hatırlamak amacıyla yerel depolama ve çerezleri kullanır. 

Google, üçüncü taraf tedarikçi olarak sitemizde reklam yayınlamak için çerezlerden yararlanır. Google'ın DART çerezlerini kullanması, kullanıcılarımızın sitemize ve İnternet'teki diğer sitelere yaptıkları ziyaretlere dayalı reklamlar sunmasına olanak tanır. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanılmasını engelleyebilir.

Üçüncü taraf reklam ağları aracılığıyla sunulan reklamlar için de çerezler kullanılabilir. Bu çerezlerin kontrolü ilgili reklam ağlarına aittir.`,
        },
        {
          title: "3. Üçüncü Taraflar",
          content: `Kalküla, servis kesintisi yaşandığında destek almak amacıyla Vercel altyapısını kullanmaktadır. Vercel'in kendi gizlilik politikası geçerlidir. `,
        },
        {
          title: "4. Güvenlik",
          content: `Tüm hesaplamalar istemci taraflı (tarayıcınızda) gerçekleştiğinden girilen veriler asla ağ üzerinden iletilmez. Bu yapı, verilerinizin en güvenli şekilde korunmasını sağlar.`,
        },
        {
          title: "5. Haklarınız",
          content: `Tarayıcınızın geliştirici araçlarından localStorage'ı silerek Kalküla'nın cihazınızda tuttuğu tüm verileri kolayca kaldırabilirsiniz. Herhangi bir sorunuz için iletişim sayfamızı kullanabilirsiniz.`,
        },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)" }}>{s.title}</h2>
          <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}>{s.content}</div>
          <div style={{ borderBottom: "1px solid var(--border)", marginTop: "1.5rem" }} />
        </div>
      ))}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem 1.5rem", marginTop: "1rem" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Gizlilik politikamızla ilgili sorularınız için{" "}
          <Link href="/iletisim" style={{ color: "var(--accent-primary)" }}>iletişim formumuzu</Link> kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}
