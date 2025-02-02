// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


const tilDefaultLayout = () => {
  // @ts-ignore
  return function (_, file) {
    // get keys of the file.data.astro.frontmatter
    const frontMatterKeys = Object.keys(file.data.astro.frontmatter);
    // If 'author' is present in frontmatter, use blog post layout
    // Otherwise, use TIL Layout
    const defaultLayout = frontMatterKeys.includes("author") ? "../../layouts/BlogPostLayout.astro" : "../../layouts/TilsLayout.astro";
    console.log(`Using default layout: '${defaultLayout}'`);
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout || defaultLayout;
  };
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), tailwind()],
  markdown: {
    remarkPlugins: [tilDefaultLayout],
  }
});
