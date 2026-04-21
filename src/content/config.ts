import { defineCollection, z } from 'astro:content';

export const collections = {
  novels: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      author: z.string(),
      genre: z.string(),
      category: z.string(),
      chapters: z.number(),
      status: z.string(),
      synopsis: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
