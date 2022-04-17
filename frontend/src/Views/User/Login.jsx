import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userSelector } from '../../store/slices/userSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector(userSelector)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFail = (e) => {
    alert(e)
  }

  const onLogin = async () => {
    if (!username || !password) return
    const res = await dispatch(userLogin({ username, password }))

    // able to navigate after
    if (res.error) return

    navigate(-1, { replace: true })
  }

  const onUsernameChange = (e) => {
    const name = e.target.value.trim()
    setUsername(name)
  }

  const onPasswordChange = (e) => {
    const pass = e.target.value.trim()
    setPassword(pass)
  }

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h6">Login</Typography>
      <Stack sx={{ width: '500px', mt: 2 }} spacing={2}>
        <TextField
          label="username"
          onChange={onUsernameChange}
          value={username}
          autoComplete="off"
        />
        <TextField
          label="password"
          type="password"
          onChange={onPasswordChange}
          value={password}
          autoComplete="off"
        />
        <Button
          variant="contained"
          onClick={onLogin}
          sx={{ width: 'fit-content' }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/signup')}
          sx={{ width: 'fit-content' }}
        >
          Create account
        </Button>
      </Stack>
    </Container>
  )
}
