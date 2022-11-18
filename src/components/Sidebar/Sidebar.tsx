import React, {FC} from 'react';
import Box from '@mui/material/Box';
import {Avatar, AvatarGroup, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {NavLink, useMatch, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../features/hooks/hooks";
import {setUsersFilter} from "../../store/users/usersReducer";
import {UserType} from "../../types/UserType";

type SidebarPropsType = {
    followings: UserType[]
    followingsCount: number
    isAuth: boolean
}

export const Sidebar: FC<SidebarPropsType> = ({followings, followingsCount, isAuth}) => {
    const match = useMatch('/users')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleClick = async () => {
        if (match) {
            dispatch(setUsersFilter({searchName: '', userFriends: 'follow'}))
        } else {
            navigate('users?friend=true')
        }
    }

    return (
        <Box flex={2} p={2} sx={{display: {xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
                <Card sx={{margin: 1}}>
                    <CardContent>
                        <CardActionArea style={{marginBottom: 5, padding: 5}} onClick={handleClick}>
                            <Typography variant={"h6"} fontWeight={100}>Following</Typography>
                        </CardActionArea>
                        {followingsCount === 0 || !isAuth
                            ?
                            <Typography variant={"body1"}>Following your friends</Typography>
                            :
                            <AvatarGroup max={8} total={followingsCount}>
                                {followings.map(f => (
                                    <NavLink to={'/profile/' + f.id} key={f.id}>
                                        <Avatar alt={f.name} src={f.photos.small ? f.photos.small : ''}/>
                                    </NavLink>
                                ))}
                            </AvatarGroup>
                        }
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}