import { authAPI } from '../../../api/auth';
import { loginValuesFormModel } from '../../../api/auth/types';
import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import { setAppErrorMessage } from '../../actions/appActions';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../../actions/authActions';
import { AppThunk } from '../../store';

const firstElement = 0;

export const getAuthUserData = (): AppThunk => async dispatch => {
  try {
    const response = await authAPI.authMe();

    if (response.resultCode === resultCode.SUCCESS) {
      const { id, email, login } = response.data;

      dispatch(setUserData(id, email, login, true));
      const res = await profileAPI.getProfile(id);

      dispatch(setCurrentUser(res));
    }
  } catch (error: any) {
    dispatch(setAppErrorMessage(error.message));
  }
};

export const getCaptchaUrl = (): AppThunk => async dispatch => {
  const res = await authAPI.getCaptcha();

  dispatch(getCaptchaUrlSuccess(res.data.url));
};

export const login =
  ({ email, password, rememberMe, captcha }: loginValuesFormModel): AppThunk =>
  async dispatch => {
    try {
      const response = await authAPI.login({ email, password, rememberMe, captcha });

      if (response.resultCode === resultCode.SUCCESS) {
        dispatch(getAuthUserData());
      } else if (response.resultCode === resultCode.CAPTCHA_ERROR) {
        dispatch(getCaptchaUrl());
      } else if (response.messages.length) {
        dispatch(setAppErrorMessage(response.messages[firstElement]));
      } else {
        dispatch(setAppErrorMessage('Some error occurred'));
      }
    } catch (error: any) {
      dispatch(setAppErrorMessage(error.message));
    }
  };

export const logout = (): AppThunk => async dispatch => {
  try {
    const response = await authAPI.logout();

    if (response.resultCode === resultCode.SUCCESS) {
      dispatch(setUserData(null, null, null, false));
      dispatch(setCurrentUser(null));
      dispatch(getCaptchaUrlSuccess(null));
    }
  } catch (error: any) {
    dispatch(setAppErrorMessage(error.message));
  }
};
