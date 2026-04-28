# 分类合并实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 genre + category 合并为 categories 数组，直接使用中文分类名称，支援多分类

**Architecture:** 修改 schema 为 categories 数组，更新分类配置为中文 key，更新所有页面筛选逻辑

**Tech Stack:** Astro, TypeScript, JSON

---

## 文件结构

```
src/
├── config/
│   └── categories.ts        ← 修改：中文 key (疗愈, 美食, 都市, 系统, 成长, 其他)
├── content.config.ts        ← 修改：schema categories 数组
├── content/novels/         ← 修改：所有 novel JSON 迁移数据
│   ├── *.json
│   └── */meta.json
├── components/
│   └── VisualCategory.astro← 修改：使用中文 slug
├── pages/
│   ├── category/
│   │   └── [category].astro← 修改：多分类筛选
│   ├── library.astro        ← 修改：多分类筛选
│   └── 404.astro           ← 修改：中文 slug
```

---

## 迁移映射

| 旧 category (英文) | 新 categories (中文) |
|-------------------|---------------------|
| healing | 疗愈 |
| food | 美食 |
| urban | 都市 |
| system | 系统 |
| growth | 成长 |
| other | 其他 |

---

## Task 1: 更新分类配置为中文

**Files:**
- Modify: `src/config/categories.ts:12-43`

- [ ] **Step 1: 读取当前文件**

```bash
cat src/config/categories.ts
```

- [ ] **Step 2: 修改 categoryConfig 为中文 key**

将 `categoryConfig` 的 key 从英文改为中文：

```typescript
export const categoryConfig: Record<string, CategoryConfig> = {
  疗愈: {
    name: '疗愈',
    icon: '🌿',
    color: 'linear-gradient(135deg, #7d9a7d 0%, #5a7a5a 100%)'
  },
  美食: {
    name: '美食',
    icon: '🍜',
    color: 'linear-gradient(135deg, #b8a86b 0%, #8a7a4b 100%)'
  },
  都市: {
    name: '都市',
    icon: '🏙️',
    color: 'linear-gradient(135deg, #6b7a8f 0%, #4b5a6f 100%)'
  },
  系统: {
    name: '系统',
    icon: '⚡',
    color: 'linear-gradient(135deg, #8b7dab 0%, #6b5d8b 100%)'
  },
  成长: {
    name: '成长',
    icon: '📈',
    color: 'linear-gradient(135deg, #b08b8b 0%, #8a6b6b 100%)'
  },
  其他: {
    name: '其他',
    icon: '📚',
    color: 'linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%)'
  }
};
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/config/categories.ts
git commit -m "refactor: change category keys to Chinese"
```

---

## Task 2: 更新 content schema

**Files:**
- Modify: `src/content.config.ts:1-32`

- [ ] **Step 1: 读取当前文件**

```bash
cat src/content.config.ts
```

- [ ] **Step 2: 修改 schema**

将第 11-13 行：
```typescript
genre: z.string(),
totalChapters: z.number(),
category: z.string().optional(),
```

修改为：
```typescript
categories: z.array(z.string()).optional(),
totalChapters: z.number(),
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功（或因数据未迁移而警告）

- [ ] **Step 4: 提交**

```bash
git add src/content.config.ts
git commit -m "refactor: change schema to categories array"
```

---

## Task 3: 迁移 novel 数据

**Files:**
- Modify: `src/content/novels/*.json` 和 `src/content/novels/*/meta.json`

需要迁移的 5 本小说（8 个文件）：
- 一茶一禪-海鮮僧的靜心茶路.json + meta.json
- 万界直播系统.json + meta.json
- 佛系廚神.json + meta.json
- 維港深淵的引擎聲/meta.json
- 萬象骨扇/meta.json

- [ ] **Step 1: 迁移 一茶一禪-海鮮僧的靜心茶路.json**

原数据：
```json
"genre": "都市/禪意/美食",
"category": "healing"
```

改为：
```json
"categories": ["疗愈", "美食"]
```

使用 Edit 工具修改文件，删除 genre 行，将 category 改为 categories 数组。

- [ ] **Step 2: 继续迁移其他文件**

按照同样的模式迁移：
- 一茶一禪-海鮮僧的靜心茶路/meta.json
- 万界直播系统.json → categories: ["系统"]
- 万界直播系统/meta.json → categories: ["系统"]
- 佛系廚神.json → categories: ["美食", "成长"]
- 佛系廚神/meta.json → categories: ["美食", "成长"]
- 維港深淵的引擎聲/meta.json → categories: ["都市"]
- 萬象骨扇/meta.json → categories: ["其他"]

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功，无错误

- [ ] **Step 4: 提交**

```bash
git add src/content/novels/
git commit -m "refactor: migrate all novels to categories array"
```

---

## Task 4: 更新 VisualCategory.astro

**Files:**
- Modify: `src/components/VisualCategory.astro:1-20`

- [ ] **Step 1: 读取当前文件**

```bash
cat src/components/VisualCategory.astro
```

- [ ] **Step 2: 修改 slug 使用中文**

当前使用 `cat.slug`，需要确保 URL 使用中文 slug：
- 疗愈 → /category/疗愈
- 美食 → /category/美食
- 等等

保持现有逻辑，因为 categoryConfig 的 key 已经是中文。

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/components/VisualCategory.astro
git commit -m "refactor: VisualCategory uses Chinese category slugs"
```

