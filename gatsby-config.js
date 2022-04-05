const { makePostUrl } = require('./src/utils/routes')

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.REVIEW_ID
    ? `https://deploy-preview-${process.env.REVIEW_ID}--browniebroke.netlify.app`
    : `https://browniebroke.com`

const gaTrackingId =
  process.env.NODE_ENV === 'development' || process.env.REVIEW_ID
    ? 'G-xxx'
    : 'G-DLGHEH0LX2'

console.log('==== process.env ====')
console.table(process.env)

module.exports = {
  siteMetadata: {
    title: `browniebroke.com`,
    description: `Bruno Alla's blog - about programming, and other random things that interest me.`,
    author: `Bruno Alla`,
    siteUrl: baseUrl,
    social: {
      github: `browniebroke`,
      gitlab: `browniebroke`,
      medium: `brunoalla`,
      stackoverflow: `2261637`,
      twitter: `_BrunoAlla`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Abyss',
              extensions: ['toml'],
            },
          },
          `gatsby-remark-smartypants`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          gaTrackingId, // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const postPath = makePostUrl(edge.node.fields.slug)
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}${postPath}`,
                  guid: `${site.siteMetadata.siteUrl}${postPath}`,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { fields: [frontmatter___date], order: DESC },
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
            `,
            output: '/rss.xml',
            title: "Bruno Alla's blog RSS feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bruno Alla's Blog`,
        short_name: `Browniebroke`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#666666`,
        display: `fullscreen`,
        icon: `src/assets/avatar.jpg`,
        icons: [
          {
            src: 'src/assets/avatar.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          'script-src':
            "'self' 'unsafe-inline' data: www.google-analytics.com www.googletagmanager.com",
          'style-src': `'self' 'unsafe-inline'`,
          'img-src': `'self' data: www.google-analytics.com`,
          // 'default-src': `'self'`,
          'connect-src': `'self' www.google-analytics.com`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // https://github.com/gatsbyjs/gatsby/issues/31167
        output: '/',
        resolveSiteUrl: () => baseUrl,
        serialize: (page, tools) => {
          const getPriority = (pagePath) => {
            if (pagePath === '/') {
              return 1
            }
            if (pagePath.includes('/blog/tags/')) {
              return 0.5
            }
            return 0.8
          }
          return {
            url: `${baseUrl}${page.path}`,
            changefreq: `monthly`,
            priority: getPriority(tools.resolvePagePath(page)),
          }
        },
      },
    },
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            // Opt-out of Google's FLoC
            'Permissions-Policy: interest-cohort=()',
            // The CSP is generated by gatsby-plugin-csp and added to the _headers file in public/ before publish.
            // That is handled by the build script which executes csp-util.js, which looks for the token below.
            'Content-Security-Policy: __REPLACE_ME__',
          ],
        },
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
      },
    },
  ],
}
