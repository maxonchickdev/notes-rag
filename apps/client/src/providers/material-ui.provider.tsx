'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

import { COLORS } from '../enums/colors.enum';

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 900,
      sm: 600,
      xl: 1500,
      xs: 0,
    },
  },
  palette: {
    background: {
      default: COLORS.WHITE,
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
});

interface Props {
  children: ReactNode;
}

export const MaterialUiProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};
