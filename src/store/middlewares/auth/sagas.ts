import { call, put, takeEvery } from 'redux-saga/effects';

import { authAPI } from '../../../api/auth';
import { AuthMeDataType } from '../../../api/auth/types';
import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import { ProfileType } from '../../../types/ProfileType';
import { ResponseType } from '../../../types/ResponseType';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { initializedSuccess } from '../../actions/appActions';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../../actions/authActions';

import { authorize, loginUser, logoutUser } from './actions';
import { sagaType } from './sagaType';

export function* getAuthUserWorker(id: number) {
  try {
    const res: ProfileType = yield call(profileAPI.getProfile, id);

    yield put(setCurrentUser(res));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
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
    yield call(showNetworkErrorHandler, e);
  }
}

function* getCaptchaUrlWorker() {
  try {
    const res: { url: string } = yield call(authAPI.getCaptcha);

    yield put(getCaptchaUrlSuccess(res.url));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* loginWorker(action: LoginActionType) {
  try {
    const res: ResponseType<{ userId: number }> = yield call(
      authAPI.login,
      action.payload,
    );

    if (res.resultCode === resultCode.SUCCESS) {
      yield call(authorizeWorker);
    } else if (res.resultCode === resultCode.CAPTCHA_ERROR) {
      yield call(showAppErrorHandler, res);
      yield call(getCaptchaUrlWorker);
    } else {
      yield call(showAppErrorHandler, res);
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* logoutWorker() {
  try {
    const res: ResponseType<{}> = yield call(authAPI.logout);

    if (res.resultCode === resultCode.SUCCESS) {
      yield put(setUserData(null, null, null, false));
      yield put(setCurrentUser(null));
      yield put(getCaptchaUrlSuccess(null));
    } else {
      yield call(showAppErrorHandler, res);
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
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
