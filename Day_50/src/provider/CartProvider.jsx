import useStorage from '@/hooks/useStorage';
import { STORAGE_KEY } from '@/utils/storage-key';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart, resetCart] = useStorage(STORAGE_KEY.CART, []);
  const addToCart = (product) => {
    setCart((cart) => {
      const newCart = [...cart];
      const productCart = newCart.find((x) => x._id === product._id);
      if (productCart) {
        productCart.orderQuantity++;
      } else {
        newCart.push({ ...productCart, orderQuantity: 1 });
      }
      productCart.totalPrice = productCart.orderQuantity * productCart.price;
      return newCart;
    });
  };

  const removeCart = (id) => {
    setCart((cart) => {
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
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, addToCart, resetCart, removeCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
