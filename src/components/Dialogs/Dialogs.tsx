import React, { useEffect } from 'react';

import { Box, List, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDialogs } from '../../store/middlewares/dialogs/sagas';
import { selectDialogs } from '../../store/selectors/dialogsSelectors';

export const Dialogs = () => {
  const dispatch = useDispatch();

  const dialogs = useSelector(selectDialogs);

  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  return (
    <Box flex={2} p={2} m={1} sx={{ bgcolor: 'background.paper' }}>
      <Typography
        variant="h5"
        component="div"
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        Dialogs
      </Typography>
      <List>
        {dialogs.map(({ id, userName }) => (
          <div key={id}>{userName}</div>
        ))}
      </List>
    </Box>
  );
};
