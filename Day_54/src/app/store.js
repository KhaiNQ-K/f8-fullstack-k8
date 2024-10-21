import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import boardReducer from './slice/boardSlice';
export const rootReducer = {
  auth: authReducer,
  board: boardReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (mw) => mw(),
});
export default store;
