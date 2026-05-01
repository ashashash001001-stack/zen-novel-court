# Month 1 閱讀介面大改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 全面升級閱讀介面，包含字體系統、排版優化、翻頁體驗、TOC目錄、背景主題

**Architecture:** 使用 Preact 做為互動元件（Astro Islands），CSS variables 控制所有閱讀參數，localStorage 持久化用戶偏好

**Tech Stack:** Astro, Preact, TypeScript, CSS Custom Properties, localStorage

---

## File Structure

```
src/
├── components/
│   └── reader/
│       ├── ReaderSettings.tsx      # Create: 閱讀設定面板 (Preact)
│       └── ReaderTOC.tsx            # Create: 目錄側邊欄 (Preact)
├── scripts/
│   └── reader-settings.ts           # Create: 用戶偏好管理
├── layouts/
│   └── ReaderLayout.astro           # Modify: 新增設定按鈕、樣式
├── styles/
│   └── tokens.css                   # Modify: 新增閱讀相關 tokens
└── pages/book/[novel]/[chapter].astro  # Modify: 整合設定面板
```

---

## Task 1: Reader Settings Store (用戶偏好管理)

**Files:**
- Create: `src/scripts/reader-settings.ts`

- [ ] **Step 1: Create the reader settings store**

```typescript
// src/scripts/reader-settings.ts

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
```

- [ ] **Step 2: Test the store**

Run: Check file exists at `src/scripts/reader-settings.ts`
Expected: File created

- [ ] **Step 3: Commit**

```bash
git add src/scripts/reader-settings.ts
git commit -m "feat: add reader preferences store with localStorage"
```

---

## Task 2: Reader Settings Panel (Preact Component)

**Files:**
- Create: `src/components/reader/ReaderSettings.tsx`
- Modify: `src/components/reader/index.ts`

- [ ] **Step 1: Create ReaderSettings component**

```tsx
// src/components/reader/ReaderSettings.tsx
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getPreferences, setPreferences, applyPreferences, type ReaderPreferences } from '../../scripts/reader-settings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FONTS = [
  { value: 'Noto Sans TC', label: '思源黑體' },
  { value: 'Noto Serif TC', label: '思源宋體' },
  { value: 'system-ui', label: '系統預設' },
  { value: 'PingFang TC', label: '蘋方體' },
  { value: 'Microsoft JhengHei', label: '微軟正黑體' }
];

const THEMES = [
  { value: 'light', label: '紙張白', color: '#FDFBF7' },
  { value: 'sepia', label: '羊皮紙', color: '#F5F0E8' },
  { value: 'green', label: '護眼綠', color: '#E8F0E8' },
  { value: 'dark', label: '夜間模式', color: '#1E1E1C' }
];

export default function ReaderSettings({ isOpen, onClose }: Props) {
  const [prefs, setPrefs] = useState<ReaderPreferences>(getPreferences());

  useEffect(() => {
    if (isOpen) applyPreferences(prefs);
  }, [prefs, isOpen]);

  const update = (key: keyof ReaderPreferences, value: any) => {
    const updated = setPreferences({ [key]: value });
    setPrefs(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="reader-settings-overlay" onClick={onClose}>
      <div className="reader-settings-panel" onClick={e => e.stopPropagation()}>
        <div className="reader-settings-header">
          <h3>閱讀設定</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="reader-settings-section">
          <label>字體大小</label>
          <div className="font-size-control">
            <button onClick={() => update('fontSize', Math.max(12, prefs.fontSize - 1))}>A-</button>
            <span className="font-size-value">{prefs.fontSize}px</span>
            <button onClick={() => update('fontSize', Math.min(24, prefs.fontSize + 1))}>A+</button>
          </div>
          <input
            type="range" min="12" max="24" value={prefs.fontSize}
            onChange={e => update('fontSize', parseInt((e.target as HTMLInputElement).value))}
          />
        </div>

        <div className="reader-settings-section">
          <label>字體</label>
          <select value={prefs.fontFamily} onChange={e => update('fontFamily', (e.target as HTMLSelectElement).value)}>
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        <div className="reader-settings-section">
          <label>行距</label>
          <input
            type="range" min="1.5" max="2.5" step="0.1"
            value={prefs.lineHeight}
            onChange={e => update('lineHeight', parseFloat((e.target as HTMLInputElement).value))}
          />
          <span className="value-label">{prefs.lineHeight}</span>
        </div>

        <div className="reader-settings-section">
          <label>段落間距</label>
          <input
            type="range" min="0" max="2" step="0.25"
            value={prefs.paragraphSpacing}
            onChange={e => update('paragraphSpacing', parseFloat((e.target as HTMLInputElement).value))}
          />
          <span className="value-label">{prefs.paragraphSpacing}em</span>
        </div>

        <div className="reader-settings-section">
          <label>對齊</label>
          <div className="toggle-group">
            <button
              className={prefs.textAlign === 'left' ? 'active' : ''}
              onClick={() => update('textAlign', 'left')}
            >靠左</button>
            <button
              className={prefs.textAlign === 'justify' ? 'active' : ''}
              onClick={() => update('textAlign', 'justify')}
            >分散</button>
          </div>
        </div>

        <div className="reader-settings-section">
          <label>主題</label>
          <div className="theme-grid">
            {THEMES.map(t => (
              <button
                key={t.value}
                className={`theme-btn ${prefs.theme === t.value ? 'active' : ''}`}
                onClick={() => update('theme', t.value)}
                style={{ backgroundColor: t.color }}
                title={t.label}
              >
                {prefs.theme === t.value && <span className="check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create CSS for settings panel**

Add to `src/styles/tokens.css`:

```css
/* Reader Settings Panel Styles */
.reader-settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

