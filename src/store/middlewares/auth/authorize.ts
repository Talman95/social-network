import { authAPI } from '../../../api/auth';
import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import { showNetworkErrorHandler } from '../../../utils/showAppMessageUtils';
import { initializedSuccess } from '../../actions/appActions';
import { setCurrentUser, setUserData } from '../../actions/authActions';
import { AppThunk } from '../../store';

export const getAuthUserData =
  (id: number): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.getProfile(id);

      dispatch(setCurrentUser(res));
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };

export const authorize = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.authMe();

    if (res.resultCode === resultCode.SUCCESS) {
      const { id, email, login } = res.data;

      dispatch(setUserData(id, email, login, true));

      dispatch(getAuthUserData(id));
    }

    dispatch(initializedSuccess());
  } catch (e: any) {
    showNetworkErrorHandler(dispatch, e);
  }
};
