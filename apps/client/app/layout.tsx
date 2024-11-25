import { ReactNode } from 'react';

import { roboto } from '../src/fonts/roboto.font';
import { MaterialUiProvider } from '../src/providers/material-ui.provider';

export const metadata = {
  description: 'Generated by create-nx-workspace',
  title: 'Welcome to client',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MaterialUiProvider>{children}</MaterialUiProvider>
      </body>
    </html>
  );
}
