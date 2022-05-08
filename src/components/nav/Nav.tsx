import React from 'react';
import {NavLink} from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from '@mui/material/Switch';

export const Nav: React.FC = () => {
    return (
        <Box flex={1} p={2} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Box position={"fixed"}>
                <List>
                    <NavLink to={"/profile"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Profile"}/>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to={"/messages"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MessageIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Messages"}/>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to={"/users"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Users"}/>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to={"/settings"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Settings"}/>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

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
    );
};