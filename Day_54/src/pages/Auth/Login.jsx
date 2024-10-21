import { login } from '@/app/slice/authSlice';
import Loading from '@/components/Loading';
import { Box, Container, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    if (status === 'pending') return;
    if (e.key === 'Enter') {
      try {
        await dispatch(login({ email }));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container maxWidth={false} disableGutters>
      {status === 'pending' && <Loading />}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          bgcolor: '#1976d2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h4" color="#fff">
          Login
        </Typography>
        <Box sx={{ width: '260px', mt: 2 }}>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              id="outlined-search"
              label="Email"
              size="small"
              type="email"
              fullWidth
              onKeyUp={handleLogin}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{
                '& label': {
                  color: '#fff',
                },
                '& input': {
                  color: '#fff',
                },
                '& label.Mui-focused': {
                  color: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
