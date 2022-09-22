import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box, Button, Stack, Switch, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../features/hooks/hooks";
import {setFriendsShowing, setSearchName} from "../../../redux/usersReducer";

export const UsersSearchBox: FC = () => {
    const dispatch = useAppDispatch()

    const searchName = useAppSelector(state => state.users.searchName)
    const userFriends = useAppSelector(state => state.users.userFriends)

    const [searchTerm, setSearchTerm] = useState(searchName)
    const [checked, setChecked] = useState(!!userFriends)

    useEffect(() => {

    }, [])

    const handleSetSearchTerm = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const handleSearchClick = () => {
        dispatch(setSearchName(searchTerm))
    }
    const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
        dispatch(setFriendsShowing(e.currentTarget.checked ? true : null))
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
            <Box style={{display: 'flex', alignItems: 'center'}}>
                <Typography>All</Typography>
                <Switch
                    checked={checked}
                    onChange={handleSwitch}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>My</Typography>
            </Box>
            <Button
                variant={'contained'}
                onClick={handleSearchClick}
            >
                Search
            </Button>
        </Stack>
    )
}