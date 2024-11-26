'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { SpeedDialComponent } from '../../src/components/speed-dial/speed-dial.component';
import { useSpeedDial } from '../../src/hooks/use-speed-dial.hook';

export default function RootLayout({ children }: { children: ReactNode }) {
  const {
    handleCloseSpeedDial,
    handleOpenSpeedDial,
    onPushToResetPassword,
    onPushToSignIn,
    onPushToSignUp,
    open,
  } = useSpeedDial();

  return (
    <>
      <SpeedDialComponent
        handleCloseSpeedDial={handleCloseSpeedDial}
        handleOpenSpeedDial={handleOpenSpeedDial}
        onPushToResetPassword={onPushToResetPassword}
        onPushToSignIn={onPushToSignIn}
        onPushToSignUp={onPushToSignUp}
        open={open}
      />
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
    </>
  );
}
