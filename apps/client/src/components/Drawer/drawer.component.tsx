'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { IAddDocument } from '@notes-rag/shared';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ModalComponent } from '../modal/modal.component';

interface Props {
  documents: string[];
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
  openDrawer: boolean;
}

export const DrawerComponent: FC<Props> = ({
  documents,
  handleCloseDrawer,
  handleOpenDrawer,
  openDrawer,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddDocument>({
    mode: 'onChange',
  });

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  return (
    <Drawer anchor="left" onClose={handleOpenDrawer} open={openDrawer}>
      <Box sx={{ p: '10px', width: '600px' }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Load documents</Typography>
          <IconButton onClick={handleCloseDrawer} sx={{ borderRadius: '3px' }}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Button
          fullWidth
          onClick={handleOpenModal}
          sx={{ my: '5px' }}
          variant="outlined"
        >
          Add api token
        </Button>
        <ModalComponent
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenDrawer}
          openModal={openModal}
        />
      </Box>
    </Drawer>
  );
};
