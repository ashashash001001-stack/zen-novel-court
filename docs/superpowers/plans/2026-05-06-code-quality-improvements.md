# Code Quality Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 提升程式碼品質：修復 TypeScript any 類型問題、添加 SEO Schema.org 結構化資料、優化圖片載入

**Architecture:** 三個獨立的改進方向，每個可獨立實作和測試。TypeScript 改進主要在現有檔案中新增類型定義；SEO 改進在 BaseLayout 和章節頁新增 JSON-LD；圖片優化採用漸進式遷移策略，先從主要元件開始。

**Tech Stack:** TypeScript, Astro, JSON-LD Schema.org, Astro Assets Image

**Implementation Order:** Task 1 → Task 2 → Task 3 (each can be rolled back independently)

---

## Task 1: Fix TypeScript `any` Types in Chapter Page

**Files:**
- Create: `src/types/astro.d.ts`
- Modify: `src/pages/book/[novel]/[chapter].astro:1-35`

- [ ] **Step 1: Create global types file for Astro window extensions**

Create file: `src/types/astro.d.ts`

```typescript
export {};

declare global {
  interface Window {
    __configBase__: string;
    openSheet: (id: string) => void;
    closeSheet: (id: string) => void;
    setTheme: (t: string) => void;
    setFontSize: (v: string) => void;
    setFont: (t: string) => void;
    setLineHeight: (v: string) => void;
    setParaSpacing: (v: string) => void;
    setTextAlign: (align: string) => void;
    toggleTTS: () => void;
    updateTTSIcon: () => void;
    updateTTSProgress: (pct: number) => void;
    setTTSRate: (v: string) => void;
    setTTSPitch: (v: string) => void;
    seekTTS: (val: string) => void;
  }
}
```

Note: No need to modify tsconfig.json - Astro already extends astro/tsconfigs/strict which includes astro/types.

- [ ] **Step 2: Define proper ChapterModule interface**

In frontmatter of `src/pages/book/[novel]/[chapter].astro`:

```typescript
interface ChapterModule {
  frontmatter?: {
    title?: string;
    part?: string;
  };
  default?: () => Promise<{ Content: Astro.ComponentFactory }>;
}
```

- [ ] **Step 3: Replace `as any` with typed ChapterModule**

Modify line 21 in `src/pages/book/[novel]/[chapter].astro`:

```typescript
// Try Astro's generic glob first
const chapterModules = import.meta.glob<ChapterModule>('../../../content/novels/*/chapters/*.md', { eager: true });
const chapterModule = chapterModules[chapterPath];

// If above fails (older Astro version), use type assertion:
// const chapterModules = import.meta.glob('../../../content/novels/*/chapters/*.md', { eager: true }) as Record<string, ChapterModule>;
```

- [ ] **Step 4: Replace `(window as any)` calls with window global types**

In the `<script>` section, replace all `(window as any).xxx` with just `window.xxx`:

- Line 1111: `window.__configBase__ = document.body.dataset.basePath;`
- Line 1278: `window.openSheet = function(id: string) { ... }`
- Line 1283: `window.closeSheet = function(id: string) { ... }`
- And all other occurrences in lines 1305-1716

- [ ] **Step 5: Run TypeScript check**

Run: `npx astro check`
Expected: No TypeScript errors related to any types

If `import.meta.glob<ChapterModule>` fails, modify step 3 to use type assertion:
```typescript
const chapterModules = import.meta.glob('../../../content/novels/*/chapters/*.md', { eager: true }) as Record<string, ChapterModule>;
```

- [ ] **Step 6: Commit**

```bash
git add src/types/astro.d.ts src/pages/book/[novel]/[chapter].astro
git commit -m "fix: add TypeScript types for window globals and chapter module"
```

**Rollback:** `git revert HEAD` - removes the types file and reverts chapter.astro changes

---

## Task 2: Add SEO Schema.org Structured Data

**Files:**
- Create: `src/components/SchemaOrg.astro`
- Modify: `src/pages/book/[novel]/index.astro`
- Modify: `src/pages/book/[novel]/[chapter].astro`
- Modify: `src/layouts/ReaderLayout.astro` (if needed)

- [ ] **Step 1: Check ReaderLayout for existing SEO and head slot**

Run: `cat src/layouts/ReaderLayout.astro | head -50`

Check:
- Does ReaderLayout have a `<head>` block?
- Does it have a slot for SEO/meta?
- Does it extend/include BaseLayout?

If ReaderLayout has a named `<slot name="head">` or similar, use it. If it lacks SEO slots, we'll need to add one.

- [ ] **Step 2: If ReaderLayout needs SEO slot, modify it**

If ReaderLayout doesn't have a head slot, add one:

```astro
---
// In ReaderLayout.astro frontmatter
import { config } from '../../../config';
---

<ReaderLayoutProps> // if defined
<!DOCTYPE html>
<html>
<head>
  <!-- Existing head content -->
  <slot name="seo" />
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 3: Create SchemaOrg component**

Create file: `src/components/SchemaOrg.astro`

```astro
---
interface Props {
  type: 'Book' | 'Chapter';
  data: {
    name?: string;
    description?: string;
    author?: { name: string } | string;
    numberOfPages?: number;
    url?: string;
    image?: string;
    chapterNumber?: number;
    bookName?: string;
  };
}

const { type, data } = Astro.props;

const getAuthor = (author: { name: string } | string | undefined) => {
  if (!author) return undefined;
  if (typeof author === 'string') {
    return { "@type": "Person" as const, name: author };
  }
  return { "@type": "Person" as const, name: author.name };
};

const authorObj = getAuthor(data.author);

const schema = type === 'Book' ? {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": data.name,
  "description": data.description,
  "author": authorObj,
  "numberOfPages": data.numberOfPages,
  "url": data.url,
  "image": data.image,
  "workExample": {
    "@type": "BookEdition",
    "bookEdition": "電子版",
    "bookFormat": "https://schema.org/EBook"
  }
} : {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": `第 ${data.chapterNumber} 章`,
  "articleSection": "小說章節",
  "isPartOf": {
    "@type": "Book",
    "name": data.bookName
  },
  "url": data.url
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 4: Import and use SchemaOrg in book index page**

In `src/pages/book/[novel]/index.astro`, add import after frontmatter:

```astro
import SchemaOrg from '../../../components/SchemaOrg.astro';
```

Add SchemaOrg inside `<BaseLayout>` - place it in the head area or before closing tag:

```astro
<BaseLayout title={novel.title} description={novel.synopsis}>
  <SchemaOrg
    type="Book"
    data={{
      name: novel.title,
      description: novel.synopsis,
      author: novel.author,
      numberOfPages: novel.totalChapters,
      url: Astro.url.href,
      image: novel.cover
    }}
  />
  <!-- rest of content -->
</BaseLayout>
```

- [ ] **Step 5: Import and use SchemaOrg in chapter page**

In `src/pages/book/[novel]/[chapter].astro`, add import:

```astro
import SchemaOrg from '../../../components/SchemaOrg.astro';
```

If ReaderLayout has a `slot="seo"`, use:
```astro
<ReaderLayout title={`${novel.title} - ${chapterTitle}`}>
  <SchemaOrg slot="seo" type="Chapter" data={{ ... }} />
  <!-- rest of content -->
</ReaderLayout>
```

If no slot, and ReaderLayout is simple, add to content area (less ideal but functional):
```astro
<ReaderLayout title={`${novel.title} - ${chapterTitle}`}>
  <div hidden>
    <SchemaOrg type="Chapter" data={{ ... }} />
  </div>
  <!-- rest of content -->
</ReaderLayout>
```

- [ ] **Step 6: Verify build includes structured data**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes without errors

- [ ] **Step 7: Commit**

```bash
git add src/components/SchemaOrg.astro src/pages/book/[novel]/index.astro src/pages/book/[novel]/[chapter].astro src/layouts/ReaderLayout.astro
git commit -m "feat: add Schema.org structured data for books and chapters"
```

**Rollback:** `git revert HEAD` - removes SchemaOrg component and its usages

---

## Task 3: Optimize Images with Astro Image Component

**Files:**
- Create: `src/components/ImageOptimizer.astro`
- Modify: `src/components/DualImage.astro`
- Modify: `src/components/FeaturedHero.astro`
- Modify: `src/components/BentoGrid.astro`

- [ ] **Step 1: Create ImageOptimizer utility component**

Create file: `src/components/ImageOptimizer.astro`

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  src: string | ImageMetadata;
  alt: string;
  class?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  widths?: number[];
  sizes?: string;
}

const {
  src,
  alt,
  class: className,
  loading = 'lazy',
  width,
  height,
  widths,
  sizes
} = Astro.props;

// Only treat http(s):// as external CDN
const isExternal = typeof src === 'string' && src.startsWith('http');
---

{isExternal ? (
  <img
    src={src}
    alt={alt}
    class={className}
    loading={loading}
    decoding="async"
    width={width}
    height={height}
  />
) : typeof src === 'string' ? (
  // Legacy: string path (non-http) - use as-is for backward compatibility
  <img
    src={src}
    alt={alt}
    class={className}
    loading={loading}
    decoding="async"
    width={width}
    height={height}
  />
) : (
  // Astro ImageMetadata
  <Image
    src={src}
    alt={alt}
    class={className}
    loading={loading}
    width={width}
    height={height}
    widths={widths}
    sizes={sizes}
    format="webp"
    quality={80}
  />
)}
```

- [ ] **Step 2: Update DualImage with backward compatibility AND width/height props**

Modify `src/components/DualImage.astro`:

```astro
---
/**
 * DualImage - 雙層圖片元件
 * 自動產生模糊背景 + 清晰前景的雙層效果
 *
 * @example
 * <DualImage src={coverPath} alt={`${title}封面`} />
 * <DualImage src={coverImage} alt="描述" blur={30} scale={1.2} width={280} height={400} />
 */
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import '../styles/dual-image.css';

interface Props {
  src: string | ImageMetadata;
  alt: string;
  class?: string;
  blur?: number;
  scale?: number;
  loading?: 'lazy' | 'eager';
  width?: number;   // NEW: for explicit dimensions to improve CLS
  height?: number;  // NEW: for explicit dimensions to improve CLS
}

const {
  src,
  alt,
  class: className,
  blur,
  scale,
  loading = 'lazy',
  width,
  height
} = Astro.props;

const style = [
  blur !== undefined ? `--dual-blur: ${blur}px` : null,
  scale !== undefined ? `--dual-scale: ${scale}` : null,
].filter(Boolean).join('; ');

// Check if external CDN
const isExternal = typeof src === 'string' && src.startsWith('http');

// Use Astro Image only for actual ImageMetadata (imported assets)
const isAstroImage = typeof src !== 'string';
---

<div class:list={['dual-image', className]} style={style || undefined}>
  {isExternal || !isAstroImage ? (
    <>
      {/* Legacy: external URL or string path */}
      <img src={src} alt="" class="dual-image-bg" loading={loading} decoding="async" width={width} height={height} />
      <img src={src} alt={alt} class="dual-image-fg" loading={loading} decoding="async" width={width} height={height} />
    </>
  ) : (
    <>
      {/* Astro Image: optimized webp */}
      <Image src={src} alt="" class="dual-image-bg" loading={loading} width={width || 400} format="webp" />
      <Image src={src} alt={alt} class="dual-image-fg" loading={loading} width={width} height={height} format="webp" />
    </>
  )}
</div>
```

- [ ] **Step 3: Test DualImage compiles**

Run: `npx astro check 2>&1 | grep -i image || echo "No image errors"`
Expected: "No image errors" or no output

- [ ] **Step 4: Add explicit dimensions to FeaturedHero for CLS**

Run: `grep -A10 "DualImage" src/components/FeaturedHero.astro`

Find where DualImage is used and add width/height:

```astro
<DualImage
  src={novel.cover}
  alt={`${novel.title}封面`}
  class="hero-cover"
  width={280}
  height={400}
/>
```

- [ ] **Step 5: Add explicit dimensions to BentoGrid**

Run: `grep -A10 "DualImage" src/components/BentoGrid.astro`

Add width/height to each DualImage usage in the grid:

```astro
<DualImage
  src={item.cover}
  alt={`${item.title}封面`}
  class="bento-item-cover"
  width={160}
  height={240}
/>
```

- [ ] **Step 6: Run build to verify images work**

Run: `npm run build 2>&1 | tail -20`
Expected: Build completes, no image errors

- [ ] **Step 7: Commit**

```bash
git add src/components/ImageOptimizer.astro src/components/DualImage.astro src/components/FeaturedHero.astro src/components/BentoGrid.astro
git commit -m "feat: add Astro Image support with backward compatibility for string paths"
```

**Rollback:** `git revert HEAD` - reverts all image optimization changes

---

## Summary

| Task | Files | Complexity | Rollback |
|------|-------|------------|----------|
| TypeScript Types | 2 files | Medium | `git revert` |
| Schema.org SEO | 4 files | Low | `git revert` |
| Image Optimization | 4 files | Medium | `git revert` |

Each task is independent and can be rolled back with `git revert` if issues arise.