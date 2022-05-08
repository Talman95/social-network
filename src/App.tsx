import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AppRouter} from "./router/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {initializeApp} from "./redux/appReducer";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/common/Preloader/Preloader";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";

const App: React.FC = () => {
    const dispatch = useDispatch<Dispatch<any>>()
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <Box>
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
