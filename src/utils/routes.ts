import slugify from 'slugify';

function makeUrlFrom(prefix, slug) {
  // Remove the date prefix from the slug
  const matches = slug.match(/\/\d{4}-\d{2}-\d{2}-(.*)\//)
  const dateLessSlug = matches[1]
  return `/${prefix}/${dateLessSlug}/`
}

export const makePostUrl = (slug) => makeUrlFrom('blog', slug)
export const makeTagUrl = (tagName) => `/blog/tags/${slugify(tagName)}`
export const makeTILUrl = (slug) => makeUrlFrom('tils', slug)
