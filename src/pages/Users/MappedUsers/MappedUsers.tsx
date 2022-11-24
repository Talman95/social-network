import React from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectUsers } from '../../../store/selectors/usersSelectors';

import { User } from './User/User';

const NO_USERS = 0;

export const MappedUsers = () => {
  const users = useSelector(selectUsers);

  return (
    <Box>
      {users.length === NO_USERS ? (
        <Card sx={{ margin: 1 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>Users not found</Typography>
          </CardContent>
        </Card>
      ) : (
        users.map(({ id, followed, status, photos, name }) => (
          <User
            key={id}
            userId={id}
            name={name}
            status={status}
            followed={followed}
            smallPhoto={photos.small}
          />
        ))
      )}
    </Box>
  );
};
