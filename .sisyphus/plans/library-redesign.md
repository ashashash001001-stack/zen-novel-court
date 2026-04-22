# 書閣頁面重新設計工作計劃

## TL;DR

> **快速摘要**: 重新設計書閣頁面，與首頁保持一致的便當盒佈局和侘寂美學

> **交付成果**:
> - 視覺化分類頂部導航
> - 便當盒書籍網格展示
> - 統一卡片樣式
> - 搜尋/過濾功能保持

> **估計工作量**: Short
> **並行執行**: YES - 2 waves
> **關鍵路徑**: 分類整合 → 卡片樣式 → 網格優化

---

## Context

### 原始請求
用戶希望書閣頁面與首頁保持一致的重新設計風格，更容易找到想要的小說。

### 訪談摘要
**討論要點**:
- 首頁已採用便當盒佈局
- VisualCategory 組件效果良好
- 書閣需要更統一的視覺語言
- 分類導航應在 fold 內

### 現有資產
- library.astro: 現有書閣頁面 (540行)
- VisualCategory.astro: 首頁視覺化分類組件
- BentoGrid.astro: 首頁便當盒組件
- tokens.css: 設計系統 (含 bento 變數)

### 假設
- 書閣功能保持不變（客戶端過濾）
- 所有現有小說數據可復用
- 搜尋功能保持不變

---

## Work Objectives

### 核心目標
重新設計書閣頁面，與首頁保持一致的視覺語言，讓用戶更容易找到小說

### 具體交付成果
- 視覺化分類頂部導航（使用 VisualCategory）
- 統一書籍卡片樣式（使用首頁樣式）
- 便當盒網格展示
- 現有搜尋/過濾功能

### 必須有
- 行動裝置優先設計
- 侘寂美學設計語言
- 無障礙訪問支持

### 必須沒有（Guardrails）
- 不添加後端依賴
- 不改變現有搜尋/過濾邏輯
- 不刪除現有功能

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (基礎):
├── Task 1: 整合 VisualCategory 到頂部
└── Task 2: 統一書籍卡片樣式

Wave 2 (優化):
├── Task 3: 便當盒網格展示
└── Task 4: 搜尋/過濾優化
```

---

## TODOs

- [x] 1. 整合 VisualCategory 組件到頂部

  **要做的事**:
  - 在 library.astro 中引入 VisualCategory 組件
  - 放置在搜尋框下方
  - 確保分類連結正確 (/category/healing 等)

  **不要做**:
  - 不要刪除現有搜尋框
  - 不要改變過濾邏輯

  **Acceptance Criteria**:
  - [ ] VisualCategory 正確引入
  - [ ] 6 個分類顯示
  - [ ] 連結跳轉正確

  **QA Scenarios**:

  ```
  Scenario: 驗證分類顯示
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /library
      2. 找到 .visual-categories 區塊
      3. 截圖
    Expected Result: 6 個分類卡片顯示
    Failure Indicators: 分類缺失
    Evidence: .sisyphus/evidence/task-1-cats.png

  Scenario: 驗證分類跳轉
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /library
      2. 點擊「療癒」分類
    Expected Result: 跳轉到 /category/healing
    Failure Indicators: 連結錯誤
    Evidence: .sisyphus/evidence/task-1跳转.png
  ```

- [x] 2. 統一書籍卡片樣式

- [x] 3. 便當盒網格展示

- [x] 4. 搜尋/過濾功能保持

  **要做的事**:
  - 保持現有客戶端搜尋
  - 保持現有分類過濾
  - 確保 URL 參數正確

  **不要做**:
  - 不要改變搜尋邏輯
  - 不要改變過濾邏輯

  **Acceptance Criteria**:
  - [ ] 搜尋功能正常
  - [ ] 分類過濾正常
  - [ ] URL 參數正確

  **QA Scenarios**:

  ```
  Scenario: 驗證搜尋功能
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /library
      2. 在搜尋框輸入「維港」
      3. 點擊搜尋
    Expected Result: 只顯示相關小說
    Failure Indicators: 搜尋結果錯誤
    Evidence: .sisyphus/evidence/task-4-search.png

  Scenario: 驗證分類過濾
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開 /library
      2. 點擊「美食」分類
    Expected Result: 只顯示美食類小說
    Failure Indicators: 過濾失敗
    Evidence: .sisyphus/evidence/task-4-filter.png
  ```

---

## Final Verification Wave

- [x] F1. **Visual Consistency** — 與首頁一致
- [x] F2. **Functionality** — 搜尋/過濾正常
- [x] F3. **Build** — npm run build 成功
- [x] F4. **Scope Check** — 無範圍蔓延

---

## Commit Strategy

- **1**: `feat(library): integrate VisualCategory component`
- **2**: `feat(library): unify card styles with homepage`
- **3**: `feat(library): add bento grid layout`
- **4**: `fix(library): preserve search and filter functionality`

---

## Success Criteria

```bash
npm run build  # 必須通過
npm run preview  # 書閣可訪問
```

### 最終檢查清單
- [x] 與首頁視覺一致
- [x] 所有功能正常
- [x] 響應式正常
- [x] 構建成功