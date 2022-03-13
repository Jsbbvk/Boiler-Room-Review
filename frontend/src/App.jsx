import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Main, ViewReview } from './Views'

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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/review/:reviewId" element={<ViewReview />} />
          <Route path="*" element={<h5>404</h5>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
