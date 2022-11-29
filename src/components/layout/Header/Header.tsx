import React, { MouseEvent, useState } from 'react';

import { AppBar, Avatar, Box, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';

import { COLOR_BLUE } from '../../../constants/colors';
import { selectAuthUser, selectIsAuth } from '../../../store/selectors/authSelectors';

import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { NameContainer, StyledToolbar, UserContainer } from './styles';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const authUser = useSelector(selectAuthUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const onMenuClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const onMenuBlur = () => setAnchorEl(null);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">SOCIAL NETWORK</Typography>
        {isAuth ? (
          <Box>
            <UserContainer>
              <IconButton
                onClick={onMenuClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  alt={authUser?.fullName}
                  src={
                    authUser?.photos.small ? authUser?.photos.small : '/broken-image.jpg'
                  }
                  sx={{ bgcolor: blue[COLOR_BLUE], width: 50, height: 50 }}
                />
              </IconButton>
              <NameContainer>{authUser?.fullName}</NameContainer>
            </UserContainer>
            <HeaderMenu open={open} onCloseClick={onMenuBlur} anchorEl={anchorEl} />
          </Box>
        ) : (
          <Typography variant="body1" component="span">
            LogIn
          </Typography>
        )}
      </StyledToolbar>
    </AppBar>
  );
};
