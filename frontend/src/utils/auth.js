import axios from 'axios'

export const checkAuth = () =>
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER_URL}/user`,
    withCredentials: true,
  })

export const login = ({ username, password }) =>
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
    data: {
      username,
      password,
    },
    withCredentials: true,
  })

export const signUp = ({ username, email, password }) =>
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/user/signup`,
    data: {
      username,
      password,
      email,
    },
    withCredentials: true,
  })

export const logout = () =>
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/user/logout`,
    withCredentials: true,
  })
