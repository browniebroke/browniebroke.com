import { extendTheme } from '@chakra-ui/react'
const customTheme = {
  fonts: {
    body: 'Cabin Condensed, georgia, sans-serif',
    heading: 'Patua One',
  },
  styles: {
    global: {
      html: {
        fontSize: '1.25rem',
        letterSpacing: '.03em',
        lineHeight: '1.5',
        overflowY: 'scroll',
      },
      p: {
        marginTop: 4,
        marginBottom: 4,
      },
      li: {
        p: {
          marginTop: 1,
          marginBottom: 1,
        },
      },
      a: {
        color: 'blue.600',
        '&:hover, &:active': {
          color: 'blue.300',
        },
        '&.inherit-color': {
          color: 'inherit',
          '&:hover, &:active': {
            color: 'blue.300',
          },
        },
      },
      // Syntax highlighting for code snippets w/ prismjs
      'code[class*="language-"], pre[class*="language-"]': {
        fontSize: '0.85em !important',
      },
      '.gatsby-highlight': {
        marginBottom: 4,
      },
      '.gatsby-highlight-code-line': {
        backgroundColor: 'orange.100',
        display: 'block',
        marginRight: '-1e',
        marginLeft: '-1e',
        paddingRight: '1e',
        paddingLeft: '0.75e',
        borderLeft: '0.25em solid',
        borderColor: 'orange.300',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        marginTop: 8,
        marginBottom: 4,
        lineHeight: '1.2',
        fontWeight: 'bold',
      },
    },
  },
}

export const theme = extendTheme(customTheme)
