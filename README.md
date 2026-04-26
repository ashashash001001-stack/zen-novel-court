# 小說閣 - 沉浸式中文網絡小說閱讀平台

<p align="center">
  <img src="https://img.shields.io/badge/Astro-6.1.5-blue?style=flat-square&logo=astro" alt="Astro">
  <img src="https://img.shields.io/badge/Node.js-22.12+-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License">
</p>

> 一個為中文網絡小說讀者設計的沉浸式閱讀網站應用，支援多種題材分類、流暢的閱讀體驗與現代化的移動端優先設計。

## 📚 項目簡介

小說閣是一款基於 [Astro](https://astro.build) 框架構建的靜態網站應用，專為中文網絡小說讀者提供沉浸式的在線閱讀體驗。項目採用現代化的移動端優先設計理念，支援多種小說分類、熱門排行與書架管理功能。

### 核心特性

- **多題材分類**：支援療癒、美食、都市、系統、成長等多種小說分類
- **響應式設計**：完美的移動端、平板與桌面端體驗
- **沉浸閱讀**：流暢的章節閱讀界面，模擬紙質閱讀感受
- **SEO 優化**：完整的元數據與結構化數據支持
- **PWA 支持**：可安裝為獨立 Web 應用
- **無障礙訪問**：完整的鍵盤導航與屏幕閱讀器支持

## 🛠️ 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| Astro | ^6.1.5 | 靜態網站框架 |
| TypeScript | ^5.9.3 | 類型安全 |
| Node.js | ≥22.12.0 | 運行環境 |
| Google Analytics 4 | - | 訪問分析 |

### 技術特點

- **零客戶端 JavaScript（默認）**：Astro 採用 Islands Architecture，按需加載交互組件
- **服務端渲染（SSR）適配**：支持動態內容與靜態生成混合模式
- **CSS 變量系統**：使用 CSS 自定義屬性實現主題一致性
- **文件路由**：基於文件系統的直觀路由結構

## 🚀 快速開始

### 環境要求

- Node.js 22.12.0 或更高版本
- npm、yarn 或 pnpm 包管理器

### 安裝步驟

```bash
# 克隆項目
git clone https://github.com/ashashash001001-stack/zen-novel-court.git
cd zen-novel-court

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### 開發命令

| 命令 | 說明 | 訪問地址 |
|------|------|----------|
| `npm run dev` | 啟動開發服務器 | http://localhost:4321 |
| `npm run build` | 構建生產版本 | 輸出至 `./dist` 目錄 |
| `npm run preview` | 預覽生產構建 | http://localhost:4321 |
| `npm run astro check` | 類型檢查 | - |

### 構建 output

```bash
# 構建生產版本
npm run build

# 預覽構建結果
npm run preview

# 或指定自定義環境變量
SITE_URL=https://your-domain.com BASE_PATH=/your-base-path npm run dev
```

## 📁 項目結構

```
zen-novel-court/
├── public/                     # 靜態公共資源
│   ├── favicon.ico             # 站點圖標
│   ├── favicon.svg             # SVG 格式圖標
│   ├── manifest.json           # PWA 清單文件
│   ├── robots.txt             # 搜索引擎 robots 文件
│   └── sitemap.xml          # 網站地圖
├── src/
│   ├── assets/               # 項目資源
│   │   ├── astro.svg         # Astro Logo
│   │   └── background.svg    # 背景圖案
│   ├── components/           # Astro 組件
│   │   └── GA4.astro         # Google Analytics 4
│   ├── config.ts            # 全局配置
│   ├── content/             # 小說內容（Markdown 文件）
│   │   ├── config.ts         # 內容集合配置
│   │   └── novels/          # 小說目錄
│   │       └── 一茶一禪-海鮮僧的靜心茶路/
│   │           ├── meta.json          # 小說元數據
│   │           └── chapters/          # 章節目錄
│   │               ├── 1.md
│   │               ├── 2.md
│   │               └── ...
│   ├── layouts/             # 頁面布局
│   │   ├── BaseLayout.astro  # 基礎布局（含導航）
│   │   └── ReaderLayout.astro  # 閱讀器布局
│   ├── pages/                # 頁面路由
│   │   ├── index.astro       # 首頁（小說閣）
│   │   ├── 404.astro        # 404 錯誤頁面
│   │   ├── library.astro     # 書閣頁面
│   │   ├── my.astro         # 用戶中心
│   │   ├── book/             # 小說章節頁面
│   │   │   └── [novel]/
│   │   │       ├── index.astro    # 小說詳情頁
│   │   │       └── [chapter].astro  # 章節閱讀頁
│   │   ├── category/         # 分類頁面
│   │   │   ├── growth/
│   │   │   ├── urban/
│   │   │   ├── food/
│   │   │   └── healing/
│   │   └── legal/           # 法律頁面
│   │       ├── terms/
│   │       └── privacy/
│   └── styles/
│       └── tokens.css       # CSS 設計令牌
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署工作流
├── astro.config.mjs         # Astro 配置
├── package.json             # 項目依賴
├── tsconfig.json            # TypeScript 配置
├── .gitignore              # Git 忽略規則
└── README.md               # 項目說明
```

### 路由結構

```
/                           → 首頁，精選推薦與分類瀏覽
/library                   → 書閣，全部小說列表
/my                        → 用戶中心
/book/[novel-slug]          → 小說詳情頁
/book/[novel-slug]/[chapter] → 章節閱讀頁
/category/[category-slug]  → 分類頁面
/legal/terms               → 服務條款
/legal/privacy             → 隱私政策
```

## ⚙️ 配置說明

### 環境變量

在 `.env` 文件中配置以下環境變量（本地開發用）：

```bash
# 站點 URL（生產環境）
SITE_URL=https://your-domain.com

# 基礎路徑（用於 GitHub Pages 等場景）
BASE_PATH=/your-base-path
```

### 環境變量配置詳解

| 變量 | 說明 | 範例 |
|------|------|------|
| `SITE_URL` | 站點完整 URL，用於 SEO、sitemap、canonical | `https://example.com` |
| `BASE_PATH` | 基礎路徑，用於 URL 構建和資源路徑 | `/my-repo` 或 `/` |

### 各平台 BASE_PATH 配置

| 部署平台 | BASE_PATH | 說明 |
|----------|------------|------|
| GitHub Pages | `/your-repo-name` | 例如 `/zen-novel-court` |
| Cloudflare Pages（自定義域名） | `/` | 根路徑，無需子目錄 |
| Vercel | `/` | 默認根路徑 |
| Netlify | `/` | 默認根路徑 |

### CI/CD 環境變量配置

**重要**：環境變量在**構建時**讀取，不是運行時。

```bash
# 本地構建時指定
BASE_PATH=/ SUB_PATH=/ npm run build

# GitHub Actions 中配置
- name: Build
  run: npm run build
  env:
    BASE_PATH: /
    SITE_URL: https://zen-novel-court.pages.dev

# Cloudflare Pages 設置
# 在 Cloudflare Dashboard → Pages → 項目設置 → 環境變量
```

### 構建時 vs 運行時

- Astro 的 `import.meta.env.BASE_URL` 在**構建時**就被嵌入到輸出的 HTML/JS 中
- 運行時修改環境變量不會生效，必須重新構建
- 客戶端重定向邏輯（如 `BaseLayout.astro`）使用 `document.body.dataset.basePath` 讀取 HTML 中的值

### 環境密鑰管理（重要！）

**環境密鑰 vs 公共環境變量：**
- `SITE_URL`、`BASE_PATH` 是**公共環境變量**，會被嵌入到前端代碼中
- 真正的密鑰（如 API 金鑰）**不應該**出現在前端代碼中！

**在 Astro 中的正確使用：**
```javascript
// ✅ 正確：公共配置（會被編譯進前端）
export const config = {
  base: process.env.BASE_PATH || '/zen-novel-court',
  site: process.env.SITE_URL || 'https://example.com'
}

// ✅ 正輯：服務器端密鑰（僅在 Astro API/routes 中可用）
// 在 src/pages/api/ 或 src/pages/[path].ts(x) 中：
const apiKey = process.env.MY_SECRET_KEY  // 不會泄漏給前端

// ❌ 錯誤：不要在組件中直接使用密鑰！
// 這會把密鑰嵌入到前端 JavaScript 中！
const apiKey = import.meta.env.MY_SECRET_KEY  // 永遠不要這樣做！
```

**不同平台的密鑰設置：**

| 平台 | 公共變量 | 密鑰設置位置 |
|------|----------|--------------|
| GitHub Actions | `env:` in workflow | Settings → Secrets and variables → Actions |
| Cloudflare Pages | 環境變量儀表板 | Settings → Environment Variables |
| Vercel | 環境變量設置 | Project Settings → Environment Variables |
| Netlify | 環境變量設置 | Site Settings → Build & Deploy → Environment |

**實踐經驗：**
1. **永遠不要**把 API 金鑰、密鑰放在 `SITE_URL`、`BASE_PATH` 或其他會被前端打包的變量中
2. 密鑰只能在**服務器端代碼**（Astro API routes, endpoint functions）中使用
3. 前端需要的配置（如站點 URL）應該是公共的、非敏感的信息
4. 如果不確定一個變量是否會被前端看到，假設它會被看到，除非你明確知道它只在服務器端運行

### 核心配置（config.ts）

```typescript
export const config = {
  base: '/zen-novel-court',    // 基礎路徑
  site: 'https://your-site.com'  // 站點 URL
} as const;
```

### Astro 配置（astro.config.mjs）

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ashashash001001-stack.github.io',
  base: process.env.BASE_PATH || '/zen-novel-court',
});
```

## 📖 添加新小說

### 步驟 1：創建小說目錄

在 `src/content/novels/` 目錄下创建新文件夾：

```text
src/content/novels/[小說標題]/
├── meta.json          # 小說元數據
└── chapters/          # 章節目錄
    ├── 1.md
    ├── 2.md
    └── ...
