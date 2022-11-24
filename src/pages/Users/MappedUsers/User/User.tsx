import React, { FC, MouseEvent } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { COLOR_BLUE } from '../../../../constants/colors';
import { followUnfollowFrom } from '../../../../enums/followUnfollowFrom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { followUser, unfollowUser } from '../../../../store/middlewares/users/actions';
import { selectPressingInProgress } from '../../../../store/selectors/usersSelectors';

import { IconsContainer, UserInfoContainer, UserNameContainer } from './styles';

type PropsType = {
  userId: number;
  name: string;
  smallPhoto: string | null;
  status: string | null;
  followed: boolean;
};

export const User: FC<PropsType> = ({ userId, name, smallPhoto, status, followed }) => {
  const dispatch = useAppDispatch();

  const pressingInProgress = useSelector(selectPressingInProgress);

  const onFollowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(followUser(userId, followUnfollowFrom.users));
  };

  const onUnfollowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(unfollowUser(userId, followUnfollowFrom.users));
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardActionArea>
        <NavLink to={`/profile/${userId}`}>
          <UserInfoContainer>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {status}
                </Typography>
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
              {followed ? (
                <Button
                  variant="outlined"
                  startIcon={<PersonRemoveIcon />}
                  disabled={pressingInProgress.some(id => id === userId)}
                  sx={{ display: { xs: 'none', sm: 'flex' }, width: '132px' }}
                  onClick={onUnfollowClick}
                >
                  UNFOLLOW
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  disabled={pressingInProgress.some(id => id === userId)}
                  sx={{ display: { xs: 'none', sm: 'flex' }, width: '132px' }}
                  onClick={onFollowClick}
                >
                  FOLLOW
                </Button>
              )}
              <IconsContainer>
                {followed ? (
                  <IconButton
                    aria-label="unfollow"
                    size="small"
                    color="primary"
                    disabled={pressingInProgress.some(id => id === userId)}
                    onClick={onUnfollowClick}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="follow"
                    size="small"
                    color="primary"
                    disabled={pressingInProgress.some(id => id === userId)}
                    onClick={onFollowClick}
                  >
                    <PersonAddIcon />
                  </IconButton>
                )}
              </IconsContainer>
            </Box>
          </UserInfoContainer>
        </NavLink>
      </CardActionArea>
    </Card>
  );
};
