import { Box, Button, Container } from '@mui/material'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import to from 'await-to-js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { userLogout } from '../../store/slices/userSlice'

export default function Main() {
  const { isLoading, isAuth } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) return
    ;(async () => {
      // TODO remove this. change to use redux
      const [error, res] = await to(
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/user`,
          withCredentials: true,
        })
      )
      // handle error
      if (error) return console.log(error)
      const {
        data: { user },
      } = res
    })()
  }, [isAuth])

  const logout = async () => {
    await dispatch(userLogout())

    navigate('/login')
  }

  return (
    <Container sx={{ py: 5 }}>
      <Link to="/review">Leave a review</Link>
      <br />
      <Link to="/reviews">View all reviews</Link>

      <Box>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  )
}
