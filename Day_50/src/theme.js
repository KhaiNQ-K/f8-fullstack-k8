import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    blue: {
      main: '#1976d2',
    },
  },
});

export default theme;
