import { authApi } from '@/api/authApi';
import { STORAGE_KEY } from '@/utils/storage-key';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentUser: JSON.parse(localStorage.getItem(STORAGE_KEY.USER_INFO)) || {},
  status: 'idle',
};
export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authApi.login(payload.email);
    if (response.code !== 200) {
      return rejectWithValue('Error');
    }
    const apiKey = response.data.apiKey;
    localStorage.setItem(STORAGE_KEY.API_KEY, JSON.stringify({ apiKey }));
    localStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify({ email: payload.email }));
    return payload;
  } catch (err) {
    console.log(err);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
      state.currentUser = action.payload;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
