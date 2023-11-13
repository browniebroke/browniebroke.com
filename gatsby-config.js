const { makePostUrl, makeTILUrl } = require('./src/utils/routes')
const { serializeToFeed, makeQueryFor } = require('./src/utils/feeds')

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.REVIEW_ID
      ? `https://deploy-preview-${process.env.REVIEW_ID}--browniebroke.netlify.app`
      : `https://browniebroke.com`

const gaTrackingId =
  process.env.PRODUCTION_DEPLOY === 'true' ? 'G-DLGHEH0LX2' : 'G-xxx'

module.exports = {
  // To debug SSR issues, uncomment the following lines:
  // flags: {
  //   DEV_SSR: true,
  // },
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
        path: `${__dirname}/src/tils`,
        name: `tils`,
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
          `gatsby-remark-prismjs`,
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
            serialize: ({ query: { site, allMdx } }) =>
              serializeToFeed(site, allMdx, makePostUrl),
            query: makeQueryFor('posts'),
            output: '/rss.xml',
            title: "Bruno Alla's blog RSS feed",
          },
          {
            serialize: ({ query: { site, allMdx } }) =>
              serializeToFeed(site, allMdx, makeTILUrl),
            query: makeQueryFor('tils'),
            output: '/tils.xml',
            title: "Bruno Alla's TIL feed",
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
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
        isBaseProvider: false,
      },
    },
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
