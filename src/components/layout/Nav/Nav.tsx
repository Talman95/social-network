import React, { FC } from 'react';

import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import { navigationList } from '../../../constants/navigationList';

import { CustomNavLink } from './CustomNavLink/CustomNavLink';

export const Nav: FC = () => (
  <NavContainer flex={1} p={2}>
    <Box position="fixed">
      <List>
        {navigationList.map(({ to, title, icon }) => (
          <CustomNavLink key={title} to={to} title={title}>
            {icon}
          </CustomNavLink>
        ))}

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ModeNightIcon />
            </ListItemIcon>
            <Switch />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </NavContainer>
);

const SCREEN_SIZE = 760;

export const NavContainer = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up(SCREEN_SIZE)]: {
    display: 'block',
  },
}));
