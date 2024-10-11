import { productApi } from '@/api/productApi';
import { convertCurrency } from '@/utils';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getById(id);
        setProduct(data);
      } catch (err) {
        console.log(`Failed to get product with id: ${id}  ${err}`);
      }
    })();
  }, [id]);
  return (
    <Box display="flex" flexWrap="nowrap" gap={3}>
      <Box p={2} className="border-4 border-red-800 rounded-lg  w-2/5">
        <Box component="img" src={product.image} className="w-[450px] object-cover"></Box>
      </Box>
      <Box mt={3} flex={1} display={'flex'} flexDirection={'column'}>
        <Typography component="h2" variant="h4" fontWeight="bold" className="text-red-800">
          {product.brand}
        </Typography>
        <Typography component="h3" variant="h5" fontWeight="bold" mt={2} mb={4}>
          {product.name}
        </Typography>
        <Typography
          component="span"
          sx={{ display: 'block', maxWidth: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}
        >
          {product.description}
        </Typography>
        <Box mt={7} mx={'auto'} textAlign="center" display="flex" justifyContent="space-between">
          <Box>
            <Typography omponent="span" variant="h3" fontWeight="bold" mb={2}>
              {convertCurrency(product.price)}
            </Typography>
            <Button className="p-2 hover:bg-red-800" sx={{ bgcolor: 'red', color: '#fff' }}>
              Add to cart
            </Button>
          </Box>
        </Box>
        <Button
          className="p-2 hover:bg-red-800"
          sx={{ bgcolor: 'red', color: '#fff', ml: 'auto', mt: 'auto' }}
          onClick={() => {
            navigate('/');
          }}
        >
          Go to home
        </Button>
      </Box>
    </Box>
  );
}

ProductDetail.propTypes = {};

export default ProductDetail;
