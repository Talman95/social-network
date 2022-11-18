import React, {FC, memo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {blue} from '@mui/material/colors';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {CurrentUserType} from "../../store/auth/authReducer";

type HeaderPropsType = {
    isAuth: boolean
    logout: () => void
    currentUser: CurrentUserType | null
    navigateToProfile: () => void
    navigateToUsers: () => void
    navigateToMessages: () => void
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
    gap: '15px',
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))

export const Header: FC<HeaderPropsType> = memo(({
                                                     isAuth,
                                                     logout,
                                                     currentUser,
                                                     navigateToProfile,
                                                     navigateToUsers,
                                                     navigateToMessages
                                                 }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const logoutHandler = () => {
        setAnchorEl(null);
        logout()
    }
    const profileHandler = () => {
        setAnchorEl(null);
        navigateToProfile()
    }
    const usersHandler = () => {
        setAnchorEl(null);
        navigateToUsers()
    }
    const messagesHandler = () => {
        setAnchorEl(null);
        navigateToMessages()
    }

    return (
        <AppBar position={"sticky"}>
            <StyledToolbar>
                <Typography variant={'h6'}>
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
                                <MailIcon onClick={messagesHandler}/>
                            </Badge>
                            <Badge badgeContent={5} color="error">
                                <NotificationsIcon/>
                            </Badge>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar
                                    alt={currentUser?.fullName}
                                    src={currentUser?.photos.small ? currentUser?.photos.small : "/broken-image.jpg"}
                                    sx={{bgcolor: blue[500], width: 50, height: 50}}
                                />
                            </IconButton>
                            <Typography variant={'body1'} component={'span'} sx={{margin: "-15px"}}>
                                {currentUser?.fullName}
                            </Typography>
                        </IconsContainer>
                        <UserContainer>
                            <Badge badgeContent={2} color="error">
                                <MailIcon onClick={messagesHandler}/>
                            </Badge>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar
                                    alt={currentUser?.fullName}
                                    src={currentUser?.photos.small ? currentUser?.photos.small : "/broken-image.jpg"}
                                    sx={{bgcolor: blue[500], width: 50, height: 50}}
                                />
                            </IconButton>
                        </UserContainer>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={profileHandler}>Profile</MenuItem>
                            <MenuItem onClick={usersHandler}>Users</MenuItem>
                            <Divider/>
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
    )
})