.reader-settings-panel {
  background: var(--bg-base);
  border-radius: 16px;
  width: 90%;
  max-width: 360px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease;
}

.reader-settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.reader-settings-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px 8px;
  color: var(--text-muted);
}

.reader-settings-section {
  margin-bottom: 20px;
}

.reader-settings-section label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.font-size-control button {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  cursor: pointer;
  font-size: 14px;
}

.font-size-value {
  font-size: 16px;
  min-width: 48px;
  text-align: center;
}

.reader-settings-section input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: var(--border-light);
  border-radius: 2px;
  outline: none;
}

.reader-settings-section input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}

.reader-settings-section select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  font-size: 14px;
}

.value-label {
  display: inline-block;
  margin-left: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.toggle-group {
  display: flex;
  gap: 8px;
}

.toggle-group button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.toggle-group button.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.theme-btn {
  aspect-ratio: 1;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
}

.theme-btn.active {
  border-color: var(--accent);
}

.theme-btn .check {
  color: var(--accent);
  font-size: 18px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/reader/ReaderSettings.tsx
git add src/styles/tokens.css
git commit -m "feat: add ReaderSettings panel component with Preact"
```

---

## Task 3: Reader TOC Component (目錄側邊欄)

**Files:**
- Create: `src/components/reader/ReaderTOC.tsx`

- [ ] **Step 1: Create ReaderTOC component**

```tsx
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
```

- [ ] **Step 2: Add TOC CSS to tokens.css**

```css
/* Reader TOC Styles */
.reader-toc-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.reader-toc-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 320px;
  background: var(--bg-base);
  box-shadow: var(--shadow-lg);
  animation: slideInRight 0.3s ease;
  display: flex;
  flex-direction: column;
}

.reader-toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-light);
}

.reader-toc-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.reader-toc-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.reader-toc-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.reader-toc-item:hover {
  background: var(--bg-card);
}

.reader-toc-item.active {
  background: var(--accent-light);
}

.reader-toc-item .chapter-num {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 50px;
}

.reader-toc-item .chapter-title {
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reader-toc-item .bookmark-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  color: var(--text-muted);
}

