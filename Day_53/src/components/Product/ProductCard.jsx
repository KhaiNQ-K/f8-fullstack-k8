import { addCart } from '@/redux/slice/cartSlice';
import { convertCurrency } from '@/utils';
import { ShoppingCart } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addCart(product));
  };
  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: '10px', width: '280px', height: '300px', padding: '30px' }}
    >
      <Stack justifyContent="space-between" alignItems="center" gap={4}>
        <Link to={`/products/${product._id}`}>
          <Box
            component="img"
            src={product.image}
            width={'180px'}
            height={'100px'}
            className="object-cover rounded-md hover:scale-125 transition-all ease-in-out cursor-pointer"
          ></Box>
        </Link>
        <Typography
          className="text-center"
          component={Link}
          to={`/products/${product._id}`}
          sx={{ fontSize: '18px' }}
        >
          {product.name}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          flexWrap="nowrap"
          gap={3}
        >
          <Typography component="span" variant="h5" fontWeight="bold">
            {convertCurrency(product.price)}
          </Typography>
          <IconButton onClick={handleAddToCart}>
            <ShoppingCart />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
ProductCard.propTypes = {
  product: PropTypes.object,
};
export default ProductCard;
