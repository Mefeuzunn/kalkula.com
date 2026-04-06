"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, ArrowRight, Sparkles, Minus, Maximize2 } from "lucide-react";
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
      text: "Merhaba! Ben Kalkula Akıllı İş Birliği Asistanı. Platformdaki 160'tan fazla araç arasından ihtiyacınız olanı bulmanıza yardımcı olabilirim.",
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
      const q = query.toLowerCase();
      
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
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      ).slice(0, 3);

      let txt = "";
      if (matches.length > 0) {
        txt = "Aradığınız kriterlere uygun en profesyonel araçları listeledim:";
      } else if (q.includes("selam") || q.includes("merhaba")) {
        txt = "Size de merhaba. Kalkula çözüm odaklı asistanıyım. Hangi operasyonel hesaplamada desteğe ihtiyacınız var?";
      } else {
        txt = "Üzgünüm, bu konuda spesifik bir araç bulamadım. Ancak kategorilerimize göz atarak tüm modüllere erişebilirsiniz.";
      }

      setMessages(p => [...p, { 
        id: Date.now().toString(), 
        type: "ai", 
        text: txt, 
        links: matches.map(m => ({ title: m.title, slug: m.slug })) 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[10001] w-16 h-16 rounded-3xl flex items-center justify-center shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 group ${
          isOpen ? "bg-white text-blue-600 rotate-90" : "bg-blue-600 text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Professional Pop-up Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-28 right-8 z-[10000] w-[420px] h-[640px] rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden glass-chat animate-slide-up-chat border border-white/20"
        >
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 relative">
                <Sparkles size={24} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-blue-600 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Kalkula Intelligence</h3>
                <p className="text-[11px] opacity-70 font-semibold tracking-widest uppercase">Operasyonel Destek</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-40">
              <Minus size={20} className="cursor-pointer hover:opacity-100" />
              <Maximize2 size={16} className="cursor-pointer hover:opacity-100" />
            </div>
          </div>

          {/* Messages (Professional Style) */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth bg-gradient-to-b from-blue-50/10 to-transparent dark:from-blue-900/5 hide-scrollbar">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex gap-3 ${m.type === "user" ? "flex-row-reverse" : "flex-row text-left"}`}
              >
                {m.type === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-blue-600">
                    <Sparkles size={16} />
                  </div>
                )}
                <div className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"}`}>
                  <div 
                    className={`p-4 px-5 rounded-[22px] text-[15px] font-medium leading-relaxed max-w-[320px] shadow-sm ${
                      m.type === "ai" 
                        ? "bg-blue-600 text-white rounded-tl-none" 
                        : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tr-none border border-zinc-100 dark:border-zinc-700"
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    
                    {m.links && m.links.length > 0 && (
                      <div className="mt-4 flex flex-col gap-2">
                        {m.links.map(l => (
                          <Link 
                            key={l.slug} 
                            href={`/hesapla/${l.slug}`}
                            className="flex items-center justify-between gap-3 p-3 px-4 bg-white/15 dark:bg-black/20 hover:bg-white/25 rounded-xl text-xs font-bold transition-all border border-white/10 group/item"
                          >
                            {l.title}
                            <ArrowRight size={16} className="group-hover/item:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold opacity-30 mt-2 px-1 uppercase tracking-widest leading-none">
                    {m.type === "ai" ? "Kalkula Engine" : "Siz"}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Sparkles size={16} className="text-blue-600 animate-pulse" />
                 </div>
                 <div className="p-3 px-6 bg-blue-100/50 dark:bg-blue-900/20 rounded-full animate-pulse flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Professional Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-2 flex flex-wrap gap-2">
              {['BMI Analizi', 'Ek Ders 2026', 'Döviz Dönüştür'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setInputValue(tag)}
                  className="p-2 px-4 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input Area */}
          <div className="p-6 pt-2 bg-white/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
            <div className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" && handleSend())}
                placeholder="Nasıl yardımcı olabilirim?"
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-4 pl-5 pr-14 text-sm font-semibold focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="mt-3 text-center text-[10px] font-bold text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
              Secure Intelligence Pipeline
            </p>
          </div>
        </div>
      )}
    </>
  );
}
