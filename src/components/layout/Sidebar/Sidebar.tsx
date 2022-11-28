import React, { useEffect } from 'react';

import {
  Avatar,
  AvatarGroup,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setUsersFilter } from '../../../store/actions/usersActions';
import { getFriends } from '../../../store/middlewares/users/actions';
import { selectIsAuth } from '../../../store/selectors/authSelectors';
import {
  selectFollowings,
  selectFollowingsCount,
} from '../../../store/selectors/usersSelectors';

const NO_USERS = 0;

export const Sidebar = () => {
  const dispatch = useAppDispatch();

  const followings = useSelector(selectFollowings);
  const followingsCount = useSelector(selectFollowingsCount);

  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const match = useMatch('/users');

  useEffect(() => {
    dispatch(getFriends());
  }, [isAuth]);

  const onFollowingClick = async () => {
    if (match) {
      dispatch(setUsersFilter({ searchName: '', userFriends: 'follow' }));
    } else {
      navigate('users?friend=true');
    }
  };

  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed">
        <Card sx={{ margin: 1 }}>
          <CardContent>
            <CardActionArea
              style={{ marginBottom: 5, padding: 5 }}
              onClick={onFollowingClick}
            >
              <Typography variant="h6" fontWeight={100}>
                Following
              </Typography>
            </CardActionArea>

            {followingsCount === NO_USERS || !isAuth ? (
              <Typography variant="body1">Following your friends</Typography>
            ) : (
              <AvatarGroup max={8} total={followingsCount}>
                {followings.map(f => (
                  <NavLink to={`/profile/${f.id}`} key={f.id}>
                    <Avatar alt={f.name} src={f.photos.small ? f.photos.small : ''} />
                  </NavLink>
                ))}
              </AvatarGroup>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
