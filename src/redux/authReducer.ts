import {authAPI} from "../api/api";
import {formValuesModel} from "../components/Login/Login";
import {AppThunk} from "./store";

const SET_USER_DATA = 'SET_USER_DATA'

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

//actions
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
)

//thunks
export const getAuthUserData = (): AppThunk => {
    return async (dispatch) => {
        const response = await authAPI.authMe()
        if (response.resultCode === 0) {
            let {id, email, login} = response.data
            dispatch(setUserData(id, email, login, true))
        }
    }
}
export const login = ({email, password, rememberMe}: formValuesModel): AppThunk => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe)
        if (response.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            return response.messages
        }
    }
}
export const logout = (): AppThunk => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}

//types
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
export type AuthActionsType = ReturnType<typeof setUserData>