"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEY = "kalkula_notes_v2";
const generateId = () => `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export default function Notepad() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: Note[] = JSON.parse(raw);
      setNotes(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    } else {
      // Default first note
      const first: Note = { id: generateId(), title: "İlk Notum", content: "Merhaba! Kalkula Not Defterine hoş geldiniz.\n\nBuraya istediğiniz notları yazabilir, TXT veya Markdown olarak indirebilirsiniz.", createdAt: Date.now(), updatedAt: Date.now() };
      setNotes([first]);
      setActiveId(first.id);
    }
  }, []);

  const save = (updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const activeNote = notes.find(n => n.id === activeId) || null;

  const updateContent = (content: string) => {
    if (!activeId) return;
    const updated = notes.map(n => n.id === activeId ? { ...n, content, updatedAt: Date.now() } : n);
    save(updated);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setStatus("✓ Otomatik kaydedildi");
      setTimeout(() => setStatus(""), 2000);
    }, 600);
  };

  const updateTitle = (title: string) => {
    if (!activeId) return;
    const updated = notes.map(n => n.id === activeId ? { ...n, title, updatedAt: Date.now() } : n);
    save(updated);
  };

  const createNote = () => {
    const newNote: Note = { id: generateId(), title: "Yeni Not", content: "", createdAt: Date.now(), updatedAt: Date.now() };
    save([newNote, ...notes]);
    setActiveId(newNote.id);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const deleteNote = (id: string) => {
    if (!confirm("Bu notu silmek istediğinize emin misiniz?")) return;
    const updated = notes.filter(n => n.id !== id);
    save(updated);
    if (activeId === id) setActiveId(updated[0]?.id || null);
  };

  const downloadNote = (format: "txt" | "md") => {
    if (!activeNote) return;
    const content = format === "md"
      ? `# ${activeNote.title}\n\n${activeNote.content}`
      : activeNote.content;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.title.replace(/[^a-zA-Z0-9çğışöü ]/gi, "_")}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`✓ ${format.toUpperCase()} olarak indirildi`);
    setTimeout(() => setStatus(""), 3000);
  };

  const downloadAll = () => {
    const content = notes.map(n => `=== ${n.title} ===\n${n.content}`).join("\n\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kalkula_notlar.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const insertFormat = (prefix: string, suffix = "") => {
    const ta = textareaRef.current;
    if (!ta || !activeNote) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = activeNote.content.slice(start, end);
    const newContent = activeNote.content.slice(0, start) + prefix + selected + suffix + activeNote.content.slice(end);
    updateContent(newContent);
    setTimeout(() => {
      ta.setSelectionRange(start + prefix.length, end + prefix.length);
      ta.focus();
    }, 0);
  };

  const wordCount = activeNote?.content.trim().split(/\s+/).filter(Boolean).length || 0;
  const charCount = activeNote?.content.length || 0;

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQ.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
        <Link href="/" className="btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>← Geri</Link>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 700, flex: 1 }}>Not Defteri</h1>
        <span style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{status}</span>

        {/* Format Toolbar */}
        {activeNote && (
          <div style={{ display: "flex", gap: "0.25rem", borderLeft: "1px solid var(--border)", paddingLeft: "1rem" }}>
            {[
              { label: "B", action: () => insertFormat("**", "**"), title: "Kalın" },
              { label: "I", action: () => insertFormat("_", "_"), title: "İtalik" },
              { label: "H1", action: () => insertFormat("# "), title: "Başlık 1" },
              { label: "H2", action: () => insertFormat("## "), title: "Başlık 2" },
              { label: "—", action: () => insertFormat("\n- "), title: "Madde" },
              { label: "[ ]", action: () => insertFormat("\n- [ ] "), title: "Görev" },
            ].map(b => (
              <button key={b.label} onClick={b.action} title={b.title}
                style={{ width: "32px", height: "32px", background: "none", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-glow)"; e.currentTarget.style.color = "var(--accent-primary)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                {b.label}
              </button>
            ))}
          </div>
        )}

        {/* Download buttons */}
        {activeNote && (
          <div style={{ display: "flex", gap: "0.5rem", borderLeft: "1px solid var(--border)", paddingLeft: "1rem" }}>
            <button onClick={() => downloadNote("txt")} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }} title="TXT olarak indir">
              ↓ TXT
            </button>
            <button onClick={() => downloadNote("md")} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }} title="Markdown olarak indir">
              ↓ MD
            </button>
            <button onClick={downloadAll} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }} title="Tüm notları indir">
              ↓ Tümü
            </button>
          </div>
        )}

        <button onClick={() => setSidebarOpen(s => !s)} className="btn-secondary" style={{ fontSize: "0.8rem" }}>
          ☰ Notlar
        </button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ width: "260px", flexShrink: 0, borderRight: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Sidebar header */}
            <div style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)" }}>
              <input type="text" placeholder="Not ara..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                style={{ width: "100%", padding: "0.5rem 0.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)", fontSize: "0.85rem", fontFamily: "inherit" }} />
            </div>
            <div style={{ padding: "0.5rem", borderBottom: "1px solid var(--border)" }}>
              <button onClick={createNote} className="btn-primary" style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}>
                + Yeni Not
              </button>
            </div>
            {/* Note list */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {filteredNotes.map(n => (
                <div key={n.id} onClick={() => setActiveId(n.id)}
                  style={{ padding: "0.75rem 1rem", cursor: "pointer", borderBottom: "1px solid var(--border)", background: n.id === activeId ? "var(--accent-glow)" : "transparent", borderLeft: n.id === activeId ? "3px solid var(--accent-primary)" : "3px solid transparent", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontWeight: n.id === activeId ? 700 : 500, fontSize: "0.9rem", color: n.id === activeId ? "var(--accent-primary)" : "var(--text-primary)", flex: 1 }}>
                      {n.title || "Adsız Not"}
                    </span>
                    <button onClick={e => { e.stopPropagation(); deleteNote(n.id); }}
                      style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", padding: "0 0 0 0.5rem", lineHeight: 1 }}>
                      ✕
                    </button>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.2rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {n.content.slice(0, 50) || "Boş not"}
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginTop: "0.2rem" }}>
                    {new Date(n.updatedAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              ))}
              {filteredNotes.length === 0 && (
                <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>Sonuç bulunamadı.</p>
              )}
            </div>
          </div>
        )}

        {/* Editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {activeNote ? (
            <>
              {/* Title input */}
              <input type="text" value={activeNote.title} onChange={e => updateTitle(e.target.value)}
                style={{ padding: "1rem 1.5rem", background: "transparent", border: "none", borderBottom: "1px solid var(--border)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", outline: "none", fontFamily: "inherit", width: "100%" }}
                placeholder="Not başlığı..." />
              {/* Textarea */}
              <textarea ref={textareaRef} value={activeNote.content} onChange={e => updateContent(e.target.value)}
                style={{ flex: 1, padding: "1.25rem 1.5rem", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: "1rem", lineHeight: 1.8, color: "var(--text-primary)", fontFamily: "inherit", width: "100%" }}
                placeholder="Yazmaya başlayın..." spellCheck={false} />
              {/* Bottom status bar */}
              <div style={{ padding: "0.4rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "1.5rem", fontSize: "0.75rem", color: "var(--text-muted)", background: "var(--bg-secondary)" }}>
                <span>{wordCount} kelime</span>
                <span>{charCount} karakter</span>
                <span>Son güncelleme: {new Date(activeNote.updatedAt).toLocaleString("tr-TR")}</span>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Seçili not yok</p>
                <button onClick={createNote} className="btn-primary">+ Yeni Not Oluştur</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
