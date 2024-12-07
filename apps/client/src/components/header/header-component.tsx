import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { FC } from 'react';

import { COLORS } from '../../enums/colors.enum';
import { DrawerComponent } from '../drawer/drawer.component';

interface Props {
  documents: string[];
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
  onLogout: () => void;
  openDrawer: boolean;
}

export const HeaderComponent: FC<Props> = ({
  documents,
  handleCloseDrawer,
  handleOpenDrawer,
  onLogout,
  openDrawer,
}) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
        maxWidth: '1220px',
        px: '10px',
      }}
    >
      <IconButton
        onClick={handleOpenDrawer}
        sx={{ borderRadius: '3px', display: 'flex', gap: '5px' }}
      >
        <Typography sx={{ color: COLORS.BLACK, fontSize: '16px' }}>
          Connect notion api
        </Typography>
        <TuneIcon color="primary" fontSize="medium" />
      </IconButton>
      <Button color="primary" onClick={onLogout}>
        Logout
      </Button>
      <DrawerComponent
        documents={documents}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        openDrawer={openDrawer}
      />
    </Box>
  );
};
