import axios from 'axios'

const UserClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
  timeout: 1000,
  withCredentials: true,
})

export const checkAuth = () => UserClient.get()

export const login = ({ username, password }) =>
  UserClient.post('/login', { username, password })

export const signUp = ({ username, email, password }) =>
  UserClient.post('/signup', { username, password, email })

export const logout = () => UserClient.post('/logout')
