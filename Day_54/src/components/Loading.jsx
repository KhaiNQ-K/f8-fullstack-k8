import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        inset: '0',
        zIndex: '1',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          inset: '0',
          bgcolor: '#ccc',
          opacity: '0.4',
          zIndex: 1,
        }}
      ></Box>
      <CircularProgress
        size="30px"
        sx={{
          position: 'absolute',
          zIndex: 2,
        }}
      />
    </Box>
  );
}

export default Loading;
