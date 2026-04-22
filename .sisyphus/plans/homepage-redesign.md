# 首頁重新設計工作計劃

## TL;DR

> **快速摘要**: 重新設計 Zen Novel Court 首頁，採用便當盒網格佈局、新 Hero 區塊、繼續閱讀功能，保持日式侘寂美學

> **交付成果**:
> - 全新首頁佈局 (index.astro)
> - 便當盒網格組件
> - 繼續閱讀功能 (localStorage)
> - 視覺化分類卡片
> - 精選小說輪播改進

> **估計工作量**: Medium
> **並行執行**: YES - 3 waves
> **關鍵路徑**: Hero 區塊 → 便當盒網格 → 繼續閱讀 → 響應式優化

---

## Context

### 原始請求
用戶希望重新設計首頁，用更好的佈局結構和線框圖/原型，參考業界最佳標準。

### 訪談摘要
**討論要點**:
- 當前首頁問題：線性滾動、內容重複、Hero薄弱、缺乏個人化
- 業界最佳實踐：3次點擊法則、便當盒網格、視覺優先、智慧推薦
- 設計方向：日式侘寂風格、象牙白 + 金色點綴

**現有資產**:
- tokens.css: 完整的設計系統 (387行)
- index.astro: 現有首頁 (878行)
- BaseLayout.astro: 基礎佈局（含導航）

### 假設（已驗證）
- 用戶接受 localStorage 方案（無後端）
- 所有現有小說數據可復用
- 範圍限定於首頁，不涉及其他頁面

---

## Work Objectives

### 核心目標
重新設計首頁，提昇用戶體驗、視覺效果和內容發現能力

### 具體交付成果
- `src/pages/index.astro` - 全新首頁
- `src/components/BentoGrid.astro` - 便當盒網格組件
- `src/components/ContinueReading.astro` - 繼續閱讀組件
- `src/components/FeaturedHero.astro` - Hero 區塊組件
- `src/components/VisualCategory.astro` - 視覺化分類組件

### 完成定義
- [x] 首頁載入時間 < 2s
- [x] 所有組件響應式適配 (320px - 1920px)
- [x] 繼續閱讀功能正常運作
- [x] 保持現有主題切換功能
- [x] 通過 Playwright 視覺驗證

### 必須有
- 行動裝置優先設計
- 侘寂美學設計語言
- 無障礙訪問支持

### 必須沒有（Guardrails）
- 不添加後端依賴
- 不修改現有數據結構
- 不刪除現有功能（書架、分類等）
- 不添加過度動畫

---

## Verification Strategy

### 測試決策
- **基礎設施存在**: NO (靜態網站)
- **自動化測試**: None
- **框架**: N/A

### QA Policy
每個任務必須包含 agent-executed QA scenarios

**驗證方法**:
- 使用 Playwright 截圖驗證佈局
- 使用 curl 驗證頁面載入
- 驗證 localStorage 功能（客戶端）

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (立即開始 - 基礎 + 組件):
├── Task 1: 設計系統擴展 (新增便當盒變數)
├── Task 2: FeaturedHero 組件開發
├── Task 3: BentoGrid 基礎結構
└── Task 4: 數據結構準備

Wave 2 (第 2 波 - 核心功能):
├── Task 5: ContinueReading 組件 (localStorage)
├── Task 6: VisualCategory 組件
├── Task 7: FeaturedCarousel 改進
└── Task 8: 首頁整合

