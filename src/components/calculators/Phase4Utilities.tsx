"use client";

import { useState, useEffect } from "react";
import { ShareResultButton } from "../ShareResultButton";
import QRCode from "qrcode";
import confetti from "canvas-confetti";

/**
 * Gelişmiş Şifre Oluşturucu
 */
export function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, label: "Zayıf", color: "#ef4444" });

  const generate = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let gen = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
       gen += chars.charAt(array[i] % chars.length);
    }
    setPassword(gen);
    calculateStrength(gen);
    
    // WOW Efekti
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ["#3b82f6", "#60a5fa"] });
  };

  const calculateStrength = (p: string) => {
    let score = 0;
    if (p.length > 12) score += 2;
    if (p.length > 16) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 2;

    if (score >= 6) setStrength({ score: 100, label: "Çok Güçlü", color: "#22c55e" });
    else if (score >= 4) setStrength({ score: 60, label: "Güçlü", color: "#3b82f6" });
    else if (score >= 2) setStrength({ score: 30, label: "Orta", color: "#eab308" });
    else setStrength({ score: 10, label: "Zayıf", color: "#ef4444" });
  };

  useEffect(() => { generate(); }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-6 bg-secondary/30 rounded-xl border border-border">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold opacity-70">Şifre Uzunluğu</label>
          <span className="text-xl font-bold font-mono text-primary">{length}</span>
        </div>
        <input 
          type="range" 
          min="8" max="64" 
          value={length} 
          onChange={e => setLength(parseInt(e.target.value))} 
          className="w-full accent-primary cursor-pointer"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { id: "upper", label: "A-Z", checked: useUpper, set: setUseUpper },
            { id: "nums", label: "0-9", checked: useNumbers, set: setUseNumbers },
            { id: "syms", label: "!@#", checked: useSymbols, set: setUseSymbols }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => opt.set(!opt.checked)}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-sm font-medium ${opt.checked ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-surface border-border text-muted hover:border-muted'}`}
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${opt.checked ? 'bg-primary border-primary' : 'border-border'}`}>
                {opt.checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-primary py-4 text-lg" onClick={generate}>
        Yeni Şifre Oluştur
      </button>

      {password && (
        <div className="result-container-premium animate-result">
          <div className="result-card-premium !p-0">
             <div className="bg-bg-secondary p-6 rounded-t-lg truncate font-mono text-xl md:text-2xl font-bold text-center tracking-wider text-accent-primary border-b border-border">
                {password}
             </div>
             <div className="p-8 bg-surface">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-xs font-bold text-muted uppercase tracking-widest">Güvenlik Seviyesi</span>
                   <span style={{ color: strength.color }} className="font-bold text-sm uppercase">{strength.label}</span>
                </div>
                <div className="h-3 w-full bg-border rounded-full overflow-hidden shadow-inner">
                   <div 
                    className="h-full transition-all duration-700 ease-out" 
                    style={{ width: `${strength.score}%`, backgroundColor: strength.color, boxShadow: `0 0 10px ${strength.color}44` }}
                   />
                </div>
                <div className="mt-8 flex justify-center">
                   <ShareResultButton resultText={"Güvenli şifremi Kalküla ile oluşturdum: " + password} />
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Profesyonel Kelime Sayacı
 */
export function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  const readingTime = Math.ceil(words / 200) || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Kelime", val: words, color: "var(--accent-primary)" },
          { label: "Karakter", val: chars },
          { label: "Boşluksuz", val: charsNoSpace },
          { label: "Paragraf", val: paragraphs },
          { label: "Okuma (Dk)", val: readingTime, color: "#10b981" }
        ].map((item, i) => (
          <div key={i} className="panel flex flex-col items-center justify-center p-4 hover:border-primary/40 transition-colors border-2">
            <div style={{ color: item.color || "var(--text-primary)" }} className="text-2xl font-black">{item.val}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">{item.label}</div>
          </div>
        ))}
      </div>
      
      <textarea 
        placeholder="Saymak istediğiniz metni buraya yapıştırın..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className="input-field p-8 text-lg border-2 min-h-[400px] leading-relaxed shadow-inner"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}

/**
 * QR Kod Üreticisi
 */
export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrReady, setQrReady] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 800,
        margin: 2,
        color: { dark: '#ffffff', light: '#00000000' }
      });
      setQrReady(dataUrl);
      
      // WOW Efekti
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
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
    <div className="flex flex-col gap-6">
      <div className="panel p-8 bg-secondary/10 border-2 border-border shadow-inner">
        <label className="text-xs font-bold text-muted uppercase tracking-widest mb-3 block">Hedef URL veya Metin</label>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="https://example.com" 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
            className="input-field flex-grow text-lg"
          />
          <button 
            className="btn-primary px-10 py-4 shadow-xl" 
            onClick={generate}
            disabled={isGenerating || !url.trim()}
          >
            {isGenerating ? "..." : "QR ÜRET"}
          </button>
        </div>
      </div>

      {qrReady && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">QR Kod Hazır</div>
              
              <div className="p-6 bg-white rounded-3xl shadow-2xl inline-block mb-8 border-8 border-white/10">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={qrReady} alt="QR" width={220} height={220} className="mix-blend-multiply brightness-0" />
              </div>
              
              <p className="text-muted text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                 QR kodunuz yüksek çözünürlükte oluşturuldu. Tüm cihazlarla uyumludur.
              </p>

              <div className="result-footer-premium">
                <button onClick={download} className="btn-primary !bg-none !bg-accent-primary flex-1">
                   PNG İndir
                </button>
                <button onClick={() => setQrReady("")} className="btn-secondary flex-1 border-red-500/20 text-red-500">
                   Temizle
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
