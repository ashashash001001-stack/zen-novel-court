# 资料夹整理执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将项目中的临时文件、旧原型、日志等移至各目录专属的归档文件夹，清理系统文件，提高可维护性

**Architecture:** 分散归档方案 - 归档文件保留在各原目录的 archive 子目录中

**Tech Stack:** Shell 命令 (mkdir, mv, rm, find)

---

## 文件结构映射

### 需要创建的目录

| 目录 | 用途 |
|------|------|
| `reference/archive/` | 归档 reference 目录的旧文件 |
| `reference/archive/2026-04-html-prototypes/` | 归档 HTML 原型文件 |
| `reference/archive/2026-04-design-docs/` | 归档设计文档 |
| `logs/archive/2026-04-failed-pages/` | 归档日志文件 |
| `~/archive/2026-04-gemini-images/` | 归档临时图片 |

### 需要删除的文件

| 位置 | 文件 | 数量 |
|------|------|------|
| 根目录 | `.DS_Store` | 1 |
| src/ | `.DS_Store` | 1 |
| reference/ | `.DS_Store` | 3 |
| public/ | `.DS_Store` | 1 |
| dist/ | `.DS_Store` | 1 |
| ~/ | `.DS_Store` | 1 |
| ~/tmp/ | `Icon` | 1 |

### 需要移动的文件

| 源路径 | 目标路径 |
|--------|----------|
| `reference/index.html` | `reference/archive/2026-04-html-prototypes/index.html` |
| `reference/my.html` | `reference/archive/2026-04-html-prototypes/my.html` |
| `reference/shelf.html` | `reference/archive/2026-04-html-prototypes/shelf.html` |
| `reference/style-prototype-modern-zen.html` | `reference/archive/2026-04-html-prototypes/style-prototype-modern-zen.html` |
| `reference/book/cherry-blossom/` | `reference/archive/2026-04-html-prototypes/book/cherry-blossom/` |
| `reference/category/comedy/` | `reference/archive/2026-04-html-prototypes/category/comedy/` |
| `reference/category/suspense/` | `reference/archive/2026-04-html-prototypes/category/suspense/` |
| `reference/category/index.html` | `reference/archive/2026-04-html-prototypes/category/index.html` |
| `reference/2026-04-14-generator-architecture-design.md` | `reference/archive/2026-04-design-docs/2026-04-14-generator-architecture-design.md` |
| `reference/modern-zen-design.md` | `reference/archive/2026-04-design-docs/modern-zen-design.md` |
| `logs/failed.txt` | `logs/archive/2026-04-failed-pages/failed.txt` |
| `logs/failed_pages_dev.txt` | `logs/archive/2026-04-failed-pages/failed_pages_dev.txt` |
| `logs/failed_pages_dev_after.txt` | `logs/archive/2026-04-failed-pages/failed_pages_dev_after.txt` |
| `~/tmp/*` | `~/archive/2026-04-gemini-images/` |

---

## 任务列表

### Task 1: 删除 .DS_Store 文件（先执行）

**Files:**
- 删除: 根目录, src/, reference/, public/, dist/, ~/ 下的 .DS_Store

- [ ] **Step 1: 删除根目录 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/.DS_Store
```

- [ ] **Step 2: 删除 src/ 目录 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/src/.DS_Store
```

- [ ] **Step 3: 删除 reference/ 目录下的 .DS_Store (3个)**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/reference/.DS_Store
rm /Users/babubu/Documents/GitHub/zen-novel-court/reference/book/.DS_Store
rm /Users/babubu/Documents/GitHub/zen-novel-court/reference/category/.DS_Store
```

- [ ] **Step 4: 删除 public/ 目录 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/public/.DS_Store
```

- [ ] **Step 5: 删除 dist/ 目录 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/dist/.DS_Store
```

- [ ] **Step 6: 删除 ~/ 目录 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/~/.DS_Store
```

- [ ] **Step 7: 验证删除结果**

```bash
find /Users/babubu/Documents/GitHub/zen-novel-court -maxdepth 2 -name ".DS_Store" -type f
```
Expected: 仅显示 node_modules/, .opencode/ 等构建目录中的 .DS_Store

- [ ] **Step 8: 提交更改**

```bash
git add .
git commit -m "chore: 删除项目目录中的 .DS_Store 文件"
```

---

### Task 2: 整理 reference/ 目录

**Files:**
- 创建: `reference/archive/`
- 移动: 多个 HTML 和 MD 文件

- [ ] **Step 1: 创建 archive 目录结构**

```bash
mkdir -p /Users/babubu/Documents/GitHub/zen-novel-court/reference/archive/2026-04-html-prototypes/book/cherry-blossom
mkdir -p /Users/babubu/Documents/GitHub/zen-novel-court/reference/archive/2026-04-html-prototypes/category
mkdir -p /Users/babubu/Documents/GitHub/zen-novel-court/reference/archive/2026-04-design-docs
```

- [ ] **Step 2: 移动 HTML 原型文件到归档目录**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/reference

# 移动根目录 HTML 文件
mv index.html archive/2026-04-html-prototypes/
mv my.html archive/2026-04-html-prototypes/
mv shelf.html archive/2026-04-html-prototypes/
mv style-prototype-modern-zen.html archive/2026-04-html-prototypes/
```

- [ ] **Step 3: 移动 book/ 子目录内容**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/reference

# 移动 book/cherry-blossom/ 整个目录（包含子目录 ch-1/）
mv book/cherry-blossom archive/2026-04-html-prototypes/book/
```

- [ ] **Step 4: 移动 category/ 子目录内容**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/reference

# 移动 category/comedy/
mv category/comedy archive/2026-04-html-prototypes/category/

