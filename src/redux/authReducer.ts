import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {formValuesModel} from "../components/Login/Login";

const SET_USER_DATA = 'SET_USER_DATA'

export const authReducer = (state = initialState, action: ActionTypes): AuthStateType => {
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

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserData(id, email, login, true))
            }
        })
}
export const login = ({email, password, rememberMe}: formValuesModel) => (dispatch: Dispatch<any>) => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
            else {
                return data.messages
            }
        })
}
export const logout = () => (dispatch: Dispatch<any>) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
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
type ActionTypes = ReturnType<typeof setUserData>