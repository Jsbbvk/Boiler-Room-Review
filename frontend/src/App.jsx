import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Main, ViewReview, AllReviews, Login, SignUp } from './Views'

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
          <Route exact path="/reviews" element={<AllReviews />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<h5>404</h5>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
