import {usersAPI, UserType} from "../api/usersAPI";
import {AppThunk} from "./store";
import {getFriends} from "./friendsReducer";
import {setAppErrorMessage} from "./appReducer";

export enum ACTIONS_TYPE {
    FOLLOW_SUCCESS = 'Users/FOLLOW_SUCCESS',
    UNFOLLOW_SUCCESS = 'Users/UNFOLLOW_SUCCESS',
    SET_USERS = 'Users/SET_USERS',
    SET_CURRENT_PAGE = 'Users/SET_CURRENT_PAGE',
    SET_TOTAL_MEMBERS = 'Users/SET_TOTAL_MEMBERS',
    TOGGLE_IS_FETCHING = 'Users/TOGGLE_IS_FETCHING',
    TOGGLE_PRESSING_IN_PROGRESS = 'Users/TOGGLE_PRESSING_IN_PROGRESS',
    SET_SEARCH_NAME = 'Users/SET_SEARCH_NAME',
}

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    isFetching: false,
    pressingInProgress: [] as Array<number>,
    searchName: '',
    userFriends: null as boolean | null,
}

export const usersReducer = (state = initialState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.FOLLOW_SUCCESS:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: true}
                    : u
                )
            }
            return state
        case ACTIONS_TYPE.UNFOLLOW_SUCCESS:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: false}
                    : u
                )
            }
            return state
        case ACTIONS_TYPE.SET_USERS:
        case ACTIONS_TYPE.SET_CURRENT_PAGE:
        case ACTIONS_TYPE.SET_TOTAL_MEMBERS:
        case ACTIONS_TYPE.TOGGLE_IS_FETCHING:
        case ACTIONS_TYPE.SET_SEARCH_NAME:
            return {
                ...state,
                ...action.payload,
            }
        case ACTIONS_TYPE.TOGGLE_PRESSING_IN_PROGRESS:
            return {
                ...state,
                pressingInProgress: action.isPressed
                    ? [...state.pressingInProgress, action.userId]
                    : state.pressingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
};

//actions
export const followSuccess = (userID: number) => ({type: ACTIONS_TYPE.FOLLOW_SUCCESS, userID} as const);
export const unfollowSuccess = (userID: number) => ({type: ACTIONS_TYPE.UNFOLLOW_SUCCESS, userID} as const);
export const setUsers = (users: Array<UserType>) => ({type: ACTIONS_TYPE.SET_USERS, payload: {users}} as const);
export const setCurrentPage = (currentPage: number) => (
    {type: ACTIONS_TYPE.SET_CURRENT_PAGE, payload: {currentPage}} as const
)
export const setTotalMembers = (totalCount: number) => (
    {type: ACTIONS_TYPE.SET_TOTAL_MEMBERS, payload: {totalCount}} as const
)
export const toggleIsFetching = (isFetching: boolean) => (
    {type: ACTIONS_TYPE.TOGGLE_IS_FETCHING, payload: {isFetching}} as const
)
export const togglePressingInProgress = (isPressed: boolean, userId: number) => (
    {type: ACTIONS_TYPE.TOGGLE_PRESSING_IN_PROGRESS, isPressed, userId} as const
)
export const setSearchName = (searchName: string) => (
    {type: ACTIONS_TYPE.SET_SEARCH_NAME, payload: {searchName, currentPage: 1}} as const
)

//thunks
export const getUsers = (): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        const {currentPage, pageSize, searchName, userFriends} = getState().users
        const res = await usersAPI.getUsers({
            currentPage,
            pageSize,
            searchName,
            userFriends,
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

//types
export type UsersStateType = typeof initialState

export type UsersActionsType =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalMembers>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof togglePressingInProgress>
    | ReturnType<typeof setSearchName>
