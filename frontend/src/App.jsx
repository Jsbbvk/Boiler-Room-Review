import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Main from './Views/Main'

function App() {
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    typography: {
      button: { textTransform: 'none' },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}

export default App
