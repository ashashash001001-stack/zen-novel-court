# DeathNote 静态网站生成器架构设计

## 1. 项目概述

### 1.1 目标

将现有的单一 `generate.mjs` 文件重构为模块化、可扩展的生成器架构，便于长期维护和未来扩展。

### 1.2 核心原则

- **单一职责**：每个模块只做一件事
- **注册机制**：新增页面类型只需注册一行
- **向后兼容**：现有内容文件格式保持不变
- **AI 友好**：AI Agent 容易理解和操作

---

## 2. 内容文件结构

### 2.1 目录概览

```
content/
├── config.json           # 全局配置
├── categories.json       # 分类数据
├── authors.json         # 作者数据（未来扩展）
├── books/               # 书籍内容
│   ├── _template/       # 新建书籍的模板
│   │   ├── meta.json
│   │   └── chapters/
│   │       └── ch-1.md
│   ├── midnight-library/
│   │   ├── meta.json
│   │   ├── chapters/
│   │   │   ├── ch-1.md
│   │   │   └── ch-2.md
│   │   └── assets/
│   │       └── cover.png
│   └── ...
├── pages/                # 独立页面（未来扩展）
│   ├── about.md
│   └── contact.md
└── legal/               # 法律页面
    ├── privacy.md
    └── terms.md
```

### 2.2 config.json 全局配置

```json
{
  "site": {
    "name": "DeathNote",
    "tagline": "沉浸閱讀，從這裡開始",
    "description": "DeathNote 是一個沉浸式的線上小說閱讀平台",
    "url": "https://deathnote.example.com",
    "base": "/",
    "language": "zh-Hant"
  },
  "seo": {
    "defaultTitle": "DeathNote - 沉浸式小說閱讀平台",
    "defaultDescription": "提供懸疑、療癒、科幻等多種題材的優質原創小說",
    "ogImage": "/og-image.png"
  },
  "features": {
    "search": true,
    "darkMode": true,
    "pwa": true
  }
}
```

### 2.3 书籍 meta.json（可扩展）

#### 基础字段（必需）

```json
{
  "id": "midnight-library",
  "title": "午夜圖書館",
  "author": "林深夜",
  "category": "healing",
  "tags": ["療癒", "奇幻", "人生"],
  "synopsis": "在每個午夜十二點...",
  "status": "completed",
  "publishStatus": "draft",
  "rating": 8.8,
  "color": "#A3B18A",
  "date": "2024-03-01",
  "updated": "2024-08-15",
  "imageKeywords": "library,books,midnight,reading"
}
```

#### 扩展字段（可选）

```json
{
  // SEO 相关
  "seo": {
    "title": "午夜圖書館 - 療癒系小說",
    "description": "在每個午夜十二點...",
    "keywords": ["療癒", "奇幻", "人生"]
  },
  
  // 作者信息
  "authorId": "lin-chen-ye",
  
  // 章节统计
  "wordCount": 150000,
  "chapterCount": 50,
  
  // 热度数据
  "views": 12345,
  "favorites": 2345,
  
  // 封面图片
  "coverImage": "assets/cover.png",
  
  // 推荐标识
  "featured": true,
  "featuredAt": "2024-06-01",
  
  // 关联书籍
  "relatedBooks": ["book-id-1", "book-id-2"],
  "prequel": null,
  "sequel": "book-id-3",
  
  // 自定义字段
  "customFields": {
    "custom-key": "custom-value"
  }
}
```

### 2.4 章节文件格式

使用 Frontmatter 格式：

```markdown
---
title: 第一章：夜幕降臨
order: 1
---

正文内容...
正文内容...
```

---

## 3. 输出目录结构

### 3.1 目录概览

```
dist/                        # 输出目录（从根目录独立）
├── index.html              # 首页
├── shelf.html              # 书阁
├── my.html                 # 我的
├── search.html             # 搜索页
├── 404.html                # 404 页
├── sitemap.xml             # Sitemap
├── manifest.json           # PWA 配置
├── sw.js                   # Service Worker
├── robots.txt              # robots.txt
├── book/                   # 书籍详情页
│   ├── midnight-library/
│   │   ├── index.html
│   │   └── ch-1/
│   │       └── index.html
│   └── ...
├── category/              # 分类页
│   ├── healing/
│   │   └── index.html
│   └── ...
├── legal/                 # 法律页
│   ├── privacy/
│   │   └── index.html
│   └── terms/
│       └── index.html
└── static/                # 静态资源
    ├── css/
    │   └── styles.css
    └── img/
        └── ...
```

