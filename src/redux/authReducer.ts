import {authAPI, profileAPI, ProfileType} from "../api/api";
import {formValuesModel} from "../components/Login/Login";
import {AppStateType, AppThunk} from "./store";
import {setAppErrorMessage} from "./appReducer";
import {ActionsType, UploadUserPhotoSuccessType} from "./profileReducer";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_PROFILE = 'auth/SET_PROFILE'

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    profile: null,
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case ActionsType.UPLOAD_USER_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

//actions
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
)
export const setProfile = (profile: ProfileType | null) => ({type: SET_PROFILE, profile} as const)

//thunks
export const getAuthUserData = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authAPI.authMe()
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login, true))
                const res = await profileAPI.getProfile(id)
                dispatch(setProfile(res.data))
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
                dispatch(setProfile(null))
            }
        } catch (error: any) {

        }
    }
}
export const updateProfile = (values: ValuesForUpdateProfile): AppThunk => {
    return async (dispatch, getState: () => AppStateType) => {
        const userId = getState().auth.id
        try {
            const updatedProfile = {...values, userId}
            const res = await profileAPI.updateProfile(updatedProfile)
            if (res.data.resultCode === 0 && userId) {
                const res = await profileAPI.getProfile(userId)
                dispatch(setProfile(res.data))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorMessage(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorMessage('Some error occurred'))
                }
            }
        } catch (error: any) {
            dispatch(setAppErrorMessage(error.message))
        }
    }
}

//types
export type AuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    profile: ProfileType | null
}
export type ValuesForUpdateProfile = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    }
    aboutMe: string
}

export type AuthActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setProfile>
    | UploadUserPhotoSuccessType