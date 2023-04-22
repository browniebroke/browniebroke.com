const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const readingTime = require(`reading-time`)

const { makePostUrl, makeTagUrl, makeTILUrl } = require('./src/utils/routes')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Run query to get data
  const result = await graphql(`
    {
      posts: allMdx(sort: { frontmatter: { date: DESC } }) {
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
            internal {
              contentFilePath
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
      tags: allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`Error in GraphQL query to create pages`)
    return
  }

  const postTemplate = path.resolve(`./src/templates/post.tsx`)
  const tilTemplate = path.resolve(`./src/templates/til.tsx`)

  const mdFiles = result.data.posts.edges
  mdFiles.forEach((mdFile) => {
    if (mdFile.node.fields.sourceName === 'posts') {
      // Create blog post page
      actions.createPage({
        path: makePostUrl(mdFile.node.fields.slug),
        component: postTemplate,
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
        component: tilTemplate,
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

  if (node.internal.type === `Mdx`) {
    // Add slug field
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Add sourceName field - adapted from:
    // https://github.com/elboman/gatsby-remark-source-name
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: 'sourceName',
      value: fileNode.sourceInstanceName,
    })

    // Add reading time
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    })
  }
}
