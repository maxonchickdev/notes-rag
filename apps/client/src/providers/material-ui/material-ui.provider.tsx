'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import { COLORS } from '../../enums/colors-enum/colors.enum';

const theme = createTheme({
  palette: {
    background: {
      default: COLORS.WHITE,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
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
