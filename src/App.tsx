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
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Sidebar} from "./components/Sidebar/Sidebar";

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
            {/*<Container>*/}
                <Stack direction={'row'} spacing={3} justifyContent={'space-between'} mt={2}>
                    <Nav/>
                    <AppRouter/>
                    <Sidebar/>
                </Stack>
            {/*</Container>*/}
        </Box>
    );
}

export default App;
