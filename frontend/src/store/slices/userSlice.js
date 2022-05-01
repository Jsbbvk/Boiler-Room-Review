/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkAuth, login, logout, signUp } from '../../utils/auth'

export const userLogin = createAsyncThunk('user/login', async (data) => {
  const res = await login(data)
  console.log(res.data)
  return res.data
})

export const userSignUp = createAsyncThunk('user/signUp', async (data) => {
  const res = await signUp(data)
  console.log(res.data)
  return res.data
})

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async () => {
    const res = await checkAuth()
    return res.data
  }
)

export const userLogout = createAsyncThunk('user/logout', async () => {
  await logout()
})

const initialState = {
  id: '',
  username: '',
  loading: false,
  error: null,
}

const setLoading = (loading) => (state) => Object.assign(state, { loading })
const setError = (state, action) =>
  Object.assign(state, { error: action.error, loading: false })

const setUser = (state, action) => {
  console.log(action)
  return Object.assign(state, {
    loading: false,
    error: null,
    id: action.payload.userId || '',
    username: action.payload.username || '',
  })
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: setLoading(true),
    [userLogin.fulfilled]: setUser,
    [userLogin.rejected]: setError,
    [userSignUp.pending]: setLoading(true),
    [userSignUp.fulfilled]: setUser,
    [userSignUp.rejected]: setError,
    [checkUserAuth.pending]: setLoading(true),
    [checkUserAuth.fulfilled]: setUser,
    [checkUserAuth.rejected]: setError,
    [userLogout.pending]: setLoading(true),
    [userLogout.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        id: '',
        username: '',
      })
    },
    [userLogout.rejected]: setError,
  },
})

export const userSelector = (state) => state.user

export default userSlice.reducer
