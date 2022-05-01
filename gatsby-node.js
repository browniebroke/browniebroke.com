const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

const { makePostUrl, makeTagUrl, makeTILUrl } = require('./src/utils/routes')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Run query to get data
  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/.*/src/posts/.*/g" } }
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
      tils: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/.*/src/tils/.*/g" } }
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
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: post.node.fields.slug,
        previous: post.previous,
        next: post.next,
      },
    })
  })

  // Create TIL pages
  const tilsArray = result.data.tils.edges
  tilsArray.forEach((tilObj) => {
    actions.createPage({
      path: makeTILUrl(tilObj.node.fields.slug),
      component: path.resolve(`./src/templates/til.tsx`),
      context: {
        slug: tilObj.node.fields.slug,
        previous: tilObj.previous,
        next: tilObj.next,
      },
    })
  })

  // Create tag pages
  const tagsArray = result.data.tags.group
  tagsArray.forEach((tagObj) => {
    actions.createPage({
      path: makeTagUrl(tagObj.tag),
      component: path.resolve(`./src/templates/tag_page.tsx`),
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