```

### 步驟 2：編寫元數據（meta.json）

```json
{
  "title": "小說標題",
  "author": "作者名",
  "genre": "題材標籤",
  "category": "分類 slug",
  "status": "連載中 | 已完結",
  "synopsis": "小說簡介"
}
```

### 步驟 3：寫入章節內容

章節文件使用 Markdown 格式，直接書寫章節標題與正文內容。

### 步驟 4：配置首頁顯示（可選）

首頁的精選推薦、熱門排行和最新更新可以通過 `meta.json` 中的欄位來控制：

```json
{
  "title": "小說標題",
  "featured": true,
  "featuredOrder": 1,
  "priority": 1,
  "updatedAt": "2026-04-26T00:00:00Z",
  "isHot": true,
  "isNew": true,
  "publishAt": "2024-01-01T00:00:00Z"
}
```

| 欄位 | 用途 | 說明 |
|------|------|------|
| `featured` | 精選推薦 | 設為 `true` 該小說會顯示在首頁的 FeaturedHero 區域 |
| `featuredOrder` | 精選順序 | 數字越小越前面（預留未來多個 featured 輪播） |
| `priority` | 熱門排行 | 數字越小越前面，控制熱門排行順序 |
| `updatedAt` | 最新更新 | ISO 8601 時間格式，最近更新的會排在前面 |
| `isHot` | 熱門標籤 | 設為 `true` 顯示熱門標籤（需組件支持） |
| `isNew` | 新品標籤 | 設為 `true` 顯示新品標籤（需組件支持） |
| `publishAt` | 發布時間 | 首次發布時間（預留未來使用） |

**排序邏輯：**
- **FeaturedHero**：優先顯示 `featured: true` 的小說，按 `featuredOrder` 排序；若無則 fallback 到第一本
- **熱門排行**：按 `priority` 升序排列（越小越前）
- **最新更新**：按 `updatedAt` 降序排列（最近的在前面）

**邊緣情況處理：**
- 若沒有任何小說設定 `featured: true`，會自動 fallback 到第一本小說
- 若沒有設定 `priority`，預設為 999（排最後）
- 若沒有設定 `updatedAt`，視為 0（最舊）

**範例配置：**

```json
// 精選小說（會顯示在 FeaturedHero）
{
  "title": "一茶一禪",
  "featured": true,
  "featuredOrder": 1,
  "priority": 1,
  "isHot": true,
  "updatedAt": "2026-04-26T00:00:00Z"
}

