import React, { FC, MouseEvent } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useMatch } from 'react-router-dom';

type PropsType = {
  children: React.ReactNode;
  to: string;
  title: string;
};

export const CustomNavLink: FC<PropsType> = ({ children, to, title }) => {
  const match = useMatch(to);

  const onNavLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (match) e.preventDefault();
  };

  return (
    <NavLink to={to} onClick={onNavLinkClick}>
      <ListItem disablePadding selected={!!match}>
        <ListItemButton>
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};
