// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { transformerMetaHighlight } from "@shikijs/transformers";

import {
  getDefaultLayout,
  remarkReadingTime,
} from "./src/utils/remarkPlugins.mjs";
import { site } from "./src/data/siteMetadata.js";

// https://astro.build/config
export default defineConfig({
  site: site.siteUrl,
  integrations: [mdx(), react(), tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [getDefaultLayout, remarkReadingTime],
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
      transformers: [transformerMetaHighlight()],
    },
  },
});
