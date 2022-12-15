import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { setProfileStatus } from '../../actions/profileActions';
import { AppThunk } from '../../store';

export const updateProfileStatus =
  (status: string): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.updateStatus(status);

      if (res.resultCode === resultCode.SUCCESS) {
        dispatch(setProfileStatus(status));
      } else {
        showAppErrorHandler(dispatch, res);
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };
