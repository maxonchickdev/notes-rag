import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { FC } from 'react';

import { DrawerComponent } from '../Drawer/drawer.component';


interface Props {
  onLogout: () => void
  setOpen: (open: boolean) => void
  open: boolean
}

/**
 *
 * @param root0
 * @param root0.onLogout
 * @param root0.setOpen
 * @param root0.open
 */
export const HeaderComponent: FC<Props> = ({ onLogout, open, setOpen }) => {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', margin: '0 auto', maxWidth: '1220px', px: '10px' }}>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: '20px' }}>
        <IconButton onClick={() => setOpen(true)}>
          <TuneIcon color='success' fontSize='large' />
        </IconButton>
        <Typography variant='h6'>Explore RAGs</Typography>
      </Box>
      <Button color='primary' onClick={onLogout}>Logout</Button>
      <DrawerComponent open={open} setOpen={setOpen} />
    </Box>
  );
};
