import {authAPI, PhotosType, profileAPI, ProfileType} from "../api/api";
import {formValuesModel} from "../components/Login/Login";
import {AppThunk} from "./store";
import {setAppErrorMessage} from "./appReducer";
import {ActionsType, UpdateProfileSuccessType, UploadUserPhotoSuccessType} from "./profileReducer";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    currentUser: null,
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case ActionsType.UPLOAD_USER_PHOTO_SUCCESS:
            return {
                ...state, currentUser: {...state.currentUser, photos: action.photos} as ProfileType
            }
        case ActionsType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: {...state.currentUser, fullName: action.payload.updatedProfile.fullName} as ProfileType
            }
        default:
            return state
    }
}

//actions
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
)
export const setCurrentUser = (currentUser: CurrentUserType | null) => ({type: SET_CURRENT_USER, currentUser} as const)

//thunks
export const getAuthUserData = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authAPI.authMe()
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login, true))
                const res = await profileAPI.getProfile(id)
                dispatch(setCurrentUser(res.data))
            }
        } catch (error: any) {
            dispatch(setAppErrorMessage(error.message))
        }
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
        try {
            const response = await authAPI.logout()
            if (response.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
                dispatch(setCurrentUser(null))
            }
        } catch (error: any) {

        }
    }
}

//types
export type AuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    currentUser: CurrentUserType | null
}
export type CurrentUserType = {
    fullName: string
    photos: PhotosType
}

export type AuthActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setCurrentUser>
    | UploadUserPhotoSuccessType
    | UpdateProfileSuccessType