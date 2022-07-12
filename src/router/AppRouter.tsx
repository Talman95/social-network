import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {ProfileContainer} from "../components/Profile/ProfileContainer";
import Messages from "../components/Messages/Messages";
import {UsersContainer} from "../components/Users/UsersContainer";
import {Login} from "../components/Login/Login";
import {Error404} from "./Error404";
import Box from "@mui/material/Box";
import {SettingsContainer} from "../components/Settings/SettingsContainer";
import {useAppSelector} from "../features/hooks/hooks";

export const AppRouter = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    return (
        <Box
            flex={4}
            p={2}
        >
            {isAuth
                ?
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                    <Route path={'/profile'} element={<ProfileContainer/>}/>
                    <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                    <Route path={'/messages/*'} element={<Messages/>}/>
                    <Route path={'/users'} element={<UsersContainer/>}/>
                    <Route path={'*'} element={<Error404/>}/>
                    <Route path={'/settings'} element={<SettingsContainer/>}/>
                </Routes>
                :
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace/>}
                    />
                </Routes>
            }
        </Box>
    );
};