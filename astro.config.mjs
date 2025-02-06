// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import {
  getDefaultLayout,
  remarkReadingTime,
} from "./src/utils/remarkPlugins.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), tailwind()],
  markdown: {
    remarkPlugins: [getDefaultLayout, remarkReadingTime],
  },
});
