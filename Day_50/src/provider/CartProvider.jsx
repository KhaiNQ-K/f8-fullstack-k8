import useStorage from '@/hooks/useStorage';
import { STORAGE_KEY } from '@/utils/storage-key';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList, resetCart] = useStorage(STORAGE_KEY.CART, []);
  const addToCart = (product) => {
    setCartList((cart) => {
      const newCart = [...cart];
      let productIdx = newCart.findIndex((x) => x._id === product._id);
      if (productIdx != -1) {
        newCart[productIdx].orderQuantity++;
        newCart[productIdx].quantity--;
      } else {
        productIdx = newCart.push({ ...product, orderQuantity: 1 }) - 1;
      }
      newCart[productIdx].totalPrice =
        newCart[productIdx].orderQuantity * newCart[productIdx].price;
      return newCart;
    });
  };

  const removeCart = (id) => {
    setCartList((cart) => {
      const newCart = [...cart];
      const index = newCart.findIndex((x) => x._id === id);
      if (index > -1) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };
  useEffect(() => {
    setLoading(false);
  }, [cartList]);
  return (
    <CartContext.Provider value={{ cartList, addToCart, resetCart, removeCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
