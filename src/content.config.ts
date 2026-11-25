import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Pages are routed from the raw file names in src/pages, so use the same
// names as ids (instead of Astro's slugified default) to build matching links
const idFromFileName = ({ entry }: { entry: string }) =>
  entry.replace(/(\/index)?\.mdx?$/, "");

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/pages/blog",
    generateId: idFromFileName,
  }),
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      author: z.string(),
      title: z.string(),
      description: z.string(),
      header_image: image().optional(),
      tags: z.array(z.string()),
    }),
});

const tils = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/pages/tils",
    generateId: idFromFileName,
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog, tils };
