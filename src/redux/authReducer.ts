import {authAPI} from "../api/api";
import {formValuesModel} from "../components/Login/Login";
import {AppThunk} from "./store";
import {setAppErrorMessage} from "./appReducer";

const SET_USER_DATA = 'SET_USER_DATA'
const LOADING_IN_PROGRESS = 'LOADING_IN_PROGRESS'

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isLoading: true,
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case LOADING_IN_PROGRESS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

//actions
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
)
export const setLoading = (isLoading: boolean) => ({type: LOADING_IN_PROGRESS, isLoading} as const)

//thunks
export const getAuthUserData = (): AppThunk => {
    return async (dispatch) => {
        const response = await authAPI.authMe()
        if (response.resultCode === 0) {
            let {id, email, login} = response.data
            dispatch(setUserData(id, email, login, true))
        }
        dispatch(setLoading(false))
    }
}
export const login = ({email, password, rememberMe}: formValuesModel): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password, rememberMe)
            if (response.resultCode === 0) {
                dispatch(getAuthUserData())
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
    isLoading: boolean
}

export type AuthActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setLoading>