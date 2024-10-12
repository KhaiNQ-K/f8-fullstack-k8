import { useEffect, useState } from 'react';
import { userApi } from '@/api/userApi';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import useStorage from '@/hooks/useStorage';
import { STORAGE_KEY } from '@/utils/storage-key';

const Header = () => {
  const [authData, setAuthData] = useStorage(STORAGE_KEY.USER_INFO, null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.getProfile();
        setAuthData({ ...authData, userInfo: data.emailId });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          F8 Shop
        </Typography>
        {authData && (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Typography ariant="h6" component="div" sx={{ flexGrow: 1 }} className="mr-3">
                {authData?.userInfo?.name}
              </Typography>
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
