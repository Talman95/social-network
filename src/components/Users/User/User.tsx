import React, {FC, MouseEvent} from 'react';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../api/usersAPI";
import {Avatar, Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {styled} from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import IconButton from '@mui/material/IconButton';

type UserPropsType = {
    user: UserType
    follow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void
    unfollow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void
    pressingInProgress: Array<number>
}

const IconsContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))
const UserInfoContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    maxWidth: "296px",
    height: "90px",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "100%",
        height: "106px",
        padding: "0 15px",
    }
}))
const UserNameContainer = styled(Typography)({
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    wordWrap: 'break-word',
})

export const User: FC<UserPropsType> = ({user, follow, unfollow, pressingInProgress}) => {
    return (
        <Card sx={{margin: 1}}>
            <CardActionArea>
                <NavLink to={'/profile/' + user.id}>
                    <UserInfoContainer>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Avatar
                                alt={user.name.toUpperCase()}
                                src={user.photos.small || user.name}
                                sx={{
                                    width: {xs: 50, sm: 96},
                                    height: {xs: 50, sm: 96},
                                    bgcolor: blue[500],
                                    margin: 1,
                                }}
                            />

                            <CardContent sx={{display: {xs: "none", sm: "block"}}}>
                                <UserNameContainer>
                                    <Typography component="div" variant="h6">
                                        {user.name}
                                    </Typography>
                                </UserNameContainer>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {user.status}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{display: {xs: "block", sm: "none"}}}>
                                <UserNameContainer>
                                    <Typography component="div" variant="body2">
                                        {user.name}
                                    </Typography>
                                </UserNameContainer>
                            </CardContent>
                        </Box>

                        <Box>
                            {user.followed
                                ?
                                <Button variant="outlined"
                                        startIcon={<PersonRemoveIcon/>}
                                        disabled={pressingInProgress.some(id => id === user.id)}
                                        sx={{display: {xs: "none", sm: "flex"}, width: "132px"}}
                                        onClick={(e) => unfollow(e, user.id)}>UNFOLLOW
                                </Button>
                                :
                                <Button variant="contained"
                                        startIcon={<PersonAddIcon/>}
                                        disabled={pressingInProgress.some(id => id === user.id)}
                                        sx={{display: {xs: "none", sm: "flex"}, width: "132px"}}
                                        onClick={(e) => follow(e, user.id)}>FOLLOW
                                </Button>
                            }
                            <IconsContainer>
                                {user.followed
                                    ?
                                    <IconButton aria-label={"unfollow"}
                                                size={"small"}
                                                color={"primary"}
                                                disabled={pressingInProgress.some(id => id === user.id)}
                                                onClick={(e) => unfollow(e, user.id)}
                                    >
                                        <PersonRemoveIcon/>
                                    </IconButton>
                                    :
                                    <IconButton aria-label={"follow"}
                                                size={"small"}
                                                color={"primary"}
                                                disabled={pressingInProgress.some(id => id === user.id)}
                                                onClick={(e) => follow(e, user.id)}
                                    >
                                        <PersonAddIcon/>
                                    </IconButton>
                                }
                            </IconsContainer>
                        </Box>
                    </UserInfoContainer>
                </NavLink>
            </CardActionArea>
        </Card>
    );
};