// 熱門但非精選
{
  "title": "萬界直播系統",
  "featured": false,
  "priority": 2,
  "isHot": true,
  "updatedAt": "2026-04-25T00:00:00Z"
}

// 新品
{
  "title": "佛系廚神",
  "featured": false,
  "priority": 3,
  "isNew": true,
  "updatedAt": "2026-04-20T00:00:00Z"
}
```

### 步驟 5：在首頁或書冊冊

小說會自動從 `src/content/novels/` 目錄讀取，無需手動在 `index.astro` 或 `library.astro` 中註冊。

## 🎨 自定義主題

### 修改顏色變量

編輯 `src/styles/tokens.css` 文件中的 CSS 變量：

```css
:root {
  /* 主色調 */
  --color-primary-100: #f5f2ed;
  --color-primary-300: #D8CFC4;
  --color-primary-500: #a39173;
  --color-primary-700: #6b5d4d;
  
  /* 強調色 */
  --color-accent: #a39173;
  --color-accent-light: #f5f2ed;
  
  /* 背景色 */
  --bg-outer: #faf9f7;
  --bg-inner: #ffffff;
  
  /* 文字色 */
  --text-dark: #1a1a1a;
  --text-muted: #6b6b6b;
}
```

### 修改字體

在 `src/layouts/BaseLayout.astro` 中修改 Google Fonts 引用：

```astro
<link 
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap" 
  rel="stylesheet"
