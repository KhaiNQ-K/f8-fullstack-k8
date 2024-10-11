import CartItem from '@/components/Product/CartItem';
import { checkout, getTotalPrice } from '@/redux/slice/cartSlice';
import { convertCurrency } from '@/utils';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ProductCart() {
  const cartList = useSelector((state) => state.cart.cartList);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    dispatch(checkout());
    toast.success('Thanh toán thành công 🎉🎉😍😍');
  };
  return (
    <Container maxWidth="md">
      <Typography
        component={'h1'}
        variant="h4"
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
      >
        Shopping Cart
      </Typography>
      {cartList.length > 0 ? (
        <Stack mt={5} gap={2}>
          {cartList.map((cart) => (
            <CartItem key={cart._id} cart={cart} />
          ))}
        </Stack>
      ) : (
        <Typography component="h3" variant="h6" textAlign="center">
          Chưa có sản phẩm nào
        </Typography>
      )}
      <Box textAlign="center" my={4}>
        <Typography variant="h4">Total Price: {convertCurrency(totalPrice)}</Typography>
        <Box className="flex items-center mt-4">
          <Button
            className="w-1/3 hover:bg-yellow-600"
            sx={{ bgcolor: '#facc15', color: '#333', borderRadius: '4px 0 0 4px' }}
          >
            Go home
          </Button>
          <Button
            className="hover:bg-green-700"
            sx={{ bgcolor: '#16a34a', color: '#333', flex: 1, borderRadius: '0 4px 4px 0' }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

ProductCart.propTypes = {};

export default ProductCart;
