"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, ArrowRight, Sparkles, Headset, Circle } from "lucide-react";
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
      text: "Merhaba! Ben Kalküla Akıllı Rehber. Platformumuzdaki 160'tan fazla araç arasından size en uygun olanı bulmak için buradayım. Size nasıl yardımcı olabilirim?",
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
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      {/* Floating Chat Window */}
      <div 
        className={`glass-chat transition-all duration-500 transform ease-in-out border border-white/10 ${
          isOpen ? "opacity-100 translate-y-0 scale-100 shadow-2xl pointer-events-auto" : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
        style={{ 
          width: '400px', 
          height: '600px', 
          marginBottom: '20px', 
          borderRadius: '24px', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Professional Header */}
        <div className="bg-blue-600 p-6 text-white flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm relative">
              <Sparkles size={24} />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-blue-600 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight leading-none">Akıllı Rehber</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Çevrimiçi Destek</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 bg-gradient-to-b from-blue-50/5 to-transparent hide-scrollbar">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"}`}
            >
              <div 
                className={`p-4 px-5 rounded-2xl text-[14px] font-medium leading-relaxed max-w-[300px] shadow-sm ${
                  m.type === "ai" 
                    ? "bg-blue-600 text-white rounded-tl-none" 
                    : "bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tr-none border border-black/5 dark:border-white/5"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                
                {m.links && m.links.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {m.links.map(l => (
                      <Link 
                        key={l.slug} 
                        href={`/hesapla/${l.slug}`}
                        className="flex items-center justify-between gap-3 p-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-[11px] font-extrabold transition-all border border-white/10 group/link"
                      >
                        {l.title}
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-bold opacity-30 mt-1.5 px-1 uppercase tracking-widest leading-none">
                {m.type === "ai" ? "Kalküla AI" : "Siz"}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start">
               <div className="p-3 px-5 bg-gray-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Bar */}
        <div className="p-6 pt-0 mt-auto">
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {['Vücut Kitle Endeksi', 'Ek Ders', 'Altın Hesapla'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setInputValue(tag)}
                  className="p-2 px-3.5 rounded-lg text-[11px] font-bold bg-blue-50 dark:bg-blue-900/10 text-blue-600 border border-blue-100 dark:border-blue-900/20 hover:bg-blue-600 hover:text-white transition-all pointer-events-auto"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="relative group pointer-events-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" && handleSend())}
              placeholder="Nasıl yardımcı olabilirim?"
              className="w-full bg-gray-100 dark:bg-zinc-800 border-2 border-transparent rounded-2xl py-4 pl-5 pr-14 text-[14px] font-bold focus:border-blue-600/30 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-400"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-90"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-3 text-center text-[9px] font-black opacity-20 uppercase tracking-[0.2em]">
            Kalküla Akıllı Hizmet Sistemi
          </div>
        </div>
      </div>

      {/* Main Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group pointer-events-auto ${
          isOpen ? "bg-red-500 text-white rotate-90" : "bg-blue-600 text-white"
        }`}
        style={{ 
          boxShadow: isOpen ? '0 10px 40px rgba(239, 68, 68, 0.4)' : '0 10px 40px rgba(37, 99, 235, 0.4)' 
        }}
      >
        {isOpen ? <NoIcon size={28} /> : <MessageIcon size={32} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}

// Fixed Lucide Icons for clarity in rewrite
function MessageIcon({ size, className }: { size: number, className: string }) {
  return <MessageCircle size={size} className={className} />;
}

function NoIcon({ size }: { size: number }) {
  return <X size={size} />;
}
