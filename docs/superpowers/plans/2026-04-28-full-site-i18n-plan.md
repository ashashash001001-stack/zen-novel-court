# 全站繁簡轉換功能實作計劃

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目標：** 實現全站繁體/簡體中文自動檢測與轉換功能，預設繁體，用戶瀏覽器為簡體中文時顯示簡體

**架構：** 使用 OpenCC.js 在客戶端進行即時語言檢測與轉換。所有頁面以繁體中文建構，客戶端根據瀏覽器語言設定動態轉換顯示。

**技術棧：** OpenCC.js (opencc-js)

---

## 檔案結構

```
src/
├── layouts/
│   ├── BaseLayout.astro        # 修改：加入語言檢測與轉換
│   └── ReaderLayout.astro       # 修改：加入語言檢測與轉換
├── scripts/
│   └── i18n.ts                 # 新建：語言檢測與轉換邏輯
└── pages/
    └── (所有頁面已由 layout 涵蓋)

public/
└── (OpenCC CDN 加載，無需本地檔案)
```

---

## 任務分解

### 任務 1：建立 i18n 工具腳本

**檔案：**
- 建立：`src/scripts/i18n.ts`

**步驟：**
1. 建立 src/scripts/i18n.ts 檔案，包含 detectLanguage() 和 initLanguage() 函數
2. 使用 opencc-js 進行即時轉換

---

### 任務 2：安裝 OpenCC 依賴

**檔案：**
- 修改：`package.json`

**步驟：**
1. 執行 `pnpm add opencc-js`
2. 提交 package.json 和 pnpm-lock.yaml

---

### 任務 3：修改 BaseLayout

**檔案：**
- 修改：`src/layouts/BaseLayout.astro`

**步驟：**
1. 在 head 中加入 i18n 初始化腳本
2. 添加防止閃爍的 CSS
3. 更新預設標題為繁體

---

### 任務 4：修改 ReaderLayout

**檔案：**
- 修改：`src/layouts/ReaderLayout.astro`

**步驟：**
1. 在 head 中加入相同的 i18n 初始化腳本
2. 添加防止閃爍的 CSS

---

### 任務 5：測試與驗證

**驗證方法：**
1. 本地開發伺服器測試
2. 測試不同瀏覽器語言設定
3. 驗證 SEO meta tag

---

## 驗證清單

- [ ] 打開網站，預設顯示繁體中文
- [ ] 將瀏覽器語言改為「簡體中文」後重新整理，顯示簡體
- [ ] 將瀏覽器語言改為「English」後重新整理，顯示繁體
- [ ] 小說內容也正確轉換
- [ ] 開發伺服器無錯誤
- [ ] Production build 成功