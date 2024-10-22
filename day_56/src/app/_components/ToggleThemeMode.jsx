'use client';

import { Box, Button, IconButton, useColorScheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function ToggleThemeMode() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const alternativeScheme = colorScheme === 'light' ? 'dark' : 'light';
  const handleChange = () => {
    console.log(colorScheme);
    setColorScheme(alternativeScheme);
  };
  if (true) {
    return (
      <IconButton onClick={handleChange}>
        {colorScheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    );
  }
}
