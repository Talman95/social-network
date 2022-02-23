const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

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

let initialState = {
    users: [] as Array<UserType>
}

export type ProfileStateType = typeof initialState

export const usersReducer = (state = initialState, action: UsersActionType): ProfileStateType => {
    switch (action.type) {
        case FOLLOW:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: true}
                    : u
                )
            }
            return state
        case UNFOLLOW:
            state = {
                ...state,
                users: state.users.map(u => u.id === action.userID
                    ? {...u, followed: false}
                    : u
                )
            }
            return state
        case SET_USERS:
            return {...state, users: action.users}
        default:
            return state
    }
};

type UsersActionType =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>;

export const followAC = (userID: number) => ({type: FOLLOW, userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);