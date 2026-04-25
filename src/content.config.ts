import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const novels = defineCollection({
  loader: glob({ base: './src/content/novels', pattern: '**/*.json' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    author: z.string().default('AI 生成'),
    language: z.string().default('繁體中文'),
    genre: z.string(),
    totalChapters: z.number(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
    synopsis: z.string().optional(),
    cover: z.string().optional(),  // Cover filename (e.g., "cover.png")
    parts: z.array(z.object({
      id: z.string(),
      name: z.string(),
      chapters: z.array(z.number())
    })).optional(),
    characters: z.array(z.object({
      name: z.string(),
      role: z.string(),
      description: z.string()
    })).optional()
  })
});

export const collections = {
  novels,
};