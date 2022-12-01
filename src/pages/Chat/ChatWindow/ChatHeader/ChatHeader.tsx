import React, { FC } from 'react';

import { Box, Divider, Typography } from '@mui/material';

export const ChatHeader: FC = () => (
  <Box>
    <Typography
      variant="h5"
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
      }}
    >
      Developers Chat
    </Typography>
    <Divider />
  </Box>
);
