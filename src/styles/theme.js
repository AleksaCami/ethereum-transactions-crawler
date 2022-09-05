import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.600',
        color: 'white',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400'),
      },
      // styles for the `a`
      a: {
        color: 'gray.700',
        _hover: {
          textDecoration: 'underline',
        },
      },
      th: {
        color: ''
      }
    },
  },
});

export default theme;