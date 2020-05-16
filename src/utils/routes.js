const slugify = require('slugify')

exports.makePostUrl = (slug) => `/blog${slug}`

exports.makeTagUrl = (tagName) => `/blog/tags/${slugify(tagName)}`
