import axios from 'axios'
import { useEffect, useState } from 'react'
import to from 'await-to-js'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // pull from redux store first
      const [err, res] = await to(
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/user`,
          withCredentials: true,
        })
      )
      setIsLoading(false)

      if (err && err.response.status !== 200) {
        navigate('/login')
      } else if (res) {
        const {
          data: { user },
        } = res
        // set user in redux store
        console.log(user)
        setIsAuth(true)
      }
    })()
  }, [navigate])

  return { isLoading, isAuth }
}
