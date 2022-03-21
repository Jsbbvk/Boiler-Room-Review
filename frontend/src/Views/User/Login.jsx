import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'

export default function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFail = (e) => {
    alert(e)
  }

  const onLogin = async () => {
    if (!username || !password) return
    const [error, res] = await to(
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
        data: {
          username,
          password,
        },
        withCredentials: true,
      })
    )
    if (res) {
      console.log(res)
      navigate(-1, { replace: true })
    } else {
      const errorDescription = error.response.data.error
      onFail(errorDescription)
    }
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
