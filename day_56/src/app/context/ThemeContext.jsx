'use client';

import { createContext, useState } from 'react';
import { Experimental_CssVarsProvider as CssVarsProvide } from '@mui/material/styles';
import theme from '@/theme';

export default function ThemeProvider({ children }) {
  return (
    <CssVarsProvide theme={theme} defaultMode="system">
      {children}
    </CssVarsProvide>
  );
}
