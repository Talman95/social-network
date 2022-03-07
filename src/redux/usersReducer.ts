export enum ACTIONS_TYPES {
    FOLLOW = 'Users/FOLLOW',
    UNFOLLOW = 'Users/UNFOLLOW',
    SET_USERS = 'Users/SET_USERS',
    SET_CURRENT_PAGE = 'Users/SET_CURRENT_PAGE',
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
    sizePage: 10,
    totalCount: 100,
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
        default:
            return state
    }
};

type UsersActionType =
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage>

export const follow = (userID: number) => ({type: ACTIONS_TYPES.FOLLOW, userID} as const);
export const unfollow = (userID: number) => ({type: ACTIONS_TYPES.UNFOLLOW, userID} as const);
export const setUsers = (users: Array<UserType>) => ({type: ACTIONS_TYPES.SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => (
    {type: ACTIONS_TYPES.SET_CURRENT_PAGE, currentPage} as const
)
