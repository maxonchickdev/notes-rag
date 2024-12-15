import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  query: string;
  response: string;
}

export const RagItemComponent: FC<Props> = ({ query, response }) => {
  return (
    <Box sx={{ my: 4, width: '100%' }}>
      <Box
        sx={{
          backgroundColor: '#e0f7fa',
          borderRadius: '5px',
          mb: 1,
          p: 2,
        }}
      >
        <Typography fontWeight="bold" variant="body1">
          User:
        </Typography>
        <Typography variant="body2">{query}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#ffe0b2',
          borderRadius: '5px',
          p: 2,
        }}
      >
        <Typography fontWeight="bold" variant="body1">
          Response:
        </Typography>
        <Typography variant="body2">{response}</Typography>
      </Box>
    </Box>
  );
};
