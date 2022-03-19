import axios from 'axios'
import { useEffect, useState } from 'react'
import to from 'await-to-js'

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  // pull from redux store first
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const [err, res] = await to(
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_URL}/user`,
          withCredentials: true,
        })
      )

      if (err && err.response.status !== 200) {
        setIsAuth(false)
      } else if (res) {
        const {
          data: { user },
        } = res
        console.log(user)
        setIsAuth(true)
      }

      setIsLoading(false)
    })()
  }, [])

  return { isLoading, isAuth }
}
