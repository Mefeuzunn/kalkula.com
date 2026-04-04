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
const STORAGE_KEY = "multihub_calendar_events";
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
  const [view, setView] = useState<"month" | "week">("month");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEvents(JSON.parse(raw));
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

  const exportEvents = () => {
    const content = events.map(e => `${e.date}: ${e.title}`).join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "multihub_takvim.txt";
    a.click();
  };

  const exportICS = () => {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MultiHub//Calendar//TR",
      ...events.flatMap(e => [
        "BEGIN:VEVENT",
        `DTSTART:${e.date.replace(/-/g, "")}`,
        `SUMMARY:${e.title}`,
        `UID:${e.id}@multihub`,
        "END:VEVENT",
      ]),
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([lines], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "multihub_takvim.ics";
    a.click();
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const getDateStr = (day: number) =>
    `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const eventsForDate = (dateStr: string) => events.filter(e => e.date === dateStr);

  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  // Week view helpers
  const getWeekDays = () => {
    const d = new Date(today);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    d.setDate(d.getDate() + diff);
    return Array.from({ length: 7 }, (_, i) => {
      const wd = new Date(d);
      wd.setDate(d.getDate() + i);
      return wd;
    });
  };

  const weekDays = getWeekDays();

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/" className="btn-secondary">← Geri</Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Takvim</h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={() => setView(v => v === "month" ? "week" : "month")} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
            {view === "month" ? "Haftalık Görünüm" : "Aylık Görünüm"}
          </button>
          <button onClick={exportEvents} className="btn-secondary" style={{ fontSize: "0.85rem" }}>↓ TXT</button>
          <button onClick={exportICS} className="btn-secondary" style={{ fontSize: "0.85rem" }}>↓ ICS (iCal)</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem" }}>
        {/* Calendar Grid */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
            <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))}
              style={{ width: 36, height: 36, borderRadius: "8px", background: "none", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text-primary)", fontWeight: 700 }}>
              ‹
            </button>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{monthNames[current.getMonth()]} {current.getFullYear()}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => setCurrent(new Date())} style={{ padding: "0.35rem 0.75rem", borderRadius: "6px", background: "var(--accent-glow)", border: "1px solid var(--accent-primary)", cursor: "pointer", color: "var(--accent-primary)", fontSize: "0.8rem", fontWeight: 600 }}>
                Bugün
              </button>
              <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                style={{ width: 36, height: 36, borderRadius: "8px", background: "none", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text-primary)", fontWeight: 700 }}>
                ›
              </button>
            </div>
          </div>

          {view === "month" ? (
            <>
              {/* Day labels */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "var(--bg-tertiary)" }}>
                {dayNames.map((d, i) => (
                  <div key={d} style={{ padding: "0.6rem", textAlign: "center", fontSize: "0.78rem", fontWeight: 700, color: i >= 5 ? "#ef4444" : "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                  <div key={`e${i}`} style={{ minHeight: "80px", backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = getDateStr(day);
                  const dayEvents = eventsForDate(dateStr);
                  const isToday = dateStr === todayStr;
                  const isSelected = dateStr === selectedDate;
                  const colIdx = (adjustedFirstDay + i) % 7;
                  const isWeekend = colIdx >= 5;

                  return (
                    <div key={day} onClick={() => { setSelectedDate(dateStr); }}
                      style={{
                        minHeight: "80px",
                        padding: "0.4rem",
                        cursor: "pointer",
                        borderRight: "1px solid var(--border)",
                        borderBottom: "1px solid var(--border)",
                        background: isSelected ? "var(--accent-glow)" : isToday ? "rgba(37,99,235,0.05)" : "var(--surface)",
                        transition: "background 0.15s",
                        position: "relative",
                      }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: isToday ? 700 : 400,
                        fontSize: "0.85rem",
                        background: isToday ? "var(--accent-primary)" : "none",
                        color: isToday ? "white" : isWeekend ? "#ef4444" : "var(--text-primary)",
                      }}>
                        {day}
                      </div>
                      <div style={{ marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "2px" }}>
                        {dayEvents.slice(0, 2).map(ev => (
                          <div key={ev.id} style={{ background: ev.color, color: "white", borderRadius: "3px", padding: "1px 4px", fontSize: "0.65rem", fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>+{dayEvents.length - 2} daha</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            // Week view
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--border)" }}>
                {weekDays.map((d, i) => {
                  const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                  const isToday = ds === todayStr;
                  return (
                    <div key={i} onClick={() => setSelectedDate(ds)} style={{ padding: "1rem 0.5rem", textAlign: "center", cursor: "pointer", borderRight: i < 6 ? "1px solid var(--border)" : "none", background: ds === selectedDate ? "var(--accent-glow)" : "none" }}>
                      <div style={{ fontSize: "0.75rem", color: i >= 5 ? "#ef4444" : "var(--text-muted)", marginBottom: "0.25rem" }}>{dayNamesFull[i].slice(0, 3)}</div>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", background: isToday ? "var(--accent-primary)" : "none", color: isToday ? "white" : "var(--text-primary)", fontWeight: 700, fontSize: "1.1rem" }}>
                        {d.getDate()}
                      </div>
                      <div style={{ marginTop: "0.4rem", display: "flex", flexDirection: "column", gap: "2px" }}>
                        {eventsForDate(ds).map(ev => (
                          <div key={ev.id} style={{ background: ev.color, color: "white", borderRadius: "3px", padding: "1px 3px", fontSize: "0.65rem", fontWeight: 600 }}>{ev.title}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Today info */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px", fontWeight: 600, marginBottom: "0.5rem" }}>Bugün</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)" }}>{today.getDate()}</div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{dayNamesFull[(today.getDay() + 6) % 7]}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{monthNames[today.getMonth()]} {today.getFullYear()}</div>
          </div>

          {/* Selected date events */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ fontWeight: 700 }}>
                {selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long" }) : "Bir gün seçin"}
              </div>
              {selectedDate && (
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.35rem 0.75rem" }}>
                  + Etkinlik
                </button>
              )}
            </div>

            {selectedDate && selectedEvents.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", padding: "1.5rem 0" }}>Bu güne ait etkinlik yok.</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {selectedEvents.map(ev => (
                <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.75rem", background: "var(--bg-secondary)", borderRadius: "8px", borderLeft: `4px solid ${ev.color}` }}>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: "0.9rem" }}>{ev.title}</span>
                  <button onClick={() => deleteEvent(ev.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.95rem" }}>✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>İstatistik</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", textAlign: "center" }}>
              <div><div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{events.length}</div><div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Toplam Etkinlik</div></div>
              <div><div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#22c55e" }}>{events.filter(e => e.date >= todayStr).length}</div><div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Yaklaşan</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && selectedDate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={() => setShowModal(false)}>
          <div style={{ background: "var(--surface)", borderRadius: "16px", padding: "2rem", width: "100%", maxWidth: "420px", boxShadow: "var(--shadow-lg)" }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "1.2rem" }}>Yeni Etkinlik</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addEvent()}
              placeholder="Etkinlik adı..." autoFocus
              style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "1rem", fontFamily: "inherit", marginBottom: "1rem", outline: "none", boxSizing: "border-box" }} />
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Renk</div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setNewColor(c)}
                    style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: c === newColor ? "3px solid var(--text-primary)" : "3px solid transparent", cursor: "pointer", transition: "transform 0.15s", transform: c === newColor ? "scale(1.15)" : "scale(1)" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1 }}>İptal</button>
              <button onClick={addEvent} className="btn-primary" style={{ flex: 1 }}>Ekle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
