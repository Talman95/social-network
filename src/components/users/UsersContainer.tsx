import {Users} from "./Users";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {follow, getUsers, setCurrentPage, unfollow} from "../../redux/usersReducer";
import React, {ChangeEvent, MouseEvent, useEffect} from "react";
import {UserType} from "../../api/api";
import {useAppDispatch} from "../../features/hooks/hooks";

type UsersPropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    pressingInProgress: Array<number>
}

export const UsersContainer = () => {
    const {
        users, currentPage, pageSize,
        totalCount, isFetching, pressingInProgress
    } = useSelector<AppStateType, UsersPropsType>(state => state.users)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    const changePage = (event: ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(getUsers(pageNumber, pageSize))
    }
    const followHandler = (e: MouseEvent<HTMLButtonElement>, userID: number) => {
        e.preventDefault()
        dispatch(follow(userID))
    }
    const unfollowHandler = (e: MouseEvent<HTMLButtonElement>, userID: number) => {
        e.preventDefault()
        dispatch(unfollow(userID))
    }

    return (<Users
        users={users}
        follow={followHandler}
        unfollow={unfollowHandler}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        switchPage={changePage}
        isFetching={isFetching}
        pressingInProgress={pressingInProgress}/>)
}