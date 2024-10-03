import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ProductContext } from '..';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  return (
    <Box>
      <Grid container width={'100%'} spacing={2}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
