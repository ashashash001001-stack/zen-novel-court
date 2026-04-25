# TDD Roadmap - Full Site Testing Plan

## Project Overview
- **Project**: 小說閣 (Zen Novel Court)
- **Type**: Astro Static Site
- **Tech Stack**: Astro 6.1.5 + TypeScript + Vanilla CSS
- **Base URL**: https://ashashash001001-stack.github.io/zen-novel-court/

---

## Phase 1: Core Pages & Navigation (Priority: Critical)

### 1.1 Homepage (/)
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| HP-01 | Hero section clickable | Navigate to book detail | P0 |
| HP-02 | "開始閱讀" button | /book/[slug]/1 | P0 |
| HP-03 | "搜尋" button | /library | P1 |
| HP-04 | Category cards | /category/[slug] | P0 |
| HP-05 | Hot rankings | Working links | P0 |
| HP-06 | Latest updates | Working links | P0 |
| HP-07 | Continue reading | Resume from last chapter | P1 |
| HP-08 | Bottom nav | All 4 tabs | P0 |

### 1.2 Library Page (/library)
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| LB-01 | Page load | 200 OK | P0 |
| LB-02 | Search form | Filter works | P0 |
| LB-03 | Category filter | /library?category=x | P0 |
| LB-04 | Novel cards | Click to detail | P0 |
| LB-05 | Pagination | If applicable | P2 |

### 1.3 Book Detail (/book/[novel])
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| BD-01 | Page load | 200 OK | P0 |
| BD-02 | Cover/title | Display | P0 |
| BD-03 | Synopsis | Display | P0 |
| BD-04 | Tags | Display | P1 |
| BD-05 | Chapter list | Links work | P0 |
| BD-06 | "開始閱讀" btn | /book/[slug]/1 | P0 |
| BD-07 | Back button | /library | P1 |

### 1.4 Chapter Reader (/book/[novel]/[chapter])
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| CR-01 | Page load | 200 OK | P0 |
| CR-02 | Content render | Text visible | P0 |
| CR-03 | Prev chapter | ch-1 works | P0 |
| CR-04 | Next chapter | ch+1 works | P0 |
| CR-05 | TOC button | Opens overlay | P1 |
| CR-06 | TOC links | Jump to chapter | P1 |
| CR-07 | Back to detail | /book/[slug] | P1 |

### 1.5 My Page (/my)
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| MY-01 | Page load | 200 OK | P0 |
| MY-02 | Favorites | Display books | P1 |
| MY-03 | History | Display progress | P1 |
| MY-04 | Clear history | Button works | P2 |

### 1.6 Category Pages (/category/[slug])
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| CT-01 | healing | 200 OK | P0 |
| CT-02 | food | 200 OK | P0 |
| CT-03 | urban | 200 OK | P0 |
| CT-04 | system | 200 OK | P0 ❌ (missing) |
| CT-05 | growth | 200 OK | P0 |
| CT-06 | other | 200 OK | P0 ❌ (missing) |

---

## Phase 2: User Interactions (Priority: High)

### 2.1 Bookmark/Collection
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| BM-01 | Add to bookshelf | localStorage works | P1 |
| BM-02 | Remove from bookshelf | localStorage works | P1 |
| BM-03 | Sync across tabs | StorageEvent | P2 |

### 2.2 Reading Progress
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| RP-01 | Save progress | localStorage saves | P1 |
| RP-02 | Resume reading | Loads last chapter | P1 |
| RP-03 | Progress bar | Visual update | P2 |

### 2.3 Search Functionality
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| SF-01 | Search by title | Results work | P0 |
| SF-02 | Search by author | Results work | P1 |
| SF-03 | No results | Shows empty state | P1 |

---

## Phase 3: UI/Responsive (Priority: Medium)

### 3.1 Mobile View
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| MV-01 | 375px width | Layout works | P0 |
| MV-02 | Bottom nav | Tabs accessible | P0 |
| MV-03 | Touch gestures | Swipe navigation | P2 |

### 3.2 Tablet View
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| TB-01 | 768px width | Layout adapts | P1 |
| TB-02 | Multi-column | Columns work | P1 |

### 3.3 Desktop View
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| DK-01 | 1280px width | Layout works | P1 |
| DK-02 | Hover states | All interactive | P1 |

---

## Phase 4: Cross-Feature Integration (Priority: Medium)

### 4.1 End-to-End Flows
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| EF-01 | Home → Detail → Read | Full flow works | P0 |
| EF-02 | Search → Detail → Read | Full flow works | P0 |
| EF-03 | Category → Detail → Read | Full flow works | P0 |
| EF-04 | Bookmark → Resume | Full flow works | P1 |

### 4.2 Data Consistency
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| DC-01 | Chapter count matches | Total chapters | P1 |
| DC-02 | Category mapping | Correct categories | P1 |

---

## Phase 5: Performance & SEO (Priority: Low)

### 5.1 Performance
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| PF-01 | First contentful paint | < 2s | P2 |
| PF-02 | Time to interactive | < 3s | P2 |
| PF-03 | Lighthouse score | > 90 | P2 |

### 5.2 SEO
| ID | Test | Expected | Priority |
|----|------|----------|----------|
| SE-01 | Meta tags | All pages | P1 |
| SE-02 | Sitemap | Generated | P1 |
| SE-03 | Robots.txt | Present | P1 |

---

## Test Environment Setup

### Local Testing
```bash
# Start dev server
pnpm dev
# URL: http://localhost:4321/zen-novel-court/
```

### Production Testing
```bash
# Build and preview
pnpm build && pnpm preview
# Or deploy to preview URL
```

### Automated Testing Tools
- Playwright for E2E
- Lighthouse for performance
- curl for status codes

---

## Execution Priority Order

### Week 1: Core Features
1. ✅ Homepage navigation (P0)
2. ✅ Library page (P0)
3. ✅ Book detail (P0)
4. ✅ Chapter reader (P0)
5. ⚠️ Category pages (P0 - 2 missing)

### Week 2: User Features
6. Bookmark system
7. Search functionality
8. Reading progress
9. My page

### Week 3: UI/Polish
10. Responsive testing
11. Cross-browser
12. Performance

---

## Known Issues (from previous audits)

| Issue | Status | Priority |
|-------|--------|----------|
| /category/system (404) | Open | P0 |
| /category/other (404) | Open | P0 |
| Chapter content loading | Fixed | - |

---

## Test Summary

| Phase | Tests | P0 | P1 | P2 |
|-------|-------|----|----|-----|
| 1: Core | 35 | 20 | 12 | 3 |
| 2: Interactions | 10 | 2 | 6 | 2 |
| 3: Responsive | 9 | 2 | 4 | 3 |
| 4: Integration | 6 | 3 | 3 | 0 |
| 5: Performance | 6 | 0 | 3 | 3 |
| **Total** | **66** | **27** | **28** | **11** |

---

*Last Updated: 2026-04-25*