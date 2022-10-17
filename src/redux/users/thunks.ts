import {AppThunk} from "../store";
import {FriendTypeConverter} from "../../utils/utils";
import {usersAPI} from "../../api/usersAPI";
import {setAppErrorMessage} from "../appReducer";
import {
    followSuccess, setFriends, setFriendsCount,
    setTotalMembers,
    setUsers,
    toggleIsFetching,
    togglePressingInProgress,
    unfollowSuccess
} from "./usersReducer";

export const getUsers = (): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        const {currentPage, pageSize, filter} = getState().users

        const friend = FriendTypeConverter.toBoolean(filter.userFriends)

        const res = await usersAPI.getUsers({
            currentPage,
            pageSize,
            searchName: filter.searchName,
            userFriends: friend,
        })
        dispatch(setUsers(res.items))
        dispatch(setTotalMembers(res.totalCount))
        dispatch(toggleIsFetching(false))
    }
}

export const follow = (userId: number): AppThunk => {
    return async (dispatch) => {
        dispatch(togglePressingInProgress(true, userId))
        try {
            const response = await usersAPI.follow(userId)
            if (response.resultCode === 0) {
                dispatch(followSuccess(userId))
                dispatch(getFriends())
            } else {
                if (response.messages.length) {
                    dispatch(setAppErrorMessage(response.messages[0]))
                } else {
                    dispatch(setAppErrorMessage('Some error occurred'))
                }
            }
        } catch (error: any) {
            dispatch(setAppErrorMessage(error.message))
        }
        dispatch(togglePressingInProgress(false, userId))
    }
}

export const unfollow = (userId: number): AppThunk => {
    return async (dispatch) => {
        dispatch(togglePressingInProgress(true, userId))
        try {
            const response = await usersAPI.unfollow(userId)
            if (response.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
                dispatch(getFriends())
            } else {
                if (response.messages.length) {
                    dispatch(setAppErrorMessage(response.messages[0]))
                } else {
                    dispatch(setAppErrorMessage('Some error occurred'))
                }
            }
        } catch (error: any) {
            dispatch(setAppErrorMessage(error.message))
        }
        dispatch(togglePressingInProgress(false, userId))
    }
}

export const getFriends = (): AppThunk => {
    return async (dispatch, getState) => {
        if (getState().auth.isAuth) {
            const response = await usersAPI.getUsers({userFriends: true})
            dispatch(setFriends(response.items))
            dispatch(setFriendsCount(response.totalCount))
        }
    }
}