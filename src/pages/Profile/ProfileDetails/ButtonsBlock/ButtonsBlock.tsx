import React, { FC } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

import { followUnfollowFrom } from '../../../../enums/followUnfollowFrom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { followUser, unfollowUser } from '../../../../store/middlewares/users/actions';
import { selectIsFriend } from '../../../../store/selectors/profileSelectors';

type PropsType = {
  userId: string | undefined;
};

export const ButtonsBlock: FC<PropsType> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const isFriend = useSelector(selectIsFriend);

  const onFollowClick = () => {
    if (userId) {
      const id = Number(userId);

      dispatch(followUser(id, followUnfollowFrom.PROFILE));
    }
  };

  const onUnfollowClick = () => {
    if (userId) {
      const id = Number(userId);

      dispatch(unfollowUser(id, followUnfollowFrom.PROFILE));
    }
  };

  return (
    <Stack spacing={2} direction="column">
      {isFriend ? (
        <Button
          variant="outlined"
          startIcon={<PersonRemoveIcon />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onUnfollowClick}
        >
          UNFOLLOW
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onFollowClick}
        >
          FOLLOW
        </Button>
      )}
    </Stack>
  );
};
