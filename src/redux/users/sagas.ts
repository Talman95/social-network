import {call, put, select, takeEvery} from "redux-saga/effects";
import {FriendTypeConverter} from "../../utils/utils";
import {GetUsersResponseType, usersAPI} from "../../api/usersAPI";
import {
    followSuccess,
    setFriends,
    setFriendsCount,
    setTotalMembers,
    setUsers,
    toggleIsFetching,
    togglePressingInProgress,
    unfollowSuccess
} from "./usersReducer";
import {setAppErrorMessage} from "../app/appReducer";
import {ResponseType} from "../../api/api";
import {RootState} from "../store";

const GET_USERS = 'USERS/GET_USERS'
const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const GET_FRIENDS = 'USERS/GET_FRIENDS'

export function* usersWatcher() {
    yield takeEvery(GET_USERS, getUsersWorker)
    yield takeEvery(FOLLOW, followWorker)
    yield takeEvery(UNFOLLOW, unfollowWorker)
    yield takeEvery(GET_FRIENDS, getFriendsWorker)
}

export function* getUsersWorker() {
    yield put(toggleIsFetching(true))
    const {currentPage, pageSize, filter} = yield select(state => state.users)

    const friend = FriendTypeConverter.toBoolean(filter.userFriends)
    const params = {
        currentPage,
        pageSize,
        searchName: filter.searchName,
        userFriends: friend,
    }

    const res: GetUsersResponseType = yield call(usersAPI.getUsers, params)
    yield put(setUsers(res.items))
    yield put(setTotalMembers(res.totalCount))
    yield put(toggleIsFetching(false))
}

export function* followWorker(action: FollowActionType) {
    yield put(togglePressingInProgress(true, action.userId))
    try {
        const response: ResponseType<{}> = yield call(usersAPI.follow, action.userId)
        if (response.resultCode === 0) {
            yield put(followSuccess(action.userId))
            yield put(getFriends())
        } else {
            if (response.messages.length) {
                yield put(setAppErrorMessage(response.messages[0]))
            } else {
                yield put(setAppErrorMessage('Some error occurred'))
            }
        }
    } catch (error: any) {
        yield put(setAppErrorMessage(error.message))
    }
    yield put(togglePressingInProgress(false, action.userId))
}

export function* unfollowWorker(action: UnfollowActionType) {
    yield put(togglePressingInProgress(true, action.userId))
    try {
        const response: ResponseType<{}> = yield call(usersAPI.unfollow, action.userId)
        if (response.resultCode === 0) {
            yield put(unfollowSuccess(action.userId))
            yield put(getFriends())
        } else {
            if (response.messages.length) {
                yield put(setAppErrorMessage(response.messages[0]))
            } else {
                yield put(setAppErrorMessage('Some error occurred'))
            }
        }
    } catch (error: any) {
        yield put(setAppErrorMessage(error.message))
    }
    yield put(togglePressingInProgress(false, action.userId))
}

export function* getFriendsWorker() {
    const isAuth: boolean = yield select((state: RootState) => state.auth.isAuth)

    if (isAuth) {
        const res: GetUsersResponseType = yield call(usersAPI.getUsers, {userFriends: true})
        yield put(setFriends(res.items))
        yield put(setFriendsCount(res.totalCount))
    }
}

export const getUsers = () => ({type: GET_USERS})
export const follow = (userId: number) => ({type: FOLLOW, userId})
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId})
export const getFriends = () => ({type: GET_FRIENDS})

type FollowActionType = ReturnType<typeof follow>
type UnfollowActionType = ReturnType<typeof unfollow>

export type UsersSagasType =
    | ReturnType<typeof getUsers>
    | ReturnType<typeof getFriends>
    | FollowActionType
    | UnfollowActionType