# 移动 category/suspense/
mv category/suspense archive/2026-04-html-prototypes/category/

# 移动 category/index.html
mv category/index.html archive/2026-04-html-prototypes/category/
```

- [ ] **Step 5: 移动设计文档**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/reference

mv 2026-04-14-generator-architecture-design.md archive/2026-04-design-docs/
mv modern-zen-design.md archive/2026-04-design-docs/
```

- [ ] **Step 6: 验证 reference/ 目录结构**

```bash
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/reference/
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/reference/archive/
```
Expected: reference/ 仅保留 book/, category/ 和 archive/ 目录

- [ ] **Step 7: 提交更改**

```bash
git add .
git commit -m "chore: 归档 reference/ 目录的旧原型和设计文档"
```

---

### Task 3: 整理 logs/ 目录

**Files:**
- 创建: `logs/archive/2026-04-failed-pages/`
- 移动: 3 个日志文件

- [ ] **Step 1: 创建 archive 目录**

```bash
mkdir -p /Users/babubu/Documents/GitHub/zen-novel-court/logs/archive/2026-04-failed-pages
```

- [ ] **Step 2: 移动日志文件**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/logs

mv failed.txt archive/2026-04-failed-pages/
mv failed_pages_dev.txt archive/2026-04-failed-pages/
mv failed_pages_dev_after.txt archive/2026-04-failed-pages/
```

- [ ] **Step 3: 验证 logs/ 目录结构**

```bash
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/logs/
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/logs/archive/
```
Expected: logs/ 仅包含 archive/ 目录

- [ ] **Step 4: 提交更改**

```bash
git add .
git commit -m "chore: 归档 logs/ 目录的旧日志文件"
```

---

### Task 4: 整理 ~/ 目录

**Files:**
- 创建: `~/archive/2026-04-gemini-images/`
- 删除: `~/tmp/Icon`
- 移动: 临时图片文件

- [ ] **Step 1: 创建 archive 目录**

```bash
mkdir -p /Users/babubu/Documents/GitHub/zen-novel-court/~/archive/2026-04-gemini-images
```

- [ ] **Step 2: 删除 0 字节 Icon 文件**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/~/tmp/Icon
```

- [ ] **Step 3: 移动临时图片文件**

```bash
cd /Users/babubu/Documents/GitHub/zen-novel-court/~/tmp

# 移动图片文件
mv gemini_1777100891224.png ../archive/2026-04-gemini-images/
mv gemini_1777102427886.png ../archive/2026-04-gemini-images/
mv gemini_1777102713565.png ../archive/2026-04-gemini-images/
mv hero-bamboo-16x9.png ../archive/2026-04-gemini-images/

# 移动子目录
mv gemini-images ../archive/2026-04-gemini-images/
```

- [ ] **Step 4: 验证 ~/ 目录结构**

```bash
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/~/tmp/
ls -la /Users/babubu/Documents/GitHub/zen-novel-court/~/archive/
```
Expected: ~/tmp/ 应为空（或仅有 .DS_Store），~/archive/ 包含所有已归档文件

- [ ] **Step 5: 删除 ~/tmp/ 中的 .DS_Store**

```bash
rm /Users/babubu/Documents/GitHub/zen-novel-court/~/tmp/.DS_Store
```

- [ ] **Step 6: 提交更改**

```bash
git add .
git commit -m "chore: 归档 ~/tmp/ 目录的临时图片文件"
```

---

### Task 5: 验证和更新 .gitignore

**Files:**
- 修改: `.gitignore`

- [ ] **Step 1: 检查现有 .gitignore 内容**

```bash
cat /Users/babubu/Documents/GitHub/zen-novel-court/.gitignore
```

- [ ] **Step 2: 添加 .DS_Store 到 .gitignore（如尚未存在）**

```bash
echo ".DS_Store" >> /Users/babubu/Documents/GitHub/zen-novel-court/.gitignore
```

- [ ] **Step 3: 提交 .gitignore 更新**

```bash
git add .gitignore
git commit -m "chore: 添加 .DS_Store 到 .gitignore"
```

---

### Task 6: 最终验证

**Files:**
- 检查: 整体目录结构

- [ ] **Step 1: 验证所有 .DS_Store 已删除（项目目录）**

```bash
find /Users/babubu/Documents/GitHub/zen-novel-court -maxdepth 3 -name ".DS_Store" -type f | grep -v node_modules | grep -v dist | grep -v .opencode
```
Expected: 无输出（所有项目目录的 .DS_Store 已删除）

- [ ] **Step 2: 验证 archive 目录结构**

```bash
find /Users/babubu/Documents/GitHub/zen-novel-court -type d -name "archive"
```
Expected: 显示 reference/archive/, logs/archive/, ~/archive/ 三个目录

- [ ] **Step 3: 检查保留目录是否完整**

```bash
ls -d /Users/babubu/Documents/GitHub/zen-novel-court/{src,public,scripts,docs,web-articles}
```
Expected: 所有保留目录存在

- [ ] **Step 4: 最终 git status 检查**

```bash
git -C /Users/babubu/Documents/GitHub/zen-novel-court status
```

- [ ] **Step 5: 提交所有更改**

```bash
git add .
git commit -m "chore: 完成资料夹整理 - 归档临时文件并清理系统文件"
```

---

## 验收标准检查

| 标准 | 状态 |
|------|------|
| 所有临时文件移至各目录的 archive 子目录 | 待验证 |
| 删除项目根目录及源码目录中的 .DS_Store | 待验证 |
| 删除 ~/tmp/Icon 文件 | 待验证 |
| 保留 node_modules/, dist/, .opencode/ 中的 .DS_Store | 自动满足 |
| 保留根目录的工具文件和 QA 截图 | 自动满足 |