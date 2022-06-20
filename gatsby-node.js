const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

const { makePostUrl, makeTagUrl, makeTILUrl } = require('./src/utils/routes')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Run query to get data
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
              sourceName
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

  const mdFiles = result.data.allMarkdownRemark.edges
  mdFiles.forEach((mdFile) => {
    if (mdFile.node.fields.sourceName === 'posts') {
      // Create blog post page
      actions.createPage({
        path: makePostUrl(mdFile.node.fields.slug),
        component: path.resolve(`./src/templates/post.tsx`),
        context: {
          slug: mdFile.node.fields.slug,
          previous: mdFile.previous,
          next: mdFile.next,
        },
      })
    } else if (mdFile.node.fields.sourceName === 'tils') {
      // Create TIL page
      actions.createPage({
        path: makeTILUrl(mdFile.node.fields.slug),
        component: path.resolve(`./src/templates/til.tsx`),
        context: {
          slug: mdFile.node.fields.slug,
          previous: mdFile.previous,
          next: mdFile.next,
        },
      })
    }
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
    // Add slug field
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Add sourceName field
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: 'sourceName',
      value: fileNode.sourceInstanceName,
    })
  }
}
