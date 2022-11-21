import React, { ReactElement } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Switch from '@mui/material/Switch';

import { ReturnComponentType } from '../../types/ReturnComponentType';

import { CustomNavLink } from './CustomNavLink/CustomNavLink';

type LinkType = {
  to: string;
  title: string;
  icon: ReactElement;
};

const navigationList: LinkType[] = [
  { to: '/profile', title: 'Profile', icon: <AccountBoxIcon /> },
  { to: '/dialogs', title: 'Dialogs', icon: <MessageIcon /> },
  { to: '/chat', title: 'Chat', icon: <EmailIcon /> },
  { to: '/users', title: 'Developers', icon: <PeopleIcon /> },
  { to: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];

export const Nav = (): ReturnComponentType => (
  <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
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
  </Box>
);
