// src/components/reader/ReaderTOC.tsx
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

interface Chapter {
  id: number;
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentChapter: number;
  onNavigate: (chapterId: number) => void;
  bookmarks: number[];
  onToggleBookmark: (chapterId: number) => void;
}

export default function ReaderTOC({
  isOpen,
  onClose,
  chapters,
  currentChapter,
  onNavigate,
  bookmarks,
  onToggleBookmark
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="reader-toc-overlay" onClick={onClose}>
      <aside className="reader-toc-panel" onClick={e => e.stopPropagation()}>
        <div className="reader-toc-header">
          <h3>目錄</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <nav className="reader-toc-list">
          {chapters.map(ch => (
            <div
              key={ch.id}
              className={`reader-toc-item ${currentChapter === ch.id ? 'active' : ''}`}
              onClick={() => onNavigate(ch.id)}
            >
              <span className="chapter-num">第 {ch.id} 章</span>
              <span className="chapter-title">{ch.title}</span>
              <button
                className={`bookmark-btn ${bookmarks.includes(ch.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(ch.id);
                }}
              >
                {bookmarks.includes(ch.id) ? '★' : '☆'}
              </button>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}