import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { FC, useCallback, useState } from 'react';

import { COLORS } from '../../enums/colors.enum';
import { DrawerComponent } from '../drawer/drawer.component';
import { ModalComponent } from '../modal/modal.component';

interface Props {
  documents: string[];
  onLogout: () => void;
}

export const HeaderComponent: FC<Props> = ({ documents, onLogout }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [openModal]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [openModal]);

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true);
  }, [openDrawer]);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, [openDrawer]);

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
          Explore documents
        </Typography>
        <TuneIcon color="primary" fontSize="medium" />
      </IconButton>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
        <Button onClick={handleOpenModal} variant="outlined">
          Notion api token
        </Button>
        <ModalComponent
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenDrawer}
          openModal={openModal}
        />
        <Button onClick={onLogout} variant="outlined">
          Logout
        </Button>
      </Box>
      <DrawerComponent
        documents={documents}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        openDrawer={openDrawer}
      />
    </Box>
  );
};
