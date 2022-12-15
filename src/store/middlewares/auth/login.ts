import { authAPI } from '../../../api/auth';
import { loginValuesFormModel } from '../../../api/auth/types';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { getCaptchaUrlSuccess } from '../../actions/authActions';
import { AppThunk } from '../../store';

import { authorize } from './authorize';

export const getCaptchaUrl = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.getCaptcha();
    dispatch(getCaptchaUrlSuccess(res.url));
  } catch (e: any) {
    showNetworkErrorHandler(dispatch, e);
  }
};

export const login =
  ({ email, password, rememberMe, captcha }: loginValuesFormModel): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login({ email, password, rememberMe, captcha });

      if (res.resultCode === resultCode.SUCCESS) {
        dispatch(authorize());
      } else if (res.resultCode === resultCode.CAPTCHA_ERROR) {
        dispatch(getCaptchaUrl());
        showAppErrorHandler(dispatch, res);
      } else {
        showAppErrorHandler(dispatch, res);
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };
