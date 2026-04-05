"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * X (Twitter) Gelişmiş Karakter Sayacı
 * Twitter kurallarına göre (Linkler 23 karakter, resimler vb.) hesaplama yapar.
 */
export function XCharacterCounter() {
  const [text, setText] = useState("");
  const LIMIT = 280;

  // Twitter karakter sayım mantığı (Basitleştirilmiş)
  const calculateTwitterChars = (val: string) => {
    // Linkleri bul ve 23 karakter say
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = val.match(urlPattern) || [];
    let processed = val.replace(urlPattern, "");
    let count = processed.length + (urls.length * 23);
    return count;
  };

  const count = calculateTwitterChars(text);
  const remaining = LIMIT - count;
  const progress = Math.min(100, (count / LIMIT) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end px-1">
        <div className="flex flex-col">
          <span className="text-xs font-black text-muted uppercase tracking-widest mb-1">X (Twitter) Karakter</span>
          <span className={`text-4xl font-black ${remaining < 0 ? 'text-red-500' : 'text-primary'}`}>
            {count} <span className="text-lg opacity-40">/ {LIMIT}</span>
          </span>
        </div>
        <div className={`text-right font-bold text-sm ${remaining < 20 ? 'text-red-400' : 'text-muted'}`}>
          {remaining >= 0 ? `${remaining} karakter kaldı` : `${Math.abs(remaining)} karakter aşıldı!`}
        </div>
      </div>

      <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden shadow-inner">
         <div 
           className={`h-full transition-all duration-300 ${remaining < 0 ? 'bg-red-500' : remaining < 50 ? 'bg-amber-500' : 'bg-accent-primary'}`} 
           style={{ width: `${progress}%` }}
         />
      </div>

      <textarea 
        placeholder="Tweet'inizi buraya yazın... Linkler otomatik olarak 23 karakter sayılır." 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className={`input-field p-8 text-xl min-h-[250px] leading-relaxed border-2 transition-colors ${remaining < 0 ? 'border-red-500/30 bg-red-500/5' : 'border-border'}`}
        style={{ resize: "vertical" }}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Kelime", val: text.trim() ? text.trim().split(/\s+/).length : 0 },
           { label: "Link Sayısı", val: (text.match(/https?:\/\/[^\s]+/g) || []).length },
           { label: "Hashtag", val: (text.match(/#[^\s]+/g) || []).length },
           { label: "Mention", val: (text.match(/@[^\s]+/g) || []).length }
         ].map((item, i) => (
           <div key={i} className="panel p-4 text-center hover:border-primary/40 transition-all border-2">
              <div className="text-xl font-black text-primary">{item.val}</div>
              <div className="text-[10px] font-bold text-muted uppercase mt-1 tracking-tighter">{item.label}</div>
           </div>
         ))}
      </div>
    </div>
  );
}

/**
 * Şık Yazı Oluşturucu (Unicode Font Generator)
 */
export function StyleTextGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const FONTS: Record<string, (s: string) => string> = {
    "Kalın (Serif)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120191 : code + 120211);
    }),
    "İtalik (Serif)": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120243 : code + 120263);
    }),
    "Kalın İtalik": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120295 : code + 120315);
    }),
    "El Yazısı": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 119939 : code + 119959);
    }),
    "Gotik": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120043 : code + 120063);
    }),
    "Yuvarlak Çerçeve": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 9327 : code + 9333);
    }),
    "Kara Tahta": (s) => s.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      return String.fromCodePoint(code > 90 ? code + 120095 : code + 120115);
    }),
    "Küçük Caps": (s) => {
       const map: any = {a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ϙ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'};
       return s.toLowerCase().split('').map(c => map[c] || c).join('');
    }
  };

  useEffect(() => {
    if (!input.trim()) { setResults([]); return; }
    const res = Object.entries(FONTS).map(([name, transform]) => ({
      name,
      text: transform(input)
    }));
    setResults(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-black text-muted uppercase tracking-[0.2em] px-2 italic">Dönüştürmek İstediğiniz Metin (İngilizce Karakter Önerilir)</label>
        <input 
          type="text" 
          placeholder="Buraya yazın..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="input-field py-6 px-8 text-2xl font-bold shadow-inner border-2 focus:border-accent-primary"
        />
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-result">
           {results.map((res, i) => (
             <div key={i} className="result-container-premium !mt-0 group">
                <div className="result-card-premium !text-left p-6 border-2 border-border group-hover:border-accent-primary/40 transition-all flex justify-between items-center bg-surface hover:scale-[1.02]">
                   <div className="flex-grow">
                      <div className="text-[10px] font-black text-muted uppercase mb-2 tracking-widest">{res.name}</div>
                      <div className="text-2xl font-medium text-primary break-all pr-4">{res.text}</div>
                   </div>
                   <button 
                    onClick={() => copy(res.text)}
                    className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-all shadow-lg"
                   >
                     <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}

      {input && (
        <p className="text-center text-xs text-muted font-medium bg-secondary/5 p-4 rounded-xl border border-dashed border-border">
          💡 Unicode yazı tipleri tüm sosyal medya platformlarında (Instagram, WhatsApp, X, TikTok) çalışır. 
          Bazı cihazlarda bu özel karakterler kutucuk şeklinde görünebilir.
        </p>
      )}
    </div>
  );
}
