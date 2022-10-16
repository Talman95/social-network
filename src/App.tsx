import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav1/Nav";
import {HeaderContainer} from "./components/Header1/HeaderContainer";
import {AppRouter} from "./router/AppRouter";
import {initializeApp} from "./redux/appReducer";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {SidebarContainer} from "./components/Sidebar1/SidebarContainer";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./features/hooks/hooks";
import {Preloader} from "./components/common/Preloader/Preloader";

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeApp())
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
    );
}

export default App;
