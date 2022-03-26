import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export enum ACTIONS_TYPES {
    FOLLOW = 'Users/FOLLOW',
    UNFOLLOW = 'Users/UNFOLLOW',
    SET_USERS = 'Users/SET_USERS',
    SET_CURRENT_PAGE = 'Users/SET_CURRENT_PAGE',
    SET_TOTAL_MEMBERS = 'Users/SET_TOTAL_MEMBERS',
    TOGGLE_IS_FETCHING = 'Users/TOGGLE_IS_FETCHING',
    TOGGLE_PRESSING_IN_PROGRESS = 'Users/TOGGLE_PRESSING_IN_PROGRESS',
}

type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    isFetching: false,
    pressingInProgress: [] as Array<number>,
}

export type ProfileStateType = typeof initialState

export const usersReducer = (state = initialState, action: UsersActionType): ProfileStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.FOLLOW:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: true}
                    : u
                )
            }
            return state
        case ACTIONS_TYPES.UNFOLLOW:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: false}
                    : u
                )
            }
            return state
        case ACTIONS_TYPES.SET_USERS:
            return {...state, users: action.users}
        case ACTIONS_TYPES.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case ACTIONS_TYPES.SET_TOTAL_MEMBERS:
            return {...state, totalCount: action.totalCount}
        case ACTIONS_TYPES.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case ACTIONS_TYPES.TOGGLE_PRESSING_IN_PROGRESS:
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

type UsersActionType =
    ReturnType<typeof follow> | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalMembers> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof togglePressingInProgress>

export const follow = (userID: number) => ({type: ACTIONS_TYPES.FOLLOW, userID} as const);
export const unfollow = (userID: number) => ({type: ACTIONS_TYPES.UNFOLLOW, userID} as const);
export const setUsers = (users: Array<UserType>) => ({type: ACTIONS_TYPES.SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => (
    {type: ACTIONS_TYPES.SET_CURRENT_PAGE, currentPage} as const
)
export const setTotalMembers = (totalCount: number) => (
    {type: ACTIONS_TYPES.SET_TOTAL_MEMBERS, totalCount} as const
)
export const toggleIsFetching = (isFetching: boolean) => (
    {type: ACTIONS_TYPES.TOGGLE_IS_FETCHING, isFetching} as const
)
export const togglePressingInProgress = (isPressed: boolean, userId: number) => (
    {type: ACTIONS_TYPES.TOGGLE_PRESSING_IN_PROGRESS, isPressed, userId} as const
)

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalMembers(data.totalCount))
            })
    }
}