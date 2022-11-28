import React, { ReactElement } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

type LinkType = {
  to: string;
  title: string;
  icon: ReactElement;
};

export const navigationList: LinkType[] = [
  { to: '/profile', title: 'Profile', icon: <AccountBoxIcon /> },
  { to: '/dialogs', title: 'Dialogs', icon: <MessageIcon /> },
  { to: '/chat', title: 'Chat', icon: <EmailIcon /> },
  { to: '/users', title: 'Developers', icon: <PeopleIcon /> },
  { to: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];
