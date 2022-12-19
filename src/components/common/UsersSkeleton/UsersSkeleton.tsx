import React, { FC } from 'react';

import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

import {
  UserInfoContainer,
  UserNameContainer,
} from '../../../pages/Users/MappedUsers/User/styles';

export const UsersSkeleton: FC = () => {
  const skeletonUserCount = '0123456789';

  return (
    <Box>
      {Array.from(skeletonUserCount).map(item => (
        <Card key={item} sx={{ margin: 1 }}>
          <UserInfoContainer>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton
                variant="circular"
                sx={{
                  width: { xs: 50, sm: 96 },
                  height: { xs: 50, sm: 96 },
                  margin: '0 8px',
                }}
              />

              <CardContent sx={{ display: { xs: 'none', sm: 'block' } }}>
                <UserNameContainer>
                  <Typography component="div" variant="h6" width={90}>
                    <Skeleton />
                  </Typography>
                </UserNameContainer>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  width={150}
                >
                  <Skeleton />
                </Typography>
              </CardContent>
              <CardContent sx={{ display: { xs: 'block', sm: 'none' } }}>
                <UserNameContainer>
                  <Typography component="div" variant="body2" width={100}>
                    <Skeleton />
                  </Typography>
                </UserNameContainer>
              </CardContent>
            </Box>

            <Box>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: 80, sm: 132 },
                  height: { xs: 30, sm: 36 },
                }}
              />
            </Box>
          </UserInfoContainer>
        </Card>
      ))}
    </Box>
  );
};
