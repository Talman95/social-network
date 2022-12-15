import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { uploadUserPhotoSuccess } from '../../actions/profileActions';
import { AppThunk } from '../../store';

export const uploadUserPhoto =
  (userPhoto: File): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.uploadPhoto(userPhoto);

      if (res.resultCode === resultCode.SUCCESS) {
        dispatch(uploadUserPhotoSuccess(res.data.photos));
      } else {
        showAppErrorHandler(dispatch, res);
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };
