# Spacing Token Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all hardcoded pixel values in the zen-novel-court website to consistent CSS spacing tokens for better maintainability and visual rhythm.

**Architecture:** Add missing spacing tokens to tokens.css, then update all hardcoded pixel values across components to use the token system.

**Tech Stack:** Astro, CSS variables, design tokens

---

## File Structure

- **Modify:** `src/styles/tokens.css` - Add new spacing tokens
- **Modify:** `src/layouts/BaseLayout.astro` - Convert nav and footer padding to tokens
- **Modify:** `src/pages/my.astro` - Convert hardcoded padding
- **Modify:** `src/pages/book/[novel]/index.astro` - Convert hardcoded padding

---

## Tasks

### Task 1: Add New Spacing Tokens to tokens.css

**Files:**
- Modify: `src/styles/tokens.css:140-145` (after --space-12)

- [ ] **Step 1: Add section padding tokens**

Add these tokens after the existing spacing scale (around line 136):

```css
  /* Large section padding */
  --spacing-section: 80px;
  --spacing-footer: 100px;
```

- [ ] **Step 2: Verify tokens work**

Run: `grep -n "spacing-section\|spacing-footer" src/styles/tokens.css`
Expected: 2 lines showing the new tokens

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "style: add section and footer spacing tokens"
```

---

### Task 2: Fix BaseLayout.astro Navigation Spacing

**Files:**
- Modify: `src/layouts/BaseLayout.astro:232, 257, 267-268, 286-287, 339`

- [ ] **Step 1: Update nav-main item padding (line 232)**

Current:
```css
padding: 8px 16px;
```

Change to:
```css
padding: var(--spacing-2) var(--spacing-4);
```

- [ ] **Step 2: Update hero button padding (line 257)**

Current:
```css
padding: 12px 32px;
```

Change to:
```css
padding: var(--spacing-3) var(--spacing-8);
```

- [ ] **Step 3: Update nav-secondary item (line 267-268)**

Current:
```css
gap: 8px;
padding: 12px 20px;
```

Change to:
```css
gap: var(--spacing-2);
padding: var(--spacing-3) var(--spacing-5);
```

- [ ] **Step 4: Update mobile nav item (line 286-287)**

Current:
```css
gap: 4px;
padding: 8px 12px;
```

Change to:
```css
gap: var(--spacing-2);
padding: var(--spacing-2) var(--spacing-3);
```

- [ ] **Step 5: Update user menu item (line 339)**

Current:
```css
padding: 8px 16px;
```

Change to:
```css
padding: var(--spacing-2) var(--spacing-4);
```

- [ ] **Step 6: Verify no hardcoded padding left in nav**

Run: `grep -n "padding: [0-9]\+px" src/layouts/BaseLayout.astro | head -10`
Expected: No nav-related lines (may show other hardcoded values for later tasks)

- [ ] **Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "style: convert nav padding to spacing tokens"
```

---

### Task 3: Fix BaseLayout.astro Footer Padding

**Files:**
- Modify: `src/layouts/BaseLayout.astro:211, 217`

- [ ] **Step 1: Update footer padding-bottom (line 211)**

Current:
```css
padding-bottom: 80px;
```

Change to:
```css
padding-bottom: var(--spacing-section);
```

- [ ] **Step 2: Update mobile footer padding-bottom (line 217)**

Current:
```css
padding-bottom: 100px;
```

Change to:
```css
padding-bottom: var(--spacing-footer);
```

- [ ] **Step 3: Verify changes**

Run: `grep -n "padding-bottom:" src/layouts/BaseLayout.astro | head -5`
Expected: Shows var(--spacing-section) and var(--spacing-footer)

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "style: convert footer padding to spacing tokens"
```

---

### Task 4: Fix my.astro Hardcoded Padding

**Files:**
- Modify: `src/pages/my.astro:537`

- [ ] **Step 1: Update status tag padding (line 537)**

Current:
```css
padding: 2px;
```

Change to:
```css
padding: var(--spacing-1);
```

- [ ] **Step 2: Verify change**

Run: `grep -n "padding: var(--spacing-1)" src/pages/my.astro`
Expected: Shows the updated line

- [ ] **Step 3: Commit**

```bash
git add src/pages/my.astro
git commit -m "style: convert my.astro padding to spacing tokens"
```

---

### Task 5: Fix book/[novel]/index.astro Hardcoded Padding

**Files:**
- Modify: `src/pages/book/[novel]/index.astro:267` (now likely ~269 after previous changes)

- [ ] **Step 1: Find the exact line**

Run: `grep -n "padding: 2px 8px" src/pages/book/\[novel\]/index.astro`
Expected: Shows line number

- [ ] **Step 2: Update status tag padding**

Current:
```css
padding: 2px 8px;
```

Change to:
```css
padding: var(--spacing-1) var(--spacing-2);
```

- [ ] **Step 3: Verify change**

Run: `grep -n "padding: var(--spacing-1) var(--spacing-2)" src/pages/book/\[novel\]/index.astro`
Expected: Shows the updated line

- [ ] **Step 4: Commit**

```bash
git add "src/pages/book/[novel]/index.astro"
git commit -m "style: convert book detail padding to spacing tokens"
```

---

## Final Verification

- [ ] Run: `grep -rn "padding: [0-9]\+px" src/pages/ src/components/ src/layouts/ | grep -v "env(safe-area" | wc -l`
Expected: 0 or minimal (only values that genuinely need to stay hardcoded like safe-area)

- [ ] Run: `grep -rn "margin: [0-9]\+px" src/pages/ src/components/ | wc -l`
Expected: Check for any remaining hardcoded margins

- [ ] Final commit for complete task:

```bash
git add -A
git commit -m "style: complete spacing token standardization"
git push
```

---

## Summary

| Task | Files Changed | Hardcoded Values Fixed |
|------|---------------|----------------------|
| 1. Add tokens | tokens.css | 2 new tokens added |
| 2. Nav spacing | BaseLayout.astro | 5 values converted |
| 3. Footer spacing | BaseLayout.astro | 2 values converted |
| 4. my.astro | my.astro | 1 value converted |
| 5. book detail | book/[novel]/index.astro | 1 value converted |

**Total: 9 hardcoded pixel values converted to CSS tokens**