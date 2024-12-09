'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { IAddDocument, IDocument } from '@notes-rag/shared';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { axiosInstance } from '../../configs/axios.config';
import { useGetFirebaseToken } from '../../hooks/use-get-firebase-token.hook';
import { DocumentComponent } from '../document/document.component';

interface Props {
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
  openDrawer: boolean;
}

export const DrawerComponent: FC<Props> = ({
  handleCloseDrawer,
  handleOpenDrawer,
  openDrawer,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const { token } = useGetFirebaseToken();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddDocument>({
    mode: 'onChange',
  });

  const getDocuments = async () => {
    try {
      const response = await axiosInstance({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
        url: process.env.ROUTE_GET_DOCUMENTS,
      });
      setDocuments(response.data);
    } catch (err) {
      if (err instanceof AxiosError)
        enqueueSnackbar(`${err.response?.data.message}`, {
          variant: 'error',
        });
    }
  };

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
          <Typography variant="h6">Documents</Typography>
          <IconButton onClick={handleCloseDrawer} sx={{ borderRadius: '3px' }}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Button fullWidth onClick={getDocuments} variant="outlined">
          Get documents
        </Button>
        {documents.map((document, index) => (
          <DocumentComponent document={document.document} key={index} />
        ))}
      </Box>
    </Drawer>
  );
};
