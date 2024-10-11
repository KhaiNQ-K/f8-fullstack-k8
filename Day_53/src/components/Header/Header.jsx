import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import { getOrderQuantity } from '@/redux/slice/cartSlice';
import { useSelector } from 'react-redux';
function Header() {
  const cartQuantity = useSelector(getOrderQuantity);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link>
              <Box
                component={'img'}
                alt="F8 Shop"
                src={Logo}
                width={'45px'}
                height={'45px'}
                borderRadius={'50%'}
              ></Box>
            </Link>
          </Box>
          <Box component={Link} to="/cart">
            <IconButton color="inherit" sx={{ position: 'relative' }}>
              <ShoppingCart />
              <Box
                component="span"
                className="text-sm absolute bg-red-500 rounded-xl px-1 font-bold top-0 right-1 "
              >
                {cartQuantity}
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
