import slugify from "slugify";

function makeUrlFrom(prefix: string, slug: string): string {
  // Remove the date prefix from the slug
  const matches = slug.match(/\/\d{4}-\d{2}-\d{2}-(.*)\//);
  if (matches === null) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  const dateLessSlug = matches[1];
  return `/${prefix}/${dateLessSlug}/`;
}

export const makePostUrl = (slug: string) => makeUrlFrom("blog", slug);
export const makeTagUrl = (tagName: string) => `/blog/tags/${slugify(tagName)}`;
export const makeTILUrl = (slug: string) => makeUrlFrom("tils", slug);
