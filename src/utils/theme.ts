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
        marginBottom: 4,
      },
      a: {
        color: 'inherit',
        '&:hover, &:active': {
          color: 'blue.400',
        },
      },
      'code[class*="language-"], pre[class*="language-"]': {
        fontSize: '0.85em !important',
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
