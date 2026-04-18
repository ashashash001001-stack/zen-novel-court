import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const novels = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    part: z.string().optional(),
  }),
});

export const collections = { novels };