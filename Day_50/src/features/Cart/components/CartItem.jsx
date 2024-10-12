import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function CartItem({ cart }) {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      borderBottom="1px solid #ccc"
      p={2}
    >
      <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>{cart.name}</Typography>
      <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>{cart.orderQuantity}</Typography>
      <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>{cart.quantity}</Typography>
      <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>{cart.totalPrice}</Typography>
    </Stack>
  );
}

CartItem.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default CartItem;
