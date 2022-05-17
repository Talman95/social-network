import React, {FC} from 'react';
import Box from '@mui/material/Box';
import {Avatar, AvatarGroup, Typography} from "@mui/material";
import {UserType} from "../../api/api";
import {NavLink} from "react-router-dom";

type SidebarPropsType = {
    friends: UserType[]
    friendsCount: number
}

export const Sidebar: FC<SidebarPropsType> = ({friends, friendsCount}) => {
    return (
        <Box flex={2} p={2} sx={{display: {xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
                <Typography variant={"h6"} fontWeight={100}>Your Following</Typography>
                {friendsCount === 0
                    ?
                    <Typography variant={"body1"}>Following your friends</Typography>
                    :
                    <AvatarGroup max={8} total={friendsCount}>
                        {friends.map(f => (
                            <NavLink to={'/profile/' + f.id} key={f.id}>
                                <Avatar alt={f.name} src={f.photos.small ? f.photos.small : ''}/>
                            </NavLink>
                        ))}
                    </AvatarGroup>
                }
            </Box>
        </Box>
    );
};