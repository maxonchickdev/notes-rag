import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface Props {
  open: boolean;
}

export const BackdropComponent: FC<Props> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
