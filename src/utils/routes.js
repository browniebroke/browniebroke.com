const slugify = require('slugify')

function makeUrlFrom(prefix, slug) {
  // Remove the date prefix from the slug
  const matches = slug.match(/\/\d{4}-\d{2}-\d{2}-(.*)\//)
  const dateLessSlug = matches[1]
  return `/${prefix}/${dateLessSlug}/`
}

exports.makePostUrl = (slug) => makeUrlFrom('blog', slug)
exports.makeTagUrl = (tagName) => `/blog/tags/${slugify(tagName)}`
exports.makeTILUrl = (slug) => makeUrlFrom('tils', slug)
