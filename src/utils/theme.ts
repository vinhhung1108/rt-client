import { Roboto } from 'next/font/google'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
export let theme = createTheme({
  palette: {
    primary: {
      main: '#ff6464',
    },
    secondary: {
      main: '#00A8CC',
      light: '#EDF7FA',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#21243D',
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
    fontFamily: 'Heebo, sans-serif',
  },
  components: {
    // MuiContainer: {
    //   defaultProps: {
    //     maxWidth: 'md',
    //   },
    //   styleOverrides: {
    //     maxWidthMd: {
    //       maxWidth: '860px',
    //       '@media (min-width: 900px)': {
    //         maxWidth: '860px',
    //       },
    //     },
    //     maxWidthSm: {
    //       maxWidth: '680px',
    //       '@media (min-width: 600px)': {
    //         maxWidth: '680px',
    //       },
    //     },
    //   },
    // },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: 'secondary.main',
          '&:hover, &.active': {
            color: '#556cd6',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white', //If button have varient === contained && color === primary => force color to white
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2,
        },
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: '#ffffff',
            backgroundColor: '#142850',
            fontWeight: 'bold',
            fontSize: '16px',
          },
        },
      ],
    },
  },
})

theme = responsiveFontSizes(theme)
