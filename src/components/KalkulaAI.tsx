"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Calculator, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { calculators, categories } from "@/data/calculators";

type Message = {
  id: string;
  type: "ai" | "user";
  text: string;
  links?: { title: string; slug: string }[];
  isMath?: boolean;
};

export function KalkulaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "Merhaba! Ben Kalkula AI asistanınız. Size hangi hesaplamada yardımcı olabilirim?",
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
    scrollToBottom();
  }, [messages, isTyping]);

  if (isMobile) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    processResponse(inputValue);
  };

  const processResponse = (query: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerQuery = query.toLowerCase().trim();
      
      if (/^[0-9+\-*/().\s]+$/.test(lowerQuery) && /[+\-*/]/.test(lowerQuery)) {
        try {
          const result = Function(`"use strict"; return (${lowerQuery})`)();
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "ai",
              text: `İşlemin sonucu: **${result}**`,
              isMath: true,
            },
          ]);
          setIsTyping(false);
          return;
        } catch (e) {}
      }

      const matchedTools = calculators
        .filter((c) => {
          const searchSpace = `${c.title} ${c.description} ${c.slug}`.toLowerCase();
          const keywords = lowerQuery.split(" ").filter(w => w.length > 2);
          return keywords.some(k => searchSpace.includes(k)) || searchSpace.includes(lowerQuery);
        })
        .slice(0, 3);

      let responseText = "";
      if (matchedTools.length > 0) {
        responseText = `Sizin için en uygun ${matchedTools.length} aracı buldum:`;
      } else if (lowerQuery.includes("merhaba") || lowerQuery.includes("selam")) {
        responseText = "Selam! Ben Kalkula akıllı asistanıyım. Bir hesaplama aracı bulmak veya hızlı matematiksel işlemler yapmak için bana yazabilirsiniz.";
      } else if (lowerQuery.includes("teşekkür") || lowerQuery.includes("sağol")) {
        responseText = "Rica ederim! Başka bir hesaplamada yardımcı olmamı ister misiniz?";
      } else {
        responseText = "Aradığınız kriterlere uygun spesifik bir araç bulamadım, ancak kategorilerimize göz atarak ihtiyacınız olan hesaplamayı seçebilirsiniz.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          text: responseText,
          links: matchedTools.map(t => ({ title: t.title, slug: t.slug })),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[10001] w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 group ${
          isOpen ? "translate-x-[-380px]" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          color: "white"
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-black/80 text-white text-[10px] font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Kalkula AI ile Konuş
          </div>
        )}
      </button>

      <div 
        className={`fixed top-0 right-0 z-[10000] w-[450px] h-screen shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col glass-chat transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 pb-4 flex items-center gap-4 border-bottom" style={{ background: "linear-gradient(to right, rgba(37,99,235,0.05), transparent)", borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl">
            <Sparkles color="white" size={24} />
          </div>
          <div>
            <div className="font-black text-xl tracking-tighter" style={{ color: 'var(--text-primary)' }}>KALKULA AI</div>
            <div className="text-[11px] uppercase font-bold text-blue-500 tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Sistem Aktif
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 hide-scrollbar">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"}`}
            >
              <div 
                className={`max-w-[90%] p-4 px-6 rounded-3xl text-[15px] font-medium leading-relaxed shadow-sm ${
                  m.type === "ai" ? "chat-bubble-ai" : "chat-bubble-user"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                
                {m.links && m.links.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {m.links.map(l => (
                      <Link 
                        key={l.slug} 
                        href={`/hesapla/${l.slug}`}
                        className="flex items-center justify-between gap-3 p-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all group/link"
                      >
                        {l.title}
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-[10px] font-bold opacity-30 mt-2 uppercase tracking-widest mx-2">
                {m.type === "ai" ? "Assistant" : "User"}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 px-6 bg-gray-500/10 rounded-full w-fit animate-pulse ml-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-8 pb-6 flex flex-wrap gap-2">
            {['BMI Hesapla', 'Ek Ders Ücreti', 'MTV 2026', 'Dolar Kaç TL?'].map(tag => (
              <button 
                key={tag}
                onClick={() => setInputValue(tag)}
                className="p-2 px-4 border border-blue-500/20 rounded-xl text-[11px] font-black hover:bg-blue-600 hover:text-white transition-all text-blue-600 bg-blue-500/5 hover:border-transparent"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="p-8 pt-0 mt-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl py-4 pl-6 pr-14 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all placeholder:opacity-40"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2.5 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl transition-all active:scale-90"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-4 text-center text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">
            Powered by Kalkula Intelligent Engine
          </div>
        </div>
      </div>
    </>
  );
}
