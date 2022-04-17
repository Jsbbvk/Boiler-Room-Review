import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import {
  Main,
  ViewReview,
  AllReviews,
  Login,
  SignUp,
  LeaveReview,
} from './views'
import { store } from './store'

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/review" element={<LeaveReview />} />
            <Route exact path="/review/:reviewId" element={<ViewReview />} />
            <Route exact path="/reviews" element={<AllReviews />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="*" element={<h5>404</h5>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
