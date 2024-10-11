import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
function ProductList({ products }) {
  // const productList = useSelector((state) => state.product.productList) || [];

  return (
    <Stack
      justifyContent="space-between"
      gap={2}
      flexDirection={'row'}
      width={'100%'}
      flexWrap={'wrap'}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Stack>
  );
}
ProductList.propTypes = {
  products: PropTypes.array,
};
export default ProductList;
