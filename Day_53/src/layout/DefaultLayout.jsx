import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
function DefaultLayout() {
  return (
    <Box>
      <Header />
      <Box mt={5}>
        <Container maxWidth="xl" sx={{ maxWidth: '1260px !important' }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default DefaultLayout;
