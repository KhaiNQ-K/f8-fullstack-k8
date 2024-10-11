import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import { cartMiddleware } from './cartMiddleware';
export const rootReducer = {
  cart: cartSlice.reducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (mw) => mw().concat(cartMiddleware),
});
export default store;
