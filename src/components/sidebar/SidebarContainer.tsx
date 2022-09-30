import React, {useEffect} from 'react';
import {Sidebar} from './Sidebar';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../api/usersAPI";
import {getFriends} from "../../redux/followingReducer";
import {useAppDispatch} from "../../features/hooks/hooks";

export const SidebarContainer = () => {
    const followings = useSelector<AppStateType, UserType[]>(state => state.following.followings)
    const followingsCount = useSelector<AppStateType, number>(state => state.following.followingsCount)
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