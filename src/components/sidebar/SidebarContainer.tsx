import React, {useEffect} from 'react';
import {Sidebar} from './Sidebar';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../api/usersAPI";
import {getFriends} from "../../redux/friendsReducer";
import {useAppDispatch} from "../../features/hooks/hooks";

export const SidebarContainer = () => {
    const friends = useSelector<AppStateType, UserType[]>(state => state.friends.friends)
    const friendsCount = useSelector<AppStateType, number>(state => state.friends.friendsCount)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFriends())
    }, [isAuth])

    return (
        <Sidebar
            friends={friends}
            friendsCount={friendsCount}
            isAuth={isAuth}
        />
    );
};