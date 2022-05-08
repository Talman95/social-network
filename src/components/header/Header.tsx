import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import {blue} from '@mui/material/colors';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
})
const SearchContainer = styled('div')(({theme}) => ({
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '40%'
}))
const IconsContainer = styled(Box)(({theme}) => ({
    display: 'none',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}))
const UserContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))

export const Header: FC<HeaderPropsType> = ({login, isAuth, logout}) => {
    const [openMenu, setOpenMenu] = useState(false)

    const logoutHandler = () => {
        setOpenMenu(false)
        logout()
    }

    const profileHadler = () => {
        setOpenMenu(false)
    }

    return (
        <AppBar position={"sticky"}>
            <StyledToolbar>
                <Typography
                    variant={'h6'}
                    // sx={{display: {xs: 'none', sm: 'block'}}}
                >
                    SOCIAL NETWORK
                </Typography>
                {isAuth &&
                    <SearchContainer sx={{display: {xs: 'none', sm: "block"}}}>
                        <InputBase placeholder={'Search'}/>
                    </SearchContainer>
                }
                {isAuth ?
                    <Box>
                        <IconsContainer>
                            <Badge badgeContent={2} color="error">
                                <MailIcon/>
                            </Badge>
                            <Badge badgeContent={5} color="error">
                                <NotificationsIcon/>
                            </Badge>
                            <Avatar
                                alt={"Romandrovsky"}
                                src="/broken-image.jpg"
                                sx={{bgcolor: blue[500], width: 50, height: 50}}
                                onClick={() => setOpenMenu(true)}
                            />
                        </IconsContainer>
                        <UserContainer onClick={() => setOpenMenu(true)}>
                            <Avatar
                                alt={"Romandrovsky"}
                                src="/broken-image.jpg"
                                sx={{bgcolor: blue[500], width: 50, height: 50}}
                            />
                            {/*<Typography variant={'body1'} component={'span'}>Romandrovsky</Typography>*/}
                        </UserContainer>
                        <Menu
                            open={openMenu}
                            onClose={() => setOpenMenu(false)}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <NavLink to={'/profile'}>
                                <MenuItem onClick={profileHadler}>Profile</MenuItem>
                            </NavLink>
                            <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                        </Menu>
                    </Box>
                    :
                    <Typography variant={'body1'} component={'span'}>
                        LogIn
                    </Typography>
                }
            </StyledToolbar>
        </AppBar>
    );
};