import { extendTheme } from '@chakra-ui/react'
const customTheme = {
  styles: {
    global: {
      html: {
        fontSize: '1.25rem',
        lineHeight: '1.5',
        overflowY: 'scroll',
      },
      main: {
        flex: '1 0 auto',
      },
      p: {
        margin: '0 0 1.4rem 0',
      },
      a: {
        color: 'inherit',
        '&:hover, &:active': {
          color: 'blue.400',
        },
      },
      'h1, h2, h3, h4, h5, h6': {
        lineHeight: '1.2',
        marginBottom: '1.4rem',
      },
    },
  },
}

export const theme = extendTheme(customTheme)
