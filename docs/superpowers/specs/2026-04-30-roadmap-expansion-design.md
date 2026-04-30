# Zen Novel Court Roadmap Expansion Design

## Overview
Expand Zen Novel Court with 5 new capability areas, implemented via 15-minute PDCA loops.

## 1. Performance - PWA & Offline Mode

### Features
- Service Worker for offline reading
- Cache chapter content for offline access
- PWA manifest for installability
- Offline indicator UI
- Smart cache management (keep last 10 chapters per book)

### Architecture
- `src/pages/sw.js` - Service Worker
- `public/manifest.json` - PWA manifest (update existing)
- Cache strategy: Network-first for HTML, Cache-first for chapter content

## 2. Accessibility

### Features
- Full keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ARIA labels on all interactive elements
- Skip-to-content link
- High contrast theme option
- Focus indicators
- Screen reader announcements for dynamic content

### Components
- Add `aria-live` regions for toast notifications
- Add `role="button"` and `tabindex` to clickable divs
- High contrast CSS variables in tokens.css

## 3. User System

### Features
- Simple local user profiles (localStorage)
- Reading history sync across sessions
- Favorite books collection
- Reading preferences cloud-ready structure
- Guest mode (no login required)

### Data Schema (localStorage)
```typescript
interface UserProfile {
  id: string;
  nickname: string;
  createdAt: string;
  preferences: ReaderPreferences;
  readingHistory: ReadingEntry[];
  favorites: string[]; // book slugs
}

interface ReadingEntry {
  bookSlug: string;
  chapter: number;
  lastRead: string;
  progress: number; // percentage
}
```

## 4. Content Discovery

### Features
- "Continue Reading" section on home page
- Related books (by category)
- Reading lists (create custom collections)
- Book recommendations based on reading history
- "Similar books you might like" on book detail page

### Implementation
- `src/components/recommendations/` - New components
- Related: same category, different book
- Recommendations: filter by read books' categories

## 5. Social Features

### Features
- Book ratings (1-5 stars)
- Simple comments per book (stored locally)
- Share book link functionality
- Reading streak tracking
- "Users who read this also read..." (mock data)

### Data Schema (localStorage)
```typescript
interface BookRating {
  bookSlug: string;
  rating: number; // 1-5
  ratedAt: string;
}

interface BookComment {
  bookSlug: string;
  content: string;
  createdAt: string;
}
```

## Implementation Priority

1. **Week 1**: Performance (PWA) - Foundation
2. **Week 2**: Accessibility - All users
3. **Week 3**: User System - Personalization
4. **Week 4**: Content Discovery - Engagement
5. **Week 5**: Social Features - Community

## Files to Create/Modify
- `public/manifest.json` - Update PWA
- `src/pages/sw.js` - New service worker
- `src/styles/tokens.css` - Add accessibility styles
- `src/pages/index.astro` - Add recommendations
- `src/components/` - New components for each feature