function serializeToFeed(site, allMarkdownRemark, makeUrl) {
  return allMarkdownRemark.edges.map((edge) => {
    const pageUrl = makeUrl(edge.node.fields.slug)
    return Object.assign({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      date: edge.node.frontmatter.date,
      url: `${site.siteMetadata.siteUrl}${pageUrl}`,
      guid: `${site.siteMetadata.siteUrl}${pageUrl}`,
      custom_elements: [{ 'content:encoded': edge.node.html }],
    })
  })
}

function makeQueryFor(sourceName) {
  return `
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fields: { sourceName: { eq: "${sourceName}" } } }
      ) {
        edges {
          node {
            fields { 
              slug 
            }
            excerpt
            html
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `
}

exports.makeQueryFor = makeQueryFor
exports.serializeToFeed = serializeToFeed
