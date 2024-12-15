import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

import { axiosInstance } from '../../configs/axios.config';
import { app } from '../../configs/firebase.config';
import { COLORS } from '../../enums/colors.enum';
import { DrawerComponent } from '../drawer/drawer.component';
import { ModalComponent } from '../modal/modal.component';

export const HeaderComponent = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onLogout = async () => {
    try {
      await getAuth(app).signOut();

      await axiosInstance({
        method: 'GET',
        url: process.env.ROUTE_SIGN_OUT,
      });

      router.push('/');
    } catch (err) {
      if (err instanceof AxiosError)
        enqueueSnackbar(`${err.response?.data.message}`, {
          variant: 'error',
        });
    }
  };

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
        height: '60px',
        justifyContent: 'space-between',
        left: '50%',
        margin: '0 auto',
        maxWidth: '1220px',
        position: 'fixed',
        px: '10px',
        top: 0,
        transform: 'translateX(-50%)',
        width: '100%',
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
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        openDrawer={openDrawer}
      />
    </Box>
  );
};
