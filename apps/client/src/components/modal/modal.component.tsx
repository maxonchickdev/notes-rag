import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { INotionApiToken } from '@notes-rag/shared';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from '../../configs/axios.config';
import { COLORS } from '../../enums/colors.enum';
import { useGetFirebaseToken } from '../../hooks/use-get-firebase-token.hook';
import { NotionApiTokenController } from '../notion-api-token-controller/notion-api-token-controller.component';

interface Props {
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  openModal: boolean;
}

export const ModalComponent: FC<Props> = ({
  handleCloseModal,
  handleOpenModal,
  openModal,
}) => {
  const { token } = useGetFirebaseToken();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<INotionApiToken>({
    mode: 'onChange',
  });

  const onNotionApiTokenSubmit: SubmitHandler<INotionApiToken> = async (
    data,
  ) => {
    try {
      await axiosInstance({
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        url: `${process.env.ROUTE_NOTION_API_TOKEN_HEALTH_CHECK}/${data.token}`,
      });
      localStorage.setItem('notion-api-token', data.token);
      enqueueSnackbar('Token saved', { variant: 'success' });
      reset({
        token: '',
      });
    } catch (err) {
      reset({
        token: '',
      });
      if (err instanceof AxiosError) {
        enqueueSnackbar(`${err.response?.data.message}`, {
          variant: 'error',
        });
      }
    }
  };

  return (
    <Modal onClose={handleOpenModal} open={openModal}>
      <Box
        sx={{
          background: COLORS.WHITE,
          left: '50%',
          p: 2,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography component="h2" id="modal-modal-title" variant="h6">
            Add notion api token
          </Typography>
          <IconButton onClick={handleCloseModal} sx={{ borderRadius: '3px' }}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onNotionApiTokenSubmit)}>
          <NotionApiTokenController
            control={control}
            label="Token"
            name="token"
            required="Token is required"
            type="text"
          />
          {errors.token && errors.token.message}

          <Button fullWidth type="submit" variant="outlined">
            Submit token
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
