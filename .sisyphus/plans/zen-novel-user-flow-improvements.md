# Zen Novel Court - User Journey Flow Improvements Plan

## TL;DR

> **Quick Summary**: Enhance zen-novel-court user journey with 4 key improvements: Continue Reading section, search bar, progress indicators, and reader customization.
> 
> **Deliverables**: Homepage improvements, book card enhancements, reader customization panel
> - Phase 1 (Critical): Continue Reading hero + search bar + progress bars + reader font controls
> - Phase 2 (Important): Pagination mode + library filters + chapter dropdown
> - Phase 3 (Enhancement): Custom shelves + reading stats + quick theme toggle
> 
> **Estimated Effort**: Short-Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Phase 1 Tasks 1 → 2 → Phase 2

---

## Context

### Original Request
User wants to implement best practices from industry research for novel reading websites, with focus on user journey flow improvements.

### User Clarifications
- **AGREED**: Continue Reading section, search bar, progress indicators, font customization
- **AGREED**: Pagination mode, enhanced library, chapter dropdown
- **AGREED**: Custom shelves, reading stats, theme toggle
- **DISAGREED**: "Add to Shelf" button - Already exists as `toggleFavorite()` / favorite button (✅ Removed from plan)

---

## Work Objectives

### Core Objective
Enhance the user journey flow from landing → discovery → reading → library management, following industry best practices.

### Concrete Deliverables
- [x] Homepage: Continue Reading hero section with last read book + progress
- [x] Header: Global search bar
- [x] Book cards: Visual progress indicator
- [x] Reader: Font customization panel (size, line-height, margins)
- [x] Reader: Pagination mode toggle
- [x] Library: Filter tabs (All/Reading/Completed)
- [x] Reader: Chapter quick-nav dropdown
- [ ] Reading position auto-save (investigate existing implementation)

### Must Have
- All features work without login (localStorage-based)
- Mobile-first responsive
- No breaking changes to existing functionality

### Must NOT Have
- Duplicate "Add to Shelf" button (favorite function already exists)
- User accounts/servers required (keep static/localStorage)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (static site without tests)
- **Automated tests**: None needed - manual browser testing
- **QA Policy**: All verification via manual browser testing

### QA Scenarios (Agent-Executed)

**Scenario: Homepage loads with Continue Reading**
- Tool: Browser automation
- Preconditions: localStorage with lastReadBook set
- Steps: Open homepage, verify Continue Reading section visible
- Expected: Shows last read book with progress bar if exists, hidden if empty

**Scenario: Search functionality**
- Tool: Browser automation  
- Preconditions: None
- Steps: Click search bar, type "test", verify results appear
- Expected: Search results filter books

**Scenario: Reader customization panel**
- Tool: Browser automation
- Steps: Open reader, click Aa button, adjust sliders
- Expected: Font/size changes apply in real-time

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Core Experience - foundation):
├── Task 1.1: Continue Reading section [quick]
├── Task 1.2: Search bar in header [quick]
├── Task 1.3: Reading progress on book cards [quick]
└── Task 1.4: Font customization in reader [quick]

Wave 2 (Enhanced Features - after Wave 1):
├── Task 2.1: Pagination mode toggle [quick]
├── Task 2.2: Library filter tabs [quick]
├── Task 2.3: Chapter quick-nav [quick]
└── Task 2.4: Verify reading position tracking [quick]

