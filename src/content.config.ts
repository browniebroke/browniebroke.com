import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    permalink: z.string().optional(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog };