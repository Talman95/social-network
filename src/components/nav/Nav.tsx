import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from '@mui/material/Switch';
import {CustomNavLink} from "./CustomNavLink/CustomNavLink";

type LinkType = {
    to: string
    title: string
    icon: JSX.Element
}

const navigationList: LinkType[] = [
    {to: '/profile', title: 'Profile', icon: <AccountBoxIcon/>},
    {to: '/messages', title: 'Messages', icon: <MessageIcon/>},
    {to: '/users', title: 'Users', icon: <PeopleIcon/>},
    {to: '/settings', title: 'Settings', icon: <SettingsIcon/>},
]

export const Nav = () => {
    return (
        <Box flex={1} p={2} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Box position={"fixed"}>
                <List>

                    {navigationList.map(nl => {
                        return (
                            <CustomNavLink key={nl.title} to={nl.to} title={nl.title}>
                                {nl.icon}
                            </CustomNavLink>
                        )
                    })}

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ModeNightIcon/>
                            </ListItemIcon>
                            <Switch/>
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
        </Box>
    )
}