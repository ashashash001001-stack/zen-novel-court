# 分类系统动态化实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing_plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将分类从硬编码改为从单一配置文件读取，让新分类自动出现在网站，无需修改代码。

**Architecture:** 创建 `src/config/categories.ts` 作为唯一配置来源，所有页面和组件从该文件读取分类数据。动态页面根据内容数据自动生成路由。

**Tech Stack:** Astro, TypeScript

---

## 文件结构

```
src/
├── config/
│   └── categories.ts        ← 新建：单一分类配置来源
├── components/
│   ├── VisualCategory.astro← 修改：使用 config 读取分类
│   └── BentoGrid.astro       ← 修改：移除硬编码分类链接
├── pages/
│   ├── category/
│   │   └── [category].astro← 修改：移除 defaultCategories
│   ├── library.astro        ← 修改：使用 config 读取分类
│   └── 404.astro            ← 修改：使用 config 读取分类链接
```

---

## 需要改动的文件

| 文件 | 改动 |
|------|------|
| `src/config/categories.ts` | 新建：定义 categoryConfig 和 defaultCategory |
| `src/components/VisualCategory.astro` | 修改：导入 categoryConfig 动态渲染 |
| `src/components/BentoGrid.astro` | 修改：移除硬编码的分类链接 |
| `src/pages/category/[category].astro` | 修改：移除 defaultCategories，使用配置读取 |
| `src/pages/library.astro` | 修改：使用 categoryConfig 产生分类标签 |
| `src/pages/404.astro` | 修改：使用 categoryConfig 读取分类链接 |

---

## Task 1: 创建分类配置文件

**Files:**
- Create: `src/config/categories.ts`

- [ ] **Step 1: 创建 src/config/categories.ts**

```typescript
/**
 * 分类配置 - 单一来源
 * 若需要新增分类或调整外观，只需要修改此文件
 */

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  healing: {
    name: '療癒',
    icon: '🌿',
    color: 'linear-gradient(135deg, #7d9a7d 0%, #5a7a5a 100%)'
  },
  food: {
    name: '美食',
    icon: '🍜',
    color: 'linear-gradient(135deg, #b8a86b 0%, #8a7a4b 100%)'
  },
  urban: {
    name: '都市',
    icon: '🏙️',
    color: 'linear-gradient(135deg, #6b7a8f 0%, #4b5a6f 100%)'
  },
  system: {
    name: '系統',
    icon: '⚡',
    color: 'linear-gradient(135deg, #8b7dab 0%, #6b5d8b 100%)'
  },
  growth: {
    name: '成長',
    icon: '📈',
    color: 'linear-gradient(135deg, #b08b8b 0%, #8a6b6b 100%)'
  },
  other: {
    name: '其他',
    icon: '📚',
    color: 'linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%)'
  }
};

// 未知分类的默认外观
export const defaultCategory: CategoryConfig = {
  name: '其他',
  icon: '📚',
  color: 'linear-gradient(135deg, #888 0%, #666 100%)'
};

/**
 * 获取分类配置，若不存在则返回默认值
 */
export function getCategoryConfig(slug: string): CategoryConfig {
  return categoryConfig[slug] || defaultCategory;
}

/**
 * 获取所有已配置的分类 slug 列表
 */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryConfig);
}
```

- [ ] **Step 2: 提交**

```bash
git add src/config/categories.ts
git commit -m "feat: add category configuration as single source of truth"
```

---

## Task 2: 修改 VisualCategory.astro

**Files:**
- Modify: `src/components/VisualCategory.astro:1-27`

- [ ] **Step 1: 读取当前文件内容**

```bash
cat src/components/VisualCategory.astro
```

预期输出：包含硬编码的 categories 数组

- [ ] **Step 2: 修改前端部分，替换为从配置读取**

将第 1-27 行的 interface 和 const categories 数组替换为：

```astro
---
import { categoryConfig } from '../config/categories';
import { config } from '../config';

const categories = Object.entries(categoryConfig).map(([slug, data]) => ({
  name: data.name,
  slug,
  icon: data.icon,
  color: data.color
}));
---
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build
```

预期：构建成功，无错误

- [ ] **Step 4: 提交**

```bash
git add src/components/VisualCategory.astro
git commit -m "refactor: use categoryConfig in VisualCategory"
```

---

## Task 3: 修改 BentoGrid.astro

**Files:**
- Modify: `src/components/BentoGrid.astro:78-88`

- [ ] **Step 1: 读取当前文件内容**

```bash
cat src/components/BentoGrid.astro | head -100
```

- [ ] **Step 2: 修改前端部分，移除硬编码的分类链接**

