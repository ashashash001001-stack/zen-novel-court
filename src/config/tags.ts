/**
 * 標籤配置 - 單一來源
 * 若需要新增標籤或調整外觀，只需要修改此文件
 */

export interface TagConfig {
  name: string;
  icon: string;
  color: string;
}

// 預設標籤外觀配置
export const DEFAULT_TAG_CONFIG: TagConfig = {
  name: '標籤',
  icon: '🏷️',
  color: '#888888'
};

// 標籤配置文件 - 使用繁體中文 key
export const tagConfig: Record<string, TagConfig> = {
  禪意: {
    name: '禪意',
    icon: '🧘',
    color: '#7d9a7d'
  },
  美食: {
    name: '美食',
    icon: '🍜',
    color: '#b8a86b'
  },
  素食: {
    name: '素食',
    icon: '🥬',
    color: '#6aab6a'
  },
  成長: {
    name: '成長',
    icon: '📈',
    color: '#b08b8b'
  },
  奇幻: {
    name: '奇幻',
    icon: '✨',
    color: '#8b7dab'
  },
  系統: {
    name: '系統',
    icon: '⚡',
    color: '#6b7a8f'
  },
  都市: {
    name: '都市',
    icon: '🏙️',
    color: '#5a7a8f'
  },
  人生: {
    name: '人生',
    icon: '🌟',
    color: '#9a7d6b'
  }
};

/**
 * 獲取標籤配置，若不存在則返回默認值
 */
export function getTagConfig(slug: string): TagConfig {
  return tagConfig[slug] || DEFAULT_TAG_CONFIG;
}

/**
 * 獲取所有已配置的標籤 slug 列表
 */
export function getAllTagSlugs(): string[] {
  return Object.keys(tagConfig);
}

/**
 * 從小說資料中提取所有唯一的標籤
 */
export function getAllTagsFromNovels(novels: { data: { tags?: string[] } }[]): string[] {
  const tagSet = new Set<string>();

  for (const novel of novels) {
    const tags = novel.data?.tags;
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet);
}