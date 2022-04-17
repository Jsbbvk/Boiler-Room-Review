import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { userSignUp, userSelector } from '../../store/slices/userSlice'

export default function SignUp() {
  const dispatch = useDispatch()
  const { error } = useSelector(userSelector)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
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

  useEffect(() => {
    console.log(error)
  }, [error])

  const onSignUp = async () => {
    if (!username || !password || !passwordConfirm || !email) return

    const res = await dispatch(userSignUp({ username, password, email }))
    if (!res.error) navigate('/', { replace: true })
    // else error

    // const [error, res] = await to(signUp(username, email, password))

    // if (error) {
    //   console.log(error)
    //   return
    // }

    // if (res) {
    //   const [err, data] = await to(
    //     axios({
    //       method: 'get',
    //       url: `${process.env.REACT_APP_SERVER_URL}/user`,
    //       withCredentials: true,
    //     })
    //   )
    //   console.log(err, data)

    //   navigate('/', { replace: true })
    // }
  }

  const onUsernameChange = (e) => {
    const name = e.target.value.trim()
    setUsername(name)
  }

  const onPasswordChange = (e) => {
    const pass = e.target.value.trim()
    setpassword(pass)
  }

  const onPasswordConfirmChange = (e) => {
    const pass = e.target.value.trim()
    setPasswordConfirm(pass)
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
          onChange={onPasswordChange}
          value={password}
          autoComplete="off"
        />
        <TextField
          type="password"
          label="Re-enter password"
          onChange={onPasswordConfirmChange}
          value={passwordConfirm}
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
