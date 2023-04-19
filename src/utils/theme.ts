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
    },
  },
  components: {
    Heading: {
      baseStyle: {
        marginBottom: 4,
        lineHeight: '1.2',
      },
    },
  },
}

export const theme = extendTheme(customTheme)
