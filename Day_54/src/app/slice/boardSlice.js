import { taskApi } from '@/api/taskApi';
import { STORAGE_KEY } from '@/utils/storage-key';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const initialState = {
  columnOrderedIds: [],
  taskOrderedIds: [],
  tasks: JSON.parse(localStorage.getItem(STORAGE_KEY.TASK)) || [],
  columns: JSON.parse(localStorage.getItem(STORAGE_KEY.COLUMNS)) || [],
  status: 'idle',
};
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },
    addColumn(state, action) {
      state.columns.push(action.payload);
    },
    removeColumn(state, action) {
      const id = action.payload;
      state.columns = state.columns.filter((column) => column._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      const { tasks, columns } = payload;
      state.tasks = tasks;
      state.columns = columns;
      state.status = 'idle';
    });
    // builder.addCase(saveTaskAsync);
  },
});
export const getTasks = createAsyncThunk('board/getTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await taskApi.getTask();
    if (response.code !== 200) {
      return rejectWithValue('Error');
    }
    const { tasks, columns } = response.data;

    localStorage.setItem(STORAGE_KEY.COLUMNS, JSON.stringify(columns));
    localStorage.setItem(STORAGE_KEY.TASK, JSON.stringify(tasks));
    return { tasks, columns };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch task');
  }
});
export const saveTaskAsync = createAsyncThunk('board/saveTaskAsync', async (payload) => {
  try {
    const response = await taskApi.upsertTask(payload);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add task');
  }
});
export const updateTaskAsync = createAsyncThunk('board/updateTaskAsync', async (payload) => {
  try {
    const response = await taskApi.upsertTask(payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task' + error);
  }
});
export const {
  addColumn,
  addTask,
  removeColumn,
  removeTask,
  setColumnOrderedIds,
  setTaskOrderedIds,
} = boardSlice.actions;
const { reducer } = boardSlice;
export default reducer;
