import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      purple: '#A16AE8',
      darkpurple: '#4120A9',
      neongreen: '#1DC690',
      purplehaze: '#FFF2FF',
      black: '#050505',
      gray: {
        background: '#fafafa', // #f1f5f9 - f1f5f9 - #FAFAFA
      },
      indigo: {
        light: '#EEF2FF',
        dark: '#4338CA',
      },
      blue: {
        pure: '#0069ff',
      },
    },
    secondary: {
      blue: {
        pure: '#0080ff',
      },
    },
    blue: {
      500: '#0069ff',
      600: '#0069ff',
    },
  },
})
