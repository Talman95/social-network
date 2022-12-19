import React from 'react';

import { Box, Card, CardContent, Divider, Skeleton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

export const ProfileSkeleton = (): ReturnComponentType => (
  <Card
    sx={{
      display: 'flex',
      margin: 1,
      padding: { sm: 2 },
      flexDirection: { xs: 'column', sm: 'inherit' },
      alignItems: { xs: 'center', sm: 'inherit' },
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Skeleton variant="circular" width={151} height={151} style={{ margin: 1 }} />

      <Stack spacing={2} direction="column">
        <Skeleton variant="rectangular" width={167} height={36} />
      </Stack>
    </Box>

    <Box sx={{ display: 'flex', margin: 1 }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5" sx={{ wordWrap: 'break-word' }}>
          <Skeleton />
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" component="div">
          <Skeleton />
        </Typography>
        <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

        <Skeleton variant="rectangular" width={300} height={300} />
      </CardContent>
    </Box>
  </Card>
);
