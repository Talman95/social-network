import React, { FC } from 'react';

import { Divider, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { path } from '../../../../enums/path';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { logout } from '../../../../store/middlewares/auth';

type PropsType = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onCloseClick: () => void;
};

export const HeaderMenu: FC<PropsType> = ({ anchorEl, open, onCloseClick }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onProfileClick = () => {
    onCloseClick();
    navigate(path.PROFILE);
  };

  const onChatClick = () => {
    onCloseClick();
    navigate(path.CHAT);
  };

  const onUsersClick = () => {
    onCloseClick();
    navigate(path.USERS);
  };

  const onSettingsClick = () => {
    onCloseClick();
    navigate(path.SETTINGS);
  };

  const onLogoutClick = () => {
    onCloseClick();
    dispatch(logout());
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onCloseClick}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={onProfileClick}>Profile</MenuItem>
      <MenuItem onClick={onChatClick}>Chat</MenuItem>
      <MenuItem onClick={onUsersClick}>Devs</MenuItem>
      <MenuItem onClick={onSettingsClick}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={onLogoutClick}>LogOut</MenuItem>
    </Menu>
  );
};
