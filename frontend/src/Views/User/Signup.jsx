import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'

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

  const onSignup = async () => {
    if (!username || !password1 || !password2 || !email) return
    console.log(process.env.REACT_APP_SERVER_URL)
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
    if (res) {
      // navigate('/reviews')
      const [err, data] = await to(
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/user`,
          withCredentials: true,
        })
      )
      console.log(err, data)
    } else {
      console.log(error)
      // const errorDescription = error.response.data.error
      // switch (errorDescription) {
      //   case 'Username already in use':
      //     usernameInUse(error)
      //     break
      //   case 'Passwords Do Not Match':
      //     console.log('adsfasdfsdf')
      //     passwordsMatch(error)
      //     break
      //   case 'Email already in use':
      //     emailInUse(error)
      //     break
      //   case 'Invalid Email':
      //     invalidEmail(error)
      //     break
      //   default:
      //     generalError()
      // }
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
    <div>
      <p>username</p>
      <input type="text" onChange={onUsernameChange} />

      <p>password</p>
      <input type="password" onChange={onPassword1Change} />

      <p>Re-Enter Password</p>
      <input type="password" onChange={onPassword2Change} />

      <p>email</p>
      <input type="text" onChange={onEmailChange} />

      <button type="button" onClick={onSignup}>
        Sign Up
      </button>
    </div>
  )
}
