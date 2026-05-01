import { describe, it, expect, beforeEach } from 'vitest';
import { tagConfig, getTagConfig, getAllTagSlugs, getAllTagsFromNovels, DEFAULT_TAG_CONFIG } from './tags';
import { categoryConfig, getCategoryConfig, getAllCategorySlugs } from './categories';

// ============================================
// Issue 5: No tag configuration file exists
// ============================================

describe('Tag Configuration', () => {
  it('should have a tagConfig export', () => {
    expect(tagConfig).toBeDefined();
  });

  it('should have getTagConfig function', () => {
    expect(typeof getTagConfig).toBe('function');
  });

  it('should have getAllTagSlugs function', () => {
    expect(typeof getAllTagSlugs).toBe('function');
  });

  it('should have getAllTagsFromNovels function', () => {
    expect(typeof getAllTagsFromNovels).toBe('function');
  });

  it('should return default config for unknown tags', () => {
    const unknownTag = getTagConfig('未知標籤');
    expect(unknownTag).toEqual(DEFAULT_TAG_CONFIG);
  });

  it('should have predefined tags', () => {
    const slugs = getAllTagSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain('禪意');
    expect(slugs).toContain('美食');
    expect(slugs).toContain('素食');
    expect(slugs).toContain('成長');
    expect(slugs).toContain('奇幻');
    expect(slugs).toContain('系統');
    expect(slugs).toContain('都市');
    expect(slugs).toContain('人生');
  });
});

// ============================================
// Issue 1: Category config uses simplified Chinese
// but novel data uses traditional Chinese
// ============================================

describe('Category Consistency', () => {
  it('should support traditional Chinese category names (成長)', () => {
    // Novel data uses "成長" (traditional)
    const config = getCategoryConfig('成長');
    // Should return proper config, not default
    expect(config.name).toBe('成長');
    expect(config.icon).toBeDefined();
  });

  it('should support traditional Chinese category names (美食)', () => {
    // Novel data uses "美食" (same in both)
    const config = getCategoryConfig('美食');
    expect(config.name).toBe('美食');
    expect(config.icon).toBeDefined();
  });

  it('should support traditional Chinese category names (都市)', () => {
    // Novel data uses "都市" (same in both)
    const config = getCategoryConfig('都市');
    expect(config.name).toBe('都市');
    expect(config.icon).toBeDefined();
  });

  it('should return default for unknown categories', () => {
    const unknown = getCategoryConfig('完全不存在的分類');
    expect(unknown.name).toBe('其他');
  });
});

// ============================================
// Issue 2: Tags should be dynamically generated from novels
// ============================================

describe('Dynamic Tag Generation', () => {
  it('should be able to extract all unique tags from novel data', () => {
    // Mock novel data similar to what would come from getCollection
    const mockNovels = [
      { data: { tags: ['禪意', '美食', '素食', '成長'] } },
      { data: { tags: ['奇幻', '系統'] } },
      { data: { tags: [] } },
      { data: {} }, // No tags
    ];

    const allTags = getAllTagsFromNovels(mockNovels as any);
    expect(allTags).toContain('禪意');
    expect(allTags).toContain('美食');
    expect(allTags).toContain('素食');
    expect(allTags).toContain('成長');
    expect(allTags).toContain('奇幻');
    expect(allTags).toContain('系統');
  });

  it('should deduplicate tags', () => {
    const mockNovels = [
      { data: { tags: ['禪意', '美食'] } },
      { data: { tags: ['禪意', '成長'] } },
    ];

    const allTags = getAllTagsFromNovels(mockNovels as any);
    const counts = allTags.filter(t => t === '禪意').length;
    expect(counts).toBe(1);
  });

  it('should handle novels with no tags', () => {
    const mockNovels = [
      { data: {} },
      { data: { tags: [] } },
    ];

    const allTags = getAllTagsFromNovels(mockNovels as any);
    expect(allTags).toEqual([]);
  });
});