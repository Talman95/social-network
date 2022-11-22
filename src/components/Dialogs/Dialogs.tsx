import React, { useEffect } from 'react';

import { Box, List, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDialogs } from '../../store/middlewares/dialogs/sagas';
import { selectDialogs } from '../../store/selectors/dialogsSelectors';

import { DialogItem } from './DialogItem/DialogItem';

const NO_DIALOGS = 0;

export const Dialogs = () => {
  const dispatch = useDispatch();

  const dialogs = useSelector(selectDialogs);

  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  return (
    <Box
      flex={2}
      p={2}
      m={1}
      sx={{ bgcolor: 'background.paper', minHeight: 'calc(100vh - 150px)' }}
    >
      <Typography
        variant="h5"
        component="div"
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        Dialogs
      </Typography>
      <List component="nav" sx={{ maxWidth: 360, margin: 'auto' }}>
        {dialogs.length === NO_DIALOGS ? (
          <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
            No Dialogs
          </Typography>
        ) : (
          dialogs.map(
            ({
              id,
              userName,
              photos,
              hasNewMessages,
              newMessagesCount,
              lastDialogActivityDate,
            }) => (
              <DialogItem
                key={id + lastDialogActivityDate}
                userName={userName}
                photo={photos.small}
                hasNewMessages={hasNewMessages}
                newMessagesCount={newMessagesCount}
                lastDialogActivityDate={lastDialogActivityDate}
              />
            ),
          )
        )}
      </List>
    </Box>
  );
};