### 3.2 文件命名规范

| 页面类型 | 路径示例 | 说明 |
|---------|---------|------|
| 首页 | `/index.html` | 根路径 |
| 书阁 | `/shelf.html` | 静态页面 |
| 书籍详情 | `/book/midnight-library/index.html` | 多级目录 |
| 章节页 | `/book/midnight-library/ch-1/index.html` | 多级目录 |
| 分类页 | `/category/healing/index.html` | 多级目录 |

---

## 4. 生成器架构

### 4.1 目录结构

```
generate/
├── index.mjs              # 主入口（仅调度）
├── data.mjs               # 数据加载
├── registry.mjs           # 页面类型注册表
├── schemas/               # 数据验证 schema
│   ├── book.mjs           # 书籍 schema
│   └── category.mjs       # 分类 schema
├── templates/             # HTML 模板组件
│   ├── layout.mjs         # 基础布局
│   ├── header.mjs         # 头部组件
│   ├── footer.mjs         # 底部导航
│   └── bookCover.mjs      # 书籍封面组件
└── generators/           # 页面生成器
    ├── base.mjs           # 基类
    ├── home.mjs           # 首页
    ├── shelf.mjs          # 书阁页
    ├── my.mjs             # 我的页
    ├── search.mjs         # 搜索页
    ├── book.mjs           # 书籍详情页
    ├── chapter.mjs        # 章节页
    ├── category.mjs       # 分类页
    ├── legal.mjs          # 法律页
    └── sitemap.mjs       # Sitemap
```

### 4.2 入口文件 index.mjs

```javascript
import { readFileSync, existsSync, rmSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { GENERATORS } from './registry.mjs';
import { loadConfig, loadCategories, loadBooks } from './data.mjs';

// 清理输出目录
function cleanDist() {
  const DIST = 'dist';
  // ... 清理逻辑，保留 static/ 等必要文件
}

// 主函数
async function main() {
  console.log('🚀 Starting generation...');
  
  // 加载共享数据
  const config = loadConfig();
  const categories = loadCategories();
  const books = loadBooks();
  
  // 遍历注册表生成所有页面
  for (const [name, generator] of Object.entries(GENERATORS)) {
    console.log(`Generating ${name}...`);
    const { generate } = await import(generator.file);
    await generate({ config, categories, books });
  }
  
  console.log('✅ Generation complete!');
}

main().catch(console.error);
```

### 4.3 注册表 registry.mjs

```javascript
export const GENERATORS = {
  // 静态页面（每个类型生成一个文件）
  home:    { file: './generators/home.mjs',    route: '/' },
  shelf:   { file: './generators/shelf.mjs',   route: '/shelf' },
  my:      { file: './generators/my.mjs',      route: '/my' },
  search:  { file: './generators/search.mjs',  route: '/search' },
  
  // 单页多次生成（多本书/多个分类）
  book:    { file: './generators/book.mjs',    route: '/book/:id',     multiple: true, dataKey: 'books' },
  chapter: { file: './generators/chapter.mjs',  route: '/book/:id/:ch', multiple: true, dataKey: 'books' },
  category:{ file: './generators/category.mjs',route: '/category/:id', multiple: true, dataKey: 'categories' },
  
  // 法律页面（多个）
  legal:   { file: './generators/legal.mjs',   route: '/legal/:slug', multiple: true, dataKey: 'legal' },
  
  // 技术文件
  sitemap: { file: './generators/sitemap.mjs', route: '/sitemap.xml' },
  robots:   { file: './generators/robots.mjs',  route: '/robots.txt' },
};
```

### 4.4 基类 base.mjs

```javascript
export class BaseGenerator {
  constructor(options) {
    this.config = options.config;
    this.categories = options.categories;
    this.books = options.books;
    this.DIST = options.DIST || 'dist';
  }
  
  // 加载数据
  loadData(dataKey) {
    return this[dataKey] || [];
  }
  
  // 写入文件
  write(path, content) {
    const fullPath = join(this.DIST, path);
    // ... 写入逻辑
  }
  
  // 渲染模板
  render(templateName, data) {
    // ... 模板渲染逻辑
  }
  
  // 获取相对路径
  getRel(depth = 0) {
    return depth === 0 ? './' : depth === 1 ? '../' : '../../';
  }
}
```

