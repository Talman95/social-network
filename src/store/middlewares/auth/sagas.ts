import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { authAPI } from '../../../api/auth';
import { AuthMeDataType } from '../../../api/auth/types';
import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import { ProfileType } from '../../../types/ProfileType';
import { ResponseType } from '../../../types/ResponseType';
import { initializedSuccess, setAppErrorMessage } from '../../actions/appActions';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../../actions/authActions';

import { authorize, loginUser, logoutUser } from './actions';
import { sagaType } from './sagaType';

export function* getAuthUserWorker(id: number) {
  const res: ProfileType = yield call(profileAPI.getProfile, id);

  yield put(setCurrentUser(res));
}

export function* authorizeWorker() {
  try {
    const res: ResponseType<AuthMeDataType> = yield call(authAPI.authMe);

    if (res.resultCode === resultCode.SUCCESS) {
      const { id, email, login } = res.data;

      yield put(setUserData(id, email, login, true));

      yield call(getAuthUserWorker, id);
    }
    yield put(initializedSuccess());
  } catch (e: any) {
    yield put(setAppErrorMessage(e.message));
  }
}

function* getCaptchaUrlWorker() {
  const res: AxiosResponse<{ url: string }> = yield call(authAPI.getCaptcha);

  yield put(getCaptchaUrlSuccess(res.data.url));
}

function* loginWorker(action: LoginActionType) {
  try {
    const res: ResponseType<{ userId: number }> = yield call(
      authAPI.login,
      action.email,
      action.password,
      action.rememberMe,
      action.captcha,
    );

    if (res.resultCode === resultCode.SUCCESS) {
      yield call(authorizeWorker);
    } else if (res.resultCode === resultCode.CAPTCHA_ERROR) {
      yield call(getCaptchaUrlWorker);
    } else if (res.messages.length) {
      const firstElement = 0;
      yield put(setAppErrorMessage(res.messages[firstElement]));
    } else {
      yield put(setAppErrorMessage('Some error occurred'));
    }
  } catch (e: any) {
    yield put(setAppErrorMessage(e.message));
  }
}

function* logoutWorker() {
  try {
    const res: ResponseType<{}> = yield call(authAPI.logout);

    if (res.resultCode === resultCode.SUCCESS) {
      yield put(setUserData(null, null, null, false));
      yield put(setCurrentUser(null));
      yield put(getCaptchaUrlSuccess(null));
    }
  } catch (e: any) {
    yield put(setAppErrorMessage(e.message));
  }
}

export function* authWatcher() {
  yield takeEvery(sagaType.GET_AUTH_USER_DATA, authorizeWorker);
  yield takeEvery(sagaType.LOGIN, loginWorker);
  yield takeEvery(sagaType.LOGOUT, logoutWorker);
}

export type AuthSagasType =
  | LoginActionType
  | ReturnType<typeof authorize>
  | ReturnType<typeof logoutUser>;

type LoginActionType = ReturnType<typeof loginUser>;
