import React, {useCallback} from "react";
import {Header} from "./Header";
import {logout} from "../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../features/hooks/hooks";
import {useNavigate} from "react-router-dom";

export const HeaderContainer = () => {
    const currentUser = useAppSelector(state => state.auth.currentUser)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    const navigateToProfile = () => navigate('/profile')
    const navigateToUsers = () => navigate('/users')
    const navigateToMessages = () => navigate('/messages')
    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <Header
            isAuth={isAuth}
            currentUser={currentUser}
            logout={logoutHandler}
            navigateToProfile={navigateToProfile}
            navigateToUsers={navigateToUsers}
            navigateToMessages={navigateToMessages}
        />
    );
};