chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "kalkulaVat",
    title: "Seçili tutarın KDV'sini hesapla",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "kalkulaVat") {
    const amountStr = info.selectionText.replace(/[^0-9,.]/g, '').replace(',', '.');
    const amount = parseFloat(amountStr);
    
    if (!isNaN(amount)) {
      const vat = amount * 0.20;
      const total = amount + vat;
      
      // Open popup or show a simple alert via content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (a, v, t) => {
          alert(`Kalkula Analizi:\n\nNet: ${a.toFixed(2)} ₺\nKDV (%20): ${v.toFixed(2)} ₺\nToplam: ${t.toFixed(2)} ₺`);
        },
        args: [amount, vat, total]
      });
    }
  }
});
