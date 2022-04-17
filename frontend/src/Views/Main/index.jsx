import { Box, Button, Container } from '@mui/material'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'

export default function Main() {
  const { isLoading, isAuth, logout } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
