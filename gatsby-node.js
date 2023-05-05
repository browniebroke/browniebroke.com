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

  createAllPages(
    actions,
    result.data.posts.edges,
    'posts',
    `./src/templates/post.tsx`,
    makePostUrl
  )

  createAllPages(
    actions,
    result.data.posts.edges,
    'tils',
    `./src/templates/til.tsx`,
    makeTILUrl
  )

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

// Create all pages of a given kind
const createAllPages = (
  actions,
  allMdFiles,
  sourceName,
  templatePath,
  urlMaker
) => {
  const templateFile = path.resolve(templatePath)
  const relevantMdFiles = allMdFiles.filter(
    (mdFile) => mdFile.node.fields.sourceName === sourceName
  )
  relevantMdFiles.forEach((mdFile, index) => {
    // Get all the relevant data
    // files are sorted by most recent first, so:
    // - index 0 has no "next"
    const next = index === 0 ? null : relevantMdFiles[index - 1].node
    // - last post has no "previous"
    const previous =
      index === relevantMdFiles.length - 1
        ? null
        : relevantMdFiles[index + 1].node
    // Create URL path from slug
    const postPath = urlMaker(mdFile.node.fields.slug)
    const component = `${templateFile}?__contentFilePath=${mdFile.node.internal.contentFilePath}`

    // Create a single page
    actions.createPage({
      path: postPath,
      component: component,
      context: {
        slug: mdFile.node.fields.slug,
        previous: previous,
        next: next,
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
