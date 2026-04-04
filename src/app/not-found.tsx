import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "480px" }}>
        <div style={{
          fontSize: "7rem",
          fontWeight: 900,
          lineHeight: 1,
          background: "linear-gradient(135deg, var(--accent-primary), #1d4ed8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1rem",
        }}>
          404
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Sayfa Bulunamadı
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Aradığınız sayfa kaldırılmış, taşınmış ya da hiç var olmamış olabilir. 
          Ana sayfaya dönerek arama yapabilirsiniz.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
            ← Ana Sayfaya Dön
          </Link>
          <Link href="/kategori/finans" className="btn-secondary" style={{ padding: "0.75rem 2rem" }}>
            Hesaplama Araçları
          </Link>
        </div>

        <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {["Kredi", "Yüzde", "BMI", "YKS", "LGS", "Kira Artışı"].map(t => (
            <span key={t} style={{ padding: "0.35rem 0.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "9999px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
