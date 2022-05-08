import {usersAPI, UserType} from "../api/api";
import {AppThunk} from "./store";

const SET_FRIENDS = "SET_FRIENDS"
const SET_FRIENDS_COUNT = "SET_FRIENDS_COUNT"

const initialState = {
    friends: [] as UserType[],
    friendsCount: 0,
}

export const friendsReducer = (state = initialState, action: FriendsActionsType): FriendsStateType => {
    switch (action.type) {
        case SET_FRIENDS:
        case SET_FRIENDS_COUNT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//actions
const setFriends = (friends: Array<UserType>) => (
    {type: SET_FRIENDS, payload: {friends}} as const
)
const setFriendsCount = (friendsCount: number) => (
    {type: SET_FRIENDS_COUNT, payload: {friendsCount}} as const
)

//thunks
export const getFriends = (): AppThunk => {
    return async (dispatch) => {
        const response = await usersAPI.getFriends()
        dispatch(setFriends(response.items))
        dispatch(setFriendsCount(response.totalCount))
    }
}

//types
type FriendsStateType = typeof initialState

export type FriendsActionsType =
    | ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsCount>