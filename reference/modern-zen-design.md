# Modern Zen UI 設計規範

> 源自 `src/style-prototype-modern-zen.html`
> 應用於首頁及全站

---

## 1. 色彩系統：暖白象牙調

```css
:root {
  /* 背景 - 暖白象牙 */
  --bg-outer: #FDFBF7;
  --bg-base: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-reading: #FDFBF7;

  /* 玻璃效果 */
  --glass-bg: rgba(253, 251, 247, 0.65);

  /* 強調色 - 暖金駝色 */
  --accent: #Cfb997;
  --accent-dark: #a39171;
  --accent-light: #dcd3c1;

  /* 文字 - 柔和深灰 */
  --text-main: #2C2A25;
  --text-dark: #2C2A25;
  --text-muted: #8C867B;

  /* 邊框 */
  --border-subtle: rgba(163, 145, 113, 0.12);
  --border-highlight: rgba(255, 255, 255, 0.6);

  /* 繼承 */
  --color-primary: #Cfb997;
  --color-bg: var(--bg-outer);
  --color-surface: var(--bg-base);
}
```

---

## 2. 質感系統：三重柔光陰影

```css
:root {
  /* 浮動陰影 */
  --shadow-float:
    0 8px 30px -12px rgba(163, 145, 113, 0.15),
    0 4px 12px -4px rgba(163, 145, 113, 0.10),
    0 1px 2px 0 rgba(163, 145, 113, 0.05);

  /* Hover 陰影 */
  --shadow-hover:
    0 12px 40px -12px rgba(163, 145, 113, 0.20),
    0 6px 16px -4px rgba(163, 145, 113, 0.15),
    0 2px 4px 0 rgba(163, 145, 113, 0.08);

  /* 現有陰影替換 */
  --shadow-sm: var(--shadow-float);
  --shadow-md: var(--shadow-hover);
}
```

---

## 3. 動效系統：iOS 彈性曲線

```css
:root {
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.2, 0.8, 0.2, 1);

  --t-fast: 0.25s;
  --t-slow: 0.6s;

  /* 圓角 */
  --radius-lg: 24px;
  --radius-sm: 12px;
}
```

---

## 4. 首頁佈局改動

### 4.1 Header（新增毛玻璃）

```html
<header class="modern-header">
  <div class="logo">DeathNote</div>
  <div class="user-avatar"></div>
</header>
```

```css
.modern-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 20px;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background: var(--glass-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px -4px rgba(163, 145, 113, 0.08);
}
```

### 4.2 Hero Card

- 背景：白色卡片 + 三重陰影 + 頂部高光邊框
- 標籤：線性漸變強調色 `#Cfb997` → `#a39171`
- 按鈕：黑色背景 → hover 變白色
- 動效：hover translateY(-4px) scale(1.01)
- 動效：active scale(0.96)

### 4.3 分類區塊（Bento Grid）

- 2 欄網格佈局
- 間距：16px
- 寬項目：grid-column: span 2
- hover：translateY(-4px) scale(1.02)
- 內含陰影 + 高光邊框

### 4.4 排行列表（Modern List）

- 圓角：12px（不是 14px）
- hover：translateX(4px) + 邊框變色
- 間距：12px
- 按鈕：背景色而非透明

---

## 5. 紙張質感（可選）

```css
body {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E");
  background-attachment: fixed;
}
```

> 建議：先不加，等確認基本效果後再加

---

## 6. 動畫系統

### 漸顯動畫

```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp var(--t-slow) var(--ease-smooth) forwards;
}

.hero-card { animation-delay: 0.1s; }
.section-title:nth-of-type(1) { animation-delay: 0.2s; }
.bento-grid { animation-delay: 0.25s; }
.section-title:nth-of-type(2) { animation-delay: 0.35s; }
.modern-list { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 7. 元件樣式對照

| 元件 | 目前 | Modern Zen |
|------|------|----------|
| Header | 固定 | sticky + glass |
| Hero | 棕色按鈕 | 黑色按鈕 |
| 分類 | grid 4欄 | bento 2欄 |
| 列表 | 14px圓角 | 12px圓角 |
| 動效 | translateY | scale + elastic |
| 陰影 | 單層 | 三重 |
| 字體 | #000000 | #2C2A25 |

---

## 8. 實施範圍

- [x] `src/styles.css` - Design Tokens
- [x] Header 元件
- [x] Hero Card
- [x] 分類 Bento Grid
- [x] 排行列表
- [ ] 首頁 HTML 結構（若需要）
- [ ] 重新生成全站 HTML

---

## 9. 預覽確認

完成後請確認：
1. 色彩是否滿意（暖白象牙 + 暖金）
2. 陰影效果（三重柔光）
3. 動效感覺（iOS 彈性）
4. 首頁佈局（Bento Grid）
5. 動畫效果（漸顯）

---

> 設計完成，請確認後開始實施