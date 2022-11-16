import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {AppRouter} from "./router/AppRouter";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./features/hooks/hooks";
import {Preloader} from "./components/common/Preloader/Preloader";
import {authorize} from "./redux/auth/sagas";

export const App = () => {
    const dispatch = useAppDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authorize())
    }, [dispatch])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <Box>
            <ErrorSnackbar/>
            <HeaderContainer/>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <Nav/>
                <AppRouter/>
                <SidebarContainer/>
            </Stack>
        </Box>
    )
}
