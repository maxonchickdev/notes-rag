import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        left: '50%',
        maxWidth: '700px',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}
