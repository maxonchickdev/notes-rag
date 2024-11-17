'use client';

import { Box, Drawer, TextField, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void
}

/**
 *
 * @param root0
 * @param root0.open
 * @param root0.setOpen
 */
export const DrawerComponent: FC<Props> = ({ open, setOpen }) => {
  return (
    <Drawer anchor='left' onClose={() => setOpen(false)} open={open}>
      <Box sx={{ p: '10px', width: '300px' }}>
        <Typography variant='h6'>Load data</Typography>
        <TextField fullWidth maxRows={4} multiline placeholder="Paste data" rows={2}/>
      </Box>
    </Drawer>
  );
};
