import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/blog" }),
  schema: z.object({
    date: z.coerce.date(),
    author: z.string(),
    title: z.string(),
    description: z.string(),
    header_image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const tils = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/tils" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog, tils };
