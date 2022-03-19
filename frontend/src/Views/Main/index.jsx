import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import to from 'await-to-js'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

export default function Main() {
  const { isLoading, isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('isAuth:', isAuth)
    if (!isAuth && !isLoading) {
      // navigate only after done loading
      navigate('/login')
    } else if (isAuth && !isLoading) {
      // TODO remove this. change to use redux
      ;(async () => {
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
        console.log(user)
      })()
    }
  }, [isAuth, isLoading, navigate])

  return (
    <Container sx={{ py: 5 }}>
      <Link to="/reviews">View all reviews</Link>
    </Container>
  )
}
