import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../features/hooks/hooks";
import {setSearchName} from "../../../redux/usersReducer";

export const UsersSearchBox: FC = () => {
    const dispatch = useAppDispatch()

    const searchName = useAppSelector(state => state.users.searchName)

    const [searchTerm, setSearchTerm] = useState(searchName)

    useEffect(() => {
        return () => {
            dispatch(setSearchName(''))
        }
    }, [])

    const handleSetSearchTerm = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const handleSearchClick = () => {
        dispatch(setSearchName(searchTerm))
    }

    return (
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={3}
        >
        <TextField
                id={'users-search'}
                label={'Search'}
                variant={'outlined'}
                value={searchTerm}
                onChange={handleSetSearchTerm}
            />
            <Button
                variant={'contained'}
                onClick={handleSearchClick}
            >
                Search
            </Button>
        </Stack>
    )
}