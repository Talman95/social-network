import {AppThunk} from "../store";
import {setAppErrorMessage} from "../app/appReducer";
import {formValuesModel} from "../../components/Login/Login";
import {getCaptchaUrlSuccess, setCurrentUser, setUserData} from "./authReducer";
import {authAPI} from "../../api/auth";
import {profileAPI} from "../../api/profile";

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
export const login = ({email, password, rememberMe, captcha}: formValuesModel): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.resultCode === 0) {
                dispatch(getAuthUserData())
            } else if (response.resultCode === 10) {
                dispatch(getCaptchaUrl())
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
export const getCaptchaUrl = (): AppThunk => {
    return async (dispatch) => {
        const res = await authAPI.getCaptcha()
        dispatch(getCaptchaUrlSuccess(res.data.url))
    }
}
export const logout = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authAPI.logout()
            if (response.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
                dispatch(setCurrentUser(null))
                dispatch(getCaptchaUrlSuccess(null))
            }
        } catch (error: any) {

        }
    }
}