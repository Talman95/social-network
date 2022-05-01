import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AppStateType} from "../redux/store";
import {useSelector} from 'react-redux';
import {ProfileContainer} from "../components/Profile/ProfileContainer";
import Messages from "../components/Messages/Messages";
import UsersContainer from "../components/Users/UsersContainer";
import {Login} from "../components/Login/Login";
import {Error404} from "./Error404";
import {Preloader} from "../components/common/Preloader/Preloader";

export const AppRouter = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const isLoading = useSelector<AppStateType, boolean>(state => state.auth.isLoading)

    if (isLoading) {
        return <Preloader />
    }

    return (
        <div>
            {isAuth
                ?
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                    <Route path={'/profile'} element={<ProfileContainer/>}/>
                    <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                    <Route path={'/messages/*'} element={<Messages/>}/>
                    <Route path={'/users'} element={<UsersContainer/>}/>
                    <Route path={'*'} element={<Error404/>}/>
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
        </div>
    );
};