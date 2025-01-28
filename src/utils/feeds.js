function serializeToFeed(site, allMdx, makeUrl) {
  return allMdx.edges.map((edge) => {
    const pageUrl = makeUrl(edge.node.fields.slug);
    return Object.assign({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      date: edge.node.frontmatter.date,
      url: `${site.siteMetadata.siteUrl}${pageUrl}`,
      guid: `${site.siteMetadata.siteUrl}${pageUrl}`,
    });
  });
}

function makeQueryFor(sourceName) {
  return `
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { fields: { sourceName: { eq: "${sourceName}" } } }
      ) {
        edges {
          node {
            fields { 
              slug 
            }
            excerpt
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `;
}

exports.makeQueryFor = makeQueryFor;
exports.serializeToFeed = serializeToFeed;
