import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskList } from '../../api/service'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ({page , sort_field='', sort_direction=''}={}) => {
  return await taskList({ page, sort_field, sort_direction })
})

const initialState = {
  page: 1,
  total: 0,
  sortField: '',
  sortType: '',
  tasks: [],
  status: 'init'
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    nextPage: (state, action) => {
      state.page += 1
    },
    prevPage: (state, action) => {
      state.page -= 1
    },
    setSortType: (state, action) => {
      state.sortType = action.payload
    },
    setSortField: (state, action) => {
      state.sortField = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload.tasks
        state.total = action.payload.total_task_count
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

// Action creators are generated for each case reducer function
export const { nextPage, prevPage, setSortType, setSortField } = tasksSlice.actions

export default tasksSlice.reducer