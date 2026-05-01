/**
 * 分類配置 - 單一來源
 * 若需要新增分類或調整外觀，只需要修改此文件
 * 使用繁體中文 key 與資料庫保持一致
 */

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  療癒: {
    name: '療癒',
    icon: '🌿',
    color: 'linear-gradient(135deg, #7d9a7d 0%, #5a7a5a 100%)'
  },
  美食: {
    name: '美食',
    icon: '🍜',
    color: 'linear-gradient(135deg, #b8a86b 0%, #8a7a4b 100%)'
  },
  都市: {
    name: '都市',
    icon: '🏙️',
    color: 'linear-gradient(135deg, #6b7a8f 0%, #4b5a6f 100%)'
  },
  系統: {
    name: '系統',
    icon: '⚡',
    color: 'linear-gradient(135deg, #8b7dab 0%, #6b5d8b 100%)'
  },
  成長: {
    name: '成長',
    icon: '📈',
    color: 'linear-gradient(135deg, #b08b8b 0%, #8a6b6b 100%)'
  },
  其他: {
    name: '其他',
    icon: '📚',
    color: 'linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%)'
  }
};

// 未知分類的默認外觀
export const defaultCategory: CategoryConfig = {
  name: '其他',
  icon: '📚',
  color: 'linear-gradient(135deg, #888 0%, #666 100%)'
};

/**
 * 獲取分類配置，若不存在則返回默認值
 */
export function getCategoryConfig(slug: string): CategoryConfig {
  return categoryConfig[slug] || defaultCategory;
}

/**
 * 獲取所有已配置的分類 slug 列表
 */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryConfig);
}