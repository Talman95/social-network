import React, { FC, memo, MouseEvent } from 'react';

import { Avatar, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { COLOR_BLUE } from '../../../../constants/colors';
import { followUnfollowFrom } from '../../../../enums/followUnfollowFrom';
import { path } from '../../../../enums/path';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { follow, unfollow } from '../../../../store/middlewares/users';
import { selectAuthId } from '../../../../store/selectors/authSelectors';
import { selectPressingInProgress } from '../../../../store/selectors/usersSelectors';

import { StatusContainer, UserInfoContainer, UserNameContainer } from './styles';

type PropsType = {
  userId: number;
  name: string;
  smallPhoto: string | null;
  status: string | null;
  followed: boolean;
};

export const User: FC<PropsType> = memo(
  ({ userId, name, smallPhoto, status, followed }) => {
    const dispatch = useAppDispatch();

    const pressingInProgress = useSelector(selectPressingInProgress);
    const authId = useSelector(selectAuthId);

    const navigate = useNavigate();

    const onFollowClick = (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      dispatch(follow(userId, followUnfollowFrom.USERS));
    };

    const onUnfollowClick = (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      dispatch(unfollow(userId, followUnfollowFrom.USERS));
    };

    const onProfileNavigate = (): void => {
      navigate(`${path.PROFILE}/${userId}`);
    };

    return (
      <Card sx={{ margin: 1 }}>
        <UserInfoContainer>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={onProfileNavigate}
          >
            <Avatar
              alt={name.toUpperCase()}
              src={smallPhoto || name}
              sx={{
                width: { xs: 50, sm: 96 },
                height: { xs: 50, sm: 96 },
                bgcolor: blue[COLOR_BLUE],
                margin: 1,
              }}
            />

            <CardContent sx={{ display: { xs: 'none', sm: 'block' } }}>
              <UserNameContainer>
                <Typography component="div" variant="h6">
                  {name}
                </Typography>
              </UserNameContainer>
              <StatusContainer>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {status}
                </Typography>
              </StatusContainer>
            </CardContent>
            <CardContent sx={{ display: { xs: 'block', sm: 'none' } }}>
              <UserNameContainer>
                <Typography component="div" variant="body2">
                  {name}
                </Typography>
              </UserNameContainer>
            </CardContent>
          </Box>

          <Box>
            <CardActions>
              {followed ? (
                <Button
                  variant="outlined"
                  disabled={
                    pressingInProgress.some(id => id === userId) || authId === userId
                  }
                  sx={{ display: 'flex', width: { xs: '80px', sm: '132px' } }}
                  onClick={onUnfollowClick}
                >
                  UNFOLLOW
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={
                    pressingInProgress.some(id => id === userId) || authId === userId
                  }
                  sx={{ display: 'flex', width: { xs: '80px', sm: '132px' } }}
                  onClick={onFollowClick}
                >
                  FOLLOW
                </Button>
              )}
            </CardActions>
          </Box>
        </UserInfoContainer>
      </Card>
    );
  },
);
