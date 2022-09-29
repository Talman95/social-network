import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import {useAppDispatch} from "../../../features/hooks/hooks";
import {FriendUiType, setUsersFilter} from "../../../redux/usersReducer";

type PropsType = {
    searchName: string,
    userFriends: FriendUiType
}

export const UsersSearchBox: FC<PropsType> = ({searchName, userFriends}) => {
    const dispatch = useAppDispatch()

    const [searchTerm, setSearchTerm] = useState(searchName)
    const [friends, setFriends] = useState(userFriends)

    useEffect(() => {
        setSearchTerm(searchName)
        setFriends(userFriends)
    }, [searchName, userFriends])

    const handleSetSearchTerm = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const handleSearchClick = () => {
        dispatch(setUsersFilter({searchName: searchTerm, userFriends: friends}))
    }
    const handleSelectFilter = (e: SelectChangeEvent) => {
        const resultFriend = e.target.value as FriendUiType
        setFriends(resultFriend)
        dispatch(setUsersFilter({searchName: searchTerm, userFriends: resultFriend}))
    }

    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            spacing={3}
        >
            <TextField
                id={'users-search'}
                label={'Search'}
                variant={'outlined'}
                value={searchTerm}
                onChange={handleSetSearchTerm}
            />
            <Select
                labelId={'select-label'}
                id={'simple-select'}
                onChange={handleSelectFilter}
                style={{width: 163}}
                value={friends}
            >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'follow'}>Only followed</MenuItem>
                <MenuItem value={'unfollow'}>Only unfollowed</MenuItem>
            </Select>
            <Button
                variant={'contained'}
                onClick={handleSearchClick}
            >
                Search
            </Button>
        </Stack>
    )
}