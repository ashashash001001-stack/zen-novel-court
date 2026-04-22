# 用戶中心與分類頁面重新設計工作計劃

## TL;DR

> **快速摘要**: 重新設計用戶中心(my)與分類頁面，與首頁/書閣保持一致的便當盒佈局和侘寂美學

> **交付成果**:
> - my 頁面：便當盒佈局 + 統一卡片樣式
> - 分類頁面：便當盒網格 + 視覺化分類

> **估計工作量**: Medium
> **並行執行**: YES - 2 pages, parallel tasks
> **關鍵路徑**: my 頁面 → 分類頁面

---

## Context

### 原始請求
用戶希望 my 頁面和分類頁面與首頁/書閣保持一致的重新設計風格。

### 現有頁面結構
- **my.astro**: 用戶中心 (901行) - 個人資料、收藏、閱讀記錄、設定
- **category/[category].astro**: 分類頁面 (67行) - 分類名稱 +書籍網格

### 現有資產
- 首頁：FeaturedHero, BentoGrid, VisualCategory
- 書閣：便當盒卡片樣式
- tokens.css：bento 變數

---

## Work Objectives

### 核心目標
重新設計 my 和分類頁面，與首頁/書閣保持一致的視覺語言

### 具體交付成果

#### my 頁面
- 便當盒佈局展示各區塊
- 統一書籍卡片樣式
- 保持現有功能（localStorage）

#### 分類頁面
- 便當盒書籍網格
- 視覺化分類導航
- 與書閣一致的卡片樣式

### 必須有
- 行動裝置優先設計
- 侘寂美學設計語言

### 必須沒有（Guardrails）
- 不改變現有功能邏輯
- 不添加後端依賴

---

## Execution Strategy

```
Wave 1: my 頁面
├── Task 1: my 頁面 - 便當盒佈局
└── Task 2: my 頁面 - 統一卡片樣式

Wave 2: 分類頁面
├── Task 3: 分類頁面 - 便當盒網格
└── Task 4: 分類頁面 - 視覺化分類
```

---

## TODOs

- [x] 1. my 頁面 - 便當盒佈局

  **要做的事**:
  - 使用便當盒網格佈局區塊
  - Profile/收藏/記錄/設定分區
  - 使用 --bento-gap, --bento-radius

  **不要做**:
  - 不要改變 localStorage 邏輯

  **Acceptance Criteria**:
  - [x] 便當盒網格結構
  - [x] 4 個主要區塊顯示

  **QA Scenarios**:

  ```
  Scenario: 驗證 my 頁面佈局
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /my
      2. 截圖
    Expected Result: 便當盒佈局正確
    Failure Indicators: 佈局錯誤
    Evidence: .sisyphus/evidence/task-1-my.png
  ```

- [x] 2. my 頁面 - 統一卡片樣式

  **要做的事**:
  - 收藏/記錄卡片使用 bento 樣式
  - 與書閣卡片一致

  **不要做**:
  - 不要改變功能

  **Acceptance Criteria**:
  - [x] 卡片樣式與書閣一致
  - [x] hover 效果存在

  **QA Scenarios**:

  ```
  Scenario: 驗證卡片樣式
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /my
      2. 找到收藏卡片
      3. 截圖
    Expected Result: 卡片樣式與書閣一致
    Failure Indicators: 樣式差異
    Evidence: .sisyphus/evidence/task-2-my-card.png
  ```

- [x] 3. 分類頁面 - 便當盒網格

  **要做的事**:
  - 使用便當盒網格替換現有 grid
  - 使用 bento 變數
  - 響應式 (320px - 1920px)

  **不要做**:
  - 不要改變書籍數據邏輯

  **Acceptance Criteria**:
  - [x] 使用 --bento-gap
  - [x] 響應式正常
  - [x] 與書閣一致

  **QA Scenarios**:

  ```
  Scenario: 驗證分類頁面網格
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /category/healing
      2. 截圖
    Expected Result: 便當盒網格正確
    Failure Indicators: 佈局錯誤
    Evidence: .sisyphus/evidence/task-3-cat-grid.png
  ```

- [x] 4. 分類頁面 - 視覺化分類

  **要做的事**:
  - 添加 VisualCategory 組件到頂部
  - 讓用戶容易切換分類

  **不要做**:
  - 不要改變現有過濾邏輯

  **Acceptance Criteria**:
  - [x] VisualCategory 顯示
  - [x] 連結正確

  **QA Scenarios**:

  ```
  Scenario: 驗證分類導航
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /category/healing
      2. 點擊「美食」分類
    Expected Result: 跳轉到 /category/food
    Failure Indicators: 連結錯誤
    Evidence: .sisyphus/evidence/task-4-cat-nav.png
  ```

---

## Final Verification Wave

- [x] F1. **my 頁面** — 便當盒佈局 + 卡片樣式
- [x] F2. **分類頁面** — 便當盒網格 + 分類導航
- [x] F3. **Build** — npm run build 成功
- [x] F4. **Consistency** — 與首頁/書閣一致

---

## Commit Strategy

- **1**: `feat(my): add bento grid layout and unify card styles`
- **2**: `feat(category): add bento grid and VisualCategory navigation`

---

## Success Criteria

```bash
npm run build  # 必須通過
```

### 最終檢查清單
- [x] my 頁面視覺一致
- [x] 分類頁面視覺一致
- [x] 構建成功