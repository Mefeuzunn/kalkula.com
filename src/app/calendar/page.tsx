"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CalendarEvent = {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  color: string;
  allDay: boolean;
};

const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];
const STORAGE_KEY = "kalkula_calendar_events";
const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const dayNamesFull = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function Calendar() {
  const [current, setCurrent] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEvents(JSON.parse(raw));
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const todayStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
    setSelectedDate(todayStr);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveEvents = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addEvent = () => {
    if (!newTitle.trim() || !selectedDate) return;
    const ev: CalendarEvent = {
      id: `ev_${Date.now()}`,
      date: selectedDate,
      title: newTitle.trim(),
      color: newColor,
      allDay: true,
    };
    saveEvents([...events, ev]);
    setNewTitle("");
    setShowModal(false);
  };

  const deleteEvent = (id: string) => saveEvents(events.filter(e => e.id !== id));

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const getDateStr = (day: number) =>
    `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const eventsForDate = (dateStr: string) => events.filter(e => e.date === dateStr);
  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  // --- PC LAYOUT ---
  const renderPCLayout = () => (
    <>
      <section style={{
        background: "linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)",
        padding: "4rem 0 3rem",
        textAlign: "center",
        color: "white",
        marginBottom: "3rem"
      }}>
        <div className="container">
          <div style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "0.3rem 1rem", fontSize: "0.85rem", fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block" }}></span>
            Kalkula Takvim
          </div>
          <h1 style={{ 
            fontSize: "3.5rem", 
            fontWeight: 900, 
            marginBottom: "1rem", 
            lineHeight: 1.1, 
            letterSpacing: "-0.05em",
            background: "linear-gradient(to bottom, #ffffff 30%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            Takvim
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto 0.5rem", lineHeight: 1.7 }}>
            Planlarınızı ve önemli günlerinizi profesyonelce yönetin.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/" className="btn-secondary rounded-full" style={{ padding: '0.75rem 1.5rem' }}>← Ana Sayfa</Link>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setCurrent(new Date())} className="btn-secondary">Bugün</button>
            <button onClick={() => {}} className="btn-secondary">Dışa Aktar ↓</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "28px", overflow: "hidden", boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.75rem", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
              <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))} className="btn-secondary" style={{ width: 44, height: 44, padding: 0 }}>‹</button>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 900 }}>{monthNames[current.getMonth()]} {current.getFullYear()}</h2>
              <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))} className="btn-secondary" style={{ width: 44, height: 44, padding: 0 }}>›</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "rgba(255,255,255,0.01)" }}>
              {dayNames.map((d, i) => (
                <div key={d} style={{ padding: "1.25rem 0.5rem", textAlign: "center", fontSize: "0.75rem", fontWeight: 900, color: i >= 5 ? "#ef4444" : "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{d}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: "120px", background: "rgba(0,0,0,0.05)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = getDateStr(day);
                const dayEvents = eventsForDate(dateStr);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;

                return (
                  <div key={day} onClick={() => setSelectedDate(dateStr)}
                    style={{
                      minHeight: "120px",
                      padding: "0.6rem",
                      cursor: "pointer",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      background: isSelected ? "var(--accent-glow)" : "var(--surface)",
                      transition: "all 0.2s"
                    }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: "0.9rem",
                      background: isToday ? "var(--accent-primary)" : "none",
                      color: isToday ? "white" : "var(--text-primary)",
                    }}>
                      {day}
                    </div>
                    <div style={{ marginTop: '4px', display: "flex", flexDirection: "column", gap: "2px" }}>
                      {dayEvents.slice(0, 3).map(ev => (
                        <div key={ev.id} style={{ background: ev.color, color: "white", borderRadius: "4px", padding: "2px 6px", fontSize: "0.65rem", fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "28px", padding: "2rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--accent-primary)", letterSpacing: "2px", marginBottom: "0.75rem" }}>SEÇİLİ GÜN</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>{selectedDate ? new Date(selectedDate + "T12:00:00").getDate() : today.getDate()}</div>
              <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: '1.1rem' }}>
                  {selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("tr-TR", { weekday: "long" }) : dayNamesFull[(today.getDay() + 6) % 7]}
              </div>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "28px", padding: "2rem", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div style={{ fontWeight: 900 }}>Etkinlikler</div>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>+ Yeni Ekle</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {selectedEvents.map(ev => (
                  <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: "20px", borderLeft: `6px solid ${ev.color}` }}>
                    <span style={{ flex: 1, fontWeight: 800, fontSize: "0.9rem" }}>{ev.title}</span>
                    <button onClick={() => deleteEvent(ev.id)} style={{ color: "#ef4444", fontSize: "1.2rem", cursor: "pointer", background: 'none', border: 'none' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // --- MOBILE LAYOUT ---
  const renderMobileLayout = () => {
    const getAgendaDays = () => {
      const res = [];
      const start = new Date(current.getFullYear(), current.getMonth(), 1);
      for (let i = 0; i < daysInMonth; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        res.push(d);
      }
      return res;
    };

    return (
      <div style={{ padding: "0" }}>
        <section style={{
          background: "linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)",
          padding: "3rem 1.25rem 2.5rem",
          textAlign: "center",
          color: "white",
          marginBottom: "1.5rem"
        }}>
          <div style={{ marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "0.2rem 0.8rem", fontSize: "0.75rem", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block" }}></span>
            Kalkula Takvim
          </div>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: 900, 
            marginBottom: "0.5rem", 
            lineHeight: 1.1, 
            letterSpacing: "-0.06em",
            background: "linear-gradient(to bottom, #ffffff 40%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 15px 30px rgba(0,0,0,0.2)"
          }}>
            Takvim
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: "1.5rem" }}>
            <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', width: 44, height: 44, color: 'white' }}>‹</button>
            <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', width: 44, height: 44, color: 'white' }}>›</button>
          </div>
        </section>

        <div style={{ padding: '0 1.25rem', marginBottom: '1.5rem' }}>
           <div style={{ background: 'var(--accent-primary)', padding: '1.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px var(--accent-primary-glow)' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '4rem', opacity: 0.1 }}>📅</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', margin: 0 }}>{monthNames[current.getMonth()]} {current.getFullYear()}</h2>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '0.25rem 0 0 0' }}>{events.filter(e => e.date.startsWith(getDateStr(1).slice(0, 7))).length} etkinlik planlandı</p>
           </div>
        </div>

        {/* Agenda View (Vertical List) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {getAgendaDays().map((d, i) => {
            const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            const isToday = ds === todayStr;
            const dsEvents = eventsForDate(ds);
            
            return (
              <div key={ds} style={{ 
                background: 'var(--bg-primary)', 
                padding: '1.25rem', 
                display: 'flex', 
                gap: '1.25rem',
                opacity: 1
              }}>
                <div style={{ textAlign: 'center', width: '50px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{dayNamesFull[(d.getDay() + 6) % 7].slice(0, 3)}</div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 900, 
                    color: isToday ? 'white' : 'var(--text-primary)',
                    background: isToday ? 'var(--accent-primary)' : 'transparent',
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0.25rem auto 0'
                  }}>
                    {d.getDate()}
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   {dsEvents.length > 0 ? (
                      dsEvents.map(ev => (
                        <div key={ev.id} style={{ 
                          padding: '1rem', 
                          background: 'var(--surface)', 
                          borderRadius: '16px', 
                          borderLeft: `4px solid ${ev.color}`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{ev.title}</span>
                          <button onClick={() => deleteEvent(ev.id)} style={{ color: '#ef4444', fontSize: '1rem', opacity: 0.5 }}>✕</button>
                        </div>
                      ))
                   ) : (
                      <button 
                        onClick={() => { setSelectedDate(ds); setShowModal(true); }}
                        style={{ padding: '0.8rem', border: '2px dashed var(--border)', borderRadius: '16px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, background: 'none' }}
                      >
                        + Yeni Plan Ekle
                      </button>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Action Button (FAB) Mobile */}
        <button 
          onClick={() => { setSelectedDate(todayStr); setShowModal(true); }}
          style={{ 
            position: 'fixed', 
            bottom: '100px', 
            right: '20px', 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--accent-primary)', 
            color: 'white', 
            fontSize: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 10px 40px var(--accent-primary-glow)',
            zIndex: 100,
            border: 'none'
          }}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: isMobile ? '100px' : '0' }}>
      {isMobile ? renderMobileLayout() : renderPCLayout()}
      
      {/* Shared Modal Logic */}
      {showModal && selectedDate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: 'blur(10px)', zIndex: 1000, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center" }}
          onClick={() => setShowModal(false)}>
          <div style={{ 
            background: "var(--surface)", 
            borderRadius: isMobile ? "32px 32px 0 0" : "28px", 
            padding: "2.5rem", 
            width: "100%", 
            maxWidth: "500px", 
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)",
            animation: 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ fontWeight: 900, marginBottom: "0.5rem", fontSize: "1.75rem" }}>Plan Oluştur</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "2rem" }}>
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder="Ne yapacaksınız?" autoFocus
              style={{ width: "100%", padding: "1.25rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "20px", color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "2rem", outline: "none", boxSizing: "border-box" }} />
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "1rem", textTransform: "uppercase" }}>Renk Seçimi</div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setNewColor(c)}
                    style={{ width: 44, height: 44, borderRadius: "50%", background: c, border: c === newColor ? "4px solid white" : "none", cursor: "pointer", transition: "transform 0.2s", transform: c === newColor ? "scale(1.2)" : "scale(1)" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, padding: '1.25rem', borderRadius: '20px', fontWeight: 900 }}>Vazgeç</button>
              <button onClick={addEvent} className="btn-primary" style={{ flex: 1, padding: '1.25rem', borderRadius: '20px', fontWeight: 900 }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
