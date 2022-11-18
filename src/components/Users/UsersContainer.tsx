import {Users} from "./Users";
import {setCurrentPage} from "../../store/users/usersReducer";
import React, {ChangeEvent, MouseEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../features/hooks/hooks";
import {follow, getUsers, unfollow} from "../../store/users/sagas";

export const UsersContainer = () => {
    const users = useAppSelector(state => state.users.users)
    const currentPage = useAppSelector(state => state.users.currentPage)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const totalCount = useAppSelector(state => state.users.totalCount)
    const isFetching = useAppSelector(state => state.users.isFetching)
    const pressingInProgress = useAppSelector(state => state.users.pressingInProgress)
    const searchName = useAppSelector(state => state.users.filter.searchName)
    const userFriends = useAppSelector(state => state.users.filter.userFriends)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [currentPage, pageSize, searchName, userFriends])

    const changePage = (event: ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
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