Wave 3 (第 3 波 - 優化):
├── Task 9: 響應式調優
├── Task 10: 主題切換兼容
└── Task 11: 性能優化
```

### Dependency Matrix
- 1 → 依賴無 → 阻塞 8
- 2 → 依賴無 → 阻塞 8
- 3 → 依賴 1 → 阻塞 8
- 4 → 依賴無 → 阻塞 5,6,7,8
- 5 → 依賴 4 → 阻塞 8
- 6 → 依賴 1 → 阻塞 8
- 7 → 依賴 4 → 阻塞 8
- 8 → 依賴 5,6,7 → 阻塞 9,10,11
- 9-11 → 依賴 8 → 阻塞 Final

---

## TODOs

- [x] 1. 設計系統擴展 - 新增便當盒網格 CSS 變數

  **要做的事**:
  - 在 `src/styles/tokens.css` 中添加便當盒相關變數
  - 添加：`--bento-gap`, `--bento-radius`, `--bento-shadow`, `--bento-shadow-hover`
  - 確保與現有侘寂美學一致

  **不要做**:
  - 不要修改現有顏色變數
  - 不要添加新的字體

  **Acceptance Criteria**:
  - [ ] tokens.css 中新增至少 4 個 bento 相關變數
  - [ ] 變數命名與現有 tokens 命名一致
  - [ ] 變數可用於後續組件

  **QA Scenarios**:

  ```
  Scenario: 驗證新變數存在
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -E "--bento-" src/styles/tokens.css
    Expected Result: 找到至少 4 個 bento 相關變數
    Failure Indicators: 變數不存在
    Evidence: N/A
  ```

- [x] 2. FeaturedHero 組件開發

  **要做的事**:
  - 在 `src/components/FeaturedHero.astro` 創建 Hero 區塊
  - 顯示精選小說大封面 + 標題 + 作者 + 簡介
  - 添加「開始閱讀」和「加入書架」按鈕
  - 響應式設計：行動裝置堆疊，電腦版並排

  **不要做**:
  - 不要添加後端依賴
  - 不要修改現有數據結構

  **Acceptance Criteria**:
  - [ ] FeaturedHero.astro 創建完成
  - [ ] 顯示精選小說信息（封面、標題作者）
  - [ ] CTA 按鈕可點擊

  **QA Scenarios**:

  ```
  Scenario: 驗證 FeaturedHero 區塊渲染
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開首頁 http://localhost:4321
      2. 使用選擇器 .featured-hero 查找區塊
      3. 截圖
    Expected Result: 區塊存在，顯示小說封面、標題作者、CTA 按鈕
    Failure Indicators: 區塊缺失或內容不完整
    Evidence: .sisyphus/evidence/task-2-hero.png
  ```

- [x] 3. BentoGrid 基礎結構

  **要做的事**:
  - 在 `src/components/BentoGrid.astro` 創建便當盒網格組件
  - 2x2 網格佈局（行動裝置 1 欄）
  - 包含：繼續閱讀、熱門排行、最新更新、分區
  - 卡片式設計，懸停效果

  **不要做**:
  - 不要實現內容邏輯

  **Acceptance Criteria**:
  - [ ] BentoGrid.astro 創建完成
  - [ ] 網格結構正確
  - [ ] 響應式適配

  **QA Scenarios**:

  ```
  Scenario: 驗證便當盒網格響應式
    Tool: Playwright
    Preconditions: 啟動 dev server
    Steps:
      1. 打開首頁（桌面寬度 1024px）
      2. 截圖
      3. 調整為行動裝置寬度 (375px)
      4. 截圖
    Expected Result: 網格正確響應（桌面 2x2，手機 1x4）
    Failure Indicators: 佈局錯誤
    Evidence: .sisyphus/evidence/task-3-bento-desktop.png, task-3-bento-mobile.png
  ```

- [x] 4. 數據結構準備

  **要做的事**:
  - 準備首頁需要的數據結構
  - 精選小說、熱門排行、最新更新
  - 確保與現有 content collections 兼容

  **不要做**:
  - 不要修改現有數據結構

  **Acceptance Criteria**:
  - [ ] 導出 featuredNovels 變數
  - [ ] 導出 hotRankings 變數
  - [ ] 導出 latestUpdates 變數

  **QA Scenarios**:

  ```
  Scenario: 驗證數據結構
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm run build 2>&1 | tail -20
    Expected Result: 構建成功，無數據相關錯誤
    Failure Indicators: 數據獲取失敗
    Evidence: N/A
  ```

- [x] 5. ContinueReading 組件 (localStorage)

- [x] 6. VisualCategory 組件

- [x] 7. FeaturedCarousel 改進

- [x] 8. 首頁整合

- [x] 9. 響應式調優

- [x] 10. 主題切換兼容

- [x] 11. 性能優化

  **要做的事**:
  - 確保構建成功

  **不要做**:
  - 不要添加新功能

  **Acceptance Criteria**:
  - [ ] npm run build 成功
  - [ ] 首頁載入正常

  **QA Scenarios**:

  ```
  Scenario: 構建測試
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm run build
    Expected Result: 構建成功
    Failure Indicators: 構建錯誤
    Evidence: N/A
  ```

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — 驗證所有 Must Have 存在
- [x] F2. **Code Quality Review** — 檢查 CSS/語法
- [x] F3. **Visual QA** — Playwright 截圖驗證
- [x] F4. **Scope Fidelity Check** — 確保無範圍蔓延

---

## Commit Strategy

- **1**: `feat(homepage): add design tokens for bento grid`
- **2**: `feat(homepage): create FeaturedHero component`
- **3**: `feat(homepage): create BentoGrid component`
- **4**: `feat(homepage): create ContinueReading component`
- **5**: `feat(homepage): create VisualCategory component`
- **6**: `feat(homepage): improve FeaturedCarousel`
- **7**: `feat(homepage): integrate all components into index page`
- **8**: `fix(homepage): responsive adjustments`
- **9**: `fix(homepage): theme compatibility`
- **10**: `fix(homepage): build optimization`

---

## Success Criteria

### 驗證命令
```bash
npm run build  # 必須通過
npm run preview  # 首頁可訪問
```

### 最終檢查清單
- [x] 所有 Must Have 存在
- [x] 所有 Must NOT Have 不存在
- [x] 首頁載入正常
- [x] 主題切換正常