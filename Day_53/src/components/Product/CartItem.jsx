import { removeCart, updateQuantity } from '@/redux/slice/cartSlice';
import { convertCurrency } from '@/utils';
import { Add as AddIcon, Delete as DeleteIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
function CartItem({ cart }) {
  const dispatch = useDispatch();
  const handlePlusCart = () => {
    const payload = {
      _id: cart._id,
      quantity: cart.orderQuantity + 1,
      invetory: 1,
    };
    dispatch(updateQuantity(payload));
  };
  const handleMinusCart = () => {
    const payload = {
      _id: cart._id,
      quantity: cart.orderQuantity - 1,
      invetory: -1,
    };
    dispatch(updateQuantity(payload));
  };
  const handleRemoveItem = () => {
    if (!window.confirm('Bạn có muốn xoá sản phẩn này khỏi giỏ hàng?')) return;
    dispatch(removeCart(cart));
  };
  return (
    <Box className="border border-gray-400 p-4 rounded-lg">
      <Box className="flex gap-10">
        <Box
          component={'img'}
          src="https://picsum.photos/200?_id=t4yht5nia5MMi910su9i8b966shi88"
          width={160}
          height={100}
          borderRadius={2}
          display={'inline-block'}
        ></Box>
        <Box>
          <Box mt={6} mb={4}>
            <Typography component="span" className="text-red-800" fontSize={'1.1rem'} mr={3}>
              {cart.brand}
            </Typography>
            <Typography component="span" fontSize={'1.1rem'}>
              {cart.name}
            </Typography>
          </Box>
          <Typography component="span" variant="h5" fontWeight="bold">
            {convertCurrency(cart.price)}
          </Typography>
          <Typography component="p" mt={2} variant="h5" fontWeight="bold">
            Còn lại: {cart.quantity}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} mt={5}>
        <Box display="flex" justifyContent="center" alignItems="stretch" height={'25px'}>
          <IconButton
            sx={{ borderRadius: '2px', border: '1px solid #ccc', px: '0.5rem' }}
            onClick={handleMinusCart}
            disabled={cart.orderQuantity === 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography
            component="span"
            sx={{ borderRadius: '2px', border: '1px solid #ccc', px: '1rem' }}
            textAlign="center"
          >
            {cart.orderQuantity}
          </Typography>
          <IconButton
            sx={{ borderRadius: '2px', border: '1px solid #ccc', px: '0.5rem' }}
            onClick={handlePlusCart}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className="flex justify-center items-center">
          <Typography component="span" variant="h5" fontWeight="bold">
            Sum price: {convertCurrency(cart.totalPrice)}
          </Typography>
          <IconButton onClick={handleRemoveItem}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

CartItem.propTypes = {
  cart: PropTypes.object,
};

export default CartItem;