---

## Task 5: 更新 [category].astro 动态页面

**Files:**
- Modify: `src/pages/category/[category].astro:10-50`

- [ ] **Step 1: 读取当前文件**

```bash
cat src/pages/category/[category].astro | head -50
```

- [ ] **Step 2: 修改筛选逻辑为多分类**

将第 39 行：
```typescript
}).filter(n => n.category === category);
```

修改为：
```typescript
}).filter(n => n.categories && n.categories.includes(category));
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功，分类页面使用中文 slug

- [ ] **Step 4: 检查生成页面**

```bash
ls dist/category/
```

预期：疗愈/ 美食/ 都市/ 系统/ 成长/ 其他/ 目录

- [ ] **Step 5: 提交**

```bash
git add src/pages/category/\[category\].astro
git commit -m "refactor: support multi-category filtering"
```

---

## Task 6: 更新 library.astro

**Files:**
- Modify: `src/pages/library.astro:25-50`

- [ ] **Step 1: 读取当前文件相关部分**

```bash
sed -n '25,50p' src/pages/library.astro
```

- [ ] **Step 2: 修改 category 引用为 categories**

将第 27 行：
```typescript
category: n.data.category || '其他',
```

修改为：
```typescript
categories: n.data.categories || ['其他'],
```

确保后续使用 categories 数组的地方正确处理。

- [ ] **Step 3: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/pages/library.astro
git commit -m "refactor: library uses categories array"
```

---

## Task 7: 更新其他使用 category 的地方

**Files:**
- Modify: `src/components/BentoGrid.astro`, `src/pages/404.astro`

- [ ] **Step 1: 检查其他文件**

```bash
grep -rn "category" src/pages/ src/components/ | grep -v "categories"
```

- [ ] **Step 2: 更新 BentoGrid.astro**

检查并修改任何使用 category 的地方。

- [ ] **Step 3: 更新 404.astro**

检查并修改任何使用 category 的地方。

- [ ] **Step 4: 验证构建**

```bash
pnpm build 2>&1 | tail -10
```

预期：构建成功

- [ ] **Step 5: 提交**

```bash
git add src/components/BentoGrid.astro src/pages/404.astro
git commit -m "refactor: update remaining category references"
```

---

## Task 8: 最终验证

- [ ] **Step 1: 运行完整构建**

```bash
pnpm build
```

预期：构建成功，244+ pages built

- [ ] **Step 2: 检查分类页面**

```bash
ls dist/category/
```

预期：疗愈/ 美食/ 都市/ 系统/ 成长/ 其他/

- [ ] **Step 3: 检查页面标题**

```bash
grep -o '<title>.*</title>' dist/category/疗愈/index.html
```

预期：<title>疗愈 分类 - 小说阁</title>

- [ ] **Step 4: 检查书籍数据**

```bash
grep -o '"categories":\[[^]]*\]' dist/book/*/index.html | head -5
```

预期：显示中文分类数组

- [ ] **Step 5: 提交最终更改**

```bash
git add -A
git commit -m "feat: complete categories merge - Chinese category names, multi-category support"
```

---

## 验证清单

- [ ] 新数据结构：categories 数组使用中文名称
- [ ] 一本小说可以属于多个分类
- [ ] 所有页面使用中文 slug (如 /category/疗愈)
- [ ] 构建成功，无错误
- [ ] 分类筛选正常工作