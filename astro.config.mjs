// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { transformerMetaHighlight } from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";

import {
  getDefaultLayout,
  remarkReadingTime,
} from "./src/utils/remarkPlugins.mjs";
import { site } from "./src/data/siteMetadata.js";
import { redirects } from "./src/redirects";

// https://astro.build/config
export default defineConfig({
  site: site.siteUrl,
  integrations: [mdx(), react(), sitemap(), partytown()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    remarkPlugins: [getDefaultLayout, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, { rel: ["nofollow"] }]],
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
      transformers: [transformerMetaHighlight()],
    },
  },
  redirects: redirects,
});
