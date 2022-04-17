import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkUserAuth, userSelector } from '../store/slices/userSlice'

export default function useAuth() {
  const { username, id, error } = useSelector(userSelector)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) navigate('/login')
  }, [error, navigate])

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // pull from redux store first
      if (username && id) {
        setIsAuth(true)
        return
      }

      // Otherwise try to get user credentials from server
      await dispatch(checkUserAuth())
      // setIsLoading(false)

      // if (err && err.response.status !== 200) {
      //   navigate('/login')
      // } else if (res) {
      //   const {
      //     data: { user },
      //   } = res
      //   // set user in redux store
      //   console.log(user)
      //   setIsAuth(true)
      // }
    })()
  }, [username, id, dispatch])

  return { isLoading, isAuth }
}
