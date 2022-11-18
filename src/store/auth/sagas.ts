import {call, put, takeEvery} from "redux-saga/effects";
import {getCaptchaUrlSuccess, setCurrentUser, setUserData} from "./authReducer";
import {AxiosResponse} from "axios";
import {initializedSuccess, setAppErrorMessage} from "../app/appReducer";
import {formValuesModel} from "../../components/Login/Login";
import {authAPI} from "../../api/auth";
import {profileAPI} from "../../api/profile";
import {ProfileType} from "../../types/ProfileType";
import {ResponseType} from "../../types/ResponseType";
import {AuthMeDataType} from "../../api/auth/types";

const GET_AUTH_USER_DATA = 'index/GET_AUTH_USER_DATA'
const LOGIN = 'index/LOGIN'
const LOGOUT = 'index/LOGOUT'
const GET_CAPTCHA_URL = 'index/GET_CAPTCHA_URL'

export function* authWatcher() {
    yield takeEvery(GET_AUTH_USER_DATA, authorizeWorker)
    yield takeEvery(LOGIN, loginWorker)
    yield takeEvery(LOGOUT, logoutWorker)
    yield takeEvery(GET_CAPTCHA_URL, getCaptchaUrlWorker)
}

export function* authorizeWorker() {
    try {
        const res: ResponseType<AuthMeDataType> = yield call(authAPI.authMe)
        if (res.resultCode === 0) {
            const {id, email, login} = res.data
            yield put(setUserData(id, email, login, true))

            yield call(setProfile, id)
        }
        yield put(initializedSuccess())
    } catch (e: any) {
        yield put(setAppErrorMessage(e.message))
    }
}

export function* setProfile(id: number) {
    const res: AxiosResponse<ProfileType> = yield call(profileAPI.getProfile, id)
    yield put(setCurrentUser(res.data))
}

function* loginWorker(action: LoginActionType) {
    try {
        const res: ResponseType<{ userId: number }> = yield call(authAPI.login, action.email, action.password, action.rememberMe, action.captcha)
        if (res.resultCode === 0) {
            yield call(authorizeWorker)
        } else if (res.resultCode === 10) {
            yield put(getCaptchaUrl())
        } else {
            if (res.messages.length) {
                yield put(setAppErrorMessage(res.messages[0]))
            } else {
                yield put(setAppErrorMessage('Some error occurred'))
            }
        }
    } catch (e: any) {
        yield put(setAppErrorMessage(e.message))
    }
}

function* logoutWorker() {
    try {
        const res: ResponseType<{}> = yield call(authAPI.logout)
        if (res.resultCode === 0) {
            yield put(setUserData(null, null, null, false))
            yield put(setCurrentUser(null))
            yield put(getCaptchaUrlSuccess(null))
        }
    } catch (e: any) {
        yield put(setAppErrorMessage(e.message))
    }
}

function* getCaptchaUrlWorker() {
    const res: AxiosResponse<{ url: string }> = yield call(authAPI.getCaptcha)
    yield put(getCaptchaUrlSuccess(res.data.url))
}


export const authorize = () => ({type: GET_AUTH_USER_DATA})
export const login = ({email, password, rememberMe, captcha}: formValuesModel) => (
    {type: LOGIN, email, password, rememberMe, captcha}
)
export const logout = () => ({type: LOGOUT})
export const getCaptchaUrl = () => ({type: GET_CAPTCHA_URL})

type LoginActionType = ReturnType<typeof login>