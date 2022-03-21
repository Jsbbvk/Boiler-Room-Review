import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'

export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')

  const usernameInUse = (e) => {
    alert(e.response.data.error)
  }

  const passwordsMatch = (e) => {
    alert(e.response.data.error)
  }

  const emailInUse = (e) => {
    alert(e.response.data.error)
  }

  const invalidEmail = (e) => {
    alert(e.response.data.error)
  }

  const generalError = (e) => {
    alert('Something went wrong')
  }

  const onSignUp = async () => {
    if (!username || !password1 || !password2 || !email) return

    const [error, res] = await to(
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        data: {
          username,
          password: password1,
          email,
        },
        withCredentials: true,
      })
    )

    if (error) {
      console.log(error)
      return
    }

    if (res) {
      const [err, data] = await to(
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/user`,
          withCredentials: true,
        })
      )
      console.log(err, data)

      navigate('/', { replace: true })
    }
  }

  const onUsernameChange = (e) => {
    const name = e.target.value.trim()
    setUsername(name)
  }

  const onPassword1Change = (e) => {
    const pass = e.target.value.trim()
    setPassword1(pass)
  }

  const onPassword2Change = (e) => {
    const pass = e.target.value.trim()
    setPassword2(pass)
  }

  const onEmailChange = (e) => {
    const pass = e.target.value.trim()
    setEmail(pass)
  }

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h6">Sign up</Typography>
      <Stack sx={{ mt: 2, width: '500px' }} spacing={2}>
        <TextField
          label="Username"
          onChange={onUsernameChange}
          value={username}
          autoComplete="off"
        />
        <TextField
          label="Password"
          type="password"
          onChange={onPassword1Change}
          value={password1}
          autoComplete="off"
        />
        <TextField
          type="password"
          label="Re-enter password"
          onChange={onPassword2Change}
          value={password2}
          autoComplete="off"
        />
        <TextField
          label="Email"
          onChange={onEmailChange}
          value={email}
          autoComplete="off"
        />
        <Button
          variant="contained"
          sx={{ width: 'fit-content' }}
          onClick={onSignUp}
        >
          Sign up
        </Button>
      </Stack>
    </Container>
  )
}
