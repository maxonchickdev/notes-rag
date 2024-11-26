import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
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