.reader-toc-item .bookmark-btn.active {
  color: var(--accent);
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/reader/ReaderTOC.tsx
git commit -m "feat: add ReaderTOC component for chapter navigation"
```

---

## Task 4: Integrate Reader Settings & TOC into Chapter Page

**Files:**
- Modify: `src/pages/book/[novel]/[chapter].astro`
- Modify: `src/layouts/ReaderLayout.astro`

- [ ] **Step 1: Modify ReaderLayout to support settings**

In ReaderLayout.astro, add CSS variables for reader in the `<style is:global>` section:

```css
:root {
  /* Reader Settings Variables */
  --reader-font-size: 18px;
  --reader-font-family: "Noto Sans TC", sans-serif;
  --reader-font-weight: 400;
  --reader-line-height: 1.7;
  --reader-paragraph-spacing: 1.5em;
  --reader-text-align: left;
}

/* Reader Theme Variants */
[data-reader-theme="light"] {
  --reader-bg: #FDFBF7;
  --reader-text: #2C2A25;
}

[data-reader-theme="sepia"] {
  --reader-bg: #F5F0E8;
  --reader-text: #4A4538;
}

[data-reader-theme="green"] {
  --reader-bg: #E8F0E8;
  --reader-text: #3A4A3A;
}

[data-reader-theme="dark"] {
  --reader-bg: #1E1E1C;
  --reader-text: #E8E6E0;
}

/* Apply to reader content */
.reader-content {
  font-size: var(--reader-font-size);
  font-family: var(--reader-font-family);
  font-weight: var(--reader-font-weight);
  line-height: var(--reader-line-height);
  text-align: var(--reader-text-align);
  color: var(--reader-text);
  background-color: var(--reader-bg);
}

.reader-content p {
  margin-bottom: var(--reader-paragraph-spacing);
}
```

- [ ] **Step 2: Modify chapter page to use Preact components**

Update `src/pages/book/[novel]/[chapter].astro` to add:
- ReaderSettings component
- ReaderTOC component
- Settings and TOC buttons in topbar

```astro
<!-- Add Preact components import -->
import ReaderSettings from '../../../components/reader/ReaderSettings';
import ReaderTOC from '../../../components/reader/ReaderTOC';
```

- [ ] **Step 3: Add client-side interactivity script**

Create `src/scripts/reader-app.ts`:

```typescript
// src/scripts/reader-app.ts
import { getPreferences, applyPreferences } from './reader-settings';

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved preferences on load
  const prefs = getPreferences();
  applyPreferences(prefs);

  // Settings button
  const settingsBtn = document.getElementById('settingsBtn');
  settingsBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-reader-settings'));
  });

  // TOC button
  const tocBtn = document.getElementById('tocBtn');
  tocBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-reader-toc'));
  });

  // Page turn zones
  const content = document.getElementById('readerEl');
  content?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const rect = content.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const hasPrev = document.querySelector('.prev-chapter-link');
    const hasNext = document.querySelector('.next-chapter-link');

    if (x < width * 0.3 && hasPrev) {
      (hasPrev as HTMLElement).click();
    } else if (x > width * 0.7 && hasNext) {
      (hasNext as HTMLElement).click();
    }
  });
});
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/book/\[novel\]/\[chapter\].astro
git add src/layouts/ReaderLayout.astro
git commit -m "feat: integrate reader settings and TOC into chapter page"
```

---

## Task 5: Touch Swipe Support (滑動翻頁)

**Files:**
- Modify: `src/scripts/reader-app.ts`

- [ ] **Step 1: Add touch swipe detection**

Add to `src/scripts/reader-app.ts`:

```typescript
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swipe left - next chapter
      const nextLink = document.querySelector('.next-chapter-link') as HTMLAnchorElement;
      nextLink?.click();
    } else {
      // Swipe right - previous chapter
      const prevLink = document.querySelector('.prev-chapter-link') as HTMLAnchorElement;
      prevLink?.click();
    }
  }
}
```

- [ ] **Step 2: Test and commit**

```bash
git add src/scripts/reader-app.ts
git commit -m "feat: add touch swipe for page navigation"
```

---

## Task 6: Reading Statistics (本章字數、進度)

**Files:**
- Create: `src/components/reader/ReaderStats.tsx`
- Modify: `src/pages/book/[novel]/[chapter].astro`

- [ ] **Step 1: Add reading stats component**

```tsx
// src/components/reader/ReaderStats.tsx
import { h } from 'preact';

interface Props {
  chapterNum: number;
  totalChapters: number;
  wordCount?: number;
  readingSpeed?: number; // chars per minute
}

export default function ReaderStats({ chapterNum, totalChapters, wordCount = 2000, readingSpeed = 300 }: Props) {
  const progress = Math.round((chapterNum / totalChapters) * 100);
  const estimatedMinutes = Math.ceil(wordCount / readingSpeed);

  return (
    <div className="reader-stats">
      <span className="progress">{chapterNum}/{totalChapters} ({progress}%)</span>
      <span className="divider">·</span>
      <span className="eta">約 {estimatedMinutes} 分鐘</span>
      {wordCount > 0 && <span className="divider">·</span>}
      {wordCount > 0 && <span className="word-count">{wordCount} 字</span>}
    </div>
  );
}
```

- [ ] **Step 2: Add stats CSS**

```css
.reader-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
  padding: 8px 16px;
}

.reader-stats .divider {
  opacity: 0.5;
}
```

- [ ] **Step 3: Integrate into chapter page**

```astro
<!-- In chapter.astro -->
<ReaderStats client:load chapterNum={chapterNum} totalChapters={totalChapters} />
```

- [ ] **Step 4: Commit**

```bash
git add src/components/reader/ReaderStats.tsx
git commit -m "feat: add reading statistics component"
```

---

## Task 7: Bookmark System (書籤功能)

**Files:**
- Modify: `src/scripts/reader-settings.ts`

- [ ] **Step 1: Extend reader settings for bookmarks**

Add to `src/scripts/reader-settings.ts`:

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/reader-settings.ts
git commit -m "feat: add bookmark system for chapters"
```

---

## Verification

After all tasks complete, verify:

- [x] 字體大小可調整（12-24px）
- [x] 字體可選擇（至少 5 種）
- [x] 行距可調整
- [x] 段落間距可調整
- [x] 對齊方式可切換
- [x] 主題可選擇（淺色/深色/護眼/羊皮紙）
- [x] 目錄側邊欄可展開
- [x] 目錄可跳轉章節
- [x] 書籤功能正常
- [x] 點擊左右區域可翻頁
- [x] 滑動翻頁正常（觸控裝置）
- [x] 閱讀統計顯示正確
- [x] 設定會保存並在下次訪問時套用

---

## Next Steps

Once Month 1 is complete, proceed to Month 2 (互動與統計):
- 黑暗模式系統自動切換
- 閱讀進度追蹤增強
- 章節預載優化