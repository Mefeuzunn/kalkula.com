"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Copy, RefreshCw, MessageSquare, Briefcase, Code, PenTool, Check, Info } from "lucide-react";
import confetti from "canvas-confetti";

type Role = {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string;
};

const roles: Role[] = [
  { 
    id: "coder", 
    name: "Yazılım Uzmanı", 
    icon: <Code size={18} />, 
    prompt: "Sen dünyanın en iyi senior yazılım mühendisisin. Temiz kod (clean code), performans ve güvenlik prensiplerine sadık kalarak çözüm üretirsin." 
  },
  { 
    id: "writer", 
    name: "Yaratıcı Yazar", 
    icon: <PenTool size={18} />, 
    prompt: "Sen ödüllü bir edebiyatçı ve içerik editörüsün. Dilin akıcılığına, duygu tonuna ve metaforlara büyük önem verirsin." 
  },
  { 
    id: "marketer", 
    name: "Pazarlama Gurusu", 
    icon: <Briefcase size={18} />, 
    prompt: "Sen bir büyüme (growth) ve pazarlama uzmanısın. İkna edici, dikkat çekici ve dönüşüm odaklı (conversion-focused) metinler yazarsın." 
  },
  { 
    id: "general", 
    name: "Yapay Zeka Asistanı", 
    icon: <Sparkles size={18} />, 
    prompt: "Sen yardımsever, tarafsız ve son derece bilgili bir yapay zeka asistanısın. Karmaşık konuları basitçe açıklar ve adım adım çözüm sunarsın." 
  }
];

export function AiPromptOptimizer() {
  const [input, setInput] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [tone, setTone] = useState("Professional");
  const [optimized, setOptimized] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const optimize = () => {
    if (!input.trim()) return;

    let result = `[ROLE]\n${selectedRole.prompt}\n\n`;
    result += `[CONTEXT & TONE]\nTone: ${tone}\n\n`;
    result += `[TASK]\n${input.trim()}\n\n`;
    result += `[CONSTRAINTS]\n- Doğrudan cevabı ver, lafı uzatma.\n- En iyi uygulamaları (best practices) takip et.\n- Eğer belirsizlik varsa varsayım yapmak yerine soru sor.`;

    setOptimized(result);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.8 },
      colors: ["#8b5cf6", "#6366f1"]
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimized);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="calc-wrapper animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-600">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">AI Prompt Optimizer</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Yapay Zeka Komut Geliştirici</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-12 space-y-8 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Role Selection */}
            <div className="space-y-4">
              <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                <Briefcase size={14} /> Yapay Zeka Rolü
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-black text-[10px] ${selectedRole.id === r.id ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-secondary/20 border-border text-muted hover:border-purple-600/20"}`}
                  >
                    <span className="text-lg">{r.icon}</span>
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-4">
              <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                <MessageSquare size={14} /> İletişim Tonu
              </label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="input-field w-full h-[100px] !text-lg font-bold"
              >
                <option value="Professional (Resmi ve ciddi)">Resmi & Profesyonel</option>
                <option value="Friendly (Arkadaş canlısı ve sıcak)">Arkadaş Canlısı</option>
                <option value="Direct (Minimalist ve sonuç odaklı)">Kısa & Öz</option>
                <option value="Creative (İlham verici ve sanatsal)">Yaratıcı</option>
                <option value="Socratic (Soru sormaya teşvik eden)">Sokratik (Öğretici)</option>
              </select>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-4 pt-4 border-t border-border">
            <label className="text-xs font-black text-muted uppercase tracking-widest ml-1">HAM KOMUTUNUZ (NE YAPILMASINI İSTİYORSUNUZ?)</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Örn: React ile bir hava durumu uygulaması nasıl yapılır?"
              className="input-field w-full min-h-[150px] !p-6 resize-none focus:ring-4 focus:ring-purple-500/10 transition-all font-medium leading-relaxed"
            />
          </div>

          <button 
            className="btn-primary w-full py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 bg-purple-600 shadow-purple-500/40 hover:bg-purple-700 active:transform active:scale-95 transition-all"
            onClick={optimize}
            disabled={!input.trim()}
          >
            <Sparkles size={20} /> Promp'u Optimize Et
          </button>
        </div>

        {/* Output Area */}
        {optimized && (
          <div className="lg:col-span-12 animate-slide-up">
            <div className="bg-zinc-900 dark:bg-black rounded-[2.5rem] border-4 border-purple-500/20 shadow-2xl overflow-hidden">
              <div className="bg-zinc-800/50 p-4 flex justify-between items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4 italic">Optimized Prompt v2.4</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${isCopied ? "bg-green-500 text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  {isCopied ? "KOPYALANDI" : "KOPYALA"}
                </button>
              </div>
              <div className="p-10">
                <pre className="text-purple-300 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words italic selection:bg-purple-500/30">
                  {optimized}
                </pre>
              </div>
            </div>

            <div className="mt-8 p-6 bg-purple-500/5 border border-purple-500/10 rounded-3xl flex items-start gap-4">
              <Info className="text-purple-600 shrink-0 mt-1" size={18} />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-purple-600 uppercase tracking-widest">PRO TIP</h4>
                <p className="text-xs text-muted leading-relaxed">
                  İyi bir prompt (komut); <b>Rol, Bağlam, Görev ve Kısıtlamaları</b> içermelidir. Bu araç, girdiğin basit cümleyi bu 4 katmanlı yapıya otomatik olarak oturtur. Optimize edilmiş metni kopyalayıp doğrudan chatbot'una yapıştırabilirsin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
