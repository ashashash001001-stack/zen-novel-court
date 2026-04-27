/**
 * 分类配置 - 单一来源
 * 若需要新增分类或调整外观，只需要修改此文件
 */

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  healing: {
    name: '療癒',
    icon: '🌿',
    color: 'linear-gradient(135deg, #7d9a7d 0%, #5a7a5a 100%)'
  },
  food: {
    name: '美食',
    icon: '🍜',
    color: 'linear-gradient(135deg, #b8a86b 0%, #8a7a4b 100%)'
  },
  urban: {
    name: '都市',
    icon: '🏙️',
    color: 'linear-gradient(135deg, #6b7a8f 0%, #4b5a6f 100%)'
  },
  system: {
    name: '系統',
    icon: '⚡',
    color: 'linear-gradient(135deg, #8b7dab 0%, #6b5d8b 100%)'
  },
  growth: {
    name: '成長',
    icon: '📈',
    color: 'linear-gradient(135deg, #b08b8b 0%, #8a6b6b 100%)'
  },
  other: {
    name: '其他',
    icon: '📚',
    color: 'linear-gradient(135deg, #7a7a7a 0%, #5a5a5a 100%)'
  }
};

// 未知分类的默认外观
export const defaultCategory: CategoryConfig = {
  name: '其他',
  icon: '📚',
  color: 'linear-gradient(135deg, #888 0%, #666 100%)'
};

/**
 * 获取分类配置，若不存在则返回默认值
 */
export function getCategoryConfig(slug: string): CategoryConfig {
  return categoryConfig[slug] || defaultCategory;
}

/**
 * 获取所有已配置的分类 slug 列表
 */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryConfig);
}