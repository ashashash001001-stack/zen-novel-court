import { defineCollection, z } from 'astro:content';

export const collections = {
  novels: defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      author: z.string(),
      genre: z.string(),
      category: z.string(),
      totalChapters: z.number(),
      status: z.string(),
      synopsis: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
