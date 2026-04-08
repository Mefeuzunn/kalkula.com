"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import confetti from "canvas-confetti";
import { QrCode, Download, Link, Trash2, Zap, Sparkles, RefreshCw, FileImage, Shield, Info, ExternalLink } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrReady, setQrReady] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setIsGenerating(true);
    try {
      // High resolution and error correction level (H)
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
    if (!qrReady) return;
    const link = document.createElement("a");
    link.href = qrReady;
    link.download = `kalkula-qr-${Date.now()}.png`;
    link.click();
    confetti({ particleCount: 30, spread: 20, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  const reset = () => {
    setUrl("");
    setQrReady("");
  };

  return (
    <V2CalculatorWrapper
      title="QR KOD OLUŞTURUCU"
      icon="📷"
      infoText="Link, metin veya iletişim bilgileriniz için yüksek çözünürlüklü QR kodlar üretin. Billboard ve baskı işleri için HD (PNG) formatında indirin."
      results={qrReady && (
        <div className="space-y-6">
          <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 flex flex-col items-center gap-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="relative z-10 text-center space-y-2">
                <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">YÜKSEK ÇÖZÜNÜRLÜK (PNG)</div>
                <div className="text-[9px] text-muted font-bold opacity-40 italic uppercase tracking-widest leading-relaxed">
                   HATA DÜZELTME (H) • 1024PX STANDART
                </div>
             </div>

             <div className="p-8 bg-white rounded-[3rem] shadow-2xl inline-block relative z-10 border-[12px] border-white/10 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer" onClick={download}>
                <img src={qrReady} alt="Kalkula QR Code" width={280} height={280} className="mix-blend-multiply" />
             </div>

             <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                <button 
                  onClick={download}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95"
                >
                   <Download className="w-4 h-4" /> HD İNDİR
                </button>
                <button 
                  onClick={reset}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-muted font-black italic hover:bg-red-600/10 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-95"
                >
                   <Trash2 className="w-4 h-4" /> TEMİZLE
                </button>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
                QR kodunuz billboard, kartvizit ve profesyonel baskı işleri için optimize edilmiş netliktedir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-2">
              <Link className="w-4 h-4 text-blue-500" /> HEDEF LİNK VEYA METİN
           </div>

           <V2Input 
             label="QR İÇERİĞİ" 
             value={url} 
             onChange={setUrl} 
             placeholder="https://google.com veya mesajınız..." 
             fieldClassName="!text-xl italic font-bold placeholder:font-normal"
           />

           <V2ActionRow 
             onCalculate={generate} 
             onReset={reset} 
             calculateLabel={isGenerating ? "DÖNÜŞTÜRÜLÜYOR..." : "⚡ PROFESYONEL QR ÜRET"}
             isCalculateDisabled={isGenerating || !url.trim()}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <FileImage className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">PNG FORMATI</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Yüksek Kaliteli Çıktı</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Shield className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">GİZLİLİK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Veriler Tarayıcıda İşlenir</div>
              </div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
