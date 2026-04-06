"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, ArrowRight, Sparkles, Brain, Zap, Globe, Layers } from "lucide-react";
import { calculators } from "@/data/calculators";

type Message = {
  id: string;
  type: "ai" | "user";
  text: string;
  links?: { title: string; slug: string }[];
};

export function KalkulaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "Sistem Aktif. Ben Kalküla 3D Holografik Asistan. Platformdaki tüm operasyonel verileri tarayıp size en hızlı çözümü sunmak için senkronize oldum. Hangi hesaplamada desteğe ihtiyacınız var?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  if (isMobile) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), type: "user", text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    processAI(inputValue);
  };

  const processAI = (query: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      
      // Math handling
      if (/^[0-9+\-*/().\s]+$/.test(q) && /[+\-*/]/.test(q)) {
        try {
          const res = Function(`"use strict"; return (${q})`)();
          setMessages(p => [...p, { id: Date.now().toString(), type: "ai", text: `Hesaplama sonucunuz: **${res}**` }]);
          setIsTyping(false);
          return;
        } catch {}
      }

      // Tool search
      const matches = calculators.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.categoryId.toLowerCase().includes(q)
      ).slice(0, 3);

      let txt = "";
      if (matches.length > 0) {
        txt = "Aramanızla ilgili en profesyonel araçları aşağıda listeledim:";
      } else if (q.includes("selam") || q.includes("merhaba")) {
        txt = "Merhaba, ben Kalküla Akıllı Rehber. Hangi hesaplama veya finansal işlemde size destek olabilirim?";
      } else if (q.includes("teşekkür")) {
        txt = "Rica ederim, her zaman buradayım. Başka bir işlemde yardımcı olmamı ister misiniz?";
      } else {
        txt = "Üzgünüm, bu konuda tam eşleşen bir araç bulamadım. Ancak ana sayfadaki kategorilerimize göz atarak ihtiyacınız olan hesaplamayı bulabilirsiniz.";
      }

      setMessages(p => [...p, { 
        id: Date.now().toString(), 
        type: "ai", 
        text: txt, 
        links: matches.map(m => ({ title: m.title, slug: m.slug })) 
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 99999, perspective: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      {/* 3D Holographic Chat Environment */}
      <div 
        className={`transition-all duration-700 transform ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isOpen ? "opacity-100 translate-y-0 translate-z-0 rotate-y-[-12deg] rotate-x-[5deg] scale-100 shadow-[0_50px_100px_rgba(37,99,235,0.25)] pointer-events-auto" : "opacity-0 translate-y-20 translate-z-[-200px] rotate-y-[-30deg] scale-75 pointer-events-none"
        }`}
        style={{ 
          width: '420px', 
          height: '660px', 
          marginBottom: '24px', 
          borderRadius: '40px', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          transformStyle: 'preserve-3d',
          boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.2), 0 30px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Cyber Neon Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 animate-pulse"></div>

        {/* Header - Holographic Layer */}
        <div className="p-8 pb-6 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse">
              <Brain color="white" size={30} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h3 className="font-black text-2xl tracking-tighter text-white drop-shadow-lg leading-none">KALKÜLA AI</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Quantum Intelligence Engine</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all relative z-10"
          >
            <X size={24} />
          </button>
        </div>

        {/* 3D Message Feed */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scroll-smooth hide-scrollbar relative">
          {/* Background Grid Decoration */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"} transform transition-all duration-300 translate-z-[20px]`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className={`p-6 px-8 rounded-[30px] text-[15px] font-bold leading-relaxed max-w-[340px] relative transition-transform hover:translate-z-[10px] group/bubble ${
                  m.type === "ai" 
                    ? "bg-gradient-to-br from-blue-600/90 to-indigo-800/90 text-white rounded-tl-none border-l-4 border-cyan-400 shadow-[0_15px_30px_rgba(0,0,0,0.3)]" 
                    : "bg-white/5 text-zinc-100 rounded-tr-none border border-white/10 shadow-xl backdrop-blur-md"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<span class="text-cyan-300">$1</span>') }} />
                
                {m.links && m.links.length > 0 && (
                  <div className="mt-5 flex flex-col gap-2.5">
                    {m.links.map(l => (
                      <Link 
                        key={l.slug} 
                        href={`/hesapla/${l.slug}`}
                        className="flex items-center justify-between gap-3 p-4 px-5 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black transition-all border border-white/5 group/link active:scale-95"
                      >
                        {l.title}
                        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-blue-900 group-hover/link:translate-x-1 transition-transform">
                           <ArrowRight size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Bubble Subtle Glow */}
                {m.type === "ai" && (
                  <div className="absolute -inset-1 bg-cyan-400/20 blur-xl opacity-0 group-hover/bubble:opacity-100 transition-opacity rounded-full pointer-events-none"></div>
                )}
              </div>
              <span className="text-[10px] font-black opacity-20 mt-3 px-2 uppercase tracking-[0.3em] text-white">
                {m.type === "ai" ? "// SYSTEM ENGINE" : "// USER INPUT"}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start gap-2">
               <div className="p-4 px-8 bg-white/5 rounded-3xl rounded-tl-none flex gap-2 items-center border border-white/10">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Futuristic Action Zone */}
        <div className="p-8 pt-0 mt-auto relative z-20">
          {messages.length === 1 && (
            <div className="mb-6 flex flex-wrap gap-2.5 animate-slide-up-chat">
              {['Kredi Hesapla', 'Borsa Analizi', 'Döviz Dönüştür', 'Vücut Endeksi'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setInputValue(tag)}
                  className="p-3 px-5 rounded-2xl text-[11px] font-black bg-blue-500/10 text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400 hover:text-blue-900 transition-all pointer-events-auto transform hover:translate-z-[15px]"
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <div className="relative group pointer-events-auto shadow-[0_0_50px_rgba(37,99,235,0.15)]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-pink-600 rounded-3xl opacity-30 group-focus-within:opacity-100 blur transition-all"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" && handleSend())}
                placeholder="Quantum sistemine mesaj gönder..."
                className="w-full bg-zinc-900 border-none rounded-3xl py-5 pl-7 pr-16 text-[15px] font-bold text-white focus:outline-none placeholder:text-white/20"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 p-3.5 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-90 transition-all group/send"
              >
                <Zap size={22} className="group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>
          <div className="mt-5 text-center text-[9px] font-black opacity-20 uppercase tracking-[0.4em] text-white">
            Secure Intelligence // Layer 12 Powered
          </div>
        </div>
      </div>

      {/* Futuristic Toggle Core */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-[30px] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group pointer-events-auto relative overflow-hidden ${
          isOpen ? "bg-zinc-900 rotate-90" : "bg-blue-600"
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          boxShadow: isOpen ? '0 0 50px rgba(0,0,0,0.5)' : '0 20px 60px rgba(37, 99, 235, 0.5)' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-marquee opacity-30"></div>
        {isOpen ? <X size={32} className="text-white relative z-10" /> : <Layers size={40} className="text-white relative z-10 group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-4 border-white animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
