import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CartList from './components/CartList';
import { toast } from 'react-toastify';
import { useCartStore } from '@/hooks/useCartStore';

function CartFeature() {
  const { resetCart } = useCartStore();
  const handleCheckout = () => {
    toast.success('Thanh toán thành công');
    resetCart();
  };
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          boxShadow: 2,
          mb: 4,
          borderRadius: '5px',
        }}
      >
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottom="1px solid #ccc"
          p={2}
          bgcolor="#ccc"
          borderRadius="5px 5px 0 0"
        >
          <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>Tên sản phẩm</Typography>
          <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>Số lượng</Typography>
          <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>Còn lại</Typography>
          <Typography sx={{ flexBasis: '25%', maxWidth: '100%' }}>Thành tiền</Typography>
        </Stack>
        <CartList />
        <Button
          sx={{ bgcolor: '#2f9454', color: '#fff' }}
          className="hover:bg-green-700"
          onClick={handleCheckout}
        >
          Thanh toán
        </Button>
      </Box>
    </Container>
  );
}

export default CartFeature;
