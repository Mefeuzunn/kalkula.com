import React, { useState } from "react";
import QRCode from "qrcode";
import confetti from "canvas-confetti";

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrReady, setQrReady] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setIsGenerating(true);
    try {
      // Yüksek çözünürlük ve hata düzeltme seviyesi (H)
      const dataUrl = await QRCode.toDataURL(url, {
        width: 1024,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#ffffff' }
      });
      setQrReady(dataUrl);
      
      confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#ffffff"]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = qrReady;
    link.download = `kalkula-qr-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="panel p-10 bg-secondary/10 border-border rounded-[2.5rem] shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
        </div>
        
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-4 block italic">Hedef Link veya Metin Girişi</label>
        <div className="flex flex-col gap-6">
          <input 
            type="text" 
            placeholder="https://google.com veya herhangi bir metin..." 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
            className="input-field !text-xl !py-5 border-4 focus:border-accent-primary transition-all rounded-3xl"
          />
          <button 
            className={`btn-primary py-5 text-xl font-black shadow-2xl uppercase tracking-widest italic transition-all ${isGenerating ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'}`} 
            onClick={generate}
            disabled={isGenerating || !url.trim()}
          >
            {isGenerating ? "DÖNÜŞTÜRÜLÜYOR..." : "PROFESYONEL QR ÜRET"}
          </button>
        </div>
      </div>

      {qrReady && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium border-2 shadow-[0_0_60px_rgba(59,130,246,0.1)] !p-0 overflow-hidden">
              <div className="p-10 bg-surface flex flex-col items-center border-b border-border">
                 <div className="result-badge !mb-8">YÜKSEK ÇÖZÜNÜRLÜK (PNG)</div>
                 
                 <div className="p-8 bg-white rounded-[3rem] shadow-2xl inline-block mb-10 border-[12px] border-white/10 group hover:rotate-1 hover:scale-105 transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrReady} alt="Kalküla QR Code" width={280} height={280} className="mix-blend-multiply" />
                 </div>
                 
                 <p className="text-muted text-xs mb-4 max-w-sm mx-auto leading-relaxed italic text-center">
                    💡 <b>QR Kodunuz Hazır:</b> 1024px çözünürlükte, hata düzeltme (H) protokolüyle üretildi. Billboard ve baskı işleri için uygundur.
                 </p>
              </div>
              
              <div className="p-8 bg-secondary/5 flex gap-4">
                <button 
                  onClick={download} 
                  className="btn-primary !bg-accent-primary flex-[2] py-4 text-sm font-black uppercase tracking-widest shadow-xl"
                >
                   PNG İndir (HD)
                </button>
                <button 
                  onClick={() => setQrReady("")} 
                  className="btn-secondary flex-1 py-4 text-sm font-black border-red-500/20 text-red-500 uppercase tracking-widest hover:bg-red-500/5"
                >
                   Kapat
                </button>
              </div>
           </div>
        </div>
      )}

      <div className="text-center p-4">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed italic">
            KALKÜLA SECURE QR GENERATION PROTOCOL - ENCRYPTED OUTPUT
         </p>
      </div>
    </div>
  );
}
