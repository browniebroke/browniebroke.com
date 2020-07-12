const { createFilePath } = require(`gatsby-source-filesystem`)

const { makePostUrl, makeTagUrl } = require('./src/utils/routes')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Run query to get data
  const result = await graphql(`
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
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
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
  `)

  if (result.errors) {
    reporter.panic(`Error in GraphQL query to create pages`)
    return
  }

  // Create blog posts pages.
  const posts = result.data.posts.edges

  posts.forEach((post) => {
    actions.createPage({
      path: makePostUrl(post.node.fields.slug),
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug: post.node.fields.slug,
        previous: post.previous,
        next: post.next,
      },
    })
  })

  // Create tag pages
  const tagsArray = result.data.tags.group

  tagsArray.forEach((tagObj) => {
    actions.createPage({
      path: makeTagUrl(tagObj.tag),
      component: require.resolve(`./src/templates/tag_page.js`),
      context: {
        tag: tagObj.tag,
      },
    })
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
