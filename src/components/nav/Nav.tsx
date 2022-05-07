import React from 'react';
import cl from './Nav.module.css';
import {NavLink} from "react-router-dom";
import Box from '@mui/material/Box';

export const Nav: React.FC = () => {
    return (
        <Box
            flex={1}
            p={2}
            bgcolor={'blue'}
            sx={{display: {xs: 'none', sm: 'block'}}}
        >
            <Box>
                <NavLink to={"/profile"}>Profile</NavLink>
                <NavLink to={"/messages"}>Messages</NavLink>
                <NavLink to={"/users"}>Users</NavLink>
                <NavLink to={'/settings'}>Settings</NavLink>
            </Box>
        </Box>
    );
};