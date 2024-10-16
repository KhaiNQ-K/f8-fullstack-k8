import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, useColorScheme } from '@mui/material';
function ToggleColorMode() {
  const { mode, setMode } = useColorScheme();
  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };
  return (
    <IconButton
      color="primary"
      sx={{
        padding: '5px',
        borderRadius: '7px',
        border: '1px solid',
        borderColor: 'initial',
      }}
      onClick={handleToggleMode}
    >
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ToggleColorMode;
