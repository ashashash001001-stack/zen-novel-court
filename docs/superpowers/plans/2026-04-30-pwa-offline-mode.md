# Plan: PWA & Offline Mode

## 任務
Implement Performance - PWA & Offline Mode

## 功能需求
- Service Worker for offline reading
- Cache chapter content for offline access
- PWA manifest for installability
- Offline indicator UI

## 實作要點
- Service Worker with cache-first strategy for chapters
- PWA manifest updates
- Offline detection and UI feedback

## 驗收標準
- [ ] PWA installable on mobile
- [ ] Can read cached chapters offline
- [ ] Offline indicator shows when disconnected

## 預期時間
15 分鐘（PDCA 循環）

---

## Step 1: Update PWA Manifest
File: `public/manifest.json`
Add: display: standalone, orientation: portrait

## Step 2: Create Service Worker
File: `src/pages/sw.js`
- Cache chapter content
- Handle offline requests
- Clean old caches (keep last 10 chapters per book)

## Step 3: Register Service Worker
Add script tag in ReaderLayout.astro

## Step 4: Add Offline Indicator
Add toast/banner when offline