>
```

### 修改布局寬度

```css
.content-wrapper {
  max-width: 1100px;  /* 修改此值 */
}
```

## 🔧 部署指南

### 當前部署

| 平台 | URL |
|------|-----|
| Cloudflare Pages | https://zen-novel-court.pages.dev/ |
| GitHub Pages | https://ashashash001001-stack.github.io/zen-novel-court/ |

### GitHub Pages（推薦）

項目已配置 GitHub Actions，Push 到 `main` 分支後自動部署。

1. Fork 此項目
2. 在 GitHub 倉庫設置中配置：
    - **Pages** → Build and deployment → Source: **GitHub Actions**
3. 設置環境變量（在 Settings → Secrets and variables → Actions ）:
    - `SITE_URL`: 你的 GitHub Pages URL
    - `BASE_PATH`: `/your-repo-name`

### Cloudflare Pages Secrets（備註）

若您仍選擇使用 GitHub Actions 進行自定義構建流程（雖然 Cloudflare Pages 有內建 Git 自動部署），請設置以下 Secrets：

Name: CLOUDFLARE_API_TOKEN
Value: (paste your Cloudflare API Token)
Click "Add secret"

Name: CLOUDFLARE_ACCOUNT_ID
Value: (paste your Cloudflare Account ID)
Click "Add secret"

### Vercel

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel

# 或生產部署
vercel --prod
```

### Netlify

1. 連接 GitHub 倉庫到 Netlify
2. 構建命令：`npm run build`
3. 發布目錄：`dist`
4. 環境變量：
   - `SITE_URL` = 你的站點 URL
   - `BASE_PATH` = /（或自定義路徑）

### 自定義服務器

```bash
# 構建
npm run build

# 輸出目錄位於 dist/
# 部署到任意靜態文件服務器（Nginx、Apache 等）
```

## 📱 PWA 配置

### 修改應用元數據

編輯 `public/manifest.json`：

```json
{
  "name": "小說閣",
  "short_name": "小說閣",
  "description": "沉浸式中文網絡小說閱讀平台",
  "start_url": "/zen-novel-court",
  "display": "standalone",
  "background_color": "#faf9f7",
  "theme_color": "#a39173",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

## 📊 Google Analytics 4

### 配置追蹤 ID

在 `src/layouts/BaseLayout.astro` 中修改：

```astro
const gaMeasurementId = 'G-XXXXXXXXXX';  // 替換為你的 GA4 Measurement ID
```

### 查看分析數據

1. 訪問 [Google Analytics](https://analytics.google.com)
2. 創建媒體資源
3. 獲取 Measurement ID
4. 替換代碼中的 ID

## 🔍 SEO 優化

### 現有 SEO 特性

- **Meta 標籤**：完整的 Open Graph、Twitter Cards 支援
- **結構化數據**：JSON-LD 類型的 SearchAction
- **robots.txt**：搜索引擎抓取規則
- **sitemap.xml**：自動生成網站地圖
- **canonical URL**：防止重複內容問題

### 驗證網站

在 Google Search Console 中驗證所有權：
- HTML 標籤驗證
- DNS TXT 記錄驗證
- Google Analytics 追蹤代碼驗證

## 🐛 常見問題

### Q: 開發服務器無法啟動？

確保 Node.js 版本 ≥ 22.12.0：
```bash
node --version
```

### Q: 頁面樣式異常？

清除瀏覽器緩存或使用無痕模式訪問。

### Q: 自定義字體不生效？

檢查 Google Fonts URL 是否正確，或考慮離線部署字體文件。

### Q: 部署後資源 404？

檢查 `BASE_PATH` 配置是否與實際部署路徑一致。

### Q: 如何添加新頁面？

在 `src/pages/` 目錄下創建新的 `.astro` 文件。

## 🔧 部署注意事項（經驗總結）

### BASE_PATH 與 trailingSlash 配置

- 當 `BASE_PATH=/` 時（Cloudflare Pages 根路徑部署），客戶端重定向邏輯需要特別處理
- 確保 `astro.config.mjs` 中 `trailingSlash: 'always'` 與部署環境一致
- 客戶端重定向時，應判斷 `basePath === '/'` 並跳過重定向，避免無限循環

### Content Collections 配置

- 使用 `type: 'content'` 時，`meta.json` 文件會作為獨立的 collection entry
- 獲取小說信息時需要過濾：`entries.filter(e => e.id.endsWith('/meta'))`
- 數據字段名稱：`totalChapters` 而非 `chapters`（chapters 是 Astro 自動生成的數組）

### 部署平台選擇

- **Cloudflare Pages**: 推薦使用其內建的 Git 自動部署功能（自動從 GitHub 拉取代碼構建），無需額外配置 GitHub Actions
- **GitHub Pages**: 使用 `.github/workflows/deploy.yml` 自動部署

### 常見問題排查

1. **頁面無限重新加載**: 檢查客戶端重定向邏輯，確認 `basePath !== '/'` 時才執行重定向
2. **資源 404**: 確認 `BASE_PATH` 與實際部署路徑一致
3. **鏈接缺少域名**: 避免 `basePath + path` 產生雙斜杠 `//`，如 `/` + `/book/...` → `//book/...`

