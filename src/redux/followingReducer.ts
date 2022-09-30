import {usersAPI, UserType} from "../api/usersAPI";
import {AppThunk} from "./store";

const SET_FOLLOWINGS = "followings/SET_FOLLOWINGS"
const SET_FOLLOWINGS_COUNT = "followings/SET_FOLLOWINGS_COUNT"

const initialState = {
    followings: [] as UserType[],
    followingsCount: 0,
}

export const followingReducer = (state = initialState, action: FriendsActionsType): FriendsStateType => {
    switch (action.type) {
        case SET_FOLLOWINGS:
        case SET_FOLLOWINGS_COUNT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//actions
const setFriends = (followings: Array<UserType>) => (
    {type: SET_FOLLOWINGS, payload: {followings}} as const
)
const setFriendsCount = (followingsCount: number) => (
    {type: SET_FOLLOWINGS_COUNT, payload: {followingsCount}} as const
)

//thunks
export const getFriends = (): AppThunk => {
    return async (dispatch, getState) => {
        if (getState().auth.isAuth) {
            const response = await usersAPI.getUsers({userFriends: true})
            dispatch(setFriends(response.items))
            dispatch(setFriendsCount(response.totalCount))
        }
    }
}

//types
type FriendsStateType = typeof initialState

export type FriendsActionsType =
    | ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsCount>