const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Basic function to generate URL from tags
function slugify(string) {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // Create pages for each post
  const blogPost = path.resolve(`./src/templates/post.js`)
  return graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
        tags: allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create tag pages
    const tagPage = path.resolve(`./src/templates/tag_page.js`)
    const tagsArray = result.data.tags.group

    tagsArray.forEach((tagObj, index) => {
      createPage({
        path: `tags/${slugify(tagObj.tag)}`,
        component: tagPage,
        context: {
          tag: tagObj.tag,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