### 最近的部署修復經驗

1. **GitHub Pages 圖片載入修復**（2026-04-27）：
   - 問題：圖片在 https://zen-novel-court.pages.dev/ 正常載入，但在 https://ashashash001001-stack.github.io/zen-novel-court/ 無法顯示
   - 原因：圖片路徑（如 `/content/novels/...`）和連結路徑（如 `/book/...`）為硬編碼，缺少 base path 前綴
   - 解決方案：
     - 修正 `src/config.ts` 中 `import.meta.env.BASE_PATH` → `import.meta.env.BASE_URL`（Astro 正確的環境變量）
     - 所有頁面和組件中的靜態路徑改用 `config.path()` 動態生成
     - 客戶端 JavaScript 使用 `window.__configBase__`（由 BaseLayout 注入）動態處理路徑
   - 受影響文件：`src/config.ts`, `src/pages/index.astro`, `src/pages/library.astro`, `src/pages/category/[category].astro`, `src/pages/book/[novel]/index.astro`, `src/components/FeaturedHero.astro`, `src/components/BentoGrid.astro`, `src/components/ContinueReading.astro`, `src/layouts/BaseLayout.astro`, `src/layouts/ReaderLayout.astro`, `src/pages/404.astro`

2. **雙斜線URL問題修復**（2026-04-22）：
   - 當 `BASE_PATH=/` 時（Cloudflare Pages根路徑部署），客戶端重定向邏輯會產生協議相對URL（如 `//book/...`）
   - 解決方案：在運行時檢測 `basePath`，當其為 `'/'` 時將其設置為空字符串 `''`
   - 受影響文件：`src/pages/my.astro` 和 `src/pages/book/[novel]/[chapter].astro`
   - 同時將模板鏈接替換為 `config.path()` 以確保構建時路徑解析的一致性

2. **BASE_PATH後備值修復**（2026-04-21）：
   - GitHub Actions 會設置 `BASE_PATH=/zen-novel-court`，但 Cloudflare Pages 不會設置此變量
   - 原後備值 `'/zen-novel-court'` 導致 Cloudflare Pages 部署時路徑錯誤
   - 解決方案：將 `config.ts` 和 `my.astro` 中的後備值從 `'/zen-novel-court'` 更改為 `'/'`
   - 這使得在未設置 `BASE_PATH` 時默認為根路徑，符合 Cloudflare Pages 的預期行為

3. **硬編碼路徑修復**（2026-04-21）：
   - 在 `library.astro` 中使用硬編碼的 `/book/` 路徑未考慮 `BASE_PATH` 變量
   - 這導致在 GitHub Pages 部署時（其中 `basePath=/zen-novel-court`）出現 404 錯誤
   - 解決方案：引入 `config` 模組並使用 `config.path('/book/' + novel.slug)` 來確保路徑正確解析
   - 受影響文件：`src/pages/library.astro`

## 🤝 貢獻指南

歡迎提交 Issue 與 Pull Request！

1. Fork 項目
2. 創建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add your feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 創建 Pull Request

## 📄 許可證

MIT License - 查看 [LICENSE](LICENSE) 文件了解更多。

## 🙏 致謝

- [Astro](https://astro.build) - 出色的靜態網站框架
- [Noto Serif TC](https://fonts.google.com/noto-serif/tc) - 優美的中文襯線字體
- 所有開源库的作者與貢獻者

## 📞 聯繫

- 問題反饋：https://github.com/ashashash001001-stack/zen-novel-court/issues
- 功能請求：https://github.com/ashashash001001-stack/zen-novel-court/issues

---

<p align="center"> Made with ❤️ by <a href="https://github.com/ashashash001001-stack">ashashash001001</a></p>