将第 78-88 行的硬编码分类链接替换为从配置读取：

```astro
---
import { categoryConfig } from '../config/categories';
const categoryLinks = Object.entries(categoryConfig).map(([slug, data]) => ({
  slug,
  name: data.name
}));
---
```

然后在模板中：

```astro
{categoryLinks.map((cat) => (
  <a href={config.path('/category/' + cat.slug)} class="cat-chip">{cat.name}</a>
))}
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/components/BentoGrid.astro
git commit -m "refactor: use categoryConfig in BentoGrid"
```

---

## Task 4: 修改 [category].astro 动态页面

**Files:**
- Modify: `src/pages/category/[category].astro:10-51`

- [ ] **Step 1: 读取当前文件关键部分**

```bash
cat src/pages/category/[category].astro | head -60
```

- [ ] **Step 2: 修改 getStaticPaths - 移除 defaultCategories**

将第 10-22 行修改为：

```astro
export async function getStaticPaths() {
  const novels = await getCollection('novels');
  // Filter to only meta.json entries
  const metaNovels = novels.filter(n => n.id.endsWith('/meta'));
  // 从数据中提取所有分类（包括新添加的）
  const contentCategories = [...new Set(metaNovels.map(n => n.data?.category).filter(Boolean))];

  return contentCategories.map(category => ({
    params: { category },
    props: { category }
  }));
}
```

- [ ] **Step 3: 修改显示名称逻辑 - 使用配置**

将第 41-51 行的 categoryNames 映射表删除，添加导入并使用 getCategoryConfig：

```astro
---
import { getCategoryConfig } from '../../config/categories';
const categoryInfo = getCategoryConfig(category);
const displayName = categoryInfo.name;
---
```

- [ ] **Step 4: 验证构建**

```bash
pnpm build
```

预期：构建成功

- [ ] **Step 5: 提交**

```bash
git add src/pages/category/[category].astro
git commit -m "refactor: use categoryConfig for dynamic category pages"
```

---

## Task 5: 修改 library.astro

**Files:**
- Modify: `src/pages/library.astro:34-41`

- [ ] **Step 1: 读取当前文件第 30-45 行**

```bash
sed -n '30,45p' src/pages/library.astro
```

- [ ] **Step 2: 添加导入并修改 categories 数组**

在第 9 行（imports 区域）添加：

```typescript
import { categoryConfig, getAllCategorySlugs } from '../config/categories';
```

替换第 34-41 行的 categories 数组：

```typescript
const categorySlugs = getAllCategorySlugs();
const categories = [
  { name: '全部', slug: 'all', icon: '📚' },
  ...categorySlugs.map(slug => ({
    name: categoryConfig[slug].name,
    slug,
    icon: categoryConfig[slug].icon
  }))
];
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/pages/library.astro
git commit -m "refactor: use categoryConfig in library page"
```

---

## Task 6: 修改 404.astro

**Files:**
- Modify: `src/pages/404.astro:55-65`

- [ ] **Step 1: 读取当前文件第 50-70 行**

```bash
sed -n '50,70p' src/pages/404.astro
```

- [ ] **Step 2: 添加导入并修改分类链接**

在 imports 区域添加：

```typescript
import { categoryConfig } from './config/categories';
```

替换第 55-65 行的硬编码链接：

```astro
{Object.entries(categoryConfig).map(([slug, data]) => (
  <li><a href={config.path('/category/' + slug)}>{data.name}分类</a></li>
))}
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build
```

预期：构建成功

- [ ] **Step 4: 提交**

```bash
git add src/pages/404.astro
git commit -m "refactor: use categoryConfig in 404 page"
```

---

## Task 7: 最终验证

- [ ] **Step 1: 运行完整构建**

```bash
pnpm build
```

预期：构建成功，生成所有分类页面

- [ ] **Step 2: 检查生成的分类页面**

```bash
ls -la dist/category/
```

预期：应包含 healing, food, urban, system, growth, other 等分类目录

- [ ] **Step 3: 测试新分类功能（可选）**

如果要测试新分类自动出现：
1. 在任一 novel 的 meta.json 中添加新分类如 `"category": "scifi"`
2. 重新构建
3. 检查是否自动生成 `/category/scifi` 页面

- [ ] **Step 4: 提交最终更改**

```bash
git add -A
git commit -m "feat: dynamic category system - new categories auto-appear"
```

---

## 验证清单

- [ ] 新增书籍使用新分类时，网站会自动显示该分类（无需修改代码）
- [ ] 现有 6 个分类（healing, food, urban, system, growth, other）的外观保持不变
- [ ] 所有分类相关页面和组件使用同一配置来源
- [ ] 构建成功，无错误或警告