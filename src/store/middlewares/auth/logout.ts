import { authAPI } from '../../../api/auth';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../../actions/authActions';
import { AppThunk } from '../../store';

export const logout = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.logout();

    if (res.resultCode === resultCode.SUCCESS) {
      dispatch(setUserData(null, null, null, false));
      dispatch(setCurrentUser(null));
      dispatch(getCaptchaUrlSuccess(null));
    } else {
      showAppErrorHandler(dispatch, res);
    }
  } catch (e: any) {
    showNetworkErrorHandler(dispatch, e);
  }
};
