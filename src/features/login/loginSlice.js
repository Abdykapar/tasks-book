import { createSlice } from '@reduxjs/toolkit'
import cookie from 'js-cookie'
const token = cookie.get('token') ? JSON.parse(cookie.get('token')) : ''

const initialState = {
  token
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      cookie.set('token', JSON.stringify(action.payload), { expires: 1, path: '/' })
    },
    logout: state => {
      state.token = ''
      cookie.remove('token')
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, logout } = loginSlice.actions

export default loginSlice.reducer