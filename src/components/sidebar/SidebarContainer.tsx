import React, {useEffect} from 'react';
import {Sidebar} from './Sidebar';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../api/api";
import {Dispatch} from "redux";
import {getFriends} from "../../redux/friendsReducer";

export const SidebarContainer = () => {
    const friends = useSelector<AppStateType, UserType[]>(state => state.friends.friends)
    const friendsCount = useSelector<AppStateType, number>(state => state.friends.friendsCount)

    const dispatch = useDispatch<Dispatch<any>>()

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    return (
        <Sidebar
            friends={friends}
            friendsCount={friendsCount}
        />
    );
};