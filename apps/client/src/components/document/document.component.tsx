import { Box } from '@mui/material';
import { FC } from 'react';

interface Props {
  document: string;
}

export const DocumentComponent: FC<Props> = ({ document }) => {
  return (
    <Box
      sx={{
        border: '1px solid #000',
        borderRadius: '4px',
        my: '5px',
        p: '10px',
      }}
    >
      {document}
    </Box>
  );
};
