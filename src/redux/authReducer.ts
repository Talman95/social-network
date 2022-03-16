const SET_USER_DATA = 'SET_USER_DATA'

export type AuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action: ActionTypes): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state
    }
}

type ActionTypes = ReturnType<typeof setUserData>

export const setUserData = (id: number, email: string, login: string) => (
    {type: SET_USER_DATA, payload: {id, email, login}} as const
)