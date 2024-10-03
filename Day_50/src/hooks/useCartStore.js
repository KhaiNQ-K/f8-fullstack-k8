import { CartContext } from '@/provider/CartProvider';
import { useContext } from 'react';

export const useCartStore = () => {
  return useContext(CartContext);
};