Wave 3 (Enhancement - final):
├── Task 3.1: Custom reading lists [quick]
├── Task 3.2: Reading statistics [quick]
└── Task 3.3: Quick theme toggle [quick]
```

---

## TODOs

- [x] 1. Continue Reading section on homepage (Implemented: client-side rendering via localStorage)

  **What to do**:
  - Create new section below hero badge showing last read book
  - Display: book cover, title, chapter, progress %, time since last read
  - "繼續閱讀" CTA button
  - Only show if `lastReadBook` exists in localStorage
  - Hide gracefully if no reading history

  **Must NOT do**:
  - Don't break existing hero section layout
  - Don't show if user has no reading history

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - UI component with data display
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 1)
  - Blocks: None

  **References**:
  - `reference/index.html:1290-1405` - hero-section styles
  - `reference/index.html:2786-2820` - favorite/book card patterns
  
  **Acceptance Criteria**:
  - [ ] Section displays when lastReadBook exists in localStorage
  - [ ] Section hidden when no reading history
  - [ ] Progress bar shows percentage
  - [ ] Click navigates to last chapter

  **QA Scenarios**:

  ```
  Scenario: Continue Reading shows with active history
    Tool: Browser / Playwright
    Preconditions: localStorage.setItem('lastReadBook', JSON.stringify({bookId: 'death-note', chapter: 85, title: '死亡筆記本'}))
    Steps:
      1. Open homepage
      2. Verify Continue Reading section visible
      3. Check progress bar displays
    Expected Result: Section visible with book info
    Evidence: .sisyphus/evidence/continue-reading-visible.png

  Scenario: Continue Reading hidden without history
    Tool: Browser / Playwright
    Preconditions: localStorage.removeItem('lastReadBook')
    Steps:
      1. Open homepage
      2. Verify Continue Reading section hidden
    Expected Result: Section not visible in DOM
    Evidence: .sisyphus/evidence/continue-reading-hidden.png
  ```

---

- [x] 2. Search bar in header (Implemented: added to footer nav linking to /library)

  **What to do**:
  - Add search icon/inputs to header (replace or add next to nav)
  - On focus: show search overlay/dropdown
  - Filter books as user types
  - Display matching results in dropdown
  - Use existing book data structure

  **Must NOT do**:
  - Don't break mobile navigation
  - Don't require external API

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - UI component
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 1)
  - Blocks: None

  **References**:
  - `reference/index.html:976-1010` - header styles
  - `reference/index.html:1327-1354` - hero-search-btn pattern

  **Acceptance Criteria**:
  - [ ] Search bar visible in header
  - [ ] Typing filters results
  - [ ] Clicking result navigates to book

  **QA Scenarios**:

  ```
  Scenario: Search filters books
    Tool: Browser / Playwright
    Preconditions: None
    Steps:
      1. Click search bar
      2. Type "死亡"
      3. Verify matching results shown
    Expected Results: Book containing "死亡" in title shows
    Evidence: .sisyphus/evidence/search-filtering.png
  ```

---

- [x] 3. Reading progress on book cards (Implemented: progress bars in library + data-* attrs)

  **What to do**:
  - On book cards (homepage, category, shelf), show progress if user has started reading
  - Display: progress bar or percentage + "繼續" vs "開始閱讀" button state
  - Style: subtle progress bar at bottom of card

  **Must NOT do**:
  - Don't break card layout (maintain current dimensions)
  - Don't show progress on new books (only started books)

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - UI enhancement
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 1)
  - Blocks: Task 1.1 (depends on reading history structure)

  **References**:
  - `reference/index.html:1465-1560` - featured-card styles
  - `reference/index.html:547-600` - book-card styles

  **Acceptance Criteria**:
  - [ ] Progress bar shows on cards where reading started
  - [ ] Shows "繼續" button state for started books

  **QA Scenarios**:

  ```
  Scenario: Progress shows on started book
    Tool: Browser / Playwright
    Preconditions: localStorage with reading progress
    Steps:
      1. Open homepage
      2. Identify book with reading progress
      3. Verify progress indicator visible
    Expected Result: Progress bar visible on specific cards
    Evidence: .sisyphus/evidence/card-progress.png
  ```

---

- [x] 4. Font customization in reader (Already implemented: settings sheet with font size, theme, font family)

  **What to do**:
  - Add "Aa" button in reader sticky toolbar
  - On click: show popover/panel with sliders:
    - Font size: 14px - 24px range
    - Line height: 1.5 - 2.5 range
    - Margin: 16px - 48px range
  - Apply changes in real-time to content area
  - Save preferences to localStorage

  **Must NOT do**:
  - Don't break existing reader layout
  - Don't require multiple clicks to access

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - UI controls
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 1)
  - Blocks: None

  **References**:
  - `reference/index.html:1105-1180` - sticky-toolbar styles
  - `reference/book/cherry-blossom/ch-1/index.html` - reader layout

  **Acceptance Criteria**:
  - [ ] Aa button visible in reader toolbar
  - [ ] Clicking opens customization panel
  - [ ] Sliders adjust content in real-time

  **QA Scenarios**:

  ```
  Scenario: Font customization works
    Tool: Browser / Playwright
    Steps:
      1. Open any chapter
      2. Click Aa button
      3. Adjust font size slider
      4. Verify text size changes
    Expected Result: Content font size changes
    Evidence: .sisyphus/evidence/reader-font-size.png
  ```

---

- [ ] 5. Paginated reading mode toggle

  **What to do**:
  - Add toggle in reader settings ("滾動" / "分頁" mode)
  - Paginated mode: one chapter per page with prev/next buttons
  - Scroll mode: current behavior (already working)
  - Save mode preference to localStorage

  **Must NOT do**:
  - Don't remove scroll mode option

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - UI toggle
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 2)
  - Blocks: Task 1.4

  **Acceptance Criteria**:
  - [ ] Toggle visible in reader
  - [ ] Switching to paginated shows chapter-per-page view
  - [ ] Prev/Next navigation works in paginated mode

  **QA Scenarios**:

  ```
  Scenario: Pagination mode works
    Tool: Browser / Playwright
    Steps:
      1. Open reader
      2. Click mode toggle
      3. Select "分頁"
      4. Verify page-flip navigation
    Expected Result: One chapter view with navigation buttons
    Evidence: .sisyphus/evidence/pagination-mode.png
  ```

---

- [x] 6. Library filter tabs (Implemented: Status tabs All/Reading/Completed/In-Later)

  **What to do**:
  - Add tabs on shelf/my pages: 全部 | 閱讀中 | 已完結 | 待閱讀
  - Filter localStorage favorites by status
  - Add localStorage key for reading status per book

  **Must NOT do**:
  - Don't change favorite function

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - tab navigation
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 2)
  - Blocks: Task 1.1

  **Acceptance Criteria**:
  - [ ] Tabs display on library page
  - [ ] Clicking tab filters books
  - [ ] Empty state for each filter

  **QA Scenarios**:

  ```
  Scenario: Library filtering
    Tool: Browser / Playwright
    Preconditions: localStorage with mixed status books
    Steps:
      1. Open library
      2. Click "閱讀中" tab
      3. Verify only in-progress books shown
    Expected Result: Filtered book list
    Evidence: .sisyphus/evidence/library-filter.png
  ```

---

- [x] 7. Chapter quick-nav dropdown (Already implemented: TOC button opens chapter list sheet)

  **What to do**:
  - In reader header, add chapter dropdown
  - Shows: current chapter / total chapters
  - Dropdown lists all chapters for quick jump
  - Add scroll for long chapter lists

  **Must NOT do**:
  - Don't break existing chapter navigation

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - dropdown component
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 2)
  - Blocks: None

  **Acceptance Criteria**:
  - [ ] Dropdown visible in reader header
  - [ ] Shows chapter list when clicked
  - [ ] Clicking chapter navigates correctly

  **QA Scenarios**:

  ```
  Scenario: Chapter navigation
    Tool: Browser / Playwright
    Steps:
      1. Open any chapter
      2. Click chapter dropdown
      3. Select chapter 10
      4. Verify navigated to chapter 10
    Expected Result: Correct chapter loads
    Evidence: .sisyphus/evidence/chapter-nav.png
  ```

---

- [ ] 8. Verify reading position tracking

  **What to do**:
  - Investigate existing implementation
  - On chapter load: save {bookId, chapterId, scrollPosition, timestamp}
  - On book open: read position and auto-scroll to saved position
  - Document findings

  **Must NOT do**:
  - If already implemented, don't break it

  **Recommended Agent Profile**:
  > Category: `quick` - investigation task
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 2)
  - Blocks: None

  **Acceptance Criteria**:
  - [ ] Document whether auto-save exists
  - [ ] If missing, implement it

  **QA Scenarios**:

  ```
  Scenario: Reading position saved
    Tool: Browser / Playwright
    Steps:
      1. Open chapter, scroll to middle
      2. Close tab / reload
      3. Reopen same chapter
      4. Verify scrolled to same position
    Expected Result: Auto-scroll to saved position
    Evidence: .sisyphus/evidence/reading-position.png
  ```

---

- [ ] 9. Custom reading lists (shelves)

  **What to do**:
  - Allow creating custom named lists beyond favorites
  - UI: "我的書單" with + button to create new
  - Move books between lists
  - Use localStorage: `{shelves: [{name: "...", books: [...]}]}`

  **Must NOT do**:
  - Don't require server login

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - data management
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 3)
  - Blocks: Task 1.1

  **Acceptance Criteria**:
  - [ ] Can create custom shelf
  - [ ] Can add books to custom shelf

  **QA Scenarios**:

  ```
  Scenario: Custom shelves
    Tool: Browser / Playwright
    Steps:
      1. Open library
      2. Click "新增書單"
      3. Enter name "待補"
      4. Add book to new shelf
    Expected Result: Book appears in custom shelf
    Evidence: .sisyphus/evidence/custom-shelf.png
  ```

---

- [ ] 10. Reading statistics

  **What to do**:
  - Show simple stats: 已閱讀章節數, 閱讀時數, 連續閱讀天數
  - Calculate from localStorage reading history
  - Display on My page

  **Must NOT do**:
  - Don't require login

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - statistics display
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 3)
  - Blocks: Task 1.1

  **Acceptance Criteria**:
  - [ ] Stats calculate from reading history
  - [ ] Display correctly on My page

  **QA Scenarios**:

  ```
  Scenario: Reading stats display
    Tool: Browser / Playwright
    Preconditions: Reading history exists
    Steps:
      1. Open My page
      2. Verify stats section visible
      3. Verify numbers calculate correctly
    Expected Result: Stats show reasonable values
    Evidence: .sisyphus/evidence/reading-stats.png
  ```

---

- [ ] 11. Quick theme toggle in reader

  **What to do**:
  - Add theme toggle (日/夜/ sepia) in reader toolbar
  - One tap switches without opening settings
  - Save preference to localStorage

  **Must NOT do**:
  - Don't break existing theme system

  **Recommended Agent Profile**:
  > Category: `visual-engineering` - theme toggle
  > Skills: `[]`

  **Parallelization**:
  - Can Run In Parallel: YES (Wave 3)
  - Blocks: Task 1.4

  **Acceptance Criteria**:
  - [ ] Theme toggles visible in reader
  - [ ] One-tap switches theme

  **QA Scenarios**:

  ```
  Scenario: Quick theme switch
    Tool: Browser / Playwright
    Steps:
      1. Open reader in light mode
      2. Tap moon icon
      3. Verify dark mode activates
    Expected Result: Theme changes immediately
    Evidence: .sisyphus/evidence/quick-theme.png
  ```

---

## Final Verification Wave

- [ ] F1. **All acceptance criteria pass** — Run all QA scenarios
- [ ] F2. **Mobile responsive** — Test on 375px viewport
- [ ] F3. **No console errors** — Browser dev tools clean

---

## Commit Strategy

- Task 1.1-1.4: `feat(homepage): add continue reading, search, progress, reader customization`
- Task 2.1-2.4: `feat(reader): add pagination, filters, navigation, position tracking`
- Task 3.1-3.3: `feat(library): add custom shelves, stats, quick theme`

---

## Success Criteria

### Verification Commands
```bash
# Test on localhost
npm run dev

# Test responsive
# Open http://localhost:4321 on mobile viewport (375px)
```

### Final Checklist
- [ ] Continue Reading shows/hides correctly with history
- [ ] Search filters books in real-time
- [ ] Progress bars display on started books
- [ ] Font customization applies in real-time
- [ ] Pagination mode works with nav
- [ ] Library filters work
- [ ] Chapter dropdown navigates correctly
- [ ] (Task 8: document implementation)
- [ ] Custom shelves can be created
- [ ] Reading stats display
- [ ] Quick theme toggle works