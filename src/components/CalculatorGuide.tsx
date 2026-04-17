import { getGuideBySlug } from "@/data/calculator-guides";

interface CalculatorGuideProps {
  slug: string;
}

export function CalculatorGuide({ slug }: CalculatorGuideProps) {
  const guide = getGuideBySlug(slug);
  if (!guide) return null;

  return (
    <section className="calc-guide" aria-label="Rehber ve Bilgi">
      <div className="calc-guide-header">
        <div className="guide-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/>
          </svg>
          Kalküla Rehberi
        </div>
        <h2 className="calc-guide-h2">Bilgi Merkezi</h2>
        <p className="calc-guide-sub">Bu araç hakkında bilmeniz gereken her şey — açık, kısa ve güvenilir.</p>
      </div>

      <div className="calc-guide-grid">
        {/* Nedir? */}
        <div className="calc-guide-card">
          <h3 className="calc-guide-card-title">
            <span className="guide-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </span>
            Bu Araç Nedir?
          </h3>
          <p className="calc-guide-card-text">{guide.what}</p>
        </div>

        {/* Nasıl Çalışır? */}
        <div className="calc-guide-card">
          <h3 className="calc-guide-card-title">
            <span className="guide-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </span>
            Nasıl Hesaplanır?
          </h3>
          <p className="calc-guide-card-text">{guide.how}</p>
        </div>

        {/* Neden Önemli? */}
        <div className="calc-guide-card">
          <h3 className="calc-guide-card-title">
            <span className="guide-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2-3.5 7H2l6 5.5L5.5 22 12 17.5 18.5 22 16 14.5 22 9h-6.5L12 2z"/>
              </svg>
            </span>
            Neden Önemlidir?
          </h3>
          <p className="calc-guide-card-text">{guide.why}</p>
        </div>
      </div>

      {/* SSS Accordion */}
      <div className="calc-guide-faq" role="list">
        <p className="calc-guide-faq-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
          </svg>
          Sıkça Sorulan Sorular
        </p>
        {guide.faq.map((item, i) => (
          <details className="faq-item" key={i}>
            <summary className="faq-label">
              <span>{item.q}</span>
              <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </summary>
            <div className="faq-answer-inner">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
