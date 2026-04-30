# Plan: Accessibility Enhancement

## 任務
Implement Accessibility improvements

## 功能需求
- Full keyboard navigation
- ARIA labels on interactive elements
- Skip-to-content link
- High contrast theme option

## 驗收標準
- [ ] Tab navigation works on all controls
- [ ] Screen reader can navigate reader
- [ ] High contrast mode available
- [ ] Focus indicators visible

## 預期時間
15 分鐘（PDCA 循環）

---

## Step 1: Add Skip Link
In BaseLayout.astro and ReaderLayout.astro

## Step 2: Add ARIA Labels
- All buttons in reader bottom bar
- All sheet overlays
- Navigation elements

## Step 3: Keyboard Navigation
Add key handlers for:
- Escape: close sheets
- Arrow keys: navigate chapters
- Tab: focus management

## Step 4: High Contrast Theme
Add theme option in existing settings sheet