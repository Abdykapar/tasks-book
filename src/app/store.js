import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
  reducer: {
      tasks: tasksReducer,
      login: loginReducer
  },
})