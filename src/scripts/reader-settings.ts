// src/scripts/reader-settings.ts
// Reader preferences management with localStorage persistence

export interface ReaderPreferences {
  fontSize: number;        // 12-24, default: 18
  fontFamily: string;      // default: 'Noto Sans TC'
  fontWeight: number;      // 300-700, default: 400
  lineHeight: number;      // 1.5-2.5, default: 1.7
  paragraphSpacing: number;// 0-2em, default: 1.5em
  textAlign: 'left' | 'justify'; // default: 'left'
  theme: 'light' | 'dark' | 'sepia' | 'green'; // default: 'light'
}

const DEFAULT_PREFERENCES: ReaderPreferences = {
  fontSize: 18,
  fontFamily: 'Noto Sans TC',
  fontWeight: 400,
  lineHeight: 1.7,
  paragraphSpacing: 1.5,
  textAlign: 'left',
  theme: 'light'
};

const STORAGE_KEY = 'zen-novel-reader-prefs';

export function getPreferences(): ReaderPreferences {
  if (typeof localStorage === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function setPreferences(prefs: Partial<ReaderPreferences>): ReaderPreferences {
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function applyPreferences(prefs: ReaderPreferences): void {
  const root = document.documentElement;
  root.style.setProperty('--reader-font-size', `${prefs.fontSize}px`);
  root.style.setProperty('--reader-font-family', `"${prefs.fontFamily}", sans-serif`);
  root.style.setProperty('--reader-font-weight', String(prefs.fontWeight));
  root.style.setProperty('--reader-line-height', String(prefs.lineHeight));
  root.style.setProperty('--reader-paragraph-spacing', `${prefs.paragraphSpacing}em`);
  root.style.setProperty('--reader-text-align', prefs.textAlign);
  root.setAttribute('data-reader-theme', prefs.theme);
}

// Bookmark functions
const BOOKMARKS_KEY = 'zen-novel-bookmarks';

export interface Bookmarks {
  [bookId: string]: number[]; // array of chapter IDs
}

export function getBookmarks(bookId: string): number[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const all = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '{}');
    return all[bookId] || [];
  } catch {
    return [];
  }
}

export function toggleBookmark(bookId: string, chapterId: number): number[] {
  const bookmarks = getBookmarks(bookId);
  const index = bookmarks.indexOf(chapterId);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(chapterId);
  }
  if (typeof localStorage !== 'undefined') {
    const all = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '{}');
    all[bookId] = bookmarks;
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(all));
  }
  return bookmarks;
}