import React, {ChangeEvent, FC, MouseEvent} from 'react';
import {User} from "./User/User";
import {Preloader} from "../common/Preloader/Preloader";
import {UserType} from "../../api/api";
import {Box, Pagination} from "@mui/material";
import Stack from '@mui/material/Stack';

type UsersPropsType = {
    users: Array<UserType>
    follow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void
    unfollow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void
    currentPage: number
    pageSize: number
    totalCount: number
    switchPage: (event: ChangeEvent<unknown>, pageNumber: number) => void
    isFetching: boolean
    pressingInProgress: Array<number>
}

export const Users: FC<UsersPropsType> = (props) => {
    const mappedUsers = props.users.map((u) =>
        <User
            key={u.id}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            pressingInProgress={props.pressingInProgress}
        />
    )

    const pages: number[] = []
    const countPages = Math.ceil(props.totalCount / props.pageSize)
    for (let i = 1; i <= 20; i++) {
        pages.push(i)
    }

    return (
        <Box>
            <Stack spacing={2} sx={{display: "flex", alignItems: "center"}}>
                <Pagination
                    sx={{display: {xs: "none", sm: "block"}}}
                    count={countPages}
                    page={props.currentPage}
                    onChange={props.switchPage}
                />
                <Pagination
                    sx={{display: {xs: "block", sm: "none"}}}
                    count={countPages}
                    page={props.currentPage}
                    siblingCount={0}
                    onChange={props.switchPage}
                    size={"small"}
                />
            </Stack>
            {props.isFetching
                ? <Preloader/>
                : mappedUsers
            }
        </Box>
    );
}