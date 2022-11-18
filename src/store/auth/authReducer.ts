import {ActionsType, UpdateProfileSuccessType, UploadUserPhotoSuccessType} from "../profileReducer";
import {ProfileType} from "../../types/ProfileType";
import {PhotosType} from "../../types/PhotosType";

const SET_USER_DATA = 'index/SET_USER_DATA'
const SET_CURRENT_USER = 'index/SET_CURRENT_USER'
const GET_CAPTCHA_URL_SUCCESS = 'index/GET_CAPTCHA_URL_SUCCESS'

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    currentUser: null,
    captchaUrl: null,
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
                ...state,
                currentUser: {...state.currentUser, photos: action.photos} as ProfileType
            }
        case ActionsType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: {...state.currentUser, ...action.payload.updatedProfile} as ProfileType
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.url}
        default:
            return state
    }
}

//actions
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
)
export const setCurrentUser = (currentUser: ProfileType | null) => ({type: SET_CURRENT_USER, currentUser} as const)
export const getCaptchaUrlSuccess = (url: string | null) => ({type: GET_CAPTCHA_URL_SUCCESS, url} as const)

//types
export type AuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    currentUser: ProfileType | null
    captchaUrl: string | null
}
export type CurrentUserType = {
    fullName: string
    photos: PhotosType
}

export type AuthActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setCurrentUser>
    | ReturnType<typeof getCaptchaUrlSuccess>
    | UploadUserPhotoSuccessType
    | UpdateProfileSuccessType