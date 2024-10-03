import { formatCurrency } from '@/utils/formatNumber';
import { Box, Button, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
const ProductItem = ({ product }) => {
  return (
    <Paper elevation={1}>
      <Box padding={1}>
        <Box padding={1} minHeight="215px">
          <img src={product.image} alt={product.name} width="100%" />
        </Box>

        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1} color="error.main">
            {formatCurrency(product.price)}
          </Box>

          <Button sx={{ bgcolor: 'blue.main', color: 'white' }} fullWidth>
            <Typography variant="body" component={'p'}>
              Thêm vào giỏ hàng
            </Typography>
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
