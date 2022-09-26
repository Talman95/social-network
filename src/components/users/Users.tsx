import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {User} from "./User/User";
import {Preloader} from "../common/Preloader/Preloader";
import {UserType} from "../../api/usersAPI";
import {Box, Pagination} from "@mui/material";
import Stack from '@mui/material/Stack';
import {UsersSearchBox} from "./SearchBox/UsersSearchBox";
import {useSearchParams} from 'react-router-dom';
import {useAppSelector} from "../../features/hooks/hooks";

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

    const [searchParams, setSearchParams] = useSearchParams()

    const searchName = useAppSelector(state => state.users.filter.searchName)
    const userFriends = useAppSelector(state => state.users.filter.userFriends)

    useEffect(() => {
        let params: any = {}

        if (props.currentPage > 1) params.page = String(props.currentPage)
        if (searchName) params.term = searchName
        if (userFriends === 'follow') params.friend = true
        if (userFriends === 'unfollow') params.friend = false

        setSearchParams(params)

    }, [props.currentPage, searchName, userFriends])

    const pages: number[] = []
    const countPages = Math.ceil(props.totalCount / props.pageSize)
    for (let i = 1; i <= 20; i++) {
        pages.push(i)
    }

    return (
        <Box>
            <UsersSearchBox searchName={searchName} userFriends={userFriends}/>
            {props.isFetching
                ? <Preloader/>
                : mappedUsers
            }
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
        </Box>
    );
}