import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter email');
      return;
    }
    onSubmit?.(email);
  };

  return (
    <Paper elevation={3} sx={{ width: '500px' }}>
      <Box className="bg-white text-black px-5 py-5 flex justify-center items-center rounded-lg flex-col">
        <Typography variant="h3" component="h1" textAlign="center">
          Shopping Cart
        </Typography>
        <Box
          component="form"
          className="mt-5 flex w-full flex-col gap-5"
          onSubmit={handleSubmitForm}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email ?? ''}
          />
          <Button type="submit" variant="contained" fullWidth color="secondary">
            Login
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
