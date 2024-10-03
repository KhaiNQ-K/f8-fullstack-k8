import { productApi } from '@/api/productApi';
import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSkeletonList from './components/ProductSkeletonList';
export const ProductContext = createContext();
const ProductFeature = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 12,
  });
  const [products, setProduct] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productApi.getAll(queryParams);
        if (data) {
          setProduct(data);
          setPagination(pagination);
        }
      } catch (err) {
        console.log('Failed to fetch product::', err);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  const handleChange = (e, page) => {
    const filters = {
      ...queryParams,
      page: page,
    };
    setQueryParams(filters);
  };
  const handleAddToCart = () => {};
  return (
    <ProductContext.Provider value={{ products, onAddToCart: handleAddToCart }}>
      <Box>
        <Container>
          <Grid container>
            <Grid item sx={{ width: '100%' }}>
              <Paper elevation={0}>
                {loading ? <ProductSkeletonList length={12} /> : <ProductList />}
                <Box my={4} display="flex" justifyContent="center">
                  <Pagination
                    count={Math.ceil(pagination.total / pagination.limit)}
                    page={pagination.page}
                    onChange={handleChange}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProductContext.Provider>
  );
};

export default ProductFeature;
