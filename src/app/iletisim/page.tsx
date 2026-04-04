"use client";

import Link from "next/link";
import { useState } from "react";

export default function Iletisim() {
  const [form, setForm] = useState({ ad: "", email: "", konu: "", mesaj: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gerçek backend entegrasyonu için buraya API çağrısı eklenebilir
    setSent(true);
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <nav style={{ marginBottom: "2rem", fontSize: "0.875rem", color: "var(--text-muted)", display: "flex", gap: "0.4rem" }}>
        <Link href="/" style={{ color: "var(--text-muted)" }}>Ana Sayfa</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>İletişim</span>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>İletişim</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
        Öneri, hata bildirimi veya iş birliği için bize ulaşın.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { icon: "📧", title: "E-posta", value: "iletisim@kalkula.com.tr" },
            { icon: "🕐", title: "Yanıt Süresi", value: "1-2 iş günü" },
            { icon: "🌍", title: "Hizmet Bölgesi", value: "Türkiye geneli" },
          ].map(c => (
            <div key={c.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{c.title}</div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.value}</div>
            </div>
          ))}

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>Sık Sorulan Sorular</h3>
            {[
              { q: "Araçlar ücretsiz mi?", a: "Evet, tüm araçlar tamamen ücretsizdir." },
              { q: "Verilerim kaydediliyor mu?", a: "Hayır, tüm veriler yalnızca tarayıcınızda kalır." },
            ].map(faq => (
              <div key={faq.q} style={{ marginBottom: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{faq.q}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.825rem" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.75rem" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Mesajınız İletildi!</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>En kısa sürede size dönüş yapacağız.</p>
              <button onClick={() => { setSent(false); setForm({ ad: "", email: "", konu: "", mesaj: "" }); }} className="btn-secondary" style={{ marginTop: "1.5rem" }}>
                Yeni Mesaj
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>Mesaj Gönderin</h2>
              {[
                { id: "ad", label: "Adınız", placeholder: "Adınız Soyadınız", type: "text" },
                { id: "email", label: "E-posta", placeholder: "ornek@email.com", type: "email" },
                { id: "konu", label: "Konu", placeholder: "Öneri / Hata Bildirimi / Diğer", type: "text" },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Mesajınız</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Mesajınızı buraya yazın..."
                  value={form.mesaj}
                  onChange={e => setForm(p => ({ ...p, mesaj: e.target.value }))}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.75rem" }}>
                Gönder →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
