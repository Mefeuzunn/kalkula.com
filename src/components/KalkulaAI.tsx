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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      
      // 1. Check for Math Expressions
      if (/^[0-9+\-*/().\s]+$/.test(lowerQuery) && /[+\-*/]/.test(lowerQuery)) {
        try {
          // Safe eval alternative for basic math
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

      // 2. Fuzzy Search for Tools
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
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-blue-600 animate-pulse-glow"
        }`}
        style={{
          background: isOpen ? "#f43f5e" : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        }}
      >
        {isOpen ? <X color="white" size={24} /> : <MessageCircle color="white" size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-[9999] w-[380px] h-[550px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col glass-chat animate-slide-up-chat overflow-hidden"
          style={{ maxWidth: "calc(100vw - 48px)" }}
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-bottom" style={{ background: "linear-gradient(to right, rgba(37,99,235,0.1), transparent)", borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles color="white" size={20} />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>KALKULA AI</div>
              <div className="text-[10px] uppercase font-bold text-blue-500 tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Çevrimiçi Asistan
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"}`}
              >
                <div 
                  className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    m.type === "ai" ? "chat-bubble-ai" : "chat-bubble-user"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  
                  {m.links && m.links.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1">
                      {m.links.map(l => (
                        <Link 
                          key={l.slug} 
                          href={`/hesapla/${l.slug}`}
                          className="flex items-center justify-between gap-2 p-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors group"
                        >
                          {l.title}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[9px] font-bold opacity-30 mt-1 uppercase tracking-tighter">
                  {m.type === "ai" ? "Kalkula Asistan" : "Siz"}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 p-2 px-4 bg-gray-500/10 rounded-full w-fit animate-pulse">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {['BMI', 'Ek Ders', 'MTV', 'Döviz'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => {
                    setInputValue(tag);
                    // Focus logic would go here
                  }}
                  className="p-1 px-3 border border-blue-500/30 rounded-full text-[10px] font-extrabold hover:bg-blue-500 hover:text-white transition-all text-blue-600"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Bir hesaplama aracı sorun..."
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-transform active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Kalkula Akıllı Asistan Sistemi
            </div>
          </div>
        </div>
      )}
    </>
  );
}
