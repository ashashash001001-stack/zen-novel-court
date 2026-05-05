# 资料夹整理设计方案

## 概述

将项目中的临时文件、旧原型、日志等移至各目录专属的归档文件夹，提高项目可维护性和可读性。

## 目标

- 将散落的临时文件集中管理
- 保持目录结构清晰，便于后续开发
- 清理系统文件（.DS_Store, 0 字节 Icon 文件）

## 当前文件分布

### .DS_Store 文件分布（34 个）

| 位置 | 数量 | 处理方式 |
|------|------|----------|
| 根目录 | 1 | 删除 |
| src/ | 1 | 删除 |
| reference/ | 3 | 删除 |
| public/ | 1 | 删除 |
| dist/ | 1 | 删除 |
| node_modules/ | 2 | 不处理（构建时自动生成）|
| .opencode/ | 2 | 不处理（工具生成） |
| ~/ | 1 | 删除 |

### 0 字节 Icon 文件分布

| 位置 | 处理方式 |
|------|----------|
| ~/tmp/Icon | 删除 |

### 根目录工具文件

| 文件 | 建议处理 |
|------|----------|
| all_urls.txt, clean_urls.txt, urls.txt | 保留（SEO 工具输出）|
| test-spacing.cjs, verify-nav.py | 保留（调试工具）|
| preview-*.png, qa-*.png, shelf-screenshot.png | 保留（QA 记录）|

---

## 归档结构

### 1. reference/ 目录

```
reference/
├── archive/                              ← 新建归档目录
│   ├── 2026-04-html-prototypes/         ← 旧 HTML 原型
│   │   ├── index.html
│   │   ├── my.html
│   │   ├── shelf.html
│   │   ├── style-prototype-modern-zen.html
│   │   ├── book/                        ← 实际在 book/ 下
│   │   │   ├── cherry-blossom/           ← 子目录
│   │   │   │   ├── index.html            (75.6K)
│   │   │   │   └── ch-1/index.html       (116.7K)
│   │   │   └── index.html                (book 根目录，75.0K)
│   │   └── category/                    ← 实际在 category/ 下
│   │       ├── comedy/index.html
│   │       ├── suspense/index.html
│   │       └── index.html
│   └── 2026-04-design-docs/             ← 旧设计文档
│       ├── 2026-04-14-generator-architecture-design.md
│       └── modern-zen-design.md
├── book/                                 ← 保留（当前有效）
├── category/                            ← 保留（当前有效）
└── (删除 .DS_Store)
```

### 2. logs/ 目录

```
logs/
└── archive/
    └── 2026-04-failed-pages/
        ├── failed.txt
        ├── failed_pages_dev.txt
        └── failed_pages_dev_after.txt
```

### 3. ~/ 目录

```
~/
└── archive/
    └── 2026-04-gemini-images/
        ├── gemini-images/
        ├── gemini_1777100891224.png
        ├── gemini_1777102427886.png
        ├── gemini_1777102713565.png
        └── hero-bamboo-16x9.png
```

### 4. 各目录清理

| 目录 | 清理项 |
|------|--------|
| 根目录 | 删除 .DS_Store |
| src/ | 删除 .DS_Store |
| reference/ | 删除 .DS_Store (3个) |
| public/ | 删除 .DS_Store |
| dist/ | 删除 .DS_Store |
| ~/ | 删除 .DS_Store, 删除 tmp/Icon, 归档 tmp/ 内容 |

---

## 保留目录

以下目录保持不变：

- `src/` - 源代码
- `public/` - 静态资源
- `scripts/` - 工具脚本
- `docs/superpowers/plans/` - 计划文档
- `docs/superpowers/specs/` - 设计文档

### 根目录保留文件

| 类别 | 文件 |
|------|------|
| SEO 工具输出 | all_urls.txt, clean_urls.txt, urls.txt |
| 调试工具 | test-spacing.cjs, verify-nav.py |
| QA 截图 | preview-*.png, qa-*.png, shelf-screenshot.png |
| 配置/构建文件 | package.json, astro.config.mjs, tsconfig.json 等 |

### 其他保留目录

| 目录 | 用途 |
|------|------|
| web-articles/ | Astro 内容集合（内容文件），保留 |

---

## 执行顺序建议

> **建议**：先删除 .DS_Store，再创建 archive 目录并移动文件（避免把 .DS_Store 也搬进去）

---

## 验收标准

### 必须完成

1. ✅ 所有临时文件移至各目录的 archive 子目录
2. ✅ 删除项目根目录及源码目录中的 .DS_Store
3. ✅ 删除 ~/tmp/Icon 文件

### 可选清理

4. 📌 保留 node_modules/, dist/, .opencode/ 中的 .DS_Store（构建时自动生成）
5. 📌 保留根目录的工具文件和 QA 截图（根据需要自行清理）

---

## 执行优先级

1. **高优先级**：创建 archive 目录，移动文件，删除 .DS_Store
2. **低优先级**：决定是否清理根目录截图和工具文件