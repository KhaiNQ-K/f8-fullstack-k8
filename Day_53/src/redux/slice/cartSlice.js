import { STORAGE_KEY } from '@/utils/storage-key';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  cartList: JSON.parse(localStorage.getItem(STORAGE_KEY.CART_INFO)) || [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, { payload: product }) {
      const { cartList } = state;
      let productIdx = cartList.findIndex((cart) => cart._id === product._id);
      if (productIdx !== -1) {
        cartList[productIdx].orderQuantity++;
      } else {
        productIdx =
          cartList.push({
            ...product,
            orderQuantity: 1,
          }) - 1;
      }
      const updateProduct = cartList[productIdx];
      updateProduct.quantity--;
      updateProduct.totalPrice = updateProduct.price * updateProduct.orderQuantity;
    },
    removeCart(state, { payload }) {
      state.cartList = state.cartList.filter((cart) => cart._id !== payload._id);
    },
    updateQuantity(state, { payload }) {
      const { _id, quantity, invetory } = payload;
      const product = state.cartList.find((item) => item._id === _id);
      if (product) {
        product.orderQuantity = quantity;
        product.quantity += invetory;
        product.totalPrice = product.orderQuantity * product.price;
      }
    },
    checkout(state) {
      state.cartList = [];
    },
  },
});
export const { addCart, removeCart, updateQuantity, checkout } = cartSlice.actions;
export const getTotalPrice = (state) =>
  state.cart.cartList.reduce((total, product) => total + product.totalPrice, 0);
export const getOrderQuantity = (state) =>
  state.cart.cartList.reduce((quantity, product) => product.orderQuantity + quantity, 0);
export default cartSlice;
