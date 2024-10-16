import { Box, Container } from '@mui/material';
import ToggleColorMode from './components/ToggleColorMode';

function App() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.light',
          width: '100%',
          height: (theme) => `${theme.trello.headerHeight}`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ToggleColorMode />
      </Box>
      <Box
        sx={{
          bgcolor: 'primary.dark',
          width: '100%',
          height: (theme) => `${theme.trello.boardBarHeight}`,
          display: 'flex',
          alignItems: 'center',
        }}
      ></Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          width: '100%',
          height: ({ trello }) => `calc(100vh - ${trello.headerHeight} - ${trello.boardBarHeight})`,
          display: 'flex',
          alignItems: 'center',
        }}
      ></Box>
    </Container>
  );
}

export default App;
