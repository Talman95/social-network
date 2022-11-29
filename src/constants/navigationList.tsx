import React, { ReactElement } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

import { path } from '../enums/path';

type LinkType = {
  to: string;
  title: string;
  icon: ReactElement;
};

export const navigationList: LinkType[] = [
  { to: path.PROFILE, title: 'Profile', icon: <AccountBoxIcon /> },
  { to: path.DIALOGS, title: 'Dialogs', icon: <MessageIcon /> },
  { to: path.CHAT, title: 'Chat', icon: <EmailIcon /> },
  { to: path.USERS, title: 'Developers', icon: <PeopleIcon /> },
  { to: path.SETTINGS, title: 'Settings', icon: <SettingsIcon /> },
];
