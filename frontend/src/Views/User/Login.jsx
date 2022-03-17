import { useEffect, useState } from 'react'
import axios from 'axios'
import to from 'await-to-js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    console.log(username, password)
    if (!username || !password) return
    console.log('sent request')
    const [error, res] = await to(
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
        params: {
          username,
          password,
        },
      })
    )
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
    <div>
      <p>username</p>
      <input type="text" onChange={onUsernameChange} />

      <p>password</p>
      <input type="password" onChange={onPasswordChange} />

      <button type="button" onClick={onLogin}>
        login
      </button>
    </div>
  )
}