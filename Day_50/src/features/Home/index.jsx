import Header from '@/components/Header';
import { useCartStore } from '@/hooks/useCartStore';
import { Box, Typography } from '@mui/material';
import CartFeature from '../Cart';
import ProductFeature from '../Products';
function Home() {
  const { cartList } = useCartStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Typography variant="h3" component={'h1'} textAlign={'center'} mt={4}>
          Welcom to F8 Shop
        </Typography>
        <Box mt={4} sx={{ width: '100%' }}>
          <ProductFeature />
        </Box>
        {cartList.length > 0 && <CartFeature />}
      </Box>
    </Box>
  );
}

export default Home;
