import { STORAGE_KEY } from '@/utils/storage-key';

export const cartMiddleware = (store) => (next) => (action) => {
  const { type } = next(action);
  if (type.startsWith('cart')) {
    localStorage.setItem(STORAGE_KEY.CART_INFO, JSON.stringify(store.getState().cart.cartList));
  }
  // return next(action);
};
