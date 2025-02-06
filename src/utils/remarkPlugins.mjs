import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export const getDefaultLayout = () => {
  // @ts-ignore
  return function (_, file) {
    // get keys of the file.data.astro.frontmatter
    const frontMatterKeys = Object.keys(file.data.astro.frontmatter);
    // If 'author' is present in frontmatter, use blog post layout
    // Otherwise, use TIL Layout
    const defaultLayout = frontMatterKeys.includes("author")
      ? "../../../layouts/BlogPostLayout.astro"
      : "../../layouts/TilsLayout.astro";
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout || defaultLayout;
  };
};

export const remarkReadingTime = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    file.data.astro.frontmatter.minutesRead = readingTime.text;
  };
};
