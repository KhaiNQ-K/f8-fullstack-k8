import { productApi } from '@/api/productApi';
import ProductSkeletonList from '@/components/Product/ProductSkeletonList';
import { Box, Pagination } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const params = Object.fromEntries(searchParams);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 12,
    };
  }, [searchParams]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const handleChange = (e, page) => {
    const filters = {
      ...queryParams,
      page: page,
    };
    setSearchParams(filters);
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productApi.getProducts(queryParams);
        if (data) {
          setProductList(data);
          setPagination(pagination);
        }
      } catch (err) {
        console.log('Failed to fetch product::', err);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  return (
    <Box>
      <Box
        component="h1"
        sx={{ textTransform: 'uppercase', textAlign: 'center' }}
        className="text-4xl font-medium mb-4"
      >
        Products
      </Box>
      <Box my={5}>
        {loading ? <ProductSkeletonList length={12} /> : <ProductList products={productList} />}

        <Box display={'flex'} justifyContent="center" my={4}>
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
