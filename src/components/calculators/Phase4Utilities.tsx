"use client";

import { useState } from "react";
import { ShareResultButton } from "../ShareResultButton";

// Geliştirici & Pratik Araçlar
export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let gen = "";
    for (let i = 0; i < length; i++) {
       gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(gen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{ fontWeight: 600 }}>Şifre Uzunluğu: {length}</label>
        <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} style={{ width: "50%" }} />
      </div>
      
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "0.5rem 0" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Büyük Harf
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> Rakam
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> Sembol
        </label>
      </div>

      <button className="btn-primary" onClick={generate}>Şifre Üret</button>

      {password && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center", position: "relative" }}>
           <div style={{ fontSize: "1.5rem", fontWeight: 800, wordBreak: "break-all", color: "var(--accent-primary)", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "8px", fontFamily: "monospace" }}>
              {password}
           </div>
           <div style={{ marginTop: "1rem" }}>
              <ShareResultButton resultText={"Benim yeni harika güvenli şifrem: " + password} />
           </div>
        </div>
      )}
    </div>
  );
}

export function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\\s/g, "").length;
  const paragraphs = text.trim() ? text.split(/\\n+/).filter(p => p.trim().length > 0).length : 0;
  // Ortalama bir yetişkin dakikada 200 kelime okur.
  const readingTime = Math.ceil(words / 200);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", textAlign: "center" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
           <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{words}</div>
           <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Kelime</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
           <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>{chars}</div>
           <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Karakter</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
           <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>{charsNoSpace}</div>
           <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Boşluksuz</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
           <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>{paragraphs}</div>
           <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Paragraf</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
           <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-secondary)" }}>{readingTime}</div>
           <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Dk. Okuma</div>
        </div>
      </div>
      
      <textarea 
        placeholder="Saymak istediğiniz metni buraya yapıştırın..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className="input-field"
        style={{ minHeight: "250px", resize: "vertical", fontFamily: "inherit" }}
      />
    </div>
  );
}

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrReady, setQrReady] = useState("");

  const generate = () => {
    if (!url.trim()) return;
    const encoded = encodeURIComponent(url);
    setQrReady("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encoded);
  };

  const handleDownload = async () => {
    if (!qrReady) return;
    try {
      const response = await fetch(qrReady);
      const blob = await response.blob();
      const donwloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = donwloadUrl;
      a.download = "kalkula-qr-kod.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(donwloadUrl);
    } catch (err) {
      console.error("QR Code indirilemedi", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Veri veya URL Linki</label>
        <input type="text" placeholder="https://" value={url} onChange={e => setUrl(e.target.value)} className="input-field" />
      </div>
      
      <button className="btn-primary" onClick={generate}>Oluştur</button>

      {qrReady && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={qrReady} alt="QR_Code" style={{ margin: "0 auto", borderRadius: "10px", display: "block" }} />
           <p style={{ marginTop: "1rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Barkodu telefonunuzun kamerası ile okutabilirsiniz.</p>
           <button className="btn-secondary" onClick={handleDownload} style={{ background: "var(--accent-glow)", border: "1px solid var(--accent-primary)", color: "var(--accent-primary)" }}>QR Kodu İndir</button>
        </div>
      )}
    </div>
  );
}

export function RaffleMaker() {
  const [names, setNames] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const roll = () => {
    const list = names.split("\\n").map(n => n.trim()).filter(n => n.length > 0);
    if (list.length === 0) return;
    
    setIsRolling(true);
    let passes = 0;
    const interval = setInterval(() => {
       const randomIdx = Math.floor(Math.random() * list.length);
       setWinner(list[randomIdx]);
       passes++;
       if(passes > 20) {
          clearInterval(interval);
          setIsRolling(false);
          // Pick final
          setWinner(list[Math.floor(Math.random() * list.length)]);
       }
    }, 100);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>İsim Listesi (Her satıra bir isim)</label>
        <textarea 
          placeholder="Ahmet\\nMehmet\\nAyşe..." 
          value={names} 
          onChange={e => setNames(e.target.value)} 
          className="input-field"
          style={{ minHeight: "150px" }}
        />
      </div>
      
      <button className="btn-primary" onClick={roll} disabled={isRolling} style={{ background: isRolling ? "gray" : "linear-gradient(90deg, #ec4899, #8b5cf6)" }}>
        {isRolling ? "Karıştırılıyor..." : "Kura Çek"}
      </button>

      {winner && (
        <div style={{ background: "var(--surface)", border: "2px dashed #8b5cf6", borderRadius: "10px", padding: "2rem", textAlign: "center", position: "relative", overflow: "hidden", transition: "all 0.3s" }}>
           <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>{isRolling ? "Şanslı aranıyor..." : "🎉 Kazanan 🎉"}</div>
           <div style={{ fontSize: "3rem", fontWeight: 800, color: isRolling ? "var(--text-muted)" : "var(--text-primary)" }}>{winner}</div>
           {!isRolling && (
             <div style={{ marginTop: "1.5rem", animation: "fade-in 0.5s ease" }}>
               <ShareResultButton resultText={"Çekilişi kazanan şanslı isim: " + winner} />
             </div>
           )}
        </div>
      )}
    </div>
  );
}

export function RandomNumberGen() {
  const [minVal, setMin] = useState("1");
  const [maxVal, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);

  const roll = () => {
    let lower = parseInt(minVal);
    let upper = parseInt(maxVal);
    if(isNaN(lower)) lower = 1;
    if(isNaN(upper)) upper = 100;
    if(lower > upper) { const t = lower; lower = upper; upper = t; }

    const num = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    setResult(num);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Alt Sınır (Min)</label>
            <input type="number" value={minVal} onChange={e => setMin(e.target.value)} className="input-field" />
         </div>
         <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>Üst Sınır (Maks)</label>
            <input type="number" value={maxVal} onChange={e => setMax(e.target.value)} className="input-field" />
         </div>
      </div>
      <button className="btn-primary" onClick={roll}>Zar At / Üret</button>

      {result !== null && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
           <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Rastgele Seçilen Sayı</div>
           <div style={{ fontSize: "5rem", fontWeight: 900, color: "var(--accent-primary)" }}>{result}</div>
        </div>
      )}
    </div>
  );
}