### 4.5 生成器示例 book.mjs

```javascript
import { BaseGenerator } from './base.mjs';
import { renderBookPage } from '../templates/book.mjs';

export class BookGenerator extends BaseGenerator {
  async generate(options) {
    const books = this.books.filter(b => b.publishStatus === 'published');
    
    for (const book of books) {
      const html = renderBookPage({
        book,
        categories: this.categories,
        books: this.books,
        rel: this.getRel(1)
      });
      
      this.write(`book/${book.id}/index.html`, html);
    }
  }
}

// 导出生成函数（供 registry 调用）
export async function generate(options) {
  const generator = new BookGenerator(options);
  await generator.generate();
}
```

---

## 5. 模板系统

### 5.1 模板组件结构

```
templates/
├── layout.mjs         # HTML 基础框架
├── components/       # 可复用组件
│   ├── header.mjs
│   ├── footer.mjs
│   ├── nav.mjs
│   ├── bookCard.mjs
│   ├── bookCover.mjs
│   ├── chapterList.mjs
│   └── searchBox.mjs
└── pages/            # 页面级模板
    ├── home.mjs
    ├── shelf.mjs
    ├── book.mjs
    ├── chapter.mjs
    └── category.mjs
```

### 5.2 组件使用示例

```javascript
import { renderHeader } from './components/header.mjs';
import { renderFooter } from './components/footer.mjs';
import { renderBookCover } from './components/bookCover.mjs';

export function renderBookPage(data) {
  const { book, rel } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="zh-Hant">
    <head>
      ${renderHead(book)}
    </head>
    <body>
      ${renderHeader({ active: 'book', rel })}
      <main>
        ${renderBookDetail({ book, rel })}
      </main>
      ${renderFooter({ active: 'book', rel })}
    </body>
    </html>
  `;
}
```

---

## 6. 数据验证 Schema

### 6.1 书籍 Schema book.mjs

```javascript
export const BOOK_SCHEMA = {
  // 必需字段
  id:           { type: 'string',  required: true, pattern: /^[a-z0-9-]+$/ },
  title:        { type: 'string',  required: true, maxLength: 100 },
  author:       { type: 'string',  required: true },
  category:     { type: 'string',  required: true, enum: CATEGORIES },
  tags:         { type: 'array',   required: true, maxItems: 10 },
  synopsis:     { type: 'string',  required: true, maxLength: 2000 },
  status:       { type: 'string',  required: true, enum: ['ongoing', 'completed', 'hiatus'] },
  publishStatus:{ type: 'string',  required: true, enum: ['draft', 'published', 'archived'] },
  rating:       { type: 'number',  required: true, min: 0, max: 10 },
  color:        { type: 'string',  required: true, pattern: /^#[0-9A-Fa-f]{6}$/ },
  date:         { type: 'string',  required: true, format: 'date' },
  updated:      { type: 'string',  required: true, format: 'date' },
  
  // 可选字段
  seo:          { type: 'object',  required: false },
  authorId:     { type: 'string',  required: false },
  wordCount:    { type: 'number',  required: false },
  views:        { type: 'number',  required: false },
  favorites:    { type: 'number',  required: false },
  coverImage:   { type: 'string',  required: false },
  featured:     { type: 'boolean', required: false },
  relatedBooks: { type: 'array',   required: false },
  customFields: { type: 'object',  required: false },
};

// 验证函数
export function validateBook(data) {
  const errors = [];
  for (const [field, schema] of Object.entries(BOOK_SCHEMA)) {
    if (schema.required && !data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
    // ... 更多验证逻辑
  }
  return { valid: errors.length === 0, errors };
}
```

---

## 7. 扩展指南

### 7.1 添加新的页面类型

只需 3 步：

**步骤 1：创建生成器文件**

```javascript
// generate/generators/author.mjs
import { BaseGenerator } from './base.mjs';

export class AuthorGenerator extends BaseGenerator {
  async generate() {
    // 加载作者数据
    const authors = this.authors || [];
    
    for (const author of authors) {
      const html = this.render('author', { author });
      this.write(`author/${author.id}/index.html`, html);
    }
  }
}

export async function generate(options) {
  const generator = new AuthorGenerator(options);
  await generator.generate();
}
```

**步骤 2：在注册表注册**

```javascript
// generate/registry.mjs
export const GENERATORS = {
  // ... 现有条目
  author: {
    file: './generators/author.mjs',
    route: '/author/:id',
    multiple: true,
    dataKey: 'authors'
  }
};
```

**步骤 3：运行生成**

```bash
bun run generate.mjs
```

### 7.2 添加新的书籍字段

```javascript
// generate/schemas/book.mjs
export const BOOK_SCHEMA = {
  // ... 现有字段
  
  // 添加新字段
  views: { type: 'number', required: false, default: 0 },
  award: { type: 'string', required: false },
};
```

---

## 8. AI Agent 工作流

### 8.1 编辑书籍内容

```
AI Agent 想要添加新章节
    ↓
编辑 content/books/[书名]/chapters/ch-N.md
    ↓
运行 bun run generate.mjs
    ↓
自动生成到 dist/book/[书名]/ch-N/index.html
    ↓
推送 GitHub
```

### 8.2 添加新书籍

```
AI Agent 想要添加新书
    ↓
复制 content/books/_template 为新目录
    ↓
编辑 content/books/[新书名]/meta.json
    ↓
添加章节文件 content/books/[新书名]/chapters/*.md
    ↓
运行 bun run generate.mjs
    ↓
自动生成所有页面
```

### 8.3 修改站点配置

```
AI Agent 想要修改站点名称
    ↓
编辑 content/config.json
    ↓
运行 bun run generate.mjs
    ↓
所有页面自动更新
```

---

## 9. 文件变更清单

### 9.1 需要创建的新文件

```
generate/
├── index.mjs
├── data.mjs
├── registry.mjs
├── schemas/
│   ├── book.mjs
│   └── category.mjs
├── templates/
│   ├── layout.mjs
│   ├── components/
│   │   ├── header.mjs
│   │   ├── footer.mjs
│   │   ├── nav.mjs
│   │   ├── bookCard.mjs
│   │   ├── bookCover.mjs
│   │   ├── chapterList.mjs
│   │   └── searchBox.mjs
│   └── pages/
│       ├── home.mjs
│       ├── shelf.mjs
│       ├── book.mjs
│       ├── chapter.mjs
│       └── category.mjs
└── generators/
    ├── base.mjs
    ├── home.mjs
    ├── shelf.mjs
    ├── my.mjs
    ├── search.mjs
    ├── book.mjs
    ├── chapter.mjs
    ├── category.mjs
    ├── legal.mjs
    └── sitemap.mjs
```

### 9.2 需要修改的文件

| 文件 | 操作 |
|------|------|
| `package.json` | 添加 `generate` 脚本 |
| `content/config.json` | 创建站点配置 |
| `content/books/_template/` | 创建书籍模板 |

### 9.3 输出目录变更

- 当前：`./` （根目录）
- 将来：`dist/` （独立输出目录）

---

## 10. 验证检查清单

- [ ] 所有现有书籍内容能正常加载
- [ ] 生成的 HTML 结构正确
- [ ] 页面链接路径正确
- [ ] 分类页面按 category 筛选
- [ ] 章节页面正确加载章节内容
- [ ] Sitemap 包含所有页面
- [ ] SEO meta 标签正确生成
- [ ] 移动端适配正常
- [ ] 深色模式切换正常
- [ ] 收藏功能正常

---

## 11. 未来扩展规划

### 11.1 短期（近期可实现）

- [ ] 作者页面 `/author/:id`
- [ ] 搜索结果页面
- [ ] 标签页面 `/tag/:tag`
- [ ] 排行榜页面 `/rankings`

### 11.2 中期（需要更多开发）

- [ ] 多语言支持
- [ ] 用户评论系统
- [ ] 阅读进度同步
- [ ] 书籍推荐算法

### 11.3 长期（较大改动）

- [ ] 动态内容加载（API + SPA）
- [ ] 用户认证系统
- [ ] 付费章节
- [ ] 作者后台

---

## 12. 总结

本设计文档定义了 DeathNote 静态网站生成器的完整架构，核心特性包括：

| 特性 | 说明 |
|------|------|
| **模块化** | 生成器分为独立文件，易于维护 |
| **可扩展** | 添加新页面类型只需注册一行 |
| **可验证** | 数据 schema 自动验证 |
| **AI 友好** | 内容与代码分离，AI 容易操作 |
| **向后兼容** | 现有内容格式不变 |

---

**文档版本**: 1.0  
**创建日期**: 2026-04-14  
**最后更新**: 2026-04-14
