import { profileAPI } from '../../../api/profile';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { updateProfileSuccess } from '../../actions/profileActions';
import { UpdateProfileModel } from '../../reducers/profileReducer';
import { AppStateType, AppThunk } from '../../store';

export const updateProfile =
  (profileData: UpdateProfileModel): AppThunk =>
  async (dispatch, getState: () => AppStateType) => {
    try {
      const { id } = getState().auth;

      if (id) {
        const updatedProfile = { ...profileData, userId: id };
        const res = await profileAPI.updateProfile(updatedProfile);

        if (res.resultCode === resultCode.SUCCESS) {
          dispatch(updateProfileSuccess(profileData));
        } else {
          showAppErrorHandler(dispatch, res);
        }
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };
