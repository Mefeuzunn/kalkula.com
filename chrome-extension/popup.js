document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`${tabId}Tab`).classList.add('active');
    });
  });

  // KDV Calculation
  const vatAmount = document.getElementById('vatAmount');
  const vatRate = document.getElementById('vatRate');
  const vatValue = document.getElementById('vatValue');
  const vatTotal = document.getElementById('vatTotal');

  const calculateVat = () => {
    const amount = parseFloat(vatAmount.value) || 0;
    const rate = parseFloat(vatRate.value) / 100;
    const vat = amount * rate;
    const total = amount + vat;

    vatValue.textContent = `${vat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
    vatTotal.textContent = `${total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
  };

  vatAmount.addEventListener('input', calculateVat);
  vatRate.addEventListener('change', calculateVat);

  // Yüzde Calculation
  const percVal1 = document.getElementById('percVal1');
  const percVal2 = document.getElementById('percVal2');
  const percResult = document.getElementById('percResult');

  const calculatePercentage = () => {
    const a = parseFloat(percVal1.value) || 0;
    const b = parseFloat(percVal2.value) || 0;
    const result = (a * b) / 100;

    percResult.textContent = result.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
  };

  percVal1.addEventListener('input', calculatePercentage);
  percVal2.addEventListener('input', calculatePercentage);

  // Search Mockup (Redirect to site)
  const toolSearch = document.getElementById('toolSearch');
  toolSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = encodeURIComponent(toolSearch.value);
      window.open(`https://kalkula.com.tr/?q=${query}`, '_blank');
    }
  });

  // Set default currency tab (placeholder message)
  const dovizTab = document.getElementById('dovizTab');
  if (!dovizTab) {
    const dovizContent = document.createElement('section');
    dovizContent.id = 'dovizTab';
    dovizContent.className = 'tab-content';
    dovizContent.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 11px;">
        <p>📊 Canlı döviz kurları yakında!</p>
        <p style="margin-top: 1rem;">Siteden anında ulaşın:</p>
        <a href="https://kalkula.com.tr/hesapla/doviz" target="_blank" style="color: var(--accent); font-weight: 800; text-decoration: none; display: block; margin-top: 0.5rem;">Döviz Masası →</a>
      </div>
    `;
    document.getElementById('mainContent').appendChild(dovizContent);
  }
});
