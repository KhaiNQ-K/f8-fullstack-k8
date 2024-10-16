import { createTheme } from '@mui/material';
const HEADER_HEIGHT = '48px';
const BOARD_BAR_HEIGHT = '58px';
const theme = createTheme({
  trello: {
    headerHeight: HEADER_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    bgColor: '#2dd4bf',
    bgColumn: '#99999940',
  },
  colorSchemes: {
    light: {
      palette: {},
    },
    dark: {
      palette: {},
    },
  },
});
export default theme;
