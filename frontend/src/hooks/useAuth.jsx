import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkUserAuth,
  userLogout,
  userSelector,
} from '../store/slices/userSlice'

export default function useAuth() {
  const { username, id, error } = useSelector(userSelector)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (error) navigate('/login')
  }, [error, navigate])

  const logout = async () => {
    setIsLoggingOut(true)
    await dispatch(userLogout())

    navigate('/login')
  }

  useEffect(() => {
    if (isLoggingOut) return
    setIsLoading(true)
    ;(async () => {
      // pull from redux store first
      if (username && id) {
        setIsAuth(true)
        return
      }

      // Otherwise try to get user credentials from server
      await dispatch(checkUserAuth())
      setIsLoading(false)
    })()
  }, [username, id, dispatch, isLoggingOut])

  return { isLoading, isAuth, logout }
}
