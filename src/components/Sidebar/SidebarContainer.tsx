import React, {useEffect} from 'react';
import {Sidebar} from './Sidebar';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../api/types";
import {useAppDispatch} from "../../features/hooks/hooks";
import {getFriends} from "../../redux/users/sagas";

export const SidebarContainer = () => {
    const followings = useSelector<AppStateType, UserType[]>(state => state.users.followings)
    const followingsCount = useSelector<AppStateType, number>(state => state.users.followingsCount)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFriends())
    }, [isAuth])

    return (
        <Sidebar
            followings={followings}
            followingsCount={followingsCount}
            isAuth={isAuth}
        />
    );
};