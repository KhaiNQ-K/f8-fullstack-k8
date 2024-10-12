import { useCartStore } from '@/hooks/useCartStore';
import CartItem from './CartItem';

function CartList() {
  const { cartList } = useCartStore();

  return (
    <>
      {cartList.map((cart) => (
        <CartItem key={cart._id} cart={cart} />
      ))}
    </>
  );
}

CartList.propTypes = {};

export default CartList;
