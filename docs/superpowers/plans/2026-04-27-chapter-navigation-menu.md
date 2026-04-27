# 章節頁導航選單實現計劃

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目標：** 在章節閱讀頁新增「更多」按鈕，點擊後彈出導航選單，包含首頁、書庫、我的頁面、書籍詳情頁四個選項。

**架構：** 在現有的章節頁組件中新增一個工具按鈑和對應的下拉面板，使用現有的 sheet 系統（`.sheet-overlay`、`.sheet-content`）來實現彈出效果。

**技術堆疊：** Astro, Vanilla JavaScript, CSS

---

## 檔案結構

**修改檔案：**
- `src/pages/book/[novel]/[chapter].astro` - 在現有章節頁中添加新按鈑和面板

---

## 任務分解

### 任務 1：在底部工具列新增「更多」按鈑

**檔案：** `src/pages/book/[novel]/[chapter].astro`（在 `.reader-bottombar-tools` 區塊）

- [ ] **步驟 1：找到工具列程式碼位置**

在 `<footer class="reader-bottombar">` 中的 `.reader-bottombar-tools` 區塊，應該看到類似這樣的結構：
```html
<div class="reader-bottombar-tools">
  <button class="tool-btn btn-press" id="toolBtnToc" aria-label="目錄">...</button>
  <button class="tool-btn btn-press" id="toolBtnSettings" aria-label="設定">...</button>
  <button class="tool-btn btn-press" id="toolBtnTts" aria-label="朗讀">...</button>
</div>
```

- [ ] **步驟 2：在設定和朗讀按鈑之間新增「更多」按鈑**

在 `toolBtnSettings` 之後、`toolBtnTts` 之前新增：
```html
<button class="tool-btn btn-press" id="toolBtnMore" aria-label="更多">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
  <span>更多</span>
</button>
```

- [ ] **步驟 3：在 JS 中新增按鈑事件監聽**

在 `<script>` 區塊中，在 `toolBtnSettings` 和 `toolBtnTts` 事件監聽之後，新增：
```javascript
const toolBtnMore = document.getElementById('toolBtnMore');
toolBtnMore?.addEventListener('click', () => (window as any).openSheet('moreSheet'));
```

- [ ] **步驟 4：新增桌面版樣式**

在現有 CSS 中 `.tool-btn` 已有響應式樣式（`@media (min-width: 768px)`），所以手機版只顯示圖標，桌面版顯示圖標+文字會自動生效。

- [ ] **步驟 5：提交**
```bash
git add src/pages/book/[novel]/[chapter].astro
git commit -m "feat: add more button in bottom toolbar"
```

---

### 任務 2：新增導航選單面板

**檔案：** `src/pages/book/[novel]/[chapter].astro`（在 `ttsSheet` 之後）

- [ ] **步驟 1：在現有 sheet 之後新增 moreSheet**

在 `ttsSheet` 的 `</div>` 關閉標籤之前新增：
```html
<!-- More Navigation Sheet -->
<div class="sheet-overlay" id="moreSheet">
  <div class="sheet-content" onclick="event.stopPropagation()">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <h3>導航</h3>
      <button class="btn-press sheet-close" onclick="closeSheet('moreSheet')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="sheet-body">
      <a href={config.path('/')} class="nav-item btn-press">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>首頁</span>
      </a>
      <a href={config.path('/library')} class="nav-item btn-press">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <span>書庫</span>
      </a>
      <a href={config.path('/my')} class="nav-item btn-press">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>我的</span>
      </a>
      <a href={config.path('/book/' + novel.slug)} class="nav-item btn-press">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <line x1="12" y1="6" x2="12" y2="12"/>
        </svg>
        <span>書籍詳情頁</span>
      </a>
    </div>
  </div>
</div>
```

- [ ] **步驟 2：新增 nav-item 樣式**

在 CSS 區塊中，在 `.toc-item` 樣式之後新增：
```css
/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-2);
  border-bottom: 1px solid var(--color-border-light);
  text-decoration: none;
  color: var(--text-dark);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--t-fast);
}

.nav-item:active {
  transform: translate(2px, 2px);
}

.nav-item svg {
  color: var(--text-muted);
  flex-shrink: 0;
}
```

- [ ] **步驟 3：提交**
```bash
git add src/pages/book/[novel]/[chapter].astro
git commit -m "feat: add more navigation sheet with 4 options"
```

---

### 任務 3：驗證功能

**測試方式：** 啟動開發伺服器並在瀏覽器中測試

- [ ] **步驟 1：啟動開發伺服器**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court
pnpm dev
```

- [ ] **步驟 2：驗收標準檢查**

1. ✅ 訪問章節頁 `/book/一茶一禪-海鮮僧的靜心茶路/1`
2. ✅ 確認底部工具列顯示「更多」圖標按鈑（手機版）
3. ✅ 確認桌面版顯示「更多」文字+圖標
4. ✅ 點擊「更多」彈出下拉面板
5. ✅ 面板包含四個選項：首頁、書庫、我的、書籍詳情頁
6. ✅ 點擊選項可正確跳轉到對應頁面
7. ✅ 點擊遮罩層可關閉面板
8. ✅ 樣式與現有設計風格一致

- [ ] **步驟 3：提交最終變更**
```bash
git add .
git commit -m "feat: complete chapter page navigation menu"
```

---

## 完成確認

所有任務完成後，確認以下驗收標準：

| 標準 | 狀態 |
|------|------|
| 手機版底部工具列顯示「更多」圖標按鈑 | ⬜ |
| 桌面版顯示「更多」文字+圖標 | ⬜ |
| 點擊「更多」彈出下拉面板 | ⬜ |
| 下拉面板包含四個選項 | ⬜ |
| 點擊選項可正確跳轉 | ⬜ |
| 點擊遮罩層可關閉面板 | ⬜ |
| 樣式與現有設計一致 | ⬜ |

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-27-chapter-navigation-menu.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**