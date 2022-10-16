import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {User} from "./User1/User";
import {Preloader} from "../common/Preloader/Preloader";
import {UserType} from "../../api/usersAPI";
import {Box, Card, CardContent, Pagination, Typography} from "@mui/material";
import Stack from '@mui/material/Stack';
import {UsersSearchBox} from "./SearchBox/UsersSearchBox";
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../features/hooks/hooks";
import {FriendTypeConverter, getCountPages} from "../../utils/utils";
import {setCurrentPage, setUsersFilter} from "../../redux/usersReducer";

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
    const mappedUsers = props.users.length === 0
        ? <Card sx={{margin: 1}}>
            <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography>
                    Users not found
                </Typography>
            </CardContent>
        </Card>
        : props.users.map((u) =>
            <User
                key={u.id}
                user={u}
                follow={props.follow}
                unfollow={props.unfollow}
                pressingInProgress={props.pressingInProgress}
            />
        )

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const searchName = useAppSelector(state => state.users.filter.searchName)
    const userFriends = useAppSelector(state => state.users.filter.userFriends)
    const countPages = getCountPages(props.totalCount, props.pageSize)

    useEffect(() => {
        const term = searchParams.get('term') || searchName

        const friendQuery = searchParams.get('friend') || userFriends

        const friend = FriendTypeConverter.toFriendType(friendQuery)

        const page = searchParams.get('page') || props.currentPage

        dispatch(setUsersFilter({searchName: term, userFriends: friend}))
        dispatch(setCurrentPage(+page))

        return () => {
            dispatch(setUsersFilter({searchName: '', userFriends: 'all'}))
        }
    }, [])

    useEffect(() => {
        let params: any = {}

        if (props.currentPage > 1) params.page = String(props.currentPage)
        if (searchName) params.term = searchName
        if (userFriends === 'follow') params.friend = true
        if (userFriends === 'unfollow') params.friend = false

        setSearchParams(params)

    }, [props.currentPage, searchName, userFriends])

    return (
        <Box>
            <UsersSearchBox
                searchName={searchName}
                userFriends={userFriends}
                isFetching={props.isFetching}
            />
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