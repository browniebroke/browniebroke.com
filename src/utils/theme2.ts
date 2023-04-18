import { extendTheme } from '@chakra-ui/react'
const customTheme = {
  fonts: {
    body: 'Cabin Condensed, georgia, sans-serif',
    heading: 'Patua One',
  },
  styles: {
    global: {
      html: {
        fontFamily: 'Cabin Condensed, georgia, sans-serif',
        fontSize: '1.25rem',
        lineHeight: '1.5',
        overflowY: 'scroll',
      },
      main: {
        flex: '1 0 auto',
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
