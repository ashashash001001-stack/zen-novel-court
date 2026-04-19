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
│   │   ├── Breadcrumb.astro  # 麵包屑導航
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
│   │   ├── Layout.astro      # 通用布局
│   │   ├── NovelLayout.astro  # 小說閱讀布局
│   │   └── ReaderLayout.astro  # 閱讀器布局
│   ├── pages/                # 頁面路由
│   │   ├── index.astro       # 首頁（小說閣）
│   │   ├── 404.astro        # 404 錯誤頁面
│   │   ├── library.astro     # 書閣頁面
│   │   ├── shelf.astro       # 書架頁面
│   │   ├── search.astro      # 搜索頁面
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
/shelf                     → 書架，我的收藏
/search                   → 搜索頁面
/my                        → 用戶中心
/book/[novel-slug]          → 小說詳情頁
/book/[novel-slug]/[chapter] → 章節閱讀頁
/category/[category-slug]  → 分類頁面
/legal/terms               → 服務條款
/legal/privacy             → 隱私政策
```

## ⚙️ 配置說明

### 環境變量

在 `.env` 文件中配置以下環境變量：

```bash
# 站點 URL（生產環境）
SITE_URL=https://your-domain.com

# 基礎路徑（用於 GitHub Pages 等場景）
BASE_PATH=/your-base-path
```

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

### 步驟 4：在首頁或書閣註冊

在 `src/pages/index.astro` 或 `src/pages/library.astro` 的小說數據中添加條目。

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

### GitHub Pages（推薦）

項目已配置 GitHub Actions，Push 到 `main` 分支後自動部署。

1. Fork 此項目
2. 在 GitHub 倉庫設置中配置：
   - **Pages** → Build and deployment → Source: **GitHub Actions**
3. 設置環境變量（在 Settings → Secrets and variables → Actions）：
   - `SITE_URL`: 你的 GitHub Pages URL
   - `BASE_PATH`: `/your-repo-name`

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